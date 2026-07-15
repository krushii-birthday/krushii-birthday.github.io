/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Sparkles, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function BirthdayCake() {
  const [isBlown, setIsBlown] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState(false);

  const triggerFireworks = () => {
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);
      
      // Fire random bursts
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.15, 0.35), y: Math.random() - 0.2 },
        colors: ["#fbcfe8", "#e9d5ff", "#fffbeb", "#f472b6"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.65, 0.85), y: Math.random() - 0.2 },
        colors: ["#fbcfe8", "#e9d5ff", "#fffbeb", "#c084fc"],
      });
    }, 300);
  };

  const playHappyBirthdayMelody = () => {
    if (isPlayingSong) return;
    setIsPlayingSong(true);

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      
      const notes = [
        { note: "C4", dur: 0.4 }, { note: "C4", dur: 0.2 }, { note: "D4", dur: 0.6 }, { note: "C4", dur: 0.6 }, { note: "F4", dur: 0.6 }, { note: "E4", dur: 1.2 },
        { note: "C4", dur: 0.4 }, { note: "C4", dur: 0.2 }, { note: "D4", dur: 0.6 }, { note: "C4", dur: 0.6 }, { note: "G4", dur: 0.6 }, { note: "F4", dur: 1.2 },
        { note: "C4", dur: 0.4 }, { note: "C4", dur: 0.2 }, { note: "C5", dur: 0.6 }, { note: "A4", dur: 0.6 }, { note: "F4", dur: 0.4 }, { note: "E4", dur: 0.4 }, { note: "D4", dur: 1.2 },
        { note: "Bb4", dur: 0.4 }, { note: "Bb4", dur: 0.2 }, { note: "A4", dur: 0.6 }, { note: "F4", dur: 0.6 }, { note: "G4", dur: 0.6 }, { note: "F4", dur: 1.5 }
      ];
      
      const freqs: Record<string, number> = {
        "C4": 261.63, "D4": 293.66, "E4": 329.63, "F4": 349.23, "G4": 392.00, "A4": 440.00, "Bb4": 466.16, "C5": 523.25
      };
      
      let time = ctx.currentTime + 0.1;
      
      notes.forEach((item, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Music box bell sound (Sine + high triangle for crystal overtone)
        osc.type = "sine";
        osc.frequency.setValueAtTime(freqs[item.note], time);
        
        // Volume node
        gain.gain.setValueAtTime(0, time);
        // Attack
        gain.gain.linearRampToValueAtTime(0.15, time + 0.05);
        // Decay
        gain.gain.exponentialRampToValueAtTime(0.001, time + item.dur - 0.02);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(time);
        osc.stop(time + item.dur);
        
        // Add a secondary soft harmony/bell overtone 
        const overtone = ctx.createOscillator();
        const overtoneGain = ctx.createGain();
        overtone.type = "triangle";
        overtone.frequency.setValueAtTime(freqs[item.note] * 2, time); // 1 Octave higher
        overtoneGain.gain.setValueAtTime(0, time);
        overtoneGain.gain.linearRampToValueAtTime(0.03, time + 0.04);
        overtoneGain.gain.exponentialRampToValueAtTime(0.001, time + item.dur - 0.03);
        
        overtone.connect(overtoneGain);
        overtoneGain.connect(ctx.destination);
        
        overtone.start(time);
        overtone.stop(time + item.dur);

        time += item.dur * 0.85; // Slightly spaced phrasing
      });

      // Reset state after song finishes
      const totalDur = notes.reduce((acc, note) => acc + note.dur * 0.85, 0) * 1000;
      setTimeout(() => {
        setIsPlayingSong(false);
      }, totalDur + 1000);
      
    } catch (e) {
      console.warn("Web Audio Context not allowed or blocked: ", e);
      setIsPlayingSong(false);
    }
  };

  const handleBlowCandles = () => {
    if (isBlown) return;
    setIsBlown(true);
    triggerFireworks();
    playHappyBirthdayMelody();
  };

  return (
    <div id="cake-section" className="py-20 px-4 max-w-3xl mx-auto flex flex-col items-center justify-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">
          Make a Wish
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-slate-800 font-bold">
          The Birthday Cake
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-400 mt-2">
          {isBlown ? "✨ Your wishes are off to the stars! ✨" : "Click below to blow the candles and make a beautiful wish"}
        </p>
      </motion.div>

      {/* Interactive Birthday Cake visual */}
      <div className="relative w-80 h-96 flex flex-col items-center justify-end mb-12 select-none">
        {/* Glow behind cake */}
        <div className="absolute inset-0 bg-pink-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Floating candle flame or smoke */}
        <div className="absolute bottom-40 flex justify-center gap-10 w-full z-10">
          {[1, 2, 3].map((candleId) => (
            <div key={candleId} className="relative flex flex-col items-center">
              {/* Flame */}
              <AnimatePresence>
                {!isBlown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: [1, 1.15, 0.9, 1.1, 1],
                      y: [0, -2, 1, -1, 0],
                    }}
                    exit={{ opacity: 0, scale: 0, y: -20 }}
                    transition={{
                      duration: 0.6,
                      y: {
                        duration: 1.5 + candleId * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="absolute -top-7 text-amber-400 cursor-pointer"
                  >
                    <Flame
                      size={24}
                      className="fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Smoke animation when blown */}
              <AnimatePresence>
                {isBlown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.4 }}
                    animate={{ opacity: [0, 0.5, 0], y: -50, scale: [1, 1.5, 2] }}
                    transition={{ duration: 1.8, delay: candleId * 0.15 }}
                    className="absolute -top-10 w-4 h-4 bg-slate-300/40 rounded-full blur-[2px]"
                  />
                )}
              </AnimatePresence>

              {/* Candle Body */}
              <div className="w-2.5 h-14 bg-gradient-to-t from-pink-300 via-purple-300 to-pink-200 rounded-t-sm shadow-sm relative">
                {/* Diagonal stripes on candle */}
                <div className="absolute inset-0 bg-repeating-linear-gradient opacity-20" />
                {/* Wick */}
                <div className="absolute -top-1 left-[4px] w-0.5 h-1.5 bg-slate-600 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* 3D-feeling Multi-Layer Cake */}
        <div className="relative w-72 flex flex-col items-center">
          {/* Top Layer */}
          <div className="w-48 h-16 bg-gradient-to-r from-pink-100 to-pink-200 rounded-t-xl border-b-[6px] border-pink-300 relative shadow-sm flex items-center justify-around">
            {/* White cream stars */}
            <div className="absolute -top-2 left-4 w-3 h-3 bg-white rounded-full blur-[1px]" />
            <div className="absolute -top-2 left-1/4 w-3 h-3 bg-white rounded-full blur-[1px]" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full blur-[1px]" />
            <div className="absolute -top-2 right-1/4 w-3 h-3 bg-white rounded-full blur-[1px]" />
            <div className="absolute -top-2 right-4 w-3 h-3 bg-white rounded-full blur-[1px]" />

            {/* Frosting dripping down effect */}
            <div className="absolute top-14 left-4 w-4 h-6 bg-pink-300 rounded-b-full shadow-sm" />
            <div className="absolute top-14 left-20 w-3 h-4 bg-pink-300 rounded-b-full shadow-sm" />
            <div className="absolute top-14 right-16 w-3.5 h-5 bg-pink-300 rounded-b-full shadow-sm" />
            <div className="absolute top-14 right-6 w-4 h-4 bg-pink-300 rounded-b-full shadow-sm" />
          </div>

          {/* Bottom Layer */}
          <div className="w-64 h-24 bg-gradient-to-r from-pink-200 to-pink-300 rounded-t-xl border-b-[8px] border-pink-400 relative shadow-md flex items-center justify-center">
            {/* Piping lace effect */}
            <div className="absolute -top-1 inset-x-0 h-2 bg-white/40 blur-[1px]" />
            
            {/* Strawberry toppings */}
            <div className="absolute -top-3 left-8 w-4 h-5 bg-rose-400 rounded-t-full rotate-[-10deg] shadow-sm" />
            <div className="absolute -top-3 left-1/3 w-4 h-5 bg-rose-400 rounded-t-full rotate-[15deg] shadow-sm" />
            <div className="absolute -top-3 right-1/3 w-4 h-5 bg-rose-400 rounded-t-full rotate-[-12deg] shadow-sm" />
            <div className="absolute -top-3 right-8 w-4 h-5 bg-rose-400 rounded-t-full rotate-[10deg] shadow-sm" />

            {/* Happy Birthday Text engraved on side */}
            <span className="font-serif italic text-pink-700/80 font-semibold tracking-widest text-sm drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] uppercase">
              FOR IRIS WITH LOVE
            </span>
          </div>

          {/* Golden Stand/Platter */}
          <div className="w-76 h-5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 rounded-full shadow-lg" />
          <div className="w-40 h-8 bg-gradient-to-b from-amber-200 to-amber-300 rounded-t-md shadow-inner" />
        </div>
      </div>

      {/* Action Button */}
      <AnimatePresence mode="wait">
        {!isBlown ? (
          <motion.button
            key="blow-btn"
            onClick={handleBlowCandles}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-sans font-medium rounded-full shadow-[0_8px_25px_rgba(244,114,182,0.35)] hover:shadow-[0_10px_35px_rgba(244,114,182,0.5)] transition-all cursor-pointer"
            id="blow-candles-btn"
          >
            <Flame size={18} className="animate-bounce" />
            <span>Blow the Candles</span>
          </motion.button>
        ) : (
          <motion.div
            key="congrats-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/50 backdrop-blur-md border border-pink-100/50 p-6 rounded-2xl shadow-lg max-w-sm"
            id="cake-congrats-panel"
          >
            <div className="flex justify-center text-pink-400 mb-2">
              <Sparkles size={28} className="animate-spin duration-[4000ms]" />
            </div>
            <h4 className="font-serif text-lg text-pink-700 font-bold mb-1">
              May All Your Wishes Come True!
            </h4>
            <p className="font-sans text-xs text-slate-500 leading-relaxed mb-4">
              Your magical birthday melody is playing! Let the starry skies guide your heart tonight.
            </p>
            <button
              onClick={playHappyBirthdayMelody}
              disabled={isPlayingSong}
              className={`flex items-center gap-1.5 mx-auto px-4 py-2 rounded-full border border-pink-200/50 text-xs font-sans font-medium transition-all ${
                isPlayingSong
                  ? "bg-pink-50 text-pink-400 cursor-not-allowed"
                  : "bg-pink-100/50 text-pink-600 hover:bg-pink-100 cursor-pointer"
              }`}
              id="replay-song-btn"
            >
              <Volume2 size={14} />
              {isPlayingSong ? "Melody Playing..." : "Play Melody Again"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
