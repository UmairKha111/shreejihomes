import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Banner, Review, FAQItem, CartItem, GeneralSettings } from '../types';
import { INITIAL_SETTINGS } from '../data/mockData';
import * as firestoreService from '../services/firestore';

interface ShopContextType {
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
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

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
    );
    if (existingIndex > -1) {
      nextCart[existingIndex].quantity += quantity;
    } else {
      nextCart.push({ product, quantity, selectedSize, selectedColor });
    }
    syncAndSetCart(nextCart);
  };

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    const nextCart = cart.filter(item =>
      !(item.product.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor)
    );
    syncAndSetCart(nextCart);
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }
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
  const toggleWishlist = (productId: string) => {
    const nextWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    setWishlist(nextWishlist);
    localStorage.setItem('sh_wishlist', JSON.stringify(nextWishlist));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Firestore Admin Actions for Products
  const addProduct = async (prodData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>): Promise<string> => {
    return await firestoreService.addProduct({
      ...prodData,
      rating: 4.8,
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
  };

  return (
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
      {children}
    </ShopContext.Provider>
  );
};
