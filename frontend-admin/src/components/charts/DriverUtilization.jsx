const DriverUtilization = ({
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
        Driver Utilization
      </h2>

      {data?.length === 0 ? (
        <p>No Drivers</p>
      ) : (
        data.map((driver) => (

          <div
            key={driver._id}
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
                Driver
              </span>

              <strong>
                {
                  driver.totalTrips
                } Trips
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
                  width: `${
                    driver.totalTrips *
                    10
                  }%`,
                  height: "100%",
                  background:
                    "#10B981",
                }}
              />

            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default DriverUtilization;