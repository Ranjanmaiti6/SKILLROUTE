import React from "react";
import { ReportCard } from "./ReportCard";
import { EmptyState } from "../common/EmptyState";
import { Search } from "lucide-react";

export function ReportFeed({ reports, onResetFilters }) {
  if (!reports || reports.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="Nothing reported here yet."
        description="Try adjusting your search keywords, location filter, or report a new item if you lost or found something."
        actionText={onResetFilters ? "Reset Filters" : null}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="feed-grid">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
