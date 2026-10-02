import React from "react";
import { formatRelativeTime } from "../../utils/dateUtils";
import { Sparkles, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function RecentActivityList({ activities }) {
  const { navigateTo } = useApp();

  if (!activities || activities.length === 0) {
    return (
      <div style={{ padding: "16px", color: "var(--text-muted)", fontSize: "13px" }}>
        No recent activity yet.
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
      }}
    >
      {activities.map((act, index) => (
        <div
          key={act.id || index}
          style={{
            padding: "12px 16px",
            borderBottom: index < activities.length - 1 ? "1px solid var(--border-light)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: act.colorBg || "var(--bg-subtle)",
                color: act.colorText || "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {act.type === "MATCH" ? (
                <Sparkles size={14} />
              ) : act.type === "RESOLVED" ? (
                <CheckCircle2 size={14} />
              ) : (
                <FileText size={14} />
              )}
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-main)" }}>
                {act.text}
              </p>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                {formatRelativeTime(act.timestamp)}
              </span>
            </div>
          </div>

          {act.actionReportId && (
            <button
              onClick={() => navigateTo("report-detail", { reportId: act.actionReportId })}
              style={{
                background: "none",
                border: "none",
                fontSize: "12px",
                color: "var(--primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              View <ArrowRight size={12} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
