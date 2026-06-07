import api from "./api";

export const getPackages =
  async () => {

    const response =
      await api.get(
        "/admin/packages"
      );

    return response.data;
};

export const getPackageById =
  async (id) => {

    const response =
      await api.get(
        `/admin/packages/${id}`
      );

    return response.data;
};

export const addPackage =
  async (packageData) => {

    const response =
      await api.post(
        "/admin/packages",
        packageData
      );

    return response.data;
};

export const updatePackage =
  async (
    id,
    packageData
  ) => {

    const response =
      await api.put(
        `/admin/packages/${id}`,
        packageData
      );

    return response.data;
};

export const deletePackage =
  async (id) => {

    const response =
      await api.delete(
        `/admin/packages/${id}`
      );

    return response.data;
};