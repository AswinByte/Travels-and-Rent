import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyBookings } from "../../services/bookingService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div style={centerStyle}>Loading your itineraries...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      {/* Premium Welcome Header Section */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Your Journeys</h1>
          <p style={subtitleStyle}>Track, modify, and review your travel reservations</p>
        </div>
        <div style={counterBadgeStyle}>
          <strong>{bookings.length}</strong> {bookings.length === 1 ? "Active Booking" : "Total Bookings"}
        </div>
      </div>

      {bookings.length === 0 ? (
        <div style={emptyStateStyle}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🗺️</div>
          <h3 style={{ margin: "0 0 6px 0", color: "#1e293b" }}>No bookings found</h3>
          <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>Ready to hit the road? Your upcoming trips will show up right here.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {bookings.map((booking) => (
            <div key={booking._id} style={cardStyle}>
              
              {/* Card Header Layer */}
              <div style={cardHeaderStyle}>
                <div>
                  <span style={typeTagStyle}>{booking.bookingType}</span>
                  <h3 style={vehicleNameStyle}>{booking.vehicle?.vehicleName || "Premium Fleet Vehicle"}</h3>
                </div>
                <div style={statusColumnStyle}>
                  <span style={badgeStyle(booking.bookingStatus)}>{booking.bookingStatus}</span>
                </div>
              </div>

              {/* Visual Trip Timeline Section */}
              <div style={timelineContainerStyle}>
                <div style={timelineTrackStyle}>
                  <div style={dotStartStyle} />
                  <div style={lineStyle} />
                  <div style={dotEndStyle} />
                </div>
                
                <div style={timelineDetailsStyle}>
                  <div style={timeBlockStyle}>
                    <span style={timelineLabelStyle}>PICKUP</span>
                    <span style={timelineValueStyle}>
                      {new Date(booking.pickupDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div style={{ ...timeBlockStyle, textAlign: "right" }}>
                    <span style={timelineLabelStyle}>RETURN</span>
                    <span style={timelineValueStyle}>
                      {new Date(booking.returnDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transaction Footer Info Row */}
              <div style={cardFooterStyle}>
                <div style={paymentContainerStyle}>
                  <span style={paymentLabelStyle}>Payment Status</span>
                  <span style={paymentValueStyle(booking.paymentStatus)}>
                    ● {booking.paymentStatus || "Pending"}
                  </span>
                </div>
                <Link to={`/my-bookings/${booking._id}`} style={actionButtonStyle}>
                  Manage Trip →
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- PREMIUM STATUS BADGE DYNAMICS ---
const badgeStyle = (status) => {
  const norm = status?.toLowerCase() || "";
  let bg = "rgba(100, 116, 139, 0.1)";
  let color = "#475569";

  if (["confirmed", "verified", "completed", "paid"].includes(norm)) {
    bg = "#dcfce7";
    color = "#15803d";
  } else if (["pending", "processing"].includes(norm)) {
    bg = "#fef9c3";
    color = "#a16207";
  } else if (["rejected", "cancelled", "failed"].includes(norm)) {
    bg = "#fee2e2";
    color = "#b91c1c";
  }

  return {
    backgroundColor: bg,
    color: color,
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    display: "inline-block"
  };
};

const paymentValueStyle = (status) => {
  const norm = status?.toLowerCase() || "";
  const isPaid = ["paid", "confirmed", "completed"].includes(norm);
  return {
    fontSize: "13px",
    fontWeight: "600",
    color: isPaid ? "#16a34a" : "#dc2626",
    textTransform: "capitalize"
  };
};

// --- ADVANCED DESIGN SYSTEM CSS-IN-JS ---
const containerStyle = {
  maxWidth: "1200px",
  margin: "60px auto",
  padding: "0 32px",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  color: "#1e293b"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "40px",
  gap: "20px",
  flexWrap: "wrap"
};

const titleStyle = {
  fontSize: "36px",
  fontWeight: "800",
  margin: "0 0 8px 0",
  letterSpacing: "-0.03em",
  color: "#0f172a"
};

const subtitleStyle = {
  margin: 0,
  color: "#64748b",
  fontSize: "16px",
  fontWeight: "400"
};

const counterBadgeStyle = {
  background: "#0f172a",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "30px",
  fontSize: "14px",
  fontWeight: "500",
  boxShadow: "0 10px 15px -3px rgba(15, 23, 42, 0.15)"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
  gap: "32px"
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "24px",
  padding: "28px",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 20px 25px -5px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  overflow: "hidden"
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px"
};

const typeTagStyle = {
  fontSize: "11px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#3b82f6",
  display: "block",
  marginBottom: "6px"
};

const vehicleNameStyle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: "700",
  color: "#0f172a",
  letterSpacing: "-0.01em"
};

const statusColumnStyle = {
  textAlign: "right"
};

/* Visual Timeline Components */
const timelineContainerStyle = {
  margin: "28px 0",
  background: "#f8fafc",
  padding: "16px 20px",
  borderRadius: "16px",
  border: "1px solid #f1f5f9"
};

const timelineTrackStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  position: "relative",
  marginBottom: "10px"
};

const dotStartStyle = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "#3b82f6",
  zIndex: 2
};

const dotEndStyle = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "#10b981",
  zIndex: 2
};

const lineStyle = {
  flexGrow: 1,
  height: "2px",
  backgroundColor: "#cbd5e1",
  margin: "0 -2px",
  borderStyle: "dashed"
};

const timelineDetailsStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
};

const timeBlockStyle = {
  display: "flex",
  flexDirection: "column"
};

const timelineLabelStyle = {
  fontSize: "10px",
  fontWeight: "700",
  color: "#94a3b8",
  letterSpacing: "0.05em",
  marginBottom: "2px"
};

const timelineValueStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#334155"
};

/* Footer Layout Structure */
const cardFooterStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "12px",
  paddingTop: "20px",
  borderTop: "1px solid #f1f5f9"
};

const paymentContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "2px"
};

const paymentLabelStyle = {
  fontSize: "11px",
  color: "#94a3b8",
  fontWeight: "500"
};

const actionButtonStyle = {
  padding: "10px 20px",
  background: "#0f172a",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
  transition: "all 0.2s ease"
};

const centerStyle = {
  textAlign: "center",
  padding: "120px 24px",
  fontSize: "16px",
  color: "#64748b",
  fontWeight: "500"
};

const errorStyle = {
  ...centerStyle,
  color: "#ef4444"
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "80px 32px",
  background: "#f8fafc",
  borderRadius: "24px",
  border: "2px dashed #cbd5e1"
};

export default MyBookings;