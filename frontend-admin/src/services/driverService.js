import api from "./api";

// Get All Drivers
export const getDrivers =
  async () => {

    const response =
      await api.get(
        "/admin/drivers"
      );

    return response.data;
};

// Add Driver
export const addDriver =
  async (data) => {

    const response =
      await api.post(
        "/admin/drivers",
        data
      );

    return response.data;
};

// Get Single Driver
export const getDriverById =
  async (id) => {

    const response =
      await api.get(
        `/admin/drivers/${id}`
      );

    return response.data;
};

// Update Driver
export const updateDriver =
  async (id, data) => {

    const response =
      await api.put(
        `/admin/drivers/${id}`,
        data
      );

    return response.data;
};

// Delete Driver
export const deleteDriver =
  async (id) => {

    const response =
      await api.delete(
        `/admin/drivers/${id}`
      );

    return response.data;
};
