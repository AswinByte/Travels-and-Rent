import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import FuelTypeChart from "./FuelTypeChart";

const FuelAnalytics = ({
  fuelLogs,
}) => {

  const [period, setPeriod] =
    useState("monthly");

  const chartData =
    fuelLogs.map((log) => {

      const date =
        new Date(
          log.fuelDate
        );

      return {
        week: `W${Math.ceil(
          date.getDate() / 7
        )}`,

        month:
          date.toLocaleString(
            "default",
            {
              month: "short",
            }
          ),

        year:
          date.getFullYear(),

        amount:
          log.amount,
      };
    });

  const vehicleData =
    fuelLogs.map((log) => ({
      vehicle:
        log.vehicle
          ?.vehicleName ||
        "Unknown",

      amount:
        log.amount,
    }));

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

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "1fr 1fr",
        gap: "24px",
        marginBottom: "25px",
      }}
    >

      {/* Fuel Expense Trend */}

      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "20px",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.06)",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >

          <h2>
            Fuel Expense Trend
          </h2>

          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >

            {[
              "weekly",
              "monthly",
              "yearly",
            ].map((item) => (

              <button
                key={item}
                onClick={() =>
                  setPeriod(item)
                }
                style={{
                  padding:
                    "8px 14px",
                  border: "none",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "600",

                  background:
                    period === item
                      ? "#2563EB"
                      : "#E2E8F0",

                  color:
                    period === item
                      ? "#fff"
                      : "#0F172A",
                }}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <LineChart
            data={chartData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey={
                period ===
                "weekly"
                  ? "week"
                  : period ===
                    "yearly"
                  ? "year"
                  : "month"
              }
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563EB"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Vehicle Fuel Cost */}

      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "20px",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.06)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Vehicle Fuel Cost
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <BarChart
            data={vehicleData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="vehicle"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#10B981"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Fuel Type Chart */}

      <FuelTypeChart
        fuelLogs={fuelLogs}
      />

      {/* Fuel Insights */}

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "24px",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >

        <h2>
          Fuel Insights
        </h2>

        <div
          style={{
            background:
              "#EFF6FF",
            padding: "18px",
            borderRadius:
              "12px",
          }}
        >
          <p>
            Total Entries
          </p>

          <h2>
            {totalEntries}
          </h2>
        </div>

        <div
          style={{
            background:
              "#ECFDF5",
            padding: "18px",
            borderRadius:
              "12px",
          }}
        >
          <p>
            Total Liters
          </p>

          <h2>
            {totalLiters} L
          </h2>
        </div>

        <div
          style={{
            background:
              "#FEF3C7",
            padding: "18px",
            borderRadius:
              "12px",
          }}
        >
          <p>
            Total Expense
          </p>

          <h2>
            ₹{totalExpense}
          </h2>
        </div>

      </div>

    </div>

  );
};

export default FuelAnalytics;