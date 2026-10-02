import React from "react";
import { ClaimStatusCard } from "../../components/claims/ClaimStatusCard";
import { EmptyState } from "../../components/common/EmptyState";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useClaims } from "../../hooks/useClaims";
import { useApp } from "../../context/AppContext";

export function ClaimsHistoryPage() {
  const { claims } = useClaims();
  const { navigateTo } = useApp();

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
      <button
        type="button"
        onClick={() => navigateTo("dashboard")}
        style={{
          background: "none",
          border: "none",
          color: "var(--text-muted)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </button>

      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 700 }}>Your Claim Requests</h1>
        <p className="text-muted text-sm" style={{ marginTop: "2px" }}>
          Track the status of items you claimed or reports claimed by other students.
        </p>
      </div>

      {claims.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="No active claims."
          description="When you spot an item in the feed that belongs to you, click 'Request Claim' to begin verification."
          actionText="Browse Lost & Found"
          onAction={() => navigateTo("explore")}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {claims.map((claim) => (
            <ClaimStatusCard key={claim.id} claim={claim} />
          ))}
        </div>
      )}
    </div>
  );
}
