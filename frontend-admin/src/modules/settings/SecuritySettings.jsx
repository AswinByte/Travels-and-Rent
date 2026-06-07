import { useState } from "react";

const SecuritySettings = () => {

  const [formData, setFormData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return alert(
        "Passwords do not match"
      );
    }

    console.log(formData);

    alert(
      "Password Change API Next"
    );
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #CBD5E1",
    borderRadius: "10px",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Security Settings
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          <div>
            <label>
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={
                formData.currentPassword
              }
              onChange={
                handleChange
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={
                formData.newPassword
              }
              onChange={
                handleChange
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={
                formData.confirmPassword
              }
              onChange={
                handleChange
              }
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "220px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettings;