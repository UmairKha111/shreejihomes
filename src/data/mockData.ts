import { Product, Category, Banner, Review, FAQItem, GeneralSettings } from '../types';

export const INITIAL_SETTINGS: GeneralSettings = {
  whatsapp: '919024444555',
  phone: '+91 9024444555',
  email: 'contact@shreejihomes.com',
  address: 'Shreeji Homes Experience Center, Johari Bazaar Road, Jaipur, Rajasthan 302003',
  instagram: 'https://instagram.com/shreejihomes',
  facebook: 'https://facebook.com/shreejihomes'
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Bedsheets',
    slug: 'bedsheets',
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=800',
    description: 'Luxurious cotton and linen bedspreads crafted for unparalleled comfort and sleep quality.'
  },
  {
    id: 'cat-2',
    name: 'Razais',
    slug: 'razais',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
    description: 'Premium organic mulmul cotton razais with authentic hand block prints and hand-carded cotton filling.'
  },
  {
    id: 'cat-3',
    name: 'Quilts',
    slug: 'quilts',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
    description: 'Exquisite, light-as-air traditional quilts layered with premium fabrics and artisanal patterns.'
  },
  {
    id: 'cat-4',
    name: 'Dohars',
    slug: 'dohars',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
    description: 'Delicate three-layer cotton dohars designed for light, breathable summer layering.'
  },
  {
    id: 'cat-5',
    name: 'Cushion Covers',
    slug: 'cushion-covers',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
    description: 'Ornate and textured cushion covers to introduce heritage accents and visual richness.'
  },
  {
    id: 'cat-6',
    name: 'Sofa Covers',
    slug: 'sofa-covers',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800',
    description: 'Tailored, heavy-duty linen and cotton protective covers designed for premium living spaces.'
  },
  {
    id: 'cat-7',
    name: 'Curtains',
    slug: 'curtains',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    description: 'Bespoke sheer and blackout linen drapes that filter light into an ambient, luxurious glow.'
  },
  {
    id: 'cat-8',
    name: 'Home Decor',
    slug: 'home-decor',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
    description: 'Heritage artifacts, brass lighting, and tabletop linens that complete the Shreeji Homes signature look.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Bella Muslin Luxury Razai',
    description: 'Crafted with the finest organic mulmul cotton, this light-as-air razai features hand-carded natural cotton filling and exquisite block prints. Perfectly breathable and warm, it brings authentic Rajasthani heritage directly to your bedroom. Perfect for all seasons.',
    price: 4300,
    originalPrice: 4900,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Razais',
    collections: ['Best Sellers', 'Luxury Collection'],
    sizes: ['Single (60x90 inches)', 'Double (90x100 inches)', 'King (108x108 inches)'],
    colors: ['Ivory White', 'Muted Rose', 'Soft Beige'],
    specifications: {
      'Material': '100% Organic Mulmul Cotton',
      'Filling': '100% Fine Hand-Carded Organic Cotton',
      'Craft': 'Hand Block Printing by Master Artisans',
      'Thread Count': '350 TC casing',
      'Care': 'Dry clean recommended'
    },
    inStock: true,
    rating: 4.9,
    reviewsCount: 28,
    pattern: 'Traditional Block Print',
    fabric: 'Mulmul Cotton'
  },
  {
    id: 'prod-2',
    name: 'Haathi Umbrella Traditional Bedsheet',
    description: 'An iconic Jaipuri hand-printed bedsheet made from extra-long staple pure cotton. Features royal elephant and floral umbrella motifs framed with elaborate borders. Includes two matching quilted pillow cases for a cohesive, premium heritage look.',
    price: 3450,
    originalPrice: 4200,
    images: [
      'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Bedsheets',
    collections: ['Best Sellers', 'New Arrivals'],
    sizes: ['Double (90x108 inches)', 'King Super (108x108 inches)'],
    colors: ['Deep Wine', 'Indigo Blue', 'Olive Green'],
    specifications: {
      'Material': '100% Premium Pure Cotton',
      'Weave': 'Percale Premium',
      'Thread Count': '400 TC',
      'Included': '1 Bedsheet, 2 Quilted Pillow Covers',
      'Care': 'Machine wash cold, gentle cycle'
    },
    inStock: true,
    rating: 4.8,
    reviewsCount: 34,
    pattern: 'Traditional Block Print',
    fabric: 'Pure Cotton'
  },
  {
    id: 'prod-3',
    name: 'Iris Premium White Muslin Quilt',
    description: 'An angelic all-white quilt with delicate sky blue floral print and intricate hand-quilting (Tagai). Made using pure premium mulmul cotton casing, offering a fluffy cloud-like sleep experience. It represents the height of minimal elegance.',
    price: 4900,
    originalPrice: 5500,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Quilts',
    collections: ['Luxury Collection', 'Trending'],
    sizes: ['Single (60x90 inches)', 'Double (90x100 inches)'],
    colors: ['Ivory White', 'Sky Blue Accents'],
    specifications: {
      'Material': 'High-Grade Mulmul Cotton',
      'Craftsmanship': 'Traditional Hand Tagai (Quilting)',
      'Weight': 'Lightweight (approx. 1.2 kg)',
      'Feel': 'Fluffy, ultra-soft and hypoallergenic',
      'Care': 'Dry clean only'
    },
    inStock: true,
    rating: 5.0,
    reviewsCount: 19,
    pattern: 'Floral',
    fabric: 'Mulmul Cotton'
  },
  {
    id: 'prod-4',
    name: 'Royal Mughal Heritage Dohar',
    description: 'A luxurious three-layered summer blanket. The middle layer features highly precise block-printed patterns showing through outer layers of semi-sheer premium mulmul. Softens beautifully with each subsequent wash.',
    price: 2800,
    originalPrice: 3200,
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Dohars',
    collections: ['Trending', 'New Arrivals'],
    sizes: ['Single (60x90 inches)', 'Double (90x100 inches)'],
    colors: ['Sage Green', 'Warm Beige', 'Muted Burgundy'],
    specifications: {
      'Structure': 'Authentic 3-Layer Mulmul',
      'Inner Fabric': '100% Cotton Gauze',
      'Outer Layers': 'High-density ultra-fine mulmul',
      'Feel': 'Extremely light, cool and moisture-wicking',
      'Care': 'Gentle machine wash'
    },
    inStock: true,
    rating: 4.7,
    reviewsCount: 15,
    pattern: 'Traditional Block Print',
    fabric: 'Mulmul Cotton'
  },
  {
    id: 'prod-5',
    name: 'Vintage Wine Velvet Cushion Cover',
    description: 'Enrich your sofas and bedding with the heavy texture of our vintage wine-toned velvet cushion covers. Detailed with intricate gold zardozi-inspired borders. Front is plush heavy-grade micro-velvet, back is organic linen with premium concealed zippers.',
    price: 850,
    originalPrice: 1100,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Cushion Covers',
    collections: ['Best Sellers', 'Luxury Collection'],
    sizes: ['16x16 inches', '18x18 inches', '20x20 inches'],
    colors: ['Deep Wine', 'Forest Green', 'Ivory Gold'],
    specifications: {
      'Front Fabric': 'Premium High-Pile Cotton Velvet',
      'Back Fabric': '100% Pure Slub Linen',
      'Closure': 'Concealed YKK metal zipper',
      'Finishing': 'Gold corded piping on borders',
      'Care': 'Dry clean only'
    },
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    pattern: 'Solid',
    fabric: 'Premium Linen'
  },
  {
    id: 'prod-6',
    name: 'French Linen Flowing Curtains',
    description: 'Transform light entry with these heavyweight French flax linen drapes. Uniquely pre-washed for a relaxed slubby texture that cascades elegantly onto the floor. Filters glare into a warm, soft ambient lighting setup.',
    price: 3800,
    originalPrice: 4500,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Curtains',
    collections: ['Luxury Collection'],
    sizes: ['5 ft (Window)', '7 ft (Door)', '9 ft (Long Door)'],
    colors: ['Oatmeal Beige', 'Ivory White', 'Sage Green'],
    specifications: {
      'Material': '100% Sourced French Flax Linen',
      'Header Style': 'Multi-functional (Rod Pocket & Back Tabs)',
      'Opacity': 'Semi-Sheer (Filters 60% Light)',
      'Shrinkage': 'Pre-shrunk for premium sizing lock',
      'Care': 'Machine wash cold, line dry'
    },
    inStock: true,
    rating: 4.6,
    reviewsCount: 22,
    pattern: 'Solid',
    fabric: 'Premium Linen'
  },
  {
    id: 'prod-7',
    name: 'Jacquard Textured Heavy Sofa Cover Set',
    description: 'A customized, heavy-duty sofa throw and cover set made from luxury jacquard-weave chenille. Thick and slip-resistant, featuring a floral relief damask pattern that immediately elevates older furniture into royal masterworks.',
    price: 5200,
    originalPrice: 6500,
    images: [
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Sofa Covers',
    collections: ['Trending'],
    sizes: ['5-Seater Set (3+1+1)', 'L-Shape Left Alignment', 'L-Shape Right Alignment'],
    colors: ['Soft Beige', 'Stone Gray', 'Muted Burgundy'],
    specifications: {
      'Material': 'Chenille-Cotton Jacquard Blend (450 GSM)',
      'Anti-Slip': 'Special anti-skid premium felt backing',
      'Set Composition': '1 Long Seat Cover, 1 Long Back Cover, 2 Single Seat, 2 Single Back',
      'Care': 'Dry clean only'
    },
    inStock: true,
    rating: 4.5,
    reviewsCount: 11,
    pattern: 'Traditional Block Print',
    fabric: 'Pure Cotton'
  },
  {
    id: 'prod-8',
    name: 'Vintage Brass Heritage Incense Urn',
    description: 'A stunning home decor centerpiece cast in pure heavy bell-metal brass by artisans in Uttar Pradesh. Carved with traditional floral filigree that releases thin, aesthetic coils of smoke when active. Perfect for creating a luxurious sensory experience.',
    price: 1950,
    originalPrice: 2400,
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Home Decor',
    collections: ['New Arrivals', 'Luxury Collection'],
    sizes: ['Medium (6 inches)', 'Large (9 inches)'],
    colors: ['Antique Golden Brass'],
    specifications: {
      'Material': '100% Solid Bell-Metal Brass',
      'Weight': '1.1 kg / 1.8 kg',
      'Origin': 'Moradabad traditional cluster',
      'Included': 'Urn, lid, solid brass holding tray',
      'Care': 'Wipe clean with brass polish when tarnished'
    },
    inStock: true,
    rating: 4.9,
    reviewsCount: 31,
    pattern: 'Traditional Block Print',
    fabric: 'Pure Cotton'
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-1',
    title: 'Comfort For Every Season',
    subtitle: 'Organic Handcrafted Razais & Bedspreads',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'SHOP NOW',
    ctaLink: '/shop',
    active: true
  },
  {
    id: 'banner-2',
    title: 'Heritage Meets Serenity',
    subtitle: 'Exquisite 400 TC Pure Cotton Sheets & Dohars',
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'EXPLORE COLLECTIONS',
    ctaLink: '/shop',
    active: true
  },
  {
    id: 'banner-3',
    title: 'Artisanal Elegance',
    subtitle: 'Hand block-printed linen and home accents',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'VIEW HOME DECOR',
    ctaLink: '/shop?category=Home Decor',
    active: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productName: 'Bella Muslin Luxury Razai',
    userName: 'Aishwarya Sen',
    rating: 5,
    comment: 'Absolutely gorgeous! The mulmul is unbelievably soft, and the tagai quilting is so neat. It keeps me warm but is so lightweight. Shreeji Homes has outdone themselves.',
    date: '2026-06-12',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-2',
    productName: 'Haathi Umbrella Traditional Bedsheet',
    userName: 'Rajesh Varma',
    rating: 5,
    comment: 'The block print is extremely clean and crisp, which is rare for handmade sheets. The 400 TC fabric has a rich, heavy feel. Ordered through WhatsApp and received it within 3 days in Mumbai. Brilliant service.',
    date: '2026-07-02',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-3',
    productName: 'French Linen Flowing Curtains',
    userName: 'Meenakshi Iyer',
    rating: 4,
    comment: 'Beautiful fall and texture. It lets the right amount of light leak in. Only docked one star because color was slightly lighter than picture, but it looks extremely premium nonetheless.',
    date: '2026-05-20',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I place an order with Shreeji Homes?',
    answer: 'Simply browse our collections, select your desired sizes and colors on the product page, and click "Order on WhatsApp". This will automatically open WhatsApp on your phone or computer with a pre-filled, elegant message containing the product name, price, link, and selected choices. Our team will verify availability, take your shipping address, and provide payment details (such as UPI, NetBanking, or COD status) right there.',
    category: 'Ordering'
  },
  {
    id: 'faq-2',
    question: 'Where is your physical store located?',
    answer: 'We are situated in the heart of elite shopping corridors. Our flagship experience center hosts our entire premium catalog of Bed Linens, Razais, and Custom Drapery. You can find detailed driving directions, maps, and hours on our "Store Visit" page.',
    category: 'Store'
  },
  {
    id: 'faq-3',
    question: 'Do you offer Cash on Delivery (COD)?',
    answer: 'Yes, we offer Cash on Delivery across most pin-codes in India. Please specify your preference during our WhatsApp chat when confirming your address.',
    category: 'Shipping & Payment'
  },
  {
    id: 'faq-4',
    question: 'How do I care for my premium home linens?',
    answer: 'For our delicate organic Mulmul Razais and Quilts, dry clean is highly recommended to retain fluffiness and block-print ink depth. Our 100% Cotton Bedsheets and Dohars can be machine washed on cold, gentle cycle, with mild organic detergents. Avoid bleach and tumble dry on low.',
    category: 'Care Guidelines'
  },
  {
    id: 'faq-5',
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship our luxury textiles worldwide. Shipping rates depend on weight and destination country. Our WhatsApp support agent will assist in calculating international custom shipping costs.',
    category: 'Shipping & Payment'
  }
];
