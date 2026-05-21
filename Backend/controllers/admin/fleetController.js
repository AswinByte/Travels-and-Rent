import FuelLog from "../../models/FuelLog.js";

// Add Fuel Log
export const addFuelLog = async (
  req,
  res
) => {
  try {

    const fuelLog =
      await FuelLog.create(req.body);

    res.status(201).json(fuelLog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Fuel Logs
export const getFuelLogs = async (
  req,
  res
) => {
  try {

    const logs = await FuelLog.find()
      .populate(
        "vehicle",
        "vehicleName vehicleNumber"
      );

    res.status(200).json(logs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};