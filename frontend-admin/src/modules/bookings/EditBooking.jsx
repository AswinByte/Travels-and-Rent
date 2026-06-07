import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import {
  getBookingById,
} from "../../services/bookingService";

import {
  getDrivers,
} from "../../services/driverService";

import api from "../../services/api";

const EditBooking = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
      useState(false);

  const [drivers,
    setDrivers] =
      useState([]);

  const [formData,
    setFormData] =
      useState({
        pickupDate: "",
        returnDate: "",
        totalAmount: "",
        bookingStatus:
          "pending",
        paymentStatus:
          "pending",
        driver: "",
      });

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const booking =
            await getBookingById(
              id
            );

          const driverData =
            await getDrivers();

          setDrivers(
            driverData.drivers ||
            []
          );

          setFormData({
            pickupDate:
              booking.pickupDate
                ?.split("T")[0],

            returnDate:
              booking.returnDate
                ?.split("T")[0],

            totalAmount:
              booking.totalAmount,

            bookingStatus:
              booking.bookingStatus,

            paymentStatus:
              booking.paymentStatus,

            driver:
              booking.driver
                ?._id || "",
          });

        } catch (error) {

          console.log(error);

        }
      };

    fetchData();

  }, [id]);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await api.put(
          `/admin/bookings/${id}`,
          formData
        );

        alert(
          "Booking Updated Successfully"
        );

        navigate(
          "/bookings"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Update Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  const bookingOptions = [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "confirmed",
      label: "Confirmed",
    },
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "cancelled",
      label: "Cancelled",
    },
  ];

  const paymentOptions = [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "paid",
      label: "Paid",
    },
  ];

  const driverOptions =
    drivers.map(
      (driver) => ({
        value:
          driver._id,
        label:
          driver.name,
      })
    );

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
          padding: "30px",
          borderRadius: "20px",
        }}
      >

        <h1>
          Edit Booking
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2,1fr)",
              gap: "20px",
            }}
          >

            <div>
              <label>
                Pickup Date
              </label>

              <input
                type="date"
                value={
                  formData.pickupDate
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pickupDate:
                      e.target
                        .value,
                  })
                }
                style={
                  inputStyle
                }
              />
            </div>

            <div>
              <label>
                Return Date
              </label>

              <input
                type="date"
                value={
                  formData.returnDate
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    returnDate:
                      e.target
                        .value,
                  })
                }
                style={
                  inputStyle
                }
              />
            </div>

            <div>
              <label>
                Total Amount
              </label>

              <input
                type="number"
                value={
                  formData.totalAmount
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalAmount:
                      e.target
                        .value,
                  })
                }
                style={
                  inputStyle
                }
              />
            </div>

            <div>
              <label>
                Driver
              </label>

              <Select
                options={
                  driverOptions
                }
                value={driverOptions.find(
                  (item) =>
                    item.value ===
                    formData.driver
                )}
                onChange={(
                  selected
                ) =>
                  setFormData({
                    ...formData,
                    driver:
                      selected.value,
                  })
                }
              />
            </div>

            <div>
              <label>
                Booking Status
              </label>

              <Select
                options={
                  bookingOptions
                }
                value={bookingOptions.find(
                  (item) =>
                    item.value ===
                    formData.bookingStatus
                )}
                onChange={(
                  selected
                ) =>
                  setFormData({
                    ...formData,
                    bookingStatus:
                      selected.value,
                  })
                }
              />
            </div>

            <div>
              <label>
                Payment Status
              </label>

              <Select
                options={
                  paymentOptions
                }
                value={paymentOptions.find(
                  (item) =>
                    item.value ===
                    formData.paymentStatus
                )}
                onChange={(
                  selected
                ) =>
                  setFormData({
                    ...formData,
                    paymentStatus:
                      selected.value,
                  })
                }
              />
            </div>

          </div>

          <button
            type="submit"
            style={{
              marginTop:
                "25px",
              background:
                "#2563EB",
              color:
                "#fff",
              border:
                "none",
              padding:
                "12px 24px",
              borderRadius:
                "12px",
            }}
          >
            {loading
              ? "Updating..."
              : "Update Booking"}
          </button>

        </form>

      </div>

    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border:
    "1px solid #CBD5E1",
  borderRadius:
    "12px",
  marginTop: "8px",
};

export default EditBooking;