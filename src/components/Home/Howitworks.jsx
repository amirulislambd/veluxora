"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Select Your Drive",
    desc: "Browse our curated collection of supercars and luxury SUVs through our mobile-first booking platform.",
    offset: false,
  },
  {
    num: "02",
    title: "Instant Verification",
    desc: "A streamlined digital check-in process that verifies your credentials in minutes, not hours.",
    offset: true,
  },
  {
    num: "03",
    title: "Arrival & Ignition",
    desc: "Your vehicle arrives detailed and ready. One short walkthrough and the keys are yours to keep.",
    offset: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

const HowItWorks = () => {
  return (
    <section className="py-16  px-3">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0 mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <h2
            className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-semibold leading-tight tracking-tight text-[#e4e1e9] lg:max-w-md flex-shrink-0"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Journey Starts Here.
          </h2>

          <motion.div
            className="h-px flex-grow mx-0 lg:mx-12 hidden lg:block origin-left"
            style={{ background: "#4d4637", opacity: 0.3 }}
            variants={lineVariants}
          />

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="self-start lg:self-auto flex-shrink-0"
          >
            <Link
              href="/register"
              className="inline-block border border-[#e6c364] text-[#e6c364] text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-3 md:px-10 md:py-4 rounded-full hover:bg-[#e6c364] hover:text-[#3d2e00] transition-all duration-300"
            >
              View Membership
            </Link>
          </motion.div>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Connector line — desktop only */}
          <motion.div
            className="absolute hidden md:block h-px w-full opacity-20 pointer-events-none origin-left"
            style={{
              top: "40px",
              background:
                "linear-gradient(90deg, transparent 0%, #e6c364 50%, transparent 100%)",
            }}
            variants={lineVariants}
          />

          {steps.map(({ num, title, desc, offset }, index) => (
            <motion.div
              key={num}
              variants={stepVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className={`relative z-10 flex md:block gap-5 md:gap-0 md:space-y-6 group cursor-default ${
                offset ? "md:pt-24" : ""
              }`}
            >
              {/* Mobile vertical connector */}
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[22px] top-[56px] w-px h-[calc(100%+40px)] opacity-20 md:hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, #e6c364 0%, transparent 100%)",
                  }}
                />
              )}

              {/* Step number */}
              <motion.div
                className="text-[48px] sm:text-[56px] md:text-[72px] font-bold leading-none flex-shrink-0 w-16 sm:w-20 md:w-auto"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#e6c364",
                }}
                whileHover={{
                  scale: 1.08,
                  color: "#fff4cc",
                  transition: { duration: 0.25 },
                }}
              >
                {num}
              </motion.div>

              {/* Content */}
              <div className="space-y-2 md:space-y-4 pt-1 md:pt-0">
                <motion.h4
                  className="text-lg sm:text-xl md:text-2xl font-semibold text-[#e4e1e9] transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </motion.h4>

                {/* Animated underline */}
                <motion.div
                  className="h-px bg-[#e6c364] origin-left"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 0.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                <p className="text-sm sm:text-base text-[#d0c5b2] leading-relaxed transition-colors duration-300 group-hover:text-[#e8ddc8]">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
