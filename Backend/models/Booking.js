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
      required: true,
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    bookingType: {
  type: String,
  enum: ["travel", "rental"],
  default: "travel",
},

totalDays: {
  type: Number,
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

paymentStatus: {
  type: String,
  enum: [
    "pending",
    "paid",
  ],
  default: "pending",
},
  },
  {
    timestamps: true,
  }
);
paymentScreenshot: {
   type: String
}


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking; 