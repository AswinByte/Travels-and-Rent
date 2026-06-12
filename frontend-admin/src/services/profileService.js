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

export const changePassword = async (
  passwordData
) => {
  const response = await api.put(
    "/admin/profile/change-password",
    passwordData
  );

  return response.data;
};

export const getSettings = async () => {
  const response = await api.get(
    "/admin/settings"
  );

  return response.data;
};

export const updateSettings = async (
  data
) => {
  const response = await api.put(
    "/admin/settings",
    data
  );

  return response.data;
};

export const uploadQrCode = async (
  file
) => {
  const formData =
    new FormData();

  formData.append(
    "qrCode",
    file
    );

  const response =
    await api.post(
      "/admin/settings/upload-qr",
      formData
    );

  return response.data;
};