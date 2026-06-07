import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getInvoiceById,
} from "../../services/invoiceService";

const InvoiceDetails = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [invoice,
    setInvoice] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    const fetchInvoice =
      async () => {

        try {

          const data =
            await getInvoiceById(
              id
            );

          setInvoice(
            data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchInvoice();

  }, [id]);

  if (loading) {
    return (
      <h2>
        Loading Invoice...
      </h2>
    );
  }

  if (!invoice) {
    return (
      <h2>
        Invoice Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >

        <h1>
          Invoice Details
        </h1>

        <button
          onClick={() =>
            navigate(
              "/invoices"
            )
          }
          style={{
            background:
              "#2563EB",
            color: "#fff",
            border: "none",
            padding:
              "12px 20px",
            borderRadius:
              "12px",
            cursor:
              "pointer",
          }}
        >
          Back
        </button>

      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.08)",
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >

          <InfoCard
            title="Invoice Number"
            value={
              invoice.invoiceNumber
            }
          />

          <InfoCard
            title="Customer Name"
            value={
              invoice.customerName
            }
          />

          <InfoCard
            title="Amount"
            value={`₹${invoice.amount}`}
          />

          <InfoCard
            title="Payment Status"
            value={
              invoice.paymentStatus
            }
          />

        </div>

        <div
          style={{
            background:
              "#F8FAFC",
            padding: "24px",
            borderRadius:
              "16px",
            marginBottom:
              "20px",
          }}
        >

          <h3>
            Booking Information
          </h3>

          <p>
            <strong>
              Booking ID:
            </strong>{" "}
            {
              invoice.booking
                ?._id
            }
          </p>

        </div>

        <div
          style={{
            background:
              "#F8FAFC",
            padding: "24px",
            borderRadius:
              "16px",
            marginBottom:
              "20px",
          }}
        >

          <h3>
            Issue Date
          </h3>

          <p>
            {new Date(
              invoice.issueDate
            ).toLocaleString()}
          </p>

        </div>

        <div
          style={{
            background:
              "#F8FAFC",
            padding: "24px",
            borderRadius:
              "16px",
          }}
        >

          <h3>
            Created At
          </h3>

          <p>
            {new Date(
              invoice.createdAt
            ).toLocaleString()}
          </p>

        </div>

      </div>

    </div>
  );
};

const InfoCard = ({
  title,
  value,
}) => (
  <div
    style={{
      background: "#F8FAFC",
      padding: "20px",
      borderRadius: "14px",
    }}
  >

    <p
      style={{
        color: "#64748B",
        marginBottom: "8px",
      }}
    >
      {title}
    </p>

    <h3
      style={{
        margin: 0,
      }}
    >
      {value}
    </h3>

  </div>
);

export default InvoiceDetails;