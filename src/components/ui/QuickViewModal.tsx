import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, Award, Heart, Shield } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { formatPrice, getWhatsAppOrderLink } from '../../utils';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { whatsAppNumber, toggleWishlist, isInWishlist, addToCart } = useShop();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);

  // Lock scrolling when modal is active
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      // Reset selections
      setActiveImageIdx(0);
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize('');
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor('');
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const orderLink = getWhatsAppOrderLink(whatsAppNumber, product, selectedSize, selectedColor);
  const isWishlisted = isInWishlist(product.id);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs select-none"
      onClick={onClose}
      id="quick-view-modal-backdrop"
    >
      <div 
        className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-none"
        onClick={(e) => e.stopPropagation()}
        id="quick-view-modal-content"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 rounded-full shadow-md transition-colors"
          aria-label="Close modal"
          id="quick-view-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-neutral-50/50 flex flex-col justify-between border-r border-gray-100 overflow-y-auto">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-gray-200/60 bg-white">
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-14 rounded-md overflow-hidden border-2 shrink-0 ${
                    activeImageIdx === idx ? 'border-[#4B1D1D]' : 'border-transparent opacity-65 hover:opacity-100'
                  } transition-all`}
                  id={`quick-view-thumb-${idx}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Options */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col h-full max-h-[50vh] md:max-h-[80vh]">
          {/* Category */}
          <span className="text-[11px] font-bold text-[#BC8E8E] uppercase tracking-[0.25em] font-sans">
            {product.category}
          </span>
          
          {/* Title */}
          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#333] mt-1.5 leading-tight">
            {product.name}
          </h2>

          {/* Price & Original Price */}
          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-lg font-extrabold text-[#4B1D1D] font-sans">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through font-sans">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs bg-[#F2EFE9] text-[#4B1D1D] font-bold font-sans px-2 py-0.5 rounded border border-[#4B1D1D]/10">
                SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="w-full h-px bg-gray-100 my-4" />

          {/* Description */}
          <p className="text-xs text-neutral-500 font-sans leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block mb-2">
                Select Size: <span className="text-gray-700 font-medium lowercase tracking-normal">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 rounded text-[11px] font-medium font-sans border transition-all duration-300 ${
                      selectedSize === sz
                        ? 'bg-[#4B1D1D] text-white border-[#4B1D1D] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                    id={`quick-view-size-${sz.replace(/\s+/g, '-')}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block mb-2">
                Select Color: <span className="text-gray-700 font-medium lowercase tracking-normal">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 rounded text-[11px] font-medium font-sans border transition-all duration-300 ${
                      selectedColor === col
                        ? 'bg-neutral-900 text-white border-neutral-950 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                    id={`quick-view-color-${col.replace(/\s+/g, '-')}`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-3 mt-auto pt-4 border-t border-gray-100">
            {addedToCartSuccess && (
              <div className="bg-[#FAF9F6] border border-[#BC8E8E]/30 p-2.5 flex items-center justify-between text-[11px] font-sans">
                <span className="text-emerald-600 font-bold">✓ Added to Cart!</span>
                <button
                  onClick={() => {
                    onClose();
                    // Click Navbar's cart trigger
                    const cartTrigger = document.getElementById('navbar-cart-trigger');
                    if (cartTrigger) cartTrigger.click();
                  }}
                  className="font-bold text-[#4B1D1D] uppercase tracking-wider hover:underline"
                >
                  View Cart
                </button>
              </div>
            )}

            <button
              onClick={() => {
                addToCart(product, 1, selectedSize, selectedColor);
                setAddedToCartSuccess(true);
                setTimeout(() => setAddedToCartSuccess(false), 5000);
              }}
              className="w-full py-3.5 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white text-xs font-bold font-sans uppercase tracking-[0.2em] shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              id="quick-view-add-to-cart"
            >
              Add to Shopping Cart
            </button>

            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-sm flex items-center justify-center gap-2 text-xs font-bold font-sans uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:translate-y-[-1px]"
              id="quick-view-whatsapp-cta"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              WhatsApp Express Buy
            </a>

            <div className="flex gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex-1 py-2.5 bg-gray-50 hover:bg-[#F2EFE9] text-gray-700 hover:text-[#4B1D1D] border border-gray-200 text-xs font-bold font-sans uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
                id="quick-view-wishlist-toggle"
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-[#4B1D1D]' : ''}`} />
                {isWishlisted ? 'Saved' : 'Save to Favorites'}
              </button>
              
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="flex-1 py-2.5 bg-white text-center hover:bg-neutral-50 text-neutral-800 border border-neutral-200 text-xs font-bold font-sans uppercase tracking-widest transition-all flex items-center justify-center"
                id="quick-view-full-details-link"
              >
                Full Details
              </Link>
            </div>
          </div>

          {/* Secure / Craft info */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-sans">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#BC8E8E]" />
              <span>Premium Craftsmanship</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#BC8E8E]" />
              <span>Authentic Jaipur Textiles</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
