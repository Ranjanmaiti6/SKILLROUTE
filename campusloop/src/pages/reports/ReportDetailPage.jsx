import React, { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, User, ShieldCheck, Check, Sparkles, Share2, CheckCircle2 } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { ImageWithFallback } from "../../components/common/ImageWithFallback";
import { MatchCard } from "../../components/matching/MatchCard";
import { formatFriendlyDate, formatRelativeTime } from "../../utils/dateUtils";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useMatches } from "../../hooks/useMatches";

export function ReportDetailPage() {
  const { reports, selectedReportId, navigateTo, setClaimTargetReport, setActiveModal, markAsRecovered, showToast } = useApp();
  const { user } = useAuth();

  const report = reports.find((r) => r.id === selectedReportId) || reports[0];
  const { reportMatches } = useMatches(report ? report.id : null);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!report) {
    return (
      <div style={{ textAlign: "center", padding: "48px 20px" }}>
        <p>Report not found.</p>
        <button onClick={() => navigateTo("explore")} className="btn btn-primary" style={{ marginTop: "12px" }}>
          Back to Lost & Found
        </button>
      </div>
    );
  }

  const isOwner = user && user.id === report.reporterId;
  const isFound = report.type === "FOUND";
  const images = report.images && report.images.length > 0 ? report.images : [];
  const currentImage = images[activePhotoIndex] || null;

  const handleClaimClick = () => {
    setClaimTargetReport(report);
    setActiveModal("claim");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Notice link copied to clipboard.", "info");
    } else {
      showToast("Link ready to share with campus peers.", "info");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Back button & Action row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        <button
          type="button"
          onClick={() => navigateTo("explore")}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ArrowLeft size={14} /> Back to Lost & Found
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isOwner && report.status !== "RESOLVED" && (
            <button
              onClick={() => markAsRecovered(report.id)}
              className="btn btn-secondary btn-sm"
            >
              <CheckCircle2 size={13} color="var(--found-color)" /> Mark as Recovered
            </button>
          )}

          <button
            onClick={handleShare}
            className="btn btn-secondary btn-sm"
            title="Share notice link with classmates"
          >
            <Share2 size={13} /> Share Notice
          </button>
        </div>
      </div>

      {/* Main Notice Box - Two Column Layout (Photo Left, Notice Right) */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 0,
          }}
          className="notice-detail-grid"
        >
          {/* LEFT: Large real-world photograph */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRight: "1px solid var(--border-light)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "1px solid var(--border-light)",
                backgroundColor: "#000000",
                position: "relative",
              }}
            >
              <ImageWithFallback
                src={currentImage}
                alt={report.title}
                aspectRatio="4/3"
                showBadge={true}
              />
            </div>

            {/* Thumbnail switcher if multiple images */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: "8px" }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    style={{
                      width: "60px",
                      height: "45px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      border: activePhotoIndex === idx ? "2px solid var(--primary)" : "1px solid var(--border-light)",
                      padding: 0,
                      cursor: "pointer",
                      opacity: activePhotoIndex === idx ? 1 : 0.7,
                    }}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}

            {report.photoCaption && (
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic", textAlign: "center" }}>
                "{report.photoCaption}"
              </span>
            )}
          </div>

          {/* RIGHT: Notice Details & Actions */}
          <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Header info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Badge type={report.type}>{report.type}</Badge>
                <span className="badge badge-category">{report.category}</span>
                {report.status === "RESOLVED" && <Badge type="RESOLVED">Resolved / Recovered</Badge>}
              </div>

              <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-main)", lineHeight: 1.25 }}>
                {report.title}
              </h1>

              <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px" }}>
                {isFound ? "Found near" : "Lost near"} <strong>{report.location}</strong>
                {report.specificPlace ? ` (${report.specificPlace})` : ""}
              </p>
            </div>

            {/* Meta tags: Location, Date, Time */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "13px",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={14} color="var(--primary)" />
                <span>
                  <strong>Location:</strong> {report.location} {report.specificPlace && `• ${report.specificPlace}`}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={14} />
                <span>
                  <strong>Date:</strong> {formatFriendlyDate(report.date)}
                </span>
              </div>

              {report.timeApprox && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Clock size={14} />
                  <span>
                    <strong>Time:</strong> {report.timeApprox}
                  </span>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <User size={14} />
                <span>
                  <strong>Reported by:</strong> {report.reporterName} ({report.reporterYearDept || "Student"}) • {formatRelativeTime(report.createdAt)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
                Description
              </h4>
              <p style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.55 }}>
                {report.description}
              </p>
            </div>

            {/* Specific attributes */}
            {(report.color || report.brand || report.distinguishingMarks) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", color: "var(--text-muted)" }}>
                {report.color && (
                  <div>
                    <strong>Color:</strong> {report.color}
                  </div>
                )}
                {report.brand && (
                  <div>
                    <strong>Brand / Model:</strong> {report.brand}
                  </div>
                )}
                {report.distinguishingMarks && (
                  <div>
                    <strong>Distinguishing marks:</strong> {report.distinguishingMarks}
                  </div>
                )}
                {report.currentLocation && (
                  <div style={{ color: "var(--primary)", marginTop: "4px" }}>
                    <strong>Current handover point:</strong> {report.currentLocation}
                  </div>
                )}
              </div>
            )}

            {/* Action Box: Claim or Contact */}
            <div
              style={{
                marginTop: "auto",
                paddingTop: "16px",
                borderTop: "1px solid var(--border-light)",
              }}
            >
              {isFound ? (
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                    Think this is yours?
                  </h4>
                  <p className="text-muted text-xs" style={{ marginBottom: "12px" }}>
                    Answer the private verification detail set by {report.reporterName} to request a claim.
                  </p>
                  <button
                    onClick={handleClaimClick}
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "10px 16px" }}
                  >
                    <ShieldCheck size={16} /> Request to claim
                  </button>
                </div>
              ) : (
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                    Found this item on campus?
                  </h4>
                  <p className="text-muted text-xs" style={{ marginBottom: "12px" }}>
                    Let the student know or deposit it with the nearest Campus Security Desk.
                  </p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => navigateTo("report-found")}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      Report as Found
                    </button>
                    <a
                      href={`mailto:${report.reporterContact}?subject=Regarding your lost ${report.title} on CampusLoop`}
                      className="btn btn-secondary"
                    >
                      Email Reporter
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BELOW: Possible Matches section (Only if applicable) */}
      {reportMatches && reportMatches.length > 0 && (
        <section style={{ marginTop: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Sparkles size={16} color="var(--primary)" />
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Possible matches</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
            {reportMatches.map((m) => (
              <MatchCard key={m.id} match={m} userReport={report} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
