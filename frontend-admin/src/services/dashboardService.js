import api from "./api";

export const getDashboardAnalytics =
  async () => {

    const response =
      await api.get(
        "/admin/analytics/dashboard"
      );

    return response.data;
};