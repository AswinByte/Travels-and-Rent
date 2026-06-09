import { Link } from "react-router-dom";
import { useAuth }
from "../../context/useAuth";

const Navbar = () => {
  
  const {
  userInfo,
  logout,
} = useAuth();

  return (
    <nav
      style={{
        height: "80px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 50px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div>
        <h2
          style={{
            color: "#2563EB",
            fontWeight: "700",
            margin: 0,
          }}
        >
          TravelRent
        </h2>
      </div>

      {/* Menu */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        <Link
          to="/rentals"
          style={linkStyle}
        >
          Rentals
        </Link>

        <Link
          to="/packages"
          style={linkStyle}
        >
          Packages
        </Link>

        <Link
          to="/about"
          style={linkStyle}
        >
          About
        </Link>

        <Link
          to="/contact"
          style={linkStyle}
        >
          Contact
        </Link>
      </div>

      {/* User Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {userInfo ? (
          <>
            <span
              style={{
                fontWeight: "600",
                color: "#0F172A",
              }}
            >
              👤 {userInfo.name}
            </span>

            <Link
              to="/my-bookings"
              style={{
                textDecoration:
                  "none",
                color: "#2563EB",
                fontWeight: "600",
              }}
            >
              My Bookings
            </Link>

            <button
              onClick={() => {
  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "userInfo"
  );

  window.location.href =
    "/";
}}
              style={{
                padding:
                  "10px 20px",
                border: "none",
                background:
                  "#EF4444",
                color: "#fff",
                borderRadius:
                  "10px",
                cursor: "pointer",
              }}
            onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                ...loginBtn,
                textDecoration:
                  "none",
                display:
                  "inline-block",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                ...registerBtn,
                textDecoration:
                  "none",
                display:
                  "inline-block",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "#0F172A",
  fontWeight: "600",
  fontSize: "16px",
};

const loginBtn = {
  padding: "10px 20px",
  border: "1px solid #2563EB",
  background: "#fff",
  color: "#2563EB",
  borderRadius: "10px",
  cursor: "pointer",
};

const registerBtn = {
  padding: "10px 20px",
  border: "none",
  background: "#2563EB",
  color: "#fff",
  borderRadius: "10px",
  cursor: "pointer",
};

export default Navbar;