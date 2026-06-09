import { Link } from "react-router-dom";

const Footer = () => {
  const linkStyle = {
    color: "#CBD5E1",
    textDecoration: "none",
    display: "block",
    marginBottom: "12px",
    transition: "0.3s",
  };

  return (
    <footer
      style={{
        background: "#0F172A",
        color: "#fff",
        padding: "70px 8% 30px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "50px",
        }}
      >
        {/* Company */}
        <div>
          <h2
            style={{
              color: "#2563EB",
              marginBottom: "15px",
            }}
          >
            TravelRent
          </h2>

          <p
            style={{
              color: "#CBD5E1",
              lineHeight: "1.8",
            }}
          >
            Complete Travels, Rental Vehicles and Tour
            Package Booking Platform. Book vehicles,
            explore packages and travel comfortably.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            Quick Links
          </h3>

          <Link to="/" style={linkStyle}>
            Home
          </Link>

          <Link to="/rentals" style={linkStyle}>
            Rentals
          </Link>

          <Link to="/packages" style={linkStyle}>
            Packages
          </Link>

          <Link to="/about" style={linkStyle}>
            About
          </Link>

          <Link to="/contact" style={linkStyle}>
            Contact
          </Link>
        </div>

        {/* Contact */}
        <div>
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            Contact
          </h3>

          <p
            style={{
              color: "#CBD5E1",
              marginBottom: "10px",
            }}
          >
            📍 Trichy, Tamil Nadu
          </p>

          <p
            style={{
              color: "#CBD5E1",
              marginBottom: "10px",
            }}
          >
            📞 +91 9876543210
          </p>

          <p
            style={{
              color: "#CBD5E1",
            }}
          >
            ✉️ info@travelrent.com
          </p>
        </div>
      </div>

      <hr
        style={{
          margin: "40px 0 25px",
          border: "none",
          height: "1px",
          background: "#334155",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#94A3B8",
          fontSize: "14px",
        }}
      >
        © 2026 TravelRent. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;