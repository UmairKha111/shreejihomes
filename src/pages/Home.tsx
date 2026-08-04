import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Star, Heart, CheckCircle2, Award, Zap, Smile, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SEO } from '../components/common/SEO';
import { ProductCard } from '../components/ui/ProductCard';
import { QuickViewModal } from '../components/ui/QuickViewModal';
import { formatPrice } from '../utils';
import { Product } from '../types';
 
export const Home: React.FC = () => {
  const { banners, categories, products, reviews } = useShop();
  const navigate = useNavigate();
  
  // Hero Slider State
  const [activeSlide, setActiveSlide] = useState(0);
  const activeBanners = banners.filter(b => b.active);
 
  // Quick View Modal State
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
 
  // Auto-rotate hero slider
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);
 
  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };
 
  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % activeBanners.length);
  };
 
  // Filter products for collections
  const bestsellerProducts = products.filter(p => p.collections.includes('Best Sellers')).slice(0, 4);
  const newArrivalProducts = products.filter(p => p.collections.includes('New Arrivals')).slice(0, 4);
  const luxuryProducts = products.filter(p => p.collections.includes('Luxury Collection')).slice(0, 4);
 
  // Instantly navigate to category
 const handleCategoryClick = (categoryName: string) => {
  navigate(`/shop?category=${encodeURIComponent(categoryName.trim())}`);
};
 
  // Sample Instagram posts placeholders (using highly coordinated home lifestyle photography)
  const instagramFeed = [
    { url: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=400', likes: 210 },
    { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400', likes: 184 },
    { url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=400', likes: 325 },
    { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400', likes: 198 },
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400', likes: 271 },
    { url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=400', likes: 412 }
  ];
 
  // Marquee taglines — expanded with a few extra lines for a richer scroll
  const marqueeItems = [
    'WE BELIEVE PURE BEDDING AND THOUGHTFUL DESIGN LEAD TO BETTER SLEEP',
    'GOOD LOOKING PURE FABRICS',
    'HAND-BLOCK PRINTED HERITAGE',
    'DISCERNED TEXTURE & QUALITY',
    'CRAFTED IN Maharastra Pune, LOVED EVERYWHERE',
    'GOTS CERTIFIED ORGANIC COTTON',
  ];
 
  return (
    <div className="bg-[#FAF9F6] text-[#333] overflow-hidden">
      <SEO title="Luxury Home Linens & Decors" />
 
      {/* Hero Slider */}
      <section className="relative h-[65vh] md:h-[80vh] w-full bg-neutral-900 overflow-hidden" id="homepage-hero-section">
        {activeBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            id={`hero-slide-${idx}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={banner.image}
              alt={banner.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
 
            {/* Content overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-start justify-center px-6 sm:px-12 md:px-24 text-white max-w-4xl">
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] font-sans uppercase mb-3 text-[#EAE6DF] block animate-slide-up">
                {banner.subtitle}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-semibold leading-tight tracking-wide mb-6 animate-slide-up duration-500">
                {banner.title}
              </h1>
              <Link
                to={banner.ctaLink}
                className="px-8 py-3.5 bg-white hover:bg-[#4B1D1D] text-neutral-900 hover:text-white border border-white hover:border-[#4B1D1D] text-xs font-bold tracking-[0.2em] font-sans uppercase transition-all duration-300 rounded shadow-md animate-slide-up duration-700 hover:translate-y-[-1px]"
                id={`hero-slide-cta-${idx}`}
              >
                {banner.ctaText}
              </Link>
            </div>
          </div>
        ))}
 
        {/* Carousel arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer focus:outline-none"
              aria-label="Previous slide"
              id="hero-slider-prev-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer focus:outline-none"
              aria-label="Next slide"
              id="hero-slider-next-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
 
        {/* Slide Indicators */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSlide === idx ? 'bg-white w-6' : 'bg-white/45'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                id={`hero-slide-indicator-${idx}`}
              />
            ))}
          </div>
        )}
      </section>
 
      {/* Sliding Marquee Bar — clearly separated from the hero, richer content, always moving */}
      <section
        className="relative bg-gradient-to-r from-[#4B1D1D] via-[#606E58] to-[#4B1D1D] text-[#FAF9F6] py-4 md:py-5 overflow-hidden border-t-2 border-[#BC8E8E]/40 shadow-[0_-4px_16px_rgba(0,0,0,0.15)] select-none"
        id="homepage-marquee-section"
      >
        {/* Guarantees the scroll animation works regardless of Tailwind config */}
        <style>{`
          @keyframes shreeji-marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .shreeji-marquee-track {
            animation: shreeji-marquee-scroll 28s linear infinite;
          }
        `}</style>
 
        {/* Soft top highlight line to visually detach it from the hero image above */}
        <div className="absolute top-0 inset-x-0 h-px bg-white/20" />
 
        <div className="flex whitespace-nowrap w-max shreeji-marquee-track">
          <div className="flex items-center gap-10 md:gap-14 text-[10px] md:text-xs font-bold tracking-[0.25em] font-sans uppercase shrink-0 px-6">
            {marqueeItems.map((item, i) => (
              <React.Fragment key={`a-${i}`}>
                <span>{item}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#EAE6DF]/70 shrink-0" />
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center gap-10 md:gap-14 text-[10px] md:text-xs font-bold tracking-[0.25em] font-sans uppercase shrink-0 px-6">
            {marqueeItems.map((item, i) => (
              <React.Fragment key={`b-${i}`}>
                <span>{item}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#EAE6DF]/70 shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
 
      {/* Featured Categories Grid (Jaipur Wala Inspiration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="homepage-categories-section">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
            Crafted for Elegance
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-neutral-800 mt-1 uppercase tracking-wide">
            Browse Our Textiles
          </h2>
          <div className="w-12 h-[2px] bg-[#4B1D1D] mx-auto mt-4" />
        </div>
 
        {/* Scrolling Category Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-center group focus:outline-none cursor-pointer"
              id={`home-category-card-${cat.slug}`}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-xs group-hover:shadow-md group-hover:border-[#4B1D1D]/25 transition-all duration-500 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <span className="mt-3 text-[11px] md:text-xs font-bold tracking-[0.15em] text-neutral-700 group-hover:text-[#4B1D1D] transition-colors font-sans uppercase text-center leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>
 
      {/* Best Sellers Segment */}
      <section className="bg-white border-y border-gray-100/60 py-20" id="homepage-bestsellers-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
                Curated Favorites
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-neutral-800 mt-1 uppercase tracking-wide">
                Best Sellers
              </h2>
            </div>
            <Link
              to="/shop?filter=Best Sellers"
              className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#4B1D1D] hover:text-[#1A1A1A] font-sans uppercase mt-4 md:mt-0 group"
              id="view-all-bestsellers-link"
            >
              Explore Collection
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
 
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellerProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>
 
      {/* Aesthetic Middle Banner - Full Width Parallex Look */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center text-white text-center px-4" id="homepage-mid-banner">
        <div className="absolute inset-0 bg-black/45 z-10" />
        <img
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1600"
          alt="Shreeji Homes Heritage Craft"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 max-w-2xl">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#EAE6DF] font-sans block mb-3">
            Hand block-printed by masters
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-semibold leading-tight mb-4 uppercase tracking-wide">
            Woven with Heritage, Styled for Comfort
          </h2>
          <p className="text-xs md:text-sm text-neutral-200 font-sans leading-relaxed mb-8 max-w-lg mx-auto">
            Each pattern in our collection tells a timeless story of Jaipur craftsmanship, printed on extra-fine cotton by family guilds preserving generational skills.
          </p>
          <Link
            to="/our-story"
            className="px-6 py-3 bg-white text-[#333] hover:bg-[#4B1D1D] hover:text-white text-xs font-bold tracking-[0.2em] font-sans uppercase transition-all duration-300 rounded shadow-sm"
            id="mid-banner-cta-link"
          >
            Our Artisanal Journey
          </Link>
        </div>
      </section>
 
      {/* New Arrivals & Luxury Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="homepage-newarrivals-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
              Just Unveiled
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-neutral-800 mt-1 uppercase tracking-wide">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?filter=New Arrivals"
            className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#4B1D1D] hover:text-[#1A1A1A] font-sans uppercase mt-4 md:mt-0 group"
            id="view-all-newarrivals-link"
          >
            View New Additions
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
 
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivalProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>
 
      {/* Why Choose Us Segment */}
      <section className="bg-[#F2EFE9] py-20 border-t border-gray-100/50" id="homepage-benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#4B1D1D] tracking-[0.25em] uppercase font-sans">
              The Shreeji Guarantee
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-neutral-800 mt-1 uppercase tracking-wide">
              Why Choose Shreeji Homes?
            </h2>
            <div className="w-12 h-[2px] bg-[#4B1D1D] mx-auto mt-4" />
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100/80 shadow-xs flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#F2EFE9] rounded-xl flex items-center justify-center text-[#4B1D1D] mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#333] mb-2 uppercase tracking-wide">
                100% Organic Mulmul
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                We use strictly certified long-staple cotton and organic mulmul, providing ultra-breathable, hypoallergenic, and fluffy textures that get softer with every single wash.
              </p>
            </div>
 
            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100/80 shadow-xs flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#F2EFE9] rounded-xl flex items-center justify-center text-[#4B1D1D] mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#333] mb-2 uppercase tracking-wide">
                Authentic Handblock Craft
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                No chemical screening. Our products are block-printed using authentic natural vegetable inks and hand-carved teakwood stamps by generational craftsmen.
              </p>
            </div>
 
            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100/80 shadow-xs flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#F2EFE9] rounded-xl flex items-center justify-center text-[#4B1D1D] mb-6">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#333] mb-2 uppercase tracking-wide">
                Seamless Order Care
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                By bypassing cold, impersonal checkout bots, we connect you immediately to a dedicated human styling agent on WhatsApp to guide custom sizing and personal requests.
              </p>
            </div>
          </div>
        </div>
      </section>
 
      {/* Customer Testimonials Segment */}
      <section className="bg-white py-20" id="homepage-reviews-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
              Patron Words
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-neutral-800 mt-1 uppercase tracking-wide">
              Store Testimonials
            </h2>
            <div className="w-12 h-[2px] bg-[#4B1D1D] mx-auto mt-4" />
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-neutral-50/70 p-8 rounded-xl border border-gray-100 flex flex-col justify-between"
                id={`homepage-testimonial-item-${rev.id}`}
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 text-[#BC8E8E] mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed italic mb-6">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
 
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/50">
                  {rev.avatar ? (
                    <img 
                      src={rev.avatar} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 object-cover rounded-full" 
                    />
                  ) : (
                    <div className="w-9 h-9 bg-neutral-200 rounded-full flex items-center justify-center text-xs font-bold font-sans">
                      {rev.userName[0]}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-[#333] font-sans uppercase tracking-wider">{rev.userName}</h4>
                    <span className="text-[10px] text-gray-400 font-sans uppercase tracking-widest block">Verified Patron</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Instagram Feed Grid (@shreeji_homes14) */}
      <section className="bg-neutral-50/50 py-20 border-t border-gray-100" id="homepage-instagram-feed-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#4B1D1D] tracking-[0.25em] uppercase font-sans">
              Join our Journey
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-800 mt-1 uppercase tracking-wide">
              @shreeji_homes14
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-sans">
              Follow us on Instagram for daily inspirations, weaving stories, and design previews
            </p>
          </div>
 
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {instagramFeed.map((post, idx) => (
              <a
                key={idx}
                href="https://instagram.com/shreeji_homes14"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100 shadow-xs block"
                id={`home-insta-post-${idx}`}
              >
                <div className="absolute inset-0 bg-[#4B1D1D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center text-white flex-col gap-1">
                  <span className="text-xs font-bold tracking-wider uppercase font-sans">View Post</span>
                  <span className="text-[10px] opacity-75">♥ {post.likes}</span>
                </div>
                <img
                  src={post.url}
                  alt="Shreeji Homes lifestyle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
 
      {/* Elegant Newsletter Subscription */}
      <section className="bg-[#4B1D1D] text-white py-20 relative overflow-hidden" id="homepage-newsletter-section">
        {/* Fine gold concentric shapes backgrounds */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
 
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#EAE6DF] font-sans block mb-3">
            Complimentary Newsletter
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-semibold mb-4 uppercase tracking-wide leading-tight">
            Subscribe For Exquisite Previews
          </h2>
          <p className="text-xs text-[#EAE6DF] max-w-md mx-auto leading-relaxed mb-8 font-sans">
            Be the very first to gain access to newly released seasonal handblock designs, artisan profiles, and limited heritage catalogs.
          </p>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to Shreeji Homes previews.');
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            id="home-newsletter-form"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-xs focus:outline-none focus:border-white focus:bg-white/15 font-sans transition-all"
              id="home-newsletter-input"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-[#4B1D1D] hover:bg-neutral-100 font-sans text-xs font-bold tracking-widest uppercase rounded-lg transition-all shrink-0 cursor-pointer"
              id="home-newsletter-submit-btn"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
 
      {/* Active Quick View Product Modal */}
      <QuickViewModal
        product={selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
      />
    </div>
  );
};
 