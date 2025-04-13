import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, CartState, Product } from '../types';

// Define action types for better type safety
type CartActions = {
  addToCart: (product: Product, quantity: number, options?: Record<string, string>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromoCode: () => void;
};

// Create the store with TypeScript typing
const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      subtotal: 0,
      tax: 0,
      deliveryFee: 0,
      discount: 0,
      total: 0,
      promoCode: null,
      
      // Actions
      addToCart: (product: Product, quantity: number, options?: Record<string, string>) => {
        const { items } = get();
        
        // Check if the item already exists in the cart with the same options
        const existingItemIndex = items.findIndex(
          item => 
            item.product.id === product.id && 
            JSON.stringify(item.options) === JSON.stringify(options)
        );
        
        let newItems: CartItem[];
        
        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          newItems = [...items];
          newItems[existingItemIndex].quantity += quantity;
          newItems[existingItemIndex].subtotal = 
            newItems[existingItemIndex].quantity * newItems[existingItemIndex].product.price;
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            product,
            quantity,
            options: options || {},
            subtotal: product.price * quantity,
          };
          
          newItems = [...items, newItem];
        }
        
        // Recalculate totals
        const subtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
        const tax = subtotal * 0.05; // Assuming 5% tax
        const deliveryFee = subtotal > 0 ? 5 : 0; // Assuming $5 delivery fee
        const { discount, promoCode } = get();
        const total = subtotal + tax + deliveryFee - discount;
        
        set({
          items: newItems,
          subtotal,
          tax,
          deliveryFee,
          total,
        });
      },
      
      removeFromCart: (itemId: string) => {
        const { items, promoCode } = get();
        const newItems = items.filter(item => item.id !== itemId);
        
        // Recalculate totals
        const subtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
        const tax = subtotal * 0.05; // Assuming 5% tax
        const deliveryFee = subtotal > 0 ? 5 : 0; // Assuming $5 delivery fee
        
        // If cart is empty, remove promo code
        let discount = get().discount;
        let newPromoCode = promoCode;
        
        if (newItems.length === 0) {
          discount = 0;
          newPromoCode = null;
        }
        
        const total = subtotal + tax + deliveryFee - discount;
        
        set({
          items: newItems,
          subtotal,
          tax,
          deliveryFee,
          discount,
          promoCode: newPromoCode,
          total,
        });
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        const { items } = get();
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          return get().removeFromCart(itemId);
        }
        
        const newItems = items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity,
              subtotal: item.product.price * quantity,
            };
          }
          return item;
        });
        
        // Recalculate totals
        const subtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
        const tax = subtotal * 0.05; // Assuming 5% tax
        const deliveryFee = subtotal > 0 ? 5 : 0; // Assuming $5 delivery fee
        const { discount } = get();
        const total = subtotal + tax + deliveryFee - discount;
        
        set({
          items: newItems,
          subtotal,
          tax,
          deliveryFee,
          total,
        });
      },
      
      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          tax: 0,
          deliveryFee: 0,
          discount: 0,
          promoCode: null,
          total: 0,
        });
      },
      
      applyPromoCode: async (code: string) => {
        try {
          // Simulate API call to validate promo code
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock promo codes
          const promoCodes = {
            'WELCOME10': 10, // $10 off
            'SAVE20': 20,    // $20 off
            'FREESHIP': 5,   // Free shipping ($5 off)
          };
          
          const codeUpperCase = code.toUpperCase();
          
          if (codeUpperCase in promoCodes) {
            const discount = promoCodes[codeUpperCase as keyof typeof promoCodes];
            const { subtotal, tax, deliveryFee } = get();
            const total = subtotal + tax + deliveryFee - discount;
            
            set({
              promoCode: codeUpperCase,
              discount,
              total,
            });
            
            return true;
          }
          
          return false;
        } catch (error) {
          console.error('Error applying promo code:', error);
          return false;
        }
      },
      
      removePromoCode: () => {
        const { subtotal, tax, deliveryFee } = get();
        const total = subtotal + tax + deliveryFee;
        
        set({
          promoCode: null,
          discount: 0,
          total,
        });
      },
    }),
    {
      name: 'cart-storage',
      getStorage: () => AsyncStorage,
    }
  )
);

export default useCartStore;
