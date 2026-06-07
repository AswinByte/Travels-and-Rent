import { useNavigate } from "react-router-dom";

const UserTable = ({
  users,
  onDelete,
  onBlock,
  onUnblock,
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
              Name
            </th>

            <th style={thStyle}>
              Email
            </th>

            <th style={thStyle}>
              Phone
            </th>

            <th style={thStyle}>
              Role
            </th>

            <th style={thStyle}>
              Status
            </th>

            <th style={thStyle}>
              Joined
            </th>

            <th style={thStyle}>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.length > 0 ? (

            users.map(
              (user) => (

                <tr
                  key={user._id}
                >

                  <td style={tdStyle}>
                    {user.name}
                  </td>

                  <td style={tdStyle}>
                    {user.email}
                  </td>

                  <td style={tdStyle}>
                    {user.phone || "-"}
                  </td>

                  <td style={tdStyle}>

                    <span
                      style={{
                        background:
                          user.role ===
                          "admin"
                            ? "#DBEAFE"
                            : "#F1F5F9",

                        color:
                          user.role ===
                          "admin"
                            ? "#1D4ED8"
                            : "#334155",

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
                      {user.role}
                    </span>

                  </td>

                  <td style={tdStyle}>

                    <span
                      style={{
                        background:
                          user.status ===
                          "active"
                            ? "#DCFCE7"
                            : "#FEE2E2",

                        color:
                          user.status ===
                          "active"
                            ? "#166534"
                            : "#991B1B",

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
                      {user.status}
                    </span>

                  </td>

                  <td style={tdStyle}>
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td style={tdStyle}>

                    <button
                      onClick={() =>
                        navigate(
                          `/users/${user._id}`
                        )
                      }
                      style={viewBtn}
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/users/edit/${user._id}`
                        )
                      }
                      style={editBtn}
                    >
                      Edit
                    </button>

                    {user.status ===
                    "active" ? (

                      <button
                        onClick={() =>
                          onBlock(
                            user._id
                          )
                        }
                        style={
                          blockBtn
                        }
                      >
                        Block
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          onUnblock(
                            user._id
                          )
                        }
                        style={
                          unblockBtn
                        }
                      >
                        Unblock
                      </button>

                    )}

                    <button
                      onClick={() =>
                        onDelete(
                          user._id
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
                No Users Found
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

const blockBtn = {
  background: "#F59E0B",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  marginRight: "8px",
  cursor: "pointer",
};

const unblockBtn = {
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

export default UserTable;