"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ExploreCarsCard from "./ExploreCarsCard";

export default function CarGrid({ allCars, user }) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const available = searchParams.get("available") || "";

  const filtered = useMemo(() => {
    return allCars.filter((car) => {
      // Search filter (car_name case-insensitive)
      if (search && !car.car_name?.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      // Type filter
      if (type && type !== "All" && car.car_type !== type) {
        return false;
      }

      // Availability filter
      if (available === "Available" && car.availability_status !== true) {
        return false;
      }
      if (available === "Unavailable" && car.availability_status !== false) {
        return false;
      }

      return true;
    });
  }, [allCars, search, type, available]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#e6c364]/40"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M8 11H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-[#99907e] text-base">
          No cars match your current filters.
        </p>
        <p className="text-[#5c5548] text-sm">
          Try adjusting your search or clearing the filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto p-4">
      {filtered.map((car) => (
        <ExploreCarsCard car={car} key={car._id} user={user} />
      ))}
    </div>
  );
}
