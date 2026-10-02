import React from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing reported here yet.",
  description,
  actionText,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h3 style={{ fontSize: "16px", fontWeight: 600 }}>{title}</h3>
      {description && (
        <p className="text-muted text-sm" style={{ maxWidth: "380px" }}>
          {description}
        </p>
      )}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn btn-secondary btn-sm"
          style={{ marginTop: "8px" }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
