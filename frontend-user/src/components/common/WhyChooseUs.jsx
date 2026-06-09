const features = [
  {
    icon: "✅",
    title: "Verified Drivers",
    description:
      "Professional and verified drivers for safe travel.",
  },
  {
    icon: "💰",
    title: "Affordable Pricing",
    description:
      "Best prices with no hidden charges.",
  },
  {
    icon: "🕒",
    title: "24/7 Support",
    description:
      "Customer support available anytime.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    description:
      "Safe and secure payment processing.",
  },
];

const WhyChooseUs = () => {
  return (
    <section
      style={{
        padding: "90px 8%",
        background: "#F8FAFC",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "42px",
          color: "#0F172A",
          marginBottom: "15px",
        }}
      >
        Why Choose Us
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#64748B",
          marginBottom: "60px",
        }}
      >
        Trusted travel and rental services across India
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "30px",
        }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.06)",
              border:
                "1px solid #E2E8F0",
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
                lineHeight: "1.7",
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;