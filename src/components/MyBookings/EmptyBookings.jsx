"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EmptyBookings = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[75vh] bg-[#0b0b0d] overflow-hidden px-4">
      
 
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[500px] h-[500px] border border-[#e6c364]/5 rotate-45 flex items-center justify-center">
          <div className="w-[300px] h-[300px] border border-[#e6c364]/10 -rotate-12"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-xl w-full text-center py-16 px-8 bg-[#111115]/40 backdrop-blur-md border border-[#26242c] rounded-none"
      >
   
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#e6c364]" />


        <div className="relative flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="relative w-20 h-20 bg-[#16161c] border border-[#e6c364]/20 p-5 flex items-center justify-center"
          >
    
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-[#e6c364]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>

            <div className="absolute top-[-2px] left-[-2px] w-1 h-1 bg-[#e6c364]"></div>
            <div className="absolute top-[-2px] right-[-2px] w-1 h-1 bg-[#e6c364]"></div>
            <div className="absolute bottom-[-2px] left-[-2px] w-1 h-1 bg-[#e6c364]"></div>
            <div className="absolute bottom-[-2px] right-[-2px] w-1 h-1 bg-[#e6c364]"></div>
          </motion.div>
        </div>

        <motion.h2
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-[Playfair_Display] text-3xl md:text-4xl text-[#f3f1f5] font-medium tracking-wide mb-4"
        >
          No Active Journey
        </motion.h2>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-[Inter] text-[#6d6b75] text-[13px] md:text-[14px] max-w-sm mx-auto leading-relaxed tracking-wide mb-10"
        >
          Your current reservation queue is vacant. Explore our high-performance fleet to schedule your next premium drive.
        </motion.p>

   
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href="/exploreCars"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#e6c364] text-black font-[Inter] text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#ebd083]"
          >
            Explore Fleet
 
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 ml-2">
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmptyBookings;