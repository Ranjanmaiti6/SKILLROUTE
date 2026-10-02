import React from "react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { Badge } from "../common/Badge";
import { formatRelativeTime } from "../../utils/dateUtils";
import { Clock, CheckCircle2, MapPin, User, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export function ClaimStatusCard({ claim }) {
  const { user, isAdmin } = useAuth();
  const { updateClaimStatus, navigateTo } = useApp();

  const isClaimant = claim.claimantId === user.id;
  const isFinder = claim.finderId === user.id;

  const isApproved = claim.status === "APPROVED" || claim.status === "HANDED_OVER";
  const isPending = claim.status === "UNDER_REVIEW" || claim.status === "PENDING";

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div style={{ width: "70px", height: "55px", borderRadius: "4px", overflow: "hidden", flexShrink: 0 }}>
          <ImageWithFallback
            src={claim.reportImage}
            alt={claim.reportTitle}
            aspectRatio="4/3"
            showBadge={false}
          />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
            <h4
              style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-main)", cursor: "pointer" }}
              onClick={() => navigateTo("report-detail", { reportId: claim.reportId })}
            >
              {claim.reportTitle}
            </h4>
            <Badge type={isApproved ? "FOUND" : "WARNING"}>
              {claim.status === "APPROVED" ? "Approved" : claim.status === "HANDED_OVER" ? "Handed Over" : "Under Review"}
            </Badge>
          </div>

          <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={12} color="var(--primary)" /> {claim.reportLocation}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={12} /> {formatRelativeTime(claim.submissionDate)}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <User size={12} /> {isClaimant ? `Claimed by you` : `Claimant: ${claim.claimantName}`}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Step Progress Indicator Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          backgroundColor: "var(--bg-subtle)",
          borderRadius: "var(--radius-sm)",
          fontSize: "11px",
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--primary)" }}>
          <CheckCircle2 size={13} color="var(--found-color)" />
          <span>1. Claim Submitted</span>
        </div>
        <span style={{ color: "var(--text-light)" }}>→</span>

        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: claim.step >= 2 ? "var(--primary)" : "var(--text-muted)" }}>
          {claim.step > 2 ? <CheckCircle2 size={13} color="var(--found-color)" /> : <Clock size={13} color="var(--warning-color)" />}
          <span>2. Verification Check</span>
        </div>
        <span style={{ color: "var(--text-light)" }}>→</span>

        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: isApproved ? "var(--found-color)" : "var(--text-muted)" }}>
          {isApproved ? <CheckCircle2 size={13} color="var(--found-color)" /> : <span style={{ opacity: 0.5 }}>3. Handover</span>}
          <span>{isApproved ? "Ready for Collection" : "3. Confirmation"}</span>
        </div>
      </div>

      {/* Verification Q & A block */}
      <div
        style={{
          fontSize: "12px",
          backgroundColor: "#fbfcfd",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <div>
          <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>Question: </span>
          <span>{claim.verificationQuestion}</span>
        </div>
        <div>
          <span style={{ fontWeight: 600, color: "var(--primary)" }}>Submitted Answer: </span>
          <span style={{ fontStyle: "italic" }}>"{claim.claimantAnswer}"</span>
        </div>
        {claim.handoverLocation && (
          <div style={{ marginTop: "4px", color: "var(--text-muted)" }}>
            <span style={{ fontWeight: 600 }}>Pickup / Handover Desk: </span>
            <span>{claim.handoverLocation}</span>
          </div>
        )}
      </div>

      {/* Action buttons for Finder or Admin */}
      {(isAdmin || isFinder) && isPending && (
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button
            onClick={() => updateClaimStatus(claim.id, "REJECTED")}
            className="btn btn-secondary btn-sm"
          >
            Reject claim
          </button>
          <button
            onClick={() => updateClaimStatus(claim.id, "APPROVED")}
            className="btn btn-primary btn-sm"
          >
            <ShieldCheck size={14} /> Verify & Approve
          </button>
        </div>
      )}
    </div>
  );
}
