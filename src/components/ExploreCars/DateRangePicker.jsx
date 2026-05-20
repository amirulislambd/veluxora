// DateRangePicker.jsx
"use client";
import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DateRangePicker = ({ dateRange, setDateRange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (d) =>
    d?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const totalDays = () => {
    if (!dateRange?.from || !dateRange?.to) return null;
    return Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)) || 1;
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] tracking-[0.3em] uppercase text-[#e6c364]">
        Select Dates
      </label>

      {/* Date display button */}
      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center gap-3 w-full bg-[#1f1d2a] rounded-xl p-4 text-left hover:ring-1 hover:ring-[#e6c364]/30 transition-all"
      >
        <LuCalendar className="text-[#e6c364] shrink-0" size={16} />
        <div className="flex-1">
          {dateRange?.from && dateRange?.to ? (
            <p className="text-sm text-[#e4e1e9]">
              {formatDate(dateRange.from)} → {formatDate(dateRange.to)}
              <span className="text-[#e6c364] ml-2">
                ({totalDays()} day{totalDays() > 1 ? "s" : ""})
              </span>
            </p>
          ) : (
            <p className="text-sm text-[#3a3848]">Pick your rental dates...</p>
          )}
        </div>
        <span className="text-[#6B6B7A] text-xs">{showCalendar ? "▲" : "▼"}</span>
      </button>

      {/* Calendar */}
      {showCalendar && (
        <div className="bg-[#1f1d2a] rounded-xl p-3 border border-[#e6c364]/10">
          <style>{`
            .rdp { --rdp-accent-color: #e6c364; --rdp-background-color: rgba(230,195,100,0.1); color: #e4e1e9; margin: 0; }
            .rdp-day_selected { background: #e6c364 !important; color: #0A0A0F !important; }
            .rdp-day_range_middle { background: rgba(230,195,100,0.15) !important; color: #e6c364 !important; }
            .rdp-day_range_start, .rdp-day_range_end { background: #e6c364 !important; color: #0A0A0F !important; }
            .rdp-caption_label { color: #e4e1e9; font-size: 13px; }
            .rdp-head_cell { color: #6B6B7A; font-size: 11px; }
            .rdp-day { color: #e4e1e9; border-radius: 6px; }
            .rdp-day:hover:not(.rdp-day_disabled) { background: rgba(230,195,100,0.2) !important; }
            .rdp-day_disabled { color: #3a3848 !important; }
            .rdp-nav_button { color: #e6c364; }
          `}</style>
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={(range) => {
              setDateRange(range);
              if (range?.from && range?.to) setShowCalendar(false);
            }}
            disabled={{ before: today }}
            numberOfMonths={1}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;