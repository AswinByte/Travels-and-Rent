import mongoose from "mongoose";

const notificationSchema =
mongoose.Schema({
  title: String,
  message: String,
  read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Notification =
mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;