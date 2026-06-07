const BookingStatsCard = ({
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
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >

      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "16px",
          background: color,
          opacity: 0.15,
        }}
      />

      <div>

        <p
          style={{
            margin: 0,
            color: "#64748B",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            margin: "6px 0 0",
            color: "#0F172A",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          {value}
        </h2>

      </div>

    </div>
  );
};

export default BookingStatsCard;