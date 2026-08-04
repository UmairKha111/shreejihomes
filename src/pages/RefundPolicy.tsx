import React from 'react';
import { SEO } from '../components/common/SEO';
import { RefreshCw } from 'lucide-react';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="refund-policy-page">
      <SEO title="Returns & Exchange Refund Policy" />

      <div className="bg-white border-b border-gray-100 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RefreshCw className="w-8 h-8 text-[#4B1D1D] mx-auto mb-3" />
          <h1 className="text-3xl font-serif font-bold text-neutral-800 tracking-wide uppercase">
            Return & Refund Policy
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-2">Effective Date: July 24, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 bg-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
        <p>
          Since Shreeji Homes products are handcrafted, block-printed, and manually tagai-stitched by traditional artisans, each piece has its own unique texture. We are committed to your complete satisfaction with these fine linens.
        </p>

        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-sans pt-2 border-b border-gray-150 pb-1">
          1. 7-Day Complimentary Exchange Window
        </h3>
        <p>
          We offer a complimentary 7-day exchange window if your product arrived damaged, if there was a sizing mismatch, or if you received an incorrect design.
        </p>

        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-sans pt-2 border-b border-gray-150 pb-1">
          2. Conditions for Return / Exchange Eligibility
        </h3>
        <p>
          To qualify for a successful exchange or return credit:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The product must remain unused, unwashed, and in its original handloom canvas bag.</li>
          <li>All original paper-tag loops and card tags must remain attached.</li>
          <li>Custom-ordered bedsheets or curtains of bespoke heights are non-refundable unless verified as structurally defective on arrival.</li>
        </ul>

        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-sans pt-2 border-b border-gray-150 pb-1">
          3. How to File an Exchange Request
        </h3>
        <p>
          Simply click your original product link or open your chat with our WhatsApp support line (+91 90244 44555) with photos of the delivered item and your original booking message. Our delivery partner will pick up the package from your doorstep within 48 hours and dispatch your replacement immediately.
        </p>

        <p className="text-neutral-400 text-[11px] pt-4">
          Refunds are issued as Store Credits or bank transfers upon package inspection. For custom refund questions, contact care@shreejihomes.com.
        </p>
      </div>
    </div>
  );
};
