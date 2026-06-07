const InvoiceStatsCard = ({
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
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "14px",
          background: color,
          opacity: 0.15,
          marginBottom: "15px",
        }}
      />

      <p
        style={{
          color: "#64748B",
          fontSize: "14px",
          marginBottom: "8px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: 0,
          color: "#0F172A",
          fontWeight: "700",
        }}
      >
        {value}
      </h2>
    </div>
  );
};

export default InvoiceStatsCard;