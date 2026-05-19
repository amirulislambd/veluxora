"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const FleetCarCard = ({ car }) => {
  const [isHovered, setIsHovered] = useState(false);


  const {
    _id,
    car_name,
    car_type,
    daily_rent_price,
    image,
    seat_capacity,
    availability_status,
    booking_count
  } = car;

 
  let statusText = "Active";
  let statusClass = "text-[#e6c364] border-[#e6c364]/30 bg-[#161512]/80";

  if (booking_count > 0) {
    statusText = "Currently Rented";
    statusClass = "text-[#99907e] border-[#99907e]/20 bg-[#111115]/90";
  } else if (!availability_status) {
    statusText = "Maintenance";
    statusClass = "text-orange-400 border-orange-500/20 bg-orange-950/40";
  }

  return (
    <div
      className={`
        relative rounded-xl  w-full max-w-[400px] flex flex-col h-full
        bg-[#111115] border border-yellow-500/40 overflow-hidden shadow-2xl
        transition-all duration-500 ease-out
        ${isHovered ? "border-[#e6c364]/30 shadow-xl shadow-black/60" : "border-[#26242c]"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
     
      <div className="relative  aspect-[16/10] w-full bg-[#16161c] overflow-hidden">
        <div className="relative w-full h-full transition-transform duration-700 ease-out hover:scale-105">
          <Image 
            src={image || "https://i.ibb.co/q3Q432S7/4.png"} 
            alt={car_name} 
            fill 
            className="object-cover"
            priority
          />
        </div>

       
        <span className={`absolute top-4 right-4 z-20 px-3 py-1 text-[11px] font-[Inter] font-medium tracking-wide border rounded-full shadow-lg backdrop-blur-sm ${statusClass}`}>
          {statusText}
        </span>
      </div>

    
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow gap-6">
        
     
        <div className="flex flex-col gap-3">
          <h3 className="font-[Playfair_Display] text-3xl text-[#e6c364] font-medium tracking-wide capitalize">
            {car_name}
          </h3>
      
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 pt-1 bg-[#16161c] border border-[#26242c] text-[9px] font-[Inter] font-mono tracking-wider text-[#99907e] uppercase">
              {car_type || "V8 TURBO"}
            </span>
            <span className="px-2.5 py-1 bg-[#16161c] border border-[#26242c] text-[9px] font-[Inter] font-mono tracking-wider text-[#99907e] uppercase">
              {seat_capacity ? `${seat_capacity} SEATS` : "710 HP"}
            </span>
            <span className="px-2.5 py-1 bg-[#16161c] border border-[#26242c] text-[9px] font-[Inter] font-mono tracking-wider text-[#99907e] uppercase">
              RWD
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 ">
          <span className="font-[Playfair_Display] text-xl text-[#e6c364] font-light">$</span>
          <span className="font-[Playfair_Display] text-3xl font-semibold text-[#f3f1f5] tracking-wide">
            {daily_rent_price?.toLocaleString() || "1,850"}
          </span>
          <span className="font-[Inter] text-[10px] text-[#6d6b75] tracking-widest font-medium ml-1">
            / DAY
          </span>
        </div>

      
        <div className="grid grid-cols-2 gap-3 ">
        
        <Link href={`/exploreCars/${_id}`}>
        <button className="w-full py-3 bg-transparent rounded-full border border-[#e6c364]/30 text-[#e6c364] font-[Inter] text-[10px] font-medium tracking-widest uppercase transition-all duration-300 hover:bg-[#e6c364]/5 hover:border-[#e6c364] cursor-pointer text-center">
            View Details
          </button>
        </Link>
          
          
          <button className="w-full py-3 bg-yellow-500 rounded-full text-black font-[Inter] text-[10px] font-bold tracking-widest uppercase transition-all duration-300 hover:bg-yellow-400 shadow-lg shadow-[#e6c364]/10 cursor-pointer text-center">
            Reserve Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default FleetCarCard;