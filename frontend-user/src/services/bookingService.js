import api from "./api";

export const createRentalBooking =
  async (bookingData) => {
    const response =
      await api.post(
        "/user/bookings/rental",
        bookingData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
};

export const createPackageBooking = async (bookingData) => {
  const response = await api.post("/user/bookings/package", bookingData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/user/bookings/my-bookings");
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/user/bookings/${id}`);
  return response.data;
};