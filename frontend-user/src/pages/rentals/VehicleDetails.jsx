import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehicleById } from "../../services/vehicleService";

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        
        // Handle nested responses if the backend payload wraps the object
        const finalData = data?.vehicle || data;
        setVehicle(finalData);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  // 1. LOADING STATE
  if (loading) {
    return (
      <div style={styles.centerWrapper}>
        <div style={styles.spinner}></div>
        <h2 style={styles.messageText}>Loading vehicle specifications...</h2>
      </div>
    );
  }

  // 2. ERROR / NOT FOUND STATE
  if (!vehicle) {
    return (
      <div style={styles.centerWrapper}>
        <h2 style={styles.messageText}>⚠️ Vehicle Not Found</h2>
        <button onClick={() => navigate("/rentals")} style={styles.backButton}>
          Back to Rentals
        </button>
      </div>
    );
  }

  // Defensive field variables
  const displayName = vehicle.vehicleName || vehicle.name || "Unnamed Vehicle";
  const displayPrice = vehicle.pricePerDay || vehicle.price || vehicle.rentPrice || "0";
  const displayType = vehicle.type || "Standard";
  const displaySeats = vehicle.seats || "4";
  const displayFuel = vehicle.fuelType || "Petrol/Diesel";

  return (
    <div style={styles.pageContainer}>
      <div style={styles.layoutGrid}>
        {/* Left Column: Image Media Gallery Section */}
        <div style={styles.imageSection}>
          <img
            src={`http://localhost:5000/${vehicle.image}`}
            alt={displayName}
            style={styles.mainImage}
          />
        </div>

        {/* Right Column: Specification Details & Checkout Action */}
        <div style={styles.detailsSection}>
          <div>
            <span style={styles.categoryBadge}>{displayType}</span>
            <h1 style={styles.titleHeading}>{displayName}</h1>
            
            <div style={styles.priceContainer}>
              <span style={styles.currencySymbol}>₹</span>
              <span style={styles.priceAmount}>{displayPrice}</span>
              <span style={styles.priceUnit}>/ day</span>
            </div>
          </div>

          <hr style={styles.divider} />

          {/* Feature Specs Grid */}
          <div style={styles.specsGrid}>
            <div style={styles.specItem}>
              <span style={styles.specIcon}>🚗</span>
              <div>
                <p style={styles.specLabel}>Vehicle Category</p>
                <p style={styles.specValue}>{displayType}</p>
              </div>
            </div>

            <div style={styles.specItem}>
              <span style={styles.specIcon}>👥</span>
              <div>
                <p style={styles.specLabel}>Seating Capacity</p>
                <p style={styles.specValue}>{displaySeats} Seats</p>
              </div>
            </div>

            <div style={styles.specItem}>
              <span style={styles.specIcon}>⛽</span>
              <div>
                <p style={styles.specLabel}>Fuel Engine Type</p>
                <p style={styles.specValue}>{displayFuel}</p>
              </div>
            </div>

            <div style={styles.specItem}>
              <span style={styles.specIcon}>🛡️</span>
              <div>
                <p style={styles.specLabel}>Availability Status</p>
                <p style={{ ...styles.specValue, color: "#16a34a" }}>Available</p>
              </div>
            </div>
          </div>

          {/* Checkout CTA Button */}
          <button
            onClick={() => navigate(`/booking/${vehicle._id}`)}
            style={styles.primaryCTAButton}
          >
            Proceed to Secure Booking
          </button>
        </div>
      </div>
    </div>
  );
};

// Modern UX Styles Configuration Object
const styles = {
  pageContainer: {
    padding: "80px 8%",
    background: "#f8fafc", // Soft matching slate background
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
  layoutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "50px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
  },
  imageSection: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainImage: {
    width: "100%",
    maxHeight: "450px",
    objectFit: "cover",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
  detailsSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10px 0",
  },
  categoryBadge: {
    display: "inline-block",
    background: "#eff6ff",
    color: "#2563eb",
    padding: "6px 16px",
    borderRadius: "9999px",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: "16px",
  },
  titleHeading: {
    fontSize: "38px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "16px",
    letterSpacing: "-0.02em",
  },
  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    color: "#16a34a",
  },
  currencySymbol: {
    fontSize: "24px",
    fontWeight: "700",
    marginRight: "2px",
  },
  priceAmount: {
    fontSize: "36px",
    fontWeight: "800",
  },
  priceUnit: {
    color: "#64748b",
    fontSize: "16px",
    fontWeight: "500",
    marginLeft: "6px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e2e8f0",
    margin: "24px 0",
  },
  specsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "40px",
  },
  specItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  specIcon: {
    fontSize: "24px",
    background: "#f1f5f9",
    padding: "10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  specLabel: {
    fontSize: "12px",
    color: "#64748b",
    margin: 0,
    fontWeight: "500",
  },
  specValue: {
    fontSize: "16px",
    color: "#334155",
    margin: 0,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  primaryCTAButton: {
    width: "100%",
    padding: "16px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
    transition: "transform 0.2s ease, background 0.2s ease",
  },
  centerWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    gap: "20px",
  },
  messageText: {
    color: "#334155",
    fontWeight: "600",
  },
  backButton: {
    padding: "10px 20px",
    background: "#64748b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default VehicleDetails;