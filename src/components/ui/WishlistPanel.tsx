import React, { useEffect } from 'react';
import { X, Heart, Trash2, Send } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice, getWhatsAppOrderLink } from '../../utils';

interface WishlistPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToProduct: (id: string) => void;
}

export const WishlistPanel: React.FC<WishlistPanelProps> = ({
  isOpen,
  onClose,
  onNavigateToProduct
}) => {
  const { wishlist, products, toggleWishlist, whatsAppNumber } = useShop();

  // Prevent scroll behind the panel
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end"
      id="wishlist-drawer-root"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/35 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        id="wishlist-drawer-backdrop"
      />

      {/* Drawer Container */}
      <div 
        className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col z-10 animate-slide-in-right border-l border-gray-100"
        id="wishlist-drawer-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#eee]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#4B1D1D] fill-[#4B1D1D]" />
            <h3 className="text-base font-semibold uppercase tracking-wider text-[#333] font-sans">
              Saved Favorites ({wishlistedItems.length})
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-800"
            id="wishlist-drawer-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[#F2EFE9] rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-600 font-sans">Your wishlist is empty</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs font-sans leading-relaxed">
                Explore our premium collection of bedsheets, quilts, and curtains to save your favorite items.
              </p>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-gray-100">
              {wishlistedItems.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`flex gap-4 pt-4 ${idx === 0 ? 'pt-0' : ''} group`}
                  id={`wishlist-item-${item.id}`}
                >
                  {/* Image */}
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    onClick={() => {
                      onNavigateToProduct(item.id);
                      onClose();
                    }}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-50 border border-gray-100 cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#4B1D1D] uppercase tracking-wider font-sans">
                        {item.category}
                      </span>
                      <h4 
                        onClick={() => {
                          onNavigateToProduct(item.id);
                          onClose();
                        }}
                        className="text-sm font-medium text-gray-800 truncate cursor-pointer hover:text-[#4B1D1D] transition-colors font-sans mt-0.5"
                      >
                        {item.name}
                      </h4>
                      <p className="text-sm font-bold text-gray-900 mt-1 font-sans">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-2">
                      <a
                        href={getWhatsAppOrderLink(whatsAppNumber, item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] rounded text-[11px] font-bold tracking-wider uppercase font-sans transition-all duration-300"
                        id={`wishlist-order-btn-${item.id}`}
                      >
                        <Send className="w-3 h-3 fill-current" />
                        Order Now
                      </a>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-500 font-semibold font-sans uppercase tracking-wider transition-colors py-1 px-2"
                        id={`wishlist-remove-btn-${item.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedItems.length > 0 && (
          <div className="bg-gray-50 border-t border-gray-100 p-6 space-y-3">
            <div className="text-center text-xs text-gray-400 font-sans leading-relaxed mb-1">
              All transactions are conducted safely and personally on WhatsApp directly with our hospitality agents.
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 border border-[#4B1D1D] text-[#4B1D1D] hover:bg-[#4B1D1D] hover:text-white font-sans text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300"
              id="wishlist-continue-shopping-btn"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
