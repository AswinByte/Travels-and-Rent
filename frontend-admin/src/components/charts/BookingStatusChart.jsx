import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const BookingStatusChart = ({
  data,
}) => {

  const chartData = [
    {
      name: "Pending",
      value: data?.pending || 0,
    },
    {
      name: "Confirmed",
      value: data?.confirmed || 0,
    },
    {
      name: "Completed",
      value: data?.completed || 0,
    },
    {
      name: "Cancelled",
      value: data?.cancelled || 0,
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "20px",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h2>Booking Status</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
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

export default BookingStatusChart;