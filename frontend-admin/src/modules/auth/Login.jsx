import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      <form
        className="login-form"
        onSubmit={handleLogin}
      >

        {/* Brand */}
        <div className="login-brand">
          <div className="brand-icon">
            🚗
          </div>
        </div>

        {/* Heading */}
        <h2>Admin Login</h2>

        {/* Email */}
        <div className="input-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>

        {/* Login */}
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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