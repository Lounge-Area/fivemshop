import { supabase } from '../lib/supabase';
import { Product, Category, Subcategory, CategoryWithSubcategories, SubcategoryWithCount } from '../types/product';

/**
 * Service for managing products, categories, and subcategories
 */
export class ProductService {
  /**
   * Fetch all categories with their subcategories and product counts
   */
  static async getCategories(): Promise<CategoryWithSubcategories[]> {
    try {
      // Fetch categories
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch subcategories with product counts
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select(`
          *,
          products(count)
        `)
        .order('name');

      if (subcategoriesError) throw subcategoriesError;

      // Transform the data to include counts
      const categoriesWithSubcategories: CategoryWithSubcategories[] = categories.map(category => {
        const subcategories: SubcategoryWithCount[] = subcategoriesData
          .filter(sub => sub.category_id === category.id)
          .map(sub => ({
            id: sub.id,
            name: sub.name,
            category_id: sub.category_id,
            created_at: sub.created_at,
            count: sub.products?.[0]?.count || 0
          }));

        return {
          ...category,
          subcategories
        };
      });

      return categoriesWithSubcategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  /**
   * Fetch all products with optional filtering
   */
  static async getProducts(filters?: {
    categoryId?: string;
    subcategoryId?: string;
    searchTerm?: string;
    inStockOnly?: boolean;
  }): Promise<Product[]> {
    try {
      let query = supabase
        .from('products')
        .select('*')
        .order('name');

      // Apply filters
      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }

      if (filters?.subcategoryId) {
        query = query.eq('subcategory_id', filters.subcategoryId);
      }

      if (filters?.inStockOnly) {
        query = query.eq('in_stock', true);
      }

      if (filters?.searchTerm) {
        query = query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
      }

      const { data: products, error } = await query;

      if (error) throw error;

      return products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get a single product by ID
   */
  static async getProduct(id: string): Promise<Product | null> {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Create a new product (admin function)
   */
  static async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Update a product (admin function)
   */
  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  /**
   * Delete a product (admin function)
   */
  static async deleteProduct(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  /**
   * Get products by category name (for backward compatibility)
   */
  static async getProductsByCategory(categoryName: string): Promise<Product[]> {
    try {
      // First get the category ID
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', categoryName)
        .single();

      if (categoryError) throw categoryError;

      // Then get products for that category
      return this.getProducts({ categoryId: category.id });
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
}