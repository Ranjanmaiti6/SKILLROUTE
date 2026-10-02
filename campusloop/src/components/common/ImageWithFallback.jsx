import React, { useState } from "react";
import { Camera, ImageOff } from "lucide-react";

export function ImageWithFallback({
  src,
  alt = "Campus item photograph",
  aspectRatio = "4/3",
  className = "",
  showBadge = true,
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fallbackBackground = (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f1f5f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
        padding: "16px",
        textAlign: "center",
        gap: "6px",
      }}
    >
      <Camera size={26} strokeWidth={1.5} color="#94a3b8" />
      <span style={{ fontSize: "11px", fontWeight: 500, color: "#94a3b8" }}>
        Campus photograph
      </span>
    </div>
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspectRatio,
        backgroundColor: "#f1f5f9",
        overflow: "hidden",
      }}
      className={className}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0.8,
            transition: "opacity 150ms ease, transform 250ms ease",
          }}
          loading="lazy"
        />
      ) : (
        fallbackBackground
      )}

      {/* Casual student photo badge */}
      {showBadge && (
        <span
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            color: "#ffffff",
            fontSize: "10px",
            fontWeight: 500,
            padding: "2px 6px",
            borderRadius: "4px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            backdropFilter: "blur(2px)",
            pointerEvents: "none",
          }}
        >
          <Camera size={10} /> Photo
        </span>
      )}
    </div>
  );
}
