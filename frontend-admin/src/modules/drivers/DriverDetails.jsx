import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getDriverById,
} from "../../services/driverService";

const DriverDetails = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [driver, setDriver] =
    useState(null);

  const [booking, setBooking] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDriver =
      async () => {
        try {

          const data =
            await getDriverById(id);

          setDriver(
            data.driver
          );

          setBooking(
            data.booking
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchDriver();
  }, [id]);

  if (loading) {
    return (
      <h2>
        Loading Driver...
      </h2>
    );
  }

  if (!driver) {
    return (
      <h2>
        Driver Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>
          Driver Details
        </h1>

        <button
          onClick={() =>
            navigate(
              "/drivers"
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

      <SectionCard
        title="Driver Information"
      >
        <InfoGrid>

          <InfoCard
            title="Name"
            value={
              driver.name
            }
          />

          <InfoCard
            title="Phone"
            value={
              driver.phone
            }
          />

          <InfoCard
            title="License Number"
            value={
              driver.licenseNumber
            }
          />

          <InfoCard
            title="Experience"
            value={`${driver.experience} Years`}
          />

          <InfoCard
            title="Status"
            value={
              driver.status
            }
          />

        </InfoGrid>
      </SectionCard>

      <SectionCard
        title="Assigned Booking"
      >
        {booking ? (
          <InfoGrid>

            <InfoCard
              title="Customer"
              value={
                booking.user
                  ?.name ||
                "N/A"
              }
            />

            <InfoCard
              title="Booking Type"
              value={
                booking.bookingType
              }
            />

            <InfoCard
              title="Pickup Date"
              value={new Date(
                booking.pickupDate
              ).toLocaleDateString()}
            />

            <InfoCard
              title="Return Date"
              value={new Date(
                booking.returnDate
              ).toLocaleDateString()}
            />

            <InfoCard
              title="Amount"
              value={`₹${booking.totalAmount}`}
            />

            <InfoCard
              title="Booking Status"
              value={
                booking.bookingStatus
              }
            />

          </InfoGrid>
        ) : (
          <h3
            style={{
              color:
                "#64748B",
            }}
          >
            No Booking Assigned
          </h3>
        )}
      </SectionCard>
    </div>
  );
};

const SectionCard = ({
  title,
  children,
}) => (
  <div
    style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "20px",
      marginBottom: "20px",
      boxShadow:
        "0 4px 20px rgba(15,23,42,0.06)",
    }}
  >
    <h2
      style={{
        marginBottom: "20px",
      }}
    >
      {title}
    </h2>

    {children}
  </div>
);

const InfoGrid = ({
  children,
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
    }}
  >
    {children}
  </div>
);

const InfoCard = ({
  title,
  value,
}) => (
  <div
    style={{
      background:
        "#F8FAFC",
      padding: "18px",
      borderRadius:
        "14px",
    }}
  >
    <p
      style={{
        color:
          "#64748B",
        marginBottom:
          "8px",
      }}
    >
      {title}
    </p>

    <h3
      style={{
        margin: 0,
      }}
    >
      {value}
    </h3>
  </div>
);

export default DriverDetails;