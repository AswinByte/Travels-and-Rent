import { useEffect, useState } from "react";

import StatsCard
from "../../components/cards/StatsCard";

import RevenueChart
from "../../components/charts/RevenueChart";


import {
  getDashboardAnalytics,
} from "../../services/dashboardService";

import BookingStatusChart from "../../components/charts/BookingStatusChart";
import VehicleTypeRevenue from "../../components/charts/VehicleTypeRevenue";
import DriverUtilization from "../../components/charts/DriverUtilization";
import TopPackages from "../../components/charts/TopPackages";

import VehicleStatusOverview from "../../components/charts/VehicleStatusOverview";
import RecentBookings from "../../components/charts/RecentBookings";
import RecentPayments from "../../components/charts/RecentPayments";

const Dashboard = () => {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const data =
            await getDashboardAnalytics();

          console.log(data);

          setAnalytics(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchAnalytics();

  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

     <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
> 

        <StatsCard
  title="Total Users"
  value={analytics?.totalUsers || 0}
  color="#6366F1"
/>

<StatsCard
  title="Total Vehicles"
  value={analytics?.totalVehicles || 0}
  color="#F59E0B"
/>

<StatsCard
  title="Total Drivers"
  value={analytics?.totalDrivers || 0}
  color="#EF4444"
/>

<StatsCard
  title="Total Bookings"
  value={analytics?.totalBookings || 0}
  color="#3B82F6"
/>

<StatsCard
  title="Pending Bookings"
  value={analytics?.pendingBookings || 0}
  color="#F97316"
/>

<StatsCard
  title="Completed Trips"
  value={analytics?.completedTrips || 0}
  color="#10B981"
/>

<StatsCard
  title="Pending Payments"
  value={analytics?.pendingPayments || 0}
  color="#E11D48"
/>

<StatsCard
  title="Revenue"
  value={`₹${analytics?.totalRevenue || 0}`}
  color="#14B8A6"
/>

      </div>
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr",
    gap: "24px",
    marginTop: "24px",
  }}
>

  <RevenueChart
    data={
      analytics?.monthlyRevenue
    }
    
  />

  <BookingStatusChart
    data={
      analytics?.bookingStatus
    }
  />

</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "24px",
    marginTop: "24px",
  }}
>

  <VehicleTypeRevenue
    data={
      analytics?.vehicleTypeRevenue
    }
  />

  <DriverUtilization
    data={
      analytics?.driverUtilization
    }
  />

</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "24px",
    marginTop: "24px",
  }}
>

  <TopPackages
    data={
      analytics?.topPackages
    }
  />

  <div
    style={{
      background: "#fff",
      padding: "24px",
      borderRadius: "20px",
      boxShadow:
        "0 4px 20px rgba(0,0,0,0.06)",
    }}
  >

    <h2
      style={{
        marginBottom: "20px",
      }}
    >
      Top Booked Vehicles
    </h2>

    {analytics?.topVehicles
      ?.length > 0 ? (

      analytics.topVehicles.map(
        (
          vehicle,
          index
        ) => (

          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              padding:
                "12px 0",
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >

            <span>
              Vehicle #
              {index + 1}
            </span>

            <strong>
              {
                vehicle.totalBookings
              }{" "}
              Bookings
            </strong>

          </div>
        )
      )

    ) : (

      <p>
        No vehicle bookings
        found
      </p>

    )}

  </div>
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "24px",
    marginTop: "24px",
  }}
>

  <RecentBookings
    data={
      analytics?.recentBookings
    }
  />

  <RecentPayments
    data={
      analytics?.recentPayments
    }
  />

</div>

<div
  style={{
    marginTop: "24px",
  }}
>

  <VehicleStatusOverview
    data={
      analytics?.vehicleStatus
    }
  />

</div>
</div>

    </div>
  );
};

export default Dashboard;