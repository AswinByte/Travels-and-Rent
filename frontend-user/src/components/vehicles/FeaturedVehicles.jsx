import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import { getVehicles } from "../../services/vehicleService";

const FeaturedVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();

        setVehicles(data.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section
      style={{
        padding: "80px 8%",
        background: "#F8FAFC",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "42px",
          marginBottom: "50px",
          color: "#0F172A",
        }}
      >
        Featured Vehicles
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle._id}
            vehicle={vehicle}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedVehicles;