import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Controlled input state
  const [email, setEmail] = useState("");
  
  // UI Interaction States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" }); // 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default browser reload behavior
    setStatusMessage({ type: "", text: "" });

    if (!email) {
      setStatusMessage({ type: "error", text: "Please enter your email address." });
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await forgotPassword({ email });

      setStatusMessage({ type: "success", text: data.message || "OTP sent successfully!" });
      
      // Delays navigation slightly so the user can actually read the success feedback message
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);

    } catch (error) {
      console.error("Forgot Password system error:", error);
      setStatusMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to send OTP. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Background Dimming Overlay */}
      <div style={styles.backgroundOverlay} />

      <div style={styles.cardContainer}>
        {/* Header Block */}
        <div style={styles.headerBlock}>
          <div style={styles.logoBadge}>🔑</div>
          <h2 style={styles.cardHeading}>Forgot Password</h2>
          <p style={styles.cardSubheading}>
            Enter your registered email below and we'll send you an OTP to reset your credentials.
          </p>
        </div>

        {/* Localized Status Notifications */}
        {statusMessage.text && (
          <div style={{
            ...styles.statusBanner,
            backgroundColor: statusMessage.type === "success" ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${statusMessage.type === "success" ? "#bbf7d0" : "#fee2e2"}`,
            color: statusMessage.type === "success" ? "#16a34a" : "#991b1b"
          }}>
            {statusMessage.type === "success" ? "✅ " : "⚠️ "} {statusMessage.text}
          </div>
        )}

        {/* Submission Form Component */}
        <form onSubmit={handleSubmit} style={styles.formElement}>
          <div style={styles.inputGroup}>
            <label style={styles.fieldLabel}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              style={styles.inputField}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              backgroundColor: isSubmitting ? "#93c5fd" : "#2563eb",
              cursor: isSubmitting ? "not-allowed" : "pointer"
            }}
          >
            {isSubmitting ? "Sending Verification..." : "Send OTP"}
          </button>
        </form>

        {/* Back navigation footer links */}
        <div style={styles.footerRow}>
          <Link to="/login" style={styles.backToLoginLink}>
            ⬅️ Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

// Architecture Styles Sheet Config Object
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // Matches the scenic highway wallpaper from image_36d4c4.jpg
    backgroundImage: "url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=1200')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "20px",
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 42, 0.45)", // Tinted dark overlay layer
    backdropFilter: "blur(3px)", // Glassmorphic blur matching your user portal theme
    zIndex: 1,
  },
  cardContainer: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255, 255, 255, 0.96)",
    padding: "40px 35px",
    borderRadius: "28px",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.25)",
    position: "relative",
    zIndex: 2,
  },
  headerBlock: {
    textAlign: "center",
    marginBottom: "25px",
  },
  logoBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    background: "#fef3c7", // Soft warm gold token background
    borderRadius: "14px",
    fontSize: "24px",
    marginBottom: "16px",
  },
  cardHeading: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 8px 0",
    letterSpacing: "-0.02em",
  },
  cardSubheading: {
    color: "#64748b",
    fontSize: "14px",
    margin: 0,
    lineHeight: "1.5",
  },
  statusBanner: {
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "20px",
    lineHeight: "1.4",
  },
  formElement: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  fieldLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    paddingLeft: "2px",
  },
  inputField: {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    fontSize: "15px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
    transition: "border-color 0.2s ease",
  },
  submitButton: {
    width: "100%",
    padding: "15px",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
    transition: "background-color 0.2s ease",
  },
  footerRow: {
    textAlign: "center",
    marginTop: "24px",
  },
  backToLoginLink: {
    color: "#475569",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
};

export default ForgotPassword;