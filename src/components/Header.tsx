import React from 'react';
import { Search, ShoppingCart, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

interface HeaderProps {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCartClick: () => void;
}

export function Header({ cartCount, searchTerm, onSearchChange, onCartClick }: HeaderProps) {
  const { isAuthenticated } = useAuth();
  const { userShops } = useShop();

  const handleAdminClick = () => {
    window.history.pushState({}, '', '/admin');
    window.location.reload();
  };

  const handleShopsClick = () => {
    window.location.href = '/shops';
  };

  const handleMyShopsClick = () => {
    window.location.href = '/shopadmin';
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-red-600" />
            <h1 className="text-xl font-bold text-gray-900">FiveM Store</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Cart Button */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleShopsClick}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  Shops
                </button>
                {userShops.length > 0 && (
                  <button
                    onClick={handleMyShopsClick}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                  >
                    My Shops
                  </button>
                )}
                <button
                  onClick={handleAdminClick}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  Admin
                </button>
              </div>
            )}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}