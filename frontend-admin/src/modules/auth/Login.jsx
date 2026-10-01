import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Car, MapPin } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log(data);

      if (data.role !== "admin") {
        alert("Admin access only");
        return;
      }

      login(data.token);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* =================================
          ANIMATED BACKGROUND
      ================================= */}

      <div className="travel-background">

        {/* Sun */}
        <div className="sun"></div>

        {/* Clouds */}
        <div className="cloud cloud-one"></div>
        <div className="cloud cloud-two"></div>
        <div className="cloud cloud-three"></div>

        {/* Floating particles */}
        <span className="particle particle-1"></span>
        <span className="particle particle-2"></span>
        <span className="particle particle-3"></span>
        <span className="particle particle-4"></span>
        <span className="particle particle-5"></span>
        <span className="particle particle-6"></span>

        {/* Route line */}
        <div className="route-line">
          <MapPin className="route-start" size={25} />
          <div className="route-dashed"></div>
          <MapPin className="route-end" size={25} />
        </div>

        {/* Road */}
        <div className="road">
          <div className="road-line road-line-1"></div>
          <div className="road-line road-line-2"></div>
          <div className="road-line road-line-3"></div>
        </div>

        {/* Moving car */}
        <div className="moving-car">
          <Car size={55} />
        </div>

      </div>


      {/* =================================
          LOGIN CARD
      ================================= */}

      <form
        className="login-form"
        onSubmit={handleLogin}
      >

        {/* Brand */}
        <div className="login-brand">

          <div className="brand-icon">
            <Car size={27} />
          </div>

          <div className="brand-name">
            AR TRAVELS
          </div>

          <div className="brand-subtitle">
            TRAVELS & RENTALS
          </div>

        </div>


        {/* Heading */}
        <div className="login-heading">
          <h2>Admin Login</h2>

          <p>
            Manage your travel & rental business
          </p>
        </div>


        {/* Email */}
        <div className="input-group">

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>


        {/* Password */}
        <div className="input-group">

          <label>Password</label>

          <div className="password-wrapper">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="password-eye"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>

          </div>

        </div>


        {/* Login */}
        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login to Dashboard"}
        </button>


        {/* Footer */}
        <div className="login-footer">
          © 2026 AR Travels & Rentals
        </div>

      </form>

    </div>
  );
};

export default Login;