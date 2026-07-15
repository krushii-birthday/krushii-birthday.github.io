/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { config } from "../config";

export default function ReasonsCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div id="reasons-section" className="py-20 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">
          Why You Are Cherished
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-slate-800 font-bold flex items-center justify-center gap-2">
          Reasons Why You're Amazing
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
          Just a few simple reminders of the beautiful light you carry and bring to our world.
        </p>
      </motion.div>

      {/* Grid of Reasons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        id="reasons-grid"
      >
        {config.reasons.map((reason, idx) => {
          // Dynamic gradient accents based on index
          const gradients = [
            "from-pink-500/10 to-rose-500/5 hover:border-pink-300",
            "from-purple-500/10 to-lavender-500/5 hover:border-purple-300",
            "from-amber-500/10 to-orange-500/5 hover:border-amber-300",
            "from-rose-500/10 to-pink-500/5 hover:border-rose-300",
          ];
          const gradClass = gradients[idx % gradients.length];

          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`p-6 rounded-2xl bg-white/60 dark:bg-pink-50/20 backdrop-blur-md border border-pink-100/40 shadow-[0_8px_25px_rgba(251,207,232,0.15)] hover:shadow-[0_15px_35px_rgba(251,207,232,0.3)] bg-gradient-to-br ${gradClass} transition-all duration-300 flex items-start gap-4`}
              id={`reason-item-${idx}`}
            >
              {/* Bullet icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100/60 dark:bg-pink-100/80 flex items-center justify-center text-pink-500">
                <Heart size={16} className="fill-pink-400 text-pink-500" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-sans text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                  {reason}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Little footer spark */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        className="flex justify-center items-center gap-2 mt-12 text-pink-400"
      >
        <Sparkles size={16} />
        <span className="font-sans text-xs tracking-wider uppercase">And millions of other small reasons...</span>
      </motion.div>
    </div>
  );
}
