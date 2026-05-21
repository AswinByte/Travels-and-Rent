import Driver from "../../models/Driver.js";

// Add Driver
export const addDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);

    res.status(201).json(driver);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Drivers
export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();

    res.status(200).json(drivers);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};