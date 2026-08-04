import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SEO } from '../components/common/SEO';
import { 
  Lock, Settings, ShoppingBag, FolderOpen, Images, Star, 
  Trash2, Edit, Plus, RefreshCw, LogOut, CheckCircle, Save, PhoneCall, HelpCircle 
} from 'lucide-react';
import { Product, Category, Banner } from '../types';
import { formatPrice } from '../utils';

export const AdminDashboard: React.FC = () => {
  const { 
    products, categories, banners, reviews, settings, whatsAppNumber,
    addProduct, updateProduct, deleteProduct,
    addCategory, updateCategory, deleteCategory,
    addBanner, updateBanner, deleteBanner,
    updateWhatsAppNumber, updateSettings, resetAllToDefault 
  } = useShop();

  // Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'banners' | 'reviews' | 'settings'>('overview');

  // Product CRUD States
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Product Form Fields
  const [pName, setPName] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pPrice, setPPrice] = useState(0);
  const [pOrigPrice, setPOrigPrice] = useState(0);
  const [pCategory, setPCategory] = useState('');
  const [pCollections, setPCollections] = useState<string[]>([]);
  const [pSizes, setPSizes] = useState('');
  const [pColors, setPColors] = useState('');
  const [pFabric, setPFabric] = useState('');
  const [pPattern, setPPattern] = useState('');
  const [pImages, setPImages] = useState('');

  // Preset Unsplash Indian Bedding Visuals for quick selection during creation
  const PRESET_IMAGE_URLS = [
    'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
  ];

  // Category CRUD States
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [cName, setCName] = useState('');
  const [cImage, setCImage] = useState('');
  const [cDesc, setCDesc] = useState('');

  // Banner CRUD States
  const [isBannerFormOpen, setIsBannerFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [bTitle, setBTitle] = useState('');
  const [bSubtitle, setBSubtitle] = useState('');
  const [bImage, setBImage] = useState('');
  const [bCtaText, setBCtaText] = useState('SHOP NOW');
  const [bCtaLink, setBCtaLink] = useState('/shop');
  const [bActive, setBActive] = useState(true);

  // Settings states
  const [tempWhatsApp, setTempWhatsApp] = useState(settings?.whatsapp || whatsAppNumber);
  const [tempPhone, setTempPhone] = useState(settings?.phone || '+91 9024444555');
  const [tempEmail, setTempEmail] = useState(settings?.email || 'contact@shreejihomes.com');
  const [tempAddress, setTempAddress] = useState(settings?.address || 'Shreeji Homes Experience Center, Johari Bazaar Road, Jaipur, Rajasthan 302003');
  const [tempInstagram, setTempInstagram] = useState(settings?.instagram || 'https://instagram.com/shreejihomes');
  const [tempFacebook, setTempFacebook] = useState(settings?.facebook || 'https://facebook.com/shreejihomes');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // Update temp settings when settings context updates
  React.useEffect(() => {
    if (settings) {
      if (settings.whatsapp) setTempWhatsApp(settings.whatsapp);
      if (settings.phone) setTempPhone(settings.phone);
      if (settings.email) setTempEmail(settings.email);
      if (settings.address) setTempAddress(settings.address);
      if (settings.instagram) setTempInstagram(settings.instagram);
      if (settings.facebook) setTempFacebook(settings.facebook);
    }
  }, [settings]);

  // Handle Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'owner') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid artisan passcode. Hint: Use "owner"');
    }
  };

  // Open Product form for create
  const handleOpenProductCreate = () => {
    setEditingProduct(null);
    setPName('');
    setPDesc('');
    setPPrice(3000);
    setPOrigPrice(3500);
    setPCategory(categories[0]?.name || 'Bedsheets');
    setPCollections(['New Arrivals']);
    setPSizes('Double (90x100 inches), Single (60x90 inches)');
    setPColors('Ivory, Burgundy, Beige');
    setPFabric('Pure Cotton');
    setPPattern('Traditional Block Print');
    setPImages(PRESET_IMAGE_URLS[0]);
    setIsProductFormOpen(true);
  };

  // Open Product form for edit
  const handleOpenProductEdit = (prod: Product) => {
    setEditingProduct(prod);
    setPName(prod.name);
    setPDesc(prod.description);
    setPPrice(prod.price);
    setPOrigPrice(prod.originalPrice || 0);
    setPCategory(prod.category);
    setPCollections(prod.collections);
    setPSizes(prod.sizes?.join(', ') || '');
    setPColors(prod.colors?.join(', ') || '');
    setPFabric(prod.fabric || '');
    setPPattern(prod.pattern || '');
    setPImages(prod.images.join('\n'));
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const sizeArr = pSizes.split(',').map(s => s.trim()).filter(Boolean);
    const colorArr = pColors.split(',').map(c => c.trim()).filter(Boolean);
    const imageArr = pImages.split('\n').map(i => i.trim()).filter(Boolean);

    const productPayload = {
      name: pName,
      description: pDesc,
      price: Number(pPrice),
      originalPrice: pOrigPrice ? Number(pOrigPrice) : undefined,
      category: pCategory,
      collections: pCollections,
      sizes: sizeArr.length > 0 ? sizeArr : undefined,
      colors: colorArr.length > 0 ? colorArr : undefined,
      fabric: pFabric || undefined,
      pattern: pPattern || undefined,
      images: imageArr.length > 0 ? imageArr : PRESET_IMAGE_URLS,
      inStock: true
    };

    if (editingProduct) {
      await updateProduct({
        ...editingProduct,
        ...productPayload
      });
    } else {
      await addProduct(productPayload);
    }
    setIsProductFormOpen(false);
  };

  // Open Category form for CRUD
  const handleOpenCategoryForm = (cat: Category | null) => {
    if (cat) {
      setEditingCategory(cat);
      setCName(cat.name);
      setCImage(cat.image);
      setCDesc(cat.description || '');
    } else {
      setEditingCategory(null);
      setCName('');
      setCImage(PRESET_IMAGE_URLS[1]);
      setCDesc('');
    }
    setIsCategoryFormOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const catPayload = {
      name: cName,
      slug: cName.toLowerCase().replace(/\s+/g, '-'),
      image: cImage,
      description: cDesc || undefined
    };

    if (editingCategory) {
      await updateCategory({
        ...editingCategory,
        ...catPayload
      });
    } else {
      await addCategory(catPayload);
    }
    setIsCategoryFormOpen(false);
  };

  // Open Banner form for CRUD
  const handleOpenBannerForm = (ban: Banner | null) => {
    if (ban) {
      setEditingBanner(ban);
      setBTitle(ban.title);
      setBSubtitle(ban.subtitle);
      setBImage(ban.image);
      setBCtaText(ban.ctaText);
      setBCtaLink(ban.ctaLink);
      setBActive(ban.active);
    } else {
      setEditingBanner(null);
      setBTitle('');
      setBSubtitle('');
      setBImage(PRESET_IMAGE_URLS[2]);
      setBCtaText('SHOP NOW');
      setBCtaLink('/shop');
      setBActive(true);
    }
    setIsBannerFormOpen(true);
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    const bannerPayload = {
      title: bTitle,
      subtitle: bSubtitle,
      image: bImage,
      ctaText: bCtaText,
      ctaLink: bCtaLink,
      active: bActive
    };

    if (editingBanner) {
      await updateBanner({
        ...editingBanner,
        ...bannerPayload
      });
    } else {
      await addBanner(bannerPayload);
    }
    setIsBannerFormOpen(false);
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      whatsapp: tempWhatsApp.replace(/[^0-9]/g, ''),
      phone: tempPhone,
      email: tempEmail,
      address: tempAddress,
      instagram: tempInstagram,
      facebook: tempFacebook
    });
    setSettingsSuccess('Store settings & hotlines updated in Firestore successfully!');
    setTimeout(() => setSettingsSuccess(''), 3000);
  };

  const handleResetCatalog = async () => {
    if (window.confirm('Are you absolutely sure you want to perform a factory reset? This will wipe out all custom products, categories, and settings in Firestore and restore the default catalog.')) {
      await resetAllToDefault();
      setSettingsSuccess('Catalog reset to factory default in Firestore successfully!');
      setTimeout(() => setSettingsSuccess(''), 3000);
    }
  };

  const handleToggleCollectionCheckbox = (col: string) => {
    if (pCollections.includes(col)) {
      setPCollections(pCollections.filter(c => c !== col));
    } else {
      setPCollections([...pCollections, col]);
    }
  };

  // ------------------- PASSCODE SCREEN -------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#FAF9F6] px-4 select-none">
        <SEO title="Owner Access Portal" />
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl max-w-sm w-full text-center space-y-6" id="admin-login-card">
          <div className="w-12 h-12 bg-[#F2EFE9] rounded-full flex items-center justify-center text-[#4B1D1D] mx-auto border border-[#4B1D1D]/10">
            <Lock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-neutral-800 uppercase tracking-wide">Owner Portal</h2>
            <p className="text-xs text-neutral-400 mt-1 font-sans">Enter passcode to manage inventory and settings.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" id="admin-login-form">
            <div className="space-y-1">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode (Hint: owner)"
                className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333] text-center tracking-widest focus:border-[#4B1D1D]/30"
                id="admin-passcode-input"
              />
            </div>

            {authError && (
              <p className="text-[11px] text-red-500 font-sans font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white rounded-lg text-xs font-bold font-sans uppercase tracking-widest shadow-md transition-all cursor-pointer"
              id="admin-login-submit"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ------------------- AUTHENTICATED ADMIN PANEL -------------------
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="admin-dashboard-container">
      <SEO title="Owner Admin Dashboard" />

      {/* Admin Top Header Banner */}
      <div className="bg-white border-b border-gray-100 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F2EFE9] rounded-lg border border-[#4B1D1D]/10 flex items-center justify-center text-[#4B1D1D]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-neutral-800 uppercase tracking-wide">Artisan Admin Panel</h1>
              <p className="text-xs text-gray-400 font-sans">Mock server dashboard • Direct local synchronization enabled.</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-xs font-bold font-sans text-gray-500 hover:text-red-500 border border-gray-200 rounded-lg bg-neutral-50 hover:bg-[#F2EFE9] flex items-center gap-1.5 uppercase tracking-wider"
            id="admin-logout-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            Lock Panel
          </button>
        </div>
      </div>

      {/* Main Admin Section Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Drawer Menu tabs */}
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-1 shadow-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold font-sans tracking-wider uppercase flex items-center gap-2.5 transition-colors ${
                activeTab === 'overview' ? 'bg-[#4B1D1D] text-white' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
              id="admin-tab-overview"
            >
              <ShoppingBag className="w-4 h-4" />
              General Overview
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold font-sans tracking-wider uppercase flex items-center gap-2.5 transition-colors ${
                activeTab === 'products' ? 'bg-[#4B1D1D] text-white' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
              id="admin-tab-products"
            >
              <ShoppingBag className="w-4 h-4" />
              Manage Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold font-sans tracking-wider uppercase flex items-center gap-2.5 transition-colors ${
                activeTab === 'categories' ? 'bg-[#4B1D1D] text-white' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
              id="admin-tab-categories"
            >
              <FolderOpen className="w-4 h-4" />
              Manage Categories ({categories.length})
            </button>
            <button
              onClick={() => setActiveTab('banners')}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold font-sans tracking-wider uppercase flex items-center gap-2.5 transition-colors ${
                activeTab === 'banners' ? 'bg-[#4B1D1D] text-white' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
              id="admin-tab-banners"
            >
              <Images className="w-4 h-4" />
              Homepage Hero Slides ({banners.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold font-sans tracking-wider uppercase flex items-center gap-2.5 transition-colors ${
                activeTab === 'reviews' ? 'bg-[#4B1D1D] text-white' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
              id="admin-tab-reviews"
            >
              <Star className="w-4 h-4" />
              Client Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold font-sans tracking-wider uppercase flex items-center gap-2.5 transition-colors ${
                activeTab === 'settings' ? 'bg-[#4B1D1D] text-white' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
              id="admin-tab-settings"
            >
              <Settings className="w-4 h-4" />
              Hotline & DB Settings
            </button>
          </div>
        </aside>

        {/* Right Dashboard Contents panels */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              
              {/* Metrics cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">Active Products</span>
                  <p className="text-2xl font-extrabold text-[#4B1D1D] font-sans mt-1">{products.length}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">Categories</span>
                  <p className="text-2xl font-extrabold text-neutral-800 font-sans mt-1">{categories.length}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">Hero Covers</span>
                  <p className="text-2xl font-extrabold text-neutral-800 font-sans mt-1">{banners.length}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">WhatsApp Business</span>
                  <p className="text-sm font-extrabold text-green-600 font-sans mt-2.5 truncate">+{whatsAppNumber}</p>
                </div>
              </div>

              {/* Informational Welcome Card */}
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xs space-y-4">
                <h3 className="text-lg font-serif font-bold text-neutral-800 uppercase tracking-wide">
                  Hello, Shreeji Homes Director
                </h3>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                  Welcome to your secure artisan dashboard. Since this application has been prepared for production, all additions, modifications, or deletions you conduct here are synced instantly in your browser&rsquo;s LocalStorage. This guarantees that your testing catalog is completely dynamic, responsive, and works identically to how a future backend server (PostgreSQL or Firestore) will synchronize data.
                </p>
                <div className="bg-[#F2EFE9] p-4 rounded-lg border border-[#4B1D1D]/10 text-xs text-[#4B1D1D] font-sans flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#4B1D1D] shrink-0 mt-0.5" />
                  <span>To view how edits immediately refresh the front storefront, add or edit any Bed Sheet or Razai price, and navigate back to the principal Shop Catalog! All changes take place in real-time.</span>
                </div>
              </div>

            </div>
          )}

          {/* 2. PRODUCTS CRUD TAB */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-neutral-800 uppercase tracking-widest font-sans">
                  Active Products Catalog ({products.length})
                </h2>
                <button
                  onClick={handleOpenProductCreate}
                  className="px-4 py-2 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white rounded-lg text-xs font-bold tracking-widest uppercase font-sans flex items-center gap-1 shadow-sm transition-all"
                  id="admin-add-product-btn"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Product
                </button>
              </div>

              {/* Embedded Product CRUD Form */}
              {isProductFormOpen && (
                <div className="bg-white p-6 rounded-xl border border-[#4B1D1D]/20 shadow-md">
                  <form onSubmit={handleSaveProduct} className="space-y-4" id="admin-product-crud-form">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4B1D1D] font-sans pb-2 border-b border-gray-100 flex items-center gap-1.5">
                      <Save className="w-4 h-4" />
                      {editingProduct ? `Edit Details: ${editingProduct.name}` : 'Add New Premium Textile'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Product Title</label>
                        <input type="text" required value={pName} onChange={e => setPName(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                      
                      {/* Category */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Category</label>
                        <select value={pCategory} onChange={e => setPCategory(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs">
                          {categories.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Price */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Selling Price (Rs)</label>
                        <input type="number" required value={pPrice} onChange={e => setPPrice(Number(e.target.value))} className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                      {/* Original Price */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Original Price (Rs for Sale badge)</label>
                        <input type="number" value={pOrigPrice} onChange={e => setPOrigPrice(Number(e.target.value))} className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                    </div>

                    {/* Collections checklist checkboxes */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Homepage Collections</label>
                      <div className="flex flex-wrap gap-4 pt-1.5">
                        {['Best Sellers', 'New Arrivals', 'Trending', 'Luxury Collection'].map((col) => (
                          <label key={col} className="flex items-center gap-2 text-xs font-sans text-neutral-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={pCollections.includes(col)}
                              onChange={() => handleToggleCollectionCheckbox(col)}
                              className="accent-[#4B1D1D]"
                            />
                            <span>{col}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Sizes */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Sizes (Comma separated)</label>
                        <input type="text" value={pSizes} onChange={e => setPSizes(e.target.value)} placeholder="Double (90x100), Single (60x90)" className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                      {/* Colors */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Colors (Comma separated)</label>
                        <input type="text" value={pColors} onChange={e => setPColors(e.target.value)} placeholder="Burgundy, Ivory, Beige" className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Fabric */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Fabric Weave</label>
                        <input type="text" value={pFabric} onChange={e => setPFabric(e.target.value)} placeholder="Mulmul Cotton, Premium Linen" className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                      {/* Pattern */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Artisanal Pattern</label>
                        <input type="text" value={pPattern} onChange={e => setPPattern(e.target.value)} placeholder="Traditional Block Print" className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                    </div>

                    {/* Images URLs list input */}
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Images URLs (One URL per line)</label>
                        <span className="text-[9px] text-gray-400 font-sans">Quickly click a beautiful preset below:</span>
                      </div>
                      <textarea rows={3} required value={pImages} onChange={e => setPImages(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs resize-none" />
                      
                      {/* Image quick presets buttons list */}
                      <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-1">
                        {PRESET_IMAGE_URLS.map((url, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setPImages(prev => prev ? `${prev}\n${url}` : url)}
                            className="w-10 h-10 rounded border border-gray-200 overflow-hidden shrink-0 opacity-70 hover:opacity-100"
                            title="Add this image preset"
                          >
                            <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Detailed Description</label>
                      <textarea rows={3} required value={pDesc} onChange={e => setPDesc(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs resize-none" />
                    </div>

                    <div className="flex gap-2 pt-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsProductFormOpen(false)}
                        className="px-4 py-2 text-xs font-bold font-sans text-gray-500 hover:bg-neutral-50 border border-gray-200 rounded-lg"
                        id="cancel-product-btn"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] rounded-lg text-xs font-bold font-sans uppercase tracking-wider"
                        id="save-product-btn"
                      >
                        Save Premium Product
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* Products List Table representation */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-sans">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        <th className="py-4 px-6">Product Image</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Selling Price</th>
                        <th className="py-4 px-6">Weave Spec</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-neutral-700">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors" id={`admin-product-row-${p.id}`}>
                          <td className="py-3.5 px-6 flex items-center gap-3">
                            <img src={p.images[0]} alt="" referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded-md bg-neutral-50 border border-gray-100" />
                            <span className="font-semibold text-neutral-800 truncate max-w-[200px]" title={p.name}>{p.name}</span>
                          </td>
                          <td className="py-3.5 px-6 font-medium text-[#BC8E8E]">{p.category}</td>
                          <td className="py-3.5 px-6 font-bold text-[#4B1D1D]">{formatPrice(p.price)}</td>
                          <td className="py-3.5 px-6 text-neutral-400">{p.fabric || 'Pure Cotton'}</td>
                          <td className="py-3.5 px-6 text-right space-x-2 shrink-0 whitespace-nowrap">
                            <button
                              onClick={() => handleOpenProductEdit(p)}
                              className="p-1.5 hover:bg-[#F2EFE9] text-[#4B1D1D] rounded-md transition-colors inline-block"
                              title="Edit product"
                              id={`admin-edit-prod-btn-${p.id}`}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors inline-block"
                              title="Delete product"
                              id={`admin-delete-prod-btn-${p.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* 3. CATEGORIES CRUD TAB */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-neutral-800 uppercase tracking-widest font-sans">
                  Active Categories Registry ({categories.length})
                </h2>
                <button
                  onClick={() => handleOpenCategoryForm(null)}
                  className="px-4 py-2 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white rounded-lg text-xs font-bold tracking-widest uppercase font-sans flex items-center gap-1 shadow-sm transition-all"
                  id="admin-add-cat-btn"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Category
                </button>
              </div>

              {/* Embedded Category form */}
              {isCategoryFormOpen && (
                <div className="bg-white p-6 rounded-xl border border-[#4B1D1D]/20 shadow-md">
                  <form onSubmit={handleSaveCategory} className="space-y-4" id="admin-category-crud-form">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4B1D1D] font-sans pb-2 border-b border-gray-100">
                      {editingCategory ? 'Edit Category Specifications' : 'Add New Home Textile Category'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Category Name</label>
                        <input type="text" required value={cName} onChange={e => setCName(e.target.value)} placeholder="e.g. Baby Quilts" className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                      {/* Image */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Image URL</label>
                        <input type="text" required value={cImage} onChange={e => setCImage(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                    </div>

                    {/* Desc */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Short Description</label>
                      <textarea rows={2} value={cDesc} onChange={e => setCDesc(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs resize-none" />
                    </div>

                    <div className="flex gap-2 pt-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsCategoryFormOpen(false)}
                        className="px-4 py-2 text-xs font-bold font-sans text-gray-500 hover:bg-neutral-50 border border-gray-200 rounded-lg"
                        id="cancel-category-btn"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] rounded-lg text-xs font-bold font-sans uppercase tracking-wider"
                        id="save-category-btn"
                      >
                        Save Category
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Categories grid list for deletion/edit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="bg-white rounded-xl border border-gray-100 p-4 space-y-4 shadow-xs" id={`admin-cat-card-${cat.slug}`}>
                    <div className="flex items-center gap-3">
                      <img src={cat.image} alt="" referrerPolicy="no-referrer" className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-neutral-800 truncate">{cat.name}</h4>
                        <span className="text-[10px] text-gray-400 font-sans tracking-wider block">Slug: {cat.slug}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 border-t border-gray-50 pt-3">
                      <button
                        onClick={() => handleOpenCategoryForm(cat)}
                        className="p-1.5 hover:bg-[#F2EFE9] text-[#4B1D1D] rounded-md transition-colors inline-block text-xs font-bold font-sans flex items-center gap-1"
                        id={`admin-edit-cat-btn-${cat.slug}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors inline-block text-xs font-bold font-sans flex items-center gap-1"
                        id={`admin-delete-cat-btn-${cat.slug}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 4. HERO SLIDES MANAGER */}
          {activeTab === 'banners' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-neutral-800 uppercase tracking-widest font-sans">
                  Active Homepage Hero Slides ({banners.length})
                </h2>
                <button
                  onClick={() => handleOpenBannerForm(null)}
                  className="px-4 py-2 bg-[#4B1D1D] hover:bg-[#1A1A1A] text-white rounded-lg text-xs font-bold tracking-widest uppercase font-sans flex items-center gap-1 shadow-sm transition-all"
                  id="admin-add-banner-btn"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Hero Cover
                </button>
              </div>

              {/* Embedded Banner form */}
              {isBannerFormOpen && (
                <div className="bg-white p-6 rounded-xl border border-[#4B1D1D]/20 shadow-md">
                  <form onSubmit={handleSaveBanner} className="space-y-4" id="admin-banner-crud-form">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4B1D1D] font-sans pb-2 border-b border-gray-100">
                      {editingBanner ? 'Edit Banner Slide Details' : 'Add New Homepage Hero Slide'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Heading */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Slide Main Heading</label>
                        <input type="text" required value={bTitle} onChange={e => setBTitle(e.target.value)} placeholder="e.g. Comfort For Every Season" className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                      {/* Subheading */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Subtitle Eyebrow</label>
                        <input type="text" required value={bSubtitle} onChange={e => setBSubtitle(e.target.value)} placeholder="e.g. Organic Handcrafted Razais" className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Image URL */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Cover Image URL</label>
                        <input type="text" required value={bImage} onChange={e => setBImage(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                      {/* CTA link */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Target Link Path</label>
                        <input type="text" required value={bCtaLink} onChange={e => setBCtaLink(e.target.value)} placeholder="/shop" className="w-full px-3 py-2 bg-neutral-50 border border-gray-200 rounded text-xs" />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 text-xs font-sans text-neutral-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bActive}
                          onChange={(e) => setBActive(e.target.checked)}
                          className="accent-[#4B1D1D] w-4 h-4"
                        />
                        <span>Slide is Active on Homepage</span>
                      </label>
                    </div>

                    <div className="flex gap-2 pt-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsBannerFormOpen(false)}
                        className="px-4 py-2 text-xs font-bold font-sans text-gray-500 hover:bg-neutral-50 border border-gray-200 rounded-lg"
                        id="cancel-banner-btn"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] rounded-lg text-xs font-bold font-sans uppercase tracking-wider"
                        id="save-banner-btn"
                      >
                        Save Banner Slide
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Banners visual cards listings */}
              <div className="space-y-4">
                {banners.map((ban) => (
                  <div key={ban.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs flex flex-col md:flex-row gap-4 p-4" id={`admin-banner-card-${ban.id}`}>
                    <img src={ban.image} alt="" referrerPolicy="no-referrer" className="w-full md:w-48 h-28 object-cover rounded-lg border border-gray-100" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold text-[#BC8E8E] uppercase tracking-widest block font-sans">{ban.subtitle}</span>
                        <h4 className="text-sm font-bold text-neutral-800 font-sans mt-0.5">{ban.title}</h4>
                        <span className={`inline-block mt-2 text-[10px] font-bold font-sans px-2.5 py-0.5 rounded ${
                          ban.active ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-neutral-50 text-neutral-400 border border-neutral-200'
                        }`}>
                          {ban.active ? 'ACTIVE COVER' : 'HIDDEN'}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-gray-50 mt-3 md:mt-0">
                        <button
                          onClick={() => handleOpenBannerForm(ban)}
                          className="p-1.5 hover:bg-[#F2EFE9] text-[#4B1D1D] rounded-md transition-colors text-xs font-bold font-sans flex items-center gap-1"
                          id={`admin-edit-banner-${ban.id}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBanner(ban.id)}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors text-xs font-bold font-sans flex items-center gap-1"
                          id={`admin-delete-banner-${ban.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 5. REVIEWS LIST */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <h2 className="text-base font-bold text-neutral-800 uppercase tracking-widest font-sans">
                Manage Verified Customer Testimonials ({reviews.length})
              </h2>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white rounded-xl border border-gray-100 p-6 space-y-3 shadow-xs" id={`admin-review-item-${rev.id}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center text-xs font-bold font-sans">
                          {rev.userName[0]}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider font-sans">{rev.userName}</h4>
                          <span className="text-[10px] text-gray-400 font-sans block">{rev.date} • Product: {rev.productName}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 text-[#BC8E8E]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 font-sans italic leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                    <div className="flex justify-end pt-2 border-t border-gray-50 text-[10px]">
                      <span className="text-green-600 font-semibold font-sans uppercase tracking-wider">
                        Approved & Displayed on Homepage
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. SETTINGS & WHATSAPP CONFIG */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <h2 className="text-base font-bold text-neutral-800 uppercase tracking-widest font-sans">
                Global Store Hotlines & Storage Settings
              </h2>

              <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6 shadow-xs">
                
                {/* Save Hotline form */}
                <form onSubmit={handleSaveSettings} className="space-y-4" id="admin-whatsapp-config-form">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#333] font-sans pb-2 border-b border-gray-100 flex items-center gap-1.5">
                    <PhoneCall className="w-4 h-4 text-[#BC8E8E]" />
                    Firestore Store & WhatsApp Configuration
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">WhatsApp Business Hotline (Digits only)</label>
                      <input
                        type="text"
                        required
                        value={tempWhatsApp}
                        onChange={e => setTempWhatsApp(e.target.value)}
                        placeholder="919024444555"
                        className="w-full px-4 py-2 bg-neutral-50 border border-gray-200 rounded text-xs font-sans text-[#333] outline-none"
                        id="whatsapp-number-config-input"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Display Phone Number</label>
                      <input
                        type="text"
                        required
                        value={tempPhone}
                        onChange={e => setTempPhone(e.target.value)}
                        placeholder="+91 90244 44555"
                        className="w-full px-4 py-2 bg-neutral-50 border border-gray-200 rounded text-xs font-sans text-[#333] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Support Email</label>
                      <input
                        type="email"
                        required
                        value={tempEmail}
                        onChange={e => setTempEmail(e.target.value)}
                        placeholder="contact@shreejihomes.com"
                        className="w-full px-4 py-2 bg-neutral-50 border border-gray-200 rounded text-xs font-sans text-[#333] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Instagram URL</label>
                      <input
                        type="text"
                        value={tempInstagram}
                        onChange={e => setTempInstagram(e.target.value)}
                        placeholder="https://instagram.com/shreejihomes"
                        className="w-full px-4 py-2 bg-neutral-50 border border-gray-200 rounded text-xs font-sans text-[#333] outline-none"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans block">Flagship Store Address</label>
                      <input
                        type="text"
                        value={tempAddress}
                        onChange={e => setTempAddress(e.target.value)}
                        placeholder="Shreeji Homes Experience Center, Johari Bazaar Road, Jaipur, Rajasthan 302003"
                        className="w-full px-4 py-2 bg-neutral-50 border border-gray-200 rounded text-xs font-sans text-[#333] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] rounded text-xs font-bold font-sans uppercase tracking-wider shrink-0 cursor-pointer shadow-sm transition-colors"
                      id="save-whatsapp-config-btn"
                    >
                      Save Firestore Settings
                    </button>
                    {settingsSuccess && (
                      <p className="text-[11px] text-green-600 font-medium font-sans">{settingsSuccess}</p>
                    )}
                  </div>

                  <p className="text-[10px] text-gray-400 leading-relaxed font-sans">
                    All updates here save directly to Firebase Firestore (<code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">settings/general</code>) and propagate live to every connected visitor in real-time!
                  </p>
                </form>

                <div className="h-px bg-gray-100 my-4" />

                {/* DB factory reset block */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 font-sans pb-2 border-b border-gray-100 flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-red-500" />
                    Database Recovery & Factory Reset
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    If you want to discard your test products and restore the original beautifully curated Indian-textile home linens, bedsheets, drapes, and banners, you can perform a complete factory reset. This clears all LocalStorage parameters instantly.
                  </p>
                  <button
                    onClick={handleResetCatalog}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold font-sans uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                    id="factory-reset-catalog-btn"
                  >
                    Wipe custom database & restore factory default catalog
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
