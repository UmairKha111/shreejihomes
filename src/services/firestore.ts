import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, Category, Banner, Review, FAQItem, GeneralSettings } from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BANNERS,
  INITIAL_REVIEWS,
  INITIAL_FAQS,
  INITIAL_SETTINGS
} from '../data/mockData';

// Collection References
const PRODUCTS_COL = 'products';
const CATEGORIES_COL = 'categories';
const BANNERS_COL = 'banners';
const REVIEWS_COL = 'reviews';
const FAQS_COL = 'faqs';
const SETTINGS_COL = 'settings';
const GENERAL_SETTINGS_DOC = 'general';

// ==================== PRODUCTS ====================
export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, PRODUCTS_COL));
  return snapshot.docs.map(docSnap => ({
    ...(docSnap.data() as Product),
    id: docSnap.id
  }));
};

export const listenProducts = (
  onData: (products: Product[]) => void,
  onError?: (err: Error) => void
): (() => void) => {
  return onSnapshot(
    collection(db, PRODUCTS_COL),
    snapshot => {
      const products = snapshot.docs.map(docSnap => ({
        ...(docSnap.data() as Product),
        id: docSnap.id
      }));
      onData(products);
    },
    error => {
      if (onError) onError(error);
    }
  );
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<string> => {
  const newDocRef = doc(collection(db, PRODUCTS_COL));
  const newProduct: Product = {
    ...productData,
    id: newDocRef.id
  };
  await setDoc(newDocRef, newProduct);
  return newDocRef.id;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COL, id);
  await updateDoc(docRef, productData);
};

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COL, id);
  await deleteDoc(docRef);
};

// ==================== CATEGORIES ====================
export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COL));
  return snapshot.docs.map(docSnap => ({
    ...(docSnap.data() as Category),
    id: docSnap.id
  }));
};

export const listenCategories = (
  onData: (categories: Category[]) => void,
  onError?: (err: Error) => void
): (() => void) => {
  return onSnapshot(
    collection(db, CATEGORIES_COL),
    snapshot => {
      const categories = snapshot.docs.map(docSnap => ({
        ...(docSnap.data() as Category),
        id: docSnap.id
      }));
      onData(categories);
    },
    error => {
      if (onError) onError(error);
    }
  );
};

export const addCategory = async (categoryData: Omit<Category, 'id'>): Promise<string> => {
  const newDocRef = doc(collection(db, CATEGORIES_COL));
  const newCategory: Category = {
    ...categoryData,
    id: newDocRef.id
  };
  await setDoc(newDocRef, newCategory);
  return newDocRef.id;
};

export const updateCategory = async (id: string, categoryData: Partial<Category>): Promise<void> => {
  const docRef = doc(db, CATEGORIES_COL, id);
  await updateDoc(docRef, categoryData);
};

export const deleteCategory = async (id: string): Promise<void> => {
  const docRef = doc(db, CATEGORIES_COL, id);
  await deleteDoc(docRef);
};

// ==================== BANNERS ====================
export const getBanners = async (): Promise<Banner[]> => {
  const snapshot = await getDocs(collection(db, BANNERS_COL));
  return snapshot.docs.map(docSnap => ({
    ...(docSnap.data() as Banner),
    id: docSnap.id
  }));
};

export const listenBanners = (
  onData: (banners: Banner[]) => void,
  onError?: (err: Error) => void
): (() => void) => {
  return onSnapshot(
    collection(db, BANNERS_COL),
    snapshot => {
      const banners = snapshot.docs.map(docSnap => ({
        ...(docSnap.data() as Banner),
        id: docSnap.id
      }));
      onData(banners);
    },
    error => {
      if (onError) onError(error);
    }
  );
};

export const addBanner = async (bannerData: Omit<Banner, 'id'>): Promise<string> => {
  const newDocRef = doc(collection(db, BANNERS_COL));
  const newBanner: Banner = {
    ...bannerData,
    id: newDocRef.id
  };
  await setDoc(newDocRef, newBanner);
  return newDocRef.id;
};

