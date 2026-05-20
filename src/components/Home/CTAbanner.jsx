"use client";

import { motion } from "framer-motion";

export default function CTAbanner() {
  const imageUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDOyfE87mS9A78wUR-WN54K_D1SU8arv35Eq3T1JC6gIwEGpm5J9AEgZ2XmkPKljM22NTUZHS-Mw74pUkPRtv7hvf4lCM2jIjR-JiNqS5m2R_0lBlm2xPdemXplstrdNxwsT3oktNaSKa_kTQkdp3SDEVvueDWgaNPg0c9w1t4kh9Uj1u0L2PaZ-mBp97hFO5VJCCPYFwy7oYqw9QzvJJZo2H3xUit28zQOAKk9Rru5H84Pze2g26YSF_jLHJl7EbVg93AzG2UHA00";

  return (
    <section className="w-full px-4 py-6 bg-[#1a1a1a]">

      {/* Card — scale + fade in on scroll into view */}
      <motion.div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ minHeight: "300px" }}
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Background Image — subtle zoom out on enter */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/60 to-[#1a1a1a]/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 min-h-[300px]">

          {/* Headline — fade up */}
          <motion.h2
            className="text-white font-serif text-3xl md:text-4xl font-bold leading-tight max-w-lg mb-8 drop-shadow-lg"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            The Road is Yours. Are You Ready to Start?
          </motion.h2>

          {/* Button — fade up + hover scale + tap */}
          <motion.button
            className="bg-[#c9a84c] text-[#1a1a1a] text-xs font-bold tracking-[0.18em] uppercase px-8 py-3.5 rounded-full shadow-lg shadow-black/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            whileHover={{ scale: 1.05, backgroundColor: "#e0bc6a" }}
            whileTap={{ scale: 0.96 }}
          >
            Reserve Your Dates
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}