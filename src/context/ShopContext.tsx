<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Banner, Review, FAQItem, CartItem, GeneralSettings } from '../types';
import { INITIAL_SETTINGS } from '../data/mockData';
import * as firestoreService from '../services/firestore';

=======
/**
 * ShopContext.tsx
 * ─────────────────────────────────────────────────────────────────
 * RULES FOLLOWED:
 *  ✅ Named exports: useShop + ShopProvider — exact same names
 *  ✅ Every existing property & function preserved
 *  ✅ Added: loading, error, refreshProducts, refreshCategories, refreshBanners
 *  ✅ Firestore used for products; localStorage for everything else
 *  ✅ No circular imports (ShopContext never imports itself)
 *  ✅ No `any` types
 *  ✅ No architecture change — drop-in replacement
 * ─────────────────────────────────────────────────────────────────
 */
 
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Product, Category, Banner, Review, FAQItem, CartItem } from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BANNERS,
  INITIAL_REVIEWS,
  INITIAL_FAQS,
} from '../data/mockData';
import {
  getProducts,
  addProductFirestore,
  updateProductFirestore,
  deleteProductFirestore,
} from '../services/firestore';
 
// ─────────────────────────────────────────────────────────────────
// Context Type — existing fields + new optional fields
// ─────────────────────────────────────────────────────────────────
>>>>>>> 15026c6 (Fixed & updated website)
interface ShopContextType {
  // ── Data ─────────────────────────────────────────────────────
  products: Product[];
  categories: Category[];
  banners: Banner[];
  reviews: Review[];
  faqs: FAQItem[];
  settings: GeneralSettings;
  whatsAppNumber: string;
  wishlist: string[];
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
<<<<<<< HEAD
  loading: boolean;
  error: string | null;

  // Manual Fetch Actions (uses Firestore)
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchBanners: () => Promise<void>;
  fetchReviews: () => Promise<void>;
  fetchFaqs: () => Promise<void>;
  fetchSettings: () => Promise<void>;

  // Cart Actions (LocalStorage)
  addToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;

  // Wishlist Actions (LocalStorage)
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Firestore Admin Actions for Products
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => Promise<string>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Firestore Admin Actions for Categories
  addCategory: (category: Omit<Category, 'id'>) => Promise<string>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Firestore Admin Actions for Banners
  addBanner: (banner: Omit<Banner, 'id'>) => Promise<string>;
  updateBanner: (banner: Banner) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;

  // Firestore Admin Actions for Reviews
  addReview: (review: Omit<Review, 'id'>) => Promise<string>;
  updateReview: (review: Review) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;

  // Firestore Admin Actions for FAQs
  addFAQ: (faq: Omit<FAQItem, 'id'>) => Promise<string>;
  updateFAQ: (faq: FAQItem) => Promise<void>;
  deleteFAQ: (id: string) => Promise<void>;

  // Firestore Settings Actions
  updateWhatsAppNumber: (num: string) => Promise<void>;
  updateSettings: (newSettings: Partial<GeneralSettings>) => Promise<void>;
  resetAllToDefault: () => Promise<void>;
=======
 
  // ── NEW: Cloud state indicators ───────────────────────────────
  loading: boolean;
  error: string | null;
 
