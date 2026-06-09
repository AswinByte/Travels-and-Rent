const Contact = () => {
  return (
    <div
      style={{
        padding: "80px 8%",
        background: "#F8FAFC",
        minHeight: "80vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "15px",
          color: "#0F172A",
          fontSize: "48px",
        }}
      >
        Contact Us
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#64748B",
          marginBottom: "50px",
        }}
      >
        We'd love to hear from you.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "40px",
        }}
      >
        {/* Contact Info */}
        <div
          style={{
            background: "#fff",
            padding: "35px",
            borderRadius: "20px",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              color: "#0F172A",
            }}
          >
            Contact Information
          </h2>

          <p style={{ marginBottom: "15px",color: "#0F172A", }}>
            📍 Trichy, Tamil Nadu
          </p>

          <p style={{ marginBottom: "15px",color: "#0F172A", }}>
            📞 +91 9876543210
          </p>

          <p style={{ marginBottom: "15px",color: "#0F172A", }}>
            ✉️ info@travelrent.com
          </p>

          <p style={{ marginBottom: "15px",color: "#0F172A", }}>
            🕒 Mon - Sun : 24 Hours
          </p>
        </div>

        {/* Contact Form */}
        <div
          style={{
            background: "#fff",
            padding: "35px",
            borderRadius: "20px",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              color: "#0F172A",
            }}
          >
            Send Message
          </h2>

          <form>
            <input
              type="text"
              placeholder="Your Name"
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Your Email"
              style={inputStyle}
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  border: "1px solid #CBD5E1",
  borderRadius: "10px",
  outline: "none",
};

export default Contact;