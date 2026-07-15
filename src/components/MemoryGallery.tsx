/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Camera, Sparkles } from "lucide-react";
import { config, fallbackImages } from "../config";

export default function MemoryGallery() {
  // Generate list of 20 images.
  // We initialize the list with local paths. If they fail to load, we swap in the fallback.
  const [images, setImages] = useState(() => {
    return Array.from({ length: config.totalImages }).map((_, i) => {
      const index = i + 1;
      return {
        id: index,
        title: `Memory #${index}`,
        src: `/image/${index}.jpg`,
        fallbackSrc: fallbackImages[i % fallbackImages.length],
        hasFailed: false,
      };
    });
  });

  const [activeImageId, setActiveImageId] = useState<number | null>(null);

  const handleImageError = (id: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, src: img.fallbackSrc, hasFailed: true } : img
      )
    );
  };

  const activeIndex = images.findIndex((img) => img.id === activeImageId);
  const activeImage = activeIndex !== -1 ? images[activeIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex > 0) {
      setActiveImageId(images[activeIndex - 1].id);
    } else {
      setActiveImageId(images[images.length - 1].id); // Loop to end
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex < images.length - 1) {
      setActiveImageId(images[activeIndex + 1].id);
    } else {
      setActiveImageId(images[0].id); // Loop to start
    }
  };

  return (
    <div id="memory-gallery-section" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">
          Glimpses of Us
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-slate-800 font-bold flex items-center justify-center gap-2">
          <Camera size={24} className="text-pink-400" />
          Photo Memories
          <Sparkles size={18} className="text-purple-400 animate-pulse" />
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
          A collections of beautiful, unforgettable moments, woven together to form our story.
        </p>
      </motion.div>

      {/* Grid of memories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" id="gallery-grid">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => setActiveImageId(img.id)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-pink-50/50 aspect-square border border-pink-100/30 shadow-[0_4px_20px_rgba(244,114,182,0.1)] hover:shadow-[0_12px_30px_rgba(244,114,182,0.2)] transition-all duration-300"
            id={`gallery-item-${img.id}`}
          >
            {/* Shimmer gradient loader */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-lavender-50 to-pink-50 animate-pulse -z-10" />

            <img
              src={img.src}
              alt={img.title}
              onError={() => handleImageError(img.id)}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              id={`gallery-img-${img.id}`}
            />

            {/* Hover overlay with typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-pink-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
              <span className="font-serif italic text-pink-100 text-sm font-medium tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {img.title}
              </span>
              <span className="font-sans text-[10px] text-pink-200/80 tracking-wider uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                Click to expand
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageId(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out"
            id="gallery-lightbox"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveImageId(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Close"
              id="lightbox-close-btn"
            >
              <X size={24} />
            </button>

            {/* Lightbox content */}
            <div className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center">
              {/* Previous button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:-left-16 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
                title="Previous Image"
                id="lightbox-prev-btn"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.img
                key={activeImage.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={activeImage.src}
                alt={activeImage.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-default"
                onClick={(e) => e.stopPropagation()} // Stop bubbling
                id="lightbox-active-img"
              />

              {/* Next button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:-right-16 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
                title="Next Image"
                id="lightbox-next-btn"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom subtitle info */}
            <motion.div
              key={`info-${activeImage.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-serif italic text-white text-lg tracking-wide">
                {activeImage.title}
              </p>
              <p className="font-sans text-[11px] text-pink-300 tracking-widest uppercase mt-1">
                {activeIndex + 1} of {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
