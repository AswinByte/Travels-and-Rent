import Package from "../../models/Package.js";

// Add Package
export const addPackage = async (req, res) => {
  try {

    const newPackage = await Package.create(
      req.body
    );

    res.status(201).json(newPackage);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getPackageById = async (
  req,
  res
) => {
  try {

    const packageData =
      await Package.findById(
        req.params.id
      );

    if (!packageData) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    res.status(200).json(
      packageData
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get All Packages
export const getPackages = async (req, res) => {
  try {

    const packages = await Package.find();

    res.status(200).json(packages);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Package
export const updatePackage = async (
  req,
  res
) => {
  try {

    const updatedPackage =
      await Package.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    res.status(200).json(
      updatedPackage
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Package
export const deletePackage = async (
  req,
  res
) => {
  try {

    const packageData =
      await Package.findByIdAndDelete(
        req.params.id
      );

    if (!packageData) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    res.status(200).json({
      message:
        "Package deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};