import api from "./api";

// Get All Invoices
export const getInvoices =
  async () => {

    const response =
      await api.get(
        "/admin/invoices"
      );

    return response.data;
};

// Get Invoice By ID
export const getInvoiceById =
  async (id) => {

    const response =
      await api.get(
        `/admin/invoices/${id}`
      );

    return response.data;
};

// Generate Invoice
export const generateInvoice =
  async (bookingId) => {

    const response =
      await api.post(
        `/admin/invoices/${bookingId}`
      );

    return response.data;
};

// Delete Invoice
export const deleteInvoice =
  async (id) => {

    const response =
      await api.delete(
        `/admin/invoices/${id}`
      );

    return response.data;
};

// Download Invoice PDF
export const downloadInvoice =
  async (id) => {

    const response =
      await api.get(
        `/admin/invoices/download/${id}`,
        {
          responseType:
            "blob",
        }
      );

    return response.data;
};