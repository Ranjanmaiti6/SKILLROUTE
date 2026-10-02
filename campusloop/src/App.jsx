import React, { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider, useApp } from "./context/AppContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/public/HomePage";
import { AboutPage } from "./pages/public/AboutPage";
import { ExplorePage } from "./pages/reports/ExplorePage";
import { ReportLostPage } from "./pages/reports/ReportLostPage";
import { ReportFoundPage } from "./pages/reports/ReportFoundPage";
import { ReportDetailPage } from "./pages/reports/ReportDetailPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AdminDashboardPage } from "./pages/dashboard/AdminDashboardPage";
import { ProfilePage } from "./pages/dashboard/ProfilePage";
import { ClaimsHistoryPage } from "./pages/claims/ClaimsHistoryPage";
import { PAGE_TITLES } from "./routes/navigation";

function MainRouter() {
  const { currentPage } = useApp();

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage] || "CampusLoop • Campus Lost & Found";
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "explore":
        return <ExplorePage />;
      case "report-lost":
        return <ReportLostPage />;
      case "report-found":
        return <ReportFoundPage />;
      case "report-detail":
        return <ReportDetailPage />;
      case "dashboard":
        return <DashboardPage />;
      case "admin":
        return <AdminDashboardPage />;
      case "profile":
        return <ProfilePage />;
      case "about":
        return <AboutPage />;
      case "claims":
        return <ClaimsHistoryPage />;
      default:
        return <HomePage />;
    }
  };

  return <Layout>{renderCurrentPage()}</Layout>;
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainRouter />
      </AppProvider>
    </AuthProvider>
  );
}
