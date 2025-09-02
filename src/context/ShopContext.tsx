import React, { createContext, useContext, useState, useEffect } from 'react';
import { Shop } from '../types/product';
import { ProductService } from '../services/productService';
import { useAuth } from './AuthContext';

interface ShopContextType {
  shops: Shop[];
  userShops: Shop[];
  selectedShop: Shop | null;
  loading: boolean;
  error: string | null;
  setSelectedShop: (shop: Shop | null) => void;
  refreshShops: () => Promise<void>;
  refreshUserShops: () => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

interface ShopProviderProps {
  children: React.ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [shops, setShops] = useState<Shop[]>([]);
  const [userShops, setUserShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshShops = async () => {
    try {
      setLoading(true);
      setError(null);
      const shopsData = await ProductService.getShops();
      setShops(shopsData);
    } catch (err) {
      console.error('Error loading shops:', err);
      setError(err instanceof Error ? err.message : 'Failed to load shops');
    } finally {
      setLoading(false);
    }
  };

  const refreshUserShops = async () => {
    if (!user) {
      setUserShops([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userShopsData = await ProductService.getShopsByOwner(user.id);
      setUserShops(userShopsData);
    } catch (err) {
      console.error('Error loading user shops:', err);
      setError(err instanceof Error ? err.message : 'Failed to load user shops');
    } finally {
      setLoading(false);
    }
  };

  // Load shops on mount
  useEffect(() => {
    refreshShops();
  }, []);

  // Load user shops when user changes
  useEffect(() => {
    if (user) {
      refreshUserShops();
    } else {
      setUserShops([]);
      setSelectedShop(null);
    }
  }, [user]);

  const value = {
    shops,
    userShops,
    selectedShop,
    loading,
    error,
    setSelectedShop,
    refreshShops,
    refreshUserShops
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};