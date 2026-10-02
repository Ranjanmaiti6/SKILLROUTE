import React, { useState } from "react";
import {
  Compass,
  FileText,
  Sparkles,
  Bell,
  User,
  PlusCircle,
  Shield,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { NotificationDropdown } from "../notifications/NotificationDropdown";

export function Navbar() {
  const { currentPage, navigateTo, unreadCount } = useApp();
  const { user, role, switchRole, isAdmin } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <div
            className="navbar-brand"
            onClick={() => navigateTo("home")}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "var(--primary)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              CL
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--primary)", lineHeight: 1.1 }}>
                CampusLoop
              </span>
              <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 500 }}>
                Campus Lost & Found
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="navbar-nav">
            <button
              onClick={() => navigateTo("explore")}
              className={`nav-link ${currentPage === "explore" ? "active" : ""}`}
            >
              <Compass size={16} />
              Lost & Found
            </button>

            <button
              onClick={() => navigateTo("dashboard")}
              className={`nav-link ${currentPage === "dashboard" ? "active" : ""}`}
            >
              <FileText size={16} />
              My Reports
            </button>

            <button
              onClick={() => navigateTo("dashboard", { tab: "matches" })}
              className={`nav-link ${currentPage === "matches" ? "active" : ""}`}
            >
              <Sparkles size={16} />
              Matches
            </button>

            <button
              onClick={() => navigateTo("about")}
              className={`nav-link ${currentPage === "about" ? "active" : ""}`}
            >
              How it works
            </button>
          </nav>

          {/* Right Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Quick Report Buttons (Desktop) */}
            <div className="desktop-actions" style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => navigateTo("report-lost")}
                className="btn btn-danger btn-sm"
                style={{ fontSize: "13px", padding: "6px 12px" }}
              >
                + Report Lost
              </button>
              <button
                onClick={() => navigateTo("report-found")}
                className="btn btn-primary btn-sm"
                style={{ fontSize: "13px", padding: "6px 12px" }}
              >
                + Report Found
              </button>
            </div>

            {/* Notifications Button & Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{
                  padding: "6px 8px",
                  position: "relative",
                  borderRadius: "6px",
                }}
                aria-label="Notifications"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      backgroundColor: "var(--lost-color)",
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: 700,
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationDropdown
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            {/* User Profile / Role Switcher Menu */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 8px",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    backgroundColor: isAdmin ? "var(--warning-border)" : "var(--primary-light)",
                    color: isAdmin ? "var(--warning-color)" : "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  {isAdmin ? <Shield size={12} /> : user.name ? user.name.charAt(0) : "U"}
                </div>
                <span className="user-name-label" style={{ fontSize: "13px", fontWeight: 500 }}>
                  {isAdmin ? "Admin Desk" : "Ranjan"}
                </span>
                <ChevronDown size={13} color="var(--text-muted)" />
              </button>

              {showUserMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "6px",
                    width: "220px",
                    backgroundColor: "#ffffff",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-dropdown)",
                    zIndex: 50,
                    padding: "6px 0",
                  }}
                >
                  <div style={{ padding: "8px 14px", borderBottom: "1px solid var(--border-light)" }}>
                    <p style={{ fontWeight: 600, fontSize: "13px" }}>{user.name}</p>
                    <p className="text-muted text-xs">{user.email || user.department}</p>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "4px",
                        fontSize: "10px",
                        padding: "1px 6px",
                        borderRadius: "4px",
                        backgroundColor: isAdmin ? "var(--warning-bg)" : "var(--primary-light)",
                        color: isAdmin ? "var(--warning-color)" : "var(--primary)",
                        fontWeight: 600,
                      }}
                    >
                      {isAdmin ? "Campus Admin Desk" : "Student Account"}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      navigateTo("profile");
                      setShowUserMenu(false);
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 14px",
                      background: "none",
                      border: "none",
                      fontSize: "13px",
                      color: "var(--text-main)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    className="dropdown-item"
                  >
                    <User size={14} color="var(--text-muted)" />
                    Student Profile
                  </button>

                  <button
                    onClick={() => {
                      navigateTo("dashboard");
                      setShowUserMenu(false);
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 14px",
                      background: "none",
                      border: "none",
                      fontSize: "13px",
                      color: "var(--text-main)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    className="dropdown-item"
                  >
                    <FileText size={14} color="var(--text-muted)" />
                    My Reports & Claims
                  </button>

                  <button
                    onClick={() => {
                      navigateTo("admin");
                      setShowUserMenu(false);
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 14px",
                      background: "none",
                      border: "none",
                      fontSize: "13px",
                      color: "var(--text-main)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    className="dropdown-item"
                  >
                    <Shield size={14} color="var(--text-muted)" />
                    Campus Admin View
                  </button>

                  <div style={{ margin: "4px 0", borderTop: "1px solid var(--border-light)" }} />

                  <div style={{ padding: "6px 14px" }}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                      Switch View / Role:
                    </span>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button
                        onClick={() => {
                          switchRole("student");
                          setShowUserMenu(false);
                        }}
                        style={{
                          flex: 1,
                          fontSize: "11px",
                          padding: "4px 6px",
                          borderRadius: "4px",
                          border: "1px solid var(--border-light)",
                          backgroundColor: role === "student" ? "var(--primary-light)" : "#fff",
                          color: role === "student" ? "var(--primary)" : "var(--text-main)",
                          fontWeight: role === "student" ? 600 : 400,
                          cursor: "pointer",
                        }}
                      >
                        Student
                      </button>
                      <button
                        onClick={() => {
                          switchRole("admin");
                          setShowUserMenu(false);
                        }}
                        style={{
                          flex: 1,
                          fontSize: "11px",
                          padding: "4px 6px",
                          borderRadius: "4px",
                          border: "1px solid var(--border-light)",
                          backgroundColor: role === "admin" ? "var(--warning-bg)" : "#fff",
                          color: role === "admin" ? "var(--warning-color)" : "var(--text-main)",
                          fontWeight: role === "admin" ? 600 : 400,
                          cursor: "pointer",
                        }}
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="btn btn-secondary btn-sm mobile-menu-btn"
              style={{ padding: "6px 8px", display: "none" }}
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {showMobileMenu && (
          <div
            style={{
              padding: "12px 0 16px 0",
              borderTop: "1px solid var(--border-light)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
              <button
                onClick={() => {
                  navigateTo("report-lost");
                  setShowMobileMenu(false);
                }}
                className="btn btn-danger btn-sm"
              >
                + Report Lost
              </button>
              <button
                onClick={() => {
                  navigateTo("report-found");
                  setShowMobileMenu(false);
                }}
                className="btn btn-primary btn-sm"
              >
                + Report Found
              </button>
            </div>
            <button
              onClick={() => {
                navigateTo("explore");
                setShowMobileMenu(false);
              }}
              className="nav-link"
              style={{ width: "100%" }}
            >
              <Compass size={16} /> Lost & Found Feed
            </button>
            <button
              onClick={() => {
                navigateTo("dashboard");
                setShowMobileMenu(false);
              }}
              className="nav-link"
              style={{ width: "100%" }}
            >
              <FileText size={16} /> My Reports & Claims
            </button>
            <button
              onClick={() => {
                navigateTo("profile");
                setShowMobileMenu(false);
              }}
              className="nav-link"
              style={{ width: "100%" }}
            >
              <User size={16} /> Student Profile
            </button>
            <button
              onClick={() => {
                navigateTo("admin");
                setShowMobileMenu(false);
              }}
              className="nav-link"
              style={{ width: "100%" }}
            >
              <Shield size={16} /> Admin Portal
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
