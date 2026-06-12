import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  // Defensive fallbacks to handle varied backend naming schemas
  const displayName = vehicle.vehicleName || vehicle.name || "Unnamed Vehicle";
  const displayPrice = vehicle.pricePerDay || vehicle.price || vehicle.rentPrice || "0";
  const displayType = vehicle.type || "Standard";
  const displaySeats = vehicle.seats || "4";
  const displayImage = vehicle.image || "";

  return (
    <div style={styles.cardContainer}>
      {/* Vehicle Image */}
      <div style={styles.imageWrapper}>
        {displayImage ? (
          <img
            src={displayImage}
            alt={displayName}
            style={styles.image}
          />
        ) : (
          <div style={styles.imagePlaceholder}>No Image Available</div>
        )}
      </div>

      {/* Details Section */}
      <div style={styles.detailsContainer}>
        {/* Dynamic Title */}
        <h2 style={styles.title}>{displayName}</h2>
        
        {/* Dynamic Type */}
        <p style={styles.subtitle}>
          🚗 <span style={styles.textCapitalize}>{displayType}</span>
        </p>
        
        <div style={styles.metaRow}>
          {/* Dynamic Seats */}
          <span style={styles.badge}>
            👥 {displaySeats} Seats
          </span>

          {/* Dynamic Price */}
          <div style={styles.priceContainer}>
            <span style={styles.price}>₹{displayPrice}</span>
            <span style={styles.priceUnit}>/day</span>
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/vehicle/${vehicle._id}`} style={styles.bookButton}>
          Book Now
        </Link>
      </div>
    </div>
  );
};

// Centralized Styles Architecture
const styles = {
  cardContainer: {
    background: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(15, 23, 42, 0.02)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: "100%",
    height: "220px",
    overflow: "hidden",
    background: "#f1f5f9",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: "500",
  },
  detailsContainer: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "6px",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#64748b",
    marginBottom: "16px",
  },
  textCapitalize: {
    textTransform: "capitalize",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  badge: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "6px 14px",
    borderRadius: "9999px",
    fontWeight: "600",
    fontSize: "14px",
  },
  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: "2px",
  },
  price: {
    color: "#16a34a",
    fontSize: "24px",
    fontWeight: "700",
  },
  priceUnit: {
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500",
  },
  bookButton: {
    display: "block",
    textAlign: "center",
    padding: "14px",
    background: "#2563eb",
    color: "#ffffff",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    marginTop: "auto", // Pushes button to the bottom of the card if descriptions vary in size
  },
};

export default VehicleCard;