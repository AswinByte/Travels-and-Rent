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