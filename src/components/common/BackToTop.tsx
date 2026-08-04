import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 bg-white/90 text-[#333] hover:text-[#4B1D1D] border border-[#eee] hover:border-[#4B1D1D]/30 w-11 h-11 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-115 hover:-translate-y-1 active:scale-90"
      aria-label="Scroll back to top"
      id="back-to-top-btn"
    >
      <ArrowUp className="w-4 h-4 transition-transform duration-300" />
    </button>
  );
};
