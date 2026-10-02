import React from "react";
import { Shield, RotateCcw, MapPin } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function Footer() {
  const { navigateTo, handleResetData } = useApp();

  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid var(--border-light)",
        padding: "36px 0 24px 0",
        marginTop: "auto",
        fontSize: "13px",
        color: "var(--text-muted)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            paddingBottom: "24px",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          {/* Column 1: Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--primary)" }}>
                CAMPUSLOOP
              </span>
              <span className="badge badge-category" style={{ fontSize: "10px" }}>
                Campus Utility
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>
              A student-built network to report, recognize, and safely claim lost belongings across classrooms, libraries, labs, and hostels.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", marginBottom: "8px" }}>
              Campus Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>
                <button
                  onClick={() => navigateTo("explore")}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "13px", padding: 0 }}
                >
                  All Lost & Found Notices
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("report-lost")}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "13px", padding: 0 }}
                >
                  Report a Lost Item
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("report-found")}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "13px", padding: 0 }}
                >
                  Report a Found Item
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("about")}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "13px", padding: 0 }}
                >
                  Verification & Claim Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Physical Drop-off Desks */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", marginBottom: "8px" }}>
              Campus Drop-off Points
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={13} color="var(--primary)" />
                <span>Main Gate Security Cabin (Room 101)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={13} color="var(--primary)" />
                <span>Central Library Circulation Counter</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={13} color="var(--primary)" />
                <span>Academic Block Caretaker Office</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & reset demo data */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "18px",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "12px",
          }}
        >
          <div>
            <span>CampusLoop • Built for students by students</span>
            <span style={{ margin: "0 8px" }}>•</span>
            <span className="text-muted">No commercial ads • Pure campus utility</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => navigateTo("admin")}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: "11px", padding: "3px 8px" }}
            >
              <Shield size={12} /> Admin Desk
            </button>

            <button
              onClick={handleResetData}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: "11px", padding: "3px 8px" }}
              title="Reset mock data to initial campus state"
            >
              <RotateCcw size={12} /> Reset Demo Data
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
