import Booking from "../../models/Booking.js";
import Vehicle from "../../models/Vehicle.js";
// Create Booking
export const createBooking = async (req, res) => {
  try {
    const {
      vehicle,
      pickupDate,
      returnDate,
      totalAmount,
    } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      vehicle,
      pickupDate,
      returnDate,
      totalAmount,
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

export const uploadPaymentScreenshot = async (
  req,
  res
) => {
  try {
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.paymentScreenshot =
      req.file.path;

    await booking.save();

    res.status(200).json({
      message: "Screenshot uploaded",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//createRentalBooking
export const createRentalBooking =
async (req, res) => {

  try {

    const {
      vehicleId,
      pickupDate,
      returnDate,
    } = req.body;

    // Find Vehicle
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

    // Check Availability
    if (
      vehicle.status !==
      "available"
    ) {

      return res.status(400).json({
        message:
          "Vehicle not available",
      });

    }

    // Calculate Days
    const pickup =
      new Date(pickupDate);

    const drop =
      new Date(returnDate);

    const totalDays =
      Math.ceil(
        (drop - pickup)
        /
        (1000 * 60 * 60 * 24)
      );

    // Prevent invalid dates
    if (totalDays <= 0) {

      return res.status(400).json({
        message:
          "Invalid booking dates",
      });

    }

    // Rental Price
    const totalAmount =
      totalDays
      *
      vehicle.pricePerDay;

    // Create Booking
    const booking =
      await Booking.create({

        user: req.user._id,

        vehicle: vehicleId,

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

      });

    // Update Vehicle Status
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
      message: error.message,
    });

  }

};