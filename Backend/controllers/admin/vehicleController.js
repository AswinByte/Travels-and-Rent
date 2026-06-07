import Vehicle from "../../models/Vehicle.js";

// Add Vehicle
export const addVehicle = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json(vehicle);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Vehicles
export const getVehicles = async (
  req,
  res
) => {

  try {

    // Pagination
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 5;

    const skip =
      (page - 1) * limit;

    // Search + Filters
    const query = {};

    // Search by vehicle name
    if (req.query.keyword) {

      query.vehicleName = {
        $regex:
          req.query.keyword,
        $options: "i",
      };

    }

    // Filter by type
    if (req.query.type) {
      query.type =
        req.query.type;
    }

    // Filter by fuel type
    if (req.query.fuelType) {
      query.fuelType =
        req.query.fuelType;
    }

    // Filter by status
    if (req.query.status) {
      query.status =
        req.query.status;
    }

    // Total Count
    const total =
      await Vehicle.countDocuments(
        query
      );

    // Fetch Vehicles
    const vehicles =
      await Vehicle.find(query)
        .skip(skip)
        .limit(limit);

    res.status(200).json({

      total,

      page,

      pages:
        Math.ceil(
          total / limit
        ),

      vehicles,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Delete Vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    await vehicle.deleteOne();

    res.status(200).json({
      message: "Vehicle deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateVehicle =
  async (req, res) => {

    try {

      const vehicle =
        await Vehicle.findById(
          req.params.id
        );

      if (!vehicle) {

        return res.status(404)
          .json({
            message:
              "Vehicle not found",
          });
      }

      if (req.file) {

        req.body.image =
          req.file.path;
      }

      Object.assign(
        vehicle,
        req.body
      );

      await vehicle.save();

      res.status(200).json(
        vehicle
      );

    } catch (error) {
console.log(error);
      res.status(500).json({
        message:
          error.message,
      });
    }
};

//markMaintenance
export const markMaintenance = async (
  req,
  res
) => {
  try {

    const vehicle =
      await Vehicle.findById(
        req.params.id
      );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    // Update Status
    vehicle.status =
      "maintenance";

    await vehicle.save();

    res.status(200).json({
      message:
        "Vehicle marked under maintenance",
      vehicle,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

//searchVehicles
export const searchVehicles =
async (req, res) => {

  try {

    const {
      keyword,
      type,
      fuelType,
      status,
      brand,
    } = req.query;

    // Dynamic Query
    const query = {};

    // Search by Name
    if (keyword) {

      query.vehicleName = {
        $regex: keyword,
        $options: "i",
      };

    }

    // Filter by Type
    if (type) {
      query.type = type;
    }

    // Filter by Fuel
    if (fuelType) {
      query.fuelType =
        fuelType;
    }

    // Filter by Status
    if (status) {
      query.status = status;
    }

    // Filter by Brand
    if (brand) {
      query.brand = brand;
    }

    // Fetch Vehicles
    const vehicles =
      await Vehicle.find(query);

    res.status(200).json(
      vehicles
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
export const getVehicleById =
  async (req, res) => {

    try {

      const vehicle =
        await Vehicle.findById(
          req.params.id
        );

      if (!vehicle) {

        return res.status(404)
          .json({
            success: false,
            message:
              "Vehicle not found",
          });
      }

      res.status(200).json({
        success: true,
        vehicle,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
};