"use client";

import { useState, useRef, useEffect } from "react";

export default function FilterDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex flex-col gap-[3px]">
      <span className="text-[10px] tracking-[0.13em] font-medium text-[#99907e] uppercase select-none">
        {label}
      </span>

      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-[#e4e1e9] bg-transparent border-none p-0 cursor-pointer hover:text-[#e6c364] transition-colors duration-200"
      >
        {value}
        <svg
          width="11" height="11" viewBox="0 0 12 12" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.22s ease" }}
        >
          <path d="M2 4.5L6 8.5L10 4.5" stroke="#e6c364" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+10px)] left-0 z-[200] min-w-[170px] rounded-[14px] overflow-hidden border border-[#e6c364]/20 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
          style={{ background: "rgba(15,15,19,0.97)", backdropFilter: "blur(20px)", animation: "dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }`}</style>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex items-center justify-between w-full px-4 py-[11px] text-[12px] text-left border-none bg-transparent cursor-pointer transition-all duration-150
                ${opt === value
                  ? "text-[#e6c364] font-semibold bg-[#e6c364]/[0.06]"
                  : "text-[#d0c5b2] font-normal hover:bg-[#e6c364]/[0.05] hover:text-[#e4e1e9]"
                }`}
            >
              {opt}
              {opt === value && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="#e6c364" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}