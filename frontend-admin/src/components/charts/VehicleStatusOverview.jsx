import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
];

const VehicleStatusOverview = ({
  data,
}) => {

  const chartData = [
    {
      name: "Available",
      value:
        data?.available || 0,
    },
    {
      name: "Booked",
      value:
        data?.booked || 0,
    },
    {
      name: "Maintenance",
      value:
        data?.maintenance || 0,
    },
    {
      name: "Inactive",
      value:
        data?.inactive || 0,
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "20px",
      }}
    >
      <h2>
        Vehicle Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={100}
          >
            {chartData.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
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

export default VehicleStatusOverview;