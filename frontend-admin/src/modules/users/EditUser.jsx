import { useEffect, useState } from "react";
import Select from "react-select";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getUserById,
  updateUser,
} from "../../services/userService";

const EditUser = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
      useState(false);

  const [formData,
    setFormData] =
      useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        role: "user",
        status: "active",
      });

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const data =
            await getUserById(
              id
            );

          setFormData({
            name:
              data.name || "",
            email:
              data.email || "",
            phone:
              data.phone || "",
            address:
              data.address || "",
            role:
              data.role || "user",
            status:
              data.status ||
              "active",
          });

        } catch (error) {

          console.log(error);

        }
      };

    fetchUser();

  }, [id]);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await updateUser(
          id,
          formData
        );

        alert(
          "User Updated Successfully"
        );

        navigate(
          "/users"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to Update User"
        );

      } finally {

        setLoading(false);

      }
    };
const roleOptions = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

const statusOptions = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "blocked",
    label: "Blocked",
  },
];
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.08)",
        }}
      >

        <h1
          style={{
            marginBottom: "25px",
          }}
        >
          Edit User
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2,1fr)",
              gap: "20px",
            }}
          >

            <div>
              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
                required
              />
            </div>

            <div>
              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
                required
              />
            </div>

            <div>
              <label>
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
              />
            </div>

            <div>
              <label>
                Role
              </label>

              <Select
  options={roleOptions}
  value={roleOptions.find(
    (option) =>
      option.value ===
      formData.role
  )}
  onChange={(selected) =>
    setFormData({
      ...formData,
      role:
        selected.value,
    })
  }
  styles={{
    control: (
      base
    ) => ({
      ...base,
      minHeight:
        "52px",
      borderRadius:
        "12px",
      borderColor:
        "#CBD5E1",
    }),
  }}
/>
            </div>

            <div>
              <label>
                Status
              </label>

             <Select
  options={
    statusOptions
  }
  value={statusOptions.find(
    (option) =>
      option.value ===
      formData.status
  )}
  onChange={(selected) =>
    setFormData({
      ...formData,
      status:
        selected.value,
    })
  }
  styles={{
    control: (
      base
    ) => ({
      ...base,
      minHeight:
        "52px",
      borderRadius:
        "12px",
      borderColor:
        "#CBD5E1",
    }),
  }}
/>
            </div>

          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >

            <label>
              Address
            </label>

            <textarea
              rows="4"
              name="address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />

          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "25px",
            }}
          >

            <button
              type="submit"
              disabled={
                loading
              }
              style={{
                background:
                  "#2563EB",
                color: "#fff",
                border: "none",
                padding:
                  "12px 24px",
                borderRadius:
                  "12px",
                fontWeight:
                  "600",
                cursor:
                  "pointer",
              }}
            >
              {loading
                ? "Updating..."
                : "Update User"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/users"
                )
              }
              style={{
                background:
                  "#E2E8F0",
                color:
                  "#0F172A",
                border: "none",
                padding:
                  "12px 24px",
                borderRadius:
                  "12px",
                fontWeight:
                  "600",
                cursor:
                  "pointer",
              }}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border:
    "1px solid #CBD5E1",
  borderRadius:
    "12px",
  marginTop: "8px",
  fontSize: "14px",
  outline: "none",
};

export default EditUser;