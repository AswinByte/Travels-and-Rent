import { useState, useEffect } from "react";
import { getSettings, updateSettings, uploadQrCode } from "../../services/profileService";

const PaymentSettings = () => {
  const [formData, setFormData] = useState({
    upiId: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [qrCode, setQrCode] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Defined the fetch function first
  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setFormData({
        upiId: data?.upiId || "",
        accountHolderName: data?.accountHolderName || "",
        accountNumber: data?.accountNumber || "",
        ifscCode: data?.ifscCode || "",
      });
    } catch (error) {
      console.error("Error pulling payment settings:", error);
    }
  };

  // 2. FIXED: Added the missing empty dependency array [] here to kill the infinite loop
  useEffect(() => {
  const load = async () => {
    await fetchSettings();
  };
  load();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrCode(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateSettings(formData);

      if (qrCode) {
        await uploadQrCode(qrCode);
      }

      alert("🎉 Payment settings updated successfully!");
      fetchSettings();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Settings update failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerSectionStyle}>
        <h2 style={titleStyle}>Payment Gateway Settings</h2>
        <p style={subtitleStyle}>Configure inbound business channels, bank routing nodes, and client-facing billing profiles.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={layoutGridStyle}>
          
          {/* Left Column: Bank Form */}
          <div style={cardFormStyle}>
            <h3 style={sectionTitleStyle}>🏦 Direct Bank Settlement Node</h3>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Beneficiary Account Holder Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                style={inputStyle}
                placeholder="John Doe Enterprises"
                required
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Settlement Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                style={inputStyle}
                placeholder="0000 0000 0000"
                required
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Bank Routing IFSC Clearing Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                style={inputStyle}
                placeholder="SBIN0001234"
                required
              />
            </div>
          </div>

          {/* Right Column: UPI & QR Code */}
          <div style={cardFormStyle}>
            <h3 style={sectionTitleStyle}>⚡ Unified Payments Interface (UPI)</h3>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Primary Business UPI ID alias</label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                style={inputStyle}
                placeholder="merchant@bank"
                required
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Client-Facing Gateway QR Asset</label>
              <div style={fileUploadContainerStyle}>
                <input
                  type="file"
                  id="qr-upload-node"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={hiddenFileInputStyle}
                />
                <label htmlFor="qr-upload-node" style={fileLabelButtonStyle}>
                  {qrCode ? "🔄 Replace QR Graphic" : "📤 Select Asset Matrix Image"}
                </label>
                
                {previewUrl ? (
                  <div style={previewFrameStyle}>
                    <img src={previewUrl} alt="UPI QR Preview" style={previewImageStyle} />
                    <span style={previewTagStyle}>Live Upload Stage Preview</span>
                  </div>
                ) : (
                  <div style={emptyPreviewStyle}>No payment vector image staged</div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div style={actionDeckStyle}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={isSubmitting ? disabledButtonStyle : activeButtonStyle}
          >
            {isSubmitting ? "Syncing Modules..." : "Save Parameters"}
          </button>
        </div>
      </form>
    </div>
  );
};

// --- MODERN UI STYLES ---
const containerStyle = {
  maxWidth: "1100px",
  margin: "20px auto",
  fontFamily: "system-ui, -apple-system, sans-serif"
};

const headerSectionStyle = {
  marginBottom: "32px"
};

const titleStyle = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 6px 0"
};

const subtitleStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#64748b",
  lineHeight: "1.5"
};

const layoutGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
  gap: "32px",
  marginBottom: "32px"
};

const cardFormStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "20px",
  padding: "32px",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.03)"
};

const sectionTitleStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 24px 0",
  borderBottom: "1px solid #f1f5f9",
  paddingBottom: "12px"
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "20px"
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "500",
  color: "#475569"
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 16px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  fontSize: "14px",
  color: "#1e293b",
  outline: "none",
  background: "#f8fafc",
  transition: "border-color 0.15s ease"
};

const fileUploadContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "center",
  padding: "24px",
  background: "#f8fafc",
  borderRadius: "12px",
  border: "2px dashed #e2e8f0"
};

const hiddenFileInputStyle = {
  display: "none"
};

const fileLabelButtonStyle = {
  padding: "10px 16px",
  background: "#ffffff",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#334155",
  cursor: "pointer",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
};

const previewFrameStyle = {
  position: "relative",
  background: "#fff",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  textAlign: "center"
};

const previewImageStyle = {
  maxWidth: "140px",
  maxHeight: "140px",
  objectFit: "contain",
  borderRadius: "6px"
};

const previewTagStyle = {
  display: "block",
  fontSize: "10px",
  color: "#94a3b8",
  margin: "6px 0 0 0",
  fontWeight: "500",
  textTransform: "uppercase"
};

const emptyPreviewStyle = {
  fontSize: "13px",
  color: "#94a3b8",
  padding: "40px 0"
};

const actionDeckStyle = {
  display: "flex",
  justifyContent: "flex-end"
};

const activeButtonStyle = {
  padding: "14px 32px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
  transition: "background 0.15s ease"
};

const disabledButtonStyle = {
  ...activeButtonStyle,
  background: "#94a3b8",
  cursor: "not-allowed",
  boxShadow: "none"
};

export default PaymentSettings;