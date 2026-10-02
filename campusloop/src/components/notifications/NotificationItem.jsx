import React from "react";
import { Sparkles, CheckCircle, FileText, ShieldCheck, Bell } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function NotificationItem({ notification, onSelect }) {
  const { markAsRead, navigateTo } = useApp();

  const getIcon = () => {
    switch (notification.type) {
      case "MATCH_FOUND":
        return <Sparkles size={15} color="var(--primary)" />;
      case "CLAIM_UPDATE":
        return <CheckCircle size={15} color="var(--found-color)" />;
      case "REPORT_PUBLISHED":
        return <FileText size={15} color="var(--primary)" />;
      case "CLAIM_APPROVED":
        return <ShieldCheck size={15} color="var(--found-color)" />;
      default:
        return <Bell size={15} color="var(--text-muted)" />;
    }
  };

  const handleClick = () => {
    markAsRead(notification.id);
    if (notification.linkReportId) {
      navigateTo("report-detail", { reportId: notification.linkReportId });
    } else if (notification.claimId) {
      navigateTo("dashboard", { tab: "claims" });
    }
    if (onSelect) onSelect();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        padding: "12px 14px",
        backgroundColor: notification.isRead ? "#ffffff" : "var(--primary-light)",
        borderBottom: "1px solid var(--border-light)",
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
        cursor: "pointer",
        transition: "background-color var(--transition-fast)",
      }}
      className="notification-item"
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          border: "1px solid var(--border-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "2px",
        }}
      >
        {getIcon()}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "13px", fontWeight: notification.isRead ? 400 : 600, color: "var(--text-main)", lineHeight: 1.35 }}>
          {notification.message}
        </p>
        <span style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "3px", display: "inline-block" }}>
          {notification.time}
        </span>
      </div>

      {!notification.isRead && (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--primary)",
            marginTop: "6px",
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
}
