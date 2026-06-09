import { useEffect, useState } from "react";
import VehicleCard from "../../components/vehicles/VehicleCard";
import { getVehicles } from "../../services/vehicleService";

const Rentals = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();

setVehicles(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div
      style={{
        padding: "60px 8%",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Rental Vehicles
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle._id}
            vehicle={vehicle}
          />
        ))}
      </div>
    </div>
  );
};

export default Rentals;