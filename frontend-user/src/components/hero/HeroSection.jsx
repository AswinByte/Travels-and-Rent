import SearchTrip from "../search/SearchTrip";

const HeroSection = () => {
  return (
    <section
      style={{
        height: "600px",
        background:
          "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1
  style={{
    color: "#fff",
    fontSize: "60px",
    fontWeight: "700",
    marginBottom: "20px",
    textAlign: "center",
  }}
>
  Find Your Perfect Journey
</h1>

<p
  style={{
    color: "#fff",
    fontSize: "20px",
    marginBottom: "40px",
    textAlign: "center",
  }}
>
  Book Travel Vehicles, Rentals & Tour Packages
</p>
      <SearchTrip />
    </section>
  );
};

export default HeroSection;