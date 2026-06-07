import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getDriverById,
  updateDriver,
} from "../../services/driverService";

const EditDriver = () => {

  const { id } =
    useParams();

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

  useEffect(() => {

    const fetchDriver =
      async () => {

   const data = await getDriverById(id);

setFormData({
  name: data.driver?.name || "",
  phone: data.driver?.phone || "",
  licenseNumber: data.driver?.licenseNumber || "",
  experience: data.driver?.experience || "",
  status: data.driver?.status || "available",
});
      };

    fetchDriver();

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

        await updateDriver(
          id,
          formData
        );

        alert(
          "Driver Updated"
        );

        navigate(
          "/drivers"
        );

      } catch (error) {

        console.log(error);

      }
    };

  const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #CBD5E1",
  borderRadius: "12px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
};
    return (
  <div
    style={{
      maxWidth: "800px",
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
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "25px",
          color: "#0F172A",
        }}
      >
        Edit Driver
      </h1>

      <form onSubmit={handleSubmit}>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2,1fr)",
            gap: "20px",
          }}
        >

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Driver Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              License Number
            </label>

            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Experience
            </label>

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="available">
                Available
              </option>

              <option value="assigned">
                Assigned
              </option>
            </select>
          </div>

        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "15px",
          }}
        >

          <button
            type="submit"
            style={{
              background: "#2563EB",
              color: "#fff",
              border: "none",
              padding:
                "12px 24px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Update Driver
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/drivers")
            }
            style={{
              background: "#E2E8F0",
              color: "#0F172A",
              border: "none",
              padding:
                "12px 24px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer",
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

export default EditDriver;