const SearchTrip = () => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "20px",
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="From"
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="To"
        style={inputStyle}
      />

      <input
        type="date"
        style={inputStyle}
      />

      <button
        style={{
          background: "#2563EB",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Search Trip
      </button>
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  minWidth: "180px",
};

export default SearchTrip;