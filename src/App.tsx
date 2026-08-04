import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { BackToTop } from './components/common/BackToTop';

// Page Imports
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { OurStory } from './pages/OurStory';
import { StoreVisit } from './pages/StoreVisit';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { RefundPolicy } from './pages/RefundPolicy';
import { ShippingPolicy } from './pages/ShippingPolicy';
import { FAQs } from './pages/FAQs';
import { AdminDashboard } from './pages/AdminDashboard';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#333] font-sans antialiased selection:bg-[#4B1D1D]/15 selection:text-[#4B1D1D]" id="app-wrapper-layout">
          {/* Top Banner alert line */}
          <AnnouncementBar />

          {/* Primary Navigation Hub */}
          <Navbar />

          {/* Routing Viewport */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/store-visit" element={<StoreVisit />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Luxury Footer details */}
          <Footer />

          {/* Core Helper Widgets */}
          <FloatingWhatsApp />
          <BackToTop />
        </div>
      </Router>
    </ShopProvider>
  );
}
