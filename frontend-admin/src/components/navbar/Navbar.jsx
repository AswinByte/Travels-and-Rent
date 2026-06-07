import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {

  const { user, logout } =
    useContext(AuthContext);

  return (
    <div className="navbar">

      <div>
        <h2 className="navbar-title">
          Dashboard
        </h2>
      </div>

      <div className="navbar-right">

        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />

        <div className="notification">
          🔔
        </div>

        <div className="profile">

          <div className="profile-image">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <p className="profile-name">
              {user?.name}
            </p>

            <span className="profile-role">
              {user?.role}
            </span>
          </div>

        </div>

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;