export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  collections: string[]; // 'Best Sellers' | 'Trending' | 'New Arrivals' | 'Luxury Collection'
  sizes?: string[];
  colors?: string[];
  specifications?: Record<string, string>;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  pattern?: string; // e.g. 'Floral', 'Geometric', 'Solid', 'Traditional Block Print'
  fabric?: string;  // e.g. 'Mulmul Cotton', 'Premium Linen', 'Muslin', 'Pure Cotton'
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
}

export interface Review {
  id: string;
  productName: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GeneralSettings {
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

