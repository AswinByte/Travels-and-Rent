import { Link } from "react-router-dom";

const BookingTable = ({
  bookings,
  onConfirm,
  onComplete,
  onCancel,
  onDelete,
}) => {

  const getStatusStyle = (
    status
  ) => {
    switch (status) {
      case "pending":
        return {
          background: "#FEF3C7",
          color: "#92400E",
        };

      case "confirmed":
        return {
          background: "#DBEAFE",
          color: "#1D4ED8",
        };

      case "completed":
        return {
          background: "#DCFCE7",
          color: "#166534",
        };

      case "cancelled":
        return {
          background: "#FEE2E2",
          color: "#991B1B",
        };

      default:
        return {
          background: "#F1F5F9",
          color: "#334155",
        };
    }
  };

  const getPaymentStyle = (
    status
  ) => {
    switch (status) {
      case "verified":
        return {
          background: "#DCFCE7",
          color: "#166534",
        };

      case "rejected":
        return {
          background: "#FEE2E2",
          color: "#991B1B",
        };

      default:
        return {
          background: "#FED7AA",
          color: "#9A3412",
        };
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        overflowX: "auto",
        boxShadow:
          "0 4px 20px rgba(15,23,42,0.06)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#F8FAFC",
            }}
          >
            <th style={thStyle}>
              Customer
            </th>

            <th style={thStyle}>
              Type
            </th>

            <th style={thStyle}>
              Vehicle
            </th>

            <th style={thStyle}>
              Package
            </th>

            <th style={thStyle}>
              Driver
            </th>

            <th style={thStyle}>
              Amount
            </th>

            <th style={thStyle}>
              Status
            </th>

            <th style={thStyle}>
              Payment
            </th>

            <th style={thStyle}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.length > 0 ? (
            bookings.map(
              (booking) => (
                <tr
                  key={booking._id}
                >
                  <td style={tdStyle}>
                    {
                      booking.user
                        ?.name
                    }
                  </td>

                  <td style={tdStyle}>
                    {
                      booking.bookingType
                    }
                  </td>

                  <td style={tdStyle}>
                    {booking
                      .vehicle
                      ?.vehicleName ||
                      "-"}
                  </td>

                  <td style={tdStyle}>
                    {booking
                      .package
                      ?.title ||
                      "-"}
                  </td>

                  <td style={tdStyle}>
                    {booking
                      .driver
                      ?.name ||
                      "-"}
                  </td>

                  <td style={tdStyle}>
                    ₹
                    {
                      booking.totalAmount
                    }
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...getStatusStyle(
                          booking.bookingStatus
                        ),
                        padding:
                          "6px 14px",
                        borderRadius:
                          "999px",
                        fontSize:
                          "13px",
                        fontWeight:
                          "600",
                      }}
                    >
                      {
                        booking.bookingStatus
                      }
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...getPaymentStyle(
                          booking.paymentStatus
                        ),
                        padding:
                          "6px 14px",
                        borderRadius:
                          "999px",
                        fontSize:
                          "13px",
                        fontWeight:
                          "600",
                      }}
                    >
                      {
                        booking.paymentStatus
                      }
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <div
                      style={{
                        display:
                          "flex",
                        flexWrap:
                          "wrap",
                        gap: "6px",
                      }}
                    >
                      <Link
                        to={`/bookings/${booking._id}`}
                        style={{
                          ...btnStyle,
                          background:
                            "#2563EB",
                          color:
                            "#fff",
                        }}
                      >
                        View
                      </Link>

                      <button
                        onClick={() =>
                          onConfirm(
                            booking._id
                          )
                        }
                        style={{
                          ...btnStyle,
                          background:
                            "#10B981",
                          color:
                            "#fff",
                        }}
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() =>
                          onComplete(
                            booking._id
                          )
                        }
                        style={{
                          ...btnStyle,
                          background:
                            "#6366F1",
                          color:
                            "#fff",
                        }}
                      >
                        Complete
                      </button>

                      <button
                        onClick={() =>
                          onCancel(
                            booking._id
                          )
                        }
                        style={{
                          ...btnStyle,
                          background:
                            "#F59E0B",
                          color:
                            "#fff",
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() =>
                          onDelete(
                            booking._id
                          )
                        }
                        style={{
                          ...btnStyle,
                          background:
                            "#DC2626",
                          color:
                            "#fff",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="9"
                style={{
                  textAlign:
                    "center",
                  padding:
                    "30px",
                }}
              >
                No Bookings Found
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
  fontWeight: "600",
  color: "#334155",
  borderBottom:
    "1px solid #E2E8F0",
};

const tdStyle = {
  padding: "16px",
  borderBottom:
    "1px solid #F1F5F9",
};

const btnStyle = {
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: "600",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

export default BookingTable;