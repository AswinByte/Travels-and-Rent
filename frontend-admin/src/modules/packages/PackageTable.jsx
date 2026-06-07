import { useNavigate } from "react-router-dom";

const PackageTable = ({
  packages,
  onDelete,
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
              Package
            </th>

            <th style={thStyle}>
              Destination
            </th>

            <th style={thStyle}>
              Duration
            </th>

            <th style={thStyle}>
              Price
            </th>

            <th style={thStyle}>
              Seats
            </th>

            <th style={thStyle}>
              Status
            </th>

            <th style={thStyle}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {packages.length >
          0 ? (
            packages.map(
              (pkg) => (
                <tr
                  key={
                    pkg._id
                  }
                >
                  <td
                    style={
                      tdStyle
                    }
                  >
                    {pkg.title}
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    {
                      pkg.destination
                    }
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    {
                      pkg.duration
                    }
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    ₹
                    {
                      pkg.price
                    }
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    {
                      pkg.availableSeats
                    }
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    <span
                      style={{
                        background:
                          pkg.status ===
                          "active"
                            ? "#DCFCE7"
                            : "#FEE2E2",

                        color:
                          pkg.status ===
                          "active"
                            ? "#15803D"
                            : "#DC2626",

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
                        pkg.status
                      }
                    </span>
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/packages/${pkg._id}`
                        )
                      }
                      style={
                        viewBtn
                      }
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/packages/edit/${pkg._id}`
                        )
                      }
                      style={
                        editBtn
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete(
                          pkg._id
                        )
                      }
                      style={
                        deleteBtn
                      }
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
                colSpan="7"
                style={{
                  padding:
                    "30px",
                  textAlign:
                    "center",
                }}
              >
                No Packages Found
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
  background: "#14B8A6",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  marginRight: "8px",
  cursor: "pointer",
};

const editBtn = {
  background: "#2563EB",
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

export default PackageTable;