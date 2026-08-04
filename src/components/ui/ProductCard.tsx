import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';
import { formatPrice, getWhatsAppOrderLink } from '../../utils';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist, whatsAppNumber } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const isBestseller = product.collections.includes('Best Sellers');
  const isNew = product.collections.includes('New Arrivals');
  const isLuxury = product.collections.includes('Luxury Collection');
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const saved = isInWishlist(product.id);

  // Fallback to first image if second isn't available
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div 
      className="group flex flex-col h-full bg-white select-none transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`product-card-${product.id}`}
    >
      {/* Product Image Area */}
      <div className="relative w-full aspect-[4/5] bg-neutral-50 overflow-hidden rounded-xl border border-gray-100/50">
        
        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-300 ${
            saved 
              ? 'bg-white text-[#4B1D1D]' 
              : 'bg-white/80 text-gray-500 hover:text-[#4B1D1D] hover:bg-white'
          }`}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          id={`wishlist-toggle-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
          {hasDiscount && (
            <span className="bg-[#4B1D1D] text-white text-[9px] font-bold font-sans uppercase tracking-[0.15em] px-2.5 py-1 rounded shadow-sm">
              ON SALE
            </span>
          )}
          {isNew && (
            <span className="bg-[#8F9779] text-white text-[9px] font-bold font-sans uppercase tracking-[0.15em] px-2.5 py-1 rounded shadow-sm">
              NEW
            </span>
          )}
          {isBestseller && !hasDiscount && (
            <span className="bg-[#BC8E8E] text-white text-[9px] font-bold font-sans uppercase tracking-[0.15em] px-2.5 py-1 rounded shadow-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* The Product Image itself with hover zoom */}
        <Link to={`/product/${product.id}`} className="block w-full h-full" id={`product-img-link-${product.id}`}>
          <img
            src={displayImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick View & WhatsApp CTAs Overlay (Slides up on Hover) */}
        <div className="absolute inset-x-4 bottom-4 z-25 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="flex-1 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold font-sans uppercase tracking-widest shadow-lg transition-colors cursor-pointer"
            id={`quick-view-btn-${product.id}`}
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <a
            href={getWhatsAppOrderLink(whatsAppNumber, product)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-11 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-lg flex items-center justify-center shadow-lg transition-colors"
            title="Order directly on WhatsApp"
            id={`whatsapp-direct-btn-${product.id}`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
            </svg>
          </a>
        </div>
      </div>

      {/* Product Information Detail */}
      <div className="pt-4 pb-2 px-1 flex-1 flex flex-col">
        {/* Category Label */}
        <span className="text-[10px] font-bold text-[#BC8E8E] uppercase tracking-[0.2em] font-sans mb-1">
          {product.category}
        </span>

        {/* Product Title */}
        <Link 
          to={`/product/${product.id}`}
          className="text-[14px] md:text-base font-serif font-semibold text-neutral-800 hover:text-[#4B1D1D] transition-colors leading-snug mb-1"
          id={`product-title-link-${product.id}`}
        >
          {product.name}
        </Link>

        {/* Fabric and Weave Specs (Subtle Detail) */}
        <span className="text-xs text-neutral-400 font-sans mb-2 block">
          {product.fabric || 'Pure Cotton'} • {product.pattern || 'Printed'}
        </span>

        {/* Pricing Block */}
        <div className="mt-auto flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm font-bold text-[#4B1D1D] font-sans">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-neutral-400 line-through font-sans">
                {formatPrice(product.originalPrice!)}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-neutral-800 font-sans">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
