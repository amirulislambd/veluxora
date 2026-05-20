"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const cars = [
    {
      id: 1,
      name: "Porsche 911 Carrera",
      type: "Sports",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=90",
    },
    {
      id: 2,
      name: "BMW M5 Competition",
      type: "Sedan",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=90",
    },
    {
      id: 3,
      name: "Mercedes AMG GT", 
      type: "Luxury",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=90",
    },
    {
      id: 4,
      name: "Lamborghini Huracán",
      type: "Sports",
      image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1600&q=90",
    },
    {
      id: 5,
      name: "Aston Martin DB11",
      type: "Luxury",
      image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1600&q=90",
    },
    
    {
      id: 6,
      name: "Ferrari Roma",
      type: "Sports",
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1600&q=90",
    },
    {
      id: 7,
      name: "Range Rover Autobiography",
      type: "SUV",
      image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=1600&q=90",
    },
    {
      id: 8,
      name: "Rolls Royce Ghost",
      type: "Luxury",
      image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1600&q=90",
    },
    {
      id: 9,
      name: "Tesla Model S Plaid",
      type: "Electric",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1600&q=90",
    },
    {
      id: 10,
      name: "Bentley Continental GT",
      type: "Luxury",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&q=90",
    },
  ];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide — 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cars.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ── Full screen background ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={cars[current].id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08, x: 60 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              transition: {
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 6, ease: "easeOut" }, 
                x: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }, 
              },
            }}
            exit={{
              opacity: 0,
              x: -40,
              transition: {
                opacity: { duration: 0.8, ease: "easeIn" },
                x: { duration: 0.8 },
              },
            }}
          >
            <Image
              src={cars[current].image}
              alt={cars[current].name}
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Top shadow vignette ── */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0F] to-transparent z-10" />

        {/* ── Bottom shadow ── */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10" />
      </div>

      {/* ── Car name + Dots — bottom right ── */}
      <div className="absolute bottom-10 right-6 md:right-16 z-30 text-right">

        {/* Car name animated */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cars[current].id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#e6c364] mb-1">
              {cars[current].type}
            </p>
            <p
              className="text-lg md:text-2xl text-white/90"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {cars[current].name}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex items-center justify-end gap-2 mt-4">
          {cars.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full
                ${i === current
                  ? "w-7 h-1.5 bg-[#e6c364]"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-[#e6c364]/50"
                }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSlider;