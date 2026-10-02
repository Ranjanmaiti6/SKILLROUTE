import React from "react";

export function StatCard({ label, count, icon: Icon, color = "var(--primary)", onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: onClick ? "pointer" : "default",
        transition: "border-color var(--transition-fast)",
      }}
      className="stat-card"
    >
      <div>
        <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500, display: "block" }}>
          {label}
        </span>
        <span style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-main)", lineHeight: 1.2 }}>
          {count}
        </span>
      </div>

      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          backgroundColor: "var(--bg-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
        }}
      >
        <Icon size={20} strokeWidth={2} />
      </div>
    </div>
  );
}
