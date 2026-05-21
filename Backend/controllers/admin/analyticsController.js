import Booking from "../../models/Booking.js";
import Vehicle from "../../models/Vehicle.js";
import User from "../../models/User.js";
import Driver from "../../models/Driver.js";

export const getDashboardAnalytics = async (
  req,
  res
) => {
  try {

    // Basic Counts
    const totalUsers =
      await User.countDocuments({
        role: "user",
      });

    const totalVehicles =
      await Vehicle.countDocuments();

    const totalDrivers =
      await Driver.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    // Booking Status Counts
    const pendingBookings =
      await Booking.countDocuments({
        bookingStatus: "pending",
      });

    const completedTrips =
      await Booking.countDocuments({
        bookingStatus: "completed",
      });

    // Payment Stats
    const paidBookings =
      await Booking.find({
        paymentStatus: "paid",
      });

    const pendingPayments =
      await Booking.countDocuments({
        paymentStatus: "pending",
      });

    // Revenue
    const totalRevenue =
      paidBookings.reduce(
        (acc, booking) =>
          acc + booking.totalAmount,
        0
      );

    // Top Booked Vehicles
    const topVehicles =
      await Booking.aggregate([
        {
          $group: {
            _id: "$vehicle",
            totalBookings: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            totalBookings: -1,
          },
        },

        {
          $limit: 5,
        },
      ]);

    res.status(200).json({
      totalUsers,
      totalVehicles,
      totalDrivers,
      totalBookings,
      pendingBookings,
      completedTrips,
      pendingPayments,
      totalRevenue,
      topVehicles,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};