import React from "react";

export function MatchBadge({ score = 88 }) {
  const isHigh = score >= 80;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor: isHigh ? "var(--found-bg)" : "var(--warning-bg)",
        color: isHigh ? "var(--found-color)" : "var(--warning-color)",
        border: `1px solid ${isHigh ? "var(--found-border)" : "var(--warning-border)"}`,
      }}
    >
      Match: {score} / 100
    </span>
  );
}
