/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import LandingScreen from "./components/LandingScreen";
import FloatingAestheticBackground from "./components/FloatingAestheticBackground";
import BirthdayMessage from "./components/BirthdayMessage";
import MemoryGallery from "./components/MemoryGallery";
import ReasonsCard from "./components/ReasonsCard";
import BirthdayCake from "./components/BirthdayCake";
import WishesInSky from "./components/WishesInSky";
import EndingScreen from "./components/EndingScreen";
import MusicPlayer from "./components/MusicPlayer";
import { config } from "./config";
import { Calendar, Sparkles, Heart } from "lucide-react";

export default function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [playMusicTrigger, setPlayMusicTrigger] = useState(false);
  const [countdownText, setCountdownText] = useState("");
  const [isBdayToday, setIsBdayToday] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Set document title dynamically based on birthday person's name
  useEffect(() => {
    document.title = `Happy Birthday ${config.name} 🎂✨`;
  }, []);

  // Handle scroll progress tracking
  useEffect(() => {
    if (!isGiftOpened) return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isGiftOpened]);

  // Calculate birthday countdown
  useEffect(() => {
    const calculateCountdown = () => {
      const bday = new Date(config.birthday);
      const now = new Date();
      
      // Zero out time for clean date comparison
      const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const bdayThisYear = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
      
      let nextBday = bdayThisYear;
      if (todayDate.getTime() > bdayThisYear.getTime()) {
        nextBday = new Date(now.getFullYear() + 1, bday.getMonth(), bday.getDate());
      }
      
      const isToday = now.getMonth() === bday.getMonth() && now.getDate() === bday.getDate();
      setIsBdayToday(isToday);

      if (isToday) {
        setCountdownText("TODAY IS THE BIG DAY! 🎉");
      } else {
        const diffTime = nextBday.getTime() - todayDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setCountdownText(`${diffDays} day${diffDays > 1 ? "s" : ""} left until her next big milestone ✨`);
      }
    };

    calculateCountdown();
    // Re-run hourly to ensure accuracy
    const timer = setInterval(calculateCountdown, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    setPlayMusicTrigger(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased relative selection:bg-pink-100 selection:text-pink-600 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isGiftOpened ? (
          /* Landing Screen */
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full"
          >
            <LandingScreen onOpen={handleOpenGift} />
          </motion.div>
        ) : (
          /* Celebration Scroll Layout */
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full relative min-h-screen bg-radial from-pink-50/60 via-purple-50/40 to-slate-50/50 pb-20"
          >
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-[4px] bg-pink-100/30 z-50">
              <div
                className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 transition-all duration-100 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Glowing blur decorations in background */}
            <div className="absolute top-96 left-1/5 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-[1800px] right-1/4 w-[500px] h-[500px] bg-purple-200/15 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-96 left-1/4 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Gentle Floating Elements */}
            <FloatingAestheticBackground />

            {/* Subtle Floating Top Header */}
            <header className="sticky top-4 z-40 max-w-4xl mx-auto px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="pointer-events-auto flex items-center justify-between px-6 py-3 bg-white/75 dark:bg-pink-50/45 backdrop-blur-md border border-pink-100/40 shadow-[0_4px_20px_rgba(251,207,232,0.15)] rounded-full"
              >
                <div className="flex items-center gap-2 text-pink-600">
                  <Heart size={16} className="fill-pink-500 animate-pulse" />
                  <span className="font-serif italic font-semibold text-sm tracking-wide">
                    Celebrating {config.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-sans">
                  <Calendar size={14} className="text-purple-400" />
                  <span className="font-medium tracking-wide">
                    {countdownText}
                  </span>
                </div>
              </motion.div>
            </header>

            {/* Content Chapters */}
            <main className="relative z-20 space-y-16">
              {/* 1. Heartfelt Letter Chapter */}
              <section className="scroll-mt-24">
                <BirthdayMessage />
              </section>

              {/* Decorative dividing ornament */}
              <div className="flex justify-center text-pink-300/65 pointer-events-none select-none">
                <Sparkles size={24} className="animate-spin duration-[8000ms]" />
              </div>

              {/* 2. Gallery Chapter */}
              <section className="scroll-mt-24">
                <MemoryGallery />
              </section>

              {/* Decorative dividing ornament */}
              <div className="flex justify-center text-purple-300/65 pointer-events-none select-none">
                <Heart size={16} className="fill-purple-300/30" />
              </div>

              {/* 3. Reasons Card Chapter */}
              <section className="scroll-mt-24">
                <ReasonsCard />
              </section>

              {/* Decorative dividing ornament */}
              <div className="flex justify-center text-pink-300/65 pointer-events-none select-none">
                <Sparkles size={24} className="animate-spin duration-[6000ms]" />
              </div>

              {/* 4. Cake Chapter */}
              <section className="scroll-mt-24">
                <BirthdayCake />
              </section>

              {/* Decorative dividing ornament */}
              <div className="flex justify-center text-purple-300/65 pointer-events-none select-none">
                <Heart size={16} className="fill-purple-300/30" />
              </div>

              {/* 5. Wishes Sky Chapter */}
              <section className="scroll-mt-24">
                <WishesInSky />
              </section>

              {/* 6. Ending Scene */}
              <section className="scroll-mt-24">
                <EndingScreen />
              </section>
            </main>

            {/* Ambient Music Player Controller Widget */}
            <MusicPlayer playTriggered={playMusicTrigger} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
