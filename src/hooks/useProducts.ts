import { useState, useEffect } from 'react';
import { Product, CategoryWithSubcategories } from '../types/product';
import { ProductService } from '../services/productService';

/**
 * Custom hook for managing products and categories from Supabase
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryWithSubcategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load categories and products in parallel
      const [categoriesData, productsData] = await Promise.all([
        ProductService.getCategories(),
        ProductService.getProducts()
      ]);

      setCategories(categoriesData);
      setProducts(productsData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = async (filters?: {
    categoryId?: string;
    subcategoryId?: string;
    searchTerm?: string;
    inStockOnly?: boolean;
  }) => {
    try {
      setError(null);
      const productsData = await ProductService.getProducts(filters);
      setProducts(productsData);
    } catch (err) {
      console.error('Error refreshing products:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh products');
    }
  };

  const refreshCategories = async () => {
    try {
      setError(null);
      const categoriesData = await ProductService.getCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error refreshing categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh categories');
    }
  };

  return {
    products,
    categories,
    loading,
    error,
    refreshProducts,
    refreshCategories,
    reload: loadData
  };
};