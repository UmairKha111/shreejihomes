import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { useShop } from '../context/ShopContext';
import { Search, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { getWhatsAppGeneralLink } from '../utils';

export const FAQs: React.FC = () => {
  const { faqs, whatsAppNumber } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="faqs-page-container">
      <SEO title="Frequently Asked Questions & Support" />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
            Client Registry Care
          </span>
          <h1 className="text-3xl sm:text-4.5xl font-serif font-bold text-neutral-800 mt-2 tracking-wide uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-2 max-w-md mx-auto leading-relaxed">
            Quick solutions regarding our artisanal Jaipuri handblock processes, fabric care, and custom sizing setups.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        
        {/* Keyword Search */}
        <div className="relative mb-8 shadow-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 focus:border-[#4B1D1D]/30 rounded-xl text-xs font-sans outline-none text-[#333]"
            id="faqs-search-input"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Accordions List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-600 font-sans">No matches found</p>
            <p className="text-xs text-gray-400 mt-1 font-sans">Try searching other key terms like &ldquo;care&rdquo;, &ldquo;delivery&rdquo; or &ldquo;COD&rdquo;.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = expandedIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-xs"
                  id={`faq-accordion-item-${idx}`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-sans focus:outline-none cursor-pointer"
                  >
                    <div className="flex-1">
                      <span className="text-[9px] font-bold text-[#BC8E8E] uppercase tracking-wider font-sans block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-neutral-800">
                        {faq.question}
                      </h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-neutral-500 leading-relaxed font-sans border-t border-gray-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Need more help CTA card */}
        <div className="bg-neutral-900 text-white rounded-xl p-8 border border-neutral-800 text-center space-y-4 mt-12 shadow-md">
          <MessageCircle className="w-8 h-8 text-[#BC8E8E] mx-auto mb-2" />
          <h3 className="text-base font-serif font-bold uppercase tracking-wider">Still Have Queries?</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
            Our hospitality consultants are available to assist you 1-on-1 on WhatsApp to guide custom sizes or tracking.
          </p>
          <a
            href={getWhatsAppGeneralLink(whatsAppNumber, 'Enquiry after reviewing FAQs')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-lg text-xs font-bold font-sans uppercase tracking-widest inline-flex items-center gap-1.5 transition-colors shadow-sm"
            id="faq-whatsapp-enquiry-btn"
          >
            Direct WhatsApp Assistance
          </a>
        </div>

      </div>
    </div>
  );
};
