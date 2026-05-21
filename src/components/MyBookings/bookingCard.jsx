"use client";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiClock, FiEye } from "react-icons/fi";
import CancelBookingBtn from "./CancelBookingBtn"; 

const statusConfig = {
  Confirmed: {
    label: "Confirmed",
    className: "bg-[#1a2e1a] text-[#4ade80] border border-[#4ade80]/30",
  },
  Pending: {
    label: "Pending",
    className: "bg-[#2a2510] text-[#e6c364] border border-[#e6c364]/30",
  },
  Cancelled: {
    label: "Cancelled",
    className: "bg-[#2a1010] text-[#f87171] border border-[#f87171]/30",
  },
};

const BookingCard = ({ booking }) => {
  const status = statusConfig[booking.status] || statusConfig.Pending;
  const bookingDate = new Date(booking.booking_date);
  const month = bookingDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = bookingDate.getDate();

  return (
    <div className="rounded-sm overflow-hidden border border-[#e6c364]/10 bg-[#12121A]">
      {/* ── MOBILE LAYOUT ── */}
      <div className="block md:hidden">
        <div className="relative w-full h-48">
          <Image
            src={booking.car_image}
            alt={booking.car_name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] via-[#12121A]/30 to-transparent" />

          {/* Status — top right */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          {/* Date — top left */}
          <div className="absolute top-3 left-3 bg-[#0f0f16]/80 backdrop-blur-sm px-3 py-2 rounded-sm text-center">
            <p className="text-[9px] tracking-widest text-[#6B6B7A] uppercase">
              {month}
            </p>
            <p
              className="text-xl text-white font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {day}
            </p>
          </div>

          {/* Car name */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#e6c364] mb-1">
              {booking.car_type}
            </p>
            <h2
              className="text-xl text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {booking.car_name}
            </h2>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#6B6B7A] mb-1">
                <FiClock className="inline mr-1" /> Date
              </p>
              <p className="text-sm text-[#e4e1e9]">
                {bookingDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#6B6B7A] mb-1">
                <FiMapPin className="inline mr-1" /> Location
              </p>
              <p className="text-sm text-[#e4e1e9] truncate">
                {booking.pickup_location}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#6B6B7A] mb-1">
              Total Amount
            </p>
            <p
              className="text-2xl text-[#e6c364]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ${booking.total_price || booking.daily_rent_price}.00
            </p>
          </div>

          {/* Mobile Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              href={`#`}
              className="flex items-center justify-center gap-2 py-3 bg-[#1f1d2a] border border-[#e6c364]/20 rounded-sm text-[11px] font-semibold tracking-[0.2em] uppercase text-[#e6c364]"
            >
              <FiEye size={14} /> View
            </Link>
            <CancelBookingBtn
              bookingId={booking._id}
              carName={booking.car_name}
              variant="mobile"
            />
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex gap-0">
        {/* Date Block */}
        <div className="w-16 shrink-0 bg-[#0f0f16] flex flex-col items-center justify-start pt-5 border-r border-[#e6c364]/10">
          <span className="text-[10px] tracking-[0.2em] text-[#6B6B7A] uppercase">
            {month}
          </span>
          <span
            className="text-3xl text-white font-light mt-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {day}
          </span>
        </div>

        {/* Car Image */}
        <div className="relative w-[180px] shrink-0">
          <Image
            src={booking.car_image}
            alt={booking.car_name}
            fill
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#12121A]/80" />
        </div>

        {/* Details */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#e6c364] mb-1">
                {booking.car_type}
              </p>
              <h2
                className="text-xl md:text-2xl text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {booking.car_name}
              </h2>
            </div>
            <span
              className={`shrink-0 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#6B6B7A] mb-1">
                <FiClock className="inline mr-1" /> Booking Date
              </p>
              <p className="text-sm text-[#e4e1e9]">
                {bookingDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#6B6B7A] mb-1">
                <FiMapPin className="inline mr-1" /> Location
              </p>
              <p className="text-sm text-[#e4e1e9]">
                {booking.pickup_location}
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between mt-5 pt-4 border-t border-[#e6c364]/8">
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#6B6B7A] mb-1">
                Total Amount
              </p>
              <p
                className="text-2xl text-[#e6c364]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ${booking.total_price || booking.daily_rent_price}.00
              </p>
            </div>

            {/* Desktop Buttons */}
            <div className="flex items-center gap-3">
              <CancelBookingBtn
                bookingId={booking._id}
                carName={booking.car_name}
                variant="desktop"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;