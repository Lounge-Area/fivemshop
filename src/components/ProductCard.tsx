import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => Promise<void>;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = async () => {
    try {
      await onAddToCart(product);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      // You could show a toast notification here in a real implementation
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image_url || 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
        {product.stock_quantity > 0 && (
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-md">
            <span className="text-sm font-medium text-gray-700">
              Stock: {product.stock_quantity}
            </span>
          </div>
        )}
        </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-red-600">
              ${product.price}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
              product.in_stock
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.in_stock ? (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            ) : (
              <>
                <Package className="w-4 h-4" />
                <span>Unavailable</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};