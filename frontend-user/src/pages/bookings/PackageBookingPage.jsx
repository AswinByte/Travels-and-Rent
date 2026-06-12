import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPackageBooking } from "../../services/bookingService";
import { getSettings } from "../../services/settingsService";

const PackageBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    returnDate: "",
    notes: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!screenshot) {
      return alert("Please upload a payment screenshot first");
    }

    setLoading(true);
    try {
      const bookingData = new FormData();
      bookingData.append("packageId", id);
      bookingData.append("phone", formData.phone);
      bookingData.append("pickupLocation", formData.pickupLocation);
      bookingData.append("dropLocation", formData.dropLocation);
      bookingData.append("notes", formData.notes);
      bookingData.append("pickupDate", formData.pickupDate);
      bookingData.append("returnDate", formData.returnDate);
      bookingData.append("screenshot", screenshot);

      await createPackageBooking(bookingData);
      alert("Package Booking Created Successfully");
      navigate("/my-bookings");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Package Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    style={{
      background: "#F8FAFC",
      minHeight: "100vh",
      padding: "40px 20px",
    }}
  >
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          height: "300px",
          borderRadius: "20px",
          overflow: "hidden",
          background:
            "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Book Your Journey
        </h1>

        <p
          style={{
            fontSize: "18px",
            opacity: 0.9,
          }}
        >
          Complete your booking in a few simple steps
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "30px",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "35px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              color: "#0F172A",
            }}
          >
            Traveler Details
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="pickupLocation"
              placeholder="Pickup Location"
              value={
                formData.pickupLocation
              }
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="dropLocation"
              placeholder="Drop Location"
              value={
                formData.dropLocation
              }
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label>
              Pickup Date
            </label>

            <input
              type="date"
              name="pickupDate"
              value={
                formData.pickupDate
              }
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label>
              Return Date
            </label>

            <input
              type="date"
              name="returnDate"
              value={
                formData.returnDate
              }
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <textarea
              name="notes"
              placeholder="Any special requirement?"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              style={inputStyle}
            />

            {/* Premium Payment Section */}
<div
  style={{
    marginTop: "35px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow:
      "0 15px 35px rgba(37,99,235,0.15)",
    border: "1px solid #DBEAFE",
  }}
>
  {/* Header */}
  <div
    style={{
      background:
        "linear-gradient(135deg,#2563EB,#1D4ED8)",
      color: "#fff",
      padding: "25px",
    }}
  >
    <h2
      style={{
        margin: 0,
        fontSize: "28px",
      }}
    >
      💳 Secure Payment
    </h2>

    <p
      style={{
        marginTop: "8px",
        opacity: 0.9,
      }}
    >
      Complete payment and upload the screenshot below
    </p>
  </div>

  {/* Content */}
  <div
    style={{
      background: "#fff",
      padding: "30px",
      display: "grid",
      gridTemplateColumns:
        "1fr 1fr",
      gap: "30px",
      alignItems: "center",
    }}
  >
    {/* QR Code */}
    <div
      style={{
        textAlign: "center",
      }}
    >
      {settings?.qrCode && (
        <div
          style={{
            background: "#F8FAFC",
            padding: "20px",
            borderRadius: "20px",
            border:
              "1px solid #E2E8F0",
            display: "inline-block",
          }}
        >
          <img
            src={settings.qrCode}
            alt="QR Code"
            style={{
              width: "280px",
              display: "block",
            }}
          />
        </div>
      )}

      <p
        style={{
          marginTop: "15px",
          color: "#64748B",
          fontWeight: "600",
        }}
      >
        Scan with Google Pay,
        PhonePe or Paytm
      </p>
    </div>

    {/* Bank Details */}
    <div>
      <div
        style={{
          background: "#F8FAFC",
          padding: "18px",
          borderRadius: "12px",
          marginBottom: "15px",
        }}
      >
        <small
          style={{
            color: "#64748B",
          }}
        >
          UPI ID
        </small>

        <h3
          style={{
            margin: "5px 0",
            color: "#0F172A",
          }}
        >
          {settings?.upiId}
        </h3>
      </div>

      <div
        style={{
          background: "#F8FAFC",
          padding: "18px",
          borderRadius: "12px",
          marginBottom: "15px",
        }}
      >
        <small
          style={{
            color: "#64748B",
          }}
        >
          Account Name
        </small>

        <h3
          style={{
            margin: "5px 0",
            color: "#0F172A",
          }}
        >
          {settings?.accountName}
        </h3>
      </div>

      <div
        style={{
          background: "#F8FAFC",
          padding: "18px",
          borderRadius: "12px",
          marginBottom: "15px",
        }}
      >
        <small
          style={{
            color: "#64748B",
          }}
        >
          Account Number
        </small>

        <h3
          style={{
            margin: "5px 0",
            color: "#0F172A",
          }}
        >
          {settings?.accountNumber}
        </h3>
      </div>

      <div
        style={{
          background: "#F8FAFC",
          padding: "18px",
          borderRadius: "12px",
        }}
      >
        <small
          style={{
            color: "#64748B",
          }}
        >
          IFSC Code
        </small>

        <h3
          style={{
            margin: "5px 0",
            color: "#0F172A",
          }}
        >
          {settings?.ifscCode}
        </h3>
      </div>
    </div>
  </div>
</div>
            {/* Upload Screenshot */}
            <div
              style={{
                marginTop: "30px",
              }}
            >
              <h3>
                Upload Payment Screenshot
              </h3>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setScreenshot(
                    e.target.files[0]
                  )
                }
              />
            </div>

            <button
              type="submit"
               type="submit"
  disabled={loading}
  
              style={{
                width: "100%",
                marginTop: "30px",
                padding: "18px",
                background:
                  "linear-gradient(135deg,#2563EB,#1D4ED8)",
                color: "#fff",
                border: "none",
                borderRadius:
                  "12px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Confirm Booking
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "30px",
            height: "fit-content",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.08)",
            position: "sticky",
            top: "100px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Booking Summary
          </h2>

          <div
            style={{
              background:
                "#EFF6FF",
              padding: "15px",
              borderRadius:
                "12px",
            }}
          >
            <p>
              <strong>
                Booking ID
              </strong>
            </p>

            <p
              style={{
                wordBreak:
                  "break-all",
              }}
            >
              {id}
            </p>
          </div>

          <hr
            style={{
              margin: "20px 0",
            }}
          />

          <p>
            📍 Pickup:
          </p>

          <strong>
            {formData.pickupLocation ||
              "-"}
          </strong>

          <br />
          <br />

          <p>
            📍 Drop:
          </p>

          <strong>
            {formData.dropLocation ||
              "-"}
          </strong>

          <br />
          <br />

          <p>
            📅 Pickup Date:
          </p>

          <strong>
            {formData.pickupDate ||
              "-"}
          </strong>

          <br />
          <br />

          <p>
            📅 Return Date:
          </p>

          <strong>
            {formData.returnDate ||
              "-"}
          </strong>

          <br />
          <br />

          <p>
            📞 Phone:
          </p>

          <strong>
            {formData.phone || "-"}
          </strong>
        </div>
      </div>
    </div>
  </div>
);
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  border: "1px solid #CBD5E1",
  borderRadius: "10px",
  fontSize: "15px",
  outline: "none",
};

export default PackageBookingPage;
