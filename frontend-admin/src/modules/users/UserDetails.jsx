import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getUserById,
} from "../../services/userService";

const UserDetails = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [user,
    setUser] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const data =
            await getUserById(
              id
            );

          setUser(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchUser();

  }, [id]);

  if (loading) {
    return (
      <h2>
        Loading User...
      </h2>
    );
  }

  if (!user) {
    return (
      <h2>
        User Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >

        <h1>
          User Details
        </h1>

        <button
          onClick={() =>
            navigate(
              "/users"
            )
          }
          style={{
            background:
              "#2563EB",
            color: "#fff",
            border: "none",
            padding:
              "12px 20px",
            borderRadius:
              "12px",
            cursor:
              "pointer",
          }}
        >
          Back
        </button>

      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.08)",
        }}
      >

        {/* Profile */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
          }}
        >

          <img
            src={
              user.profileImage ||
              "https://ui-avatars.com/api/?name=" +
                user.name
            }
            alt={user.name}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div>

            <h2
              style={{
                margin: 0,
              }}
            >
              {user.name}
            </h2>

            <p
              style={{
                color: "#64748B",
                marginTop: "8px",
              }}
            >
              {user.email}
            </p>

          </div>

        </div>

        {/* Info Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >

          <InfoCard
            title="Phone"
            value={
              user.phone ||
              "Not Provided"
            }
          />

          <InfoCard
            title="Role"
            value={user.role}
          />

          <InfoCard
            title="Status"
            value={user.status}
          />

          <InfoCard
            title="Address"
            value={
              user.address ||
              "Not Provided"
            }
          />

        </div>

        {/* Dates */}

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "20px",
          }}
        >

          <InfoCard
            title="Created At"
            value={new Date(
              user.createdAt
            ).toLocaleString()}
          />

          <InfoCard
            title="Updated At"
            value={new Date(
              user.updatedAt
            ).toLocaleString()}
          />

        </div>

      </div>

    </div>
  );
};

const InfoCard = ({
  title,
  value,
}) => (
  <div
    style={{
      background:
        "#F8FAFC",
      padding: "20px",
      borderRadius: "14px",
    }}
  >

    <p
      style={{
        color: "#64748B",
        marginBottom: "8px",
      }}
    >
      {title}
    </p>

    <h3
      style={{
        margin: 0,
        color: "#0F172A",
      }}
    >
      {value}
    </h3>

  </div>
);

export default UserDetails;