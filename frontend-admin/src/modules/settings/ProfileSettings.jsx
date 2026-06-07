import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

const ProfileSettings = () => {

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

  useEffect(() => {

    const fetchProfile =
      async () => {
        try {

          const data =
            await getProfile();

          setFormData({
            name:
              data.name || "",
            email:
              data.email || "",
            phone:
              data.phone || "",
            address:
              data.address || "",
          });

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchProfile();

  }, []);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updateProfile(
          formData
        );

        alert(
          "Profile Updated Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to Update Profile"
        );

      }
    };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border:
      "1px solid #CBD5E1",
    borderRadius: "10px",
    fontSize: "14px",
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

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
        Profile Settings
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          <div>
            <label>
              Name
            </label>

            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />
          </div>

          <div>
            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />
          </div>

          <div>
            <label>
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />
          </div>

          <div>
            <label>
              Address
            </label>

            <textarea
              name="address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              style={{
                ...inputStyle,
                minHeight:
                  "100px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "180px",
              background:
                "#2563EB",
              color: "#fff",
              border: "none",
              padding:
                "12px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;