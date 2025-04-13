import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTax: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addToCart: (product, quantity) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      
      if (existingItemIndex !== -1) {
        // Product already exists in cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { items: updatedItems };
      } else {
        // Add new product to cart
        return { items: [...state.items, { product, quantity }] };
      }
    });
  },
  
  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId)
    }));
  },
  
  updateQuantity: (productId, quantity) => {
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      
      return { items: updatedItems };
    });
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getSubtotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
  
  getDeliveryFee: () => {
    const subtotal = get().getSubtotal();
    return subtotal > 50 ? 0 : 5.99;
  },
  
  getTax: () => {
    const subtotal = get().getSubtotal();
    return subtotal * 0.07; // 7% tax
  },
  
  getTotal: () => {
    const subtotal = get().getSubtotal();
    const deliveryFee = get().getDeliveryFee();
    const tax = get().getTax();
    
    return subtotal + deliveryFee + tax;
  }
}));
