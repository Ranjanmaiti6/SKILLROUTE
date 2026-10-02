import React, { createContext, useContext, useState, useEffect } from "react";
import { storageService } from "../services/storageService";
import { calculateReportMatch } from "../utils/matchEngine";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

export function AppProvider({ children }) {
  const { user } = useAuth();

  const [reports, setReports] = useState(() => storageService.getReports());
  const [matches, setMatches] = useState(() => storageService.getMatches());
  const [claims, setClaims] = useState(() => storageService.getClaims());
  const [notifications, setNotifications] = useState(() => storageService.getNotifications());

  // Navigation state
  const [currentPage, setCurrentPage] = useState("home"); // home, explore, report-lost, report-found, report-detail, dashboard, admin, profile, about, claims
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'claim', 'compare', 'edit-profile', null
  const [claimTargetReport, setClaimTargetReport] = useState(null);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && prev.id === Date.now() ? null : prev));
    }, 4000);
  };

  const closeToast = () => setToast(null);

  // Persist state updates to localStorage
  useEffect(() => {
    storageService.saveReports(reports);
  }, [reports]);

  useEffect(() => {
    storageService.saveMatches(matches);
  }, [matches]);

  useEffect(() => {
    storageService.saveClaims(claims);
  }, [claims]);

  useEffect(() => {
    storageService.saveNotifications(notifications);
  }, [notifications]);

  // Navigate helper
  const navigateTo = (page, params = {}) => {
    if (params.reportId) {
      setSelectedReportId(params.reportId);
    }
    if (params.match) {
      setSelectedMatch(params.match);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add new report (Lost or Found)
  const addReport = (newReportData) => {
    const reportId = `rep-${Date.now()}`;
    const report = {
      ...newReportData,
      id: reportId,
      status: "ACTIVE",
      reporterId: user.id || "usr_ranjan",
      reporterName: user.name || "Ranjan Maiti",
      reporterContact: user.email || "ranjan.m@campus.edu",
      reporterYearDept: user.year && user.department ? `${user.year}, ${user.department}` : "Student",
      createdAt: new Date().toISOString(),
    };

    const updatedReports = [report, ...reports];
    setReports(updatedReports);

    // Automatic match check for this new report against existing reports of opposite type
    const oppositeType = report.type === "LOST" ? "FOUND" : "LOST";
    const candidates = updatedReports.filter((r) => r.type === oppositeType && r.status === "ACTIVE");

    let foundNewMatch = false;
    const newMatchesList = [...matches];

    candidates.forEach((cand) => {
      const matchResult = calculateReportMatch(report, cand);
      if (matchResult && matchResult.score >= 70) {
        foundNewMatch = true;
        const matchEntry = {
          id: `match-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          score: matchResult.score,
          confidence: matchResult.confidence,
          userReportId: report.type === "LOST" ? report.id : cand.id,
          matchedReportId: report.type === "LOST" ? cand.id : report.id,
          reasons: matchResult.reasons,
          summaryNote: `Possible match detected: ${cand.title} (${cand.location})`,
          status: "UNREVIEWED",
        };
        newMatchesList.unshift(matchEntry);
      }
    });

    if (foundNewMatch) {
      setMatches(newMatchesList);
      // Trigger notification
      const matchNotif = {
        id: `notif-${Date.now()}`,
        type: "MATCH_FOUND",
        icon: "sparkles",
        title: "Possible match detected",
        message: `We found a possible match for your newly reported "${report.title}".`,
        time: "Just now",
        timestamp: new Date().toISOString(),
        isRead: false,
        linkReportId: report.id,
      };
      setNotifications((prev) => [matchNotif, ...prev]);
    }

    // Success notification
    const pubNotif = {
      id: `notif-${Date.now() + 1}`,
      type: "REPORT_PUBLISHED",
      icon: "file-text",
      title: `${report.type === "LOST" ? "Lost" : "Found"} report published`,
      message: `Your notice for "${report.title}" is now active and visible to all students.`,
      time: "Just now",
      timestamp: new Date().toISOString(),
      isRead: false,
      linkReportId: report.id,
    };
    setNotifications((prev) => [pubNotif, ...prev]);

    showToast("Your report has been submitted.", "success");
    return report;
  };

  // Mark report as recovered
  const markAsRecovered = (reportId) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: "RESOLVED" } : r))
    );
    showToast("Report marked as recovered / returned.", "success");
  };

  // Submit a claim
  const submitClaim = ({ report, answer, reason }) => {
    const newClaim = {
      id: `clm-${Date.now()}`,
      reportId: report.id,
      reportTitle: report.title,
      reportType: report.type,
      reportImage: report.images && report.images[0],
      reportLocation: report.location,
      claimantId: user.id || "usr_ranjan",
      claimantName: user.name || "Ranjan Maiti",
      claimantContact: user.email || "ranjan.m@campus.edu",
      finderId: report.reporterId,
      finderName: report.reporterName,
      step: 2, // Verification under review
      status: "UNDER_REVIEW",
      verificationQuestion: report.privateVerification?.question || "Provide specific proof of ownership",
      claimantAnswer: answer,
      notes: reason || "Claim submitted via CampusLoop verification portal.",
      submissionDate: new Date().toISOString(),
      handoverLocation: report.currentLocation || "Campus Security Desk (Room 101)",
    };

    setClaims((prev) => [newClaim, ...prev]);

    // Notification
    const claimNotif = {
      id: `notif-${Date.now()}`,
      type: "CLAIM_UPDATE",
      icon: "check-circle",
      title: "Claim submitted",
      message: `Your claim for "${report.title}" is waiting for verification.`,
      time: "Just now",
      timestamp: new Date().toISOString(),
      isRead: false,
      claimId: newClaim.id,
    };
    setNotifications((prev) => [claimNotif, ...prev]);

    showToast("Claim submitted. Waiting for confirmation.", "success");
    return newClaim;
  };

  // Admin / Finder updates claim status
  const updateClaimStatus = (claimId, newStatus) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          const step = newStatus === "APPROVED" || newStatus === "HANDED_OVER" ? 3 : 2;
          return { ...c, status: newStatus, step };
        }
        return c;
      })
    );
    showToast(`Claim status updated to ${newStatus}.`, "info");
  };

  // Notification helpers
  const markAsRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast("All notifications marked as read.", "info");
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Reset demo data helper
  const handleResetData = () => {
    storageService.resetAllData();
    setReports(storageService.getReports());
    setMatches(storageService.getMatches());
    setClaims(storageService.getClaims());
    setNotifications(storageService.getNotifications());
    showToast("Demo data reset to initial campus state.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        reports,
        matches,
        claims,
        notifications,
        unreadCount,
        currentPage,
        selectedReportId,
        selectedMatch,
        activeModal,
        claimTargetReport,
        toast,
        navigateTo,
        setSelectedReportId,
        setSelectedMatch,
        setActiveModal,
        setClaimTargetReport,
        addReport,
        markAsRecovered,
        submitClaim,
        updateClaimStatus,
        markAsRead,
        markAllAsRead,
        showToast,
        closeToast,
        handleResetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
