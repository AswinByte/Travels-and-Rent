import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Mock database list of locations for auto-suggestions
const POPULAR_LOCATIONS = [
  "Tamil Nadu",
  "Chennai, Tamil Nadu",
  "Coimbatore, Tamil Nadu",
  "Madurai, Tamil Nadu",
  "Ooty, Tamil Nadu",
  "Bangalore, Karnataka",
  "Kerala",
  "Mumbai, Maharashtra",
  "Delhi"
];

const SearchTrip = () => {
  const navigate = useNavigate();
  
  // State variables for form parameters
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [tripDate, setTripDate] = useState("");

  // States for suggestion dropdowns
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'from' | 'to' | null

  const componentRef = useRef(null);

  // Close suggestion dropdowns if user clicks anywhere outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle typing filtering logic for "From" field
  const handleFromChange = (e) => {
    const value = e.target.value;
    setFromLocation(value);
    if (value.trim().length > 0) {
      const filtered = POPULAR_LOCATIONS.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(filtered);
      setActiveDropdown("from");
    } else {
      setFromSuggestions([]);
    }
  };

  // Handle typing filtering logic for "To" field
  const handleToChange = (e) => {
    const value = e.target.value;
    setToLocation(value);
    if (value.trim().length > 0) {
      const filtered = POPULAR_LOCATIONS.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(filtered);
      setActiveDropdown("to");
    } else {
      setToSuggestions([]);
    }
  };

  // Execution function on Submit action
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Construct search parameters to send to the rentals page URL
    const queryParams = new URLSearchParams();
    if (fromLocation) queryParams.append("from", fromLocation);
    if (toLocation) queryParams.append("to", toLocation);
    if (tripDate) queryParams.append("date", tripDate);

    // Route user to the rentals page with parameters (e.g., /rentals?from=Tamil+Nadu&to=Chennai)
    navigate(`/rentals?${queryParams.toString()}`);
  };

  return (
    <div ref={componentRef} style={styles.searchBarContainer}>
      {/* 1. FROM CONTAINER */}
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="From Location"
          value={fromLocation}
          onChange={handleFromChange}
          onFocus={() => fromLocation && setActiveDropdown("from")}
          style={styles.inputField}
        />
        {activeDropdown === "from" && fromSuggestions.length > 0 && (
          <ul style={styles.suggestionDropdown}>
            {fromSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setFromLocation(suggestion);
                  setActiveDropdown(null);
                }}
                style={styles.suggestionItem}
              >
                📍 {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 2. TO CONTAINER */}
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="To Destination"
          value={toLocation}
          onChange={handleToChange}
          onFocus={() => toLocation && setActiveDropdown("to")}
          style={styles.inputField}
        />
        {activeDropdown === "to" && toSuggestions.length > 0 && (
          <ul style={styles.suggestionDropdown}>
            {toSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setToLocation(suggestion);
                  setActiveDropdown(null);
                }}
                style={styles.suggestionItem}
              >
                📍 {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 3. DATE CONTAINER */}
      <div style={styles.inputWrapper}>
        <input
          type="date"
          value={tripDate}
          onChange={(e) => setTripDate(e.target.value)}
          style={styles.inputField}
        />
      </div>

      {/* 4. ACTION SUBMIT BUTTON */}
      <button onClick={handleSearchSubmit} style={styles.searchButton}>
        Search Trip
      </button>
    </div>
  );
};

// Architecture UI Styles Object
const styles = {
  searchBarContainer: {
    background: "#ffffff",
    padding: "16px 24px",
    borderRadius: "99px", // Pill shaped layout matching high-tier travel apps
    display: "flex",
    gap: "12px",
    alignItems: "center",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.15)",
    maxWidth: "850px",
    margin: "0 auto",
    position: "relative",
    zIndex: 10,
  },
  inputWrapper: {
    position: "relative",
    flex: 1,
    minWidth: "160px",
  },
  inputField: {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "50px",
    fontSize: "15px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
  },
  suggestionDropdown: {
    position: "absolute",
    top: "115%",
    left: 0,
    right: 0,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    listStyle: "none",
    padding: "6px 0",
    margin: 0,
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 99,
  },
  suggestionItem: {
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#334155",
    textAlign: "left",
    transition: "background 0.2s ease",
    borderBottom: "1px solid #f1f5f9",
  },
  searchButton: {
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "14px 32px",
    borderRadius: "50px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
    whiteSpace: "nowrap",
    transition: "background-color 0.2s ease",
  },
};

export default SearchTrip;