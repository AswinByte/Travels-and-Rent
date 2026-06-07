const TopPackages = ({
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
        Top Packages
      </h2>

      {data?.length === 0 ? (
        <p>
          No Package
          Bookings Yet
        </p>
      ) : (
        data.map((pkg) => (

          <div
            key={
              pkg.packageName
            }
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              padding:
                "12px 0",
              borderBottom:
                "1px solid #eee",
            }}
          >

            <span>
              {
                pkg.packageName
              }
            </span>

            <strong>
              {
                pkg.totalBookings
              }{" "}
              Bookings
            </strong>

          </div>
        ))
      )}
    </div>
  );
};

export default TopPackages;