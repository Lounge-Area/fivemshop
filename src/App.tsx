import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { useCart } from './hooks/useCart';
import { useProductFilter } from './hooks/useProductFilter';
import { categories, products } from './data/products';
import { sendNUIMessage } from './utils/nui';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    getTotalItems
  } = useCart();

  const {
    selectedCategory,
    selectedSubcategory,
    searchTerm,
    sortBy,
    filteredAndSortedProducts,
    setSelectedCategory,
    setSelectedSubcategory,
    setSearchTerm,
    setSortBy,
    clearFilters
  } = useProductFilter(products);

  // Initialize NUI communication when component mounts
  useEffect(() => {
    // Notify FiveM client that the NUI is ready
    sendNUIMessage({
      action: 'nuiReady',
      data: {
        timestamp: Date.now(),
        productCount: products.length,
        categoryCount: categories.length
      }
    }).catch(console.error);

    // Listen for messages from FiveM client (optional)
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'fivem-nui') {
        switch (event.data.action) {
          case 'clearCart':
            // Clear cart if requested by FiveM client
            break;
          case 'updateProducts':
            // Update products if new data is sent from FiveM client
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        cartCount={getTotalItems()}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartClick={handleCartToggle}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar - Category Filter */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              onCategorySelect={handleCategorySelect}
              onSubcategorySelect={setSelectedSubcategory}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Filter Bar */}
            <FilterBar
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              searchTerm={searchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={clearFilters}
              productCount={filteredAndSortedProducts.length}
            />

            {/* Product Grid */}
            <ProductGrid
              products={filteredAndSortedProducts}
              onAddToCart={addToCart}
            />
          </div>
        </div>
      </main>

      {/* Shopping Cart Modal */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <button
          onClick={handleCartToggle}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          </div>
        </button>
      )}
    </div>
  );
}

export default App;