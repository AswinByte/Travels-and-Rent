import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";
import vehicleRoutes from "./routes/admin/vehicleRoutes.js";
import adminBookingRoutes from "./routes/admin/bookingRoutes.js";
import driverRoutes from "./routes/admin/driverRoutes.js";
import packageRoutes from "./routes/admin/packageRoutes.js";
import invoiceRoutes from "./routes/admin/invoiceRoutes.js";
import analyticsRoutes from "./routes/admin/analyticsRoutes.js";
import fleetRoutes from "./routes/admin/fleetRoutes.js";
import customerRoutes from "./routes/admin/customerRoutes.js";
import transporter from "./config/nodemailer.js";

import profileRoutes from "./routes/user/profileRoutes.js";
import bookingRoutes from "./routes/user/bookingRoutes.js";
import authRoutes from "./routes/user/authRoutes.js"



connectDB();

const app = express();
//Admin
app.use(express.json());
app.use("/api/admin/vehicles", vehicleRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);
app.use("/api/admin/drivers", driverRoutes)
app.use("/api/admin/packages",packageRoutes);
app.use("/api/admin/invoices", invoiceRoutes);
app.use("/api/admin/analytics",analyticsRoutes);
app.use("/api/admin/fleet",fleetRoutes);
app.use("/api/admin/customers",customerRoutes);

//User
app.use(notFound);
app.use(errorHandler);
app.use("/api/user", authRoutes);
app.use("/api/user/profile",profileRoutes);
app.use("/api/user/bookings", bookingRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/bookings",bookingRoutes);
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => {
  console.log("Server Running 5000 port ");
});