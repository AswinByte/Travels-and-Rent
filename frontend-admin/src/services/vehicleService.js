import api from "./api";

export const getVehicles =
  async (
    page = 1,
  ) => {

   const response =
  await api.get(
    `/admin/vehicles?page=${page}&limit=5`
  );

    return response.data;
};

export const createVehicle =
  async (data) => {

    const response =
      await api.post(
        "/admin/vehicles",
        data
      );

    return response.data;
};

export const getSingleVehicle =
  async (id) => {

    const response =
      await api.get(
        `/admin/vehicles/${id}`
      );

    return response.data;
};

export const updateVehicle =
  async (id, data) => {
    
    const response =
      await api.put(
        `/admin/vehicles/${id}`,
        data
      );

    return response.data;
};  

export const deleteVehicle =
  async (id) => {

    const response =
      await api.delete(
        `/admin/vehicles/${id}`
      );

    return response.data;
};