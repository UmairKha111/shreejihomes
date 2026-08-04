import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail, Award, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 font-sans border-t border-neutral-800 pt-16 select-none">
      
      {/* Upper Features / Trust Indicators Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center px-4">
          <Award className="w-8 h-8 text-[#BC8E8E] mb-3" />
          <h4 className="text-sm font-semibold text-white tracking-widest font-sans uppercase mb-1">Elite Quality</h4>
          <p className="text-xs text-neutral-400 font-sans">Traditional weave with long-staple organic cottons.</p>
        </div>
        <div className="flex flex-col items-center text-center px-4">
          <Truck className="w-8 h-8 text-[#BC8E8E] mb-3" />
          <h4 className="text-sm font-semibold text-white tracking-widest font-sans uppercase mb-1">Complimentary Ship</h4>
          <p className="text-xs text-neutral-400 font-sans">Free priority shipping and fast packaging pan-India.</p>
        </div>
        <div className="flex flex-col items-center text-center px-4">
          <RefreshCw className="w-8 h-8 text-[#BC8E8E] mb-3" />
          <h4 className="text-sm font-semibold text-white tracking-widest font-sans uppercase mb-1">COD & Support</h4>
          <p className="text-xs text-neutral-400 font-sans">Full Cash on Delivery option and 1-on-1 WhatsApp assistance.</p>
        </div>
        <div className="flex flex-col items-center text-center px-4">
          <ShieldCheck className="w-8 h-8 text-[#BC8E8E] mb-3" />
          <h4 className="text-sm font-semibold text-white tracking-widest font-sans uppercase mb-1">Authentic Craft</h4>
          <p className="text-xs text-neutral-400 font-sans">100% genuine hand-block prints sourced directly.</p>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand Bio */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif text-white font-bold tracking-wider uppercase">
            Shreeji Homes
          </h3>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Elevating modern living spaces with premium traditional home linens. Specializing in masterfully woven bedsheets, fluffy organic mulmul razais, and exquisite custom drapes that weave heritage into luxury.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com/shreeji_homes14"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-neutral-800 text-white hover:bg-[#4B1D1D] rounded-full flex items-center justify-center transition-all duration-300"
              title="Follow Shreeji Homes on Instagram"
              id="footer-instagram-social-link"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Collections */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white tracking-[0.2em] font-sans uppercase">
            Collections
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/shop?category=Bedsheets" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-bedsheets">
                Luxury Bedsheets
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Razais" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-razais">
                Organic Mulmul Razais
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Quilts" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-quilts">
                Traditional Tagai Quilts
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Curtains" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-curtains">
                Premium Linen Curtains
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Cushion Covers" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-cushion-covers">
                Cushion & Sofa Covers
              </Link>
            </li>
          </ul>
        </div>

        {/* Essential Policies */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white tracking-[0.2em] font-sans uppercase">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/our-story" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-ourstory">
                Our Artisanal Heritage
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-shipping">
                Shipping & Delivery Policy
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-refund">
                Return & Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="text-neutral-400 hover:text-white transition-colors" id="footer-link-faq">
                FAQs & Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white tracking-[0.2em] font-sans uppercase">
            The Flagship Store
          </h4>
          <ul className="space-y-3 text-xs text-neutral-400 font-sans">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#BC8E8E] shrink-0 mt-0.5" />
              <span>
                Shreeji Homes Experience Center,<br />
                Elite Heritage Market, Near Jaipur Gate,<br />
                Jaipur, Rajasthan - 302001, India
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#BC8E8E] shrink-0" />
              <span>+91 90244 44555</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#BC8E8E] shrink-0" />
              <span className="break-all">enquiry@shreejihomes.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom copyright and simple creator credit */}
      <div className="bg-neutral-950 text-neutral-500 py-6 border-t border-neutral-900 text-center text-[11px] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Shreeji Homes. All rights reserved. Designed for discerning tastes.</p>
          <div className="flex gap-4 text-[10px] uppercase tracking-wider font-semibold">
            <Link to="/privacy-policy" className="hover:text-neutral-300">Privacy</Link>
            <span className="text-neutral-800">|</span>
            <Link to="/refund-policy" className="hover:text-neutral-300">Refunds</Link>
            <span className="text-neutral-800">|</span>
            <Link to="/shipping-policy" className="hover:text-neutral-300">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
