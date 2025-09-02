/**
 * NUI Communication Utility for FiveM Integration
 * Handles sending data from the web interface to the FiveM client
 */

export interface NUIMessage {
  action: string;
  data?: any;
}

/**
 * Sends a message to the FiveM client via NUI callback
 * @param message - The message object containing action and data
 * @returns Promise that resolves when the message is sent
 */
export const sendNUIMessage = async (message: NUIMessage): Promise<void> => {
  try {
    // Check if we're running in a FiveM environment
    if (typeof window !== 'undefined' && window.invokeNative) {
      // Use FiveM's native invoke method
      window.invokeNative('sendNuiMessage', JSON.stringify(message));
    } else {
      // Fallback for development/testing - use fetch to simulate NUI callback
      await fetch(`https://${GetParentResourceName()}/nuiCallback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
  } catch (error) {
    console.error('Failed to send NUI message:', error);
    // In development, we'll just log the message
    console.log('NUI Message (Development):', message);
  }
};

/**
 * Gets the parent resource name for NUI callbacks
 * @returns The resource name or fallback for development
 */
export const GetParentResourceName = (): string => {
  try {
    // @ts-ignore - FiveM global function
    return window.GetParentResourceName?.() || 'fivem-product-catalog';
  } catch {
    return 'fivem-product-catalog';
  }
};

/**
 * Closes the NUI interface
 */
export const closeNUI = async (): Promise<void> => {
  await sendNUIMessage({
    action: 'closeNUI'
  });
};

/**
 * Sends product addition to cart to FiveM client
 * @param product - The product being added to cart
 * @param quantity - The quantity being added
 */
export const notifyProductAdded = async (product: any, quantity: number = 1): Promise<void> => {
  await sendNUIMessage({
    action: 'addToCart',
    data: {
      product,
      quantity,
      timestamp: Date.now()
    }
  });
};

/**
 * Sends checkout data to FiveM client
 * @param cartItems - Array of cart items with quantities
 * @param total - Total price of the cart
 */
export const processCheckout = async (cartItems: any[], total: number): Promise<void> => {
  await sendNUIMessage({
    action: 'processCheckout',
    data: {
      items: cartItems,
      total,
      timestamp: Date.now()
    }
  });
};

/**
 * Notifies FiveM client when cart is updated
 * @param cartItems - Current cart items
 */
export const updateCartState = async (cartItems: any[]): Promise<void> => {
  await sendNUIMessage({
    action: 'updateCart',
    data: {
      items: cartItems,
      count: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }
  });
};

// Extend Window interface for FiveM globals
declare global {
  interface Window {
    invokeNative?: (native: string, data: string) => void;
    GetParentResourceName?: () => string;
  }
}