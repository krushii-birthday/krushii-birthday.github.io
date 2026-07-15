/**
 * =========================================================================
 * 🎂 BIRTHDAY WEBSITE CONFIGURATION FILE (config.js) 🎂
 * =========================================================================
 * 
 * Welcome! This file makes it super easy to customize this birthday website.
 * You don't need to know coding to change these values. Just edit the text
 * inside the quotation marks "" or brackets [].
 * 
 * -------------------------------------------------------------------------
 * 🇮🇳 HINDI / URDU GUIDE:
 * Swagat hai! Is file ki madad se aap bina coding seekhe is website ko
 * poori tarah badal sakte hain. Sirf quotation marks "" ke andar ka text badlein.
 * =========================================================================
 */

window.config = {
  // -------------------------------------------------------------------------
  // 1. NAME OF THE BIRTHDAY PERSON (Naam)
  // -------------------------------------------------------------------------
  // Example: name: "Sophia",
  name: "Iris",

  // -------------------------------------------------------------------------
  // 2. BIRTHDAY DATE (Birthday ki tareekh)
  // -------------------------------------------------------------------------
  // Format must be YYYY-MM-DD. 
  // Example: birthday: "2005-12-25",
  birthday: "2002-10-18",

  // -------------------------------------------------------------------------
  // 3. HEARTFELT MESSAGE (Aapka Pyaar Bhara Message)
  // -------------------------------------------------------------------------
  // This message will type out slowly on the screen like a typewriter.
  // Use "\n\n" to start a new paragraph.
  // Use emojis to make it beautiful!
  message: "Dearest Iris,\n\nHappy Birthday! 🎂✨\n\nOn this incredibly special day, I wanted to create a little digital sanctuary just for you. You are someone who makes the world infinitely brighter, softer, and more beautiful just by being in it. Your kindness is a gentle breeze, and your laughter is the sweetest melody.\n\nThank you for sharing your light with everyone around you, and for being the wonderful, magical soul that you are. May this year ahead be filled with overflowing peace, gentle adventures, quiet cozy moments, and all the boundless happiness your heart can hold. You deserve the world and so much more.\n\nWith all my warmth and affection,\nAlways ❤️",

  // -------------------------------------------------------------------------
  // 4. TOTAL PHOTO GALLERY IMAGES (Photo Gallery Size)
  // -------------------------------------------------------------------------
  // Put your real photos in the "/image" folder. Name them 1.jpg, 2.jpg... up to 20.jpg.
  // If a photo is missing, the website will automatically load a beautiful
  // high-resolution nature/bokeh photo from Unsplash!
  totalImages: 20,

  // -------------------------------------------------------------------------
  // 5. EIGHT REASONS WHY THEY ARE AMAZING (8 Pyaari Baatein)
  // -------------------------------------------------------------------------
  // These will display in a beautiful visual card grid. 
  // You can write whatever you like for each card.
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

  // -------------------------------------------------------------------------
  // 6. EIGHT SKY STAR WISHES (Shining Stars ke Secret Wishes)
  // -------------------------------------------------------------------------
  // When they tap the glowing stars in the virtual interactive night sky,
  // these exact wishes will slide open.
  wishes: [
    { id: 1, wish: "May your heart always feel safe, cherished, and deeply loved every single day." },
    { id: 2, wish: "I wish for you to fulfill every single dream you have, no matter how grand or quiet." },
    { id: 3, wish: "May your path be paved with wonderful adventures, rich laughter, and sincere friendships." },
    { id: 4, wish: "I wish you endless peaceful mornings wrapped in cozy blankets with a warm cup of tea." },
    { id: 5, wish: "May you always find the courage to stay true to your unique, wonderful, magical self." },
    { id: 6, wish: "I wish for your mind to be free of worries, filled only with inspiration and quiet clarity." },
    { id: 7, wish: "May this year bring you perfect health, creative energy, and deep, grounding peace." },
    { id: 8, wish: "I wish that any obstacles you face turn into beautiful stepping stones for your soul." }
  ],

  // -------------------------------------------------------------------------
  // 7. FALLBACK ONLINE MUSIC (Online Background Song)
  // -------------------------------------------------------------------------
  // If they don't upload a "birthday.mp3" file inside the "/music" folder,
  // this sweet, soothing instrumental piano music will play as a backup!
  fallbackMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
};
