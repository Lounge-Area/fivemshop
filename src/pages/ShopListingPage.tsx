import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Shop } from '../types/product';
import { Store, MapPin, Clock, User, ArrowLeft, Settings } from 'lucide-react';

export const ShopListingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { shops, userShops, loading, error, refreshShops } = useShop();

  useEffect(() => {
    refreshShops();
  }, []);

  const handleBackToStore = () => {
    window.location.href = '/';
  };

  const handleShopAdminClick = (shopId: string) => {
    window.location.href = `/shopadmin/${shopId}`;
  };

  const handleMasterAdminClick = () => {
    window.location.href = '/admin';
  };

  const isMasterAdmin = user?.email === 'admin@admin.com';
  const isShopOwner = userShops.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToStore}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Store</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">All Shops</h1>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <>
                  {isMasterAdmin && (
                    <button
                      onClick={handleMasterAdminClick}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Master Admin</span>
                    </button>
                  )}
                  {isShopOwner && (
                    <button
                      onClick={() => window.location.href = '/shopadmin'}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Store className="w-4 h-4" />
                      <span>My Shops</span>
                    </button>
                  )}
                  <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Shop Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Store className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Shops</p>
                <p className="text-2xl font-bold text-gray-900">{shops.length}</p>
              </div>
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <User className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Your Shops</p>
                  <p className="text-2xl font-bold text-gray-900">{userShops.length}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Shops</p>
                <p className="text-2xl font-bold text-gray-900">{shops.filter(s => s.is_active).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Grid */}
        {shops.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Shops Available</h3>
            <p className="text-gray-600">There are currently no shops in the system.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => {
              const isOwnedByUser = userShops.some(userShop => userShop.id === shop.id);
              
              return (
                <div
                  key={shop.id}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                    isOwnedByUser ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Store className="w-8 h-8 text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                      </div>
                      {isOwnedByUser && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          Your Shop
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{shop.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{shop.opening_hours}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        shop.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {shop.is_active ? 'Active' : 'Inactive'}
                      </span>
                      
                      {isOwnedByUser && (
                        <button
                          onClick={() => handleShopAdminClick(shop.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                        >
                          Manage
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};