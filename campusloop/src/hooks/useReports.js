import { useMemo } from "react";
import { useApp } from "../context/AppContext";

export function useReports(filters = {}) {
  const { reports, addReport, markAsRecovered } = useApp();

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      // Type filter (ALL, LOST, FOUND)
      if (filters.type && filters.type !== "ALL" && report.type !== filters.type) {
        return false;
      }

      // Status filter
      if (filters.status && filters.status !== "ALL" && report.status !== filters.status) {
        return false;
      }

      // Category filter
      if (filters.category && filters.category !== "All Categories" && report.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location && filters.location !== "All Locations" && report.location !== filters.location) {
        return false;
      }

      // Search keyword filter
      if (filters.search && filters.search.trim().length > 0) {
        const q = filters.search.toLowerCase().trim();
        const inTitle = report.title?.toLowerCase().includes(q);
        const inDesc = report.description?.toLowerCase().includes(q);
        const inLoc = report.location?.toLowerCase().includes(q);
        const inPlace = report.specificPlace?.toLowerCase().includes(q);
        const inBrand = report.brand?.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inLoc && !inPlace && !inBrand) {
          return false;
        }
      }

      // Date filter (TODAY, 3DAYS, WEEK, ALL)
      if (filters.dateRange && filters.dateRange !== "ALL") {
        const reportDate = new Date(report.createdAt || report.date);
        const now = new Date();
        const diffHours = (now - reportDate) / (1000 * 60 * 60);

        if (filters.dateRange === "TODAY" && diffHours > 24) return false;
        if (filters.dateRange === "3DAYS" && diffHours > 72) return false;
        if (filters.dateRange === "WEEK" && diffHours > 168) return false;
      }

      return true;
    });
  }, [reports, filters]);

  return {
    reports: filteredReports,
    totalCount: reports.length,
    filteredCount: filteredReports.length,
    addReport,
    markAsRecovered,
  };
}
