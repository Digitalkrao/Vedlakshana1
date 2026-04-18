import { Product, BlogPost } from '../types/index';

export const INITIAL_PRODUCTS: Partial<Product>[] = [
  {
    name: "Pure A2 Desi Gir Cow Ghee (500ml)",
    description: "Ethically hand-churned Bilona method A2 Ghee made from the milk of free-grazing Gir cows. Rich in nutrients and perfect for daily wellness.",
    price: 1250,
    category: "Ghee",
    stock: 50,
    imageUrl: "https://picsum.photos/seed/ghee1/600/600",
    benefits: ["Rich in Omega-3", "Aids Digestion", "Boosts Immunity"]
  },
  {
    name: "Pure A2 Desi Gir Cow Ghee (1L)",
    description: "The classic Vedic Bilona Ghee in a 1-liter pack. Sourced from native Gir cows cared for with love at our Gaushala.",
    price: 2400,
    category: "Ghee",
    stock: 30,
    imageUrl: "https://picsum.photos/seed/ghee2/600/600",
    benefits: ["High Smoke Point", "Cognitive Health", "Bone Strength"]
  },
  {
    name: "Gomaya Natural Soap - Charcoal",
    description: "Handmade soap using sacred Gaushala ingredients and activated charcoal for deep cleansing and spiritual well-being.",
    price: 150,
    category: "Body Care",
    stock: 100,
    imageUrl: "https://picsum.photos/seed/soap/600/600",
    benefits: ["Skin Detox", "100% Natural", "Eco-friendly"]
  },
  {
    name: "Vedic Panchagavya Grith",
    description: "Medicated A2 ghee prepared with five sacred cow products (milk, curd, ghee, urine, dung) as per ancient Ayurvedic texts.",
    price: 450,
    category: "Wellness",
    stock: 20,
    imageUrl: "https://picsum.photos/seed/panchagavya/600/600",
    benefits: ["Nervous System Support", "Mental Clarity", "Detoxification"]
  }
];

export const INITIAL_BLOGS: Partial<BlogPost>[] = [
  {
    title: "The Vedic Bilona Method: Why it Matters",
    content: "Discover the ancient tradition of hand-churning curd to extract pure ghee, a process that preserves vital nutrients and spiritual essence...",
    author: "Gaushala Sevak",
    date: new Date().toISOString(),
    imageUrl: "https://picsum.photos/seed/cow1/800/400",
    tags: ["Tradition", "A2 Ghee", "Bilona"]
  },
  {
    title: "5 Health Benefits of Switching to A2 Ghee",
    content: "A2 Ghee is not just for cooking; it's a superfood. Learn how it can transform your digestion, skin, and overall vitality...",
    author: "Dr. Ayurveda",
    date: new Date().toISOString(),
    imageUrl: "https://picsum.photos/seed/health1/800/400",
    tags: ["Wellness", "Nutrition", "Ayurveda"]
  }
];
