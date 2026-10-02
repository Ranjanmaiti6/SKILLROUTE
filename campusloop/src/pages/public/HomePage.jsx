import React from "react";
import { PlusCircle, Search, ArrowRight, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { ReportCard } from "../../components/reports/ReportCard";
import { useApp } from "../../context/AppContext";

export function HomePage() {
  const { reports, navigateTo } = useApp();

  // Show 6 most recent reports in the feed
  const recentReports = reports.slice(0, 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-md)",
          padding: "36px 28px",
          textAlign: "center",
          maxWidth: "760px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--primary)",
            backgroundColor: "var(--primary-light)",
            padding: "4px 10px",
            borderRadius: "var(--radius-full)",
            marginBottom: "14px",
          }}
        >
          <Sparkles size={13} />
          Campus Community Lost & Found
        </span>

        <h1
          style={{
            fontSize: "30px",
            fontWeight: 700,
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
            marginBottom: "10px",
          }}
        >
          Lost something on campus?
        </h1>

        <p
          className="text-muted"
          style={{
            fontSize: "16px",
            maxWidth: "520px",
            margin: "0 auto 24px auto",
            lineHeight: 1.5,
          }}
        >
          Report it here. Someone may have already found it.
        </p>

        {/* Primary Action Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigateTo("report-lost")}
            className="btn btn-danger btn-lg"
            style={{ fontWeight: 600 }}
          >
            Report Lost Item
          </button>

          <button
            onClick={() => navigateTo("report-found")}
            className="btn btn-primary btn-lg"
            style={{ fontWeight: 600 }}
          >
            Report Found Item
          </button>
        </div>

        {/* Micro campus info bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid var(--border-light)",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <MapPin size={13} color="var(--primary)" />
            Covers Classrooms, Labs, Library, Canteen & Hostels
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ShieldCheck size={13} color="var(--found-color)" />
            Private Verification for Claims
          </span>
        </div>
      </section>

      {/* Recently Reported Section */}
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "19px", fontWeight: 600 }}>Recently reported</h2>
            <p className="text-muted text-sm">
              Recent notices posted by students across campus
            </p>
          </div>

          <button
            onClick={() => navigateTo("explore")}
            className="btn btn-secondary btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            Browse all notices <ArrowRight size={13} />
          </button>
        </div>

        {/* Notice Feed - Vertical 2-column on desktop, 1-col on mobile */}
        <div className="feed-grid">
          {recentReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            onClick={() => navigateTo("explore")}
            className="btn btn-secondary"
            style={{ padding: "8px 24px" }}
          >
            View all {reports.length} campus reports
          </button>
        </div>
      </section>
    </div>
  );
}
