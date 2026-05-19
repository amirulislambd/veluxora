"use client";

import { useState } from "react";
import Image from "next/image";

export default function UpdateCollection({car}) {
  const [availability, setAvailability] = useState(true);
  const [dailyRate, setDailyRate] = useState("1250");

  const [vehicle, setVehicle] = useState({
    make: "Porsche",
    model: "911 GT3",
    year: "2023",
    colorway: "GT Silver Metallic",
  });

  const [specs, setSpecs] = useState({
    horsepower: "502",
    topSpeed: "197",
    zeroToSixty: "3.2",
  });

  const handleVehicleChange = (field, value) => {
    setVehicle((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpecChange = (field, value) => {
    setSpecs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">
      {/* Header */}
      <div className="px-6 pt-5 pb-2 flex items-center justify-between">
        <button className="flex items-center gap-2 text-[#c9a84c] text-xs font-bold tracking-[0.18em] uppercase hover:opacity-80 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8L10 13"
              stroke="#c9a84c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Edit Collection
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#3a3a3a] hover:border-[#c9a84c] transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="#888" strokeWidth="1.5" />
            <path
              d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42"
              stroke="#888"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[240px] bg-[#111] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              `url(${car})`,
          }}
        />
        {/* Subtle dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/30" />

        {/* Change Photo Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="flex items-center gap-2 bg-[#c9a84c] text-[#1a1a1a] text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full hover:bg-[#e0bc6a] transition-colors shadow-lg">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="2.5" stroke="#1a1a1a" strokeWidth="1.3" />
              <rect
                x="1"
                y="3"
                width="11"
                height="8"
                rx="1.5"
                stroke="#1a1a1a"
                strokeWidth="1.3"
              />
              <path d="M4.5 3L5.5 1.5H7.5L8.5 3" stroke="#1a1a1a" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            Change Photo
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-4 pb-8 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4">
          {/* Vehicle Identity */}
          <div className="bg-[#232323] rounded-2xl p-5">
            <h2 className="text-[#c9a84c] font-serif text-lg font-semibold mb-5">
              Vehicle Identity
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {/* Make */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.14em] text-[#666] uppercase mb-1.5">
                  Make
                </label>
                <input
                  type="text"
                  value={vehicle.make}
                  onChange={(e) => handleVehicleChange("make", e.target.value)}
                  className="w-full bg-[#2d2d2d] text-white text-sm px-3 py-2.5 rounded-lg border border-transparent focus:border-[#c9a84c] focus:outline-none transition-colors"
                />
              </div>
              {/* Model */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.14em] text-[#666] uppercase mb-1.5">
                  Model
                </label>
                <input
                  type="text"
                  value={vehicle.model}
                  onChange={(e) => handleVehicleChange("model", e.target.value)}
                  className="w-full bg-[#2d2d2d] text-white text-sm px-3 py-2.5 rounded-lg border border-transparent focus:border-[#c9a84c] focus:outline-none transition-colors"
                />
              </div>
              {/* Year */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.14em] text-[#666] uppercase mb-1.5">
                  Year
                </label>
                <input
                  type="text"
                  value={vehicle.year}
                  onChange={(e) => handleVehicleChange("year", e.target.value)}
                  className="w-full bg-[#2d2d2d] text-white text-sm px-3 py-2.5 rounded-lg border border-transparent focus:border-[#c9a84c] focus:outline-none transition-colors"
                />
              </div>
              {/* Colorway */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.14em] text-[#666] uppercase mb-1.5">
                  Colorway
                </label>
                <input
                  type="text"
                  value={vehicle.colorway}
                  onChange={(e) => handleVehicleChange("colorway", e.target.value)}
                  className="w-full bg-[#2d2d2d] text-white text-sm px-3 py-2.5 rounded-lg border border-transparent focus:border-[#c9a84c] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Performance Specs */}
          <div className="bg-[#232323] rounded-2xl p-5">
            <h2 className="text-[#c9a84c] font-serif text-lg font-semibold mb-5">
              Performance Specs
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Horsepower */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.14em] text-[#666] uppercase mb-1.5">
                  Horsepower
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={specs.horsepower}
                    onChange={(e) => handleSpecChange("horsepower", e.target.value)}
                    className="w-full bg-[#2d2d2d] text-white text-sm px-3 py-2.5 pr-10 rounded-lg border border-transparent focus:border-[#c9a84c] focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#555] font-bold tracking-wider uppercase">
                    HP
                  </span>
                </div>
              </div>
              {/* Top Speed */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.14em] text-[#666] uppercase mb-1.5">
                  Top Speed
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={specs.topSpeed}
                    onChange={(e) => handleSpecChange("topSpeed", e.target.value)}
                    className="w-full bg-[#2d2d2d] text-white text-sm px-3 py-2.5 pr-12 rounded-lg border border-transparent focus:border-[#c9a84c] focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#555] font-bold tracking-wider uppercase">
                    MPH
                  </span>
                </div>
              </div>
              {/* 0-60 MPH */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.14em] text-[#666] uppercase mb-1.5">
                  0–60 MPH
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={specs.zeroToSixty}
                    onChange={(e) => handleSpecChange("zeroToSixty", e.target.value)}
                    className="w-full bg-[#2d2d2d] text-white text-sm px-3 py-2.5 pr-10 rounded-lg border border-transparent focus:border-[#c9a84c] focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#555] font-bold tracking-wider uppercase">
                    SEC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4">
          {/* Availability */}
          <div className="bg-[#232323] rounded-2xl p-5">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-white font-semibold text-base">Availability</h2>
              {/* Toggle */}
              <button
                onClick={() => setAvailability((v) => !v)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                  availability ? "bg-[#c9a84c]" : "bg-[#3a3a3a]"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                    availability ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-[#666] text-xs mb-5">Live in fleet</p>

            <label className="block text-[10px] font-bold tracking-[0.14em] text-[#666] uppercase mb-2">
              Daily Rate
            </label>
            <div className="flex items-center bg-[#2d2d2d] rounded-lg px-3 py-2.5 border border-transparent focus-within:border-[#c9a84c] transition-colors">
              <span className="text-[#666] text-sm mr-2">$</span>
              <input
                type="text"
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm focus:outline-none min-w-0"
              />
              <span className="text-[#555] text-xs font-bold tracking-wider">USD</span>
            </div>
          </div>

          {/* Action Buttons */}
          <button className="w-full bg-[#c9a84c] hover:bg-[#e0bc6a] text-[#1a1a1a] text-[11px] font-bold tracking-[0.15em] uppercase py-3.5 rounded-xl transition-colors shadow-md">
            Save Changes
          </button>
          <button className="w-full bg-transparent border border-[#3a3a3a] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] text-[11px] font-bold tracking-[0.15em] uppercase py-3.5 rounded-xl transition-colors">
            Remove from Fleet
          </button>
        </div>
      </div>
    </div>
  );
}