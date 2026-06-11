import { useState } from "react";

const Contact = () => {
  // Form handling states
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ type: "", msg: "" }); // 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: "error", msg: "Please fill in all fields before sending." });
      return;
    }
    
    // Simulate API request hit
    setFormStatus({ type: "success", msg: "Thank you! Your travel inquiry has been sent successfully." });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerSection}>
        <span style={styles.topBadge}>Get In Touch</span>
        <h1 style={styles.heading}>Contact Our Travel Experts</h1>
        <p style={styles.subheading}>
          Have questions about rentals or tour packages? Reach out, we are available 24/7.
        </p>
      </div>

      <div style={styles.layoutGrid}>
        {/* Left Column: Premium Contact Cards */}
        <div style={styles.infoColumn}>
          <div style={styles.infoCard}>
            <h2 style={styles.cardTitle}>Contact Information</h2>
            
            <div style={styles.contactList}>
              <div style={styles.contactItem}>
                <span style={styles.iconBox}>📍</span>
                <div>
                  <p style={styles.itemLabel}>Main Office Headquarters</p>
                  <p style={styles.itemValue}>Trichy, Tamil Nadu, India</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <span style={styles.iconBox}>📞</span>
                <div>
                  <p style={styles.itemLabel}>24/7 Customer Support Hotline</p>
                  <p style={styles.itemValue}>+91 9876543210</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <span style={styles.iconBox}>✉️</span>
                <div>
                  <p style={styles.itemLabel}>General & Corporate Email</p>
                  <p style={styles.itemValue}>info@travelrent.com</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <span style={styles.iconBox}>🕒</span>
                <div>
                  <p style={styles.itemLabel}>Working Operations Hours</p>
                  <p style={styles.itemValue}>Mon - Sun : 24 Hours Open</p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Map Preview Area */}
          <div style={styles.mapCard}>
            <div style={styles.mapOverlay}>
              <span style={styles.mapIcon}>🗺️</span>
              <p style={styles.mapText}>Explore Our Fleet Location Hub in Trichy</p>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Contact Form */}
        <div style={styles.formCard}>
          <h2 style={styles.cardTitle}>Send Message</h2>
          <p style={styles.formInstructions}>Drop your details below and a destination agent will call you shortly.</p>
          
          {formStatus.msg && (
            <div style={{
              ...styles.statusBanner,
              backgroundColor: formStatus.type === "success" ? "#f0fdf4" : "#fef2f2",
              border: `1px solid ${formStatus.type === "success" ? "#bbf7d0" : "#fee2e2"}`,
              color: formStatus.type === "success" ? "#16a34a" : "#991b1b"
            }}>
              {formStatus.type === "success" ? "✅ " : "⚠️ "} {formStatus.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.formElement}>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                style={styles.inputField}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                style={styles.inputField}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Message Inquiry</label>
              <textarea
                name="message"
                placeholder="Tell us about your trip plans, vehicle choices or required package accommodations..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                style={{ ...styles.inputField, ...styles.textAreaField }}
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Send Message Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Architecture Styles Sheet
const styles = {
  pageContainer: {
    padding: "80px 8%",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  headerSection: {
    textAlign: "center",
    marginBottom: "60px",
  },
  topBadge: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "6px 16px",
    borderRadius: "99px",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#0f172a",
    marginTop: "16px",
    marginBottom: "12px",
    letterSpacing: "-0.02em",
  },
  subheading: {
    color: "#64748b",
    fontSize: "18px",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  layoutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  infoCard: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "8px",
  },
  formInstructions: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "24px",
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    marginTop: "30px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  iconBox: {
    fontSize: "20px",
    background: "#f1f5f9",
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemLabel: {
    fontSize: "12px",
    color: "#64748b",
    margin: 0,
    fontWeight: "500",
  },
  itemValue: {
    fontSize: "16px",
    color: "#1e293b",
    margin: "2px 0 0 0",
    fontWeight: "600",
  },
  mapCard: {
    background: "linear-gradient(rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.4)), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "24px",
    height: "220px",
    display: "flex",
    alignItems: "flex-end",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
  },
  mapOverlay: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(4px)",
    padding: "12px 20px",
    borderRadius: "14px",
    width: "100%",
  },
  mapIcon: {
    fontSize: "20px",
  },
  mapText: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f172a",
  },
  formCard: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
    display: "flex",
    flexDirection: "column",
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
    paddingLeft: "4px",
  },
  inputField: {
    width: "100%",
    padding: "14px 18px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    fontSize: "15px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
  },
  textAreaField: {
    resize: "none",
    lineHeight: "1.5",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
    marginTop: "10px",
    transition: "background-color 0.2s ease",
  },
  statusBanner: {
    padding: "14px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "20px",
  },
};

export default Contact;