import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Grid, List, SlidersHorizontal, Search, RotateCcw, Eye, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SEO } from '../components/common/SEO';
import { ProductCard } from '../components/ui/ProductCard';
import { QuickViewModal } from '../components/ui/QuickViewModal';
import { formatPrice, getWhatsAppOrderLink } from '../utils';
import { Product } from '../types';

export const Shop: React.FC = () => {
  const { products, categories, whatsAppNumber, wishlist, toggleWishlist } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected state from URL params
  const initialCategory = searchParams.get('category') || '';
  const initialCollection = searchParams.get('filter') || '';

  // Internal filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(10000); // Max budget filter

  // UI States
  const [isGridView, setIsGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);

  // Sync state with URL params changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedCollection(searchParams.get('filter') || '');
  }, [searchParams]);

  // Simulate skeleton load on filter alteration
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedCollection, selectedFabric, selectedPattern, sortBy, priceRange]);

  // Extract list of unique fabrics and patterns dynamically for the filters
  const fabrics = Array.from(new Set(products.map(p => p.fabric).filter(Boolean))) as string[];
  const patterns = Array.from(new Set(products.map(p => p.pattern).filter(Boolean))) as string[];

  // Filter application
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory 
      ? product.category.toLowerCase() === selectedCategory.toLowerCase() 
      : true;

    const matchesCollection = selectedCollection
      ? product.collections.includes(selectedCollection)
      : true;

    const matchesFabric = selectedFabric
      ? product.fabric === selectedFabric
      : true;

    const matchesPattern = selectedPattern
      ? product.pattern === selectedPattern
      : true;

    const matchesPrice = product.price <= priceRange;

    return matchesSearch && matchesCategory && matchesCollection && matchesFabric && matchesPattern && matchesPrice;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
      default:
        return 0; // maintain original sorting
    }
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCollection('');
    setSelectedFabric('');
    setSelectedPattern('');
    setSortBy('featured');
    setPriceRange(10000);
    setSearchParams({});
  };

  const updateCategoryParam = (catName: string) => {
    setSelectedCategory(catName);
    if (catName) {
      setSearchParams({ category: catName });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 select-none" id="shop-catalog-page">
      <SEO title="Premium Linens Collection Catalog" />

      {/* Top Breadcrumb and Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-gray-400 font-sans tracking-widest uppercase flex gap-2">
            <Link to="/" className="hover:text-[#4B1D1D] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-700">Shop</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-neutral-800 mt-2 tracking-wide uppercase">
            {selectedCategory || selectedCollection || 'The Full Catalog'}
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-1">
            Displaying {sortedProducts.length} exquisite handcrafted home textiles.
          </p>
        </div>
      </div>

      {/* Shop Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Panel Filters (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6" id="desktop-filters-panel">
          <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6 shadow-xs">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#333] font-sans flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#BC8E8E]" />
                Refine Search
              </h3>
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-bold font-sans text-gray-400 hover:text-[#4B1D1D] flex items-center gap-1 uppercase tracking-widest"
                title="Reset filters"
                id="desktop-reset-filters-btn"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Keyword Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search within shop..."
                className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-gray-200 focus:border-[#4B1D1D]/30 rounded-lg text-xs font-sans outline-none text-[#333] placeholder-gray-400"
                id="desktop-search-input"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                Categories
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => updateCategoryParam('')}
                  className={`w-full text-left text-xs font-medium font-sans py-1.5 px-2 rounded-md transition-colors ${
                    selectedCategory === '' 
                      ? 'bg-[#F2EFE9] text-[#4B1D1D] font-bold' 
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                  id="cat-filter-all"
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateCategoryParam(cat.name)}
                    className={`w-full text-left text-xs font-medium font-sans py-1.5 px-2 rounded-md transition-colors ${
                      selectedCategory.toLowerCase() === cat.name.toLowerCase()
                        ? 'bg-[#F2EFE9] text-[#4B1D1D] font-bold' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                    id={`cat-filter-${cat.slug}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Collection Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                Collection Type
              </label>
              <div className="space-y-1.5">
                {['Best Sellers', 'New Arrivals', 'Trending', 'Luxury Collection'].map((col) => (
                  <label key={col} className="flex items-center gap-2 text-xs font-sans text-neutral-600 cursor-pointer" id={`col-filter-label-${col.replace(/\s+/g, '-')}`}>
                    <input
                      type="radio"
                      name="collection-radio"
                      checked={selectedCollection === col}
                      onChange={() => setSelectedCollection(col)}
                      className="accent-[#4B1D1D] w-3.5 h-3.5"
                    />
                    <span>{col}</span>
                  </label>
                ))}
                {selectedCollection && (
                  <button
                    onClick={() => setSelectedCollection('')}
                    className="text-[10px] text-gray-400 hover:text-red-500 font-sans font-semibold uppercase tracking-wider block pt-1 pl-1"
                    id="clear-collection-filter-btn"
                  >
                    Clear collection
                  </button>
                )}
              </div>
            </div>

            {/* Fabric Filter */}
            {fabrics.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                  Fabric Weave
                </label>
                <div className="space-y-1.5">
                  {fabrics.map((fab) => (
                    <label key={fab} className="flex items-center gap-2 text-xs font-sans text-neutral-600 cursor-pointer" id={`fab-filter-label-${fab.replace(/\s+/g, '-')}`}>
                      <input
                        type="radio"
                        name="fabric-radio"
                        checked={selectedFabric === fab}
                        onChange={() => setSelectedFabric(fab)}
                        className="accent-[#4B1D1D] w-3.5 h-3.5"
                      />
                      <span>{fab}</span>
                    </label>
                  ))}
                  {selectedFabric && (
                    <button
                      onClick={() => setSelectedFabric('')}
                      className="text-[10px] text-gray-400 hover:text-red-500 font-sans font-semibold uppercase tracking-wider block pt-1 pl-1"
                      id="clear-fabric-filter-btn"
                    >
                      Clear fabric
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Patterns Filter */}
            {patterns.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                  Artisanal Pattern
                </label>
                <div className="space-y-1.5">
                  {patterns.map((pat) => (
                    <label key={pat} className="flex items-center gap-2 text-xs font-sans text-neutral-600 cursor-pointer" id={`pattern-filter-label-${pat.replace(/\s+/g, '-')}`}>
                      <input
                        type="radio"
                        name="pattern-radio"
                        checked={selectedPattern === pat}
                        onChange={() => setSelectedPattern(pat)}
                        className="accent-[#4B1D1D] w-3.5 h-3.5"
                      />
                      <span>{pat}</span>
                    </label>
                  ))}
                  {selectedPattern && (
                    <button
                      onClick={() => setSelectedPattern('')}
                      className="text-[10px] text-gray-400 hover:text-red-500 font-sans font-semibold uppercase tracking-wider block pt-1"
                      id="clear-pattern-filter-btn"
                    >
                      Clear pattern
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Price Cap Budget Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                  Budget Maximum
                </label>
                <span className="text-xs font-bold text-[#4B1D1D] font-sans">
                  {formatPrice(priceRange)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#4B1D1D] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                id="desktop-price-range-slider"
              />
              <div className="flex justify-between text-[9px] text-gray-400 font-sans">
                <span>Rs. 500</span>
                <span>Rs. 10,000</span>
              </div>
            </div>

          </div>
        </aside>

        {/* Right Content Column */}
        <main className="flex-1">
          
          {/* Controls Bar */}
          <div className="bg-white px-5 py-4 rounded-xl border border-gray-100 flex items-center justify-between mb-6 shadow-xs flex-col sm:flex-row gap-4">
            
            {/* Mobile Filters Toggle & Items found */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-bold font-sans uppercase tracking-widest text-neutral-700 px-4 py-2 border border-gray-200 rounded-lg bg-neutral-50"
                id="mobile-filters-toggle-btn"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#BC8E8E]" />
                Filters
              </button>
              <span className="text-xs font-medium text-gray-500 font-sans">
                Found {sortedProducts.length} premium products
              </span>
            </div>

            {/* Sort selection and Grid/List toggle */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 font-sans">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-neutral-50/70 hover:bg-neutral-50 border border-gray-200 rounded-lg text-xs font-medium font-sans outline-none text-[#333]"
                  id="sort-dropdown"
                >
                  <option value="featured">Featured Favorites</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Patrons Rating</option>
                </select>
              </div>

              {/* Grid / List view button triggers */}
              <div className="flex gap-1 border border-gray-200 rounded-lg p-0.5 bg-neutral-50">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-1.5 rounded ${isGridView ? 'bg-[#4B1D1D] text-white' : 'text-gray-400 hover:text-gray-700'}`}
                  title="Grid View"
                  id="grid-view-toggle-btn"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-1.5 rounded ${!isGridView ? 'bg-[#4B1D1D] text-white' : 'text-gray-400 hover:text-gray-700'}`}
                  title="List View"
                  id="list-view-toggle-btn"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Skeleton Loadings simulation */}
          {isLoading ? (
            <div className={`grid ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4" id={`skeleton-item-${i}`}>
                  <div className="bg-neutral-200 rounded-xl aspect-[4/5] w-full" />
                  <div className="space-y-2">
                    <div className="h-3.5 bg-neutral-200 rounded w-1/4" />
                    <div className="h-4.5 bg-neutral-200 rounded w-3/4" />
                    <div className="h-4 bg-neutral-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            /* Empty state */
            <div className="text-center py-24 bg-white rounded-xl border border-gray-100">
              <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-base font-bold text-[#333] uppercase tracking-wider font-sans">
                No matching products found
              </h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto font-sans leading-relaxed">
                We couldn&rsquo;t find anything matching your exact filter specs. Try adjusting your budget or selecting a different fabric.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-5 py-2.5 bg-[#4B1D1D] text-white hover:bg-[#1A1A1A] rounded text-xs font-bold tracking-widest font-sans uppercase transition-all shadow-md"
                id="empty-reset-filters-btn"
              >
                Reset Filter Settings
              </button>
            </div>
          ) : isGridView ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-6">
              {sortedProducts.map((product) => {
                const isSaved = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow select-none group"
                    id={`list-view-item-${product.id}`}
                  >
                    {/* Thumbnail Image */}
                    <Link to={`/product/${product.id}`} className="w-full md:w-48 aspect-[4/5] md:aspect-square bg-neutral-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </Link>

                    {/* Content text */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <span className="text-[10px] font-bold text-[#BC8E8E] uppercase tracking-[0.2em] font-sans">
                          {product.category}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-neutral-800 hover:text-[#4B1D1D] transition-colors mt-0.5 mb-2">
                          <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className="text-xs text-neutral-400 font-sans mb-3">
                          {product.fabric || 'Pure Cotton'} • {product.pattern || 'Printed'}
                        </p>
                        <p className="text-xs text-neutral-500 font-sans leading-relaxed line-clamp-2 md:line-clamp-3">
                          {product.description}
                        </p>
                      </div>

                      {/* Pricing and Actions */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50 flex-wrap gap-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-extrabold text-[#4B1D1D] font-sans">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-neutral-400 line-through font-sans">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedQuickViewProduct(product)}
                            className="px-4 py-2 bg-gray-50 hover:bg-[#F2EFE9] text-gray-700 hover:text-[#4B1D1D] border border-gray-200 rounded text-xs font-bold font-sans uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1"
                            id={`list-view-quick-${product.id}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Quick Details
                          </button>
                          <a
                            href={getWhatsAppOrderLink(whatsAppNumber, product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba56] text-white rounded text-xs font-bold font-sans uppercase tracking-widest transition-all flex items-center gap-1.5"
                            id={`list-view-whatsapp-${product.id}`}
                          >
                            Order Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

      {/* Slide-out Filters (Mobile Panel overlay) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex" id="mobile-filters-drawer">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setShowMobileFilters(false)}
            id="mobile-filters-backdrop"
          />

          {/* Drawer */}
          <div className="relative bg-white w-full max-w-xs h-full shadow-xl flex flex-col p-6 overflow-y-auto space-y-6 animate-slide-in-right z-10">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#333] font-sans">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 text-gray-400 hover:text-gray-800"
                id="close-mobile-filters"
              >
                Close
              </button>
            </div>

            {/* Keyword search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-gray-200 rounded-lg text-xs font-sans outline-none text-[#333]"
                id="mobile-search-input"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Sizing categories */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                Categories
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    updateCategoryParam('');
                    setShowMobileFilters(false);
                  }}
                  className={`w-full text-left text-xs font-medium font-sans py-1.5 px-2 rounded-md ${
                    selectedCategory === '' ? 'bg-[#F2EFE9] text-[#4B1D1D]' : 'text-neutral-600'
                  }`}
                  id="mobile-cat-all"
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      updateCategoryParam(cat.name);
                      setShowMobileFilters(false);
                    }}
                    className={`w-full text-left text-xs font-medium font-sans py-1.5 px-2 rounded-md ${
                      selectedCategory.toLowerCase() === cat.name.toLowerCase() ? 'bg-[#F2EFE9] text-[#4B1D1D]' : 'text-neutral-600'
                    }`}
                    id={`mobile-cat-${cat.slug}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Collection type */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-sans block">
                Collections
              </label>
              <div className="space-y-1.5">
                {['Best Sellers', 'New Arrivals', 'Trending', 'Luxury Collection'].map((col) => (
                  <label key={col} className="flex items-center gap-2 text-xs font-sans text-neutral-600" id={`mobile-col-lbl-${col.replace(/\s+/g, '-')}`}>
                    <input
                      type="radio"
                      name="mobile-col-radio"
                      checked={selectedCollection === col}
                      onChange={() => {
                        setSelectedCollection(col);
                        setShowMobileFilters(false);
                      }}
                      className="accent-[#4B1D1D]"
                    />
                    <span>{col}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizing Price range slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-sans uppercase text-[10px] font-bold tracking-wider">Budget limit</span>
                <span className="text-[#4B1D1D] font-bold font-sans">{formatPrice(priceRange)}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#4B1D1D] cursor-pointer"
                id="mobile-price-range-slider"
              />
            </div>

            <button
              onClick={() => {
                handleResetFilters();
                setShowMobileFilters(false);
              }}
              className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold font-sans uppercase tracking-widest rounded-lg transition-all"
              id="mobile-reset-filters-btn"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Quick View Product Modal */}
      <QuickViewModal
        product={selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
      />
    </div>
  );
};
