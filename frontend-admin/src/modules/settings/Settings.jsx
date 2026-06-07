import { useState } from "react";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import PaymentSettings from "./PaymentSettings";

const Settings = () => {
  const [activeTab, setActiveTab] =
    useState("profile");

  const tabStyle = (tab) => ({
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background:
      activeTab === tab
        ? "#2563EB"
        : "#E2E8F0",
    color:
      activeTab === tab
        ? "#fff"
        : "#000",
    fontWeight: "600",
  });

  return (
    <div>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "20px",
        }}
      >
        Settings
      </h1>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() =>
            setActiveTab("profile")
          }
          style={tabStyle("profile")}
        >
          Profile
        </button>

        <button
          onClick={() =>
            setActiveTab("security")
          }
          style={tabStyle("security")}
        >
          Security
        </button>

        <button
          onClick={() =>
            setActiveTab("payment")
          }
          style={tabStyle("payment")}
        >
          Payment
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "profile" && (
          <ProfileSettings />
        )}

        {activeTab === "security" && (
          <SecuritySettings />
        )}

        {activeTab === "payment" && (
          <PaymentSettings />
        )}
      </div>
    </div>
  );
};

export default Settings;