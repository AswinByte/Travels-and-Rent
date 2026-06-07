import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addPackage,
} from "../../services/packageService";

const AddPackage = () => {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
      useState(false);

  const [formData,
    setFormData] =
      useState({
        title: "",
        destination: "",
        description: "",
        duration: "",
        price: "",
        image: "",
        includedServices: "",
        itinerary: "",
        availableSeats: "",
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

        const packageData = {
          ...formData,

          includedServices:
            formData.includedServices
              .split(",")
              .map(
                (item) =>
                  item.trim()
              ),

          itinerary:
            formData.itinerary
              .split(",")
              .map(
                (item) =>
                  item.trim()
              ),

          price:
            Number(
              formData.price
            ),

          availableSeats:
            Number(
              formData.availableSeats
            ),
        };

        await addPackage(
          packageData
        );

        alert(
          "Package Added Successfully"
        );

        navigate(
          "/packages"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to add package"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div
      style={{
        maxWidth: "1000px",
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
          Add Package
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
                Package Title
              </label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
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
                Destination
              </label>

              <input
                type="text"
                name="destination"
                value={
                  formData.destination
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
                Duration
              </label>

              <input
                type="text"
                name="duration"
                placeholder="3 Days / 2 Nights"
                value={
                  formData.duration
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
                Price
              </label>

              <input
                type="number"
                name="price"
                value={
                  formData.price
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
                Available Seats
              </label>

              <input
                type="number"
                name="availableSeats"
                value={
                  formData.availableSeats
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

                <option value="inactive">
                  Inactive
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
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={
                formData.image
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >

            <label>
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={
                formData.description
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
              marginTop: "20px",
            }}
          >

            <label>
              Included Services
            </label>

            <textarea
              rows="3"
              name="includedServices"
              placeholder="Hotel, Food, Transport"
              value={
                formData.includedServices
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
              marginTop: "20px",
            }}
          >

            <label>
              Itinerary
            </label>

            <textarea
              rows="4"
              name="itinerary"
              placeholder="Day 1, Day 2, Day 3"
              value={
                formData.itinerary
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
              : "Add Package"}
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

export default AddPackage;