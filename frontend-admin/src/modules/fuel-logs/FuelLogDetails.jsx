import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getFuelLogById,
} from "../../services/fuelService";

const FuelLogDetails = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [fuelLog,
    setFuelLog] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    const fetchFuelLog =
      async () => {

        try {

          const data =
            await getFuelLogById(
              id
            );

          setFuelLog(
            data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchFuelLog();

  }, [id]);

  if (loading) {
    return (
      <h2>
        Loading Fuel Log...
      </h2>
    );
  }

  if (!fuelLog) {
    return (
      <h2>
        Fuel Log Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.08)",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >

          <h1>
            Fuel Log Details
          </h1>

          <button
            onClick={() =>
              navigate(
                "/fuel-logs"
              )
            }
            style={{
              background:
                "#2563EB",
              color: "#fff",
              border: "none",
              padding:
                "12px 20px",
              borderRadius:
                "12px",
              cursor:
                "pointer",
            }}
          >
            Back
          </button>

        </div>

        <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(3,1fr)",
    gap: "24px",
  }}
>

          <InfoCard
            title="Vehicle Name"
            value={
              fuelLog.vehicle
                ?.vehicleName
            }
          />

          <InfoCard
            title="Vehicle Number"
            value={
              fuelLog.vehicle
                ?.vehicleNumber
            }
          />
<InfoCard
  title="Fuel Type"
  value={
    fuelLog.fuelType ||
    "N/A"
  }
/>
          <InfoCard
            title="Fuel Liters"
            value={`${fuelLog.liters} L`}
          />

          <InfoCard
            title="Amount"
            value={`₹${fuelLog.amount}`}
          />

          <InfoCard
            title="Mileage"
            value={
              fuelLog.mileageAtFill
            }
          />

          <InfoCard
            title="Fuel Date"
            value={new Date(
              fuelLog.fuelDate
            ).toLocaleDateString()}
          />

        </div>

        <div
          style={{
            marginTop: "25px",
          }}
        >

          <h3>
            Notes
          </h3>

          <div
            style={{
              background:
                "#F8FAFC",
              padding: "16px",
              borderRadius:
                "12px",
              marginTop: "10px",
            }}
          >
            {fuelLog.notes ||
              "No Notes"}
          </div>

        </div>

        <div
          style={{
            marginTop: "25px",
          }}
        >

          <h3>
            Created At
          </h3>

          <div
            style={{
              background:
                "#F8FAFC",
              padding: "16px",
              borderRadius:
                "12px",
              marginTop: "10px",
            }}
          >
            {new Date(
              fuelLog.createdAt
            ).toLocaleString()}
          </div>

        </div>

      </div>

    </div>
  );
};

const InfoCard = ({
  title,
  value,
}) => (
  <div
    style={{
      background: "#F8FAFC",
      padding: "18px",
      borderRadius: "14px",
    }}
  >

    <p
      style={{
        color: "#64748B",
        marginBottom: "8px",
      }}
    >
      {title}
    </p>

    <h3
  style={{
    color: "#0F172A",
    fontWeight: "700",
    margin: 0,
  }}
>
  {value}
</h3>

  </div>
);

export default FuelLogDetails;