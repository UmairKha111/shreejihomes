import React from 'react';
import { SEO } from '../components/common/SEO';
import { Sparkles, Compass, Heart, Award } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="our-story-page-container">
      <SEO title="Our Story & Heritage Craftsmanship" />

      {/* Hero Banner header */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center text-white text-center">
        <div className="absolute inset-0 bg-black/45 z-10" />
        <img
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1600"
          alt="Jaipur Handblock Craft"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-3xl px-4">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#EAE6DF] font-sans block mb-3 animate-fade-in">
            A Journey of Artisanal Devotion
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight mb-2 uppercase tracking-wider">
            Our Story & Heritage
          </h1>
          <p className="text-xs sm:text-sm text-neutral-200 font-sans max-w-lg mx-auto">
            Sourcing 100% authentic hand-block prints and organic cotton casing directly from generational family clusters.
          </p>
        </div>
      </section>

      {/* The Craftsmanship Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold text-[#4B1D1D] tracking-[0.2em] uppercase font-sans">
              The Genesis
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-neutral-800 uppercase tracking-wide">
              Rooted in the soil of Jaipur
            </h2>
            <div className="w-12 h-[2px] bg-[#4B1D1D]" />
            
            <p className="text-sm text-neutral-500 font-sans leading-relaxed">
              Shreeji Homes was born from a singular passion: to rescue the sublime comfort of traditional Indian bedding from the tide of sterile, machine-printed synthetics. Our journey began in the historical hubs of block-printing in Rajasthan, working alongside small cooperatives of master block carvers and dye printers.
            </p>
            <p className="text-sm text-neutral-500 font-sans leading-relaxed">
              We realized that the most peaceful sleep happens on fabrics that are alive with history. By sourcing long-staple cotton yarn, hand-carded natural cotton fillings, and organic mulmul, we create textiles that breathe, adjust to body warmth, and feel like wrapping oneself in a cloud.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"
              alt="Artisanal Blockprint Setup"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* Visual Step Timeline - Three Core Pillars */}
      <section className="bg-white py-20 border-y border-gray-100/50" id="our-story-pillars-timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
              How we weave
            </span>
            <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-neutral-800 uppercase tracking-wide">
              The Shreeji Blueprint
            </h2>
            <div className="w-12 h-[2px] bg-[#4B1D1D] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Step 1 */}
            <div className="space-y-4">
              <span className="text-4xl font-serif font-bold text-[#F2EFE9] text-[#4B1D1D]/10 block">01</span>
              <h3 className="text-lg font-serif font-bold text-[#333] uppercase tracking-wide flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#BC8E8E]" />
                Teak Wood Carving
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Our design journey starts on wood. Wood block craftsmen carve elaborate symmetrical lattices and motifs by hand onto blocks of premium teakwood. Every stamp is a miniature masterpiece requiring days of focused chisel-work.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <span className="text-4xl font-serif font-bold text-[#F2EFE9] text-[#4B1D1D]/10 block">02</span>
              <h3 className="text-lg font-serif font-bold text-[#333] uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#BC8E8E]" />
                Artisanal Stamping
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Stretched across heavy padded tables, organic cotton fabrics are hand-printed stamp-by-stamp. Printers align the block by eye with micro-precision, tapping to lock vegetable dye into the fiber. It is rhythmic, beautiful, and ancient.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <span className="text-4xl font-serif font-bold text-[#F2EFE9] text-[#4B1D1D]/10 block">03</span>
              <h3 className="text-lg font-serif font-bold text-[#333] uppercase tracking-wide flex items-center gap-2">
                <Award className="w-5 h-5 text-[#BC8E8E]" />
                Traditional Tagai (Quilting)
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                For our Razais, cotton is manually hand-carded to fluffiness. Layered meticulously inside the casing, women artisans stitch them together using miniature hand-stitches, known as Tagai, preventing clump-rot and assuring heat lock.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Quote Block */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center" id="our-story-quote">
        <Heart className="w-8 h-8 text-[#4B1D1D] mx-auto mb-6" />
        <blockquote className="text-lg md:text-xl font-serif italic text-neutral-700 leading-relaxed mb-6">
          &ldquo;When you buy a Shreeji Homes linen, you are not just acquiring luxury bedding. You are preserving the livelihood of three wood carvers, supporting two printers, and bringing a legacy of tranquil, uninterrupted sleep into your home.&rdquo;
        </blockquote>
        <div className="w-8 h-px bg-neutral-300 mx-auto mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-[#BC8E8E] font-sans">
          The Shreeji Homes Family
        </p>
      </section>
    </div>
  );
};
