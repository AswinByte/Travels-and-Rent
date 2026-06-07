import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const FuelTypeChart = ({
  fuelLogs,
}) => {

  const fuelData = [
  {
    name: "Petrol",
    value: fuelLogs.filter(
      (log) =>
        log.fuelType ===
        "Petrol"
    ).length,
  },
  {
    name: "Diesel",
    value: fuelLogs.filter(
      (log) =>
        log.fuelType ===
        "Diesel"
    ).length,
  },
  {
    name: "CNG",
    value: fuelLogs.filter(
      (log) =>
        log.fuelType ===
        "CNG"
    ).length,
  },
  {
    name: "Electric",
    value: fuelLogs.filter(
      (log) =>
        log.fuelType ===
        "Electric"
    ).length,
  },
].filter(
  (item) => item.value > 0
);
  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
  ];

  return (
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
        Fuel Type Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={fuelData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {fuelData.map(
              (
                entry,
                index
              ) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FuelTypeChart;