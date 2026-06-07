import { useState } from "react";

const PaymentSettings = () => {
  const [formData, setFormData] = useState({
    upiId: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert(
      "Payment Settings Saved"
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
        Payment Settings
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          <div>
            <label>UPI ID</label>

            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              style={inputStyle}
              placeholder="example@upi"
            />
          </div>

          <div>
            <label>
              Account Holder Name
            </label>

            <input
              type="text"
              name="accountHolderName"
              value={
                formData.accountHolderName
              }
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>
              Account Number
            </label>

            <input
              type="text"
              name="accountNumber"
              value={
                formData.accountNumber
              }
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>
              IFSC Code
            </label>

            <input
              type="text"
              name="ifscCode"
              value={
                formData.ifscCode
              }
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>
              QR Code Image
            </label>

            <input
              type="file"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            style={{
              width: "200px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentSettings;