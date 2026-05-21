"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const FleetCarCard = ({ car, user }) => {
  console.log(user);
  const [isHovered, setIsHovered] = useState(false);

  const {
    _id,
    car_name,
    car_type,
    daily_rent_price,
    image,
    seat_capacity,
    availability_status,
    booking_count,
    pickup_location,
  } = car;

  const getStatus = () => {
    if (!availability_status) {
      return {
        text: "Unavailable",
        className: "text-[#f87171] border-[#f87171]/30 bg-[#2a1010]/80",
      };
    }
    if (booking_count > 0) {
      return {
        text: "Popular",
        className: "text-[#e6c364] border-[#e6c364]/30 bg-[#161512]/80",
      };
    }
    return {
      text: "Available",
      className: "text-[#4ade80] border-[#4ade80]/30 bg-[#0f2a1a]/80",
    };
  };

  const status = getStatus();

  return (
    <div
      className={`
        relative rounded-xl w-full flex flex-col h-full
        bg-[#111115] overflow-hidden
        transition-all duration-500 ease-out
        ${
          isHovered
            ? "border border-[#e6c364]/40 shadow-[0_8px_40px_rgba(201,168,76,0.12)] -translate-y-1"
            : "border border-[#26242c] shadow-xl shadow-black/60"
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[16/10] w-full bg-[#16161c] overflow-hidden border-b border-[#26242c]">
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800"
          }
          alt={car_name || "Luxury Car"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          priority
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 group hover:bg-gradient-to-t hover:from-black/5 hover:via-transparent hover:to-black/5" />

        {/* Status badge */}
        <span
          className={`absolute top-4 right-4 z-20 px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase border rounded-full backdrop-blur-sm ${status.className}`}
        >
          ● {status.text}
        </span>

        {/* Booking count */}
        {booking_count > 0 && (
          <span className="absolute top-4 left-4 z-20 px-3 py-1 text-[10px] text-[#e6c364] border border-[#26242c] rounded-full backdrop-blur-sm bg-[#111115]/80">
            {booking_count} bookings
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col gap-5 flex-grow">
        {/* Car Name + Tags */}
        <div className="flex flex-col gap-3">
          <h3
            className="text-2xl text-white font-medium tracking-wide capitalize leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {car_name}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-[#16161c] border border-[#26242c] text-[9px] tracking-widest text-[#99907e] uppercase font-mono">
              {car_type}
            </span>
            <span className="px-2.5 py-1 bg-[#16161c] border border-[#26242c] text-[9px] tracking-widest text-[#99907e] uppercase font-mono">
              {seat_capacity} Seats
            </span>
            {pickup_location && (
              <span className="px-2.5 py-1 bg-[#16161c] border border-[#26242c] text-[9px] tracking-widest text-[#99907e] uppercase font-mono truncate max-w-[120px]">
                📍 {pickup_location}
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          className={`h-px transition-colors duration-500 ease-out ${isHovered ? "bg-[#e6c364]/20" : "bg-[#26242c]"}`}
        />

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span
            className="text-xl text-[#e6c364] font-light"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            $
          </span>
          <span
            className="text-3xl font-semibold text-white tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {daily_rent_price?.toLocaleString()}
          </span>
          <span className="text-[10px] text-[#6B6B7A] tracking-widest ml-1 uppercase">
            / day
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Link href={`/exploreCars/${_id}`}>
            <button className="border border-[#e6c364] text-[#e6c364] w-full py-3 rounded-full text-[10px] tracking-widest cursor-pointer">
              View Details
            </button>
          </Link>

          <Link href={`/exploreCars/${_id}`}>
            <button className="bg-[#e6c364] text-black w-full py-3 rounded-full text-[10px] tracking-widest cursor-pointer">
              Reserve Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FleetCarCard;