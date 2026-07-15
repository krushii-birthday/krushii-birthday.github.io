/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface FloatingElement {
  id: number;
  type: "heart" | "petal" | "butterfly" | "sparkle";
  x: number; // Percentage from left (0 to 100)
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export default function FloatingAestheticBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const types: Array<"heart" | "petal" | "butterfly" | "sparkle"> = [
      "heart",
      "petal",
      "butterfly",
      "sparkle",
    ];
    const colors = [
      "text-pink-200/50",
      "text-pink-300/40",
      "text-lavender-200/50",
      "text-purple-200/40",
      "text-rose-200/50",
    ];

    // Generate stable floaters
    const newElements: FloatingElement[] = Array.from({ length: 22 }).map((_, i) => {
      const type = types[i % types.length];
      const x = Math.random() * 100;
      const size = Math.random() * (type === "butterfly" ? 24 : 16) + 12;
      const delay = Math.random() * 10;
      const duration = Math.random() * 20 + 20; // slow, 20-40s
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: i,
        type,
        x,
        size,
        delay,
        duration,
        color,
      };
    });

    setElements(newElements);
  }, []);

  return (
    <div id="aesthetic-background" className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {elements.map((el) => {
        // Render different SVGs based on type
        let svg = null;
        if (el.type === "heart") {
          svg = (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-full h-full ${el.color}`}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          );
        } else if (el.type === "petal") {
          svg = (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-full h-full ${el.color}`}
            >
              <path d="M17,8C8,8 4,16 4,16C4,16 12,20 16,16C20,12 17,8 17,8Z" />
            </svg>
          );
        } else if (el.type === "butterfly") {
          svg = (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-full h-full ${el.color} animate-pulse`}
            >
              <path d="M12,10C11.5,5 8,2 5,2C2,2 1,4.5 1,7C1,11 6,12 8,13C6,14 1,15 1,19C1,21.5 2,22 5,22C8,22 11.5,19 12,14C12.5,19 16,22 19,22C22,22 23,21.5 23,19C23,15 18,14 16,13C18,12 23,11 23,7C23,4.5 22,2 19,2C16,2 12.5,5 12,10Z" />
            </svg>
          );
        } else {
          // Sparkle
          svg = (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-full h-full ${el.color}`}
            >
              <path d="M12,2L14.8,9.2L22,12L14.8,14.8L12,22L9.2,14.8L2,12L9.2,9.2L12,2Z" />
            </svg>
          );
        }

        return (
          <motion.div
            key={el.id}
            initial={{
              x: `${el.x}vw`,
              y: "105vh",
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.7, 0.7, 0],
              x: [
                `${el.x}vw`,
                `${el.x + (Math.sin(el.id) * 12)}vw`,
                `${el.x - (Math.cos(el.id) * 8)}vw`,
              ],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              width: el.size,
              height: el.size,
            }}
          >
            {svg}
          </motion.div>
        );
      })}
    </div>
  );
}
