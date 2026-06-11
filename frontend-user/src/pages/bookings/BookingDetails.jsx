import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookingById } from "../../services/bookingService";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(id);
        setBooking(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) return <div style={centerStyle}>Assembling your itinerary details...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;
  if (!booking) return <div style={centerStyle}>We couldn't locate this trip reservation.</div>;

  return (
    <div style={containerStyle}>
      {/* Action Header Nav */}
      <div style={headerStyle}>
        <Link to="/my-bookings" style={backLinkStyle}>
          ‹ Back to My Bookings
        </Link>
        <div style={invoiceIdStyle}>Invoice ID: #{id?.slice(-6).toUpperCase()}</div>
      </div>

      {/* Primary Layout Card */}
      <div style={cardStyle}>
        
        {/* Top Status & Core Type Bar */}
        <div style={statusBannerStyle}>
          <div>
            <span style={miniLabelStyle}>BOOKING TYPE</span>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginTop: "2px" }}>
              {booking.bookingType}
            </div>
          </div>
          <div style={badgeRowStyle}>
            <div style={statusNodeStyle}>
              <span style={miniLabelRightStyle}>TRIP STATUS</span>
              <span style={badgeStyle(booking.bookingStatus)}>{booking.bookingStatus}</span>
            </div>
            <div style={statusNodeStyle}>
              <span style={miniLabelRightStyle}>PAYMENT</span>
              <span style={badgeStyle(booking.paymentStatus)}>{booking.paymentStatus}</span>
            </div>
          </div>
        </div>

        {/* Info Grid Split: Vehicle & Driver Details */}
        <div style={splitGridStyle}>
          
          {/* Vehicle Info Container */}
          <div style={infoBlockStyle}>
            <h2 style={sectionTitleStyle}>
              <span style={{ marginRight: "8px" }}>🚗</span> Vehicle Assignment
            </h2>
            {booking.vehicle ? (
              <div style={detailsBoxStyle}>
                <div style={dataRowStyle}>
                  <span style={labelStyle}>Model Name</span>
                  <span style={valueStyle}>{booking.vehicle.vehicleName}</span>
                </div>
                <div style={dataRowStyle}>
                  <span style={labelStyle}>Car Number</span>
                  <span style={plateStyle}>{booking.vehicle.vehicleNumber}</span>
                </div>
              </div>
            ) : (
              <div style={emptyBoxStyle}>No specific vehicle assigned to this trip route yet.</div>
            )}
          </div>

          {/* Driver Info Container */}
          <div style={infoBlockStyle}>
            <h2 style={sectionTitleStyle}>
              <span style={{ marginRight: "8px" }}>🧑‍✈️</span> Chauffeur Details
            </h2>
            {booking.driver ? (
              <div style={detailsBoxStyle}>
                <div style={dataRowStyle}>
                  <span style={labelStyle}>Driver Name</span>
                  <span style={valueStyle}>{booking.driver.name}</span>
                </div>
                <div style={dataRowStyle}>
                  <span style={labelStyle}>Contact Line</span>
                  <span style={valueStyle}>{booking.driver.phone}</span>
                </div>
              </div>
            ) : (
              <div style={emptyBoxStyle}>Self-drive structure or helper operator assignment pending.</div>
            )}
          </div>

        </div>

        {/* Route Details Timeline Panel */}
        <div style={timelinePanelStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={{ marginRight: "8px" }}>📍</span> Route & Schedule
          </h2>
          
          <div style={routeTrackStyle}>
            <div style={routePointStyle}>
              <div style={pointIconStyle("#3b82f6")} />
              <div>
                <span style={timelineLabelStyle}>DEPARTURE POINT</span>
                <p style={timelineTextStyle}>{booking.pickupLocation}</p>
                <span style={timelineDateStyle}>
                  {new Date(booking.pickupDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </span>
              </div>
            </div>

            <div style={routePointStyle}>
              <div style={pointIconStyle("#10b981")} />
              <div>
                <span style={timelineLabelStyle}>DESTINATION RETURN POINT</span>
                <p style={timelineTextStyle}>{booking.dropLocation}</p>
                <span style={timelineDateStyle}>
                  {new Date(booking.returnDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary & Breakdown Panel */}
        <div style={pricingSummaryStyle}>
          <div style={pricingHeaderStyle}>
            <h2 style={{ ...sectionTitleStyle, margin: 0, color: "#0f172a" }}>Fare Distribution</h2>
            <span style={durationTagStyle}>{booking.totalDays} Total Days</span>
          </div>
          
          <div style={priceRowStyle}>
            <span style={priceLabelStyle}>Base Ride & Reservation Fee</span>
            <span style={priceValueStyle}>₹{(booking.totalAmount * 0.85).toFixed(0)}</span>
          </div>
          <div style={priceRowStyle}>
            <span style={priceLabelStyle}>Integrated Local State Taxes (GST)</span>
            <span style={priceValueStyle}>₹{(booking.totalAmount * 0.15).toFixed(0)}</span>
          </div>
          
          <hr style={{ border: 0, borderTop: "1px solid #e2e8f0", margin: "16px 0" }} />
          
          <div style={totalRowStyle}>
            <span>Gross Amount Paid</span>
            <span style={{ fontSize: "24px", fontWeight: "800", color: "#2563eb" }}>
              ₹{booking.totalAmount}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- DYNAMIC UTILITY STYLES ---
const badgeStyle = (status) => {
  const norm = status?.toLowerCase() || "";
  let bg = "rgba(100, 116, 139, 0.08)";
  let color = "#475569";

  if (["confirmed", "verified", "completed", "paid"].includes(norm)) {
    bg = "#e6f4ea";
    color = "#137333";
  } else if (["pending", "processing"].includes(norm)) {
    bg = "#fef7e0";
    color = "#b06000";
  } else if (["rejected", "cancelled", "failed"].includes(norm)) {
    bg = "#fce8e6";
    color = "#c5221f";
  }

  return {
    backgroundColor: bg,
    color: color,
    padding: "6px 14px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.02em"
  };
};

// --- MODERN PREMIUM UI DESIGN SYSTEM ---
const containerStyle = {
  maxWidth: "850px",
  margin: "50px auto",
  padding: "0 24px",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  color: "#334155"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px"
};

const backLinkStyle = {
  color: "#64748b",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "15px",
  transition: "color 0.15s ease"
};

const invoiceIdStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#94a3b8",
  letterSpacing: "0.03em"
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "24px",
  boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(0,0,0,0.01)",
  overflow: "hidden"
};

const statusBannerStyle = {
  background: "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
  padding: "24px 32px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px"
};

const badgeRowStyle = {
  display: "flex",
  gap: "20px"
};

const statusNodeStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};

const splitGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  gap: "28px",
  padding: "32px"
};

const infoBlockStyle = {
  display: "flex",
  flexDirection: "column"
};

const sectionTitleStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 16px 0",
  display: "flex",
  alignItems: "center"
};

const detailsBoxStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "16px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
};

const dataRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px"
};

const labelStyle = {
  color: "#64748b",
  fontWeight: "400"
};

const valueStyle = {
  color: "#1e293b",
  fontWeight: "600"
};

const plateStyle = {
  background: "#f1f5f9",
  color: "#0f172a",
  padding: "4px 10px",
  borderRadius: "6px",
  fontFamily: "monospace",
  fontWeight: "700",
  fontSize: "13px",
  border: "1px solid #cbd5e1"
};

const emptyBoxStyle = {
  background: "#f8fafc",
  border: "1px dashed #cbd5e1",
  borderRadius: "16px",
  padding: "24px",
  textAlign: "center",
  fontSize: "14px",
  color: "#94a3b8"
};

/* Route Schedule Timeline View elements */
const timelinePanelStyle = {
  padding: "0 32px 32px 32px"
};

const routeTrackStyle = {
  borderLeft: "2px dashed #cbd5e1",
  marginLeft: "8px",
  paddingLeft: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  position: "relative"
};

const routePointStyle = {
  position: "relative"
};

const pointIconStyle = (color) => ({
  position: "absolute",
  left: "-31px",
  top: "4px",
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: color,
  border: "4px solid #fff",
  boxShadow: "0 0 0 2px " + color
});

const timelineLabelStyle = {
  fontSize: "10px",
  fontWeight: "700",
  color: "#94a3b8",
  letterSpacing: "0.05em",
  display: "block",
  marginBottom: "4px"
};

const timelineTextStyle = {
  margin: "0 0 4px 0",
  fontSize: "16px",
  fontWeight: "600",
  color: "#1e293b"
};

const timelineDateStyle = {
  fontSize: "13px",
  color: "#64748b"
};

/* Bill Panel Matrix styling variables */
const pricingSummaryStyle = {
  margin: "0 32px 32px 32px",
  background: "#f8fafc",
  borderRadius: "20px",
  padding: "24px 28px",
  border: "1px solid #e2e8f0"
};

const pricingHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const durationTagStyle = {
  fontSize: "13px",
  fontWeight: "600",
  background: "#e0f2fe",
  color: "#0369a1",
  padding: "6px 12px",
  borderRadius: "8px"
};

const priceRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "12px"
};

const priceLabelStyle = {
  fontWeight: "400"
};

const priceValueStyle = {
  fontWeight: "500",
  color: "#334155"
};

const totalRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "700",
  color: "#0f172a"
};

const miniLabelStyle = {
  fontSize: "11px",
  color: "#94a3b8",
  fontWeight: "600",
  letterSpacing: "0.05em"
};

const miniLabelRightStyle = {
  ...miniLabelStyle,
  textAlign: "right"
};

const centerStyle = {
  textAlign: "center",
  padding: "100px 24px",
  fontSize: "16px",
  color: "#64748b",
  fontWeight: "500"
};

const errorStyle = {
  ...centerStyle,
  color: "#ef4444"
};

export default BookingDetails;