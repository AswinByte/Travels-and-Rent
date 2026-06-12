import { useEffect, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../../services/profileService";

import { Link } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({
    bookingCount: 0,
    completedTrips: 0,
    paidBookings: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
const [showCurrentPassword, setShowCurrentPassword] =
  useState(false);

const [showNewPassword, setShowNewPassword] =
  useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
  useState(false);

  const completion = [
    formData.name,
    formData.email,
    formData.phone,
    formData.address,
  ].filter(Boolean).length * 25;

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      console.log("FULL PROFILE RESPONSE", data);
      setFormData({
        name: data.user?.name || "",
        email: data.user?.email || "",
        phone: data.user?.phone || "",
        address: data.user?.address || "",
      });
      setStats({
        bookingCount: data.bookingCount || 0,
        completedTrips: data.completedTrips || 0,
        paidBookings: data.paidBookings || 0,
      });
      setRecentBookings(data.recentBookings || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      alert("Password Changed Successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("address", formData.address);

      await updateUserProfile(data);
      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle}></div>
        <p style={{ marginTop: "15px", color: "#64748b", fontWeight: "500" }}>Loading Profile...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        
        {/* Header Block with Metadata & Metrics Dashboard */}
        <div style={headerStyle}>
          <div style={{ flex: 1 }}>
            <h2 style={titleStyle}>My Profile Dashboard</h2>
            
            <div style={accountInfoBoxStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ margin: 0, fontSize: "16px", color: "#1e293b", fontWeight: "600" }}>Account Overview</h3>
                <span style={roleBadgeStyle}>User Status: Active</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", fontWeight: "500" }}>
                <span>Profile Completion</span>
                <span style={{ color: "#10b981", fontWeight: "700" }}>{completion}%</span>
              </div>
              <div style={progressBarContainerStyle}>
                <div style={{ width: `${completion}%`, height: "100%", background: "linear-gradient(90deg, #10b981, #059669)", borderRadius: "10px", transition: "width 0.4s ease" }} />
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div style={statsGridStyle}>
              <div style={statCard}>
                <h3 style={statLabelStyle}>Total Bookings</h3>
                <h1 style={statValueStyle}>{stats.bookingCount}</h1>
              </div>
              <div style={{ ...statCard, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <h3 style={{ ...statLabelStyle, color: "#166534" }}>Completed Trips</h3>
                <h1 style={{ ...statValueStyle, color: "#14532d" }}>{stats.completedTrips}</h1>
              </div>
              <div style={{ ...statCard, background: "#fefcbf", border: "1px solid #fef08a" }}>
                <h3 style={{ ...statLabelStyle, color: "#854d0e" }}>Paid Bookings</h3>
                <h1 style={{ ...statValueStyle, color: "#713f12" }}>{stats.paidBookings}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Two Column Form Sections */}
        <div style={formLayoutGrid}>
          
          {/* Mutation Input Form Area */}
          <form onSubmit={handleSubmit} style={formCardStyle}>
            <h3 style={sectionHeadingStyle}>Personal Details</h3>
            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} required />
              </div>

              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="Add phone number" />
              </div>

              <div>
                <label style={labelStyle}>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} style={inputStyle} placeholder="Add physical address" />
              </div>
            </div>

            <button type="submit" disabled={saving} style={buttonStyle}>
              {saving ? "Saving Changes..." : "Update Profile"}
            </button>
          </form>

          {/* Password Section */}
          <div style={formCardStyle}>
            <h3 style={sectionHeadingStyle}>Security & Password</h3>
            <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
  <label style={labelStyle}>
    Current Password
  </label>

  <div style={{ position: "relative" }}>
    <input
      type={
        showCurrentPassword
          ? "text"
          : "password"
      }
      placeholder="••••••••"
      value={passwordData.currentPassword}
      onChange={(e) =>
        setPasswordData({
          ...passwordData,
          currentPassword:
            e.target.value,
        })
      }
      style={inputStyle}
      required
    />

    <span
      onClick={() =>
        setShowCurrentPassword(
          !showCurrentPassword
        )
      }
      style={{
        position: "absolute",
        right: "15px",
        top: "50%",
        transform:
          "translateY(-50%)",
        cursor: "pointer",
      }}
    >
      {showCurrentPassword
        ? "🙈"
        : "👁️"}
    </span>
  </div>
</div>

             <div>
  <label style={labelStyle}>
    New Password
  </label>

  <div style={{ position: "relative" }}>
    <input
      type={
        showNewPassword
          ? "text"
          : "password"
      }
      placeholder="••••••••"
      value={passwordData.newPassword}
      onChange={(e) =>
        setPasswordData({
          ...passwordData,
          newPassword:
            e.target.value,
        })
      }
      style={inputStyle}
      required
    />

    <span
      onClick={() =>
        setShowNewPassword(
          !showNewPassword
        )
      }
      style={{
        position: "absolute",
        right: "15px",
        top: "50%",
        transform:
          "translateY(-50%)",
        cursor: "pointer",
      }}
    >
      {showNewPassword
        ? "🙈"
        : "👁️"}
    </span>
  </div>
</div>
             <div>
  <label style={labelStyle}>
    Confirm New Password
  </label>

  <div style={{ position: "relative" }}>
    <input
      type={
        showConfirmPassword
          ? "text"
          : "password"
      }
      placeholder="••••••••"
      value={passwordData.confirmPassword}
      onChange={(e) =>
        setPasswordData({
          ...passwordData,
          confirmPassword:
            e.target.value,
        })
      }
      style={inputStyle}
      required
    />

    <span
      onClick={() =>
        setShowConfirmPassword(
          !showConfirmPassword
        )
      }
      style={{
        position: "absolute",
        right: "15px",
        top: "50%",
        transform:
          "translateY(-50%)",
        cursor: "pointer",
      }}
    >
      {showConfirmPassword
        ? "🙈"
        : "👁️"}
    </span>
  </div>
</div>

              <button type="submit" style={{ ...buttonStyle, background: "#475569", marginTop: "10px" }}>
                Update Password
              </button>
            </form>
          </div>
        </div>

        {/* Lower Section Historical Logs Context */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            Recent Bookings history
          </h2>
          {recentBookings.length === 0 ? (
            <div style={emptyStateStyle}>
              No bookings found yet. Start exploring packages or vehicles!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {recentBookings.map((booking) => {
                const bookingName = booking.bookingType === "package" 
                  ? booking.package?.packageName 
                  : booking.vehicle?.vehicleName || "Premium Rental";
                const subDetail = booking.bookingType === "package"
                  ? booking.package?.destination
                  : booking.vehicle?.vehicleNumber;

                return (
                  <Link key={booking._id} to={`/my-bookings/${booking._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div 
                      style={bookingCardStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)";
                        e.currentTarget.style.borderColor = "#3b82f6";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: booking.bookingType === "package" ? "#7c3aed" : "#2563eb",
                            background: booking.bookingType === "package" ? "#f3e8ff" : "#dbeafe",
                            padding: "4px 10px",
                            borderRadius: "20px"
                          }}>
                            {booking.bookingType}
                          </span>
                          <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "monospace" }}>
                            Ref: #{booking._id?.substring(0, 8)}
                          </span>
                        </div>
                        <h4 style={{ margin: 0, fontSize: "17px", fontWeight: "700", color: "#1e293b" }}>
                          {bookingName}
                        </h4>
                        <div style={{ display: "flex", gap: "15px", color: "#64748b", fontSize: "13px", flexWrap: "wrap" }}>
                          <span>📅 {new Date(booking.pickupDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })} - {new Date(booking.returnDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                          {subDetail && <span>🚘 {subDetail}</span>}
                          <span style={{ fontWeight: "600", color: "#1e293b" }}>💰 LKR {booking.totalAmount?.toLocaleString()}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                          <span style={getStatusBadgeStyle(booking.bookingStatus)}>
                            {booking.bookingStatus}
                          </span>
                          <span style={getPaymentBadgeStyle(booking.paymentStatus)}>
                            Payment: {booking.paymentStatus}
                          </span>
                        </div>
                        <span style={{ fontSize: "20px", color: "#3b82f6", fontWeight: "bold" }}>→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Dynamic status badges ---
const getStatusBadgeStyle = (status) => {
  const norm = status?.toLowerCase() || "";
  let bg = "#f1f5f9";
  let color = "#475569";

  if (["confirmed", "verified", "completed", "paid"].includes(norm)) {
    bg = "#dcfce7";
    color = "#166534";
  } else if (["pending", "processing"].includes(norm)) {
    bg = "#fef9c3";
    color = "#854d0e";
  } else if (["rejected", "cancelled", "failed"].includes(norm)) {
    bg = "#fee2e2";
    color = "#991b1b";
  }

  return {
    backgroundColor: bg,
    color: color,
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    display: "inline-block"
  };
};

const getPaymentBadgeStyle = (status) => {
  const norm = status?.toLowerCase() || "";
  let bg = "#fee2e2";
  let color = "#991b1b";

  if (norm === "verified" || norm === "paid") {
    bg = "#dcfce7";
    color = "#166534";
  } else if (norm === "pending") {
    bg = "#fef9c3";
    color = "#854d0e";
  }

  return {
    backgroundColor: bg,
    color: color,
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    display: "inline-block"
  };
};

// --- MODERN STYLING OBJECTS ---
const containerStyle = {
  maxWidth: "1140px",
  margin: "40px auto",
  padding: "0 20px",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
};

const cardStyle = {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "24px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)",
  border: "1px solid #f1f5f9",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  marginBottom: "35px",
};

const titleStyle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "800",
  color: "#0f172a",
  letterSpacing: "-0.02em",
};

const accountInfoBoxStyle = {
  background: "#f8fafc",
  padding: "24px",
  borderRadius: "20px",
  marginTop: "20px",
  marginBottom: "25px",
  border: "1px solid #e2e8f0",
};

const roleBadgeStyle = {
  background: "#e0f2fe",
  color: "#0369a1",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
};

const progressBarContainerStyle = {
  width: "100%",
  height: "8px",
  background: "#e2e8f0",
  borderRadius: "10px",
  overflow: "hidden",
  marginTop: "10px",
};

const formLayoutGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
  gap: "30px",
  marginTop: "10px",
};

const formCardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  padding: "28px",
  borderRadius: "20px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.01)",
};

const sectionHeadingStyle = {
  margin: "0 0 20px 0",
  fontSize: "18px",
  fontWeight: "700",
  color: "#1e293b",
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const statCard = {
  background: "#eff6ff",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid #bfdbfe",
  textAlign: "center",
};

const statLabelStyle = {
  margin: 0,
  fontSize: "13px",
  color: "#1e40af",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
};

const statValueStyle = {
  margin: "10px 0 0 0",
  fontSize: "32px",
  fontWeight: "800",
  color: "#1e3a8a",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#475569",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  fontSize: "14px",
  color: "#334155",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const buttonStyle = {
  marginTop: "20px",
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "#2563eb",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const bookingCardStyle = {
  padding: "24px",
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px"
};

const emptyStateStyle = {
  padding: "40px",
  background: "#f8fafc",
  borderRadius: "20px",
  textAlign: "center",
  border: "2px dashed #cbd5e1",
  color: "#64748b",
  fontWeight: "500",
};

const loadingStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
};

const spinnerStyle = {
  width: "40px",
  height: "40px",
  border: "4px solid #e2e8f0",
  borderTop: "4px solid #2563eb",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

export default Profile;