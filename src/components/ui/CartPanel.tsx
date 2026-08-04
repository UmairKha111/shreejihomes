import React, { useEffect } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils';
import { useNavigate } from 'react-router-dom';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const { cart, cartCount, cartTotal, updateCartQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  // Prevent background scrolling when cart drawer is active
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="cart-drawer-root">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        id="cart-drawer-backdrop"
      />

      {/* Drawer Container */}
      <div 
        className="relative bg-[#FAF9F6] w-full max-w-md h-full shadow-2xl flex flex-col z-10 animate-slide-in-right border-l border-[#BC8E8E]/20"
        id="cart-drawer-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#BC8E8E]/20 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#4B1D1D]" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A] font-sans">
              Shopping Cart ({cartCount})
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-100 rounded-sm transition-colors text-gray-500 hover:text-[#4B1D1D]"
            id="cart-drawer-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[#F2EFE9] border border-[#BC8E8E]/10 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-[#BC8E8E]" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-700 font-sans">Your Cart is Empty</p>
              <p className="text-xs text-gray-500 mt-2 max-w-xs font-sans leading-relaxed">
                Add premium Indian textiles, hand-block quilts, or luxury home linens to get started.
              </p>
              <button
                onClick={() => {
                  navigate('/shop');
                  onClose();
                }}
                className="mt-6 px-6 py-3 bg-[#4B1D1D] text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#1A1A1A] transition-colors"
                id="cart-drawer-empty-shop-btn"
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-[#BC8E8E]/10">
              {cart.map((item, idx) => (
                <div 
                  key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} 
                  className={`flex gap-4 pt-4 ${idx === 0 ? 'pt-0' : ''}`}
                  id={`cart-item-${item.product.id}`}
                >
                  {/* Image */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => {
                      navigate(`/product/${item.product.id}`);
                      onClose();
                    }}
                    className="w-20 h-24 object-cover bg-[#F2EFE9] border border-[#BC8E8E]/10 cursor-pointer hover:opacity-90 transition-opacity shrink-0"
                  />

                  {/* Info details */}
                  <div className="flex-grow flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex justify-between gap-2">
                        <h4 
                          onClick={() => {
                            navigate(`/product/${item.product.id}`);
                            onClose();
                          }}
                          className="text-xs font-bold text-neutral-800 hover:text-[#4B1D1D] transition-colors font-sans cursor-pointer truncate"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Attribute Options */}
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.selectedSize && (
                          <span className="inline-block bg-[#F2EFE9] text-gray-600 text-[9px] uppercase tracking-wider font-semibold font-sans px-2 py-0.5 border border-[#BC8E8E]/10">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="inline-block bg-[#F2EFE9] text-gray-600 text-[9px] uppercase tracking-wider font-semibold font-sans px-2 py-0.5 border border-[#BC8E8E]/10">
                            Color: {item.selectedColor}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#BC8E8E]/20 bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="p-1 hover:bg-neutral-50 transition-colors text-neutral-500"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-neutral-700 font-sans min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          className="p-1 hover:bg-neutral-50 transition-colors text-neutral-500"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price total */}
                      <span className="text-xs font-bold text-[#1A1A1A] font-sans">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-[#BC8E8E]/20 p-6 space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider font-bold">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-base text-[#4B1D1D] font-serif italic">{formatPrice(cartTotal)}</span>
            </div>
            
            <p className="text-[10px] text-gray-400 font-sans leading-relaxed text-center">
              Submit your inquiry details on the next screen to finalize ordering via WhatsApp directly.
            </p>

            <button
              onClick={() => {
                navigate('/checkout');
                onClose();
              }}
              className="w-full py-4 bg-[#4B1D1D] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#1A1A1A] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              id="cart-checkout-btn"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 border border-[#BC8E8E]/30 text-gray-700 hover:bg-[#F2EFE9] text-[10px] uppercase tracking-[0.15em] font-semibold transition-colors"
              id="cart-continue-browsing-btn"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
