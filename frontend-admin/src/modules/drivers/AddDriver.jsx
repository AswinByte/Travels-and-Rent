import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addDriver,
} from "../../services/driverService";

const AddDriver = () => {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
      useState({
        name: "",
        phone: "",
        licenseNumber: "",
        experience: "",
        status: "available",
      });

  const [loading,
    setLoading] =
      useState(false);

  const handleChange = (
    e
  ) => {

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

        await addDriver(
          formData
        );

        alert(
          "Driver Added Successfully"
        );

        navigate(
          "/drivers"
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Failed to add driver"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div>

      <div
        style={{
          background:
            "#fff",
          padding: "30px",
          borderRadius:
            "20px",
          maxWidth:
            "700px",
          margin:
            "0 auto",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >

        <h1
          style={{
            marginBottom:
              "25px",
          }}
        >
          Add Driver
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div
            style={{
              marginBottom:
                "20px",
            }}
          >

            <label>
              Driver Name
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
              required
              style={{
                width: "100%",
                padding:
                  "14px",
                marginTop:
                  "8px",
                border:
                  "1px solid #CBD5E1",
                borderRadius:
                  "12px",
              }}
            />

          </div>

          <div
            style={{
              marginBottom:
                "20px",
            }}
          >

            <label>
              Phone Number
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
              required
              style={{
                width: "100%",
                padding:
                  "14px",
                marginTop:
                  "8px",
                border:
                  "1px solid #CBD5E1",
                borderRadius:
                  "12px",
              }}
            />

          </div>

          <div
            style={{
              marginBottom:
                "20px",
            }}
          >

            <label>
              License Number
            </label>

            <input
              type="text"
              name="licenseNumber"
              value={
                formData.licenseNumber
              }
              onChange={
                handleChange
              }
              required
              style={{
                width: "100%",
                padding:
                  "14px",
                marginTop:
                  "8px",
                border:
                  "1px solid #CBD5E1",
                borderRadius:
                  "12px",
              }}
            />

          </div>

          <div
            style={{
              marginBottom:
                "20px",
            }}
          >

            <label>
              Experience
            </label>

            <input
              type="number"
              name="experience"
              value={
                formData.experience
              }
              onChange={
                handleChange
              }
              style={{
                width: "100%",
                padding:
                  "14px",
                marginTop:
                  "8px",
                border:
                  "1px solid #CBD5E1",
                borderRadius:
                  "12px",
              }}
            />

          </div>

          <div
            style={{
              marginBottom:
                "25px",
            }}
          >

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
              style={{
                width: "100%",
                padding:
                  "14px",
                marginTop:
                  "8px",
                border:
                  "1px solid #CBD5E1",
                borderRadius:
                  "12px",
              }}
            >

              <option value="available">
                Available
              </option>

              <option value="assigned">
                Assigned
              </option>

            </select>

          </div>

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
                "14px 24px",
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
              : "Add Driver"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddDriver;