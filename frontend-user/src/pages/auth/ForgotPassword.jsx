import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const handleSubmit = async () => {
    try {
      if (!email) {
        alert("Enter Email");
        return;
      }

      const data =
        await forgotPassword({
          email,
        });

      alert(data.message);

      navigate("/reset-password");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to send OTP"
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
          }}
        >
          Forgot Password
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748B",
            marginBottom: "20px",
          }}
        >
          Enter your registered email
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

        <button
          onClick={handleSubmit}
          style={btnStyle}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #CBD5E1",
  marginBottom: "15px",
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

export default ForgotPassword;