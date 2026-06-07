import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2 className="sidebar-title">
        Admin Panel
      </h2>

      <div className="sidebar-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/vehicles"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Vehicles
        </NavLink>
         
        <NavLink
          to="/drivers"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Drivers
        </NavLink>

        <NavLink
          to="/fleet"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Fleet Tracker
        </NavLink>

        <NavLink
          to="/fuel-logs"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Fuel Logs
        </NavLink>

        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Bookings
        </NavLink>

        <NavLink
          to="/packages"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Packages
        </NavLink>

        <NavLink
          to="/invoices"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Invoices
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Settings
        </NavLink>
        
        
      </div>

    </div>
  );
};

export default Sidebar;