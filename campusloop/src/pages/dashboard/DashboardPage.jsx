import React, { useState } from "react";
import { StatCard } from "../../components/dashboard/StatCard";
import { QuickActions } from "../../components/dashboard/QuickActions";
import { RecentActivityList } from "../../components/dashboard/RecentActivityList";
import { ReportCard } from "../../components/reports/ReportCard";
import { MatchCard } from "../../components/matching/MatchCard";
import { ClaimStatusCard } from "../../components/claims/ClaimStatusCard";
import { EmptyState } from "../../components/common/EmptyState";
import { HelpCircle, CheckCircle2, Sparkles, Inbox, FileText, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { useMatches } from "../../hooks/useMatches";
import { useClaims } from "../../hooks/useClaims";

export function DashboardPage() {
  const { user } = useAuth();
  const { reports, navigateTo } = useApp();
  const { allMatches } = useMatches();
  const { claims } = useClaims();

  const [activeTab, setActiveTab] = useState("all"); // 'all', 'reports', 'matches', 'claims'

  // User's own reports
  const userReports = reports.filter((r) => r.reporterId === user.id);
  const lostCount = userReports.filter((r) => r.type === "LOST" && r.status === "ACTIVE").length;
  const foundCount = userReports.filter((r) => r.type === "FOUND" && r.status === "ACTIVE").length;
  const recoveredCount = userReports.filter((r) => r.status === "RESOLVED").length;
  const matchesCount = allMatches.length;

  // Recent activity items
  const recentActivities = [
    {
      id: "act-1",
      type: "MATCH",
      text: "Possible match found for your Black Casio Calculator (Score: 92/100)",
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      colorBg: "var(--primary-light)",
      colorText: "var(--primary)",
      actionReportId: "rep-102",
    },
    {
      id: "act-2",
      type: "CLAIM",
      text: "Claim submitted for Blue College Backpack. Status: Under review.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      colorBg: "var(--warning-bg)",
      colorText: "var(--warning-color)",
      actionReportId: "rep-103",
    },
    {
      id: "act-3",
      type: "RESOLVED",
      text: "Reading glasses returned to Rahul Sen outside Seminar Hall A.",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      colorBg: "var(--found-bg)",
      colorText: "var(--found-color)",
      actionReportId: "rep-113",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-main)" }}>
          Hi {user.name ? user.name.split(" ")[0] : "Student"} 👋
        </h1>
        <p className="text-muted" style={{ fontSize: "15px", marginTop: "2px" }}>
          Here's what's happening with your reports.
        </p>
      </div>

      {/* 4 Clean Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "14px",
        }}
      >
        <StatCard
          label="Lost Items"
          count={lostCount}
          icon={HelpCircle}
          color="var(--lost-color)"
          onClick={() => setActiveTab("reports")}
        />
        <StatCard
          label="Found Items"
          count={foundCount}
          icon={Inbox}
          color="var(--found-color)"
          onClick={() => setActiveTab("reports")}
        />
        <StatCard
          label="Possible Matches"
          count={matchesCount}
          icon={Sparkles}
          color="var(--primary)"
          onClick={() => setActiveTab("matches")}
        />
        <StatCard
          label="Recovered"
          count={recoveredCount}
          icon={CheckCircle2}
          color="var(--found-color)"
          onClick={() => setActiveTab("reports")}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Navigation Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          borderBottom: "1px solid var(--border-light)",
          paddingBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "all", label: "Overview" },
          { id: "reports", label: `Your Reports (${userReports.length})` },
          { id: "matches", label: `Possible Matches (${allMatches.length})` },
          { id: "claims", label: `Your Claims (${claims.length})` },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                padding: "6px 12px",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--primary)" : "var(--text-muted)",
                borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                cursor: "pointer",
                borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: ALL / OVERVIEW */}
      {(activeTab === "all" || activeTab === "reports") && (
        <section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Your recent reports</h2>
            <button
              onClick={() => navigateTo("explore")}
              className="btn btn-secondary btn-sm"
            >
              View campus feed
            </button>
          </div>

          {userReports.length === 0 ? (
            <EmptyState
              title="You haven't reported anything yet."
              description="Have you lost or found something around the college campus? Post a quick report to help reconnect belongings."
              actionText="Report an Item"
              onAction={() => navigateTo("report-lost")}
            />
          ) : (
            <div className="feed-grid">
              {userReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECTION: Possible Matches */}
      {(activeTab === "all" || activeTab === "matches") && (
        <section style={{ marginTop: activeTab === "all" ? "12px" : 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} color="var(--primary)" />
              <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Possible matches</h2>
            </div>
            <span className="text-muted text-xs">
              Based on campus building, category, and report timing
            </span>
          </div>

          {allMatches.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="No possible matches yet."
              description="When someone reports a found item matching your lost notices, it will appear here for comparison."
            />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
              {allMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECTION: Active Claims */}
      {(activeTab === "all" || activeTab === "claims") && (
        <section style={{ marginTop: activeTab === "all" ? "12px" : 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Your claims & handovers</h2>
            <span className="text-muted text-xs">
              Track verification questions and handover drop-off points
            </span>
          </div>

          {claims.length === 0 ? (
            <EmptyState
              title="No active claims."
              description="When you find your lost item in the feed and submit a claim, you can track verification here."
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {claims.map((claim) => (
                <ClaimStatusCard key={claim.id} claim={claim} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECTION: Recent Activity */}
      {activeTab === "all" && (
        <section style={{ marginTop: "12px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "14px" }}>
            Recent activity
          </h2>
          <RecentActivityList activities={recentActivities} />
        </section>
      )}
    </div>
  );
}
