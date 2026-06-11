import Booking from "../../models/Booking.js";
import Driver from "../../models/Driver.js";
import User from "../../models/User.js";
import transporter from "../../config/nodemailer.js";
import Vehicle from "../../models/Vehicle.js";

// Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
  .populate("user", "name email phone")
  .populate("vehicle", "vehicleName vehicleNumber")
  .populate("driver", "name phone")
  .populate("package", "title destination");
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

if (booking.vehicle) {
  await Vehicle.findByIdAndUpdate(
    booking.vehicle,
    {
      status: "booked",
    }
  );
}

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

if (booking.vehicle) {
  await Vehicle.findByIdAndUpdate(
    booking.vehicle,
    {
      status: "available",
    }
  );
}

await booking.save();

    // Make driver available again
    if (booking.driver) {
      await Driver.findByIdAndUpdate(
        booking.driver,
        {
          status: "available",
        }
      );
    }

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

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

   booking.bookingStatus = "completed";

if (booking.vehicle) {
  await Vehicle.findByIdAndUpdate(
    booking.vehicle,
    {
      status: "available",
    }
  );
}

await booking.save();

    // Make driver available again
    if (booking.driver) {
      await Driver.findByIdAndUpdate(
        booking.driver,
        {
          status: "available",
        }
      );
    }

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
      return res.status(404).json({ message: "Booking not found" });
    }

    const { driverId } = req.body;
    let driver;

    if (driverId) {
      driver = await Driver.findById(driverId);
    } else {
      driver = await Driver.findOne({ status: "available" });
    }

    if (!driver || driver.status !== "available") {
      return res.status(400).json({ message: "Selected driver is not available" });
    }

    booking.driver = driver._id;
    booking.bookingStatus = "confirmed";
    driver.status = "assigned";

    await booking.save();
    await driver.save();

    res.status(200).json({
      message: `${driver.name} assigned successfully`,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (
  req,
  res
) => {
  try {

    const booking =
      await Booking.findById(
        req.params.id
      ).populate("user");

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found",
      });
    }

    booking.paymentStatus =
  "verified";

booking.bookingStatus =
  "confirmed";

if (booking.vehicle) {
  await Vehicle.findByIdAndUpdate(
    booking.vehicle,
    {
      status: "booked",
    }
  );
}

await booking.save();

    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to:
        booking.user.email,

      subject:
        "Booking Confirmed",

      html: `
        <h2>Booking Confirmed</h2>

        <p>Hello ${booking.user.name},</p>

        <p>Your payment has been verified successfully.</p>

        <p>
          Booking Amount:
          ₹${booking.totalAmount}
        </p>

        <p>
          Thank you for choosing our service.
        </p>
      `,
    });

    res.status(200).json({
      message:
        "Payment verified and email sent",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};
export const rejectPayment = async (
  req,
  res
) => {
  try {

    const booking =
      await Booking.findById(
        req.params.id
      ).populate("user");

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found",
      });
    }

    booking.paymentStatus =
  "rejected";

booking.bookingStatus =
  "cancelled";

if (booking.vehicle) {
  await Vehicle.findByIdAndUpdate(
    booking.vehicle,
    {
      status: "available",
    }
  );
}

await booking.save();
    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to:
        booking.user.email,

      subject:
        "Payment Rejected",

      html: `
        <h2>Payment Rejected</h2>

        <p>Hello ${booking.user.name},</p>

        <p>
          Your payment screenshot could not be verified.
        </p>

        <p>
          Please upload a valid payment proof and try again.
        </p>

        <p>
          Booking Amount:
          ₹${booking.totalAmount}
        </p>
      `,
    });

    res.status(200).json({
      message:
        "Payment rejected and email sent",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
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

// Get Booking By ID
export const getBookingById = async (
  req,
  res
) => {
  try {

    const booking =
      await Booking.findById(
        req.params.id
      )
        .populate(
          "user",
          "name email phone"
        )
        .populate(
          "vehicle",
          "vehicleName vehicleNumber"
        )
        .populate(
          "driver",
          "name phone"
        )
        .populate(
          "package",
          "title destination"
        );

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found",
      });
    }

    res.status(200).json(
      booking
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

// Delete Booking
export const deleteBooking = async (
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
if (booking.vehicle) {
  await Vehicle.findByIdAndUpdate(
    booking.vehicle,
    {
      status: "available",
    }
  );
}

await booking.deleteOne(); 

    res.status(200).json({
      message:
        "Booking deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};
export const updateBooking = async (
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

    booking.pickupDate =
      req.body.pickupDate ||
      booking.pickupDate;

    booking.returnDate =
      req.body.returnDate ||
      booking.returnDate;

    booking.totalAmount =
      req.body.totalAmount ||
      booking.totalAmount;

    booking.bookingStatus =
      req.body.bookingStatus ||
      booking.bookingStatus;

    booking.paymentStatus =
      req.body.paymentStatus ||
      booking.paymentStatus;

    booking.driver =
      req.body.driver ||
      booking.driver;

    await booking.save();

    res.status(200).json({
      message:
        "Booking updated successfully",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};