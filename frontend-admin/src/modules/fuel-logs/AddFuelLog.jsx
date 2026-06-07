import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  addFuelLog,
} from "../../services/fuelService";

import {
  getVehicles,
} from "../../services/vehicleService";

const AddFuelLog = () => {

  const navigate =
    useNavigate();

  const [vehicles,
    setVehicles] =
      useState([]);
const [fuelType,
  setFuelType] =
  useState(null);
  const [loading,
    setLoading] =
      useState(false);

  const [formData,
    setFormData] =
      useState({
        vehicle: "",
        fuelType:"",
        liters: "",
        amount: "",
        mileageAtFill: "",
        fuelDate: "",
        notes: "",
      });
const vehicleOptions =
  vehicles.map(
    (vehicle) => ({
      value: vehicle._id,
      label:
        vehicle.vehicleName,
    })
  );
  useEffect(() => {

    const fetchVehicles =
      async () => {

        try {

          const data =
            await getVehicles();

          setVehicles(
            data.vehicles || []
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchVehicles();

  }, []);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedVehicle) {
    alert("Please select a vehicle");
    return;
  }

  if (!fuelType) {
    alert("Please select a fuel type");
    return;
  }

  try {
    setLoading(true);

    const fuelLogData = {
  vehicle:
    selectedVehicle.value,

  fuelType:
    fuelType.value,

  liters:
    formData.liters,

  amount:
    formData.amount,

  mileageAtFill:
    formData.mileageAtFill,

  fuelDate:
    formData.fuelDate,

  notes:
    formData.notes,
};

    console.log(
      "Sending Data:",
      fuelLogData
    );

    await addFuelLog(
      fuelLogData
      
    );console.log(fuelLogData);

    alert(
      "Fuel Log Added Successfully"
    );

    navigate("/fuel-logs");

  } catch (error) {

    console.error(error);

    alert(
      error?.response?.data
        ?.message ||
        "Failed to Add Fuel Log"
    );

  } finally {

    setLoading(false);

  }
}; 

const [selectedVehicle,
  setSelectedVehicle] =
  useState(null);
const fuelTypeOptions = [
  {
    value: "Petrol",
    label: "Petrol",
  },
  {
    value: "Diesel",
    label: "Diesel",
  },
  {
    value: "CNG",
    label: "CNG",
  },
  {
    value: "Electric",
    label: "Electric",
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
          Add Fuel Log
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
  <label
    style={{
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#334155",
    }}
  >
    Vehicle
  </label>

  <Select
    options={
      vehicleOptions
    }
    value={
      selectedVehicle
    }
    onChange={
      setSelectedVehicle
    }
    placeholder="Select Vehicle"
    styles={{
      control: (
        provided,
        state
      ) => ({
        ...provided,
        minHeight:
          "52px",
        borderRadius:
          "12px",
        border:
          state.isFocused
            ? "2px solid #2563EB"
            : "1px solid #CBD5E1",

        boxShadow:
          state.isFocused
            ? "0 0 0 4px rgba(37,99,235,0.15)"
            : "none",

        "&:hover": {
          border:
            "2px solid #2563EB",
        },
      }),

      menu: (
        provided
      ) => ({
        ...provided,
        borderRadius:
          "12px",
        overflow:
          "hidden",
      }),

      option: (
        provided,
        state
      ) => ({
        ...provided,
        backgroundColor:
          state.isSelected
            ? "#2563EB"
            : state.isFocused
            ? "#EFF6FF"
            : "#fff",

        color:
          state.isSelected
            ? "#fff"
            : "#0F172A",

        padding:
          "12px 16px",
        cursor:
          "pointer",
      }),
    }}
  />
</div>
<div>
  <label
    style={{
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#334155",
    }}
  >
    Fuel Type
  </label>

  <Select
    options={
      fuelTypeOptions
    }
    value={fuelType}
    onChange={
      setFuelType
    }
    placeholder="Select Fuel Type"
    styles={{
      control: (
        provided,
        state
      ) => ({
        ...provided,
        minHeight:
          "52px",
        borderRadius:
          "12px",
        border:
          state.isFocused
            ? "2px solid #2563EB"
            : "1px solid #CBD5E1",
        boxShadow:
          state.isFocused
            ? "0 0 0 4px rgba(37,99,235,0.15)"
            : "none",
        "&:hover": {
          border:
            "2px solid #2563EB",
        },
      }),

      menu: (
        provided
      ) => ({
        ...provided,
        borderRadius:
          "12px",
        overflow:
          "hidden",
      }),

      option: (
        provided,
        state
      ) => ({
        ...provided,
        backgroundColor:
          state.isSelected
            ? "#2563EB"
            : state.isFocused
            ? "#EFF6FF"
            : "#fff",

        color:
          state.isSelected
            ? "#fff"
            : "#0F172A",

        padding:
          "12px 16px",
        cursor:
          "pointer",
      }),
    }}
  />
</div>
            <div>
              <label>
                Fuel Liters
              </label>

              <input
                type="number"
                name="liters"
                value={
                  formData.liters
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
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={
                  formData.amount
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
                Mileage
              </label>

              <input
                type="number"
                name="mileageAtFill"
                value={
                  formData.mileageAtFill
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
                Fuel Date
              </label>

              <input
                type="date"
                name="fuelDate"
                value={
                  formData.fuelDate
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
              />
            </div>

          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >

            <label>
              Notes
            </label>

            <textarea
              rows="4"
              name="notes"
              value={
                formData.notes
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
              : "Add Fuel Log"}
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

export default AddFuelLog;