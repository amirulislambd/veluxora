"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";

const EmptyMyCars = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-32 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-24 h-24 rounded-full bg-[#12121A] border border-[#e6c364]/15 flex items-center justify-center mb-8"
      >
        <FiPlusCircle className="text-[#e6c364]/40" size={36} />
      </motion.div>
      <h2 className="text-3xl text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
        No Cars Listed
      </h2>
      <p className="text-[#6B6B7A] text-sm tracking-wider max-w-xs leading-relaxed mb-8">
        You haven't listed any vehicles yet. Add your first car to start earning.
      </p>
      <Link href="/addCar" className="btn-gold">
        Add Your First Car →
      </Link>
    </motion.div>
  );
};

export default EmptyMyCars;