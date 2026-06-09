import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert(
          "Please fill all fields"
        );
        return;
      }

      const data = await loginUser({
  email,
  password,
});

login(data.token, data);

if (data.role === "admin") {
  window.location.href =
    "http://localhost:5173";
} else {
  navigate("/");
}

// Save JWT
login(
  data.token,
  {
    _id: data._id,
    name: data.name,
    email: data.email,
    role: data.role,
  }
);
// Save User Info

alert(
  "Login Successful"
);

navigate("/");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F8FAFC",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#0F172A",
          }}
        >
          Welcome Back
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748B",
            marginBottom: "25px",
          }}
        >
          Login to your account
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <div
          style={{
            textAlign: "right",
            marginBottom: "15px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              color: "#2563EB",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          style={btnStyle}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#64748B",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#2563EB",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #CBD5E1",
  outline: "none",
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  marginTop: "10px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

export default Login;