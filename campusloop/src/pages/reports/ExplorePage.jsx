import React, { useState } from "react";
import { ReportFilters } from "../../components/reports/ReportFilters";
import { ReportFeed } from "../../components/reports/ReportFeed";
import { useReports } from "../../hooks/useReports";
import { PlusCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function ExplorePage() {
  const { navigateTo } = useApp();

  const [filters, setFilters] = useState({
    type: "ALL",
    category: "All Categories",
    location: "All Locations",
    search: "",
    dateRange: "ALL",
  });

  const { reports, totalCount, filteredCount } = useReports(filters);

  const handleResetFilters = () => {
    setFilters({
      type: "ALL",
      category: "All Categories",
      location: "All Locations",
      search: "",
      dateRange: "ALL",
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Page Title & Action Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "4px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Lost & Found</h1>
          <p className="text-muted text-sm" style={{ marginTop: "2px" }}>
            See what students have reported around campus.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => navigateTo("report-lost")}
            className="btn btn-danger btn-sm"
          >
            + Report Lost
          </button>
          <button
            onClick={() => navigateTo("report-found")}
            className="btn btn-primary btn-sm"
          >
            + Report Found
          </button>
        </div>
      </div>

      {/* Compact Filters & Search */}
      <ReportFilters
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
      />

      {/* Results Count Summary */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", color: "var(--text-muted)" }}>
        <span>
          Showing {filteredCount} of {totalCount} campus notices
        </span>
        {filters.type !== "ALL" && (
          <span style={{ fontWeight: 500, color: "var(--text-main)" }}>
            Filtered by: {filters.type === "LOST" ? "Lost items only" : "Found items only"}
          </span>
        )}
      </div>

      {/* Reports Feed */}
      <ReportFeed reports={reports} onResetFilters={handleResetFilters} />
    </div>
  );
}
