import { useEffect, useState } from "react";
import Select from "react-select";
import BookingStatsCard from "./BookingStatsCard";
import BookingTable from "./BookingTable";

import {
  getBookings,
  confirmBooking,
  cancelBooking,
  completeBooking,
  verifyPayment,
  rejectPayment,
  deleteBooking,
} from "../../services/bookingService";

const Bookings = () => {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
      useState(null);

  const fetchBookings = async () => {
  try {

    const data =
      await getBookings();

    setBookings(data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};

useEffect(() => {
  const loadData = async () => {
    await fetchBookings();
  };

  loadData();
}, []);

  const handleConfirm =
    async (id) => {

      try {

        await confirmBooking(id);

        fetchBookings();

      } catch (error) {

        console.log(error);

      }
    };

  const handleComplete =
    async (id) => {

      try {

        await completeBooking(id);

        fetchBookings();

      } catch (error) {

        console.log(error);

      }
    };

  const handleCancel =
    async (id) => {

      try {

        await cancelBooking(id);

        fetchBookings();

      } catch (error) {

        console.log(error);

      }
    };

  const handleVerifyPayment =
    async (id) => {

      try {

        await verifyPayment(id);

        fetchBookings();

      } catch (error) {

        console.log(error);

      }
    };
const handleRejectPayment =
  async (id) => {

    const confirmReject =
      window.confirm(
        "Reject this payment?"
      );

    if (!confirmReject)
      return;

    try {

      await rejectPayment(id);

      fetchBookings();

      alert(
        "Payment rejected"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to reject payment"
      );

    }
  };
  const handleDelete =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this booking?"
      );

    if (!confirmDelete)
      return;

    try {

      await deleteBooking(id);

      setBookings(
        (prev) =>
          prev.filter(
            (booking) =>
              booking._id !== id
          )
      );

      alert(
        "Booking deleted successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Delete failed"
      );

    }
  };
  const filteredBookings =
  bookings.filter(
    (booking) => {

      const customerName =
        booking?.user?.name || "";

      const matchesSearch =
        customerName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        !statusFilter
          ? true
          : booking.bookingStatus ===
            statusFilter.value;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );
  const totalBookings =
    bookings.length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.bookingStatus ===
        "pending"
    ).length;

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.bookingStatus ===
        "confirmed"
    ).length;

  const totalRevenue =
  bookings.reduce(
    (acc, booking) =>
      acc +
      Number(
        booking.totalAmount || 0
      ),
    0
  );

  const statusOptions = [
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

  if (loading) {
    return (
      <h2>
        Loading Bookings...
      </h2>
    );
  }

  return (
    <div>

      {/* Header */}

      <div
        style={{
          marginBottom: "25px",
        }}
      >

        <h1
          style={{
            fontSize: "34px",
            fontWeight: "700",
          }}
        >
          Booking Management
        </h1>

        <p
          style={{
            color: "#64748B",
          }}
        >
          Manage travel and
          rental bookings
        </p>

      </div>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >

        <BookingStatsCard
          title="Total Bookings"
          value={totalBookings}
          color="#3B82F6"
        />

        <BookingStatsCard
          title="Pending"
          value={pendingBookings}
          color="#F59E0B"
        />

        <BookingStatsCard
          title="Confirmed"
          value={confirmedBookings}
          color="#10B981"
        />

        <BookingStatsCard
          title="Revenue"
          value={`₹${totalRevenue}`}
          color="#8B5CF6"
        />

      </div>

      {/* Search + Filter */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "20px",
          marginBottom: "25px",
          display: "flex",
          gap: "15px",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.06)",
        }}
      >

        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            flex: 1,
            padding:
              "12px 16px",
            border:
              "1px solid #CBD5E1",
            borderRadius:
              "12px",
          }}
        />

        <div
          style={{
            width: "250px",
          }}
        >
          <Select
            options={
              statusOptions
            }
            isClearable
            placeholder="Filter Status"
            value={
              statusFilter
            }
            onChange={
              setStatusFilter
            }
          />
        </div>

      </div>

      {/* Table */}

     <BookingTable
  bookings={filteredBookings}
  onConfirm={handleConfirm}
  onComplete={handleComplete}
  onCancel={handleCancel}
  onVerifyPayment={handleVerifyPayment}
  onRejectPayment={handleRejectPayment}
  onDelete={handleDelete}
/>

    </div>
  );
};

export default Bookings;