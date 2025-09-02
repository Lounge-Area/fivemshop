// Updated types for Supabase integration - removed rating functionality
export interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
  subcategory_id: string | null;
  shop_id: string | null;
  description: string;
  image_url: string;
  in_stock: boolean;
  stock_quantity: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  created_at: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  category_id: string;
  created_at: string;
  count?: number; // For display purposes
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  location: string;
  opening_hours: string;
  owner_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Extended types for frontend display
export interface CategoryWithSubcategories extends Category {
  subcategories: SubcategoryWithCount[];
}

export interface SubcategoryWithCount extends Subcategory {
  count: number;
}

// Legacy compatibility types (for gradual migration)
export interface LegacyProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  inStock: boolean;
  tags: string[];
}