import FuelLog from "../../models/FuelLog.js";

// Add Fuel Log
export const addFuelLog = async (
  req,
  res
) => {
  console.log(
    "BODY:",
    req.body
  );
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

export const getFuelLogById = async (
  req,
  res
) => {
  try {

    const fuelLog =
      await FuelLog.findById(
        req.params.id
      ).populate(
        "vehicle",
        "vehicleName vehicleNumber"
      );

    if (!fuelLog) {
      return res.status(404).json({
        message:
          "Fuel Log not found",
      });
    }

    res.status(200).json(
      fuelLog
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateFuelLog = async (
  req,
  res
) => {
  try {

    const fuelLog =
      await FuelLog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!fuelLog) {
      return res.status(404).json({
        message:
          "Fuel Log not found",
      });
    }

    res.status(200).json(
      fuelLog
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deleteFuelLog = async (
  req,
  res
) => {
  try {

    const fuelLog =
      await FuelLog.findById(
        req.params.id
      );

    if (!fuelLog) {
      return res.status(404).json({
        message:
          "Fuel Log not found",
      });
    }

    await fuelLog.deleteOne();

    res.status(200).json({
      message:
        "Fuel Log deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};