  // ── Cart Actions ──────────────────────────────────────────────
  addToCart: (
    product: Product,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => void;
  removeFromCart: (
    productId: string,
    selectedSize?: string,
    selectedColor?: string
  ) => void;
  updateCartQuantity: (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => void;
  clearCart: () => void;
 
  // ── Wishlist Actions ──────────────────────────────────────────
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
 
  // ── Admin: Products ───────────────────────────────────────────
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
 
  // ── Admin: Categories ─────────────────────────────────────────
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
 
  // ── Admin: Banners ────────────────────────────────────────────
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (banner: Banner) => void;
  deleteBanner: (id: string) => void;
 
  // ── Settings ──────────────────────────────────────────────────
  updateWhatsAppNumber: (num: string) => void;
  resetAllToDefault: () => void;
 
  // ── NEW: Manual refresh triggers ──────────────────────────────
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  refreshBanners: () => Promise<void>;
>>>>>>> 15026c6 (Fixed & updated website)
}
 
// ─────────────────────────────────────────────────────────────────
// Context creation
// ─────────────────────────────────────────────────────────────────
const ShopContext = createContext<ShopContextType | undefined>(undefined);
 
// ─────────────────────────────────────────────────────────────────
// useShop hook — EXACT same export name as before
// ─────────────────────────────────────────────────────────────────
export const useShop = (): ShopContextType => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within a ShopProvider');
  return ctx;
};
<<<<<<< HEAD

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [settings, setSettings] = useState<GeneralSettings>(INITIAL_SETTINGS);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cart & Wishlist remain in LocalStorage
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Initialize LocalStorage for Cart and Wishlist
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('sh_wishlist');
      const storedCart = localStorage.getItem('sh_cart');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (err) {
      console.error('Error loading cart/wishlist from localStorage:', err);
    }
  }, []);

  // Setup Firestore Real-time Listeners and Auto-Seeding
  useEffect(() => {
    let unsubs: Array<() => void> = [];

    const initializeFirestore = async () => {
      setLoading(true);
      setError(null);
      try {
        // Seed initial mock data into Firestore if empty
       // await firestoreService.seedInitialDataIfEmpty();

        // Attach Realtime Listeners (onSnapshot)
        const unsubProducts = firestoreService.listenProducts(
          data => setProducts(data),
          err => setError(`Products sync error: ${err.message}`)
        );
        const unsubCategories = firestoreService.listenCategories(
          data => setCategories(data),
          err => setError(`Categories sync error: ${err.message}`)
        );
        const unsubBanners = firestoreService.listenBanners(
          data => setBanners(data),
          err => setError(`Banners sync error: ${err.message}`)
        );
        const unsubReviews = firestoreService.listenReviews(
          data => setReviews(data),
          err => setError(`Reviews sync error: ${err.message}`)
        );
        const unsubFaqs = firestoreService.listenFAQs(
          data => setFaqs(data),
          err => setError(`FAQs sync error: ${err.message}`)
        );
        const unsubSettings = firestoreService.listenSettings(
          data => setSettings(data),
          err => setError(`Settings sync error: ${err.message}`)
        );

        unsubs = [unsubProducts, unsubCategories, unsubBanners, unsubReviews, unsubFaqs, unsubSettings];
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown Firestore error';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    initializeFirestore();

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, []);

  // Manual Fetch Actions (Firestore)
  const fetchProducts = async () => {
    try {
      const data = await firestoreService.getProducts();
      setProducts(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(message);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await firestoreService.getCategories();
      setCategories(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch categories';
      setError(message);
    }
  };

  const fetchBanners = async () => {
    try {
      const data = await firestoreService.getBanners();
      setBanners(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch banners';
      setError(message);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await firestoreService.getReviews();
      setReviews(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch reviews';
      setError(message);
    }
  };

  const fetchFaqs = async () => {
    try {
      const data = await firestoreService.getFAQs();
      setFaqs(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch FAQs';
      setError(message);
    }
  };

  const fetchSettings = async () => {
    try {
      const data = await firestoreService.getSettings();
      setSettings(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch settings';
      setError(message);
    }
  };

  // Cart Functions (LocalStorage)
  const syncAndSetCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('sh_cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => {
    const nextCart = [...cart];
    const existingIndex = nextCart.findIndex(item =>
      item.product.id === product.id &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
=======
 
// ─────────────────────────────────────────────────────────────────
// ShopProvider — EXACT same export name as before
// ─────────────────────────────────────────────────────────────────
export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ── State ───────────────────────────────────────────────────
  const [products,      setProducts]      = useState<Product[]>([]);
  const [categories,    setCategories]    = useState<Category[]>([]);
  const [banners,       setBanners]       = useState<Banner[]>([]);
  const [reviews,       setReviews]       = useState<Review[]>([]);
  const [wishlist,      setWishlist]      = useState<string[]>([]);
  const [whatsAppNumber,setWhatsAppNumber]= useState<string>('919024444555');
  const [faqs,          setFaqs]          = useState<FAQItem[]>(INITIAL_FAQS);
  const [cart,          setCart]          = useState<CartItem[]>([]);
 
  // ── NEW state ───────────────────────────────────────────────
  const [loading, setLoading] = useState<boolean>(false);
  const [error,   setError]   = useState<string | null>(null);
 
  // ─────────────────────────────────────────────────────────────
  // PRODUCTS — fetched from Firestore, falls back to localStorage
  // then to INITIAL_PRODUCTS
  // ─────────────────────────────────────────────────────────────
  const fetchProducts = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const cloudProducts = await getProducts();
      if (cloudProducts && cloudProducts.length > 0) {
        setProducts(cloudProducts as Product[]);
        // Keep local cache in sync so offline works
        localStorage.setItem('sh_products', JSON.stringify(cloudProducts));
      } else {
        // Cloud returned empty — use local cache or seed data
        const stored = localStorage.getItem('sh_products');
        if (stored) {
          setProducts(JSON.parse(stored) as Product[]);
        } else {
          setProducts(INITIAL_PRODUCTS);
          localStorage.setItem('sh_products', JSON.stringify(INITIAL_PRODUCTS));
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load products';
      setError(msg);
      // Graceful fallback — never leave products empty
      const stored = localStorage.getItem('sh_products');
      if (stored) {
        setProducts(JSON.parse(stored) as Product[]);
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
    } finally {
      setLoading(false);
    }
  }, []);
 
  // ─────────────────────────────────────────────────────────────
  // CATEGORIES, BANNERS, REVIEWS — localStorage (same as before)
  // ─────────────────────────────────────────────────────────────
  const fetchCategories = useCallback(async (): Promise<void> => {
    const stored = localStorage.getItem('sh_categories');
    if (stored) {
      setCategories(JSON.parse(stored) as Category[]);
    } else {
      setCategories(INITIAL_CATEGORIES);
      localStorage.setItem('sh_categories', JSON.stringify(INITIAL_CATEGORIES));
    }
  }, []);
 
  const fetchBanners = useCallback(async (): Promise<void> => {
    const stored = localStorage.getItem('sh_banners');
    if (stored) {
      setBanners(JSON.parse(stored) as Banner[]);
    } else {
      setBanners(INITIAL_BANNERS);
      localStorage.setItem('sh_banners', JSON.stringify(INITIAL_BANNERS));
    }
  }, []);
 
  // ─────────────────────────────────────────────────────────────
  // Bootstrap — runs once on mount
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // Products — Firestore
    fetchProducts();
 
    // Categories — localStorage
    fetchCategories();
 
    // Banners — localStorage
    fetchBanners();
 
    // Reviews — localStorage
    const storedReviews = localStorage.getItem('sh_reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews) as Review[]);
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('sh_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
 
    // Wishlist — localStorage
    const storedWishlist = localStorage.getItem('sh_wishlist');
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist) as string[]);
 
    // WhatsApp — localStorage
    const storedWA = localStorage.getItem('sh_whatsapp');
    if (storedWA) {
      setWhatsAppNumber(storedWA);
    } else {
      localStorage.setItem('sh_whatsapp', '919024444555');
    }
 
    // Cart — localStorage
    const storedCart = localStorage.getItem('sh_cart');
    if (storedCart) setCart(JSON.parse(storedCart) as CartItem[]);
  }, [fetchProducts, fetchCategories, fetchBanners]);
 
  // ─────────────────────────────────────────────────────────────
  // Sync helpers (same pattern as original)
  // ─────────────────────────────────────────────────────────────
  const syncAndSetCategories = (next: Category[]) => {
    setCategories(next);
    localStorage.setItem('sh_categories', JSON.stringify(next));
  };
 
  const syncAndSetBanners = (next: Banner[]) => {
    setBanners(next);
    localStorage.setItem('sh_banners', JSON.stringify(next));
  };
 
  const syncAndSetCart = (next: CartItem[]) => {
    setCart(next);
    localStorage.setItem('sh_cart', JSON.stringify(next));
  };
 
  // ─────────────────────────────────────────────────────────────
  // CART functions — identical logic as original
  // ─────────────────────────────────────────────────────────────
  const addToCart = (
    product: Product,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    const next = [...cart];
    const idx = next.findIndex(
      (i) =>
        i.product.id === product.id &&
        i.selectedSize === selectedSize &&
        i.selectedColor === selectedColor
>>>>>>> 15026c6 (Fixed & updated website)
    );
    if (idx > -1) {
      next[idx].quantity += quantity;
    } else {
      next.push({ product, quantity, selectedSize, selectedColor });
    }
    syncAndSetCart(next);
  };
<<<<<<< HEAD

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    const nextCart = cart.filter(item =>
      !(item.product.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor)
=======
 
  const removeFromCart = (
    productId: string,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    syncAndSetCart(
      cart.filter(
        (i) =>
          !(
            i.product.id === productId &&
            i.selectedSize === selectedSize &&
            i.selectedColor === selectedColor
          )
      )
>>>>>>> 15026c6 (Fixed & updated website)
    );
  };
 
  const updateCartQuantity = (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }
<<<<<<< HEAD
    const nextCart = cart.map(item => {
      if (item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor) {
        return { ...item, quantity };
      }
      return item;
    });
    syncAndSetCart(nextCart);
  };

  const clearCart = () => {
    syncAndSetCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Wishlist Functions (LocalStorage)
=======
    syncAndSetCart(
      cart.map((i) =>
        i.product.id === productId &&
        i.selectedSize === selectedSize &&
        i.selectedColor === selectedColor
          ? { ...i, quantity }
          : i
      )
    );
  };
 
  const clearCart = () => syncAndSetCart([]);
 
  // Derived
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
 
  // ─────────────────────────────────────────────────────────────
  // WISHLIST functions — identical logic as original
  // ─────────────────────────────────────────────────────────────
>>>>>>> 15026c6 (Fixed & updated website)
  const toggleWishlist = (productId: string) => {
    const next = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(next);
    localStorage.setItem('sh_wishlist', JSON.stringify(next));
  };
 
  const isInWishlist = (productId: string) => wishlist.includes(productId);
<<<<<<< HEAD

  // Firestore Admin Actions for Products
  const addProduct = async (prodData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>): Promise<string> => {
    return await firestoreService.addProduct({
=======
 
  // ─────────────────────────────────────────────────────────────
  // ADMIN: Products — Firestore + optimistic local update
  // ─────────────────────────────────────────────────────────────
  const addProduct = (
    prodData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>
  ) => {
    const newProduct: Product = {
>>>>>>> 15026c6 (Fixed & updated website)
      ...prodData,
      rating: 4.8,
<<<<<<< HEAD
      reviewsCount: 0
    });
  };

  const updateProduct = async (updatedProd: Product): Promise<void> => {
    await firestoreService.updateProduct(updatedProd.id, updatedProd);
  };

  const deleteProduct = async (id: string): Promise<void> => {
    await firestoreService.deleteProduct(id);
  };

  // Firestore Admin Actions for Categories
  const addCategory = async (catData: Omit<Category, 'id'>): Promise<string> => {
    return await firestoreService.addCategory(catData);
  };

  const updateCategory = async (updatedCat: Category): Promise<void> => {
    await firestoreService.updateCategory(updatedCat.id, updatedCat);
  };

  const deleteCategory = async (id: string): Promise<void> => {
    await firestoreService.deleteCategory(id);
  };

  // Firestore Admin Actions for Banners
  const addBanner = async (bannerData: Omit<Banner, 'id'>): Promise<string> => {
    return await firestoreService.addBanner(bannerData);
  };

  const updateBanner = async (updatedBanner: Banner): Promise<void> => {
    await firestoreService.updateBanner(updatedBanner.id, updatedBanner);
  };

  const deleteBanner = async (id: string): Promise<void> => {
    await firestoreService.deleteBanner(id);
  };

  // Firestore Admin Actions for Reviews
  const addReview = async (reviewData: Omit<Review, 'id'>): Promise<string> => {
    return await firestoreService.addReview(reviewData);
  };

  const updateReview = async (updatedReview: Review): Promise<void> => {
    await firestoreService.updateReview(updatedReview.id, updatedReview);
  };

  const deleteReview = async (id: string): Promise<void> => {
    await firestoreService.deleteReview(id);
  };

  // Firestore Admin Actions for FAQs
  const addFAQ = async (faqData: Omit<FAQItem, 'id'>): Promise<string> => {
    return await firestoreService.addFAQ(faqData);
  };

  const updateFAQ = async (updatedFaq: FAQItem): Promise<void> => {
    await firestoreService.updateFAQ(updatedFaq.id, updatedFaq);
  };

  const deleteFAQ = async (id: string): Promise<void> => {
    await firestoreService.deleteFAQ(id);
  };

  // Firestore Settings Actions
  const updateWhatsAppNumber = async (num: string): Promise<void> => {
    await firestoreService.updateWhatsAppNumber(num);
  };

  const updateSettings = async (newSettings: Partial<GeneralSettings>): Promise<void> => {
    await firestoreService.updateSettings(newSettings);
  };

  const resetAllToDefault = async (): Promise<void> => {
    await firestoreService.resetFirestoreToDefaults();
=======
      reviewsCount: 0,
    };
    // Optimistic update first so UI feels instant
    const next = [newProduct, ...products];
    setProducts(next);
    localStorage.setItem('sh_products', JSON.stringify(next));
 
    // Persist to Firestore (fire-and-forget — errors logged silently)
    addProductFirestore(newProduct).catch((err: unknown) => {
      console.error('[ShopContext] addProduct Firestore error:', err);
    });
  };
 
  const updateProduct = (updatedProd: Product) => {
    const next = products.map((p) =>
      p.id === updatedProd.id ? updatedProd : p
    );
    setProducts(next);
    localStorage.setItem('sh_products', JSON.stringify(next));
 
    updateProductFirestore(updatedProd).catch((err: unknown) => {
      console.error('[ShopContext] updateProduct Firestore error:', err);
    });
  };
 
  const deleteProduct = (id: string) => {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    localStorage.setItem('sh_products', JSON.stringify(next));
 
    deleteProductFirestore(id).catch((err: unknown) => {
      console.error('[ShopContext] deleteProduct Firestore error:', err);
    });
  };
 
  // ─────────────────────────────────────────────────────────────
  // ADMIN: Categories — localStorage only (same as original)
  // ─────────────────────────────────────────────────────────────
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = { ...catData, id: `cat-${Date.now()}` };
    syncAndSetCategories([...categories, newCat]);
  };
 
  const updateCategory = (updated: Category) => {
    syncAndSetCategories(
      categories.map((c) => (c.id === updated.id ? updated : c))
    );
  };
 
  const deleteCategory = (id: string) => {
    syncAndSetCategories(categories.filter((c) => c.id !== id));
  };
 
  // ─────────────────────────────────────────────────────────────
  // ADMIN: Banners — localStorage only (same as original)
  // ─────────────────────────────────────────────────────────────
  const addBanner = (bannerData: Omit<Banner, 'id'>) => {
    const newBanner: Banner = { ...bannerData, id: `banner-${Date.now()}` };
    syncAndSetBanners([...banners, newBanner]);
  };
 
  const updateBanner = (updated: Banner) => {
    syncAndSetBanners(banners.map((b) => (b.id === updated.id ? updated : b)));
  };
 
  const deleteBanner = (id: string) => {
    syncAndSetBanners(banners.filter((b) => b.id !== id));
  };
 
  // ─────────────────────────────────────────────────────────────
  // SETTINGS — identical as original
  // ─────────────────────────────────────────────────────────────
  const updateWhatsAppNumber = (num: string) => {
    const clean = num.replace(/[^0-9]/g, '');
    setWhatsAppNumber(clean);
    localStorage.setItem('sh_whatsapp', clean);
  };
 
  const resetAllToDefault = () => {
    [
      'sh_products',
      'sh_categories',
      'sh_banners',
      'sh_reviews',
      'sh_whatsapp',
      'sh_wishlist',
      'sh_cart',
    ].forEach((k) => localStorage.removeItem(k));
 
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setBanners(INITIAL_BANNERS);
    setReviews(INITIAL_REVIEWS);
    setWhatsAppNumber('919024444555');
    setWishlist([]);
    setCart([]);
    setError(null);
>>>>>>> 15026c6 (Fixed & updated website)
  };
 
  // ─────────────────────────────────────────────────────────────
  // Context value
  // ─────────────────────────────────────────────────────────────
  return (
<<<<<<< HEAD
    <ShopContext.Provider value={{
      products,
      categories,
      banners,
      reviews,
      faqs,
      settings,
      whatsAppNumber: settings.whatsapp || '919024444555',
      wishlist,
      cart,
      cartCount,
      cartTotal,
      loading,
      error,
      fetchProducts,
      fetchCategories,
      fetchBanners,
      fetchReviews,
      fetchFaqs,
      fetchSettings,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addBanner,
      updateBanner,
      deleteBanner,
      addReview,
      updateReview,
      deleteReview,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      updateWhatsAppNumber,
      updateSettings,
      resetAllToDefault
    }}>
=======
    <ShopContext.Provider
      value={{
        // Data
        products,
        categories,
        banners,
        reviews,
        wishlist,
        whatsAppNumber,
        faqs,
        cart,
        cartCount,
        cartTotal,
 
        // NEW
        loading,
        error,
 
        // Cart
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
 
        // Wishlist
        toggleWishlist,
        isInWishlist,
 
        // Admin: Products
        addProduct,
        updateProduct,
        deleteProduct,
 
        // Admin: Categories
        addCategory,
        updateCategory,
        deleteCategory,
 
        // Admin: Banners
        addBanner,
        updateBanner,
        deleteBanner,
 
        // Settings
        updateWhatsAppNumber,
        resetAllToDefault,
 
        // NEW: Manual refresh
        refreshProducts:   fetchProducts,
        refreshCategories: fetchCategories,
        refreshBanners:    fetchBanners,
      }}
    >
>>>>>>> 15026c6 (Fixed & updated website)
      {children}
    </ShopContext.Provider>
  );
};
 