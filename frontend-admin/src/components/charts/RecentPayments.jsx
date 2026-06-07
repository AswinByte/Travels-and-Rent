const RecentPayments = ({
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
        Recent Payments
      </h2>

      {data?.map(
        (payment) => (

          <div
            key={payment._id}
            style={{
              padding: "12px 0",
              borderBottom:
                "1px solid #eee",
            }}
          >

            <strong>
              {
                payment.user
                  ?.name
              }
            </strong>

            <br />

            ₹
            {
              payment.totalAmount
            }

          </div>
        )
      )}
    </div>
  );
};

export default RecentPayments;