import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
createRentalBooking,
} from "../../services/bookingService";

import {
getSettings,
} from "../../services/settingsService";

import {
uploadPaymentScreenshot,
} from "../../services/paymentService";

const BookingPage = () => {
const { id } = useParams();

const [settings, setSettings] =
useState(null);

const [bookingId, setBookingId] =
useState(null);

const [screenshot, setScreenshot] =
useState(null);

const [formData, setFormData] =
useState({
customerName: "",
phone: "",
pickupLocation: "",
dropLocation: "",
pickupDate: "",
returnDate: "",
notes: "",
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

try {

const bookingData =
new FormData();

bookingData.append(
"vehicleId",
id
);

bookingData.append(
"phone",
formData.phone
);

bookingData.append(
"pickupLocation",
formData.pickupLocation
);

bookingData.append(
"dropLocation",
formData.dropLocation
);

bookingData.append(
"notes",
formData.notes
);

bookingData.append(
"pickupDate",
formData.pickupDate
);

bookingData.append(
"returnDate",
formData.returnDate
);

bookingData.append(
"screenshot",
screenshot
);


  const data =
    await createRentalBooking(
      bookingData
    );

  setBookingId(
    data.booking._id
  );

  alert(
    "Booking Created Successfully"
  );

} catch (error) {

  console.log(error);

  alert(
    error.response?.data
      ?.message ||
      "Booking Failed"
  );

}

};

const handleUploadScreenshot =
async () => {


  try {

    if (!screenshot) {
      return alert(
        "Please upload payment screenshot first"
      );
    }

    const uploadData =
      new FormData();

    uploadData.append(
      "screenshot",
      screenshot
    );

    await uploadPaymentScreenshot(
      bookingId,
      uploadData
    );

    alert(
      "Screenshot Uploaded Successfully"
    );

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data
        ?.message ||
        "Upload Failed"
    );

  }
};


useEffect(() => {

const fetchSettings =
  async () => {

    try {

      const data =
        await getSettings();

      setSettings(data);

    } catch (error) {

      console.log(error);

    }
  };

fetchSettings();


}, []);

return (
<div
style={{
maxWidth: "700px",
margin: "50px auto",
padding: "30px",
background: "#fff",
borderRadius: "15px",
boxShadow:
"0 5px 20px rgba(0,0,0,0.1)",
}}
>
<h1
  style={{
    textAlign: "center",
    marginBottom: "25px",
  }}
>
  Vehicle Booking
</h1>

<form onSubmit={handleSubmit}>
  <input
    type="text"
    name="customerName"
    placeholder="Customer Name"
    value={formData.customerName}
    onChange={handleChange}
    required
    style={inputStyle}
  />

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
    value={formData.pickupLocation}
    onChange={handleChange}
    required
    style={inputStyle}
  />

  <input
    type="text"
    name="dropLocation"
    placeholder="Drop Location"
    value={formData.dropLocation}
    onChange={handleChange}
    required
    style={inputStyle}
  />

  <label>Pickup Date</label>

  <input
    type="date"
    name="pickupDate"
    value={formData.pickupDate}
    onChange={handleChange}
    required
    style={inputStyle}
  />

  <label>Return Date</label>

  <input
    type="date"
    name="returnDate"
    value={formData.returnDate}
    onChange={handleChange}
    required
    style={inputStyle}
  />

  <textarea
    name="notes"
    placeholder="Special Notes"
    value={formData.notes}
    onChange={handleChange}
    rows="4"
    style={inputStyle}
  />

  <hr
    style={{
      margin: "25px 0",
    }}
  />

  <h2>Payment Details</h2>

  <p>
    <strong>UPI ID:</strong>{" "}
    {settings?.upiId}
  </p>

  <p>
    <strong>Account Name:</strong>{" "}
    {settings?.accountName}
  </p>

  <p>
    <strong>Account Number:</strong>{" "}
    {settings?.accountNumber}
  </p>

  <p>
    <strong>IFSC Code:</strong>{" "}
    {settings?.ifscCode}
  </p>

  {settings?.qrCode && (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <img
        src={`http://localhost:5000/${settings.qrCode}`}
        alt="QR Code"
        style={{
          width: "250px",
          borderRadius: "10px",
        }}
      />
    </div>
  )}

  <hr
    style={{
      margin: "25px 0",
    }}
  />

  <h2>
    Upload Payment Screenshot
  </h2>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setScreenshot(
        e.target.files[0]
      )
    }
    style={{
      marginBottom: "20px",
    }}
  />

  <hr
    style={{
      margin: "25px 0",
    }}
  />

  <button
    type="submit"
    style={buttonStyle}
  >
    BOOK VEHICLE
  </button>
</form>

</div>


);
};

const inputStyle = {
width: "100%",
padding: "12px",
marginBottom: "15px",
border:
"1px solid #CBD5E1",
borderRadius: "8px",
};

const buttonStyle = {
width: "100%",
padding: "14px",
background: "#2563EB",
color: "#fff",
border: "none",
borderRadius: "10px",
cursor: "pointer",
};

export default BookingPage;
