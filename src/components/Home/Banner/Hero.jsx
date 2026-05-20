import React from 'react';
import Link from 'next/link';
import HeroSlider from './HeroImage';

const heroStats = [
  { value: "200+", label: "Cars" },
  { value: "50+", label: "Cities" },
  { value: "5★", label: "Rating" },
];

const Hero = () => {
  return (
    <section className="relative  flex items-center overflow-hidden">

      {/* ── Background Slider (full bleed) ── */}
      <HeroSlider />

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/95 via-[#0A0A0F]/70 to-[#0A0A0F]/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 via-transparent to-[#0A0A0F]/30 z-10" />


      <div className="relative z-20 w-full container mx-auto px-6 md:px-16 py-24">
        <div className="max-w-xl space-y-6 md:space-y-8">


          <p className="text-[11px] font-semibold tracking-[0.4em] uppercase text-[#e6c364]">
            Premium Car Rental
          </p>


          <h1
            className="text-[52px] sm:text-[64px] md:text-[80px] leading-none tracking-tight italic text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Drive Beyond
            <br />
            Ordinary.
          </h1>

          <p className="text-sm md:text-base text-[#d0c5b2] max-w-sm leading-relaxed">
            Experience the pinnacle of automotive engineering with our curated
            collection of high-performance vehicles, tailored for the discerning driver.
          </p>

          {/* CTA */}
          <Link
            href="/exploreCars"
            className="btn-gold"
          >
            Explore Fleet
          </Link>

          {/* Stats */}
          <div className="flex items-center gap-10 pt-4 border-t border-white/10">
            {heroStats.map((stat, i) => (
              <div key={i}>
                <p
                  className="text-2xl font-bold text-[#e6c364]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#6B6B7A] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;