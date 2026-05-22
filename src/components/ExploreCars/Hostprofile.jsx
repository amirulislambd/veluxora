"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiStar, FiShield, FiAward } from "react-icons/fi";

const HostProfile = ({ host }) => {
  if (!host) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16"
    >
      {/* Section Label */}
      <div className="flex items-center gap-4 mb-10">
        <span className="h-px w-12 bg-[#e6c364]" />
        <h2 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e6c364]">
          The veluxora host
        </h2>
      </div>

      {/* Card */}
      <div className="relative border border-[#e6c364]/10 bg-[#0d0d14] overflow-hidden">
        {/* subtle corner accent */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#e6c364]/25 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#e6c364]/25 pointer-events-none" />

        <div className="flex flex-col md:flex-row">
          {/* ── LEFT: Author Photo ── */}
          <div className="relative w-full md:w-[280px] lg:w-[320px] flex-shrink-0">
            <div className="relative h-64 md:h-full min-h-[280px]">
              <Image
                src={host.image || "/placeholder-host.jpg"}
                alt={host.name}
                fill
                className="object-cover object-top"
              />
              {/* overlay gradient right → transparent for desktop */}
              <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-[#0d0d14]" />
            </div>

            {/* Verified badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#0a0a0f]/80 border border-[#e6c364]/20 px-3 py-1.5 backdrop-blur-sm">
              <FiShield className="text-[#e6c364] text-xs" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#e6c364]">
                Verified Host
              </span>
            </div>
          </div>

          {/* ── RIGHT: Description ── */}
          <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-center space-y-6">
            {/* Name + Title */}
            <div>
              <h3
                className="text-3xl md:text-4xl font-bold italic text-[#e4e1e9] leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {host.name}
              </h3>
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#e6c364] mt-2">
                {host.title || "Premium Fleet Curator"}
              </p>
            </div>

            {/* Decorative line */}
            <div className="h-px w-16 bg-[#e6c364]/30" />

            {/* Description */}
            <p className="text-[#d0c5b2] leading-relaxed text-sm md:text-base max-w-xl">
              {host.description}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                {
                  icon: <FiAward />,
                  value: host.totalListings ?? "12+",
                  label: "Vehicles Listed",
                },
                {
                  icon: <FiStar />,
                  value: host.rating ?? "4.9",
                  label: "Host Rating",
                },
                {
                  icon: <FiShield />,
                  value: host.memberSince ?? "2022",
                  label: "Member Since",
                },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="text-[#e6c364] text-base">{stat.icon}</span>
                  <div>
                    <p
                      className="text-[#e4e1e9] text-lg font-semibold leading-none"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-[#6B6B7A] mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HostProfile;