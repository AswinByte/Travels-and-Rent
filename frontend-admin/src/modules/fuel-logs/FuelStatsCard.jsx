const FuelStatsCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow:
          "0 4px 20px rgba(15,23,42,0.06)",
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >

      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "18px",
          background: color,
          opacity: 0.15,
        }}
      />

      <div>

        <h4
          style={{
            margin: 0,
            color: "#64748B",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {title}
        </h4>

        <h2
          style={{
            margin: "8px 0 0",
            color: "#0F172A",
            fontWeight: "700",
          }}
        >
          {value}
        </h2>

      </div>

    </div>
  );
};

export default FuelStatsCard;