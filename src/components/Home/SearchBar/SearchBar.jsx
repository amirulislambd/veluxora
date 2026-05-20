"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    location: "Beverly Hills, CA",
    pickup:   "Oct 24, 10:00 AM",
    returnDate: "Oct 27, 04:00 PM",
    type:     "Exotic Sport",
  });

  const handleSearch = () => {
    const params = new URLSearchParams(form);
    router.push(`/explore-cars?${params.toString()}`);
  };

  return (
    <div className="relative z-20 -mt-16 max-w-[1440px] mx-auto px-4 md:px-16">
      <div className="bg-[#2a292f]/60 backdrop-blur-2xl border border-[#4d4637]/40 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

        {[
          { label: "LOCATION",  key: "location",   type: "select", options: ["Beverly Hills, CA", "Miami Beach, FL", "New York, NY"] },
          { label: "PICKUP",    key: "pickup",      type: "text" },
          { label: "RETURN",    key: "returnDate",  type: "text" },
        ].map(({ label, key, type, options }, i) => (
          <div key={key} className={`px-6 py-3 ${i < 2 ? "border-r border-[#4d4637]/30" : ""}`}>
            <label className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#e6c364] block mb-1">
              {label}
            </label>
            {type === "select" ? (
              <select
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="bg-transparent border-none p-0 text-[#e4e1e9] text-sm w-full focus:outline-none cursor-pointer"
              >
                {options.map((o) => <option key={o} className="bg-[#131318]">{o}</option>)}
              </select>
            ) : (
              <input
                type="text"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="bg-transparent border-none p-0 text-[#e4e1e9] text-sm w-full focus:outline-none"
              />
            )}
          </div>
        ))}

        <div className="px-6 flex items-center justify-between">
          <div className="w-full">
            <label className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#e6c364] block mb-1">
              TYPE
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="bg-transparent border-none p-0 text-[#e4e1e9] text-sm w-full focus:outline-none cursor-pointer"
            >
              {["Exotic Sport", "Luxury SUV", "Convertible", "Sedan"].map((o) => (
                <option key={o} className="bg-[#131318]">{o}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#e6c364] text-[#3d2e00] p-3 rounded-full ml-4 hover:opacity-90 transition-opacity"
          >
            <FiSearch className="text-lg" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchBar;