import { useEffect, useState } from "react";
import Select from "react-select";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPackageById,
  updatePackage,
} from "../../services/packageService";

const EditPackage = () => {

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

  useEffect(() => {

    const fetchPackage =
      async () => {

        try {

          const data =
            await getPackageById(
              id
            );

          setFormData({
            title:
              data.title || "",
            destination:
              data.destination ||
              "",
            description:
              data.description ||
              "",
            duration:
              data.duration ||
              "",
            price:
              data.price || "",
            image:
              data.image || "",
            includedServices:
              data.includedServices
                ?.join(", ") ||
              "",
            itinerary:
              data.itinerary
                ?.join(", ") ||
              "",
            availableSeats:
              data.availableSeats ||
              "",
            status:
              data.status ||
              "active",
          });

        } catch (error) {

          console.log(error);

        }
      };

    fetchPackage();

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

        await updatePackage(
          id,
          packageData
        );

        alert(
          "Package Updated Successfully"
        );

        navigate(
          "/packages"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update package"
        );

      } finally {

        setLoading(false);

      }
    };
const statusOptions = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
];

const selectStyles = {
  control: (base) => ({
    ...base,
    minHeight: "52px",
    borderRadius: "12px",
    borderColor: "#CBD5E1",
    boxShadow: "none",
  }),
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
          Edit Package
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

              <Select
  options={statusOptions}
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
  styles={selectStyles}
/>
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
                : "Update Package"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/packages"
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
  border: "1px solid #CBD5E1",
  borderRadius: "12px",
  marginTop: "8px",
  fontSize: "14px",
  outline: "none",
};

export default EditPackage;