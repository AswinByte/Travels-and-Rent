import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";

import {
  getPackages,
} from "../../services/packageService";

const PopularPackages = () => {
  const [packages, setPackages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchPackages =
      async () => {
        try {
          const data =
            await getPackages();

          console.log(
            "Popular Packages:",
            data
          );

          setPackages(
            Array.isArray(data)
              ? data
              : data.packages || []
          );

        } catch (error) {

          console.log(
            "Package Error:",
            error
          );

        } finally {

          setLoading(false);

        }
      };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <section
        style={{
          padding: "80px 8%",
          textAlign: "center",
        }}
      >
        <h2>
          Loading Packages...
        </h2>
      </section>
    );
  }

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
    fontSize: "48px",
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
    fontSize: "18px",
  }}
>
  Explore our most booked tour packages
</p>

      <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(450px,1fr))",
    gap: "30px",
  }}
>
  {packages.map((pkg) => (
    <PackageCard
      key={pkg._id}
      pkg={pkg}
    />
  ))}
</div>

      {packages.length === 0 && (
        <h3
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#64748B",
          }}
        >
          No Packages Found
        </h3>
      )}
    </section>
  );
};

export default PopularPackages;