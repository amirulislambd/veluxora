"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiShield, FiAward, FiCalendar, FiMail } from "react-icons/fi";

const HostProfile = ({ host }) => {
  if (!host) return null;

  const memberYear = host.created_at
    ? new Date(host.created_at).getFullYear()
    : "2024";

  const memberMonth = host.created_at
    ? new Date(host.created_at).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20"
    >
      {/* Section Label */}
      <div className="flex items-center gap-4 mb-10">
        <span className="h-px w-12 bg-[#e6c364]" />
        <h2 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e6c364]">
          The Veluxora Host
        </h2>
        <span className="h-px flex-1 bg-[#e6c364]/10" />
      </div>

      {/* Outer glow wrapper */}
      <div className="relative">
        {/* Background glow */}
        <div
          className="absolute -inset-px rounded-none pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #e6c364/8 0%, transparent 50%, #e6c364/5 100%)",
          }}
        />

        {/* Main Card */}
        <div className="relative border border-[#e6c364]/15 bg-[#0b0b12] overflow-hidden">
          {/* Top gold shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e6c364]/50 to-transparent" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#e6c364]/30 pointer-events-none z-10" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#e6c364]/30 pointer-events-none z-10" />

          {/* Subtle diagonal texture */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #e6c364 0px, #e6c364 1px, transparent 1px, transparent 12px)",
            }}
          />

          <div className="flex flex-col md:flex-row">
            {/* ── LEFT: Photo Panel ── */}
            <div className="relative w-full md:w-[260px] lg:w-[300px] flex-shrink-0">
              <div className="relative h-72 md:h-full min-h-[320px]">
                <Image
                  src={host.owner_image || "/placeholder-host.jpg"}
                  alt={host.owner_name}
                  fill
                  className="object-cover object-top"
                />
                {/* Dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12]/60 via-transparent to-[#0b0b12]/20" />
                {/* Right fade into card */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0b0b12] hidden md:block" />
              </div>

              {/* Verified badge */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-[#0a0a0f]/85 border border-[#e6c364]/25 px-3 py-2 backdrop-blur-md z-10">
                <FiShield className="text-[#e6c364] text-xs" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#e6c364] font-medium">
                  Verified Host
                </span>
              </div>
            </div>

            {/* ── RIGHT: Info ── */}
            <div className="flex-1 px-8 py-10 md:px-10 lg:px-14 lg:py-12 flex flex-col justify-center space-y-6">
              {/* Name */}
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-4xl md:text-5xl font-bold italic text-[#e4e1e9] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {host.owner_name}
                </motion.h3>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#e6c364] mt-2 font-medium">
                  Premium Fleet Curator
                </p>
              </div>

              {/* Gold divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                className="h-px w-20 bg-gradient-to-r from-[#e6c364] to-transparent origin-left"
              />

              {/* Description */}
              <p className="text-[#c8bcaa] leading-relaxed text-sm md:text-base max-w-lg italic">
                "
                {host.description ||
                  "A dedicated curator of premium vehicles, committed to delivering an unmatched luxury rental experience on Veluxora."}
                "
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  {
                    icon: <FiAward className="text-lg" />,
                    value: host.totalListings ?? "—",
                    label: "Cars Listed",
                  },
                  {
                    icon: <FiCalendar className="text-lg" />,
                    value: memberYear,
                    label: "Member Since",
                  },
                  {
                    icon: <FiShield className="text-lg" />,
                    value: host.booking_count ?? "0",
                    label: "Total Bookings",
                  },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-start gap-2 border border-[#e6c364]/10 bg-[#0d0d16] px-4 py-4 hover:border-[#e6c364]/25 transition-colors duration-300"
                  >
                    <span className="text-[#e6c364]">{stat.icon}</span>
                    <p
                      className="text-[#e4e1e9] text-2xl font-bold leading-none"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-[#6B6B7A]">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Email row */}
              {host.owner_email && (
                <div className="flex items-center gap-2 pt-1">
                  <FiMail className="text-[#e6c364] text-xs flex-shrink-0" />
                  <span className="text-[11px] tracking-wider text-[#6B6B7A]">
                    {host.owner_email}
                  </span>
                  {memberMonth && (
                    <>
                      <span className="text-[#e6c364]/20 mx-1">·</span>
                      <span className="text-[11px] tracking-wider text-[#6B6B7A]">
                        Joined {memberMonth}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom shimmer */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e6c364]/20 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default HostProfile;