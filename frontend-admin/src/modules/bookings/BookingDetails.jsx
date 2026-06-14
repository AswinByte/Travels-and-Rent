import { useEffect, useState } from "react";
import Select from "react-select";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getBookingById,
  verifyPayment,
  rejectPayment,
  assignDriver,
  getAvailableDrivers,
} from "../../services/bookingService";

const BookingDetails = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [booking,
    setBooking] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);
      const [drivers,
  setDrivers] =
    useState([]);

const [selectedDriver,
  setSelectedDriver] =
    useState(null);
const handleVerifyPayment =
  async () => {
    try {

      await verifyPayment(id);

      alert(
        "Payment verified successfully"
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert(
        "Verification failed"
      );

    }
  };

const handleRejectPayment =
  async () => {
    try {

      await rejectPayment(id);

      alert(
        "Payment rejected"
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert(
        "Reject failed"
      );

    }
  };

  const handleAssignDriver =
  async () => {

    try {

      if (!selectedDriver) {
  return alert(
    "Please select a driver"
  );
}

const response =
  await assignDriver(
    id,
    selectedDriver.value
  );
      alert(
        response.message
      );

      const updated =
        await getBookingById(id);

      setBooking(updated);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Driver assignment failed"
      );

    }
  };
  useEffect(() => {

    const fetchBooking =
      async () => {

        try {

          const data =
            await getBookingById(
              id
            );

          setBooking(
            data
          );
const driverData =
  await getAvailableDrivers();

setDrivers(
  driverData.map(
    (driver) => ({
      value: driver._id,
      label: `${driver.name} (${driver.phone})`,
    })
  )
);
        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };
      


    fetchBooking();

  }, [id]);

  if (loading) {
    return (
      <h2>
        Loading Booking...
      </h2>
    );
  }

  if (!booking) {
    return (
      <h2>
        Booking Not Found
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
          Booking Details
        </h1>

        <button
          onClick={() =>
            navigate(
              "/bookings"
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

      {/* Customer */}

      <SectionCard
        title="Customer Information"
      >

        <InfoGrid>

          <InfoCard
            title="Name"
            value={
              booking.user
                ?.name || "-"
            }
          />

          <InfoCard
            title="Email"
            value={
              booking.user
                ?.email || "-"
            }
          />

          <InfoCard
            title="Phone"
            value={
              booking.user
                ?.phone || "-"
            }
          />

        </InfoGrid>

      </SectionCard>

      {/* Booking */}

      <SectionCard
        title="Booking Information"
      >

        <InfoGrid>

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
            title="Total Days"
            value={
              booking.totalDays
            }
          />

          <InfoCard
            title="Total Amount"
            value={`₹${booking.totalAmount}`}
          />

        </InfoGrid>

      </SectionCard>

      {/* Vehicle */}

      <SectionCard
        title="Vehicle Information"
      >

        <InfoGrid>

          <InfoCard
            title="Vehicle"
            value={
              booking.vehicle
                ?.vehicleName ||
              "N/A"
            }
          />

          <InfoCard
            title="Vehicle Number"
            value={
              booking.vehicle
                ?.vehicleNumber ||
              "N/A"
            }
          />

        </InfoGrid>

      </SectionCard>

      {/* Package */}

      <SectionCard
        title="Package Information"
      >

        <InfoGrid>

          <InfoCard
            title="Package"
            value={
              booking.package
                ?.title || "N/A"
            }
          />

          <InfoCard
            title="Destination"
            value={
              booking.package
                ?.destination ||
              "N/A"
            }
          />

        </InfoGrid>

      </SectionCard>

      {/* Driver */}

      <SectionCard
        title="Driver Information"
      >

        <InfoGrid>

          <InfoCard
            title="Driver"
            value={
              booking.driver
                ?.name || "N/A"
            }
          />

          <InfoCard
            title="Phone"
            value={
              booking.driver
                ?.phone || "N/A"
            }
          />

        </InfoGrid>

      </SectionCard>

      {/* Status */}

      <SectionCard
        title="Status Information"
      >

        <InfoGrid>

          <InfoCard
            title="Booking Status"
            value={
              booking.bookingStatus
            }
          />

          <InfoCard
            title="Payment Status"
            value={
              booking.paymentStatus
            }
          />

        </InfoGrid>

      </SectionCard>

      {/* Payment Screenshot */}

      <SectionCard
  title="Payment Screenshot"
>
  {booking.paymentScreenshot ? (
    <img
       src={booking.paymentScreenshot}

      alt="Payment"
      style={{
        width: "100%",
        maxHeight: "500px",
        objectFit:
          "contain",
        borderRadius:
          "12px",
      }}
    />
  ) : (
    <h3
      style={{
        color: "#EF4444",
      }}
    >
      No Payment Screenshot Uploaded
    </h3>
  )}
</SectionCard>

      {/* Dates */}

      <SectionCard
        title="System Information"
      >

        <InfoGrid>

          <InfoCard
            title="Created At"
            value={new Date(
              booking.createdAt
            ).toLocaleString()}
          />

          <InfoCard
            title="Updated At"
            value={new Date(
              booking.updatedAt
            ).toLocaleString()}
          />

        </InfoGrid>

      </SectionCard>
<SectionCard
  title="Admin Actions"
>
  <div
    style={{
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
    }}
  >
    <button
      onClick={
        handleVerifyPayment
      }
      style={{
        background:
          "#10B981",
        color: "#fff",
        border: "none",
        padding:
          "12px 20px",
        borderRadius:
          "10px",
        cursor:
          "pointer",
        fontWeight:
          "600",
      }}
    >
      Verify Payment
    </button>

    <button
      onClick={
        handleRejectPayment
      }
      style={{
        background:
          "#EF4444",
        color: "#fff",
        border: "none",
        padding:
          "12px 20px",
        borderRadius:
          "10px",
        cursor:
          "pointer",
        fontWeight:
          "600",
      }}
    >
      Reject Payment
    </button>

    {
  booking.driver ? (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        background: "#F8FAFC",
        padding: "15px",
        borderRadius: "12px",
      }}
    >
      <div>
        <h4
          style={{
            margin: 0,
            color: "#16A34A",
          }}
        >
          Driver Assigned
        </h4>

        <p
          style={{
            margin: "5px 0 0",
          }}
        >
          {booking.driver.name}
          {" - "}
          {booking.driver.phone}
        </p>
      </div>

      <button
        onClick={() =>
          navigate(
            `/drivers/${booking.driver._id}`
          )
        }
        style={{
          background: "#2563EB",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        View Driver
      </button>
    </div>

  ) : (

    <>
      <div
        style={{
          width: "300px",
        }}
      >
        <Select
          options={drivers}
          value={selectedDriver}
          onChange={setSelectedDriver}
          placeholder="Select Driver"
        />
      </div>

      <button
        onClick={handleAssignDriver}
        style={{
          background: "#2563EB",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Assign Driver
      </button>
    </>

  )
}
  </div>
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
        margin: 0,
      }}
    >
      {value}
    </h3>

  </div>
);

export default BookingDetails;