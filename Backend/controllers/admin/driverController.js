import Driver from "../../models/Driver.js";
import Booking from "../../models/Booking.js";

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

export const getDriverById = async (
  req,
  res
) => {
  try {

    const driver =
      await Driver.findById(
        req.params.id
      );

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    const booking =
      await Booking.findOne({
        driver: driver._id,
      })
        .populate(
          "user",
          "name phone"
        );

    res.status(200).json({
      driver,
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateDriver = async (
  req,
  res
) => {
  try {

    const driver =
      await Driver.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!driver) {
      return res.status(404).json({
        message:
          "Driver not found",
      });
    }

    res.status(200).json(driver);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteDriver = async (
  req,
  res
) => {
  try {

    const driver =
      await Driver.findById(
        req.params.id
      );

    if (!driver) {
      return res.status(404).json({
        message:
          "Driver not found",
      });
    }

    await driver.deleteOne();

    res.status(200).json({
      message:
        "Driver deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAvailableDrivers =
  async (req, res) => {
    try {

      const drivers =
        await Driver.find({
          status: "available",
        });

      res.status(200).json(
        drivers
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };