import api from "./api";

// Get All Bookings
export const getBookings =
  async () => {

    const response =
      await api.get(
        "/admin/bookings"
      );

    return response.data;
  };

// Get Booking By ID
export const getBookingById =
  async (id) => {

    const response =
      await api.get(
        `/admin/bookings/${id}`
      );

    return response.data;
  };

// Confirm Booking
export const confirmBooking =
  async (id) => {

    const response =
      await api.put(
        `/admin/bookings/${id}/confirm`
      );

    return response.data;
  };

// Cancel Booking
export const cancelBooking =
  async (id) => {

    const response =
      await api.put(
        `/admin/bookings/${id}/cancel`
      );

    return response.data;
  };

// Complete Booking
export const completeBooking =
  async (id) => {

    const response =
      await api.put(
        `/admin/bookings/${id}/complete`
      );

    return response.data;
  };

// Assign Driver
export const assignDriver =
  async (
    bookingId,
    driverId
  ) => {

    const response =
      await api.put(
        `/admin/bookings/${bookingId}/assign-driver`,
        {
          driverId,
        }
      );

    return response.data;
  };
  
  export const getAvailableDrivers =
  async () => {

    const response =
      await api.get(
        "/admin/drivers/available"
      );

    return response.data;
  };
// Verify Payment
export const verifyPayment =
  async (id) => {

    const response =
      await api.put(
        `/admin/bookings/${id}/verify-payment`
      );

    return response.data;
  };

// Filter Bookings
export const filterBookings =
  async (
    status,
    paymentStatus
  ) => {

    let query = [];

    if (status) {

      query.push(
        `status=${status}`
      );

    }

    if (
      paymentStatus
    ) {

      query.push(
        `paymentStatus=${paymentStatus}`
      );

    }

    const queryString =
      query.length > 0
        ? `?${query.join("&")}`
        : "";

    const response =
      await api.get(
        `/admin/bookings/filter${queryString}`
      );

    return response.data;
  };
export const uploadPayment =
async (
  bookingId,
  formData
) => {

  const response =
    await api.post(
      `/user/bookings/${bookingId}/upload-payment`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};
// Reject Payment
export const rejectPayment =
  async (id) => {

    const response =
      await api.put(
        `/admin/bookings/${id}/reject-payment`
      );

    return response.data;
  };
// Delete Booking
export const deleteBooking =
  async (id) => {

    const response =
      await api.delete(
        `/admin/bookings/${id}`
      );

    return response.data;
  };
