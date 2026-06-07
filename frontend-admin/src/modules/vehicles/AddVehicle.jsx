import { useState } from "react";

import {
  createVehicle,
} from "../../services/vehicleService";

const AddVehicle = () => {

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
      status: "available",
    });

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
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

        const response =
          await createVehicle(data);

        console.log(response);

        alert(
          "Vehicle Added Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Add Vehicle"
        );

      } finally {

        setLoading(false);

      }
    };

  const styles = {

    container: {
      background: "white",
      padding: "32px",
      borderRadius: "20px",
      marginTop: "24px",
      boxShadow:
        "0 4px 12px rgba(0,0,0,0.05)",
    },

    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "24px",
    },

    form: {
      display: "grid",
      gridTemplateColumns:
        "repeat(2, 1fr)",
      gap: "20px",
    },

    input: {
      padding: "14px 16px",
      border:
        "1px solid #cbd5e1",
      borderRadius: "12px",
      outline: "none",
      fontSize: "15px",
      background: "#f8fafc",
    },

    select: {
      padding: "14px 16px",
      border:
        "1px solid #cbd5e1",
      borderRadius: "12px",
      outline: "none",
      fontSize: "15px",
      background: "#f8fafc",
    },

    fileInput: {
      padding: "12px",
      border:
        "1px solid #cbd5e1",
      borderRadius: "12px",
      background: "#f8fafc",
    },

    imagePreview: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "16px",
      border:
        "2px dashed #cbd5e1",
    },

    button: {
      gridColumn: "span 2",
      background: "#3b82f6",
      color: "white",
      padding: "16px",
      border: "none",
      borderRadius: "14px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>
        Add Vehicle
      </h2>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >

        <input
          type="text"
          name="vehicleName"
          placeholder="Vehicle Name"
          value={formData.vehicleName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="type"
          placeholder="Vehicle Type"
          value={formData.type}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="seats"
          placeholder="Seats"
          value={formData.seats}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          style={styles.select}
        >

          <option value="">
            Select Fuel Type
          </option>

          <option value="Petrol">
            Petrol
          </option>

          <option value="Diesel">
            Diesel
          </option>

          <option value="Electric">
            Electric
          </option>

          <option value="CNG">
            CNG
          </option>

        </select>

        <input
          type="number"
          name="mileage"
          placeholder="Mileage"
          value={formData.mileage}
          onChange={handleChange}
          style={styles.input}
        />

        <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }}
>

  <label
    style={{
      fontWeight: "600",
      color: "#334155",
    }}
  >
    Insurance Expiry
  </label>

  <input
    type="date"
    name="insuranceExpiry"
    value={formData.insuranceExpiry}
    onChange={handleChange}
    style={styles.input}
  />

</div>

        <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }}
>

  <label
    style={{
      fontWeight: "600",
      color: "#334155",
    }}
  >
    Service Date
  </label>

  <input
    type="date"
    name="serviceDate"
    value={formData.serviceDate}
    onChange={handleChange}
    style={styles.input}
  />

</div>

        <input
          type="number"
          name="pricePerDay"
          placeholder="Price Per Day"
          value={formData.pricePerDay}
          onChange={handleChange}
          style={styles.input}
        />

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

        <input
          type="file"
          onChange={handleImage}
          style={styles.fileInput}
        />

        {preview && (

          <img
            src={preview}
            alt="preview"
            style={styles.imagePreview}
          />

        )}

        <button
          type="submit"
          style={styles.button}
        >
          {loading
            ? "Adding..."
            : "Add Vehicle"}
        </button>

      </form>

    </div>
  );
};

export default AddVehicle;