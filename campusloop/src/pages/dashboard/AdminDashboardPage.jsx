import React, { useState } from "react";
import { Badge } from "../../components/common/Badge";
import { ImageWithFallback } from "../../components/common/ImageWithFallback";
import { formatRelativeTime } from "../../utils/dateUtils";
import { Shield, CheckCircle2, Clock, FileText, Check, X, Eye } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useClaims } from "../../hooks/useClaims";

export function AdminDashboardPage() {
  const { reports, markAsRecovered, navigateTo } = useApp();
  const { allClaims, updateClaimStatus } = useClaims();

  const [filterType, setFilterType] = useState("ALL");

  // Admin stats
  const reportsToday = reports.filter((r) => {
    const d = new Date(r.createdAt || r.date);
    const now = new Date();
    return (now - d) / (1000 * 60 * 60) <= 24;
  }).length;

  const pendingReports = reports.filter((r) => r.status === "ACTIVE").length;
  const pendingClaims = allClaims.filter((c) => c.status === "UNDER_REVIEW" || c.status === "PENDING").length;
  const recoveredItems = reports.filter((r) => r.status === "RESOLVED").length;

  const filteredReports = reports.filter((r) => {
    if (filterType === "ALL") return true;
    return r.type === filterType;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          borderBottom: "1px solid var(--border-light)",
          paddingBottom: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "4px",
                backgroundColor: "var(--warning-bg)",
                color: "var(--warning-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={14} />
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700 }}>
              Campus Security & Admin Desk
            </h1>
          </div>
          <p className="text-muted text-sm">
            Main Gate Cabin 101 • Lost & Found Verification Desk
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => navigateTo("dashboard")}
            className="btn btn-secondary btn-sm"
          >
            Switch to Student View
          </button>
        </div>
      </div>

      {/* 4 Admin Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
        }}
      >
        <div className="card" style={{ padding: "16px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
            Reports today
          </span>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-main)", marginTop: "4px" }}>
            {reportsToday}
          </div>
        </div>

        <div className="card" style={{ padding: "16px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
            Pending active notices
          </span>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--warning-color)", marginTop: "4px" }}>
            {pendingReports}
          </div>
        </div>

        <div className="card" style={{ padding: "16px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
            Pending claims to verify
          </span>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--primary)", marginTop: "4px" }}>
            {pendingClaims}
          </div>
        </div>

        <div className="card" style={{ padding: "16px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
            Recovered / Handed over
          </span>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--found-color)", marginTop: "4px" }}>
            {recoveredItems}
          </div>
        </div>
      </div>

      {/* Pending Claims Review Section */}
      {pendingClaims > 0 && (
        <section>
          <h2 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "12px" }}>
            Claims requiring verification ({pendingClaims})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {allClaims
              .filter((c) => c.status === "UNDER_REVIEW" || c.status === "PENDING")
              .map((c) => (
                <div
                  key={c.id}
                  className="card"
                  style={{
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>{c.reportTitle}</h4>
                    <p className="text-muted text-xs" style={{ marginTop: "2px" }}>
                      Claimant: <strong>{c.claimantName}</strong> ({c.claimantContact})
                    </p>
                    <p style={{ fontSize: "12px", marginTop: "4px" }}>
                      <strong>Answer:</strong> "{c.claimantAnswer}"
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => updateClaimStatus(c.id, "REJECTED")}
                      className="btn btn-secondary btn-sm"
                    >
                      <X size={13} /> Reject
                    </button>
                    <button
                      onClick={() => updateClaimStatus(c.id, "APPROVED")}
                      className="btn btn-primary btn-sm"
                    >
                      <Check size={13} /> Verify & Approve Handover
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Recent Reports Table Section */}
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <h2 style={{ fontSize: "17px", fontWeight: 600 }}>Recent reports</h2>

          <div style={{ display: "flex", gap: "6px" }}>
            {["ALL", "LOST", "FOUND"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  border: filterType === t ? "1px solid var(--primary)" : "1px solid var(--border-light)",
                  backgroundColor: filterType === t ? "var(--primary-light)" : "#fff",
                  color: filterType === t ? "var(--primary)" : "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table */}
        <div
          className="admin-table-container"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-subtle)", borderBottom: "1px solid var(--border-light)" }}>
                <th style={{ padding: "10px 14px", fontWeight: 600, color: "var(--text-muted)", width: "60px" }}>Item</th>
                <th style={{ padding: "10px 14px", fontWeight: 600, color: "var(--text-muted)" }}>Title & Location</th>
                <th style={{ padding: "10px 14px", fontWeight: 600, color: "var(--text-muted)" }}>Type</th>
                <th style={{ padding: "10px 14px", fontWeight: 600, color: "var(--text-muted)" }}>Reporter</th>
                <th style={{ padding: "10px 14px", fontWeight: 600, color: "var(--text-muted)" }}>Time</th>
                <th style={{ padding: "10px 14px", fontWeight: 600, color: "var(--text-muted)" }}>Status</th>
                <th style={{ padding: "10px 14px", fontWeight: 600, color: "var(--text-muted)", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ width: "42px", height: "32px", borderRadius: "3px", overflow: "hidden" }}>
                      <ImageWithFallback
                        src={report.images && report.images[0]}
                        alt={report.title}
                        aspectRatio="4/3"
                        showBadge={false}
                      />
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{report.title}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{report.location}</div>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <Badge type={report.type}>{report.type}</Badge>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <div>{report.reporterName}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{report.reporterYearDept}</div>
                  </td>
                  <td style={{ padding: "10px 14px", color: "var(--text-muted)" }}>
                    {formatRelativeTime(report.createdAt || report.date)}
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        backgroundColor: report.status === "RESOLVED" ? "var(--found-bg)" : "var(--bg-subtle)",
                        color: report.status === "RESOLVED" ? "var(--found-color)" : "var(--text-main)",
                        fontWeight: 600,
                      }}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button
                        onClick={() => navigateTo("report-detail", { reportId: report.id })}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "3px 8px", fontSize: "11px" }}
                      >
                        <Eye size={12} /> View
                      </button>
                      {report.status !== "RESOLVED" && (
                        <button
                          onClick={() => markAsRecovered(report.id)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "3px 8px", fontSize: "11px" }}
                          title="Mark resolved"
                        >
                          <Check size={12} color="var(--found-color)" /> Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
