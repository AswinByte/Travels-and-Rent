import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const AddUser = () => {

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
      password: "",
      phone: "",
      address: "",
      role: "user",
      status: "active",
    });

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

        await api.post(
          "/auth/register",
          formData
        );

        alert(
          "User Added Successfully"
        );

        navigate(
          "/users"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to Add User"
        );

      } finally {

        setLoading(false);

      }
    };

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
          Add User
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
                Password
              </label>

              <input
                type="password"
                name="password"
                value={
                  formData.password
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

              <select
                name="role"
                value={
                  formData.role
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
              >
                <option value="user">
                  User
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>
            </div>

            <div>
              <label>
                Status
              </label>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
              >
                <option value="active">
                  Active
                </option>

                <option value="blocked">
                  Blocked
                </option>
              </select>
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

          <button
            type="submit"
            disabled={
              loading
            }
            style={{
              marginTop: "25px",
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
              ? "Saving..."
              : "Add User"}
          </button>

        </form>

      </div>

    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #CBD5E1",
  borderRadius: "12px",
  marginTop: "8px",
  fontSize: "14px",
  outline: "none",
};

export default AddUser;