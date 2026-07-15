/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";

export default function EndingScreen() {
  return (
    <div
      id="ending-section"
      className="py-28 px-4 flex flex-col items-center justify-center text-center bg-radial from-pink-50/40 via-purple-50/20 to-transparent relative overflow-hidden"
    >
      {/* Sparkly decorative elements */}
      <div className="absolute top-1/3 left-10 text-pink-300 pointer-events-none animate-pulse">
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-1/3 right-10 text-purple-300 pointer-events-none animate-pulse duration-[3000ms]">
        <Sparkles size={20} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-xl relative z-10 flex flex-col items-center"
      >
        {/* Soft Beating Heart Visual */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1, 1.15, 1],
            filter: [
              "drop-shadow(0 0 10px rgba(244,114,182,0.4))",
              "drop-shadow(0 0 25px rgba(244,114,182,0.7))",
              "drop-shadow(0 0 10px rgba(244,114,182,0.4))",
            ],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-pink-500 mb-10 w-24 h-24 flex items-center justify-center"
          id="beating-heart-container"
        >
          <Heart size={80} className="fill-pink-500 text-pink-500" />
        </motion.div>

        {/* Primary Closing Quote */}
        <p className="font-serif italic text-2xl sm:text-3xl text-pink-600 font-bold mb-4 leading-relaxed">
          "Thank you for being such a wonderful person."
        </p>

        {/* Secondary Blessing */}
        <p className="font-sans text-sm sm:text-base text-slate-500 leading-relaxed tracking-wide max-w-md mx-auto mb-12">
          May your year be filled with love, laughter, peace, and beautiful memories.
        </p>

        {/* Made with Love credit line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex items-center gap-1.5 font-sans text-xs tracking-widest text-slate-400 uppercase border-t border-pink-100/30 pt-6 px-12"
          id="credits"
        >
          <Heart size={12} className="fill-pink-400 text-pink-400 animate-pulse" />
          <span>Made with love</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
