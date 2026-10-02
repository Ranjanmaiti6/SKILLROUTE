import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toast } from "../common/Toast";
import { ClaimModal } from "../claims/ClaimModal";
import { MatchComparisonModal } from "../matching/MatchComparisonModal";
import { useApp } from "../../context/AppContext";

export function Layout({ children }) {
  const { activeModal, setActiveModal, claimTargetReport, selectedMatch } = useApp();

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
      <Footer />
      <Toast />

      {/* Global Modals for Claim & Match Comparison */}
      {activeModal === "claim" && claimTargetReport && (
        <ClaimModal
          isOpen={true}
          report={claimTargetReport}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "compare" && selectedMatch && (
        <MatchComparisonModal
          isOpen={true}
          match={selectedMatch}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
