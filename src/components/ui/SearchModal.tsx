import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigateToProduct 
}) => {
  const { products } = useShop();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Real-time filtering
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      (p.fabric && p.fabric.toLowerCase().includes(query.toLowerCase())) ||
      (p.pattern && p.pattern.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(filtered.slice(0, 5));
  }, [query, products]);

  if (!isOpen) return null;

  const popularSearches = ['Razai', 'Bedsheet', 'Linen', 'Quilt', 'Curtains'];

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-start pt-12 md:pt-24 px-4 transition-all duration-300"
      onClick={onClose}
      id="search-modal-backdrop"
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#f0e8e8]"
        onClick={(e) => e.stopPropagation()}
        id="search-modal-content"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#eee]">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for bedding, quilts, curtains..."
            className="w-full text-base md:text-lg outline-none text-[#333] placeholder-gray-400 font-sans"
            id="search-modal-input"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              id="clear-search-btn"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors font-sans text-xs text-gray-500 font-semibold flex items-center gap-1 uppercase tracking-wider shrink-0"
            id="close-search-modal-btn"
          >
            Close
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Default popular searches when empty */}
          {!query && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 font-sans">
                Popular Collections
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-1.5 bg-gray-50 hover:bg-[#4B1D1D] hover:text-white rounded-full text-xs font-medium text-[#555] transition-all duration-300 border border-[#eee] cursor-pointer"
                    id={`popular-search-${term}`}
                  >
                    {term}
                  </button>
                ))}
              </div>
              <div className="text-center py-4 text-gray-400 text-xs font-sans">
                Type above to discover fine textiles, hand block prints and custom linens.
              </div>
            </div>
          )}

          {/* Search results */}
          {query && results.length > 0 && (
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 font-sans">
                Matching Products ({results.length})
              </p>
              <div className="divide-y divide-gray-100">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onNavigateToProduct(product.id);
                      onClose();
                    }}
                    className="flex items-center gap-4 py-3 hover:bg-[#F2EFE9] px-2 rounded-lg cursor-pointer transition-colors group"
                    id={`search-result-item-${product.id}`}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-md bg-gray-100 border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#4B1D1D] uppercase tracking-wider font-sans mb-0.5">
                        {product.category}
                      </p>
                      <h4 className="text-sm font-medium text-[#333] truncate group-hover:text-[#4B1D1D] transition-colors font-sans">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 font-sans">
                        {product.fabric || 'Premium Textile'} • {product.pattern || 'Artisanal Design'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#333] font-sans">
                        {formatPrice(product.price)}
                      </p>
                      {product.originalPrice && (
                        <p className="text-xs text-red-500 line-through font-sans">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {query && results.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-600 font-sans">No products found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-1 font-sans">Try searching for other items like Bedsheets, Razais or Curtains</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
