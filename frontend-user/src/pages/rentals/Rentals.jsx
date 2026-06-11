import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VehicleCard from "../../components/vehicles/VehicleCard";
import { getVehicles } from "../../services/vehicleService";

const Rentals = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL State Management for search dashboard queries
  const [searchParams, setSearchParams] = useSearchParams();
  const fromQuery = searchParams.get("from");
  const toQuery = searchParams.get("to");
  const dateQuery = searchParams.get("date");

  // Local Sidebar Filter States
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSeats, setSelectedSeats] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);

  // Fetch core API fleet inventory
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await getVehicles();
        
        let fetchedList = [];
        if (Array.isArray(data)) {
          fetchedList = data;
        } else if (data && Array.isArray(data.vehicles)) {
          fetchedList = data.vehicles;
        }

        setVehicles(fetchedList);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
        setError("Unable to load rental vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Compute Synchronized Filtering On-The-Fly
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (fromQuery) {
      const locationMatch = vehicle.location?.toLowerCase().includes(fromQuery.toLowerCase());
      const fromLocMatch = vehicle.fromLocation?.toLowerCase().includes(fromQuery.toLowerCase());
      if (!locationMatch && !fromLocMatch) return false;
    }
    if (toQuery) {
      const destinationMatch = vehicle.destination?.toLowerCase().includes(toQuery.toLowerCase());
      const toLocMatch = vehicle.toLocation?.toLowerCase().includes(toQuery.toLowerCase());
      if (!destinationMatch && !toLocMatch) return false;
    }
    if (selectedType !== "All" && vehicle.type?.toLowerCase() !== selectedType.toLowerCase()) {
      return false;
    }
    if (selectedSeats !== "All" && parseInt(vehicle.seats) !== parseInt(selectedSeats)) {
      return false;
    }
    if (vehicle.pricePerDay && parseInt(vehicle.pricePerDay) > maxPrice) {
      return false;
    }

    return true;
  });

  const handleClearFilters = () => {
    setSearchParams({});
    setSelectedType("All");
    setSelectedSeats("All");
    setMaxPrice(10000);
  };

  return (
    <div style={styles.pageContainer}>
      
      {/* ================= PREMIUM BACKGROUND IMAGE HERO HEADER ================= */}
      <div style={styles.headerBlock}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.categoryBadge}>Premium Fleet Ecosystem</span>
          <h1 style={styles.mainHeading}>Rental Vehicles</h1>
          <p style={styles.subheading}>
            Select from our hand-picked high-performance options tailored for your perfect journey.
          </p>
        </div>
      </div>

      <div style={styles.contentSection}>
        {/* DYNAMIC FILTERS SUMMARY ALERT BAR */}
        {(fromQuery || toQuery || dateQuery || selectedType !== "All" || selectedSeats !== "All" || maxPrice < 10000) && (
          <div style={styles.filterAlertBar}>
            <div style={styles.filterTextGroup}>
              <span style={styles.filterBadgeIcon}>🔍</span>
              <p style={styles.filterInfoParagraph}>
                Active Filters:{" "}
                {fromQuery && <span>From: <strong>{fromQuery}</strong></span>}
                {toQuery && <span> • To: <strong>{toQuery}</strong></span>}
                {selectedType !== "All" && <span> • Category: <strong>{selectedType}</strong></span>}
                {selectedSeats !== "All" && <span> • Capacity: <strong>{selectedSeats} Seats</strong></span>}
                {maxPrice < 10000 && <span> • Max Price: <strong>₹{maxPrice}/day</strong></span>}
              </p>
            </div>
            <button onClick={handleClearFilters} style={styles.clearFilterButton}>
              Reset All Filters ×
            </button>
          </div>
        )}

        {/* ERROR BOUNDARY PANEL */}
        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>⚠️ {error}</p>
          </div>
        )}

        {/* TWO-COLUMN LAYOUT MATRIX */}
        <div style={styles.mainLayoutGrid}>
          
          {/* INTERACTIVE SIDEBAR CONTROL PANEL */}
          <div style={styles.sidebarPanel}>
            <div style={styles.sidebarHeader}>
              <h3 style={styles.sidebarTitle}>Filter Results</h3>
              <button onClick={handleClearFilters} style={styles.textResetLink}>Clear</button>
            </div>

            {/* Vehicle Type Dropdown */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Vehicle Type</label>
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                style={styles.selectDropdown}
              >
                <option value="All">All Categories</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="MPV">MPV</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            {/* Seating Capacity Dropdown */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Seating Capacity</label>
              <select 
                value={selectedSeats} 
                onChange={(e) => setSelectedSeats(e.target.value)}
                style={styles.selectDropdown}
              >
                <option value="All">Any Seating</option>
                <option value="4">4 Seats</option>
                <option value="5">5 Seats</option>
                <option value="7">7 Seats</option>
              </select>
            </div>

            {/* Price Slider */}
            <div style={styles.filterGroup}>
              <div style={styles.sliderLabelRow}>
                <label style={styles.filterLabel}>Max Price / Day</label>
                <span style={styles.sliderValueText}>₹{maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="10000" 
                step="500"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                style={styles.priceSlider}
              />
              <div style={styles.sliderRangeLimits}>
                <span>₹1,000</span>
                <span>₹10,000</span>
              </div>
            </div>
          </div>

          {/* VEHICLE DISPLAY CANVAS */}
          <div style={styles.fleetCanvas}>
            {loading && (
              <div style={styles.gridContainer}>
                {[1, 2, 3].map((n) => (
                  <div key={n} style={styles.skeletonCard}>
                    <div style={styles.skeletonImage}></div>
                    <div style={styles.skeletonTextLong}></div>
                    <div style={styles.skeletonTextShort}></div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && filteredVehicles.length === 0 && (
              <div style={styles.emptyContainer}>
                <span style={styles.emptyGraphicIcon}>🗺️</span>
                <h3 style={styles.emptyTitle}>No matching vehicles found</h3>
                <p style={styles.emptySubtitle}>
                  No vehicles inside our active fleet fit your precise combinations right now. Try loosening your filter requirements or click reset.
                </p>
                <button onClick={handleClearFilters} style={styles.emptyResetCTA}>
                  Reset All Filters
                </button>
              </div>
            )}

            {!loading && !error && filteredVehicles.length > 0 && (
              <div style={styles.gridContainer}>
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

// Updated Styles Sheet with Cinematic Background Image
const styles = {
  pageContainer: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  headerBlock: {
    position: "relative",
    // Premium scenic road image to mimic your landing page hero aesthetic
    backgroundImage: "url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=1400')",
    backgroundSize: "cover",
    backgroundPosition: "center 60%",
    backgroundRepeat: "no-repeat",
    padding: "80px 20px",
    textAlign: "center",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Smooth dark gradient overlay so white header text is highly readable
    background: "linear-gradient(180deg, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.8) 100%)",
    zIndex: 1,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
    margin: "0 auto",
  },
  categoryBadge: {
    background: "rgba(37, 99, 235, 0.25)",
    color: "#3b82f6",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(59, 130, 246, 0.4)",
    padding: "6px 14px",
    borderRadius: "99px",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    display: "inline-block",
    marginBottom: "16px",
  },
  mainHeading: {
    fontSize: "46px",
    fontWeight: "800",
    color: "#ffffff",
    margin: "0 0 12px 0",
    letterSpacing: "-0.03em",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  },
  subheading: {
    color: "#e2e8f0",
    fontSize: "17px",
    fontWeight: "400",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
    textShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  },
  contentSection: {
    padding: "40px 4% 80px 4%",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  filterAlertBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "14px 20px",
    marginBottom: "35px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
    gap: "16px",
    flexWrap: "wrap",
  },
  filterTextGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  filterBadgeIcon: {
    fontSize: "16px",
  },
  filterInfoParagraph: {
    margin: 0,
    fontSize: "14px",
    color: "#334155",
  },
  clearFilterButton: {
    background: "#f1f5f9",
    color: "#475569",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
  },
  mainLayoutGrid: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "40px",
    alignItems: "start",
  },
  sidebarPanel: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.02)",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    position: "sticky",
    top: "24px",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "12px",
  },
  sidebarTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
  },
  textResetLink: {
    background: "none",
    border: "none",
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  filterLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
  },
  selectDropdown: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#f8fafc",
    fontSize: "14px",
    color: "#334155",
    outline: "none",
  },
  sliderLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderValueText: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#2563eb",
    background: "#eff6ff",
    padding: "2px 8px",
    borderRadius: "6px",
  },
  priceSlider: {
    width: "100%",
    cursor: "pointer",
    accentColor: "#2563eb",
  },
  sliderRangeLimits: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "-4px",
  },
  fleetCanvas: {
    flex: 1,
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "30px",
  },
  errorContainer: {
    padding: "16px 24px",
    backgroundColor: "#fef2f2",
    borderRadius: "14px",
    border: "1px solid #fee2e2",
    textAlign: "center",
    maxWidth: "500px",
    margin: "0 auto 40px auto",
  },
  errorText: {
    color: "#991b1b",
    fontWeight: "500",
    margin: 0,
  },
  emptyContainer: {
    textAlign: "center",
    padding: "60px 30px",
    background: "#ffffff",
    borderRadius: "24px",
    border: "1px solid #e2e8f0",
    maxWidth: "500px",
    margin: "20px auto",
  },
  emptyGraphicIcon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "16px",
  },
  emptyTitle: {
    fontSize: "20px",
    color: "#0f172a",
    margin: "0 0 8px 0",
    fontWeight: "700",
  },
  emptySubtitle: {
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0 0 24px 0",
  },
  emptyResetCTA: {
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  skeletonCard: {
    background: "#ffffff",
    borderRadius: "20px",
    height: "380px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  skeletonImage: {
    width: "100%",
    height: "190px",
    backgroundColor: "#f1f5f9",
    borderRadius: "14px",
  },
  skeletonTextLong: {
    width: "70%",
    height: "22px",
    backgroundColor: "#f1f5f9",
    borderRadius: "6px",
  },
  skeletonTextShort: {
    width: "40%",
    height: "16px",
    backgroundColor: "#f1f5f9",
    borderRadius: "6px",
  },
};

export default Rentals;