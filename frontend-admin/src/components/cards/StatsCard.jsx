import "./StatsCard.css";

const StatsCard = ({
  title,
  value,
  color,
}) => {

  return (
    <div className="stats-card">

      <div
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "14px",
          background: color,
          opacity: 0.15,
        }}
      />

      <div>

        <h4 className="stats-title">
          {title}
        </h4>

        <h2 className="stats-value">
          {value}
        </h2>

      </div>

    </div>
  );
};

export default StatsCard;