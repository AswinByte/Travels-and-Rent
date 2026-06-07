import mongoose from "mongoose";

const packageSchema =
  mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      destination: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      duration: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
      },

      includedServices: [
        {
          type: String,
        },
      ],

      itinerary: [
        {
          type: String,
        },
      ],

      availableSeats: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

const Package =
  mongoose.model(
    "Package",
    packageSchema
  );

export default Package;