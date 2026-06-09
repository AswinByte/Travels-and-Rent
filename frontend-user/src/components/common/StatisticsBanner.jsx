const StatisticsBanner = () => {
  return (
    <section
      style={{
        background: "#2563EB",
        padding: "70px 8%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          textAlign: "center",
          gap: "30px",
        }}
      >
        <div>
          <h2 style={{ color: "#fff" }}>500+</h2>
          <p style={{ color: "#fff" }}>
            Happy Customers
          </p>
        </div>

        <div>
          <h2 style={{ color: "#fff" }}>50+</h2>
          <p style={{ color: "#fff" }}>
            Vehicles
          </p>
        </div>

        <div>
          <h2 style={{ color: "#fff" }}>100+</h2>
          <p style={{ color: "#fff" }}>
            Trips Completed
          </p>
        </div>

        <div>
          <h2 style={{ color: "#fff" }}>25+</h2>
          <p style={{ color: "#fff" }}>
            Tour Packages
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatisticsBanner;