import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { MapPin, Clock, Phone, Mail, Compass, Calendar, CheckCircle2, Copy, Check } from 'lucide-react';

export const StoreVisit: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const fullAddress = "Shreeji Homes Experience Center, Elite Heritage Market, Near Jaipur Gate, Jaipur, Rajasthan - 302001, India";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="store-visit-page-container">
      <SEO title="Visit Our Luxury Flagship Store" />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-[#BC8E8E] tracking-[0.25em] uppercase font-sans">
            Experiencing the Textures
          </span>
          <h1 className="text-3xl sm:text-4.5xl font-serif font-bold text-neutral-800 mt-2 tracking-wide uppercase">
            The Experience Center
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-2 max-w-md mx-auto leading-relaxed">
            Touch the raw linen yarns, feel the fluff of carded mulmul, and explore our full curated collections of home textiles first-hand.
          </p>
        </div>
      </div>

      {/* Store Location Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Address Cards, Directions, Map */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Card: Showroom Details */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xs space-y-6">
            <h2 className="text-xl font-serif font-bold text-neutral-800 uppercase tracking-wide">
              Showroom Details
            </h2>

            <div className="space-y-4 divide-y divide-gray-100">
              
              {/* Address detail */}
              <div className="flex gap-4 pt-4 first:pt-0">
                <MapPin className="w-5 h-5 text-[#4B1D1D] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-sans">Our Address</h4>
                  <p className="text-sm text-neutral-800 mt-1 leading-relaxed font-sans">{fullAddress}</p>
                  <button
                    onClick={handleCopyAddress}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-bold font-sans uppercase tracking-widest text-[#4B1D1D] hover:text-[#1A1A1A]"
                    id="copy-address-btn"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Address Copied' : 'Copy Full Address'}
                  </button>
                </div>
              </div>

              {/* Hours detail */}
              <div className="flex gap-4 pt-4">
                <Clock className="w-5 h-5 text-[#4B1D1D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-sans">Showroom Hours</h4>
                  <p className="text-sm text-neutral-800 mt-1 leading-relaxed font-sans">
                    Monday – Saturday: 10:30 AM – 8:30 PM<br />
                    Sunday: 11:30 AM – 6:30 PM
                  </p>
                </div>
              </div>

              {/* Direct call detail */}
              <div className="flex gap-4 pt-4">
                <Phone className="w-5 h-5 text-[#4B1D1D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-sans">Contact Hotline</h4>
                  <p className="text-sm text-neutral-800 mt-1 font-sans">+91 90244 44555</p>
                </div>
              </div>

            </div>
          </div>

          {/* Simulated Premium Google Map visual representation */}
          <div className="bg-neutral-900 aspect-video rounded-xl overflow-hidden relative border border-gray-200 shadow-md">
            {/* Dark blueprint map placeholder matching luxury theme */}
            <div className="absolute inset-0 bg-[#EAE6DF] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg text-[#4B1D1D] mb-4 border border-gray-150">
                <Compass className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-serif font-bold text-neutral-800 uppercase tracking-widest">Shreeji Homes Experience Center</h4>
              <p className="text-[11px] text-gray-400 mt-1.5 max-w-sm">
                Near historic Jaipur Gate, Elite Heritage Shopping Enclave.<br />
                We provide free premium valet parking for all patrons.
              </p>
              
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 px-5 py-2.5 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white text-[10px] font-bold font-sans uppercase tracking-widest rounded transition-colors"
                id="maps-direction-external-btn"
              >
                Open Google Maps Directions
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Appointment booking */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xs">
            
            {bookingSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border border-green-100">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#333] uppercase tracking-wide">Visit Requested</h3>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed max-w-xs mx-auto">
                  Thank you, {clientName}. Our hospitality manager has block-reserved <strong>{bookingDate} at {bookingTime}</strong> for your exclusive tour. We will call you on {clientPhone} shortly.
                </p>
                <button
                  onClick={() => {
                    setBookingSubmitted(false);
                    setClientName('');
                    setClientPhone('');
                  }}
                  className="px-4 py-2 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] text-[10px] font-bold tracking-wider uppercase font-sans rounded"
                  id="book-another-visit-btn"
                >
                  Book Another Slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookVisit} className="space-y-4" id="store-visit-booking-form">
                <div>
                  <h3 className="text-lg font-serif font-bold text-neutral-800 uppercase tracking-wide">
                    Reserve Showroom Visit
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 font-sans">
                    Reserve a complimentary 1-on-1 walkthrough with our linen styling specialists.
                  </p>
                </div>

                {/* Client Name Input */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] focus:border-[#4B1D1D]/30"
                    id="booking-name"
                  />
                </div>

                {/* Client Phone Input */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] focus:border-[#4B1D1D]/30"
                    id="booking-phone"
                  />
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] focus:border-[#4B1D1D]/30"
                      id="booking-date"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                      Preferred Hour
                    </label>
                    <select
                      required
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] focus:border-[#4B1D1D]/30"
                      id="booking-time"
                    >
                      <option value="">Select Time Slot</option>
                      <option value="11:00 AM">11:00 AM – 12:30 PM</option>
                      <option value="1:00 PM">1:00 PM – 2:30 PM</option>
                      <option value="3:00 PM">3:00 PM – 4:30 PM</option>
                      <option value="5:00 PM">5:00 PM – 6:30 PM</option>
                      <option value="7:00 PM">7:00 PM – 8:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Submit visit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white rounded-lg text-xs font-bold font-sans uppercase tracking-[0.2em] shadow-md transition-all mt-4 cursor-pointer"
                  id="submit-booking-btn"
                >
                  Confirm Reservation
                </button>

                <p className="text-[10px] text-gray-400 font-sans leading-relaxed text-center mt-2">
                  Visits are complimentary. Cancellation is simple by clicking the confirmation link sent to your phone.
                </p>

              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
