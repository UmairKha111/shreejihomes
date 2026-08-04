import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FAF9F6] select-none" id="not-found-page">
      <SEO title="Page Not Found" />
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-gray-150 shadow-xs mb-6 text-[#4B1D1D]">
        <Compass className="w-8 h-8 animate-spin-slow" />
      </div>
      <h1 className="text-5xl md:text-7xl font-serif font-bold text-neutral-800">404</h1>
      <h2 className="text-sm md:text-base font-bold font-sans uppercase tracking-[0.25em] text-[#BC8E8E] mt-3">
        Lost in the Weave
      </h2>
      <p className="text-xs text-neutral-400 mt-2 max-w-sm leading-relaxed">
        The elegant corridor you are looking for has folded. Let&rsquo;s guide you back to our principal collections.
      </p>
      
      <div className="flex gap-4 mt-8 flex-col sm:flex-row">
        <Link
          to="/"
          className="px-6 py-3 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] text-xs font-bold font-sans tracking-widest uppercase rounded-lg shadow-md transition-all"
          id="not-found-home-btn"
        >
          Return Home
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 bg-white text-neutral-800 border border-neutral-200 hover:bg-neutral-50 text-xs font-bold font-sans tracking-widest uppercase rounded-lg transition-all"
          id="not-found-shop-btn"
        >
          Explore Catalog
        </Link>
      </div>
    </div>
  );
};
