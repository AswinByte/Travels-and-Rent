const VehicleTypeRevenue = ({
  data,
}) => {

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "20px",
      }}
    >
      <h2>
        Vehicle Revenue
      </h2>

      {data?.length === 0 ? (
        <p>No Data</p>
      ) : (
        data.map((item) => (

          <div
            key={item._id}
            style={{
              marginBottom:
                "16px",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <span>
                {item._id}
              </span>

              <strong>
                ₹{item.revenue}
              </strong>
            </div>

            <div
              style={{
                height: "10px",
                background:
                  "#e5e7eb",
                borderRadius:
                  "10px",
                overflow:
                  "hidden",
              }}
            >

              <div
                style={{
                  width: "70%",
                  height: "100%",
                  background:
                    "#3B82F6",
                }}
              />

            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default VehicleTypeRevenue;