import React from "react";
import { PlusCircle, Search } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function QuickActions() {
  const { navigateTo } = useApp();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
        margin: "18px 0 24px 0",
      }}
    >
      <button
        onClick={() => navigateTo("report-lost")}
        className="btn btn-danger"
        style={{ padding: "9px 18px" }}
      >
        <PlusCircle size={15} /> Report Lost Item
      </button>

      <button
        onClick={() => navigateTo("report-found")}
        className="btn btn-primary"
        style={{ padding: "9px 18px" }}
      >
        <PlusCircle size={15} /> Report Found Item
      </button>

      <button
        onClick={() => navigateTo("explore")}
        className="btn btn-secondary"
        style={{ padding: "9px 18px" }}
      >
        <Search size={15} /> Search Notice Board
      </button>
    </div>
  );
}
