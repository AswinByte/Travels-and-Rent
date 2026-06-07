import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getPackageById,
} from "../../services/packageService";

const PackageDetails = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [packageData,
    setPackageData] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    const fetchPackage =
      async () => {
        try {
          const data =
            await getPackageById(
              id
            );

          setPackageData(
            data
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchPackage();
  }, [id]);

  if (loading) {
    return (
      <h2>
        Loading Package...
      </h2>
    );
  }

  if (!packageData) {
    return (
      <h2>
        Package Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
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
          Package Details
        </h1>

        <button
          onClick={() =>
            navigate(
              "/packages"
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
          overflow: "hidden",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.08)",
        }}
      >
        <img
          src={
            packageData.image ||
            "https://via.placeholder.com/1200x400"
          }
          alt={
            packageData.title
          }
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            padding: "30px",
          }}
        >
          {/* Top Info Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <InfoCard
              title="Destination"
              value={
                packageData.destination
              }
            />

            <InfoCard
              title="Duration"
              value={
                packageData.duration
              }
            />

            <InfoCard
              title="Price"
              value={`₹${packageData.price}`}
            />

            <InfoCard
              title="Available Seats"
              value={
                packageData.availableSeats
              }
            />
          </div>

          {/* Package Title */}

          <div
            style={{
              marginBottom: "25px",
            }}
          >
            <h1
              style={{
                fontSize: "36px",
                marginBottom: "10px",
              }}
            >
              {packageData.title}
            </h1>

            <span
              style={{
                background:
                  packageData.status ===
                  "active"
                    ? "#DCFCE7"
                    : "#FEE2E2",

                color:
                  packageData.status ===
                  "active"
                    ? "#166534"
                    : "#991B1B",

                padding:
                  "6px 14px",

                borderRadius:
                  "999px",

                fontSize:
                  "13px",

                fontWeight:
                  "600",
              }}
            >
              {packageData.status}
            </span>
          </div>

          {/* Description */}

          <div
            style={{
              background:
                "#F8FAFC",
              padding: "24px",
              borderRadius:
                "16px",
              marginBottom:
                "30px",
            }}
          >
            <h3
              style={{
                marginBottom:
                  "15px",
              }}
            >
              Package Description
            </h3>

            <p
              style={{
                lineHeight: "1.9",
                color: "#475569",
              }}
            >
              {
                packageData.description
              }
            </p>
          </div>

          {/* Services & Itinerary */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(350px,1fr))",
              gap: "24px",
            }}
          >
            <div
              style={{
                background:
                  "#F8FAFC",
                padding: "24px",
                borderRadius:
                  "16px",
              }}
            >
              <h3
                style={{
                  marginBottom:
                    "18px",
                }}
              >
                Included Services
              </h3>

              <ul
                style={{
                  paddingLeft:
                    "20px",
                  lineHeight:
                    "2",
                }}
              >
                {packageData.includedServices?.map(
                  (
                    service,
                    index
                  ) => (
                    <li
                      key={
                        index
                      }
                    >
                      {service}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div
              style={{
                background:
                  "#F8FAFC",
                padding: "24px",
                borderRadius:
                  "16px",
              }}
            >
              <h3
                style={{
                  marginBottom:
                    "18px",
                }}
              >
                Tour Itinerary
              </h3>

              <ul
                style={{
                  paddingLeft:
                    "20px",
                  lineHeight:
                    "2",
                }}
              >
                {packageData.itinerary?.map(
                  (
                    item,
                    index
                  ) => (
                    <li
                      key={
                        index
                      }
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Created At */}

          <div
            style={{
              marginTop: "30px",
              background:
                "#F8FAFC",
              padding: "20px",
              borderRadius:
                "16px",
            }}
          >
            <strong>
              Created At
            </strong>

            <div
              style={{
                marginTop: "8px",
                color:
                  "#64748B",
              }}
            >
              {new Date(
                packageData.createdAt
              ).toLocaleString()}
            </div>
          </div>
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
      background: "#F8FAFC",
      padding: "18px",
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
      }}
    >
      {value}
    </h3>
  </div>
);

export default PackageDetails;