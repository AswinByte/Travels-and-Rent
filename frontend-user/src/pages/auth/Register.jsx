import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Register = () => {

  const navigate = useNavigate();

const [name, setName] =
  useState("");

const [email, setEmail] =
  useState("");

const [password, setPassword] =
  useState("");

const [confirmPassword, setConfirmPassword] =
  useState("");
const handleRegister = async () => {
  try {

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Fill all fields");
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    const data =
      await registerUser({
        name,
        email,
        password,
      });

    localStorage.setItem(
      "token",
      data.token
    );

    alert(
      "Registration Successful"
    );

    navigate("/");

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data
        ?.message ||
      "Registration Failed"
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
          width: "450px",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Register</h2>

        <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
  style={inputStyle}
/>
        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  style={inputStyle}
/>
       <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
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
/><button
  onClick={handleRegister}
  style={btnStyle}
>
  Register
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
};

export default Register;