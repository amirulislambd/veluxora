import BookingCard from "@/components/MyBookings/bookingCard";
import EmptyBookings from "@/components/MyBookings/EmptyBookings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`http://localhost:5000/bookings`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const bookings = await res.json();
  //   console.log(data);

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 md:px-16 py-16">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Bookings
          </h1>
          <p className="text-[#6B6B7A] text-sm tracking-wide">
            Review your upcoming and past luxury voyages. Each selection curated
            for excellence.
          </p>
          <div className="h-px bg-gradient-to-r from-[#e6c364]/40 to-transparent mt-6" />
        </div>

        {/* Booking List */}
        {bookings?.length === 0 ? (
          <EmptyBookings />
        ) : (
          <div className="flex flex-col gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;
