import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, Menu, X, Settings, ShoppingBag, Instagram, Facebook } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { SearchModal } from '../ui/SearchModal';
import { WishlistPanel } from '../ui/WishlistPanel';
import { CartPanel } from '../ui/CartPanel';
import logo from "../../assets/logo.png";
 
export const Navbar: React.FC = () => {
  const { wishlist, cartCount } = useShop();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
 
  const navLinks = [
    { label: 'SHOP', path: '/shop' },
    { label: 'OUR STORY', path: '/our-story' },
    { label: 'CONTACT', path: '/contact' },
    { label: 'FAQs', path: '/faqs' }
  ];
 
  // WhatsApp SVG icon (lucide mein nahi hai)
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
 
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-[#D6B98C]/20 shadow-sm transition-all duration-500 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
 
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#4B1D1D] hover:bg-[#F8F5F0] transition-all duration-300"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle-btn"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
 
          {/* Brand Logo */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <Link to="/" className="group flex items-center" id="navbar-brand-logo">
              <img
                src={logo}
                alt="Shreeji Homes"
                className="h-16 sm:h-20 lg:h-24 w-auto object-contain transition-all duration-500 group-hover:scale-105"
              />
            </Link>
          </div>
 
          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[13px] font-semibold tracking-[0.18em] uppercase pb-2 transition-all duration-500
                  after:absolute after:left-0 after:bottom-0 after:h-[2px]
                  after:bg-[#B58A52] after:w-0 after:transition-all after:duration-500
                  hover:text-[#4B1D1D] hover:after:w-full ${
                    isActive ? "text-[#4B1D1D] after:w-full" : "text-[#555]"
                  }`
                }
                id={`nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </NavLink>
            ))}
 
            {/* ✅ Social Media Links — desktop nav mein */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#D6B98C]/30">
              <a
                href="https://www.instagram.com/shreeji_homes14/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#E1306C] hover:scale-110 transition-all duration-200"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/shreejicollection"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#1877F2] hover:scale-110 transition-all duration-200"
                title="Facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/message/SUPDEXRWUPTDD1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#25D366] hover:scale-110 transition-all duration-200"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </nav>
 
          {/* Right Action Icons */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-[#4B1D1D] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              title="Search Catalog"
              aria-label="Search"
              id="navbar-search-trigger"
            >
              <Search className="w-5 h-5" />
            </button>
 
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-gray-600 hover:text-[#4B1D1D] hover:scale-105 active:scale-95 transition-all duration-200 relative cursor-pointer"
              title="Saved Favorites"
              aria-label="Wishlist"
              id="navbar-wishlist-trigger"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#4B1D1D] text-white text-[9px] font-bold font-sans w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>
 
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-600 hover:text-[#4B1D1D] hover:scale-105 active:scale-95 transition-all duration-200 relative cursor-pointer"
              title="Shopping Cart"
              aria-label="Shopping Cart"
              id="navbar-cart-trigger"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#4B1D1D] text-white text-[9px] font-bold font-sans w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
 
            <Link
              to="/admin/dashboard"
              className="p-2 text-gray-400 hover:text-[#4B1D1D] hover:scale-105 active:scale-95 transition-all duration-200"
              title="Owner Dashboard"
              aria-label="Owner Panel"
              id="navbar-admin-trigger"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
 
        </div>
 
        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 py-4 px-6 space-y-3 animate-fade-in-down">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-[11px] font-bold tracking-[0.2em] font-sans py-2.5 transition-all ${
                    isActive ? 'text-[#4B1D1D]' : 'text-gray-700 hover:text-[#4B1D1D]'
                  }`
                }
                id={`mobile-nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </NavLink>
            ))}
 
            {/* ✅ Social links — mobile menu mein bhi */}
            <div className="pt-3 border-t border-gray-100 flex items-center gap-5">
              <a
                href="https://www.instagram.com/shreeji_homes14/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#E1306C] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61576925008596&ref=NONE_xav_ig_profile_page_web#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/message/SUPDEXRWUPTDD1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
 
            <div className="pt-2 border-t border-gray-100">
              <Link
                to="/admin/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[11px] font-bold text-gray-400 hover:text-[#4B1D1D] flex items-center gap-1 font-sans tracking-[0.15em]"
                id="mobile-nav-admin-link"
              >
                <Settings className="w-3.5 h-3.5" />
                ARTISAN ADMIN PANEL
              </Link>
            </div>
          </div>
        )}
      </header>
 
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateToProduct={(productId) => navigate(`/product/${productId}`)}
      />
      <WishlistPanel
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onNavigateToProduct={(productId) => navigate(`/product/${productId}`)}
      />
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};
