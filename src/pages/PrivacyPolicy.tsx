import React from 'react';
import { SEO } from '../components/common/SEO';
import { ShieldAlert } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="privacy-policy-page">
      <SEO title="Privacy & Data Protection Policy" />

      <div className="bg-white border-b border-gray-100 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldAlert className="w-8 h-8 text-[#4B1D1D] mx-auto mb-3" />
          <h1 className="text-3xl font-serif font-bold text-neutral-800 tracking-wide uppercase">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-2">Effective Date: July 24, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 bg-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
        <p>
          At Shreeji Homes, we hold your trust and privacy in the highest regard. This Privacy Policy outlines how we collect, store, and protect your personal information when you browse our catalog or engage in consultations with our agents.
        </p>

        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-sans pt-2 border-b border-gray-150 pb-1">
          1. Information We Collect
        </h3>
        <p>
          When you place a WhatsApp inquiry, make a physical showroom reservation, or submit a corporate contact form, we collect minimum necessary details including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your full name and contact mobile number</li>
          <li>Your physical delivery shipping address</li>
          <li>Basic browser cache preferences stored in your browser storage</li>
        </ul>

        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-sans pt-2 border-b border-gray-150 pb-1">
          2. How We Use Your Information
        </h3>
        <p>
          Your contact information is strictly utilized to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Verify product stock availability and customize your bed sizes</li>
          <li>Book shipping couriers and deliver packages pan-India</li>
          <li>Dispatch occasional private newsletters or collection alerts if requested</li>
        </ul>

        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-sans pt-2 border-b border-gray-150 pb-1">
          3. Absolute Protection Guarantee
        </h3>
        <p>
          We will NEVER sell, lease, or distribute your email addresses, phone numbers, or delivery coordinates to third-party marketing brokers. All details remain securely stored inside our offline ledger databases.
        </p>

        <p className="text-neutral-400 text-[11px] pt-4">
          For questions regarding data removal or modifications, please email security@shreejihomes.com.
        </p>
      </div>
    </div>
  );
};
