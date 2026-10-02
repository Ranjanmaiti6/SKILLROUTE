import React, { useState } from "react";
import { User, Mail, School, BookOpen, MapPin, Calendar, Edit3, Shield, Check } from "lucide-react";
import { Modal } from "../../components/common/Modal";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export function ProfilePage() {
  const { user, updateProfile, isAdmin, role, switchRole } = useAuth();
  const { reports, showToast } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    college: user.college || "",
    department: user.department || "",
    year: user.year || "",
    rollNo: user.rollNo || "",
    email: user.email || "",
    roomNo: user.roomNo || "",
  });

  const userReports = reports.filter((r) => r.reporterId === user.id);
  const reportsCount = userReports.length;
  const foundCount = userReports.filter((r) => r.type === "FOUND").length;
  const recoveredCount = userReports.filter((r) => r.status === "RESOLVED").length;

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditModalOpen(false);
    showToast("Profile details updated.", "success");
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Profile Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-md)",
          padding: "28px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 700,
                border: "2px solid var(--border-light)",
                overflow: "hidden",
              }}
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                user.name.charAt(0)
              )}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 700 }}>{user.name}</h1>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    backgroundColor: isAdmin ? "var(--warning-bg)" : "var(--primary-light)",
                    color: isAdmin ? "var(--warning-color)" : "var(--primary)",
                  }}
                >
                  {isAdmin ? "Admin Desk" : "Verified Student"}
                </span>
              </div>
              <p className="text-muted text-sm" style={{ marginTop: "2px" }}>
                {user.rollNo && <span>{user.rollNo} • </span>}
                {user.department}
              </p>
              <p className="text-muted text-xs" style={{ marginTop: "2px" }}>
                {user.college}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setFormData({
                name: user.name || "",
                college: user.college || "",
                department: user.department || "",
                year: user.year || "",
                rollNo: user.rollNo || "",
                email: user.email || "",
                roomNo: user.roomNo || "",
              });
              setIsEditModalOpen(true);
            }}
            className="btn btn-secondary btn-sm"
          >
            <Edit3 size={13} /> Edit profile
          </button>
        </div>

        {/* 3 Simple Student Stats: Reports, Found, Recovered */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid var(--border-light)",
            textAlign: "center",
          }}
        >
          <div style={{ padding: "10px", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-sm)" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-main)", display: "block" }}>
              {reportsCount}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
              Reports
            </span>
          </div>

          <div style={{ padding: "10px", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-sm)" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--found-color)", display: "block" }}>
              {foundCount}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
              Found
            </span>
          </div>

          <div style={{ padding: "10px", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-sm)" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--primary)", display: "block" }}>
              {recoveredCount}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
              Recovered
            </span>
          </div>
        </div>

        {/* Details list */}
        <div
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-light)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Mail size={14} color="var(--primary)" />
            <span>Campus Email: <strong style={{ color: "var(--text-main)" }}>{user.email}</strong></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <School size={14} color="var(--primary)" />
            <span>Academic Year: <strong style={{ color: "var(--text-main)" }}>{user.year || "3rd Year"}</strong></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={14} color="var(--primary)" />
            <span>Hostel / Room: <strong style={{ color: "var(--text-main)" }}>{user.roomNo || "Campus Hostel"}</strong></span>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
        subtitle="Update your student contact information"
      >
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Year / Semester</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="form-group">
              <label className="form-label">Roll Number</label>
              <input
                type="text"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hostel / Room No</label>
              <input
                type="text"
                value={formData.roomNo}
                onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">College Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
