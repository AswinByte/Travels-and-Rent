import mongoose from "mongoose";

const driverSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    experience: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["available", "assigned"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;