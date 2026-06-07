import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import DriverTable from "./DriverTable";

import {
  getDrivers,
} from "../../services/driverService";

const Drivers = () => {

  const [drivers, setDrivers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
const [isHover, setIsHover] =
  useState(false);
  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
      useState("");

  useEffect(() => {

    const fetchDrivers =
      async () => {

        try {

          const data =
            await getDrivers();

          setDrivers(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchDrivers();

  }, []);

  const filteredDrivers =
    drivers.filter((driver) => {

      const matchesSearch =

        driver.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        driver.phone
          ?.includes(search)

        ||

        driver.licenseNumber
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =

        statusFilter
          ? driver.status ===
            statusFilter
          : true;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  if (loading) {
    return (
      <h2>
        Loading Drivers...
      </h2>
    );
  }
const statusOptions = [
  {
    value: "",
    label: "All Status",
  },
  {
    value: "available",
    label: "Available",
  },
  {
    value: "assigned",
    label: "Assigned",
  },
];
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
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Driver Management
          </h1>

          <p
            style={{
              color: "#64748B",
            }}
          >
            Manage all drivers
          </p>

        </div>

        <Link
          to="/drivers/add"
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
          + Add Driver
        </Link>

      </div>

      {/* Filters */}

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
          placeholder="Search Driver..."
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

        <Select
  options={statusOptions}
  value={
    statusOptions.find(
      (option) =>
        option.value ===
        statusFilter
    )
  }
  onChange={(selected) =>
    setStatusFilter(
      selected.value
    )
  }
  placeholder="All Status"
  styles={{
    control: (base) => ({
      ...base,
      minHeight: "52px",
      minWidth: "250px",
      borderRadius: "14px",
      border:
        "2px solid #2563EB",
      boxShadow:
        "0 4px 12px rgba(37,99,235,0.12)",
      cursor: "pointer",
    }),

    menu: (base) => ({
      ...base,
      borderRadius: "14px",
      overflow: "hidden",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.12)",
    }),

    option: (
      base,
      state
    ) => ({
      ...base,
      padding: "12px 16px",
      backgroundColor:
        state.isSelected
          ? "#2563EB"
          : state.isFocused
          ? "#EFF6FF"
          : "#FFFFFF",

      color:
        state.isSelected
          ? "#FFFFFF"
          : "#0F172A",

      cursor: "pointer",
      fontWeight: "500",
    }),

    placeholder: (
      base
    ) => ({
      ...base,
      color: "#64748B",
    }),
  }}
/>
        <button
  onMouseEnter={() =>
    setIsHover(true)
  }

  onMouseLeave={() =>
    setIsHover(false)
  }

  onClick={() => {
    setSearch("");
    setStatusFilter("");
  }}

  style={{
    height: "52px",
    padding: "0 24px",

    background: isHover
      ? "#DC2626"
      : "#EF4444",

    color: "#fff",

    border: "none",

    borderRadius: "14px",

    fontWeight: "600",

    fontSize: "15px",

    cursor: "pointer",

    transition:
      "all 0.3s ease",

  }}
>
  Reset
</button>

      </div>

      {/* Driver Table */}

      <DriverTable
        drivers={
          filteredDrivers
        }
      />

    </div>
  );
};

export default Drivers;