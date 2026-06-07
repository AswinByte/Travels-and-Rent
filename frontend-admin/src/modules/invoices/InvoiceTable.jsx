import { useNavigate } from "react-router-dom";

const InvoiceTable = ({
  invoices,
  onDelete,
  onDownload,
}) => {

  const navigate =
    useNavigate();

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow:
          "0 4px 20px rgba(15,23,42,0.06)",
      }}
    >

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >

        <thead>

          <tr
            style={{
              background:
                "#F8FAFC",
            }}
          >

            <th style={thStyle}>
              Invoice No
            </th>

            <th style={thStyle}>
              Customer
            </th>

            <th style={thStyle}>
              Amount
            </th>

            <th style={thStyle}>
              Payment Status
            </th>

            <th style={thStyle}>
              Issue Date
            </th>

            <th style={thStyle}>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {invoices.length >
          0 ? (

            invoices.map(
              (invoice) => (

                <tr
                  key={
                    invoice._id
                  }
                >

                  <td style={tdStyle}>
                    {
                      invoice.invoiceNumber
                    }
                  </td>

                  <td style={tdStyle}>
                    {
                      invoice.customerName
                    }
                  </td>

                  <td style={tdStyle}>
                    ₹
                    {
                      invoice.amount
                    }
                  </td>

                  <td style={tdStyle}>

                    <span
                      style={{
                        background:
                          invoice.paymentStatus ===
                          "paid"
                            ? "#DCFCE7"
                            : "#FEF3C7",

                        color:
                          invoice.paymentStatus ===
                          "paid"
                            ? "#166534"
                            : "#92400E",

                        padding:
                          "6px 12px",

                        borderRadius:
                          "999px",

                        fontSize:
                          "13px",

                        fontWeight:
                          "600",
                      }}
                    >
                      {
                        invoice.paymentStatus
                      }
                    </span>

                  </td>

                  <td style={tdStyle}>
                    {new Date(
                      invoice.issueDate
                    ).toLocaleDateString()}
                  </td>

                  <td style={tdStyle}>

                    <button
                      onClick={() =>
                        navigate(
                          `/invoices/${invoice._id}`
                        )
                      }
                      style={viewBtn}
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        onDownload(
                          invoice._id
                        )
                      }
                      style={downloadBtn}
                    >
                      PDF
                    </button>

                    <button
                      onClick={() =>
                        onDelete(
                          invoice._id
                        )
                      }
                      style={deleteBtn}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )

          ) : (

            <tr>

              <td
                colSpan="6"
                style={{
                  textAlign:
                    "center",
                  padding:
                    "30px",
                }}
              >
                No Invoices Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

const thStyle = {
  padding: "16px",
  textAlign: "left",
  fontWeight: "700",
};

const tdStyle = {
  padding: "16px",
  borderTop:
    "1px solid #E2E8F0",
};

const viewBtn = {
  background: "#2563EB",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  marginRight: "8px",
  cursor: "pointer",
};

const downloadBtn = {
  background: "#10B981",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  marginRight: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#EF4444",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default InvoiceTable;