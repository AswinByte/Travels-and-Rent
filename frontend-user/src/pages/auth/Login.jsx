import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Controlled input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI Interaction States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Password Visibility State toggle
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await loginUser({ email, password });

      login(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });

     if (data.role === "admin") {
  window.location.href = "/admin/dashboard";
} else {
  navigate("/");
}
    } catch (error) {
      console.error("Login execution error:", error);
      setErrorMessage(
        error.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Background Dimming Overlay */}
      <div style={styles.backgroundOverlay} />

      <div style={styles.loginCard}>
        {/* Header Content */}
        <div style={styles.headerBlock}>
          <div style={styles.logoBadge}>✈️</div>
          <h2 style={styles.cardHeading}>Welcome Back</h2>
          <p style={styles.cardSubheading}>Login to manage your vehicle rentals & trips</p>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div style={styles.errorBanner}>
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleLogin} style={styles.formContainer}>
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

          <div style={styles.inputGroup}>
            <label style={styles.fieldLabel}>Password</label>
            <div style={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                style={{ ...styles.inputField, paddingRight: "45px" }} // Make room for eye button
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div style={styles.forgotPasswordRow}>
            <Link to="/forgot-password" style={styles.inlineLinkText}>
              Forgot Password?
            </Link>
          </div>

          {/* Action CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              backgroundColor: isSubmitting ? "#93c5fd" : "#2563eb",
              cursor: isSubmitting ? "not-allowed" : "pointer"
            }}
          >
            {isSubmitting ? "Authenticating..." : "Login"}
          </button>
        </form>

        {/* Footer Navigation */}
        <p style={styles.footerPrompt}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.boldLinkText}>
            Register Here
          </Link>
        </p>
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
    // Stunning travel highway landscape background that mirrors image_36d4c4.jpg
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
    backgroundColor: "rgba(15, 23, 42, 0.45)", // Tinted overlay for high container contrast
    backdropFilter: "blur(3px)", // Subtle cinematic blur
    zIndex: 1,
  },
  loginCard: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255, 255, 255, 0.96)", // Crisp premium semi-translucent card surface
    padding: "40px 35px",
    borderRadius: "28px",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.25)",
    position: "relative",
    zIndex: 2, // Layer cleanly above the wallpaper
  },
  headerBlock: {
    textAlign: "center",
    marginBottom: "30px",
  },
  logoBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    background: "#eff6ff",
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
  errorBanner: {
    padding: "12px 14px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fee2e2",
    borderRadius: "12px",
    color: "#991b1b",
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "20px",
    lineHeight: "1.4",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  passwordInputContainer: {
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
  forgotPasswordRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-4px",
  },
  inlineLinkText: {
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "500",
    textDecoration: "none",
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
  footerPrompt: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    margin: "28px 0 0 0",
  },
  boldLinkText: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "2px",
  },
};

export default Login;