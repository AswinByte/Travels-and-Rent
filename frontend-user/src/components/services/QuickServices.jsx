const services = [
  {
    icon: "🚗",
    title: "Rent Vehicle",
    desc: "Self drive rentals for your personal or business trips.",
  },
  {
    icon: "🚌",
    title: "Travel Booking",
    desc: "Book premium vehicles with experienced drivers.",
  },
  {
    icon: "🏖️",
    title: "Tour Packages",
    desc: "Explore curated destinations with family and friends.",
  },
  {
    icon: "📖",
    title: "My Bookings",
    desc: "Easily track, manage, or modify your active bookings.",
  },
];

const QuickServices = () => {
  return (
    <section
      style={{
        padding: "80px 8%",
        background: "#F8FAFC",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "42px",
          fontWeight: "700",
          color: "#0F172A",
          marginBottom: "50px",
        }}
      >
        Our Services
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "30px",
        }}
      >
        {services.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              {item.icon}
            </div>

            <h3
              style={{
                color: "#0F172A",
                marginBottom: "10px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#64748B",
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickServices;