import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  // Controlled input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI Interaction States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" }); // 'success' | 'error'

  // Separate password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents page reload
    setStatusMessage({ type: "", text: "" });

    if (!name || !email || !password || !confirmPassword) {
      setStatusMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    if (password !== confirmPassword) {
      setStatusMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await registerUser({ name, email, password });

      // Save token to localStorage safely
      localStorage.setItem("token", data.token);

      setStatusMessage({ type: "success", text: "Registration successful! Redirecting..." });

      // Small delay so they can enjoy seeing the success banner
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Registration submission error:", error);
      setStatusMessage({
        type: "error",
        text: error.response?.data?.message || "Registration failed. Please try again."
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
          <div style={styles.logoBadge}>🗺️</div>
          <h2 style={styles.cardHeading}>Create Account</h2>
          <p style={styles.cardSubheading}>Join us to start booking your perfect journey</p>
        </div>

        {/* Localized Status Banner Alerts */}
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
        <form onSubmit={handleRegister} style={styles.formElement}>
          
          {/* 1. NAME FIELD */}
          <div style={styles.inputGroup}>
            <label style={styles.fieldLabel}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              style={styles.inputField}
            />
          </div>

          {/* 2. EMAIL FIELD */}
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

          {/* 3. PASSWORD FIELD WITH EYE TOGGLE */}
          <div style={styles.inputGroup}>
            <label style={styles.fieldLabel}>Password</label>
            <div style={styles.passwordInputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                style={{ ...styles.inputField, paddingRight: "45px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* 4. CONFIRM PASSWORD FIELD WITH EYE TOGGLE */}
          <div style={styles.inputGroup}>
            <label style={styles.fieldLabel}>Confirm Password</label>
            <div style={styles.passwordInputWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
                style={{ ...styles.inputField, paddingRight: "45px" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                {showConfirmPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Submission CTA Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              backgroundColor: isSubmitting ? "#93c5fd" : "#2563eb",
              cursor: isSubmitting ? "not-allowed" : "pointer"
            }}
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Footer Navigation Redirection Link */}
        <p style={styles.footerPrompt}>
          Already have an account?{" "}
          <Link to="/login" style={styles.boldLinkText}>
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

// Architecture Unified CSS-in-JS Style Config Object
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // Matches the beautiful highway road wallpaper from your home banner layout
    backgroundImage: "url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=1200')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "40px 20px", // Comfortable mobile spacing
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 42, 0.45)", // Smooth dark masking layer
    backdropFilter: "blur(3px)", // Cinematic premium blur texture 
    zIndex: 1,
  },
  cardContainer: {
    width: "100%",
    maxWidth: "440px",
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
    background: "#f0fdf4", // Fresh environment mint token background
    borderRadius: "14px",
    fontSize: "24px",
    marginBottom: "16px",
  },
  cardHeading: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 6px 0",
    letterSpacing: "-0.02em",
  },
  cardSubheading: {
    color: "#64748b",
    fontSize: "14px",
    margin: 0,
    lineHeight: "1.4",
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
    gap: "18px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  passwordInputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  fieldLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    paddingLeft: "2px",
  },
  inputField: {
    width: "100%",
    padding: "13px 16px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    fontSize: "15px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
    transition: "border-color 0.2s ease",
  },
  eyeButton: {
    position: "absolute",
    right: "14px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
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
    marginTop: "10px",
    transition: "background-color 0.2s ease",
  },
  footerPrompt: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    margin: "24px 0 0 0",
  },
  boldLinkText: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "2px",
  },
};

export default Register;