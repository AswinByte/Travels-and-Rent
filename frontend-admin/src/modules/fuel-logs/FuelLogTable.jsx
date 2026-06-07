import { useNavigate } from "react-router-dom";

const FuelLogTable = ({
  fuelLogs,
  onDelete,
}) => {

  const navigate =
    useNavigate();

const handleDelete =
  (id) => {

    const confirmDelete =
      window.confirm(
        "Delete Fuel Log?"
      );

    if (
      confirmDelete
    ) {
      onDelete(id);
    }
  };
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
              Vehicle
            </th>

            <th style={thStyle}>
              Vehicle Number
            </th>
<th style={thStyle}>
  Fuel Type
</th>
            <th style={thStyle}>
              Liters
            </th>

            <th style={thStyle}>
              Amount
            </th>

            <th style={thStyle}>
              Mileage
            </th>

            <th style={thStyle}>
              Fuel Date
            </th>

            <th style={thStyle}>
              Notes
            </th>

            <th style={thStyle}>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {fuelLogs.map(
            (log) => (

              <tr
                key={log._id}
              >

                <td style={tdStyle}>
                  {
                    log.vehicle
                      ?.vehicleName
                  }
                </td>

                <td style={tdStyle}>
                  {
                    log.vehicle
                      ?.vehicleNumber
                  }
                </td>
<td style={tdStyle}>
  {log.fuelType}
</td>
                <td style={tdStyle}>
                  {log.liters} L
                </td>

                <td style={tdStyle}>
                  ₹{log.amount}
                </td>

                <td style={tdStyle}>
                  {
                    log.mileageAtFill
                  }
                </td>

                <td style={tdStyle}>
                  {new Date(
                    log.fuelDate
                  ).toLocaleDateString()}
                </td>

                <td style={tdStyle}>
                  {log.notes}
                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() =>
                      navigate(
                        `/fuel-logs/${log._id}`
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
                        `/fuel-logs/edit/${log._id}`
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
                      handleDelete(
                        log._id
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

export default FuelLogTable;