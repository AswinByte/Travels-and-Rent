import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getPackages,
  deletePackage,
} from "../../services/packageService";

import PackageStatsCard from "./PackageStatsCard";
import PackageTable from "./PackageTable";

const Packages = () => {

  const [packages, setPackages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this package?"
        );

      if (!confirmDelete)
        return;

      try {

        await deletePackage(id);

        setPackages((prev) =>
          prev.filter(
            (pkg) =>
              pkg._id !== id
          )
        );

        alert(
          "Package deleted successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed"
        );

      }
    };

  useEffect(() => {

    const fetchPackages =
      async () => {

        try {

          const data =
            await getPackages();

          setPackages(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchPackages();

  }, []);

  const filteredPackages =
    packages.filter((pkg) =>
      pkg.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      pkg.destination
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalPackages =
    packages.length;

  const activePackages =
    packages.filter(
      (pkg) =>
        pkg.status ===
        "active"
    ).length;

  const inactivePackages =
    packages.filter(
      (pkg) =>
        pkg.status ===
        "inactive"
    ).length;

  const avgPrice =
    packages.length > 0
      ? Math.round(
          packages.reduce(
            (acc, pkg) =>
              acc + pkg.price,
            0
          ) / packages.length
        )
      : 0;

  if (loading) {
    return (
      <h2>
        Loading Packages...
      </h2>
    );
  }

  return (
    <div>

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "34px",
              fontWeight: "700",
              marginBottom: "6px",
            }}
          >
            Package Management
          </h1>

          <p
            style={{
              color: "#64748B",
            }}
          >
            Manage travel packages
          </p>

        </div>

        <Link
          to="/packages/add"
          style={{
            background:
              "#2563EB",
            color: "#fff",
            textDecoration:
              "none",
            padding:
              "12px 20px",
            borderRadius:
              "12px",
            fontWeight:
              "600",
          }}
        >
          + Add Package
        </Link>

      </div>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >

        <PackageStatsCard
          title="Total Packages"
          value={totalPackages}
          color="#3B82F6"
        />

        <PackageStatsCard
          title="Active Packages"
          value={activePackages}
          color="#10B981"
        />

        <PackageStatsCard
          title="Inactive Packages"
          value={inactivePackages}
          color="#EF4444"
        />

        <PackageStatsCard
          title="Average Price"
          value={`₹${avgPrice}`}
          color="#F59E0B"
        />

      </div>

      {/* Search */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "20px",
          marginBottom: "24px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.05)",
        }}
      >


        <input
          type="text"
          placeholder="Search Package or Destination..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        style={{
    minWidth: "380px",
    height: "52px",
    padding: "0 18px",
    border: "1.5px solid #CBD5E1",
    borderRadius: "14px",
    background: "#FFFFFF",
    fontSize: "15px",
    color: "#0F172A",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow:
      "0 2px 8px rgba(15,23,42,0.04)",
  }}
        />

      </div>

      {/* Table */}

      <PackageTable
        packages={
          filteredPackages
        }
        onDelete={
          handleDelete
        }
      />

    </div>
  );
};

export default Packages;