export const updateBanner = async (id: string, bannerData: Partial<Banner>): Promise<void> => {
  const docRef = doc(db, BANNERS_COL, id);
  await updateDoc(docRef, bannerData);
};

export const deleteBanner = async (id: string): Promise<void> => {
  const docRef = doc(db, BANNERS_COL, id);
  await deleteDoc(docRef);
};

// ==================== REVIEWS ====================
export const getReviews = async (): Promise<Review[]> => {
  const snapshot = await getDocs(collection(db, REVIEWS_COL));
  return snapshot.docs.map(docSnap => ({
    ...(docSnap.data() as Review),
    id: docSnap.id
  }));
};

export const listenReviews = (
  onData: (reviews: Review[]) => void,
  onError?: (err: Error) => void
): (() => void) => {
  return onSnapshot(
    collection(db, REVIEWS_COL),
    snapshot => {
      const reviews = snapshot.docs.map(docSnap => ({
        ...(docSnap.data() as Review),
        id: docSnap.id
      }));
      onData(reviews);
    },
    error => {
      if (onError) onError(error);
    }
  );
};

export const addReview = async (reviewData: Omit<Review, 'id'>): Promise<string> => {
  const newDocRef = doc(collection(db, REVIEWS_COL));
  const newReview: Review = {
    ...reviewData,
    id: newDocRef.id
  };
  await setDoc(newDocRef, newReview);
  return newDocRef.id;
};

export const updateReview = async (id: string, reviewData: Partial<Review>): Promise<void> => {
  const docRef = doc(db, REVIEWS_COL, id);
  await updateDoc(docRef, reviewData);
};

export const deleteReview = async (id: string): Promise<void> => {
  const docRef = doc(db, REVIEWS_COL, id);
  await deleteDoc(docRef);
};

// ==================== FAQS ====================
export const getFAQs = async (): Promise<FAQItem[]> => {
  const snapshot = await getDocs(collection(db, FAQS_COL));
  return snapshot.docs.map(docSnap => ({
    ...(docSnap.data() as FAQItem),
    id: docSnap.id
  }));
};

export const listenFAQs = (
  onData: (faqs: FAQItem[]) => void,
  onError?: (err: Error) => void
): (() => void) => {
  return onSnapshot(
    collection(db, FAQS_COL),
    snapshot => {
      const faqs = snapshot.docs.map(docSnap => ({
        ...(docSnap.data() as FAQItem),
        id: docSnap.id
      }));
      onData(faqs);
    },
    error => {
      if (onError) onError(error);
    }
  );
};

export const addFAQ = async (faqData: Omit<FAQItem, 'id'>): Promise<string> => {
  const newDocRef = doc(collection(db, FAQS_COL));
  const newFAQ: FAQItem = {
    ...faqData,
    id: newDocRef.id
  };
  await setDoc(newDocRef, newFAQ);
  return newDocRef.id;
};

export const updateFAQ = async (id: string, faqData: Partial<FAQItem>): Promise<void> => {
  const docRef = doc(db, FAQS_COL, id);
  await updateDoc(docRef, faqData);
};

export const deleteFAQ = async (id: string): Promise<void> => {
  const docRef = doc(db, FAQS_COL, id);
  await deleteDoc(docRef);
};

// ==================== SETTINGS (settings/general) ====================
export const getSettings = async (): Promise<GeneralSettings> => {
  const docRef = doc(db, SETTINGS_COL, GENERAL_SETTINGS_DOC);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as GeneralSettings;
  }
  return INITIAL_SETTINGS;
};

export const listenSettings = (
  onData: (settings: GeneralSettings) => void,
  onError?: (err: Error) => void
): (() => void) => {
  const docRef = doc(db, SETTINGS_COL, GENERAL_SETTINGS_DOC);
  return onSnapshot(
    docRef,
    docSnap => {
      if (docSnap.exists()) {
        onData(docSnap.data() as GeneralSettings);
      } else {
        onData(INITIAL_SETTINGS);
      }
    },
    error => {
      if (onError) onError(error);
    }
  );
};

