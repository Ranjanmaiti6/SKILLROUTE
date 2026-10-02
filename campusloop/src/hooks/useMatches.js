import { useMemo } from "react";
import { useApp } from "../context/AppContext";

export function useMatches(reportId = null) {
  const { matches, reports } = useApp();

  const enrichedMatches = useMemo(() => {
    return matches.map((match) => {
      const userReport = reports.find((r) => r.id === match.userReportId);
      const matchedReport = reports.find((r) => r.id === match.matchedReportId);
      return {
        ...match,
        userReport,
        matchedReport,
      };
    });
  }, [matches, reports]);

  const reportMatches = useMemo(() => {
    if (!reportId) return enrichedMatches;
    return enrichedMatches.filter(
      (m) => m.userReportId === reportId || m.matchedReportId === reportId
    );
  }, [enrichedMatches, reportId]);

  return {
    allMatches: enrichedMatches,
    reportMatches,
    totalMatches: enrichedMatches.length,
  };
}
