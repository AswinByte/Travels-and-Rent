import { Link } from "react-router-dom";

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
        src={`${pkg.image}`}
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
            fontSize: "28px",
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
          📍 {pkg.destination}
        </p>

        <p
          style={{
            color: "#475569",
            minHeight: "60px",
            marginBottom: "15px",
          }}
        >
          {pkg.description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              background: "#EFF6FF",
              color: "#2563EB",
              padding: "8px 15px",
              borderRadius: "20px",
              fontWeight: "600",
            }}
          >
            🕒 {pkg.duration}
          </span>

          <span
            style={{
              color: "#16A34A",
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            ₹{pkg.price}
          </span>
        </div>

        <Link
  to={`/packages/${pkg._id}`}
  style={{
    display: "block",
    textAlign: "center",
    padding: "14px",
    background: "#2563EB",
    color: "#fff",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
  }}
>
  View Package
</Link>
      </div>
    </div>
  );
};

export default PackageCard;