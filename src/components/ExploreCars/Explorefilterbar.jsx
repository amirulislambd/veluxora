"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FilterDropdown from "./Filterdropdown";
import SearchBar from "./Searchbar";

const TYPE_OPTIONS = ["All", "Hatchback", "SUV", "Sedan", "Sports", "Convertible"];
const AVAILABILITY_OPTIONS = ["All", "Available", "Unavailable"];

export default function ExploreFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [carType, setCarType] = useState(searchParams.get("type") || "All");
  const [availability, setAvailability] = useState(searchParams.get("available") || "All");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [layout, setLayout] = useState("grid");


  const debounceRef = useRef(null);

 
  const updateQueryParams = (key, value, currentParams) => {
    const params = new URLSearchParams(currentParams ?? searchParams.toString());
    
    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key); 
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleType = (v) => {
    setCarType(v);
    updateQueryParams("type", v);
  };

  const handleAvailability = (v) => {
    setAvailability(v);
    updateQueryParams("available", v);
  };
  const handleSearch = (v) => {
    setSearch(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateQueryParams("search", v);
    }, 400);
  };
  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const handleLayout = () => {
    const next = layout === "grid" ? "list" : "grid";
    setLayout(next);
  };

  const isGrid = layout === "grid";

  return (
    <div
      className="sticky top-0 z-[100] w-full border-b border-[#4d4637]/55"
      style={{
        background: "rgba(13,13,18,0.85)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-center justify-between gap-4 px-8 py-[18px] flex-wrap">
        {/* Left */}
        <div className="flex items-center gap-8 flex-wrap">
          <FilterDropdown label="Car Type" value={carType} options={TYPE_OPTIONS} onChange={handleType} />
          <div className="w-px h-7 bg-[#4d4637]/60 flex-shrink-0" />
          <FilterDropdown label="Availability" value={availability} options={AVAILABILITY_OPTIONS} onChange={handleAvailability} />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <SearchBar value={search} onChange={handleSearch} />
          <button
            onClick={handleLayout}
            title={isGrid ? "Switch to list view" : "Switch to grid view"}
            className={`w-9 h-9 rounded-[10px] border flex items-center justify-center cursor-pointer transition-all duration-200
              ${isGrid 
                ? "border-[#e6c364]/50 bg-[#e6c364]/[0.08] text-[#e6c364]" 
                : "border-[#4d4637]/70 bg-[#1f1f25]/70 text-[#99907e] hover:border-[#e6c364]/40 hover:text-[#e6c364]"
              }`}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              {isGrid ? (
                <>
                  <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
                </>
              ) : (
                <>
                  <rect x="1" y="2.5" width="14" height="2" rx="1" fill="currentColor" />
                  <rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" />
                  <rect x="1" y="11.5" width="14" height="2" rx="1" fill="currentColor" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}