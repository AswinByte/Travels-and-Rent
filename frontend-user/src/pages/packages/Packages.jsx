import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPackages } from "../../services/packageService";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sidebar interactive filtering states
  const [searchDestination, setSearchDestination] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50000); // Dynamic ceiling limit adjustment

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await getPackages();
        setPackages(data || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Unable to load tour packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Compute live filter calculations on-the-fly (Sync layout pattern)
  const filteredPackages = packages.filter((pkg) => {
    // 1. Text Search filtering against Destination or Title
    if (searchDestination.trim() !== "") {
      const matchText = searchDestination.toLowerCase();
      const destMatch = pkg.destination?.toLowerCase().includes(matchText);
      const titleMatch = pkg.title?.toLowerCase().includes(matchText);
      if (!destMatch && !titleMatch) return false;
    }

    // 2. Duration Option Group filtering
    if (selectedDuration !== "All") {
      const durationStr = pkg.duration?.toLowerCase() || "";
      if (selectedDuration === "short" && !durationStr.includes("day") && parseInt(durationStr) > 3) return false; 
      if (selectedDuration === "mid" && (durationStr.includes("1") || durationStr.includes("2") || durationStr.includes("3"))) return false;
    }

    // 3. Price Ceiling track checking
    if (pkg.price && parseInt(pkg.price) > maxPrice) {
      return false;
    }

    return true;
  });

  const handleClearFilters = () => {
    setSearchDestination("");
    setSelectedDuration("All");
    setMaxPrice(50000);
  };

  return (
    <div style={styles.pageContainer}>
      
      {/* ================= PREMIUM CINEMATIC BACKGROUND HERO HEADER ================= */}
      <div style={styles.headerBlock}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.categoryBadge}>Handcrafted Escapes</span>
          <h1 style={styles.mainHeading}>Our Tour Packages</h1>
          <p style={styles.subheading}>
            Immerse yourself in world-class curated journeys designed by our elite travel experts.
          </p>
        </div>
      </div>

      <div style={styles.contentSection}>
        {/* DYNAMIC FILTERS SUMMARY ALERT BAR */}
        {(searchDestination !== "" || selectedDuration !== "All" || maxPrice < 50000) && (
          <div style={styles.filterAlertBar}>
            <div style={styles.filterTextGroup}>
              <span style={styles.filterBadgeIcon}>🔍</span>
              <p style={styles.filterInfoParagraph}>
                Active Filters:{" "}
                {searchDestination !== "" && <span>Query: <strong>"{searchDestination}"</strong></span>}
                {selectedDuration !== "All" && <span> • Duration: <strong>{selectedDuration === "short" ? "Short Stay" : "Long Getaway"}</strong></span>}
                {maxPrice < 50000 && <span> • Max Budget: <strong>₹{maxPrice}</strong></span>}
              </p>
            </div>
            <button onClick={handleClearFilters} style={styles.clearFilterButton}>
              Reset All Filters ×
            </button>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>⚠️ {error}</p>
          </div>
        )}

        {/* TWO-COLUMN CONFIGURATION MATRIX */}
        <div style={styles.mainLayoutGrid}>
          
          {/* ================= INTERACTIVE SIDEBAR CONTROL PANEL ================= */}
          <div style={styles.sidebarPanel}>
            <div style={styles.sidebarHeader}>
              <h3 style={styles.sidebarTitle}>Filter Tours</h3>
              <button onClick={handleClearFilters} style={styles.textResetLink}>Clear</button>
            </div>

            {/* Keyword Search Input */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Search Destination</label>
              <input 
                type="text"
                placeholder="e.g., Goa, Manali..."
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                style={styles.textInputStyle}
              />
            </div>

            {/* Duration Type Dropdown */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Trip Duration</label>
              <select 
                value={selectedDuration} 
                onChange={(e) => setSelectedDuration(e.target.value)}
                style={styles.selectDropdown}
              >
                <option value="All">Any Duration</option>
                <option value="short">Short Stays (1-3 Days)</option>
                <option value="mid">Long Getaways (4+ Days)</option>
              </select>
            </div>

            {/* Budget Range Slider Tracking */}
            <div style={styles.filterGroup}>
              <div style={styles.sliderLabelRow}>
                <label style={styles.filterLabel}>Max Price Package</label>
                <span style={styles.sliderValueText}>₹{maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="3000" 
                max="50000" 
                step="1000"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                style={styles.priceSlider}
              />
              <div style={styles.sliderRangeLimits}>
                <span>₹3,000</span>
                <span>₹50,000</span>
              </div>
            </div>
          </div>

          {/* ================= TOURS DISPLAY CANVAS ================= */}
          <div style={styles.fleetCanvas}>
            {/* LOADING STATE SHIMMER GRID */}
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

            {/* EMPTY STATE COMPONENT */}
            {!loading && !error && filteredPackages.length === 0 && (
              <div style={styles.emptyContainer}>
                <span style={styles.emptyGraphicIcon}>🗺️</span>
                <h3 style={styles.emptyTitle}>No matching packages found</h3>
                <p style={styles.emptySubtitle}>
                  We don't have adventure packages matching those exact criteria right now. Try expanding your parameters or searching for a different locale.
                </p>
                <button onClick={handleClearFilters} style={styles.emptyResetCTA}>
                  View All Tour Packages
                </button>
              </div>
            )}

            {/* RENDER TOUR CARD INTERFACES */}
            {!loading && !error && filteredPackages.length > 0 && (
              <div style={styles.gridContainer}>
                {filteredPackages.map((pkg) => (
                  <div key={pkg._id} style={styles.packageCard}>
                    <div
  style={{
    height: "200px",
    backgroundColor: "#e2e8f0",
    backgroundImage: `url(${
      pkg.image?.startsWith("http")
        ? pkg.image
        : `${import.meta.env.VITE_API_URL}/${pkg.image}`
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
/>
                    <div style={styles.cardBody}>
                      <h2 style={styles.cardTitle}>{pkg.title}</h2>
                      <p style={styles.cardMetaRow}>
                        <span>📍 {pkg.destination}</span>
                      </p>
                      
                      <p style={styles.cardDescriptionText}>
                        {pkg.description.length > 95 ? `${pkg.description.substring(0, 95)}...` : pkg.description}
                      </p>
                      
                      <div style={styles.priceActionWrapper}>
                        <div style={styles.durationBadge}>
                          ⏱ {pkg.duration}
                        </div>
                        <div style={styles.priceTag}>
                          ₹{pkg.price}
                        </div>
                      </div>

                      <Link
                        to={`/packages/${pkg._id}`}
                        style={styles.bookButtonAction}
                        onMouseOver={(e) => (e.currentTarget.style.background = "#1d4ed8")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
                      >
                        Book This Package
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

// Architecture Pure Minimal Design Sheet matching Rentals configuration layout mapping
const styles = {
  pageContainer: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  headerBlock: {
    position: "relative",
    // Stunning landscape travel background asset layout mapping
    backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1400')",
    backgroundSize: "cover",
    backgroundPosition: "center 48%",
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
    background: "linear-gradient(180deg, rgba(15, 23, 42, 0.5) 0%, rgba(15, 23, 42, 0.75) 100%)",
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
  textInputStyle: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#f8fafc",
    fontSize: "14px",
    color: "#334155",
    outline: "none",
    boxSizing: "border-box",
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
  packageCard: {
    background: "#ffffff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
  },
  cardBody: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  cardTitle: {
    margin: "0 0 8px 0",
    fontSize: "20px",
    color: "#0f172a",
    fontWeight: "700",
  },
  cardMetaRow: {
    color: "#64748b",
    margin: "0 0 12px 0",
    fontSize: "14px",
    fontWeight: "500",
  },
  cardDescriptionText: {
    color: "#475569",
    fontSize: "13.5px",
    lineHeight: "1.5",
    margin: "0 0 16px 0",
    flex: 1,
  },
  priceActionWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  durationBadge: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  priceTag: {
    fontWeight: "700",
    fontSize: "20px",
    color: "#16a34a",
  },
  bookButtonAction: {
    display: "block",
    textAlign: "center",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "14px",
    transition: "background 0.2s ease",
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

export default Packages;