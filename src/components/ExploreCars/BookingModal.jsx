"use client";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import Image from "next/image";
import DateRangePicker from "./DateRangePicker";
import BookingForm from "./BookingForm";

const BookingModal = ({ car }) => {
  const [open, setOpen] = useState(false);
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const getTotalDays = () => {
    if (!dateRange?.from || !dateRange?.to) return 1;
    return (
      Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)) || 1
    );
  };
  const totalDays = getTotalDays();
  const totalPrice = car.daily_rent_price * totalDays;

  const formatDate = (d) =>
    d?.toLocaleDateString("en-US", {
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

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden border border-[#e6c364]/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
            style={{ background: "linear-gradient(135deg, #16141c, #1a1825)" }}
          >
            <div className="flex">
              {/* ── LEFT: Car Image ── */}
              <div className="relative w-[240px] min-h-[420px] shrink-0 hidden md:block">
                <Image
                  src={car.image}
                  alt={car.car_name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16141c] via-[#16141c]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#16141c]/60" />
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
                  <p className="text-[#d0c5b2] text-xs">
                    {dateRange?.from && dateRange?.to
                      ? `${formatDate(dateRange.from)} — ${formatDate(dateRange.to)}`
                      : "Select dates →"}
                  </p>
                  {dateRange?.from && dateRange?.to && (
                    <div className="mt-3 pt-3 border-t border-[#e6c364]/20">
                      <p className="text-[9px] tracking-widest uppercase text-[#6B6B7A]">
                        {totalDays} day{totalDays > 1 ? "s" : ""} · Total
                      </p>
                      <p
                        className="text-xl text-[#e6c364] mt-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ${totalPrice}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── RIGHT: Form ── */}
              <div className="flex-1 p-8 space-y-5 overflow-y-auto max-h-[90vh]">
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
                  <button
                    onClick={() => setOpen(false)}
                    className="text-[#6B6B7A] hover:text-white transition-colors p-1"
                  >
                    <LuX size={18} />
                  </button>
                </div>

                <div className="h-px bg-[#e6c364]/10" />

                <DateRangePicker
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />

                <BookingForm
                  car={car}
                  dateRange={dateRange}
                  totalDays={totalDays}
                  totalPrice={totalPrice}
                  driverNeeded={driverNeeded}
                  setDriverNeeded={setDriverNeeded}
                  note={note}
                  setNote={setNote}
                  loading={loading}
                  setLoading={setLoading}
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingModal;