export const updateSettings = async (settingsData: Partial<GeneralSettings>): Promise<void> => {
  const docRef = doc(db, SETTINGS_COL, GENERAL_SETTINGS_DOC);
  await setDoc(docRef, settingsData, { merge: true });
};

export const updateWhatsAppNumber = async (whatsapp: string): Promise<void> => {
  const cleanNum = whatsapp.replace(/[^0-9]/g, '');
  await updateSettings({ whatsapp: cleanNum });
};

// ==================== INITIAL SEEDING & RESET ====================
export const seedInitialDataIfEmpty = async (): Promise<void> => {
  try {
    const productsSnap = await getDocs(collection(db, PRODUCTS_COL));
    if (productsSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_PRODUCTS.forEach(item => {
        const docRef = doc(db, PRODUCTS_COL, item.id);
        batch.set(docRef, item);
      });
      await batch.commit();
    }

    const categoriesSnap = await getDocs(collection(db, CATEGORIES_COL));
    if (categoriesSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_CATEGORIES.forEach(item => {
        const docRef = doc(db, CATEGORIES_COL, item.id);
        batch.set(docRef, item);
      });
      await batch.commit();
    }

    const bannersSnap = await getDocs(collection(db, BANNERS_COL));
    if (bannersSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_BANNERS.forEach(item => {
        const docRef = doc(db, BANNERS_COL, item.id);
        batch.set(docRef, item);
      });
      await batch.commit();
    }

    const reviewsSnap = await getDocs(collection(db, REVIEWS_COL));
    if (reviewsSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_REVIEWS.forEach(item => {
        const docRef = doc(db, REVIEWS_COL, item.id);
        batch.set(docRef, item);
      });
      await batch.commit();
    }

    const faqsSnap = await getDocs(collection(db, FAQS_COL));
    if (faqsSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_FAQS.forEach(item => {
        const docRef = doc(db, FAQS_COL, item.id);
        batch.set(docRef, item);
      });
      await batch.commit();
    }

    const settingsRef = doc(db, SETTINGS_COL, GENERAL_SETTINGS_DOC);
    const settingsSnap = await getDoc(settingsRef);
    if (!settingsSnap.exists()) {
      await setDoc(settingsRef, INITIAL_SETTINGS);
    }
  } catch (err) {
    console.error('Error seeding initial Firestore data:', err);
  }
};

export const resetFirestoreToDefaults = async (): Promise<void> => {
  // Clear and rewrite with initial data
  const deleteCollection = async (colName: string) => {
    const snap = await getDocs(collection(db, colName));
    const batch = writeBatch(db);
    snap.docs.forEach(docSnap => batch.delete(docSnap.ref));
    await batch.commit();
  };

  await deleteCollection(PRODUCTS_COL);
  await deleteCollection(CATEGORIES_COL);
  await deleteCollection(BANNERS_COL);
  await deleteCollection(REVIEWS_COL);
  await deleteCollection(FAQS_COL);

  await setDoc(doc(db, SETTINGS_COL, GENERAL_SETTINGS_DOC), INITIAL_SETTINGS);

  // Re-populate initial data
  const batchP = writeBatch(db);
  INITIAL_PRODUCTS.forEach(p => batchP.set(doc(db, PRODUCTS_COL, p.id), p));
  await batchP.commit();

  const batchC = writeBatch(db);
  INITIAL_CATEGORIES.forEach(c => batchC.set(doc(db, CATEGORIES_COL, c.id), c));
  await batchC.commit();

  const batchB = writeBatch(db);
  INITIAL_BANNERS.forEach(b => batchB.set(doc(db, BANNERS_COL, b.id), b));
  await batchB.commit();

  const batchR = writeBatch(db);
  INITIAL_REVIEWS.forEach(r => batchR.set(doc(db, REVIEWS_COL, r.id), r));
  await batchR.commit();

  const batchF = writeBatch(db);
  INITIAL_FAQS.forEach(f => batchF.set(doc(db, FAQS_COL, f.id), f));
  await batchF.commit();
};
