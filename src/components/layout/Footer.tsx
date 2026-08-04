import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, Award, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
 
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
          <ShieldCheck className="w-8 h-8 text-[#BC8E8E] mb-3" />
          <h4 className="text-sm font-semibold text-white tracking-widest font-sans uppercase mb-1">Authentic Craft</h4>
          <p className="text-xs text-neutral-400 font-sans">100% genuine hand-block prints sourced directly.</p>
        </div>
 
        <div className="flex flex-col items-center text-center px-4">
          <RefreshCw className="w-8 h-8 text-[#BC8E8E] mb-3" />
          <h4 className="text-sm font-semibold text-white tracking-widest font-sans uppercase mb-1">
            Crafted by Umanz Technology
          </h4>
          <p className="text-xs text-neutral-400 font-sans">
            Premium Website Design, Development & Digital Solutions for Modern Businesses.
          </p>
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
 
          {/* ✅ Social Links — Instagram + Facebook + WhatsApp */}
          <div className="flex items-center gap-3 pt-2">
 
            {/* Instagram */}
            <a
              href="https://www.instagram.com/shreeji_homes14/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-neutral-800 text-white hover:bg-[#E1306C] rounded-full flex items-center justify-center transition-all duration-300"
              title="Follow on Instagram"
              aria-label="Instagram"
              id="footer-instagram-link"
            >
              <Instagram className="w-4 h-4" />
            </a>
 
            {/* Facebook */}
            <a
              href="https://www.facebook.com/shreejicollection"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-neutral-800 text-white hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-all duration-300"
              title="Follow on Facebook"
              aria-label="Facebook"
              id="footer-facebook-link"
            >
              <Facebook className="w-4 h-4" />
            </a>
 
            {/* WhatsApp */}
            <a
              href="https://wa.me/message/SUPDEXRWUPTDD1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-neutral-800 text-white hover:bg-[#25D366] rounded-full flex items-center justify-center transition-all duration-300"
              title="Chat on WhatsApp"
              aria-label="WhatsApp"
              id="footer-whatsapp-link"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
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
                411006, Crown Co-Op Housing Society, Jai Jawan Nagar, Salwe Nagar, Yerawada, Pune, Maharashtra 411006, India
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
 
      {/* Footer Bottom */}
      <div className="bg-neutral-950 text-neutral-500 py-6 border-t border-neutral-900 text-[11px] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
 
          <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
            <p>
              © {currentYear} Shreeji Homes. All rights reserved. Designed for discerning tastes.
            </p>
 
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 text-[11px]">
              <span className="text-neutral-600">Crafted by</span>
              <span className="font-semibold text-white">Umanz Technology</span>
              <a href="https://umanztechnology.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">🌐 Website</a>
              <a href="https://instagram.com/umanztechnology" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">📸 Instagram</a>
              <a href="https://linkedin.com/company/umanztechnology" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">💼 LinkedIn</a>
              <a href="https://x.com/umanztechnology" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">𝕏 X</a>
              <a href="https://wa.me/916391157751" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">📱 +91 63911 57751</a>
            </div>
          </div>
 
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