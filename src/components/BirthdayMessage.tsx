/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, MailOpen, Mail } from "lucide-react";
import { config } from "../config";

export default function BirthdayMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTypedText("");
      setIsTypingComplete(false);
      return;
    }

    let i = 0;
    const fullText = config.message;
    
    const typeChar = () => {
      if (i < fullText.length) {
        // Handle chunking so typing doesn't take hours if message is long
        const char = fullText.charAt(i);
        setTypedText((prev) => prev + char);
        i++;
        
        // Slightly randomized typing delay for human feel
        const delay = char === "\n" ? 250 : char === "." || char === "!" ? 150 : Math.random() * 20 + 15;
        typingTimerRef.current = setTimeout(typeChar, delay);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Begin typing delay after letter unfolds (approx 1s)
    const startDelay = setTimeout(() => {
      typeChar();
    }, 1000);

    return () => {
      clearTimeout(startDelay);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, [isOpen]);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="birthday-letter-section" className="flex flex-col items-center justify-center py-20 px-4 max-w-3xl mx-auto">
      {/* Small Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-10"
      >
        <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">
          A Message for You
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-slate-800 font-bold">
          The Heartfelt Letter
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-400 mt-2">
          {isOpen ? "Scroll inside the parchment to read" : "Click the golden heart wax seal to unfold"}
        </p>
      </motion.div>

      {/* Envelope Card */}
      <div className="relative w-full max-w-xl min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Envelope Card */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5 }}
              onClick={handleToggleOpen}
              className="w-full max-w-lg p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-lavender-50 border border-pink-100 shadow-[0_15px_40px_rgba(251,207,232,0.3)] flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden"
              id="envelope-closed"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* Envelope flap aesthetic */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-pink-100/50 to-transparent" />

              <div className="w-16 h-16 rounded-full bg-pink-100/60 flex items-center justify-center text-pink-400 group-hover:text-pink-500 group-hover:scale-110 transition-all duration-300 mb-6">
                <Mail size={28} />
              </div>

              <h4 className="font-serif text-xl text-pink-700 font-medium mb-2">
                A Letter to {config.name}
              </h4>
              <p className="font-sans text-xs text-slate-400 max-w-xs leading-relaxed mb-8">
                This envelope contains a quiet wish, written with patience, warmth, and care.
              </p>

              {/* Wax Seal Button */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 rounded-full bg-amber-400 border-[3px] border-amber-200 flex items-center justify-center shadow-lg relative group-hover:bg-amber-500 transition-colors duration-300"
                id="envelope-wax-seal"
              >
                <Heart size={20} className="text-white fill-white" />
                {/* Floating sparkle ring */}
                <span className="absolute -inset-1 rounded-full border border-dashed border-amber-300/60 animate-[spin_10s_linear_infinite]" />
              </motion.div>
            </motion.div>
          ) : (
            /* Open Unfolding Letter Card */
            <motion.div
              key="open-letter"
              initial={{ opacity: 0, height: 100 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full p-1 bg-gradient-to-b from-amber-50 to-amber-100/30 rounded-2xl shadow-[0_20px_50px_rgba(230,195,145,0.25)] border border-amber-200/50 overflow-hidden"
              id="letter-open"
            >
              {/* Letter parchment top bar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-amber-200/40 font-mono text-[10px] text-amber-800">
                <span>MEMORANDUM OF WARMTH</span>
                <button
                  onClick={handleToggleOpen}
                  className="px-2 py-1 bg-amber-100/50 hover:bg-amber-200/50 border border-amber-300/30 rounded text-amber-900 font-sans font-medium transition-colors cursor-pointer text-[10px] uppercase tracking-wider"
                  id="close-letter-btn"
                >
                  Fold Envelope
                </button>
              </div>

              {/* Scrollable parchment content */}
              <div className="max-h-[420px] overflow-y-auto px-8 py-10 scrollbar-thin scrollbar-thumb-amber-200">
                <div className="prose max-w-none text-left relative">
                  {/* Subtle watermarked flower */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-amber-900 select-none pointer-events-none">
                    <Heart size={200} />
                  </div>

                  <p className="font-serif text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap tracking-wide font-medium italic min-h-[150px]">
                    {typedText}
                    {/* Blinking cursor */}
                    {!isTypingComplete && (
                      <span className="inline-block w-1.5 h-4 bg-pink-400 ml-0.5 animate-pulse" />
                    )}
                  </p>

                  {/* Sign-off element appearing after typing */}
                  <AnimatePresence>
                    {isTypingComplete && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mt-8 pt-6 border-t border-amber-200/30 text-right flex flex-col items-end"
                        id="letter-signature"
                      >
                        <span className="font-serif italic text-amber-800 text-xs tracking-widest uppercase">
                          CRAFTED WITH TENDER CARE
                        </span>
                        <div className="flex items-center gap-1.5 mt-2 text-pink-500 font-sans font-medium text-sm">
                          <span>Always, your special card</span>
                          <Heart size={14} className="fill-pink-500" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
