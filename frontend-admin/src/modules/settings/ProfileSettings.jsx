import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";

const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setFormData({
          name: data?.name || "",
          email: data?.email || "",
          phone: data?.phone || "",
          address: data?.address || "",
        });
      } catch (error) {
        console.error("Error fetching profile layout data:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProfile(formData);
      alert("🎉 Administrative profile synchronized successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to propagate profile changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div style={centerStyle}>Loading verification profiles...</div>;
  }

  // Generate a clean 2-character avatar initials token
  const avatarInitials = formData.name
    ? formData.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  return (
    <div style={containerStyle}>
      {/* Decorative Upper Title Header Block */}
      <div style={headerSectionStyle}>
        <h2 style={titleStyle}>Account Settings</h2>
        <p style={subtitleStyle}>Manage your identity details, communication nodes, and core routing addresses.</p>
      </div>

      <div style={layoutGridStyle}>
        
        {/* Left Hand Card Column: Node Overview Meta Summary */}
        <div style={metaCardStyle}>
          <div style={avatarRowStyle}>
            <div style={avatarStyle}>{avatarInitials}</div>
            <div>
              <h3 style={metaNameStyle}>{formData.name || "Administrator Node"}</h3>
              <span style={roleBadgeStyle}>System Administrator</span>
            </div>
          </div>
          
          <div style={dividerStyle} />
          
          <div style={metaDataBlockStyle}>
            <span style={metaLabelStyle}>SECURITY CLEARANCE</span>
            <p style={metaValueStyle}>Level 1 Access Module</p>
          </div>
          <div style={metaDataBlockStyle}>
            <span style={metaLabelStyle}>REGISTERED CHANNELS</span>
            <p style={metaValueStyle}>{formData.email || "No link connected"}</p>
          </div>
        </div>

        {/* Right Hand Card Column: Structural Data Form */}
        <div style={formCardStyle}>
          <form onSubmit={handleSubmit}>
            <div style={formStackStyle}>
              
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Full Identity Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="e.g. Alexander Wright"
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Contact Email Destination</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="name@domain.com"
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Secure Mobile Terminal Phone Line</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Physical Postal Coordinates Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={textareaStyle}
                  placeholder="Provide complete logistical street address details..."
                />
              </div>

              {/* Action Operations Tray */}
              <div style={actionDeckStyle}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={isSubmitting ? disabledButtonStyle : activeButtonStyle}
                >
                  {isSubmitting ? "Updating System..." : "Save Configuration Changes"}
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

// --- STYLING CONSTANTS (PREMIUM DESIGN SYSTEM) ---
const containerStyle = {
  maxWidth: "1150px",
  margin: "20px auto",
  padding: "0 20px",
  fontFamily: "system-ui, -apple-system, sans-serif",
  boxSizing: "border-box"
};

const headerSectionStyle = {
  marginBottom: "32px"
};

const titleStyle = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 6px 0"
};

const subtitleStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#64748b",
  lineHeight: "1.5"
};

const layoutGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: "32px",
  alignItems: "start"
};

// Response breakpoint fallback styled as grid template for safety across smaller windows
if (typeof window !== "undefined" && window.innerWidth < 850) {
  layoutGridStyle.gridTemplateColumns = "1fr";
}

const metaCardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.03)"
};

const formCardStyle = {
  ...metaCardStyle,
  padding: "40px"
};

const avatarRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  marginBottom: "4px"
};

const avatarStyle = {
  width: "60px",
  height: "60px",
  background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  color: "#ffffff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: "0.03em",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
};

const metaNameStyle = {
  margin: "0 0 4px 0",
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a"
};

const roleBadgeStyle = {
  fontSize: "12px",
  fontWeight: "600",
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "4px 10px",
  borderRadius: "30px"
};

const dividerStyle = {
  height: "1px",
  background: "#f1f5f9",
  margin: "24px 0"
};

const metaDataBlockStyle = {
  marginBottom: "18px"
};

const metaLabelStyle = {
  display: "block",
  fontSize: "10px",
  fontWeight: "700",
  color: "#94a3b8",
  letterSpacing: "0.05em",
  marginBottom: "4px"
};

const metaValueStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#334155",
  fontWeight: "500"
};

const formStackStyle = {
  display: "grid",
  gap: "24px"
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#475569"
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 16px",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  fontSize: "14px",
  color: "#1e293b",
  outline: "none",
  background: "#f8fafc",
  transition: "all 0.15s ease"
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "120px",
  resize: "vertical",
  lineHeight: "1.6"
};

const actionDeckStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "8px"
};

const activeButtonStyle = {
  padding: "14px 28px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
  transition: "background 0.15s ease"
};

const disabledButtonStyle = {
  ...activeButtonStyle,
  background: "#94a3b8",
  cursor: "not-allowed",
  boxShadow: "none"
};

const centerStyle = {
  textAlign: "center",
  padding: "100px 20px",
  fontSize: "15px",
  color: "#64748b",
  fontWeight: "500"
};

export default ProfileSettings;