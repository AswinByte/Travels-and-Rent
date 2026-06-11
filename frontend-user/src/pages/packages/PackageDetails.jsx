import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPackageById } from "../../services/packageService";

const PackageDetails = () => {
  const { id } = useParams();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await getPackageById(id);
        setPkg(data);
      } catch (error) {
        console.log("Package Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          fontSize: "24px",
        }}
      >
        Loading Package...
      </div>
    );
  }

  if (!pkg) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          fontSize: "24px",
        }}
      >
        Package Not Found
      </div>
    );
  }

  return (
    <section
  style={{
    background: "#F1F5F9",
    minHeight: "100vh",
    paddingBottom: "60px",
  }}
>
  {/* Hero Image */}
  <div
    style={{
      height: "500px",
      overflow: "hidden",
    }}
  >
    <img
  src={pkg.image}
  alt={pkg.title}
  style={{
    width: "100%",
    height: "500px",
    objectFit: "cover",
  }}
/>
  </div>

  <div
    style={{
      maxWidth: "1300px",
      margin: "40px auto",
      padding: "0 20px",
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "30px",
    }}
  >
    {/* Left Side */}
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "35px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "15px",
          color: "#0F172A",
        }}
      >
        {pkg.title}
      </h1>

      <p
        style={{
          color: "#64748B",
          fontSize: "18px",
          marginBottom: "20px",
        }}
      >
        📍 {pkg.destination}
      </p>

      <p
        style={{
          lineHeight: "1.8",
          color: "#475569",
          marginBottom: "30px",
        }}
      >
        {pkg.description}
      </p>

      <h2>Included Services</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "10px",
          marginBottom: "35px",
        }}
      >
        {pkg.includedServices?.map(
          (service, index) => (
            <div
              key={index}
              style={{
                background: "#EFF6FF",
                padding: "12px",
                borderRadius: "10px",
              }}
            >
              ✅ {service}
            </div>
          )
        )}
      </div>

      <h2>Tour Itinerary</h2>

      {pkg.itinerary?.map(
        (item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#2563EB",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </div>

            <div>{item}</div>
          </div>
        )
      )}
    </div>

    {/* Right Side */}
    <div>
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          position: "sticky",
          top: "100px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: "#16A34A",
            fontSize: "42px",
            marginBottom: "20px",
          }}
        >
          ₹{pkg.price}
        </h2>

        <p
          style={{
            marginBottom: "15px",
          }}
        >
          ⏱ Duration: {pkg.duration}
        </p>

        <p
          style={{
            marginBottom: "25px",
          }}
        >
          👥 Available Seats: {pkg.availableSeats}
        </p>

        <Link
          to={`/package-booking/${pkg._id}`}
          style={{
            display: "block",
            textAlign: "center",
            background: "#2563EB",
            color: "#fff",
            textDecoration: "none",
            padding: "15px",
            borderRadius: "10px",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          Book Now
        </Link>
      </div>
    </div>
  </div>
</section>
  );
};

export default PackageDetails;