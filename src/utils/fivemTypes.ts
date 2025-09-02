/**
 * FiveM-specific type definitions for NUI communication
 */

export interface FiveMPlayer {
  id: number;
  name: string;
  money: number;
  inventory: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  metadata?: Record<string, any>;
}

export interface PurchaseResult {
  success: boolean;
  message: string;
  newBalance?: number;
  transactionId?: string;
}

export interface NUICallbackData {
  action: string;
  data: any;
}

// FiveM NUI Event Types
export type FiveMNUIEvents = 
  | 'addToCart'
  | 'processCheckout'
  | 'updateCart'
  | 'closeNUI'
  | 'nuiReady'
  | 'clearCart'
  | 'updateProducts';