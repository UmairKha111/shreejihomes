import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  'FREE SHIPPING PAN-INDIA | SECURE PACKAGING',
  'HANDCRAFTED HERITAGE COTTONS & ORGANIC MULMUL RAZAIS',
  'EASY CUSTOMER SUPPORT ON WHATSAPP: +91 90244 44555'
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? ANNOUNCEMENTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <div className="bg-[#4B1D1D] text-white border-b border-[#1A1A1A] h-10 px-4 md:px-8 flex items-center justify-between select-none relative overflow-hidden z-50">
      <button 
        onClick={handlePrev}
        className="opacity-60 hover:opacity-100 transition-opacity p-1 focus:outline-none"
        aria-label="Previous announcement"
        id="prev-announcement-btn"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex-1 text-center h-full relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="text-[11px] md:text-xs font-medium tracking-[0.2em] font-sans"
          >
            {ANNOUNCEMENTS[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        onClick={handleNext}
        className="opacity-60 hover:opacity-100 transition-opacity p-1 focus:outline-none"
        aria-label="Next announcement"
        id="next-announcement-btn"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
