const PackageCard = ({ pkg }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={pkg.image}
        alt={pkg.title}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          padding: "20px",
        }}
      >
        <h3
          style={{
            color: "#0F172A",
            marginBottom: "10px",
          }}
        >
          {pkg.title}
        </h3>

        <p
          style={{
            color: "#64748B",
            marginBottom: "10px",
          }}
        >
          {pkg.duration}
        </p>

        <h4
          style={{
            color: "#2563EB",
            marginBottom: "15px",
          }}
        >
          ₹{pkg.price}
        </h4>

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          View Package
        </button>
      </div>
    </div>
  );
};

export default PackageCard;