import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleResetPassword = async () => {
    try {
      if (
        !email ||
        !otp ||
        !newPassword ||
        !confirmPassword
      ) {
        alert("Fill all fields");
        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      const data =
        await resetPassword({
          email,
          otp,
          newPassword,
        });

      alert(data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Password Reset Failed"
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
          width: "420px",
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
            marginBottom: "20px",
          }}
        >
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={
            handleResetPassword
          }
          style={btnStyle}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #CBD5E1",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  marginTop: "10px",
  cursor: "pointer",
};

export default ResetPassword;