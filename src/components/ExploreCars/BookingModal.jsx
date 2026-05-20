"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuCalendar, LuX } from "react-icons/lu";
import Image from "next/image";

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

      const res = await fetch(`http://localhost:5000/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

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

  // তারিখ format
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDate = (d) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <>
      {/* Book Now Button */}
      <button
        onClick={() => car.availability_status && setOpen(true)}
        disabled={!car.availability_status}
        className={`w-full py-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300
          ${
            car.availability_status
              ? "bg-[#e6c364] text-[#0A0A0F] hover:brightness-110 active:scale-95 cursor-pointer"
              : "bg-[#1f1f25] text-[#6B6B7A] cursor-not-allowed"
          }`}
      >
        {car.availability_status ? "Book Now" : "Unavailable"}
      </button>

      {/* ── MODAL ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Modal Card */}
          <div
            className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden border border-[#e6c364]/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
            style={{ background: "linear-gradient(135deg, #16141c, #1a1825)" }}
          >
            <div className="flex">
              {/* ── LEFT: Car Image + Info ── */}
              <div className="relative w-[240px] min-h-[420px] shrink-0 hidden md:block">
                {/* ✅ Next.js Image */}
                <Image
                  src={car.image}
                  alt={car.car_name}
                  fill
                  className="object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#16141c] via-[#16141c]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#16141c]/60" />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] tracking-[0.35em] uppercase text-[#e6c364] mb-2">
                    Selected Vehicle
                  </p>
                  <h3
                    className="text-2xl text-white leading-tight mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {car.car_name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#d0c5b2] text-xs">
                    <LuCalendar size={12} />
                    <span>
                      {formatDate(today)} — {formatDate(tomorrow)}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Form ── */}
              <div className="flex-1 p-8 space-y-7">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2
                      className="text-2xl text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Book Your Experience
                    </h2>
                    <p className="text-[#6B6B7A] text-xs mt-1 tracking-wider">
                      ${car.daily_rent_price}/day · {car.pickup_location}
                    </p>
                  </div>
                  {/* Close button */}
                  <button
                    onClick={() => setOpen(false)}
                    className="text-[#6B6B7A] hover:text-white transition-colors p-1"
                  >
                    <LuX size={18} />
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e6c364]/10" />

                {/* Driver Needed Toggle */}
                <div className="flex items-center justify-between bg-[#1f1d2a] rounded-xl p-4">
                  <div>
                    <p className="text-sm font-medium text-[#e4e1e9]">
                      Professional Driver Needed
                    </p>
                    <p className="text-[10px] text-[#6B6B7A] mt-0.5">
                      Recommended for evening events
                    </p>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setDriverNeeded(!driverNeeded)}
                    className={`relative inline-flex h-7 rounded-full transition-colors duration-300 shrink-0
                      ${driverNeeded ? "bg-[#e6c364]" : "bg-[#3a3848]"}`}
                    style={{ width: "52px" }}
                  >
                    <span
                      className={`absolute top-1 inline-block h-5 w-5 rounded-full shadow-md transition-transform duration-300
                        ${
                          driverNeeded
                            ? "translate-x-[28px] bg-[#0A0A0F]"
                            : "translate-x-1 bg-[#6B6B7A]"
                        }`}
                    />
                  </button>
                </div>

                {/* Special Note */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-[0.3em] uppercase text-[#e6c364]">
                    Special Requirements
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder="Specify dietary needs, preferred temperature, or itinerary details..."
                    className="w-full bg-[#1f1d2a] rounded-xl p-4 text-sm text-[#e4e1e9] placeholder:text-[#3a3848] focus:outline-none focus:ring-1 focus:ring-[#e6c364]/30 transition-all resize-none"
                  />
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className={`w-full py-4 rounded-full text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300
                    ${
                      loading
                        ? "bg-[#4d4637] text-[#888] cursor-not-allowed"
                        : "bg-[#e6c364] text-[#0A0A0F] hover:brightness-110 active:scale-[0.98] cursor-pointer"
                    }`}
                >
                  {loading ? "Confirming..." : "Confirm Booking"}
                </button>

                {/* Footer note */}
                <p className="text-center text-[10px] text-[#6B6B7A] tracking-wider">
                  Our concierge will contact you within 15 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingModal;