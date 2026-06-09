import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getVehicleById,
} from "../../services/vehicleService";

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data =
          await getVehicleById(id);

        setVehicle(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading...
      </h2>
    );
  }

  if (!vehicle) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Vehicle Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "60px 8%",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={`http://localhost:5000/${vehicle.image}`}
            alt={vehicle.vehicleName}
            style={{
              width: "100%",
              borderRadius: "20px",
            }}
          />
        </div>

        <div>
          <h1>{vehicle.vehicleName}</h1>

          <p>
            Vehicle Type: {vehicle.type}
          </p>

          <p>
            Seats: {vehicle.seats}
          </p>

          <p>
            Fuel Type: {vehicle.fuelType}
          </p>

          <h2
            style={{
              color: "#2563EB",
              marginTop: "20px",
            }}
          >
            ₹{vehicle.pricePerDay}/day
          </h2>

          <button
            onClick={() =>
              navigate(
                `/booking/${vehicle._id}`
              )
            }
            style={{
              marginTop: "30px",
              padding: "15px 30px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;