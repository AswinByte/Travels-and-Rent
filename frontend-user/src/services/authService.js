import api from "./api";

export const registerUser = async (data) => {
  const response = await api.post(
    "/user/register",
    data
  );

  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post(
    "/user/login",
    data
  );

  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post(
    "/user/forgot-password",
    data
  );

  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await api.post(
    "/user/verify-otp",
    data
  );

  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post(
    "/user/reset-password",
    data
  );

  return response.data;
};

export const getProfile = async () => {
  const response = await api.get(
    "/user/profile"
  );

  return response.data;
};