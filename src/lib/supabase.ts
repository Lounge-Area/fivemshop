import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          icon?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string;
          created_at?: string;
        };
      };
      subcategories: {
        Row: {
          id: string;
          name: string;
          category_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category_id?: string;
          created_at?: string;
        };
      };
      shops: {
        Row: {
          id: string;
          name: string;
          description: string;
          location: string;
          opening_hours: string;
          owner_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          location?: string;
          opening_hours?: string;
          owner_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          location?: string;
          opening_hours?: string;
          owner_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
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
        };
        Insert: {
          id?: string;
          name: string;
          price?: number;
          category_id: string;
          subcategory_id?: string | null;
          shop_id?: string | null;
          description?: string;
          image_url?: string;
          in_stock?: boolean;
          stock_quantity?: number;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          category_id?: string;
          subcategory_id?: string | null;
          shop_id?: string | null;
          description?: string;
          image_url?: string;
          in_stock?: boolean;
          stock_quantity?: number;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}