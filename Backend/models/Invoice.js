import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "paid",
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model(
  "Invoice",
  invoiceSchema
);

export default Invoice;