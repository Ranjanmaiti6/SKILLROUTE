import React, { useState } from "react";
import { PhotoUploader } from "../../components/reports/PhotoUploader";
import { itemCategories, campusLocations } from "../../data/mockUsers";
import { validateReportForm } from "../../validators/reportValidator";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

export function ReportFoundPage() {
  const { addReport, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    specificPlace: "",
    date: new Date().toISOString().split("T")[0],
    timeApprox: "",
    color: "",
    brand: "",
    currentLocation: "With me / Can submit to Campus Security Desk",
    verificationQuestion: "What specific sticker, initial, or item is inside or attached to this?",
    verificationAnswer: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImagesChange = (newImages) => {
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateReportForm(formData, "FOUND");
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    const created = addReport({
      ...formData,
      type: "FOUND",
      privateVerification: {
        question: formData.verificationQuestion,
        answer: formData.verificationAnswer,
      },
    });

    setIsSubmitting(false);
    navigateTo("report-detail", { reportId: created.id });
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      {/* Back button */}
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
          marginBottom: "16px",
          padding: 0,
        }}
      >
        <ArrowLeft size={14} /> Back to Lost & Found
      </button>

      {/* Form Container */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-md)",
          padding: "28px 24px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--border-light)" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--found-color)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Found Item Notice
          </span>
          <h1 style={{ fontSize: "22px", fontWeight: 700, marginTop: "2px" }}>
            Report something you found
          </h1>
          <p className="text-muted text-sm" style={{ marginTop: "2px" }}>
            Someone on campus may be looking for this.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Item & Description */}
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "12px", color: "var(--text-main)" }}>
              What did you find?
            </h3>

            <div className="form-group">
              <label className="form-label">
                Item *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Casio Scientific Calculator, Blue Backpack, Apple Charger"
                className="form-input"
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select a category</option>
                {itemCategories.filter((c) => c !== "All Categories").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Public Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Give a general description. Do not mention secret marks or hidden contents so the real owner can verify them later..."
                className="form-textarea"
              />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>
          </div>

          {/* Where found */}
          <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border-light)" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "12px", color: "var(--text-main)" }}>
              Where found
            </h3>

            <div className="form-group">
              <label className="form-label">
                Campus Location *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select campus location</option>
                {campusLocations.filter((l) => l !== "All Locations").map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.location && <span className="form-error">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Specific place / room
              </label>
              <input
                type="text"
                name="specificPlace"
                value={formData.specificPlace}
                onChange={handleChange}
                placeholder="e.g. Room 204 front desk, or Canteen outside bench"
                className="form-input"
              />
            </div>
          </div>

          {/* When found */}
          <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border-light)" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "12px", color: "var(--text-main)" }}>
              When found
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Date found *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.date && <span className="form-error">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Approximate time</label>
                <input
                  type="text"
                  name="timeApprox"
                  value={formData.timeApprox}
                  onChange={handleChange}
                  placeholder="e.g. Around 1:15 PM"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Additional details */}
          <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border-light)" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "12px", color: "var(--text-main)" }}>
              Additional details
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g. Black, Navy Blue, Silver"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Casio, Apple, Milton"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Current item location / Handover status</label>
              <input
                type="text"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                placeholder="e.g. With me in Hostel B Room 218 / Handed over to Main Gate Security"
                className="form-input"
              />
              <span className="form-hint">
                Let the owner know where they can collect the item once verified.
              </span>
            </div>
          </div>

          {/* Photo */}
          <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border-light)" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px", color: "var(--text-main)" }}>
              Photo of item
            </h3>
            <p className="text-muted text-xs" style={{ marginBottom: "12px" }}>
              A casual photo of the found item where you discovered it helps the owner recognize it quickly.
            </p>

            <PhotoUploader
              images={formData.images}
              onChange={handleImagesChange}
              maxPhotos={3}
            />
          </div>

          {/* CRITICAL SECTION 14: Private verification detail */}
          <div
            style={{
              padding: "18px",
              backgroundColor: "var(--bg-subtle)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <Lock size={15} color="var(--primary)" />
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-main)" }}>
                Private verification detail
              </h3>
            </div>
            <p className="text-muted text-xs" style={{ marginBottom: "14px", lineHeight: 1.45 }}>
              Add something only the real owner would know. <strong>This will not be shown publicly.</strong> It will only be presented when someone clicks "Request Claim" so you or campus security can verify them.
            </p>

            <div className="form-group">
              <label className="form-label">
                Verification Question:
              </label>
              <input
                type="text"
                name="verificationQuestion"
                value={formData.verificationQuestion}
                onChange={handleChange}
                placeholder="e.g. What sticker or mark is on the back lid? / What book is inside?"
                className="form-input"
              />
              {errors.verificationQuestion && <span className="form-error">{errors.verificationQuestion}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                Expected Answer (Secret):
              </label>
              <input
                type="text"
                name="verificationAnswer"
                value={formData.verificationAnswer}
                onChange={handleChange}
                placeholder="e.g. Small Naruto sticker in the corner / Initials R.M. in pencil"
                className="form-input"
              />
              {errors.verificationAnswer && <span className="form-error">{errors.verificationAnswer}</span>}
              <span className="form-hint">
                Stored privately. Only used to cross-check when a student files a claim.
              </span>
            </div>
          </div>

          {/* Form Actions */}
          <div
            style={{
              paddingTop: "18px",
              borderTop: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={() => navigateTo("explore")}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit Found Notice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
