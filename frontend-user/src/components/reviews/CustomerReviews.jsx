const reviews = [
  {
    name: "Aswin",
    review:
      "Excellent service. Vehicle was clean and driver was professional.",
  },
  {
    name: "Rahul",
    review:
      "Very smooth booking process and affordable pricing.",
  },
  {
    name: "Priya",
    review:
      "Booked Ooty package. Entire trip was well organized.",
  },
];

const CustomerReviews = () => {
  return (
    <section
      style={{
        padding: "100px 8%",
        background: "#F8FAFC",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "42px",
          fontWeight: "700",
          color: "#0F172A",
          marginBottom: "15px",
        }}
      >
        What Our Customers Say
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#64748B",
          marginBottom: "60px",
          fontSize: "18px",
        }}
      >
        Trusted by hundreds of travelers across India
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "24px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
              transition: "0.3s",
              border: "1px solid #E2E8F0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#2563EB,#3B82F6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "22px",
                }}
              >
                {review.name.charAt(0)}
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    color: "#0F172A",
                  }}
                >
                  {review.name}
                </h3>

                <div
                  style={{
                    color: "#F59E0B",
                    marginTop: "5px",
                  }}
                >
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
                fontSize: "15px",
              }}
            >
              "{review.review}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;