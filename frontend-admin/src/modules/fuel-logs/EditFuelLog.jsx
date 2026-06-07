import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getFuelLogById,
  updateFuelLog,
} from "../../services/fuelService";

import {
  getVehicles,
} from "../../services/vehicleService";

const EditFuelLog = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [vehicles,
    setVehicles] =
      useState([]);

  const [loading,
    setLoading] =
      useState(false);

  const [formData, setFormData] =
  useState({
    vehicle: "",
    fuelType: "",
    liters: "",
    amount: "",
    mileageAtFill: "",
    fuelDate: "",
    notes: "",
  });

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const fuelLog =
            await getFuelLogById(
              id
            );

          const vehicleData =
            await getVehicles();

          setVehicles(
            vehicleData.vehicles || []
          );

          setFormData({
  vehicle:
    fuelLog.vehicle?._id || "",
  fuelType:
    fuelLog.fuelType || "",
  liters:
    fuelLog.liters,
  amount:
    fuelLog.amount,
  mileageAtFill:
    fuelLog.mileageAtFill,
  fuelDate:
    fuelLog.fuelDate?.split("T")[0],
  notes:
    fuelLog.notes || "",
});

        } catch (error) {

          console.log(error);

        }
      };

    fetchData();

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

        await updateFuelLog(
          id,
          formData
        );

        alert(
          "Fuel Log Updated Successfully"
        );

        navigate(
          "/fuel-logs"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to Update Fuel Log"
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
          Edit Fuel Log
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
                Vehicle
              </label>

              <select
                name="vehicle"
                value={
                  formData.vehicle
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
              >

                <option value="">
                  Select Vehicle
                </option>

                {vehicles.map(
                  (
                    vehicle
                  ) => (
                    <option
                      key={
                        vehicle._id
                      }
                      value={
                        vehicle._id
                      }
                    >
                      {
                        vehicle.vehicleName
                      }
                    </option>
                  )
                )}

              </select>

            </div>
<div>
  <label>
    Fuel Type
  </label>

  <select
    name="fuelType"
    value={formData.fuelType}
    onChange={handleChange}
    style={inputStyle}
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

    <option value="CNG">
      CNG
    </option>

    <option value="Electric">
      Electric
    </option>
  </select>
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
                : "Update Fuel Log"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/fuel-logs"
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

export default EditFuelLog;