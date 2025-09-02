export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  inStock: boolean;
  rating: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
  icon: string;
}

export interface Subcategory {
  id: string;
  name: string;
  count: number;
}