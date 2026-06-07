import mongoose from "mongoose";

const fuelLogSchema = mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    fuelType: {
      type: String,
      enum: [
        "Petrol",
        "Diesel",
        "CNG",
        "Electric",
      ],
      required: true,
    },

    liters: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    mileageAtFill: {
      type: Number,
      required: true,
    },

    fuelDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const FuelLog = mongoose.model(
  "FuelLog",
  fuelLogSchema
);

export default FuelLog;