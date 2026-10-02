import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { Check, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function ClaimModal({ isOpen, onClose, report }) {
  const { submitClaim } = useApp();

  // 3-step claim progress: 1: Claim, 2: Verify, 3: Confirmation
  const [step, setStep] = useState(1);
  const [claimReason, setClaimReason] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  if (!report) return null;

  const verificationQuestion =
    report.privateVerification?.question ||
    "What specific private mark, sticker, or detail distinguishes this item as yours?";

  const handleNextToVerify = () => {
    setStep(2);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (!answer || answer.trim().length < 3) {
      setError("Please provide an answer to verify ownership.");
      return;
    }

    submitClaim({
      report,
      answer,
      reason: claimReason,
    });

    setStep(3); // Go to Confirmation
  };

  const handleDone = () => {
    setStep(1);
    setAnswer("");
    setClaimReason("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleDone}
      title={step === 3 ? "Claim Submitted" : "Request Claim"}
      subtitle={
        step === 1
          ? "Step 1 of 3: Ownership statement"
          : step === 2
          ? "Step 2 of 3: Verification detail"
          : "Step 3 of 3: Waiting for confirmation"
      }
      maxWidth="520px"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {/* Simple 3-step progress indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            backgroundColor: "var(--bg-subtle)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-light)",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: step >= 1 ? "var(--primary)" : "var(--text-muted)" }}>
            <span
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: step >= 1 ? "var(--primary)" : "var(--border-strong)",
                color: "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              1
            </span>
            <span>Claim</span>
          </div>
          <span style={{ color: "var(--text-light)" }}>→</span>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: step >= 2 ? "var(--primary)" : "var(--text-muted)" }}>
            <span
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: step >= 2 ? "var(--primary)" : "var(--border-strong)",
                color: "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              2
            </span>
            <span>Verify</span>
          </div>
          <span style={{ color: "var(--text-light)" }}>→</span>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: step === 3 ? "var(--found-color)" : "var(--text-muted)" }}>
            <span
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: step === 3 ? "var(--found-color)" : "var(--border-strong)",
                color: "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              3
            </span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* STEP 1: Basic Claim Confirmation */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div
              style={{
                display: "flex",
                gap: "12px",
                padding: "10px",
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                alignItems: "center",
              }}
            >
              <div style={{ width: "64px", height: "48px", borderRadius: "4px", overflow: "hidden", flexShrink: 0 }}>
                <ImageWithFallback
                  src={report.images && report.images[0]}
                  alt={report.title}
                  aspectRatio="4/3"
                  showBadge={false}
                />
              </div>
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 600 }}>{report.title}</h4>
                <p className="text-muted text-xs">
                  Found near {report.location} • Reported by {report.reporterName}
                </p>
              </div>
            </div>

            <p style={{ fontSize: "13px", color: "var(--text-main)" }}>
              To ensure items return to their legitimate student owners, we ask a verification question set by the finder or campus desk.
            </p>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                When and where did you lose this item? (Optional)
              </label>
              <textarea
                value={claimReason}
                onChange={(e) => setClaimReason(e.target.value)}
                placeholder="e.g. I left it on the bench during afternoon lunch around 2 PM..."
                className="form-textarea"
                style={{ minHeight: "65px" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="button" onClick={handleNextToVerify} className="btn btn-primary">
                Continue to Verification <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Let's verify that it's yours */}
        {step === 2 && (
          <form onSubmit={handleSubmitAnswer} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <h4 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-main)", marginBottom: "4px" }}>
                Let's verify that it's yours.
              </h4>
              <p className="text-muted text-xs">
                The student who found this item set a private question that only the real owner can answer.
              </p>
            </div>

            <div
              style={{
                padding: "12px 14px",
                backgroundColor: "var(--primary-light)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--primary-border)",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", display: "block" }}>
                Finder's Verification Question:
              </span>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-main)", marginTop: "4px" }}>
                "{verificationQuestion}"
              </p>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                Your Answer:
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setError("");
                }}
                placeholder="Type your answer here..."
                className="form-input"
                autoFocus
              />
              {error && <span className="form-error">{error}</span>}
              <span className="form-hint">
                This answer will be checked by the finder / campus security desk.
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary btn-sm">
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Submit answer
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Claim Submitted Confirmation */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "center", padding: "10px 0" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "var(--found-bg)",
                border: "1px solid var(--found-border)",
                color: "var(--found-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <Check size={24} strokeWidth={2.5} />
            </div>

            <div>
              <h3 style={{ fontSize: "17px", fontWeight: 600 }}>Claim submitted.</h3>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "6px",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  backgroundColor: "var(--warning-bg)",
                  color: "var(--warning-color)",
                  border: "1px solid var(--warning-border)",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <Clock size={12} /> Status: Waiting for confirmation
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "14px",
                textAlign: "left",
                fontSize: "13px",
                color: "var(--text-muted)",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <p>
                <strong>What happens next:</strong>
              </p>
              <p>
                1. <strong>{report.reporterName}</strong> has been notified of your claim answer.
              </p>
              <p>
                2. Once verified, you will receive a notification with the campus handover location ({report.currentLocation || "Security Desk"}).
              </p>
              <p>
                3. You can track this anytime under <strong>My Reports → Claims</strong>.
              </p>
            </div>

            <button type="button" onClick={handleDone} className="btn btn-primary" style={{ width: "100%" }}>
              Done
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
