import { useState } from 'react';
import { Product } from '../types/product';
import { notifyProductAdded, updateCartState } from '../utils/nui';

interface CartItem extends Product {
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = async (product: Product) => {
    // Notify FiveM client about the product addition
    try {
      await notifyProductAdded(product, 1);
    } catch (error) {
      console.error('Failed to notify FiveM client:', error);
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      // Update FiveM client with new cart state
      updateCartState(newItems).catch(console.error);
      
      return newItems;
    });
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      
      // Update FiveM client with new cart state
      updateCartState(newItems).catch(console.error);
      
      return newItems;
    });
  };

  const removeItem = async (productId: string) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      
      // Update FiveM client with new cart state
      updateCartState(newItems).catch(console.error);
      
      return newItems;
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    // Update FiveM client with empty cart
    updateCartState([]).catch(console.error);
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    getTotalItems,
    clearCart
  };
};