const PackageStatsCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "24px",
        boxShadow:
          "0 4px 20px rgba(15,23,42,0.06)",
        borderLeft:
          `5px solid ${color}`,
      }}
    >
      <p
        style={{
          color: "#64748B",
          fontSize: "14px",
          marginBottom: "10px",
          fontWeight: "500",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          color: "#0F172A",
          fontSize: "28px",
          fontWeight: "700",
          margin: 0,
        }}
      >
        {value}
      </h2>
    </div>
  );
};

export default PackageStatsCard;