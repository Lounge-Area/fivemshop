import { Product, CategoryWithSubcategories } from '../types/product';

// Static product data for development/fallback
export const categories: CategoryWithSubcategories[] = [
  {
    id: '1',
    name: 'Weapons',
    icon: 'Zap',
    created_at: new Date().toISOString(),
    subcategories: [
      { id: '1-1', name: 'Pistols', category_id: '1', created_at: new Date().toISOString(), count: 5 },
      { id: '1-2', name: 'Rifles', category_id: '1', created_at: new Date().toISOString(), count: 4 },
      { id: '1-3', name: 'Shotguns', category_id: '1', created_at: new Date().toISOString(), count: 3 },
      { id: '1-4', name: 'Melee Weapons', category_id: '1', created_at: new Date().toISOString(), count: 4 }
    ]
  },
  {
    id: '2',
    name: 'Ammunition',
    icon: 'Target',
    created_at: new Date().toISOString(),
    subcategories: [
      { id: '2-1', name: '9mm', category_id: '2', created_at: new Date().toISOString(), count: 3 },
      { id: '2-2', name: '5.56mm', category_id: '2', created_at: new Date().toISOString(), count: 2 },
      { id: '2-3', name: '12 Gauge', category_id: '2', created_at: new Date().toISOString(), count: 2 }
    ]
  },
  {
    id: '3',
    name: 'Weapon Attachments',
    icon: 'Settings',
    created_at: new Date().toISOString(),
    subcategories: [
      { id: '3-1', name: 'Scopes', category_id: '3', created_at: new Date().toISOString(), count: 4 },
      { id: '3-2', name: 'Silencers', category_id: '3', created_at: new Date().toISOString(), count: 3 },
      { id: '3-3', name: 'Grips', category_id: '3', created_at: new Date().toISOString(), count: 2 },
      { id: '3-4', name: 'Extended Magazines', category_id: '3', created_at: new Date().toISOString(), count: 3 }
    ]
  },
  {
    id: '4',
    name: 'Vehicles',
    icon: 'Car',
    created_at: new Date().toISOString(),
    subcategories: [
      { id: '4-1', name: 'Cars', category_id: '4', created_at: new Date().toISOString(), count: 6 },
      { id: '4-2', name: 'Motorcycles', category_id: '4', created_at: new Date().toISOString(), count: 4 },
      { id: '4-3', name: 'Boats', category_id: '4', created_at: new Date().toISOString(), count: 2 },
      { id: '4-4', name: 'Aircraft', category_id: '4', created_at: new Date().toISOString(), count: 3 }
    ]
  },
  {
    id: '5',
    name: 'Medical Supplies',
    icon: 'Heart',
    created_at: new Date().toISOString(),
    subcategories: [
      { id: '5-1', name: 'Bandages', category_id: '5', created_at: new Date().toISOString(), count: 3 },
      { id: '5-2', name: 'Medkits', category_id: '5', created_at: new Date().toISOString(), count: 2 },
      { id: '5-3', name: 'Painkillers', category_id: '5', created_at: new Date().toISOString(), count: 2 }
    ]
  },
  {
    id: '6',
    name: 'Electronics',
    icon: 'Smartphone',
    created_at: new Date().toISOString(),
    subcategories: [
      { id: '6-1', name: 'Phones', category_id: '6', created_at: new Date().toISOString(), count: 4 },
      { id: '6-2', name: 'Radios', category_id: '6', created_at: new Date().toISOString(), count: 3 },
      { id: '6-3', name: 'GPS Devices', category_id: '6', created_at: new Date().toISOString(), count: 2 }
    ]
  }
];

export const products: Product[] = [
  // Weapons - Pistols
  {
    id: 'w1',
    name: 'Glock 17',
    price: 850,
    category_id: '1',
    subcategory_id: '1-1',
    shop_id: null,
    description: 'Reliable 9mm pistol with high accuracy and durability.',
    image_url: 'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg',
    in_stock: true,
    stock_quantity: 15,
    tags: ['pistol', 'sidearm', '9mm'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'w2',
    name: 'Desert Eagle',
    price: 1200,
    category_id: '1',
    subcategory_id: '1-1',
    shop_id: null,
    description: 'High-powered .50 caliber pistol with devastating stopping power.',
    image_url: 'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg',
    in_stock: true,
    stock_quantity: 8,
    tags: ['pistol', 'heavy', '.50cal'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Weapons - Rifles
  {
    id: 'w3',
    name: 'AK-47',
    price: 2500,
    category_id: '1',
    subcategory_id: '1-2',
    shop_id: null,
    description: 'Legendary assault rifle known for its reliability and power.',
    image_url: 'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg',
    in_stock: true,
    stock_quantity: 12,
    tags: ['rifle', 'assault', '7.62mm'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'w4',
    name: 'M4A1 Carbine',
    price: 2800,
    category_id: '1',
    subcategory_id: '1-2',
    shop_id: null,
    description: 'Military-grade carbine with excellent accuracy and modularity.',
    image_url: 'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg',
    in_stock: true,
    stock_quantity: 10,
    tags: ['rifle', 'carbine', '5.56mm'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Vehicles - Cars
  {
    id: 'v1',
    name: 'Sports Car GT',
    price: 125000,
    category_id: '4',
    subcategory_id: '4-1',
    shop_id: null,
    description: 'High-performance sports car with exceptional speed and handling.',
    image_url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    in_stock: true,
    stock_quantity: 3,
    tags: ['sports', 'fast', 'luxury'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'v2',
    name: 'Police Cruiser',
    price: 45000,
    category_id: '4',
    subcategory_id: '4-1',
    shop_id: null,
    description: 'Armored police vehicle with enhanced protection and pursuit capabilities.',
    image_url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    in_stock: true,
    stock_quantity: 5,
    tags: ['police', 'armored', 'pursuit'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Medical Supplies
  {
    id: 'm1',
    name: 'First Aid Kit',
    price: 25,
    category_id: '5',
    subcategory_id: '5-2',
    shop_id: null,
    description: 'Complete medical kit for treating minor injuries and wounds.',
    image_url: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    in_stock: true,
    stock_quantity: 50,
    tags: ['medical', 'healing', 'emergency'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'm2',
    name: 'Morphine',
    price: 75,
    category_id: '5',
    subcategory_id: '5-3',
    shop_id: null,
    description: 'Powerful painkiller for severe injuries and medical emergencies.',
    image_url: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    in_stock: true,
    stock_quantity: 25,
    tags: ['painkiller', 'medical', 'emergency'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Electronics
  {
    id: 'e1',
    name: 'Smartphone Pro',
    price: 800,
    category_id: '6',
    subcategory_id: '6-1',
    shop_id: null,
    description: 'Latest smartphone with advanced features and secure communication.',
    image_url: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    in_stock: true,
    stock_quantity: 20,
    tags: ['phone', 'communication', 'smart'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'e2',
    name: 'Tactical Radio',
    price: 350,
    category_id: '6',
    subcategory_id: '6-2',
    shop_id: null,
    description: 'Military-grade radio for secure long-range communication.',
    image_url: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    in_stock: true,
    stock_quantity: 15,
    tags: ['radio', 'tactical', 'communication'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];