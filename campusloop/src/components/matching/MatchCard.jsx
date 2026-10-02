import React from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { MatchBadge } from "./MatchBadge";
import { useApp } from "../../context/AppContext";

export function MatchCard({ match, userReport, matchedReport, onCompare }) {
  const { setSelectedMatch, setActiveModal, navigateTo } = useApp();

  const handleCompareClick = () => {
    if (onCompare) {
      onCompare(match);
    } else {
      setSelectedMatch(match);
      setActiveModal("compare");
    }
  };

  const otherReport = matchedReport || match.matchedReport;

  if (!otherReport) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
            <Sparkles size={12} color="var(--primary)" /> Possible match
          </span>
          <h4 style={{ fontSize: "16px", fontWeight: 600, marginTop: "2px", color: "var(--text-main)" }}>
            {otherReport.title}
          </h4>
        </div>
        <MatchBadge score={match.score} />
      </div>

      {/* Why we think it matches checklist */}
      <div
        style={{
          backgroundColor: "var(--bg-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
          Why we think it matches:
        </span>
        {match.reasons && match.reasons.slice(0, 4).map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-main)" }}>
            <Check size={13} color="var(--found-color)" strokeWidth={2.5} />
            <span>
              <strong>{r.label}</strong> {r.detail && <span className="text-muted">({r.detail})</span>}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "4px" }}>
        <button
          onClick={() => navigateTo("report-detail", { reportId: otherReport.id })}
          style={{
            background: "none",
            border: "none",
            fontSize: "12px",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
          }}
        >
          View found notice
        </button>

        <button
          type="button"
          onClick={handleCompareClick}
          className="btn btn-primary btn-sm"
        >
          Compare reports <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
