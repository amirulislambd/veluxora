"use client";
import { useRef } from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiArrowRight as FiArrow } from "react-icons/fi";

const FleetScroll = ({ cars }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -520 : 520, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Nav Buttons */}
      <div className="absolute right-16 -top-20 flex gap-4 z-10">
        <button
          onClick={() => scroll("left")}
          className="w-12 h-12 rounded-full border border-[#4d4637] flex items-center justify-center hover:bg-[#e6c364] hover:text-[#3d2e00] hover:border-[#e6c364] transition-all text-[#e4e1e9]"
        >
          <FiArrowLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-12 h-12 rounded-full border border-[#4d4637] flex items-center justify-center hover:bg-[#e6c364] hover:text-[#3d2e00] hover:border-[#e6c364] transition-all text-[#e4e1e9]"
        >
          <FiArrowRight />
        </button>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-4 md:px-16 overflow-x-auto pb-10 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        {cars?.map((car) => (
          <div key={car._id} className="min-w-[480px] group cursor-pointer flex-shrink-0">
            <div className="relative overflow-hidden rounded-xl border border-[#4d4637]/30 mb-6 bg-[#1b1b20]">
              <img
                src={car.imageURL}
                alt={car.carName}
                className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-[#e6c364] text-[#3d2e00] px-4 py-1 rounded-full text-[12px] font-bold tracking-wider">
                ${car.dailyRent}/day
              </div>
              {!car.availability && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-white/60 border border-white/20 px-4 py-2 rounded-full">
                    Unavailable
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className="text-2xl font-semibold text-[#e4e1e9] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {car.carName}
                </h3>
                <div className="flex gap-4 text-[#d0c5b2] text-[11px] font-semibold tracking-widest uppercase">
                  <span>{car.carType}</span>
                  <span>{car.seatCapacity} Seats</span>
                  <span>{car.location}</span>
                </div>
              </div>
              <Link
                href={`/cars/${car._id}`}
                className="text-[#e6c364] hover:translate-x-2 transition-transform"
              >
                <FiArrow className="text-xl" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetScroll;