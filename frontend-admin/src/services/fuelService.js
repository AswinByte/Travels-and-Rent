import api from "./api";

export const getFuelLogs = async () => {
  const response =
    await api.get(
      "/admin/fleet/fuel"
    );

  return response.data;
};

export const getFuelLogById =
  async (id) => {
    const response =
      await api.get(
        `/admin/fleet/fuel/${id}`
      );

    return response.data;
  };

export const addFuelLog =
  async (data) => {
    const response =
      await api.post(
        "/admin/fleet/fuel",
        data
      );

    return response.data;
  };

export const updateFuelLog =
  async (id, data) => {
    const response =
      await api.put(
        `/admin/fleet/fuel/${id}`,
        data
      );

    return response.data;
  };

export const deleteFuelLog =
  async (id) => {
    const response =
      await api.delete(
        `/admin/fleet/fuel/${id}`
      );

    return response.data;
  };