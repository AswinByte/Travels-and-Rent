import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema({
  companyName: String,
  companyAddress: String,
  supportPhone: String,
  supportEmail: String,
  gstNumber: String,

  upiId: String,
  accountName: String,
  accountNumber: String,
  ifscCode: String,
  qrCode: String,
}, {
  timestamps: true,
});

export default mongoose.model(
  "AdminSettings",
  adminSettingsSchema
);