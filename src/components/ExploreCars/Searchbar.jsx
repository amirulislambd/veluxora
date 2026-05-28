"use client";

import { useRef } from "react";

export default function SearchBar({ value, onChange }) {
  const ref = useRef(null);

  return (
    <div className="relative flex items-center justify-center group">
      <svg
        className="absolute left-3 pointer-events-none text-[#99907e] group-focus-within:text-[#e6c364] transition-colors duration-200"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
      >
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M11 11L14.5 14.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search our collection..."
        className="bg-[#1f1f25]/70 border border-[#4d4637]/70 rounded-full pl-9 pr-8 py-[9px] text-[12px] text-[#e4e1e9] placeholder:text-[#5c5548] placeholder:italic outline-none caret-[#e6c364] w-[210px] focus:w-[270px] focus:border-[#e6c364]/45 focus:bg-[#1f1f25] transition-all duration-300"
      />

      {value && (
        <button
          onClick={() => {
            onChange("");
            ref.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-3 text-[#5c5548] hover:text-[#e6c364] transition-colors duration-200 flex items-center bg-transparent border-none cursor-pointer p-0"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 2L10 10M10 2L2 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}