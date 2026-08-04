import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Mail, Phone, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getWhatsAppGeneralLink } from '../utils';

export const Contact: React.FC = () => {
  const { settings, whatsAppNumber } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleGeneralWhatsAppLink = () => {
    const link = getWhatsAppGeneralLink(whatsAppNumber, subject || 'General Linen Inquiry');
    window.open(link, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="contact-page-container">
      <SEO title="Contact Hospitality & Enquiries" />

      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
            In Service of Comfort
          </span>
          <h1 className="text-3xl sm:text-4.5xl font-serif font-bold text-neutral-800 mt-2 tracking-wide uppercase">
            Contact Support
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-2 max-w-md mx-auto leading-relaxed">
            Our hospitality consultants are available to assist with coordinate selections, wholesale requests, custom drapes, and delivery tracking.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column: Hotlines, social link & Direct WhatsApp click */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xs space-y-6">
            <h2 className="text-lg font-serif font-bold text-neutral-800 uppercase tracking-wide">
              Direct Channels
            </h2>

            <div className="space-y-6">
              
              {/* WhatsApp direct help line */}
              <div className="bg-[#F2EFE9] p-5 rounded-xl border border-[#4B1D1D]/10 text-center">
                <MessageSquare className="w-8 h-8 text-[#4B1D1D] mx-auto mb-3" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">Live Chat Assistance</h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed max-w-xs mx-auto mb-4 font-sans">
                  The fastest way to verify blockprint stock and coordinate custom bed sizes is on WhatsApp directly.
                </p>
                <button
                  onClick={handleGeneralWhatsAppLink}
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold tracking-widest uppercase rounded-lg shadow-md transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  id="contact-whatsapp-chat-btn"
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                  Chat with Stylist
                </button>
              </div>

              {/* standard contact list details */}
              <div className="space-y-4 text-xs font-sans text-neutral-600">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#BC8E8E] shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Patron Care Hotline</span>
                    <span className="text-[#333] font-medium">{settings?.phone || '+91 90244 44555'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#BC8E8E] shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Written Enquiries</span>
                    <span className="text-[#333] font-medium">{settings?.email || 'enquiry@shreejihomes.com'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#BC8E8E] shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Support Hours</span>
                    <span className="text-[#333] font-medium">Daily: 10:00 AM – 8:00 PM IST</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right column: Form inquiry setup */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xs">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border border-green-100 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#333] uppercase tracking-wide">Message Conveyed</h3>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed max-w-sm mx-auto">
                  Thank you, {name}. Your inquiry regarding &ldquo;{subject}&rdquo; has been routed to our corporate directors. We will contact you at {email} within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="px-5 py-2.5 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] text-[10px] font-bold tracking-widest uppercase font-sans rounded"
                  id="submit-another-inquiry-btn"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4" id="contact-inquiry-form">
                <h3 className="text-lg font-serif font-bold text-neutral-800 uppercase tracking-wide mb-1">
                  Submit Written Inquiry
                </h3>
                <p className="text-xs text-neutral-400 font-sans mb-4">
                  Fill out our official written register and our hospitality specialists will trace back to you.
                </p>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 block font-sans">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] focus:border-[#4B1D1D]/30"
                    id="contact-form-name"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 block font-sans">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] focus:border-[#4B1D1D]/30"
                      id="contact-form-email"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 block font-sans">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] focus:border-[#4B1D1D]/30"
                      id="contact-form-phone"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 block font-sans">
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Custom size double bedsheet request"
                    className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] focus:border-[#4B1D1D]/30"
                    id="contact-form-subject"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 block font-sans">
                    Detailed Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your design needs, customized sizing, or delivery question..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] focus:border-[#4B1D1D]/30 resize-none"
                    id="contact-form-message"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white rounded-lg text-xs font-bold font-sans uppercase tracking-[0.2em] shadow-md transition-all cursor-pointer"
                  id="contact-form-submit-btn"
                >
                  Convey Inquiry
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
