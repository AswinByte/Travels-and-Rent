import api from "./api";

export const uploadPaymentScreenshot =
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