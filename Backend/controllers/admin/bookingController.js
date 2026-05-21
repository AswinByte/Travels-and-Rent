import Booking from "../../models/Booking.js";
import Driver from "../../models/Driver.js";

// Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("vehicle", "vehicleName");

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Confirm Booking
export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.bookingStatus = "confirmed";

    await booking.save();

    res.status(200).json({
      message: "Booking confirmed",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.bookingStatus = "cancelled";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Complete Booking
export const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.bookingStatus = "completed";

    await booking.save();

    res.status(200).json({
      message: "Booking completed",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//assignDriver
export const assignDriver = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const driver = await Driver.findById(req.body.driverId);

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    booking.driver = driver._id;

    booking.bookingStatus = "confirmed";

    driver.status = "assigned";

    await booking.save();

    await driver.save();

    res.status(200).json({
      message: "Driver assigned successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.paymentStatus = "paid";

    await booking.save();

    res.status(200).json({
      message: "Payment verified successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const filterBookings = async (
  req,
  res
) => {
  try {

    const query = {};

    if (req.query.status) {
      query.bookingStatus =
        req.query.status;
    }

    if (req.query.paymentStatus) {
      query.paymentStatus =
        req.query.paymentStatus;
    }

    const bookings =
      await Booking.find(query);

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};