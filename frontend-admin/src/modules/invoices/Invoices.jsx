import { useEffect, useState } from "react";

import {
  getInvoices,
  deleteInvoice,
  downloadInvoice,
} from "../../services/invoiceService";

import InvoiceStatsCard from "./InvoiceStatsCard";
import InvoiceTable from "./InvoiceTable";

const Invoices = () => {

  const [invoices,
    setInvoices] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  const [search,
    setSearch] =
      useState("");

  useEffect(() => {

    const fetchInvoices =
      async () => {

        try {

          const data =
            await getInvoices();

          setInvoices(
            data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchInvoices();

  }, []);

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this invoice?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteInvoice(id);

        setInvoices(
          (prev) =>
            prev.filter(
              (invoice) =>
                invoice._id !== id
            )
        );

        alert(
          "Invoice deleted successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed"
        );

      }
    };

  const handleDownload =
    async (id) => {

      try {

        const blob =
          await downloadInvoice(
            id
          );

        const url =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.download =
          "invoice.pdf";

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();

      } catch (error) {

        console.log(error);

        alert(
          "Download failed"
        );

      }
    };

  const filteredInvoices =
    invoices.filter(
      (invoice) =>
        invoice.customerName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        invoice.invoiceNumber
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalInvoices =
    invoices.length;

  const totalRevenue =
    invoices.reduce(
      (acc, invoice) =>
        acc +
        invoice.amount,
      0
    );

  const paidInvoices =
    invoices.filter(
      (invoice) =>
        invoice.paymentStatus ===
        "paid"
    ).length;

  const pendingInvoices =
    invoices.filter(
      (invoice) =>
        invoice.paymentStatus ===
        "pending"
    ).length;

  if (loading) {
    return (
      <h2>
        Loading Invoices...
      </h2>
    );
  }

  return (
    <div>

      <div
        style={{
          marginBottom: "24px",
        }}
      >

        <h1
          style={{
            fontSize: "34px",
            fontWeight: "700",
            marginBottom: "6px",
          }}
        >
          Invoice Management
        </h1>

        <p
          style={{
            color: "#64748B",
          }}
        >
          Manage customer invoices
        </p>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >

        <InvoiceStatsCard
          title="Total Invoices"
          value={totalInvoices}
          color="#3B82F6"
        />

        <InvoiceStatsCard
          title="Total Revenue"
          value={`₹${totalRevenue}`}
          color="#10B981"
        />

        <InvoiceStatsCard
          title="Paid Invoices"
          value={paidInvoices}
          color="#F59E0B"
        />

        <InvoiceStatsCard
          title="Pending Invoices"
          value={pendingInvoices}
          color="#EF4444"
        />

      </div>

      <div
  style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "20px",
          marginBottom: "24px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.05)",
        }}
      >



        <input
          type="text"
          placeholder="Search Invoice..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
  minWidth: "380px",
  height: "52px",
  padding: "0 18px",
  border: "1.5px solid #CBD5E1",
  borderRadius: "14px",
  background: "#FFFFFF",
  fontSize: "15px",
  color: "#0F172A",
  outline: "none",
  transition: "all 0.3s ease",
  boxShadow:
    "0 2px 8px rgba(15,23,42,0.04)",
}}
        />

      </div>

      <InvoiceTable
        invoices={
          filteredInvoices
        }
        onDelete={
          handleDelete
        }
        onDownload={
          handleDownload
        }
      />

    </div>
  );
};

export default Invoices;