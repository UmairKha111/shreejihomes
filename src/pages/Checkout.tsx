import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils';
import { SEO } from '../components/common/SEO';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Send, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  specialInstructions: string;
}

const INITIAL_FORM: CheckoutForm = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  paymentMethod: 'GPay / PhonePe / UPI',
  specialInstructions: ''
};

export const Checkout: React.FC = () => {
  const { cart, cartTotal, whatsAppNumber, clearCart } = useShop();
  const navigate = useNavigate();

  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedForm, setSubmittedForm] = useState<CheckoutForm | null>(null);
  const [submittedCart, setSubmittedCart] = useState<typeof cart>([]);
  const [submittedTotal, setSubmittedTotal] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutForm]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!form.phone.trim()) {
      newErrors.phone = 'Please enter your contact number';
    } else if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.address.trim()) newErrors.address = 'Please enter your shipping address';
    if (!form.city.trim()) newErrors.city = 'Please enter your city';
    if (!form.state.trim()) newErrors.state = 'Please enter your state';
    if (!form.pincode.trim()) {
      newErrors.pincode = 'Please enter your PIN code';
    } else if (!/^\d{6}$/.test(form.pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFormattedWhatsAppMessage = (
    formData: CheckoutForm,
    cartData: typeof cart,
    totalVal: number
  ): string => {
    let text = `Hello Shreeji Homes,\n\n`;
    text += `I would like to place a new order with the following details:\n\n`;

    text += `*👤 CUSTOMER INFO*\n`;
    text += `• *Name:* ${formData.fullName}\n`;
    text += `• *Phone:* ${formData.phone}\n`;
    text += `• *Email:* ${formData.email}\n`;
    text += `• *Address:* ${formData.address}\n`;
    text += `• *City & State:* ${formData.city}, ${formData.state}\n`;
    text += `• *Postal PIN:* ${formData.pincode}\n`;
    text += `• *Payment Preference:* ${formData.paymentMethod}\n\n`;

    text += `*📦 ORDER SUMMARY*\n`;
    cartData.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}*\n`;
      text += `   - Price: ${formatPrice(item.product.price)}\n`;
      text += `   - Quantity: ${item.quantity}\n`;
      if (item.selectedSize) {
        text += `   - Size: ${item.selectedSize}\n`;
      }
      if (item.selectedColor) {
        text += `   - Color: ${item.selectedColor}\n`;
      }
      text += `   - Subtotal: ${formatPrice(item.product.price * item.quantity)}\n\n`;
    });

    text += `*💳 GRAND TOTAL:* ${formatPrice(totalVal)}\n\n`;

    if (formData.specialInstructions.trim()) {
      text += `*📝 SPECIAL INSTRUCTIONS:* ${formData.specialInstructions}\n\n`;
    }

    text += `Please confirm availability of these items and provide shipping/payment confirmation. Thank you!`;
    return text;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Save current details for success view before clearing
    setSubmittedForm(form);
    setSubmittedCart(cart);
    setSubmittedTotal(cartTotal);

    const messageText = getFormattedWhatsAppMessage(form, cart, cartTotal);
    const cleanPhone = whatsAppNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp in a new window/tab
    window.open(waUrl, '_blank');

    // Complete order submission
    setTimeout(() => {
      clearCart();
      setIsSuccess(true);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  // Back up option to reopen link
  const handleReopenWhatsApp = () => {
    if (!submittedForm) return;
    const messageText = getFormattedWhatsAppMessage(submittedForm, submittedCart, submittedTotal);
    const cleanPhone = whatsAppNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
  };

  if (isSuccess && submittedForm) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center" id="checkout-success-view">
        <SEO title="Order Initiated" />
        <div className="bg-white border border-[#BC8E8E]/20 p-8 md:p-12 shadow-md">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest font-sans">
            Order Submitted to WhatsApp!
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mx-auto mt-3 font-sans leading-relaxed">
            We have redirected you to WhatsApp to complete your premium order with our linen specialists. Please send the pre-filled message in the chat to confirm your order.
          </p>

          <div className="my-8 max-w-md mx-auto p-4 bg-[#FAF9F6] border border-[#BC8E8E]/10 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Order Reference</h3>
            <p className="text-xs text-neutral-800 font-sans">
              <strong>Name:</strong> {submittedForm.fullName}<br />
              <strong>Phone:</strong> {submittedForm.phone}<br />
              <strong>Items Count:</strong> {submittedCart.reduce((sum, item) => sum + item.quantity, 0)}<br />
              <strong>Total Value:</strong> {formatPrice(submittedTotal)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReopenWhatsApp}
              className="px-6 py-3.5 bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider font-sans hover:bg-[#20ba56] transition-colors flex items-center justify-center gap-2"
              id="reopen-whatsapp-btn"
            >
              <Send className="w-4 h-4 fill-current" />
              Reopen WhatsApp Chat
            </button>
            <Link
              to="/shop"
              className="px-6 py-3.5 border border-[#4B1D1D] text-[#4B1D1D] hover:bg-[#4B1D1D] hover:text-white text-[11px] font-bold uppercase tracking-wider font-sans transition-colors flex items-center justify-center"
              id="back-to-shop-btn"
            >
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center" id="checkout-empty-view">
        <SEO title="Checkout" />
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-[#F2EFE9] border border-[#BC8E8E]/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-[#BC8E8E]" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest font-sans">
            Your Checkout Cart is Empty
          </h2>
          <p className="text-xs text-gray-500 mt-3 max-w-sm mx-auto font-sans leading-relaxed">
            Please add luxury linens, handcrafted duvets, or cushions to your basket before trying to checkout.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block px-8 py-3.5 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white text-[11px] font-bold tracking-[0.2em] font-sans uppercase transition-all shadow-xs"
            id="empty-checkout-back-btn"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="checkout-view-root">
      <SEO title="Secure Checkout" />

      {/* Breadcrumb / Back Link */}
      <div className="mb-8">
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#4B1D1D] font-sans tracking-wide uppercase transition-colors"
          id="checkout-back-to-shop-link"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to shop
        </Link>
        <h1 className="text-2xl font-bold uppercase tracking-widest text-[#1A1A1A] mt-3 font-sans">
          Secure Checkout
        </h1>
        <p className="text-xs text-gray-400 font-sans mt-0.5">
          Provide your shipping details to generate your curated order inquiry sheet for WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form billing/shipping column */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6" id="checkout-billing-form">
          <div className="bg-white border border-[#BC8E8E]/10 p-6 md:p-8 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4B1D1D] pb-3 border-b border-[#BC8E8E]/10 flex items-center gap-2 font-sans">
              <span>01.</span> Shipping Address details
            </h2>

            {/* Name / Phone fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block font-sans">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs bg-[#FAF9F6] border focus:outline-none transition-all font-sans ${
                    errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-[#BC8E8E]/20 focus:border-[#4B1D1D]'
                  }`}
                  placeholder="e.g. Rahul Sharma"
                  id="input-fullName"
                />
                {errors.fullName && (
                  <p className="text-[10px] text-red-500 font-medium font-sans flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block font-sans">
                  WhatsApp Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs bg-[#FAF9F6] border focus:outline-none transition-all font-sans ${
                    errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#BC8E8E]/20 focus:border-[#4B1D1D]'
                  }`}
                  placeholder="e.g. +91 98765 43210"
                  id="input-phone"
                />
                {errors.phone && (
                  <p className="text-[10px] text-red-500 font-medium font-sans flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Email address */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block font-sans">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 text-xs bg-[#FAF9F6] border focus:outline-none transition-all font-sans ${
                  errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#BC8E8E]/20 focus:border-[#4B1D1D]'
                }`}
                placeholder="e.g. rahul@example.com"
                id="input-email"
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 font-medium font-sans flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            {/* Shipping Address */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block font-sans">
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                rows={3}
                value={form.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 text-xs bg-[#FAF9F6] border focus:outline-none transition-all font-sans resize-none ${
                  errors.address ? 'border-red-400 focus:border-red-500' : 'border-[#BC8E8E]/20 focus:border-[#4B1D1D]'
                }`}
                placeholder="e.g. Flat No, Wing, Apartment Name, Street Name"
                id="input-address"
              />
              {errors.address && (
                <p className="text-[10px] text-red-500 font-medium font-sans flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.address}
                </p>
              )}
            </div>

            {/* City / State / Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block font-sans">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs bg-[#FAF9F6] border focus:outline-none transition-all font-sans ${
                    errors.city ? 'border-red-400 focus:border-red-500' : 'border-[#BC8E8E]/20 focus:border-[#4B1D1D]'
                  }`}
                  placeholder="e.g. Jaipur"
                  id="input-city"
                />
                {errors.city && (
                  <p className="text-[10px] text-red-500 font-medium font-sans flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.city}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block font-sans">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs bg-[#FAF9F6] border focus:outline-none transition-all font-sans ${
                    errors.state ? 'border-red-400 focus:border-red-500' : 'border-[#BC8E8E]/20 focus:border-[#4B1D1D]'
                  }`}
                  placeholder="e.g. Rajasthan"
                  id="input-state"
                />
                {errors.state && (
                  <p className="text-[10px] text-red-500 font-medium font-sans flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.state}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block font-sans">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleInputChange}
                  maxLength={6}
                  className={`w-full px-4 py-3 text-xs bg-[#FAF9F6] border focus:outline-none transition-all font-sans ${
                    errors.pincode ? 'border-red-400 focus:border-red-500' : 'border-[#BC8E8E]/20 focus:border-[#4B1D1D]'
                  }`}
                  placeholder="6 digit PIN"
                  id="input-pincode"
                />
                {errors.pincode && (
                  <p className="text-[10px] text-red-500 font-medium font-sans flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#BC8E8E]/10 p-6 md:p-8 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4B1D1D] pb-3 border-b border-[#BC8E8E]/10 flex items-center gap-2 font-sans">
              <span>02.</span> Payment Preference & Instructions
            </h2>

            {/* Payment dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block font-sans">
                Preferred Payment Method
              </label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-xs bg-[#FAF9F6] border border-[#BC8E8E]/20 focus:border-[#4B1D1D] focus:outline-none font-sans"
                id="select-paymentMethod"
              >
                <option value="GPay / PhonePe / UPI">GPay / PhonePe / UPI Payment (Recommended)</option>
                <option value="Direct Bank Transfer">Direct Bank Transfer (NEFT/IMPS)</option>
                <option value="Credit / Debit Card Invoice">International Card Payment (via Stripe Link)</option>
                <option value="Cash On Delivery">Cash On Delivery (COD)</option>
              </select>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block font-sans">
                Special order instructions (Optional)
              </label>
              <textarea
                name="specialInstructions"
                rows={3}
                value={form.specialInstructions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-xs bg-[#FAF9F6] border border-[#BC8E8E]/20 focus:border-[#4B1D1D] focus:outline-none font-sans resize-none"
                placeholder="e.g. Please wrap nicely, or deliver before Friday."
                id="input-specialInstructions"
              />
            </div>
          </div>

          {/* Checkout Submit CTA button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#4B1D1D] hover:bg-neutral-900 text-white text-xs font-bold uppercase tracking-[0.2em] font-sans flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            id="checkout-form-submit-btn"
          >
            <Send className="w-4 h-4 fill-current" />
            {isSubmitting ? 'Formatting Order...' : 'Submit Order & Place on WhatsApp'}
          </button>
        </form>

        {/* Sticky order summary column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white border border-[#BC8E8E]/10 p-6 md:p-8 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A] pb-3 border-b border-[#BC8E8E]/10 font-sans">
              Your Order Basket
            </h3>

            {/* Items list */}
            <div className="divide-y divide-[#BC8E8E]/10 max-h-96 overflow-y-auto space-y-3.5 pr-2">
              {cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} 
                  className="flex gap-4 pt-3.5 first:pt-0"
                  id={`checkout-summary-item-${item.product.id}`}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-18 object-cover bg-neutral-100 border border-gray-100"
                  />
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate font-sans">
                      {item.product.name}
                    </h4>
                    
                    {/* Size and Color tags */}
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {item.selectedSize && (
                        <span className="text-[9px] uppercase tracking-wider font-semibold bg-[#FAF9F6] text-gray-500 border border-[#BC8E8E]/10 px-1.5 py-0.5">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span className="text-[9px] uppercase tracking-wider font-semibold bg-[#FAF9F6] text-gray-500 border border-[#BC8E8E]/10 px-1.5 py-0.5">
                          Color: {item.selectedColor}
                        </span>
                      )}
                      <span className="text-[9px] uppercase tracking-wider font-semibold bg-[#FAF9F6] text-gray-500 border border-[#BC8E8E]/10 px-1.5 py-0.5">
                        Qty: {item.quantity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-[10px] text-gray-400 font-sans">
                        {item.quantity} × {formatPrice(item.product.price)}
                      </span>
                      <span className="text-xs font-bold text-gray-900 font-sans">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals panel */}
            <div className="pt-4 border-t border-[#BC8E8E]/10 space-y-2">
              <div className="flex justify-between text-xs font-sans text-gray-500">
                <span>Subtotal Items</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-xs font-sans text-gray-500">
                <span>Shipping Delivery</span>
                <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px]">Free Shipping</span>
              </div>
              <div className="pt-3 border-t border-[#BC8E8E]/10 flex justify-between items-center text-xs uppercase tracking-wider font-bold">
                <span>Grand Total</span>
                <span className="text-base text-[#4B1D1D] font-serif italic">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>

          {/* Secure Trust Banner */}
          <div className="bg-[#FAF9F6] border border-[#BC8E8E]/15 p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-[#4B1D1D] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-700 font-sans">Authentic Rajasthani Craft</h4>
              <p className="text-[10px] text-gray-400 font-sans leading-relaxed mt-1">
                Every bedsheet, dohar, and cushion cover is authenticated to Jaipuri hand-printed heritage standards. No automated payments required—interact directly with live artisan hosts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
