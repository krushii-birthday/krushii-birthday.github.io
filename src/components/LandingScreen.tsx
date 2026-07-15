/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Gift, Heart, Sparkles } from "lucide-react";
import { config } from "../config";
import confetti from "canvas-confetti";

interface LandingScreenProps {
  onOpen: () => void;
}

export default function LandingScreen({ onOpen }: LandingScreenProps) {
  const triggerConfetti = () => {
    // Launch initial sweet, pastel colored confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#fbcfe8", "#f472b6", "#e9d5ff", "#c084fc", "#fffbeb"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#fbcfe8", "#f472b6", "#e9d5ff", "#c084fc", "#fffbeb"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const handleOpenClick = () => {
    triggerConfetti();
    onOpen();
  };

  return (
    <div
      id="landing-screen"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-radial from-pink-100/50 via-lavender-100/40 to-cream-50/50 text-slate-800 px-6"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl animate-pulse duration-[8000ms] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse duration-[10000ms] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-xl px-8 py-12 bg-white/40 dark:bg-pink-50/30 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(251,207,232,0.25)] rounded-3xl"
      >
        {/* Magic top sparkle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="inline-block text-pink-400 mb-4"
        >
          <Sparkles size={28} className="drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-pink-600 font-bold tracking-tight mb-2 leading-tight"
        >
          🎂 Happy Birthday,
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl text-purple-600 font-bold tracking-wide mb-8 drop-shadow-sm"
        >
          {config.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.3, duration: 1.5 }}
          className="font-sans text-sm sm:text-base text-slate-500 tracking-wider mb-12 max-w-sm mx-auto uppercase leading-relaxed"
        >
          A beautiful little sanctuary dedicated to a truly wonderful soul.
        </motion.p>

        {/* Glowing "Open Your Gift" Button */}
        <motion.button
          onClick={handleOpenClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            delay: 1.8,
            duration: 1,
            scale: { duration: 0.2 },
            tap: { duration: 0.1 },
          }}
          className="relative group inline-flex items-center gap-3 px-8 py-4 font-sans font-medium text-white bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 rounded-full shadow-[0_10px_30px_rgba(244,114,182,0.4)] hover:shadow-[0_12px_40px_rgba(244,114,182,0.6)] cursor-pointer overflow-hidden transition-all duration-300"
          id="open-gift-btn"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />

          <Gift size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="tracking-wide">Open Your Gift</span>
          <Heart size={16} className="fill-white animate-pulse" />
        </motion.button>
      </motion.div>

      {/* Floating Sparkles decorative */}
      <div className="absolute top-1/3 right-1/4 text-pink-300/40 pointer-events-none animate-bounce duration-[3000ms]">
        <Sparkles size={20} />
      </div>
      <div className="absolute bottom-1/4 left-1/5 text-purple-300/30 pointer-events-none animate-bounce duration-[4000ms]">
        <Sparkles size={16} />
      </div>
    </div>
  );
}
