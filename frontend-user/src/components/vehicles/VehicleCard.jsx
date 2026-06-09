import { Link } from "react-router-dom";


const VehicleCard = ({ vehicle }) => {
  
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <img
  src={`http://localhost:5000/${vehicle.image}`}
  alt={vehicle.vehicleName}
  style={{
    width: "100%",
    height: "220px",
    objectFit: "cover",
  }}
/>

      <div
        style={{
          padding: "25px",
        }}
      >
        <h3
          style={{
            color: "#0F172A",
            marginBottom: "10px",
            fontSize: "24px",
          }}
        >
          {vehicle.vehicleName}
        </h3>

        <p
          style={{
            color: "#64748B",
            marginBottom: "10px",
          }}
        >
          {vehicle.type}
        </p>

        <p
          style={{
            color: "#475569",
            marginBottom: "15px",
          }}
        >
          {vehicle.seats} Seats
        </p>

        <h4
          style={{
            color: "#2563EB",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          ₹{vehicle.pricePerDay}/day
        </h4>
<Link
  to={`/vehicle/${vehicle._id}`}
>
  <button
    style={{
      width: "100%",
      padding: "12px",
      border: "none",
      background: "#2563EB",
      color: "#fff",
      borderRadius: "10px",
      cursor: "pointer",
    }}
  >
    Book Now
  </button>
</Link>
      </div>
    </div>
  );
};

export default VehicleCard;