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

const pendingBookings =
  await Booking.countDocuments({
    bookingStatus: "pending",
  });

const completedTrips =
  await Booking.countDocuments({
    bookingStatus: "completed",
  });

const pendingPayments =
  await Booking.countDocuments({
    paymentStatus: "pending",
  });

// Revenue
const paidBookings =
  await Booking.find({
    paymentStatus: "verified",
  });

const totalRevenue =
  paidBookings.reduce(
    (acc, booking) =>
      acc + booking.totalAmount,
    0
  );

// Booking Status
const bookingStatus = {
  pending:
    await Booking.countDocuments({
      bookingStatus: "pending",
    }),

  confirmed:
    await Booking.countDocuments({
      bookingStatus: "confirmed",
    }),

  completed:
    await Booking.countDocuments({
      bookingStatus: "completed",
    }),

  cancelled:
    await Booking.countDocuments({
      bookingStatus: "cancelled",
    }),
};

// Monthly Revenue
const monthlyRevenue =
  await Booking.aggregate([
    {
      $match: {
        paymentStatus: "verified",
      },
    },
    {
  $group: {
    _id: {
      month: {
        $month:
          "$createdAt",
      },
    },
    revenue: {
      $sum:
        "$totalAmount",
    },
  },
},
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

// Vehicle Type Revenue
const vehicleTypeRevenue =
  await Booking.aggregate([
    {
      $lookup: {
        from: "vehicles",
        localField: "vehicle",
        foreignField: "_id",
        as: "vehicleData",
      },
    },
    {
      $unwind: "$vehicleData",
    },
    {
      $group: {
        _id: "$vehicleData.type",
        revenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

// Driver Utilization
const driverUtilization =
  await Booking.aggregate([
    {
      $match: {
        driver: {
          $ne: null,
        },
      },
    },
    {
      $group: {
        _id: "$driver",
        totalTrips: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalTrips: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
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
    {
      $lookup: {
        from: "vehicles",
        localField: "_id",
        foreignField: "_id",
        as: "vehicleInfo",
      },
    },
    {
      $unwind: "$vehicleInfo",
    },
    {
      $project: {
        vehicleName:
          "$vehicleInfo.vehicleName",
        vehicleNumber:
          "$vehicleInfo.vehicleNumber",
        totalBookings: 1,
      },
    },
  ]);
  const topPackages =
  await Booking.aggregate([
    {
      $match: {
        package: {
          $exists: true,
          $ne: null,
        },
      },
    },
    {
      $group: {
        _id: "$package",
        totalBookings: {
          $sum: 1,
        },
        revenue: {
          $sum: "$totalAmount",
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
    {
      $lookup: {
        from: "packages",
        localField: "_id",
        foreignField: "_id",
        as: "packageInfo",
      },
    },
    {
      $unwind: "$packageInfo",
    },
    {
      $project: {
        packageName:
          "$packageInfo.title",
        totalBookings: 1,
        revenue: 1,
      },
    },
  ]);

  const recentBookings =
  await Booking.find()
    .populate(
      "user",
      "name"
    )
    .populate(
      "vehicle",
      "vehicleName"
    )
    .sort({
      createdAt: -1,
    })
    .limit(5);

    const recentPayments =
  await Booking.find({
    paymentStatus: "verified",
  })
    .populate(
      "user",
      "name"
    )
    .sort({
      updatedAt: -1,
    })
    .limit(5);
const vehicleStatus = {
  available:
    await Vehicle.countDocuments({
      status: "available",
    }),

  booked:
    await Vehicle.countDocuments({
      status: "booked",
    }),

  maintenance:
    await Vehicle.countDocuments({
      status: "maintenance",
    }),

  inactive:
    await Vehicle.countDocuments({
      status: "inactive",
    }),
};

res.status(200).json({
  totalUsers,
  totalVehicles,
  totalDrivers,
  totalBookings,
  pendingBookings,
  completedTrips,
  pendingPayments,
  totalRevenue,

  bookingStatus,  
  monthlyRevenue,
  vehicleTypeRevenue,
  driverUtilization,
  topPackages,
 topVehicles, 
  recentBookings,
  recentPayments,
  vehicleStatus,

  
});

} catch (error) {

console.log(error);

res.status(500).json({
  message: error.message,
});

}
};
