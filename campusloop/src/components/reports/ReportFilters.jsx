import React from "react";
import { Search, X } from "lucide-react";
import { itemCategories, campusLocations } from "../../data/mockUsers";

export function ReportFilters({ filters, setFilters, onReset }) {
  const handleTypeChange = (type) => {
    setFilters((prev) => ({ ...prev, type }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const clearSearch = () => {
    setFilters((prev) => ({ ...prev, search: "" }));
  };

  return (
    <div
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        padding: "16px",
        marginBottom: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* Top Search Input */}
      <div style={{ position: "relative", width: "100%" }}>
        <Search
          size={16}
          color="var(--text-muted)"
          style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
        />
        <input
          type="text"
          placeholder="Search by item, location or keyword..."
          value={filters.search || ""}
          onChange={handleSearchChange}
          className="form-input"
          style={{ paddingLeft: "36px", paddingRight: filters.search ? "36px" : "12px" }}
        />
        {filters.search && (
          <button
            onClick={clearSearch}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Type pills: [All] [Lost] [Found] */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {[
            { id: "ALL", label: "All Items" },
            { id: "LOST", label: "Lost Items" },
            { id: "FOUND", label: "Found Items" },
          ].map((tab) => {
            const isSelected = (filters.type || "ALL") === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTypeChange(tab.id)}
                style={{
                  padding: "5px 12px",
                  fontSize: "13px",
                  fontWeight: 500,
                  borderRadius: "var(--radius-sm)",
                  border: isSelected ? "1px solid var(--primary)" : "1px solid var(--border-light)",
                  backgroundColor: isSelected ? "var(--primary-light)" : "#ffffff",
                  color: isSelected ? "var(--primary)" : "var(--text-muted)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Category & Location Dropdowns (Compact) */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <select
            value={filters.category || "All Categories"}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
            className="form-select"
            style={{ width: "auto", minWidth: "150px", fontSize: "13px", padding: "6px 10px" }}
          >
            {itemCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={filters.location || "All Locations"}
            onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
            className="form-select"
            style={{ width: "auto", minWidth: "150px", fontSize: "13px", padding: "6px 10px" }}
          >
            {campusLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Active filter count / reset button */}
          {(filters.search ||
            (filters.type && filters.type !== "ALL") ||
            (filters.category && filters.category !== "All Categories") ||
            (filters.location && filters.location !== "All Locations")) && (
            <button
              onClick={onReset}
              style={{
                background: "none",
                border: "none",
                fontSize: "12px",
                color: "var(--primary)",
                cursor: "pointer",
                padding: "4px 8px",
                textDecoration: "underline",
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
