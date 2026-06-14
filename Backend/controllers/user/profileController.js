import User from "../../models/User.js";
import Booking from "../../models/Booking.js";
import Vehicle from "../../models/Vehicle.js";
import Package from "../../models/Package.js";
import bcrypt from "bcryptjs";

// Get User Profile
export const getUserProfile = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.user._id
    ).select("-password");

    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("vehicle")
      .populate("package")
      .sort({ createdAt: -1 });

    const bookingCount =
      bookings.length;

    const completedTrips =
      bookings.filter(
        (booking) =>
          booking.bookingStatus ===
          "completed"
      ).length;

    const paidBookings =
      bookings.filter(
        (booking) =>
          booking.paymentStatus ===
          "verified"
      ).length;


    res.status(200).json({
      user,
      bookingCount,
      completedTrips,
      paidBookings,
      recentBookings:
        bookings.slice(0, 5),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update User Profile
export const updateUserProfile = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;

    user.phone =
      req.body.phone || user.phone;

    user.address =
      req.body.address || user.address;

    // Optional image upload
    if (req.file) {
      user.profileImage =
        req.file.path;
    }

    await user.save();

    res.status(200).json({
      message:
        "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//changePassword
export const changePassword = async (
  req,
  res
) => {
  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Current password incorrect",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        newPassword,
        salt
      );

    await user.save();

    res.status(200).json({
      message:
        "Password changed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};