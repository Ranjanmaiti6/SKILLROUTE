import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function Toast() {
  const { toast, closeToast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div className="toast-container">
      <div className={`toast ${isSuccess ? "toast-success" : ""}`}>
        {isSuccess ? (
          <CheckCircle2 size={18} color="var(--found-color)" />
        ) : isError ? (
          <AlertCircle size={18} color="var(--lost-color)" />
        ) : (
          <Info size={18} color="var(--primary-border)" />
        )}
        <span style={{ flex: 1 }}>{toast.message}</span>
        <button
          onClick={closeToast}
          style={{
            background: "none",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            padding: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
