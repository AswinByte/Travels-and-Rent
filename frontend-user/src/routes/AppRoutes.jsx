import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Rentals from "../pages/rentals/Rentals";
import Packages from "../pages/packages/Packages";
import Contact from "../pages/contact/Contact";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Profile from "../pages/profile/Profile";

import VehicleDetails from "../pages/rentals/VehicleDetails";


import BookingPage from "../pages/bookings/BookingPage";
import PackageBookingPage from "../pages/bookings/PackageBookingPage";
import MyBookings from "../pages/bookings/MyBookings";
import BookingDetails from "../pages/bookings/BookingDetails";
import PackageDetails from "../pages/packages/PackageDetails";

import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route path="/rentals" element={<Rentals />} />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/packages"
        element={<Packages />}
      />

      <Route
  path="/contact"
  element={<Contact />}
/>
<Route
  path="/profile"
  element={<Profile />}
/>
<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
<Route
  path="/vehicle/:id"
  element={<VehicleDetails />}
/>

<Route
  path="/booking/:id"
  element={
    <ProtectedRoute>
      <BookingPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/package-booking/:id"
  element={
    <ProtectedRoute>
      <PackageBookingPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/packages/:id"
  element={<PackageDetails />}
/>
<Route
  path="/my-bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-bookings/:id"
  element={
    <ProtectedRoute>
      <BookingDetails />
    </ProtectedRoute>
  }
/>


    </Routes>
  );
};

export default AppRoutes;