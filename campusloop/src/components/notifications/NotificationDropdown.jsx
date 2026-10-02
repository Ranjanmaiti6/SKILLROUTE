import React, { useRef, useEffect } from "react";
import { CheckCheck } from "lucide-react";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "../../hooks/useNotifications";

export function NotificationDropdown({ onClose }) {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: "100%",
        right: 0,
        marginTop: "8px",
        width: "320px",
        maxHeight: "420px",
        backgroundColor: "#ffffff",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-dropdown)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid var(--border-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontWeight: 600, fontSize: "14px" }}>Notifications</span>
          {unreadCount > 0 && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                backgroundColor: "var(--lost-bg)",
                color: "var(--lost-color)",
                padding: "1px 6px",
                borderRadius: "4px",
              }}
            >
              {unreadCount} new
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            style={{
              background: "none",
              border: "none",
              fontSize: "12px",
              color: "var(--primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 4px",
            }}
          >
            <CheckCheck size={14} /> Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        {notifications.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>
            No notifications yet
          </div>
        ) : (
          notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onSelect={onClose}
            />
          ))
        )}
      </div>
    </div>
  );
}
