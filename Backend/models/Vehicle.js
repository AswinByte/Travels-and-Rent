import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema(
  {
    vehicleName: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    model: {
      type: String,
    },

    year: {
      type: Number,
    },

    seats: {
      type: Number,
    },

    fuelType: {
      type: String,
    },

    mileage: {
      type: Number,
      default: 0,
    },

    insuranceExpiry: {
      type: Date,
    },

    serviceDate: {
      type: Date,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "available",
        "booked",
        "maintenance",
        "inactive",
      ],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model(
  "Vehicle",
  vehicleSchema
);

export default Vehicle;