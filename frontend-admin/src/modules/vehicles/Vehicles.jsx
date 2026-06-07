import { useEffect, useState }
from "react";

import { Link } from "react-router-dom";
import Select from "react-select";
import {
  getVehicles,
} from "../../services/vehicleService";

import VehicleTable
from "./VehicleTable";

const Vehicles = () => {

  const [vehicles, setVehicles] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
      useState("");

  const [fuelFilter,
    setFuelFilter] =
      useState("");

  const [typeFilter,
    setTypeFilter] =
      useState("");
const statusOptions = [
  { value: "", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "booked", label: "Booked" },
  { value: "maintenance", label: "Maintenance" },
  { value: "inactive", label: "Inactive" },
];

const fuelOptions = [
  { value: "", label: "All Fuel" },
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "CNG", label: "CNG" },
];

const typeOptions = [
  { value: "", label: "All Type" },
  { value: "SUV", label: "SUV" },
  { value: "Sedan", label: "Sedan" },
  { value: "MPV", label: "MPV" },
  { value: "Bus", label: "Bus" },
];
  const [loading, setLoading] =
    useState(true);

    const [isHover, setIsHover] =
  useState(false);
const [page, setPage] =
  useState(1);

const [pages, setPages] =
  useState(1);
  useEffect(() => {

    const fetchVehicles =
      async () => {

        try {

          const data =
await getVehicles(page);

          console.log(data);

          setVehicles(
            data.vehicles || []
            
          );
setPages(data.pages);
        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchVehicles();

  }, [page]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
const customSelectStyles = {
  control: (base) => ({
    ...base,
    minHeight: "52px",
    minWidth: "220px",
    borderRadius: "14px",
    border: "1.5px solid #CBD5E1",
    boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
    cursor: "pointer",
  }),

  menu: (base) => ({
    ...base,
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  }),

  option: (base, state) => ({
    ...base,
    padding: "12px 16px",
    backgroundColor: state.isSelected
      ? "#2563EB"
      : state.isFocused
      ? "#EFF6FF"
      : "#FFFFFF",

    color: state.isSelected
      ? "#FFFFFF"
      : "#0F172A",

    cursor: "pointer",
  }),
};
  return (
    <div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "12px",
            }}
          >
            Vehicles Management
          </h1>

          <input
            type="text"
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              padding: "14px 18px",
              width: "320px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "14px",
              outline: "none",
              background: "#f8fafc",
              fontSize: "15px",
            }}
          />

        </div>

        <Link
          to="/vehicles/add"
          style={{
            background: "#3B82F6",
            color: "white",
            padding: "12px 18px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          + Add Vehicle
        </Link>

      </div>

      {/* FILTERS */}

      <div
  style={{
    display: "flex",
    
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "20px",
    boxShadow:
      "0 4px 20px rgba(15,23,42,0.05)",
    border:
      "1px solid #e2e8f0",
  }}
  
>
  <Select
  options={statusOptions}
  value={statusOptions.find(
    (item) =>
      item.value === statusFilter
  )}
  onChange={(selected) =>
    setStatusFilter(
      selected.value
    )
  }
  styles={customSelectStyles}
/>
<Select
  options={fuelOptions}
  value={fuelOptions.find(
    (item) =>
      item.value === fuelFilter
  )}
  onChange={(selected) =>
    setFuelFilter(
      selected.value
    )
  }
  styles={customSelectStyles}
/>

<Select
  options={typeOptions}
  value={typeOptions.find(
    (item) =>
      item.value === typeFilter
  )}
  onChange={(selected) =>
    setTypeFilter(
      selected.value
    )
  }
  styles={customSelectStyles}
/><button
  onMouseEnter={() =>
    setIsHover(true)
  }

  onMouseLeave={() =>
    setIsHover(false)
  }

  onClick={() => {
    setStatusFilter("");
    setFuelFilter("");
    setTypeFilter("");
  }}

  style={{
    height: "48px",
    padding: "0 22px",
    border: "none",
    borderRadius: "12px",

    background: isHover
      ? "#bf2626"
      : "#ef4444",

    color: "#fff",

    fontSize: "14px",
    fontWeight: "600",

    cursor: "pointer",

    transition:
      "all 0.3s ease",


  }}
>
  Reset Filters
</button>
</div>
      {/* VEHICLE TABLE */}

      <VehicleTable
  vehicles={
    vehicles.filter((vehicle) => {

      const matchesSearch =

        vehicle.vehicleName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        vehicle.vehicleNumber
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        vehicle.brand
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =

        statusFilter
          ? vehicle.status
              ?.toLowerCase() ===
            statusFilter.toLowerCase()
          : true;

      const matchesFuel =

        fuelFilter
          ? vehicle.fuelType
              ?.toLowerCase() ===
            fuelFilter.toLowerCase()
          : true;

      const matchesType =

        typeFilter
          ? vehicle.type
              ?.toLowerCase() ===
            typeFilter.toLowerCase()
          : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesFuel &&
        matchesType
      );
    })
  }
/>

<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "30px",
  }}
>

  <button
    disabled={page === 1}
    onClick={() =>
      setPage(page - 1)
    }
    style={{
      padding: "10px 16px",
      borderRadius: "10px",
      border: "none",
      background:
        page === 1
          ? "#cbd5e1"
          : "#3b82f6",
      color: "white",
      cursor: "pointer",
    }}
  >
    Previous
  </button>

  <span
    style={{
      padding: "10px 16px",
      fontWeight: "600",
    }}
  >
    Page {page} of {pages}
  </span>

  <button
    disabled={page === pages}
    onClick={() =>
      setPage(page + 1)
    }
    style={{
      padding: "10px 16px",
      borderRadius: "10px",
      border: "none",
      background:
        page === pages
          ? "#cbd5e1"
          : "#3b82f6",
      color: "white",
      cursor: "pointer",
    }}
  >
    Next
  </button>

</div>
    </div>
  );
};

export default Vehicles;