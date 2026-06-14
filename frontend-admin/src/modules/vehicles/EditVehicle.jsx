import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getSingleVehicle,
  updateVehicle,
} from "../../services/vehicleService";

const EditVehicle = () => {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [image, setImage] =
    useState(null);

  const [formData, setFormData] =
    useState({
      vehicleName: "",
      vehicleNumber: "",
      type: "",
      brand: "",
      model: "",
      year: "",
      seats: "",
      fuelType: "",
      mileage: "",
      insuranceExpiry: "",
      serviceDate: "",
      pricePerDay: "",
      status: "",
      image: "",
    });

  useEffect(() => {

    const fetchVehicle =
      async () => {

        try {

          const data =
            await getSingleVehicle(id);

          console.log(data);

          setFormData({
            vehicleName:
              data.vehicle?.vehicleName || "",

            vehicleNumber:
              data.vehicle?.vehicleNumber || "",

            type:
              data.vehicle?.type || "",

            brand:
              data.vehicle?.brand || "",

            model:
              data.vehicle?.model || "",

            year:
              data.vehicle?.year || "",

            seats:
              data.vehicle?.seats || "",

            fuelType:
              data.vehicle?.fuelType || "",

            mileage:
              data.vehicle?.mileage || "",

            insuranceExpiry:
              data.vehicle?.insuranceExpiry
                ?.split("T")[0] || "",

            serviceDate:
              data.vehicle?.serviceDate
                ?.split("T")[0] || "",

            pricePerDay:
              data.vehicle?.pricePerDay || "",

            status:
              data.vehicle?.status || "available",

            image:
              data.vehicle?.image || "",
          });

        } catch (error) {

          console.log(error);

        }
      };

    fetchVehicle();

  }, [id]);

  const handleChange = (e) => {

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

        const data =
          new FormData();

        Object.keys(formData)
          .forEach((key) => {

            data.append(
              key,
              formData[key]
            );
          });

        if (image) {

          data.append(
            "image",
            image
          );
        }

        await updateVehicle(
          id,
          data
        );

        alert(
          "Vehicle Updated Successfully"
        );

        navigate("/vehicles");

      } catch (error) {

        console.log(error);

        alert(
          "Update Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  const styles = {

    container: {
      background: "#ffffff",
      padding: "40px",
      borderRadius: "24px",
      marginTop: "24px",
      boxShadow:
        "0 8px 24px rgba(15,23,42,0.06)",
    },

    title: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "32px",
    },

    form: {
      display: "grid",
      gridTemplateColumns:
        "repeat(2, 1fr)",
      gap: "24px",
    },

    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },

    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#334155",
    },

    input: {
      padding: "15px 18px",
      border:
        "1px solid #dbeafe",
      borderRadius: "14px",
      outline: "none",
      fontSize: "15px",
      background: "#f8fafc",
      color: "#0f172a",
    },

    select: {
      padding: "15px 18px",
      border:
        "1px solid #dbeafe",
      borderRadius: "14px",
      outline: "none",
      fontSize: "15px",
      background: "#f8fafc",
      color: "#0f172a",
    },

    imagePreview: {
      width: "220px",
      height: "140px",
      objectFit: "cover",
      borderRadius: "14px",
      marginTop: "10px",
      border:
        "1px solid #dbeafe",
    },

    button: {
      gridColumn: "span 2",
      background:
        "linear-gradient(135deg,#3b82f6,#2563eb)",
      color: "white",
      padding: "18px",
      border: "none",
      borderRadius: "16px",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "10px",
      boxShadow:
        "0 6px 18px rgba(59,130,246,0.25)",
    },
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>
        Edit Vehicle
      </h2>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Vehicle Name
          </label>

          <input
            type="text"
            name="vehicleName"
            placeholder="Enter vehicle name"
            value={formData.vehicleName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Vehicle Number
          </label>

          <input
            type="text"
            name="vehicleNumber"
            placeholder="TN 45 AB 1234"
            value={formData.vehicleNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Vehicle Type
          </label>

          <input
            type="text"
            name="type"
            placeholder="SUV / Sedan"
            value={formData.type}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Brand
          </label>

          <input
            type="text"
            name="brand"
            placeholder="Toyota"
            value={formData.brand}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Model
          </label>

          <input
            type="text"
            name="model"
            placeholder="Innova"
            value={formData.model}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Manufacturing Year
          </label>

          <input
            type="number"
            name="year"
            placeholder="2025"
            value={formData.year}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Seats
          </label>

          <input
            type="number"
            name="seats"
            placeholder="7"
            value={formData.seats}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Fuel Type
          </label>

          <input
            type="text"
            name="fuelType"
            placeholder="Diesel"
            value={formData.fuelType}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Mileage
          </label>

          <input
            type="number"
            name="mileage"
            placeholder="15"
            value={formData.mileage}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Insurance Expiry
          </label>

          <input
            type="date"
            name="insuranceExpiry"
            value={
              formData.insuranceExpiry
                ?.split("T")[0] || ""
            }
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Service Date
          </label>

          <input
            type="date"
            name="serviceDate"
            value={
              formData.serviceDate
                ?.split("T")[0] || ""
            }
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Price Per Day
          </label>

          <input
            type="number"
            name="pricePerDay"
            placeholder="2500"
            value={formData.pricePerDay}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Vehicle Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={styles.select}
          >

            <option value="available">
              Available
            </option>

            <option value="booked">
              Booked
            </option>

            <option value="maintenance">
              Maintenance
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>
        </div>

        <div style={styles.formGroup}>

          <label style={styles.label}>
            Replace Vehicle Image
          </label>

          <input
            type="file"
            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
            style={styles.input}
          />

          {formData.image && (

            <img
              src={formData.image}
              alt="vehicle"
              style={
                styles.imagePreview
              }
            />
          )}

        </div>

        <button
          type="submit"
          style={styles.button}
        >
          {loading
            ? "Updating..."
            : "Update Vehicle"}
        </button>

      </form>

    </div>
  );
};

export default EditVehicle;