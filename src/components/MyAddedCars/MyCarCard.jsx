"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit2, FiCalendar, FiBarChart2 } from "react-icons/fi";
import toast from "react-hot-toast";
import DeleteCarBtn from "./DeleteCarBtn";

const MyCarCard = ({ car }) => {
  const {
    _id,
    car_name,
    car_type,
    daily_rent_price,
    image,
    seat_capacity,
    pickup_location,
    booking_count,
    availability_status,
  } = car;

  return (
    <div className="bg-[#12121A] border border-[#e6c364]/10 rounded-sm overflow-hidden hover:border-[#e6c364]/25 transition-all duration-300 group">
      {/* ── Image ── */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={car_name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12121A]/80 via-transparent to-transparent" />

        {/* Availability badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm
            ${
              availability_status
                ? "text-[#4ade80] border-[#4ade80]/30 bg-[#0f2a1a]/80"
                : "text-[#f87171] border-[#f87171]/30 bg-[#2a1010]/80"
            }`}
          >
            ● {availability_status ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 space-y-4">
        {/* Car Name */}
        <div>
          <h3
            className="text-xl text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {car_name}
          </h3>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B6B7A] mt-1">
            {car_type}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-[#e6c364]/8">
          <div className="text-center">
            <p className="text-[9px] tracking-widest uppercase text-[#6B6B7A] mb-1">
              Monthly
            </p>
            <p className="text-sm font-semibold text-[#e6c364]">
              ${daily_rent_price}
            </p>
          </div>
          <div className="text-center border-x border-[#e6c364]/8">
            <p className="text-[9px] tracking-widest uppercase text-[#6B6B7A] mb-1">
              Bookings
            </p>
            <p className="text-sm font-semibold text-white">
              {booking_count || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[9px] tracking-widest uppercase text-[#6B6B7A] mb-1">
              Seats
            </p>
            <p className="text-sm font-semibold text-white">
              {seat_capacity} m
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {/* Edit */}
          <Link
            href={`/myAddedCars/${_id}`}
            className="flex items-center justify-center gap-1.5 py-2.5 border border-[#e6c364]/20 text-[#e6c364] text-[9px] tracking-widest uppercase hover:border-[#e6c364]/60 hover:bg-[#e6c364]/5 transition-colors rounded-sm"
          >
            <FiEdit2 size={11} />
            Edit
          </Link>

          {/* Trace/Bookings */}
          <Link
            href={`/myBookings`}
            className="flex items-center justify-center gap-1.5 py-2.5 border border-[#6B6B7A]/20 text-[#6B6B7A] text-[9px] tracking-widest uppercase hover:border-[#6B6B7A]/60 hover:bg-[#6B6B7A]/5 transition-colors rounded-sm"
          >
            <FiBarChart2 size={11} />
            Trace
          </Link>

          {/* Delete */}
          <DeleteCarBtn carId={_id} carName={car_name} />
        </div>
      </div>
    </div>
  );
};

export default MyCarCard;