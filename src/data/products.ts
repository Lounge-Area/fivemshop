import { Product, Category } from '../types/product';

export const categories: Category[] = [
  {
    id: 'tools',
    name: 'Tools',
    icon: 'wrench',
    subcategories: [
      { id: 'hand-tools', name: 'Hand Tools', count: 15 },
      { id: 'power-tools', name: 'Power Tools', count: 12 },
      { id: 'automotive-tools', name: 'Automotive Tools', count: 8 },
      { id: 'construction-tools', name: 'Construction Tools', count: 10 }
    ]
  },
  {
    id: 'food',
    name: 'Food',
    icon: 'apple',
    subcategories: [
      { id: 'beverages', name: 'Beverages', count: 18 },
      { id: 'snacks', name: 'Snacks', count: 22 },
      { id: 'fresh-produce', name: 'Fresh Produce', count: 14 },
      { id: 'canned-goods', name: 'Canned Goods', count: 16 },
      { id: 'dairy', name: 'Dairy', count: 9 }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'smartphone',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones', count: 7 },
      { id: 'computers', name: 'Computers', count: 6 },
      { id: 'gaming', name: 'Gaming', count: 11 },
      { id: 'audio-equipment', name: 'Audio Equipment', count: 8 },
      { id: 'smart-home', name: 'Smart Home', count: 5 }
    ]
  }
];

export const products: Product[] = [
  // Tools - Hand Tools
  {
    id: 'ht001',
    name: 'Professional Hammer Set',
    price: 89.99,
    category: 'tools',
    subcategory: 'hand-tools',
    description: 'Complete set of professional hammers for various tasks',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
    inStock: true,
    rating: 4.8,
    tags: ['hammer', 'professional', 'construction']
  },
  {
    id: 'ht002',
    name: 'Screwdriver Kit (24-piece)',
    price: 34.99,
    category: 'tools',
    subcategory: 'hand-tools',
    description: 'Complete screwdriver set with magnetic tips',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
    inStock: true,
    rating: 4.6,
    tags: ['screwdriver', 'kit', 'magnetic']
  },
  
  // Tools - Power Tools
  {
    id: 'pt001',
    name: 'Cordless Drill Pro',
    price: 199.99,
    category: 'tools',
    subcategory: 'power-tools',
    description: 'High-performance cordless drill with 2 batteries',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
    inStock: true,
    rating: 4.9,
    tags: ['drill', 'cordless', 'professional']
  },
  {
    id: 'pt002',
    name: 'Electric Circular Saw',
    price: 159.99,
    category: 'tools',
    subcategory: 'power-tools',
    description: 'Precision circular saw for wood cutting',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
    inStock: false,
    rating: 4.7,
    tags: ['saw', 'electric', 'cutting']
  },

  // Food - Beverages
  {
    id: 'bv001',
    name: 'Energy Drink Pack (12)',
    price: 24.99,
    category: 'food',
    subcategory: 'beverages',
    description: 'Premium energy drinks for sustained energy',
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg',
    inStock: true,
    rating: 4.3,
    tags: ['energy', 'drinks', 'pack']
  },
  {
    id: 'bv002',
    name: 'Craft Beer Selection',
    price: 18.99,
    category: 'food',
    subcategory: 'beverages',
    description: 'Local craft beer variety pack',
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg',
    inStock: true,
    rating: 4.5,
    tags: ['beer', 'craft', 'local']
  },

  // Food - Snacks
  {
    id: 'sn001',
    name: 'Premium Nut Mix',
    price: 12.99,
    category: 'food',
    subcategory: 'snacks',
    description: 'Gourmet mixed nuts and dried fruits',
    image: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg',
    inStock: true,
    rating: 4.4,
    tags: ['nuts', 'healthy', 'premium']
  },
  {
    id: 'sn002',
    name: 'Artisan Chocolate Bar',
    price: 8.99,
    category: 'food',
    subcategory: 'snacks',
    description: 'Handcrafted dark chocolate with sea salt',
    image: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg',
    inStock: true,
    rating: 4.7,
    tags: ['chocolate', 'artisan', 'dark']
  },

  // Electronics - Smartphones
  {
    id: 'sp001',
    name: 'Latest Smartphone Pro',
    price: 899.99,
    category: 'electronics',
    subcategory: 'smartphones',
    description: 'Latest flagship smartphone with advanced camera',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    inStock: true,
    rating: 4.6,
    tags: ['smartphone', 'flagship', 'camera']
  },
  {
    id: 'sp002',
    name: 'Budget Phone Plus',
    price: 299.99,
    category: 'electronics',
    subcategory: 'smartphones',
    description: 'Affordable smartphone with great battery life',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    inStock: true,
    rating: 4.2,
    tags: ['budget', 'battery', 'affordable']
  },

  // Electronics - Gaming
  {
    id: 'gm001',
    name: 'Gaming Headset Pro',
    price: 129.99,
    category: 'electronics',
    subcategory: 'gaming',
    description: 'Professional gaming headset with surround sound',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
    inStock: true,
    rating: 4.8,
    tags: ['headset', 'gaming', 'surround']
  },
  {
    id: 'gm002',
    name: 'Mechanical Keyboard RGB',
    price: 189.99,
    category: 'electronics',
    subcategory: 'gaming',
    description: 'RGB mechanical keyboard for gaming',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
    inStock: true,
    rating: 4.9,
    tags: ['keyboard', 'mechanical', 'rgb']
  }
];