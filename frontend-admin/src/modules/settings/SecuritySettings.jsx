import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { changePassword } from "../../services/profileService";

const SecuritySettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return alert("❌ Validation error: Passwords do not match.");
    }

    setIsSubmitting(true);

    try {
      const data = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      alert(data?.message || "🔒 Access credentials modified successfully!");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Password update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Upper Layout Header */}
      <div style={headerSectionStyle}>
        <h2 style={titleStyle}>Security Settings</h2>
        <p style={subtitleStyle}>Manage authentication details, track profile updates, and modify key passkeys.</p>
      </div>

      <div style={layoutGridStyle}>
        
        {/* Left Card: Structural Policy Hardening Guidelines */}
        <div style={policyCardStyle}>
          <h3 style={policyTitleStyle}>🔐 Passkey Standards</h3>
          <p style={policyParagraphStyle}>To safeguard your administrative profile metrics, verify your changes conform to the following criteria:</p>
          
          <ul style={listStyle}>
            <li style={listItemStyle}>Minimum composition length of 8 structural alpha units</li>
            <li style={listItemStyle}>At least one modified uppercase character token</li>
            <li style={listItemStyle}>Integration of a localized metric base integer (0-9)</li>
            <li style={listItemStyle}>Avoid repeating past credential variations</li>
          </ul>
        </div>

        {/* Right Card: Input Fields Block */}
        <div style={formCardStyle}>
          <form onSubmit={handleSubmit}>
            <div style={formStackStyle}>
              
              {/* Field 1: Current Password */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Verify Existing Password</label>
                <div style={fieldContainerStyle}>
                  <input
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="••••••••••••"
                    required
                  />
                  <span onClick={() => setShowCurrent(!showCurrent)} style={eyeIconStyle}>
                    {showCurrent ? <EyeOff size={18} style={{ color: "#2563eb" }} /> : <Eye size={18} />}
                  </span>
                </div>
              </div>

              {/* Field 2: New Password */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}>New Password Assignment</label>
                <div style={fieldContainerStyle}>
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="••••••••••••"
                    required
                  />
                  <span onClick={() => setShowNew(!showNew)} style={eyeIconStyle}>
                    {showNew ? <EyeOff size={18} style={{ color: "#2563eb" }} /> : <Eye size={18} />}
                  </span>
                </div>
              </div>

              {/* Field 3: Confirm Password */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Confirm New Password Identity</label>
                <div style={fieldContainerStyle}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="••••••••••••"
                    required
                  />
                  <span onClick={() => setShowConfirm(!showConfirm)} style={eyeIconStyle}>
                    {showConfirm ? <EyeOff size={18} style={{ color: "#2563eb" }} /> : <Eye size={18} />}
                  </span>
                </div>
              </div>

              {/* Operations Footer Deck */}
              <div style={actionDeckStyle}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={isSubmitting ? disabledButtonStyle : activeButtonStyle}
                >
                  {isSubmitting ? "Modifying Credentials..." : "Commit Change"}
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

// --- STYLING CONSTANTS (PREMIUM DESIGN PROFILE REFACTOR) ---
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
  gridTemplateColumns: "1fr 1.3fr",
  gap: "32px",
  alignItems: "start"
};

// Layout fallback response for compact configurations
if (typeof window !== "undefined" && window.innerWidth < 850) {
  layoutGridStyle.gridTemplateColumns = "1fr";
}

const policyCardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.03)"
};

const formCardStyle = {
  ...policyCardStyle,
  padding: "40px"
};

const policyTitleStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 12px 0"
};

const policyParagraphStyle = {
  fontSize: "13px",
  color: "#64748b",
  lineHeight: "1.6",
  margin: "0 0 16px 0"
};

const listStyle = {
  margin: "0",
  paddingLeft: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const listItemStyle = {
  fontSize: "13px",
  color: "#475569",
  lineHeight: "1.4"
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

const fieldContainerStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%"
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 46px 12px 16px", // Extended right padding protects layout clipping behind the icon 
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  fontSize: "14px",
  color: "#1e293b",
  outline: "none",
  background: "#f8fafc",
  letterSpacing: "0.02em",
  transition: "all 0.15s ease"
};

const eyeIconStyle = {
  position: "absolute",
  right: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#94a3b8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  transition: "color 0.2s ease"
};

const actionDeckStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "8px"
};

const activeButtonStyle = {
  padding: "14px 28px",
  background: "#ea580c", // Premium system orange accent
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(234, 88, 12, 0.15)",
  transition: "background 0.15s ease"
};

const disabledButtonStyle = {
  ...activeButtonStyle,
  background: "#94a3b8",
  cursor: "not-allowed",
  boxShadow: "none"
};

export default SecuritySettings;