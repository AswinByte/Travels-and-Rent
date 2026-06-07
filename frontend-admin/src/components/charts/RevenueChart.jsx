import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data }) => {

  const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartData =
  data?.map((item) => ({
    month:
      monthNames[
        item._id.month
        
      ],
    revenue:
      item.revenue,
      
  })) || [];
  console.log("Revenue Data:", data);
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
          color: "#0f172a",
        }}
      >
        Revenue Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={4}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;