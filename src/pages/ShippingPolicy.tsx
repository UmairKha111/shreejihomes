import React from 'react';
import { SEO } from '../components/common/SEO';
import { Truck } from 'lucide-react';

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="shipping-policy-page">
      <SEO title="Shipping & Priority Delivery Policy" />

      <div className="bg-white border-b border-gray-100 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Truck className="w-8 h-8 text-[#4B1D1D] mx-auto mb-3" />
          <h1 className="text-3xl font-serif font-bold text-neutral-800 tracking-wide uppercase">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-2">Effective Date: July 24, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 bg-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
        <p>
          We take extraordinary care in packing our premium home linens to ensure they reach you in immaculate, fresh-pressed condition. We utilize high-grade compostable cotton-canvas covers and waterproof outer cartons.
        </p>

        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-sans pt-2 border-b border-gray-150 pb-1">
          1. Complimentary Delivery Across India
        </h3>
        <p>
          We are pleased to offer completely free priority shipping across almost all postal pins in India. There are no surprise weight surcharges or hidden fuel additions during WhatsApp confirmation.
        </p>

        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-sans pt-2 border-b border-gray-150 pb-1">
          2. Shipping Timelines
        </h3>
        <p>
          Once your stock is confirmed by our concierge team:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, etc.):</strong> Handed to express courier; delivered within 3 – 5 business days.</li>
          <li><strong>Rest of India:</strong> Delivered within 5 – 7 business days.</li>
          <li><strong>Bespoke Customized Linens:</strong> Custom weaving and handblock-printing require an extra 7 days before courier dispatch.</li>
        </ul>

        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-sans pt-2 border-b border-gray-150 pb-1">
          3. Cash on Delivery (COD) Options
        </h3>
        <p>
          Complementary COD is supported in standard pins. A booking agent will verify your shipping pin code via WhatsApp before releasing the package.
        </p>

        <p className="text-neutral-400 text-[11px] pt-4">
          Tracking numbers are sent directly to your WhatsApp thread upon dispatch. For support, email fulfillment@shreejihomes.com.
        </p>
      </div>
    </div>
  );
};
