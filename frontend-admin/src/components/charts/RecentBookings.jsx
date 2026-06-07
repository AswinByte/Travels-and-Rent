const RecentBookings = ({
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
        Recent Bookings
      </h2>

      {data?.map(
        (booking) => (

          <div
            key={booking._id}
            style={{
              padding: "12px 0",
              borderBottom:
                "1px solid #eee",
            }}
          >

            <strong>
              {
                booking.user
                  ?.name
              }
            </strong>

            <br />

            {
              booking.vehicle
                ?.vehicleName
            }

          </div>
        )
      )}
    </div>
  );
};

export default RecentBookings;