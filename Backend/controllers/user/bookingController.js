import Booking from "../../models/Booking.js";
import Vehicle from "../../models/Vehicle.js";
import Package from "../../models/Package.js";
// Create Booking
export const createBooking = async (req, res) => {
  try {
    const {
      vehicleId,
      pickupLocation,
      dropLocation,
      phone,
      notes,
      pickupDate,
      returnDate,
    } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const totalDays = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    const totalAmount =
      totalDays * vehicle.pricePerDay;

    const booking = await Booking.create({
      user: req.user._id,
      vehicle: vehicleId,
      pickupLocation,
      dropLocation,
      phone,
      notes,
      pickupDate,
      returnDate,
      totalDays,
      totalAmount,
      bookingType: "rental",
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-In User Bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).populate("vehicle");

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Booking By ID for User
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
      .populate("vehicle")
      .populate("driver", "name phone")
      .populate("package");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadPaymentScreenshot = async (
  req,
  res
) => {
  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message:
          "Screenshot required",
      });
    }

    booking.paymentScreenshot =
      req.file.path;

    booking.paymentStatus =
      "pending";

    await booking.save();

    res.status(200).json({
      message:
        "Screenshot uploaded successfully",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

//createRentalBooking
export const createRentalBooking =
async (req, res) => {

  try {

    const {
      vehicleId,
      phone,
      pickupLocation,
      dropLocation,
      notes,
      pickupDate,
      returnDate,
    } = req.body;

    const vehicle =
      await Vehicle.findById(
        vehicleId
      );

    if (!vehicle) {

      return res.status(404).json({
        message:
          "Vehicle not found",
      });

    }

    if (
      vehicle.status !==
      "available"
    ) {

      return res.status(400).json({
        message:
          "Vehicle not available",
      });

    }

    const pickup =
      new Date(pickupDate);

    const drop =
      new Date(returnDate);

    const totalDays =
      Math.ceil(
        (drop - pickup) /
        (1000 * 60 * 60 * 24)
      );

    if (totalDays <= 0) {

      return res.status(400).json({
        message:
          "Invalid booking dates",
      });

    }

    const totalAmount =
      totalDays *
      vehicle.pricePerDay;

    const booking =
  await Booking.create({

    user:
      req.user._id,

    vehicle:
      vehicleId,

    phone,

    pickupLocation,

    dropLocation,

    notes,

    pickupDate,

    returnDate,

    totalDays,

    totalAmount,

    bookingType:
      "rental",

    bookingStatus:
      "pending",

    paymentStatus:
      "pending",

    paymentScreenshot:
      req.file
        ? req.file.path
        : "",

  });

    vehicle.status =
      "booked";

    await vehicle.save();

    res.status(201).json({

      message:
        "Rental booking created",

      booking,

    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

// Create Package Booking
export const createPackageBooking = async (req, res) => {
  try {
    const {
      packageId,
      phone,
      pickupLocation,
      dropLocation,
      notes,
      pickupDate,
      returnDate,
    } = req.body;

    const pkg = await Package.findById(packageId);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (pkg.availableSeats <= 0) {
      return res.status(400).json({ message: "Package is fully booked" });
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (totalDays <= 0) {
      return res.status(400).json({ message: "Invalid booking dates" });
    }

    const totalAmount = pkg.price;

    const booking = await Booking.create({
      user: req.user._id,
      package: packageId,
      phone,
      pickupLocation,
      dropLocation,
      notes,
      pickupDate,
      returnDate,
      totalDays,
      totalAmount,
      bookingType: "package",
      bookingStatus: "pending",
      paymentStatus: "pending",
      paymentScreenshot: req.file ? req.file.path : "",
    });

    pkg.availableSeats -= 1;
    await pkg.save();

    res.status(201).json({
      message: "Package booking created",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};