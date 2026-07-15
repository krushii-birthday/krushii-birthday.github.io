/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Star, Moon, Heart } from "lucide-react";
import { config } from "../config";

interface SkyStar {
  id: number;
  wish: string;
  revealed: boolean;
  top: string;
  left: string;
  scale: number;
}

export default function WishesInSky() {
  const [stars, setStars] = useState<SkyStar[]>(() => {
    // Standard coordinates to keep stars spaced elegantly but feel random
    const coords = [
      { top: "20%", left: "15%" },
      { top: "35%", left: "45%" },
      { top: "15%", left: "75%" },
      { top: "65%", left: "10%" },
      { top: "75%", left: "35%" },
      { top: "50%", left: "80%" },
      { top: "70%", left: "68%" },
      { top: "45%", left: "22%" },
    ];

    return config.wishes.map((w, i) => ({
      ...w,
      top: coords[i % coords.length].top,
      left: coords[i % coords.length].left,
      scale: Math.random() * 0.4 + 0.8, // 0.8 to 1.2
    }));
  });

  const [selectedStarId, setSelectedStarId] = useState<number | null>(null);

  const handleStarClick = (id: number) => {
    setSelectedStarId(id);
    setStars((prev) =>
      prev.map((s) => (s.id === id ? { ...s, revealed: true } : s))
    );
  };

  const selectedStar = stars.find((s) => s.id === selectedStarId);

  return (
    <div id="wishes-sky-section" className="py-20 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2 block">
          Cosmic Wishes
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-slate-800 font-bold flex items-center justify-center gap-2">
          Wishes in the Sky
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-400 mt-2 max-w-sm mx-auto">
          Tethered to the heavens, each star holds a beautiful secret wish for you. Tap them to illuminate their truth.
        </p>
      </motion.div>

      {/* Starry Sky Canvas Card */}
      <div
        className="relative w-full max-w-2xl h-96 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 rounded-3xl border border-indigo-900/40 shadow-[0_20px_50px_rgba(30,41,59,0.5)] overflow-hidden"
        id="sky-canvas"
      >
        {/* Sky Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Small Crescent Moon */}
        <div className="absolute top-8 right-10 flex items-center gap-2 text-indigo-200/45 select-none pointer-events-none">
          <Moon size={28} className="fill-indigo-100/10" />
        </div>

        {/* Background stars (non-interactive tiny pixels) */}
        {Array.from({ length: 40 }).map((_, i) => {
          const top = `${Math.random() * 100}%`;
          const left = `${Math.random() * 100}%`;
          const delay = `${Math.random() * 5}s`;
          return (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-ping"
              style={{
                top,
                left,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: delay,
              }}
            />
          );
        })}

        {/* Big Interactive Stars */}
        {stars.map((star) => (
          <motion.button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              scale: star.scale,
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -4, 0, -2, 0],
              filter: star.revealed
                ? "drop-shadow(0 0 12px rgba(253,224,71,0.9))"
                : "drop-shadow(0 0 4px rgba(253,224,71,0.4))",
            }}
            transition={{
              y: {
                duration: 3 + (star.id % 3),
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className={`p-1.5 rounded-full cursor-pointer transition-all ${
              star.revealed
                ? "text-yellow-300"
                : "text-slate-400 hover:text-yellow-200"
            }`}
            id={`star-btn-${star.id}`}
            title={`Wish Star #${star.id}`}
          >
            <Star
              size={star.revealed ? 24 : 18}
              className={star.revealed ? "fill-yellow-300" : "fill-slate-600/30"}
            />
          </motion.button>
        ))}

        {/* Overlay showing instruction when sky is empty of open wishes */}
        {!selectedStarId && (
          <div className="absolute inset-x-0 bottom-6 text-center select-none pointer-events-none">
            <span className="font-mono text-[10px] text-indigo-300/60 uppercase tracking-widest animate-pulse">
              ★ Tap any shining star ★
            </span>
          </div>
        )}

        {/* Modal Reveal Container inside the sky box */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8 p-6 bg-white/10 dark:bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between"
              id="star-wish-popup"
            >
              {/* Top Row info */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif italic text-yellow-300 text-xs tracking-widest uppercase flex items-center gap-1.5">
                  <Sparkles size={14} /> Star Wish #{selectedStar.id}
                </span>
                <button
                  onClick={() => setSelectedStarId(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close Wish"
                  id="close-wish-popup-btn"
                >
                  Close
                </button>
              </div>

              {/* Message text */}
              <p className="font-sans text-sm sm:text-base text-slate-100 font-medium leading-relaxed italic pr-6 select-text">
                "{selectedStar.wish}"
              </p>

              {/* Micro love details */}
              <div className="flex items-center justify-end text-[10px] text-pink-400 gap-1.5 mt-3 select-none">
                <span>With Love</span>
                <Heart size={10} className="fill-pink-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
