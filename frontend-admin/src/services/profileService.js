import api from "./api";

export const getProfile = async () => {
  const response =
    await api.get(
      "/admin/profile"
    );

  return response.data;
};

export const updateProfile = async (
  data
) => {
  const response =
    await api.put(
      "/admin/profile",
      data
    );

  return response.data;
};