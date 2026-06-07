import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FuelLogTable from "./FuelLogTable";
import FuelStatsCard from "./FuelStatsCard";
import FuelAnalytics from "./FuelAnalytics";
import Select from "react-select";

import {
  getFuelLogs,
  deleteFuelLog,
} from "../../services/fuelService";

const FuelLogs = () => {

  const [fuelLogs, setFuelLogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

const handleDelete = async (id) => {

  try {

    await deleteFuelLog(id);

    setFuelLogs((prev) =>
      prev.filter(
        (log) =>
          log._id !== id
      )
    );

    alert(
      "Fuel Log deleted successfully"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Delete failed"
    );
  }
};
  const [search, setSearch] =
    useState("");

const [fuelTypeFilter, setFuelTypeFilter] =
  useState(null);

  useEffect(() => {

    const fetchFuelLogs =
      async () => {

        try {

          const data =
            await getFuelLogs();

          setFuelLogs(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchFuelLogs();

  }, []);

  const filteredLogs =
  fuelLogs.filter((log) => {

    const matchesSearch =
      log.vehicle?.vehicleName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesFuelType =
      !fuelTypeFilter ||
      log.fuelType ===
        fuelTypeFilter.value;

    return (
      matchesSearch &&
      matchesFuelType
    );

  });

  const totalEntries =
    fuelLogs.length;

  const totalLiters =
    fuelLogs.reduce(
      (acc, log) =>
        acc + log.liters,
      0
    );

  const totalExpense =
    fuelLogs.reduce(
      (acc, log) =>
        acc + log.amount,
      0
    );

  const avgMileage =
    fuelLogs.length > 0
      ? (
          fuelLogs.reduce(
            (acc, log) =>
              acc +
              log.mileageAtFill,
            0
          ) /
          fuelLogs.length
        ).toFixed(1)
      : 0;

  if (loading) {
    return (
      <h2>
        Loading Fuel Logs...
      </h2>
    );
  }
const fuelTypeOptions = [
  {
    value: "Petrol",
    label: "Petrol",
  },
  {
    value: "Diesel",
    label: "Diesel",
  },
  {
    value: "CNG",
    label: "CNG",
  },
  {
    value: "Electric",
    label: "Electric",
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
              fontSize: "34px",
              fontWeight: "700",
              marginBottom: "6px",
            }}
          >
            Fuel Management
          </h1>

          <p
            style={{
              color: "#64748B",
            }}
          >
            Track fuel expenses
            and consumption
          </p>

        </div>
<Link
  to="/fuel-logs/add"
  style={{
    background: "#2563EB",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    fontWeight: "600",
  }}
>
  + Add Fuel Log
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

        <FuelStatsCard
          title="Total Entries"
          value={totalEntries}
          color="#3B82F6"
        />

        <FuelStatsCard
          title="Total Liters"
          value={`${totalLiters} L`}
          color="#10B981"
        />

        <FuelStatsCard
          title="Total Expense"
          value={`₹${totalExpense}`}
          color="#F59E0B"
        />

        <FuelStatsCard
          title="Avg Mileage"
          value={`${avgMileage} KM`}
          color="#EF4444"
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
    placeholder="Search Vehicle..."
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

  <div
    style={{
      minWidth: "220px",
    }}
  >
    <Select
      options={
        fuelTypeOptions
      }
      value={
        fuelTypeFilter
      }
      onChange={
        setFuelTypeFilter
      }
      placeholder="Fuel Type"
      isClearable
      styles={{
        control: (
          provided
        ) => ({
          ...provided,
          minHeight:
            "50px",
          borderRadius:
            "12px",
        }),
      }}
    />
  </div>

  <button
    onClick={() => {
      setSearch("");
      setFuelTypeFilter(
        null
      );
    }}
    style={{
      background:
        "#EF4444",
      color: "#fff",
      border: "none",
      padding:
        "14px 20px",
      borderRadius:
        "12px",
      cursor: "pointer",
      fontWeight:
        "600",
    }}
  >
    Reset
  </button>

</div>
      {/* Analytics */}


<FuelAnalytics
  fuelLogs={fuelLogs}
/>

      {/* Table */}

      <FuelLogTable
  fuelLogs={filteredLogs}
  onDelete={handleDelete}
/>

    </div>

    
  );
};

export default FuelLogs;