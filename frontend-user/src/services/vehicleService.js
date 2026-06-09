import api from "./api";

export const getVehicles = async () => {
  const response = await api.get(
    "/user/vehicles"
  );

  return response.data.vehicles;
};

export const getVehicleById = async (id) => {
  const response = await api.get(
    `/user/vehicles/${id}`
  );

  return response.data.vehicle;
};