"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const BookingModal = ({ car }) => {
  const [open, setOpen] = useState(false);
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const bookingData = {
        car_id: car._id,
        car_name: car.car_name,
        car_image: car.image,
        car_type: car.car_type,
        daily_rent_price: car.daily_rent_price,
        pickup_location: car.pickup_location,
        driver_needed: driverNeeded,
        special_note: note,
        booking_date: new Date(),
        status: "Confirmed",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error("Booking failed! Please login first.");
        return;
      }

      const data = await res.json();
      if (data?.insertedId) {
        toast.success("Booking confirmed! 🚗");
        setOpen(false);
        setNote("");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Network error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Book Now Button */}
      <button
        onClick={() => car.availability_status && setOpen(true)}
        disabled={!car.availability_status}
        className={`w-full py-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300
          ${car.availability_status
            ? "bg-[#e6c364] text-[#0A0A0F] hover:brightness-110 active:scale-95 cursor-pointer"
            : "bg-[#1f1f25] text-[#6B6B7A] cursor-not-allowed"
          }`}
      >
        {car.availability_status ? "Book Now" : "Unavailable"}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal Card */}
          <div className="relative z-10 bg-[#12121A] border border-[#e6c364]/20 w-full max-w-md p-8 space-y-8">

            {/* Header */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#e6c364] mb-2">
                Confirm Reservation
              </p>
              <h2
                className="text-2xl text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {car.car_name}
              </h2>
              <p className="text-[#6B6B7A] text-sm mt-1">
                ${car.daily_rent_price}/day · {car.pickup_location}
              </p>
            </div>

            <div className="h-px bg-[#e6c364]/10" />

            {/* Driver Needed Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#e4e1e9] font-medium">Driver Needed?</p>
                <p className="text-[10px] text-[#6B6B7A] uppercase tracking-wider mt-0.5">
                  Professional driver service
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDriverNeeded(!driverNeeded)}
                className={`relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors duration-300
                  ${driverNeeded ? "bg-[#e6c364]" : "bg-[#4d4637]"}`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-[#131318] shadow transition-transform duration-300
                    ${driverNeeded ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>

            {/* Special Note */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] tracking-[0.3em] uppercase text-[#e6c364]">
                Special Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Any special requests or instructions..."
                className="bg-[#1f1f25]/50 border border-[#4d4637]/50 p-4 text-sm text-[#e4e1e9] placeholder:text-[#35343a] focus:outline-none focus:border-[#e6c364] transition-colors resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-3 border border-[#4d4637] text-[#d0c5b2] text-[11px] tracking-[0.2em] uppercase hover:border-[#e6c364]/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={loading}
                className={`flex-1 py-3 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300
                  ${loading
                    ? "bg-[#4d4637] text-[#888] cursor-not-allowed"
                    : "bg-[#e6c364] text-[#0A0A0F] hover:brightness-110 active:scale-95"
                  }`}
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingModal;