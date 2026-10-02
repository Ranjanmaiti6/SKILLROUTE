import React from "react";
import { ShieldCheck, Camera, Search, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function AboutPage() {
  const { navigateTo } = useApp();

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "6px" }}>
          How CampusLoop Works
        </h1>
        <p className="text-muted" style={{ fontSize: "15px" }}>
          A simple student-built utility to recover lost belongings quickly and safely.
        </p>
      </div>

      {/* Philosophy Callout */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-md)",
          padding: "20px 24px",
          borderLeft: "4px solid var(--primary)",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--primary)", marginBottom: "4px" }}>
          "Students helping students find lost belongings."
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.5 }}>
          College campuses are busy places. Calculators get left in tutorial rooms, chargers stay plugged into library cubicles, and water bottles get left at sports grounds. CampusLoop provides a central bulletin notice board instead of chaotic WhatsApp groups.
        </p>
      </div>

      {/* 4-Step Process */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
        {/* Step 1 */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "15px",
                flexShrink: 0,
              }}
            >
              1
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
                1. Take a quick photo and report
              </h3>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                Found an item? Snap a casual photo using your phone right where you found it (e.g. on the classroom desk or canteen bench). Select the campus location and approximate time.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "15px",
                flexShrink: 0,
              }}
            >
              2
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
                2. Smart Campus Matching
              </h3>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                When someone reports a lost item, our matching engine checks against recently found items in that building or category. You get an immediate notice if there's a strong candidate match.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "15px",
                flexShrink: 0,
              }}
            >
              3
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
                3. Private Ownership Verification
              </h3>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                To avoid false claims, the finder sets a private verification question (e.g., "What initials are inside the cover?" or "What sticker is on the back?"). Only the genuine owner knows this detail.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "15px",
                flexShrink: 0,
              }}
            >
              4
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
                4. Safe Campus Handover
              </h3>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                Meet the student finder in a safe public spot (like Central Library entrance or Canteen) or collect the item from the designated campus security desk (Room 101, Main Gate).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "12px" }}>
        <button onClick={() => navigateTo("explore")} className="btn btn-secondary">
          Explore Lost & Found
        </button>
        <button onClick={() => navigateTo("report-lost")} className="btn btn-danger">
          Report a Lost Item
        </button>
      </div>
    </div>
  );
}
