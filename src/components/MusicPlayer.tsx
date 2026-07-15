/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { config } from "../config";
import { motion, AnimatePresence } from "motion/react";

interface MusicPlayerProps {
  playTriggered: boolean;
  onStateChange?: (playing: boolean) => void;
}

export default function MusicPlayer({ playTriggered, onStateChange }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [useFallback, setUseFallback] = useState(false);
  const [audioSource, setAudioSource] = useState("/music/birthday.mp3");

  // Handle play trigger from parent (when Open Gift is clicked)
  useEffect(() => {
    if (playTriggered && audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          onStateChange?.(true);
        })
        .catch((err) => {
          console.warn("Autoplay blocked or audio failed to load: ", err);
        });
    }
  }, [playTriggered]);

  // Sync volume & mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onStateChange?.(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          onStateChange?.(true);
        })
        .catch((err) => {
          console.error("Failed to play audio:", err);
        });
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) {
      setIsMuted(false);
    }
  };

  const handleAudioError = () => {
    // If the local birthday.mp3 fails, switch to fallback URL
    if (!useFallback) {
      console.log("Local audio not found or failed. Switching to aesthetic fallback track.");
      setUseFallback(true);
      setAudioSource(config.musicUrl);
    }
  };

  return (
    <div id="music-player-widget" className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src={audioSource}
        loop
        onError={handleAudioError}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-3 px-4 py-2.5 bg-white/70 dark:bg-pink-50/70 backdrop-blur-md border border-pink-100/50 shadow-[0_8px_32px_rgba(251,207,232,0.3)] rounded-full hover:shadow-[0_8px_32px_rgba(251,207,232,0.5)] transition-all duration-300"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-500 animate-pulse">
          <Music size={16} />
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="p-1.5 rounded-full hover:bg-pink-50 text-pink-600 active:scale-90 transition-all duration-200"
          title={isPlaying ? "Pause Music" : "Play Music"}
          id="music-play-pause-btn"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        {/* Volume & Mute Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleMuteToggle}
            className="p-1.5 rounded-full hover:bg-pink-50 text-pink-600 active:scale-90 transition-all duration-200"
            id="music-mute-btn"
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-400 focus:outline-none"
            title="Adjust Volume"
            id="music-volume-slider"
          />
        </div>

        {/* Tiny Playing Waveform Animation */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-end gap-[2px] h-3 ml-1"
            >
              <div className="w-[2px] h-3 bg-pink-400 animate-[bounce_0.8s_infinite_0s]" />
              <div className="w-[2px] h-2 bg-pink-400 animate-[bounce_0.8s_infinite_0.2s]" />
              <div className="w-[2px] h-3 bg-pink-400 animate-[bounce_0.8s_infinite_0.4s]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
