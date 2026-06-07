import api from "./api";

// Get All Users
export const getUsers =
  async () => {

    const response =
      await api.get(
        "/admin/customers"
      );

    return response.data;
  };

// Get User By ID
export const getUserById =
  async (id) => {

    const response =
      await api.get(
        `/admin/customers/${id}`
      );

    return response.data;
  };

// Update User
export const updateUser =
  async (
    id,
    userData
  ) => {

    const response =
      await api.put(
        `/admin/customers/${id}`,
        userData
      );

    return response.data;
  };

// Block User
export const blockUser =
  async (id) => {

    const response =
      await api.put(
        `/admin/customers/${id}/block`
      );

    return response.data;
  };

// Unblock User
export const unblockUser =
  async (id) => {

    const response =
      await api.put(
        `/admin/customers/${id}/unblock`
      );

    return response.data;
  };

// Delete User
export const deleteUser =
  async (id) => {

    const response =
      await api.delete(
        `/admin/customers/${id}`
      );

    return response.data;
  };