import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },

    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
 
    bookingType: {
      type: String,
      enum: ["travel", "rental", "package"],
      default: "travel",
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      required: true,
    },

    totalDays: {
      type: Number,
      default: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

   paymentScreenshot: {
  type: String,
},

paymentStatus: {
  type: String,
  enum: [
    "pending",
    "verified",
    "rejected"
  ],
  default: "pending",
},
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;