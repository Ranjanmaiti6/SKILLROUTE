import React, { useRef } from "react";
import { Camera, Plus, Trash2, RefreshCw } from "lucide-react";

export function PhotoUploader({ images = [], onChange, maxPhotos = 3 }) {
  const fileInputRef = useRef(null);

  const sampleCampusPhotos = [
    { label: "Calculator on desk", url: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80" },
    { label: "Backpack on bench", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" },
    { label: "Charger beside books", url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80" },
    { label: "Water bottle", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80" },
    { label: "Keys on concrete", url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80" },
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.slice(0, maxPhotos - images.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange([...images, event.target.result]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemovePhoto = (index) => {
    const next = [...images];
    next.splice(index, 1);
    onChange(next);
  };

  const handleAddSample = (url) => {
    if (images.length < maxPhotos) {
      onChange([...images, url]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {/* Main Upload Box / Previews */}
      {images.length === 0 ? (
        <div
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          style={{
            border: "2px dashed var(--border-strong)",
            borderRadius: "var(--radius-md)",
            padding: "36px 20px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#ffffff",
            transition: "all var(--transition-fast)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          className="upload-dropzone"
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "var(--bg-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
            }}
          >
            <Camera size={22} />
          </div>
          <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--text-main)" }}>
            + Add photo
          </span>
          <p className="text-muted text-xs" style={{ maxWidth: "280px" }}>
            Photos help students recognize their belongings. Normal phone camera photos work best.
          </p>
          <span style={{ fontSize: "11px", color: "var(--text-light)" }}>
            JPG, PNG up to 5 MB • Maximum {maxPhotos} photos
          </span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Photos Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: images.length === 1 ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
            }}
          >
            {images.map((imgSrc, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "#000000",
                  aspectRatio: "4/3",
                }}
              >
                <img
                  src={imgSrc}
                  alt={`Photo preview ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: "rgba(15, 23, 42, 0.75)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "11px",
                  }}
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            ))}
          </div>

          {/* Action buttons below previews */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
            {images.length < maxPhotos && (
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="btn btn-secondary btn-sm"
              >
                <Plus size={14} /> Add another photo ({images.length}/{maxPhotos})
              </button>
            )}
            <button
              type="button"
              onClick={() => onChange([])}
              style={{
                background: "none",
                border: "none",
                fontSize: "12px",
                color: "var(--lost-color)",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              Clear all photos
            </button>
          </div>
        </div>
      )}

      {/* Quick Demo Previews Selector for Instant Testing */}
      {images.length === 0 && (
        <div style={{ marginTop: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
            Or choose a realistic campus photo sample:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {sampleCampusPhotos.map((sample, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddSample(sample.url)}
                style={{
                  fontSize: "11px",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  color: "var(--text-main)",
                }}
              >
                + {sample.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
