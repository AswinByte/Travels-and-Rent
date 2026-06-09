import PackageCard from "./PackageCard";

const packages = [
  {
    title: "Ooty Tour",
    duration: "3 Days / 2 Nights",
    price: "8,999",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    title: "Kodaikanal Tour",
    duration: "2 Days / 1 Night",
    price: "6,499",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    title: "Kerala Tour",
    duration: "5 Days / 4 Nights",
    price: "14,999",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86",
  },
  {
    title: "Goa Tour",
    duration: "4 Days / 3 Nights",
    price: "11,999",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
];

const PopularPackages = () => {
  return (
    <section
      style={{
        padding: "80px 8%",
        background: "#fff",
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
        Popular Packages
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#64748B",
          marginBottom: "50px",
        }}
      >
        Explore our most booked tour packages
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "30px",
        }}
      >
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            pkg={pkg}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularPackages;