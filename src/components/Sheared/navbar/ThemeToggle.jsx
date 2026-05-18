"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex items-center justify-between w-full rounded-[12px] sm:rounded-[16px] px-3 md:px-4 py-1.5 border transition-all duration-300 cursor-pointer ${
        isDark
          ? "bg-[#C9A84C]/10 border-[#C9A84C]/50"
          : "bg-[#14141B] border-white/[0.03] hover:border-[#C9A84C]/40"
      }`}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className={`p-1 md:p-2 rounded-full border shrink-0 transition-colors ${
          isDark
            ? "bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]"
            : "bg-white/[0.04] border-white/[0.05] text-[#C9A84C]"
        }`}>
          {isDark ? <FiMoon className="text-sm" /> : <FiSun className="text-sm" />}
        </div>
        <span className={`text-[7px] md:text-[11px] font-bold tracking-[0.12em] uppercase transition-colors ${
          isDark ? "text-[#C9A84C]" : "text-white/80"
        }`}>
          THEME
        </span>
      </div>

      {/* Toggle Switch */}
      <div className={`relative w-11 h-6 rounded-full border transition-all duration-300 shrink-0 ${
        isDark ? "bg-[#C9A84C]/20 border-[#C9A84C]/50" : "bg-white/10 border-white/20"
      }`}>
        <span className={`absolute left-1.5 top-1/2 -translate-y-1/2 text-[7px] font-bold transition-opacity duration-300 ${
          isDark ? "opacity-100 text-[#C9A84C]" : "opacity-0"
        }`}>D</span>
        <span className={`absolute right-1.5 top-1/2 -translate-y-1/2 text-[7px] font-bold transition-opacity duration-300 ${
          !isDark ? "opacity-100 text-white/60" : "opacity-0"
        }`}>L</span>
        <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full transition-all duration-300 shadow-sm ${
          isDark ? "left-[3px] bg-[#C9A84C]" : "left-[23px] bg-white/70"
        }`} />
      </div>
    </button>
  );
};

export default ThemeToggle;