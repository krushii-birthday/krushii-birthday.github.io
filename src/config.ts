/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppConfig } from "./types";

export const config: AppConfig = {
  name: "Iris",
  birthday: "2002-10-18",
  message: "Dearest Iris,\n\nHappy Birthday! 🎂✨\n\nOn this incredibly special day, I wanted to create a little digital sanctuary just for you. You are someone who makes the world infinitely brighter, softer, and more beautiful just by being in it. Your kindness is a gentle breeze, and your laughter is the sweetest melody.\n\nThank you for sharing your light with everyone around you, and for being the wonderful, magical soul that you are. May this year ahead be filled with overflowing peace, gentle adventures, quiet cozy moments, and all the boundless happiness your heart can hold. You deserve the world and so much more.\n\nWith all my warmth and affection,\nAlways ❤️",
  totalImages: 20,
  
  reasons: [
    "Your smile brings instant warmth to even the grayest of days. 🌸",
    "You have a heart of pure gold, treating everyone with deep empathy and kindness. ✨",
    "How you appreciate the quiet, beautiful little things in life that others might overlook. 🌼",
    "Your laughter is contagious and has the power to heal and lift up any spirit. 🎵",
    "You inspire others to be more thoughtful and gentle just by being exactly who you are. ❤️",
    "The way your eyes light up with passion and wonder when speaking about what you love. 💫",
    "You carry an innate elegance and a serene, calming presence wherever you go. 🕯️",
    "Your strength and grace in handling life's complex currents are truly admirable. 🦋"
  ],

  wishes: [
    { id: 1, wish: "May your heart always feel safe, cherished, and deeply loved every single day.", revealed: false },
    { id: 2, wish: "I wish for you to fulfill every single dream you have, no matter how grand or quiet.", revealed: false },
    { id: 3, wish: "May your path be paved with wonderful adventures, rich laughter, and sincere friendships.", revealed: false },
    { id: 4, wish: "I wish you endless peaceful mornings wrapped in cozy blankets with a warm cup of tea.", revealed: false },
    { id: 5, wish: "May you always find the courage to stay true to your unique, wonderful, magical self.", revealed: false },
    { id: 6, wish: "I wish for your mind to be free of worries, filled only with inspiration and quiet clarity.", revealed: false },
    { id: 7, wish: "May this year bring you perfect health, creative energy, and deep, grounding peace.", revealed: false },
    { id: 8, wish: "I wish that any obstacles you face turn into beautiful stepping stones for your soul.", revealed: false }
  ],

  // Beautiful, slow, calming acoustic piano instrumental track (fallback if local file is missing)
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
};

export const fallbackImages: string[] = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop", // Soft pink rose
  "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=600&auto=format&fit=crop", // Pastel pink clouds
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop", // Fairy lights in green leaves
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop", // Soft yellow wildflowers
  "https://images.unsplash.com/photo-1494972308805-463bc619b34e?q=80&w=600&auto=format&fit=crop", // Dreamy pink rose garden
  "https://images.unsplash.com/photo-1469251189290-00104856613f?q=80&w=600&auto=format&fit=crop", // Retro wildflower field
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop", // Light rays through trees
  "https://images.unsplash.com/photo-1495539408662-47577f1d4ab7?q=80&w=600&auto=format&fit=crop", // Warm sparkles
  "https://images.unsplash.com/photo-1513553404607-988bf2703777?q=80&w=600&auto=format&fit=crop", // Elegant sparkling beverage
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop", // Soft blush floral bouquet
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop", // Warm pink sunset on beach
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop", // Whimsical bridge in forest
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=600&auto=format&fit=crop", // Vintage key with glowing bokeh
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop", // Cozy background lights
  "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=600&auto=format&fit=crop", // Retro pastel orange flower
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop", // Sweet drawn chalk heart
  "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=600&auto=format&fit=crop", // Dreamy hot air balloons
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&auto=format&fit=crop", // Gentle rolling hills
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop", // Still water mirror reflection
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop"  // Magical misty morning meadow
];
