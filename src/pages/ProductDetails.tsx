import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Send, Sparkles, AlertCircle, ShoppingBag, ShieldCheck, ChevronRight, Share2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SEO } from '../components/common/SEO';
import { ProductCard } from '../components/ui/ProductCard';
import { QuickViewModal } from '../components/ui/QuickViewModal';
import { formatPrice, getWhatsAppOrderLink } from '../utils';
import { Product } from '../types';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, toggleWishlist, isInWishlist, whatsAppNumber, addToCart } = useShop();

  // Find product
  const product = products.find(p => p.id === id);

  // States
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details');
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);

  // Sizing of zoom box
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <SEO title="Product Not Found" />
        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-serif font-bold text-gray-800 uppercase tracking-wider">Product Not Found</h2>
        <p className="text-xs text-gray-400 mt-2">The product you are looking for does not exist or has been removed from our catalog.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block px-6 py-3 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] text-xs font-bold tracking-widest font-sans uppercase rounded-lg shadow-md"
          id="product-not-found-back-btn"
        >
          Back To Catalog
        </Link>
      </div>
    );
  }

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Fallback: if no products in same category, grab best sellers
  const displayRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : products.filter(p => p.id !== product.id).slice(0, 4);

  // Suggest a companion product for Frequently Bought Together
  const companionProduct = products.find(p => p.category !== product.category && p.id !== product.id) || products[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${product.images[activeImageIdx]})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%' // Zoom factor
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const isSaved = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const orderLink = getWhatsAppOrderLink(whatsAppNumber, product, selectedSize, selectedColor);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="product-detail-page-container">
      <SEO title={product.name} description={product.description} />

      {/* Breadcrumb path */}
      <div className="bg-white border-b border-gray-100 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400 font-sans tracking-widest uppercase flex flex-wrap items-center gap-1.5">
          <Link to="/" className="hover:text-[#4B1D1D] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-[#4B1D1D] transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#4B1D1D] transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main product setup block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Interactive Image Gallery with Magnifier */}
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
          
          {/* Main Visual box */}
          <div 
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex-1 relative aspect-[4/5] bg-white rounded-xl overflow-hidden border border-gray-150/60 shadow-xs cursor-zoom-in group"
            id="main-product-image-container"
          >
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            
            {/* Magnifier zoom overlay */}
            <div 
              style={zoomStyle}
              className="absolute inset-0 pointer-events-none border-2 border-white/20 shadow-2xl rounded-xl z-20"
              id="magnifier-zoom-overlay"
            />

            {/* Hint message on bottom left */}
            <span className="absolute bottom-4 left-4 z-10 text-[10px] uppercase font-bold tracking-widest font-sans text-white bg-neutral-900/60 backdrop-blur-xs px-2.5 py-1 rounded">
              Hover image to zoom
            </span>
          </div>

          {/* Sidelining Thumbnails (Vertically aligned in desktop, horizontally in mobile) */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[500px] pb-1 md:pb-0 scrollbar-none shrink-0" id="product-thumbnails-list">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 bg-white transition-all ${
                    activeImageIdx === idx 
                      ? 'border-[#4B1D1D] scale-[1.03] shadow-sm' 
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                  id={`product-thumb-${idx}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Descriptions & WhatsApp Ordering Form */}
        <div className="lg:col-span-5 flex flex-col h-full space-y-6" id="product-specification-form-panel">
          
          {/* Header block */}
          <div>
            <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-800 mt-1.5 leading-tight">
              {product.name}
            </h1>

            {/* Star ratings and review stats */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-[#BC8E8E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-700 font-sans">
                {product.rating} ({product.reviewsCount} verified reviews)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#F2EFE9] p-5 rounded-xl border border-[#4B1D1D]/10 flex items-baseline gap-4">
            <div>
              <span className="text-xs text-neutral-400 font-sans block mb-0.5">Discerning Price</span>
              <span className="text-2xl font-extrabold text-[#4B1D1D] font-sans">
                {formatPrice(product.price)}
              </span>
            </div>
            {hasDiscount && (
              <div className="border-l border-gray-200 pl-4">
                <span className="text-xs text-neutral-400 font-sans block mb-0.5">Original Price</span>
                <span className="text-sm text-neutral-400 line-through font-sans">
                  {formatPrice(product.originalPrice!)}
                </span>
              </div>
            )}
            {hasDiscount && (
              <span className="ml-auto text-xs bg-[#4B1D1D] text-white font-bold px-2.5 py-1 rounded shadow-xs font-sans">
                SAVE {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
              </span>
            )}
          </div>

          {/* Size choice block */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                Select Sizing Structure: <span className="text-neutral-800 tracking-normal lowercase font-semibold">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 border rounded-lg text-xs font-semibold font-sans transition-all duration-300 ${
                      selectedSize === sz
                        ? 'bg-[#4B1D1D] text-white border-[#4B1D1D] shadow-md'
                        : 'bg-white text-neutral-700 border-gray-200 hover:border-neutral-400'
                    }`}
                    id={`details-size-btn-${sz.replace(/\s+/g, '-')}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color choice block */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                Select Color Scheme: <span className="text-neutral-800 tracking-normal lowercase font-semibold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-4 py-2 border rounded-lg text-xs font-semibold font-sans transition-all duration-300 ${
                      selectedColor === col
                        ? 'bg-neutral-900 text-white border-neutral-950 shadow-md'
                        : 'bg-white text-neutral-700 border-gray-200 hover:border-neutral-400'
                    }`}
                    id={`details-color-btn-${col.replace(/\s+/g, '-')}`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="flex items-center gap-4 py-2 border-t border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans">
              Select Quantity:
            </span>
            <div className="flex items-center border border-[#BC8E8E]/20 bg-white overflow-hidden rounded-sm">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 hover:bg-[#F2EFE9] transition-colors text-neutral-600 font-bold text-xs"
                type="button"
              >
                -
              </button>
              <span className="px-4 text-xs font-bold text-gray-800 font-sans min-w-[28px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1.5 hover:bg-[#F2EFE9] transition-colors text-neutral-600 font-bold text-xs"
                type="button"
              >
                +
              </button>
            </div>
          </div>

          {/* Order Call-To-Action buttons */}
          <div className="space-y-3 pt-3">
            {/* Added to Cart Success Banner */}
            {addedToCartSuccess && (
              <div className="bg-[#FAF9F6] border border-[#BC8E8E]/40 p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 transition-all animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold text-xs font-sans">✓ Added to Cart!</span>
                  <span className="text-[11px] text-gray-500 font-sans">Quantity: {quantity}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      // Trigger click of the Navbar's cart trigger
                      const cartTrigger = document.getElementById('navbar-cart-trigger');
                      if (cartTrigger) cartTrigger.click();
                    }}
                    className="text-[10px] uppercase tracking-wider font-bold text-[#4B1D1D] hover:underline"
                  >
                    View Cart
                  </button>
                  <span className="text-gray-300">|</span>
                  <Link
                    to="/checkout"
                    className="text-[10px] uppercase tracking-wider font-bold text-neutral-800 hover:text-black"
                  >
                    Checkout Now
                  </Link>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                addToCart(product, quantity, selectedSize, selectedColor);
                setAddedToCartSuccess(true);
                setTimeout(() => setAddedToCartSuccess(false), 6000);
              }}
              className="w-full py-4 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white text-xs font-bold font-sans uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              id="product-details-add-to-cart-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Shopping Cart
            </button>

            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba56] text-white flex items-center justify-center gap-2.5 text-xs font-bold font-sans uppercase tracking-[0.2em] transition-all hover:translate-y-[-1px] focus:outline-none"
              id="product-details-whatsapp-order-btn"
            >
              <Send className="w-4 h-4 fill-current" />
              Express Checkout via WhatsApp
            </a>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-full py-3 bg-white hover:bg-[#F2EFE9] text-neutral-700 hover:text-[#4B1D1D] border border-gray-200 text-xs font-bold font-sans uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              id="product-details-wishlist-toggle-btn"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-[#4B1D1D]' : ''}`} />
              {isSaved ? 'Remove from Saved' : 'Save to Favorites Wishlist'}
            </button>
          </div>

          {/* Editorial / Info Tabs Accordion */}
          <div className="border border-gray-150 rounded-xl overflow-hidden bg-white" id="product-details-info-tabs">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-100 bg-neutral-50">
              {['details', 'specs', 'care'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 py-3 text-[10px] md:text-xs font-bold uppercase tracking-wider font-sans border-b-2 transition-all ${
                    activeTab === tab 
                      ? 'border-[#4B1D1D] text-[#4B1D1D] bg-white' 
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                  id={`tab-header-${tab}`}
                >
                  {tab === 'details' ? 'Description' : tab === 'specs' ? 'Specifications' : 'Care Guidelines'}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-5 min-h-[140px] text-xs leading-relaxed text-neutral-500 font-sans">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <div className="flex gap-2 items-center bg-yellow-50/55 text-[#BC8E8E] p-3 rounded-lg border border-[#BC8E8E]/10 mt-2 text-[11px] font-sans">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Every piece features authentic organic weave and Jaipur block motifs. Slight irregularities in patterns represent a natural outcome of artisanal hand-carved block prints.</span>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="divide-y divide-gray-100">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex py-2 justify-between">
                        <span className="font-bold text-neutral-600">{key}</span>
                        <span className="text-right text-neutral-500">{val}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-400">No specifications provided.</div>
                  )}
                </div>
              )}

              {activeTab === 'care' && (
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>Dry clean highly recommended for first 2-3 washes to lock hand-block printed inks.</li>
                  <li>Subsequent washes should use gentle machine setting on cold water only.</li>
                  <li>Do NOT use harsh synthetic bleaching elements or chlorines.</li>
                  <li>Avoid direct overhead intense tropical sun dry. Air dry in shadows.</li>
                  <li>Iron on reverse side using moderate warm settings.</li>
                </ul>
              )}
            </div>
          </div>

          {/* Secure / Premium badges */}
          <div className="flex justify-around items-center border border-gray-100/80 rounded-xl bg-white p-4 text-[10px] text-gray-400 font-sans">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-[#4B1D1D]" />
              <span>100% Verified Craft</span>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="flex flex-col items-center gap-1">
              <ShoppingBag className="w-5 h-5 text-[#4B1D1D]" />
              <span>UPI / COD Shipping</span>
            </div>
          </div>

        </div>

      </div>

      {/* Frequently Bought Together Segment (Clever Upsell Box) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-12 bg-white rounded-2xl border border-gray-100" id="frequently-bought-together-section">
        <h3 className="text-base font-bold text-neutral-800 uppercase tracking-widest font-sans mb-6">
          Frequently Bought Together
        </h3>
        
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Main Product Card */}
            <div className="flex items-center gap-4 bg-[#FAF9F6] p-4 rounded-xl border border-gray-100 max-w-sm w-full">
              <img src={product.images[0]} alt="" referrerPolicy="no-referrer" className="w-16 h-16 object-cover rounded-lg bg-gray-50 border border-gray-100 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-neutral-800 truncate max-w-[200px] font-sans">{product.name}</h4>
                <p className="text-xs text-[#4B1D1D] font-bold font-sans mt-0.5">{formatPrice(product.price)}</p>
              </div>
            </div>

            {/* Plus sign */}
            <span className="text-xl text-neutral-400 font-sans font-bold">+</span>

            {/* Companion Product Card */}
            <Link to={`/product/${companionProduct.id}`} className="flex items-center gap-4 bg-[#FAF9F6] p-4 rounded-xl border border-gray-100 max-w-sm w-full hover:border-[#4B1D1D]/30 transition-all group">
              <img src={companionProduct.images[0]} alt="" referrerPolicy="no-referrer" className="w-16 h-16 object-cover rounded-lg bg-gray-50 border border-gray-100 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold text-[#BC8E8E] uppercase tracking-wider block font-sans mb-0.5">{companionProduct.category}</span>
                <h4 className="text-xs font-bold text-neutral-800 truncate max-w-[200px] font-sans group-hover:text-[#4B1D1D] transition-colors">{companionProduct.name}</h4>
                <p className="text-xs text-[#4B1D1D] font-bold font-sans mt-0.5">{formatPrice(companionProduct.price)}</p>
              </div>
            </Link>
          </div>

          {/* Combined order details and pricing CTA */}
          <div className="bg-[#F2EFE9] p-6 rounded-xl border border-[#4B1D1D]/10 text-center md:text-right shrink-0 w-full md:w-auto">
            <p className="text-xs text-neutral-400 font-sans mb-1 uppercase tracking-wider">Bundle Package Price</p>
            <p className="text-xl font-extrabold text-[#4B1D1D] font-sans mb-4">
              {formatPrice(product.price + companionProduct.price)}
            </p>
            
            <a
              href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
                `Hello Shreeji Homes,\n\nI want to order this perfect coordinate bundle package:\n\n1. *Product 1:* ${product.name} (${formatPrice(product.price)})\n2. *Product 2:* ${companionProduct.name} (${formatPrice(companionProduct.price)})\n\n*Combined Price:* ${formatPrice(product.price + companionProduct.price)}\n\nPlease assist. Thank you!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-lg text-xs font-bold font-sans uppercase tracking-widest inline-flex items-center gap-2 shadow-md transition-all duration-300"
              id="bundle-order-whatsapp-btn"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              Order Coordinate Bundle
            </a>
          </div>
        </div>
      </section>

      {/* Related / Coordinate recommendations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="product-details-related-section">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
            Curated coordinate sets
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-800 mt-1 uppercase tracking-wide">
            You May Also Like
          </h2>
          <div className="w-12 h-[2px] bg-[#4B1D1D] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayRelated.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={(p) => setSelectedQuickViewProduct(p)}
            />
          ))}
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
