import { useNavigate } from "react-router-dom";
import {
  deleteDriver,
} from "../../services/driverService";

const DriverTable = ({ drivers }) => {

  const thStyle = {
    textAlign: "left",
    padding: "18px 24px",
    color: "#334155",
    fontWeight: "700",
    fontSize: "15px",
  };

  const tdStyle = {
    padding: "18px 24px",
    color: "#0F172A",
    fontSize: "15px",
  };

  const navigate = useNavigate();

const handleDelete =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this driver?"
      );

    if (!confirmDelete) return;

    try {

      await deleteDriver(id);

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to delete"
      );

    }
  };
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.05)",
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
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>License</th>
            <th style={thStyle}>Experience</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver) => (
            <tr
              key={driver._id}
              style={{
                borderBottom:
                  "1px solid #E5E7EB",
              }}
            >
              <td style={tdStyle}>
                {driver.name}
              </td>

              <td style={tdStyle}>
                {driver.phone}
              </td>

              <td style={tdStyle}>
                {driver.licenseNumber}
              </td>

              <td style={tdStyle}>
                {driver.experience} Years
              </td>

              <td style={tdStyle}>
                <span
                  style={{
                    background:
                      driver.status ===
                      "available"
                        ? "#DCFCE7"
                        : "#DBEAFE",

                    color:
                      driver.status ===
                      "available"
                        ? "#15803D"
                        : "#1D4ED8",

                    padding:
                      "8px 14px",

                    borderRadius:
                      "999px",

                    fontSize:
                      "13px",

                    fontWeight:
                      "600",
                  }}
                >
                  {driver.status}
                </span>
              </td>

<td style={tdStyle}>
  <button
    onClick={() =>
      navigate(
        `/drivers/${driver._id}`
      )
    }
    style={{
      background: "#2563EB",
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      marginRight: "8px",
    }}
  >
    View
  </button>

  <button
    onClick={() =>
      navigate(
        `/drivers/edit/${driver._id}`
      )
    }
    style={{
      background: "#3B82F6",
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      marginRight: "8px",
    }}
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDelete(driver._id)
    }
    style={{
      background: "#EF4444",
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</td>

      </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default DriverTable;