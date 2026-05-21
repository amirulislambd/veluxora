import MyAddedCarsClient from "@/components/MyAddedCars/MyAddedCarsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyAddedCarsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/MyAddedCars?email=${user?.email}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  
  const cars = await res.json();

  // Stats calculate
  const totalValue = cars.reduce(
    (sum, car) => sum + (car.daily_rent_price || 0),
    0,
  );
  const activeBookings = cars.reduce(
    (sum, car) => sum + (car.booking_count || 0),
    0,
  );
  const monthlyRevenue = cars.reduce(
    (sum, car) => sum + car.daily_rent_price * (car.booking_count || 0),
    0,
  );

  const stats = [
    {
      label: "Total Fleet Value",
      value: `$${(totalValue / 1000).toFixed(1)}K`,
      sub: "+4.2% this quarter",
      subColor: "text-[#4ade80]",
    },
    {
      label: "Active Bookings",
      value: activeBookings,
      sub: "Next turnover: Tomorrow",
      subColor: "text-[#6B6B7A]",
    },
    {
      label: "Monthly Revenue",
      value: `$${monthlyRevenue.toLocaleString()}`,
      sub: "Top 5% of host earnings",
      subColor: "text-[#e6c364]",
    },
  ];

  return <MyAddedCarsClient cars={cars} stats={stats} />;
};

export default MyAddedCarsPage;
