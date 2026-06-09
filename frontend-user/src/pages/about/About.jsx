import { Link } from "react-router-dom";

const About = () => {
  return (
    <div
      style={{
        background: "#F8FAFC",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          height: "450px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "rgba(0,0,0,0.55)",
          }}
        />

        <div
          style={{
            position: "relative",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              marginBottom: "15px",
               color: "#fff",
            }}
          >
            About TravelRent
          </h1>

          <p
            style={{
              fontSize: "22px",
               color: "#fff",
            }}
          >
            Your Trusted Travel Partner
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section
        style={{
          padding: "80px 10%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            color: "#0F172A",
            marginBottom: "25px",
          }}
        >
          Who We Are
        </h2>

        <p
          style={{
            maxWidth: "900px",
            margin: "auto",
            fontSize: "18px",
            lineHeight: "1.9",
            color: "#64748B",
          }}
        >
          TravelRent is a complete travel and vehicle rental
          platform that helps customers rent vehicles, book
          travel services with drivers, and explore exciting
          tour packages. We focus on safety, affordability,
          convenience, and customer satisfaction.
        </p>
      </section>

      {/* Statistics */}
      <section
        style={{
          padding: "0 10% 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
          }}
        >
          {[
            {
              number: "500+",
              title: "Vehicles",
            },
            {
              number: "1000+",
              title: "Customers",
            },
            {
              number: "50+",
              title: "Drivers",
            },
            {
              number: "100+",
              title: "Packages",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "40px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  color: "#2563EB",
                  fontSize: "40px",
                }}
              >
                {item.number}
              </h2>

              <p
                style={{
                  color: "#64748B",
                }}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section
        style={{
          padding: "80px 10%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "50px",
            color: "#0F172A",
          }}
        >
          Our Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px",
          }}
        >
          {[
            {
              icon: "🚗",
              title: "Vehicle Rentals",
              desc: "Rent cars, SUVs, buses and travellers.",
            },
            {
              icon: "🚌",
              title: "Travel Booking",
              desc: "Book vehicles with professional drivers.",
            },
            {
              icon: "🏖️",
              title: "Tour Packages",
              desc: "Explore destinations with packages.",
            },
          ].map((service, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "35px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "50px",
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  marginTop: "15px",
                  color: "#0F172A",
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  color: "#64748B",
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section
        style={{
          padding: "80px 10%",
          background: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "25px",
            color: "#0F172A",
          }}
        >
          Our Mission
        </h2>

        <p
          style={{
            maxWidth: "900px",
            margin: "auto",
            textAlign: "center",
            fontSize: "18px",
            lineHeight: "1.9",
            color: "#64748B",
          }}
        >
          To make travel easy, affordable, and accessible for
          everyone by providing reliable vehicles, experienced
          drivers, and memorable travel experiences.
        </p>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 10%",
        }}
      >
        <div
          style={{
            background: "#2563EB",
            color: "#fff",
            padding: "70px",
            borderRadius: "30px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              marginBottom: "20px",
               color: "#fff",
            }}
          >
            Ready For Your Next Journey?
          </h2>

          <p
            style={{
              marginBottom: "30px",
              fontSize: "18px",
               color: "#fff",
            }}
          >
            Explore vehicles, packages and travel services.
          </p>

          <Link
            to="/rentals"
            style={{
              textDecoration: "none",
              background: "#fff",
              color: "#2563EB",
              padding: "14px 30px",
              borderRadius: "10px",
              fontWeight: "600",
            }}
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;   