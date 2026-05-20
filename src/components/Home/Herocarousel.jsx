"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const cars = [
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFUClXWVSkeW1fT7CKU4_6OzVsLHTm8MH2-zVsumBksYCwdyhWfyj1QrONhJFNzDED4UwDokYHewNCRwegW4ExdYFH4mJPDQE6i9WZKoHNVlYhOt07Ujxr_OyGY8tPbd27NMe5aAjZn9MjVibEAISk1RIOzTjCbI00ZU5tCH3_ebLqleVJGnmdgtDcnFlyQI90fS4ZQpk_QGaCfoaQCDOLL5YVFN6ezGOYOjZZt1RDnWvi_sdYRExt9_YgoESBqv_3VSa_l9-NdfU", alt: "Porsche 911" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkYBi73Yd7G-dMwg8aYtOo-X7gIg3pZEMPt2Lo49XYyUKfhOBhL7bCjCuoxSFbVXNe-q1I8czCCfku1B8vBWgwTjvSm3zKcgeE_CwGHsP9pKBVYLZK5Orj-Y--Kps4VEfo1_y4MkX9so8FC9x6AHLPiTgB9fyUfoKtrQKpRf1EIbMcYiBMzyExLqEXJfduLF9hZwZhDDbr1nMMYzWTkqQJnJajnEei8tkhxUzPC_qrfri2U7-ezq1mygsaIMd6gmlcfIeIk4tGOnc", alt: "Lamborghini Huracán" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu66kohMTPfMm4RbY0dUIvqJwARBbcwVZXN8wxwxAFihJ1PGmlqIE1xSe1I1tTVHkury8c3g9Ogu3_BeR6J5v6LQuwvHA5bVgoi_z1dfRJHBJcX5-4fv2nJkiesPdQPa2tD4rbYf-hXo-uZxo6P4-bC3pm2NIg05LkOoKhfjnOsH6uou94NwXGJooww4NFdBsDj-WuvMC0-K_4ZsmGQMRltxz2Ei42_7dwnyFvbOo90vH6OeZOP1gRIMvmrvbCuCjvXEtHPqBUjeE", alt: "Aston Martin Vantage" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cars.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[700px] overflow-hidden rounded-xl" style={{ perspective: "2000px" }}>
      {cars.map((car, i) => {
        const isActive = i === current;
        const isPrev  = i === (current - 1 + cars.length) % cars.length;
        return (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-[1400ms]"
            style={{
              opacity:    isActive ? 1 : 0,
              transform:  isActive
                ? "translateX(0) rotateY(0deg) scale(1)"
                : isPrev
                ? "translateX(-60%) rotateY(25deg) scale(0.85)"
                : "translateX(60%) rotateY(-25deg) scale(0.85)",
              zIndex: isActive ? 10 : 5,
              filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <img
              src={car.src}
              alt={car.alt}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-40 rounded-xl" />
          </div>
        );
      })}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {cars.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-6 h-2 bg-[#e6c364]" : "w-2 h-2 bg-[#e6c364]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;