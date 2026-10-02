import React from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Badge } from "../common/Badge";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { formatRelativeTime } from "../../utils/dateUtils";
import { useApp } from "../../context/AppContext";

export function ReportCard({ report }) {
  const { navigateTo } = useApp();

  const isLost = report.type === "LOST";
  const firstImage = report.images && report.images.length > 0 ? report.images[0] : null;

  return (
    <div
      className="report-card"
      onClick={() => navigateTo("report-detail", { reportId: report.id })}
    >
      {/* Real-world phone photograph */}
      <div className="report-card-image-wrap">
        <ImageWithFallback
          src={firstImage}
          alt={report.title}
          aspectRatio="4/3"
        />

        {/* Type Badge placed over image or header */}
        <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 2 }}>
          <Badge type={report.type}>{report.type}</Badge>
        </div>

        {report.status === "RESOLVED" && (
          <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 2 }}>
            <Badge type="RESOLVED">Recovered</Badge>
          </div>
        )}
      </div>

      {/* Card Content - Notice style, NOT e-commerce */}
      <div className="report-card-body">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.3 }}>
            {report.title}
          </h3>
        </div>

        <p
          className="text-muted text-sm"
          style={{
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            margin: "2px 0 6px 0",
          }}
        >
          {report.description}
        </p>

        {/* Location & Time metadata */}
        <div className="report-meta-row" style={{ marginTop: "auto" }}>
          <span className="report-meta-item">
            <MapPin size={13} color="var(--primary)" />
            <span style={{ fontWeight: 500, color: "var(--text-main)" }}>{report.location}</span>
          </span>
          <span className="report-meta-item">
            <Clock size={13} />
            <span>{formatRelativeTime(report.createdAt || report.date)}</span>
          </span>
        </div>

        {/* View Details Link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "10px",
            borderTop: "1px solid var(--border-light)",
            marginTop: "6px",
            fontSize: "13px",
            color: "var(--primary)",
            fontWeight: 500,
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            {report.category}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            View Report <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </div>
  );
}
