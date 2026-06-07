import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../modules/dashboard/Dashboard";
import Vehicles from "../modules/vehicles/Vehicles";
import Drivers from "../modules/drivers/Drivers";
import FuelLogs from "../modules/fuel-logs/FuelLogs";

import Login from "../modules/auth/Login";

import ProtectedRoute from "./ProtectedRoute";
 
import FleetTracker from "../modules/fleet/FleetTracker";
import Bookings
from "../modules/bookings/Bookings";
import BookingDetails from "../modules/bookings/BookingDetails";

import Packages
from "../modules/packages/Packages";

import AddPackage
from "../modules/packages/AddPackage";

import EditPackage
from "../modules/packages/EditPackage";

import PackageDetails
from "../modules/packages/PackageDetails";
import Invoices
from "../modules/invoices/Invoices";

import InvoiceDetails
from "../modules/invoices/InvoiceDetails";

import Users
from "../modules/users/Users";
import UserDetails from "../modules/users/UserDetails";
import EditUser from "../modules/users/EditUser";

import Settings
from "../modules/settings/Settings";

import AddVehicle
from "../modules/vehicles/AddVehicle";

import EditVehicle
from "../modules/vehicles/EditVehicle";

import EditDriver
from "../modules/drivers/EditDriver";

import DriverDetails from "../modules/drivers/DriverDetails";

import AddDriver 
from "../modules/drivers/AddDriver";

import AddFuelLog from "../modules/fuel-logs/AddFuelLog";
import EditFuelLog from "../modules/fuel-logs/EditFuelLog";
import FuelLogDetails from "../modules/fuel-logs/FuelLogDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          
          <Route path="/" element={<Dashboard />} />

          <Route path="/vehicles" element={<Vehicles />} />
                      <Route
  path="/vehicles/edit/:id"
  element={<EditVehicle />}
/>
          <Route
  path="/vehicles/add"
  element={<AddVehicle />}
/>
             
          <Route path="/drivers" element={<Drivers />} />
          <Route
  path="/drivers/add"
  element={<AddDriver />}
/>
<Route
  path="/drivers/:id"
  element={<DriverDetails />}
/>
<Route
  path="/drivers/edit/:id"
  element={<EditDriver />}
/>
 
        <Route
  path="/bookings"
  element={<Bookings />}
/>
<Route
  path="/bookings/:id"
  element={<BookingDetails />}
/>
<Route
  path="/fleet"
  element={<FleetTracker />}  
/>

<Route
  path="/fuel-logs"
  element={<FuelLogs />}
/>

<Route
  path="/fuel-logs/add"
  element={<AddFuelLog />}
/>

<Route
  path="/fuel-logs/edit/:id"
  element={<EditFuelLog />}
/>

<Route
  path="/fuel-logs/:id"
  element={<FuelLogDetails />}
/>


<Route
  path="/packages"
  element={<Packages />}
/>

<Route
  path="/packages/add"
  element={<AddPackage />}
/>

<Route
  path="/packages/edit/:id"
  element={<EditPackage />}
/>

<Route
  path="/packages/:id"
  element={<PackageDetails />}
/>
<Route
  path="/invoices"
  element={<Invoices />}
/>
<Route
  path="/invoices/:id"
  element={<InvoiceDetails />}
/>
<Route
  path="/users"
  element={<Users />}
/>
<Route
  path="/users/:id"
  element={<UserDetails />}
/>
<Route
  path="/users/edit/:id"
  element={<EditUser />}
/>
<Route
  path="/settings"
  element={<Settings />}
/>

          <Route path="/fuel-logs" element={<FuelLogs />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;