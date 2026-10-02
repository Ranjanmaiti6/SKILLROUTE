import React from "react";
import { Modal } from "../common/Modal";
import { Badge } from "../common/Badge";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { formatRelativeTime, formatFriendlyDate } from "../../utils/dateUtils";
import { Check, MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function MatchComparisonModal({ isOpen, onClose, match }) {
  const { reports, setClaimTargetReport, setActiveModal } = useApp();

  if (!match) return null;

  const reportA = match.userReport || reports.find((r) => r.id === match.userReportId);
  const reportB = match.matchedReport || reports.find((r) => r.id === match.matchedReportId);

  if (!reportA || !reportB) return null;

  const handleStartClaim = () => {
    onClose();
    // The claim is requested on the FOUND report
    const foundReport = reportA.type === "FOUND" ? reportA : reportB;
    setClaimTargetReport(foundReport);
    setActiveModal("claim");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compare Reports"
      subtitle={`Match confidence: ${match.score} / 100`}
      maxWidth="720px"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Two simple side-by-side columns: YOUR REPORT vs POSSIBLE MATCH */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
          className="comparison-grid"
        >
          {/* Column 1: YOUR REPORT */}
          <div
            style={{
              backgroundColor: "var(--bg-subtle)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", color: "var(--text-muted)" }}>
                YOUR REPORT
              </span>
              <Badge type={reportA.type}>{reportA.type}</Badge>
            </div>

            <div style={{ width: "100%", borderRadius: "4px", overflow: "hidden", margin: "4px 0" }}>
              <ImageWithFallback
                src={reportA.images && reportA.images[0]}
                alt={reportA.title}
                aspectRatio="4/3"
                showBadge={false}
              />
            </div>

            <h4 style={{ fontSize: "15px", fontWeight: 600 }}>{reportA.title}</h4>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={12} color="var(--primary)" />
                <span>{reportA.location} ({reportA.specificPlace})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Calendar size={12} />
                <span>{formatFriendlyDate(reportA.date)}</span>
              </div>
              {reportA.color && <div>Color: {reportA.color}</div>}
              {reportA.brand && <div>Brand: {reportA.brand}</div>}
            </div>
          </div>

          {/* Column 2: POSSIBLE MATCH */}
          <div
            style={{
              backgroundColor: "var(--bg-subtle)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", color: "var(--primary)" }}>
                POSSIBLE MATCH
              </span>
              <Badge type={reportB.type}>{reportB.type}</Badge>
            </div>

            <div style={{ width: "100%", borderRadius: "4px", overflow: "hidden", margin: "4px 0" }}>
              <ImageWithFallback
                src={reportB.images && reportB.images[0]}
                alt={reportB.title}
                aspectRatio="4/3"
                showBadge={false}
              />
            </div>

            <h4 style={{ fontSize: "15px", fontWeight: 600 }}>{reportB.title}</h4>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={12} color="var(--found-color)" />
                <span>{reportB.location} ({reportB.specificPlace})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Calendar size={12} />
                <span>{formatFriendlyDate(reportB.date)}</span>
              </div>
              {reportB.color && <div>Color: {reportB.color}</div>}
              {reportB.brand && <div>Brand: {reportB.brand}</div>}
            </div>
          </div>
        </div>

        {/* Why it looks similar checklist */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
          }}
        >
          <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", marginBottom: "10px" }}>
            Why it looks similar:
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
            {match.reasons && match.reasons.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "var(--found-bg)",
                    border: "1px solid var(--found-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={11} color="var(--found-color)" strokeWidth={2.5} />
                </div>
                <span>
                  <strong>{r.label}:</strong> {r.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px", marginTop: "4px" }}>
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <button onClick={handleStartClaim} className="btn btn-primary">
            Request Claim <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </Modal>
  );
}
