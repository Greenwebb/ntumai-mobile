import { create } from 'zustand';
import { Order, Address } from '../types';

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
  
  fetchOrders: () => Promise<void>;
  fetchOrderDetails: (orderId: string) => Promise<void>;
  createOrder: (order: Partial<Order>) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  
  fetchAddresses: () => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (address: Address) => Promise<void>;
  removeAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    items: [
      {
        product: {
          id: '1',
          name: 'Fresh Tomatoes',
          description: 'Locally grown fresh tomatoes',
          price: 2.99,
          image: 'https://example.com/tomatoes.jpg',
          category: 'Vegetables',
          vendor: 'Local Farm',
          rating: 4.5,
          reviews: 120,
          inStock: true
        },
        quantity: 2
      },
      {
        product: {
          id: '2',
          name: 'Organic Bananas',
          description: 'Organic bananas from Ecuador',
          price: 1.99,
          image: 'https://example.com/bananas.jpg',
          category: 'Fruits',
          vendor: 'Organic Farms',
          rating: 4.8,
          reviews: 95,
          inStock: true
        },
        quantity: 1
      }
    ],
    total: 7.97,
    status: 'delivered',
    date: '2023-04-10',
    address: {
      id: '1',
      name: 'Home',
      address: '123 Main St',
      city: 'New York, NY 10001',
      isDefault: true
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    items: [
      {
        product: {
          id: '3',
          name: 'Whole Wheat Bread',
          description: 'Freshly baked whole wheat bread',
          price: 3.49,
          image: 'https://example.com/bread.jpg',
          category: 'Bakery',
          vendor: 'City Bakery',
          rating: 4.2,
          reviews: 78,
          inStock: true
        },
        quantity: 1
      }
    ],
    total: 3.49,
    status: 'processing',
    date: '2023-04-12',
    address: {
      id: '1',
      name: 'Home',
      address: '123 Main St',
      city: 'New York, NY 10001',
      isDefault: true
    },
    paymentMethod: 'PayPal'
  }
];

const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Home',
    address: '123 Main St',
    city: 'New York, NY 10001',
    isDefault: true
  },
  {
    id: '2',
    name: 'Work',
    address: '456 Office Blvd',
    city: 'New York, NY 10002',
    isDefault: false
  }
];

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  currentOrder: null,
  addresses: [],
  isLoading: false,
  error: null,
  
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ orders: mockOrders, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch orders', isLoading: false });
    }
  },
  
  fetchOrderDetails: async (orderId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const order = mockOrders.find(o => o.id === orderId) || null;
      set({ currentOrder: order, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch order details', isLoading: false });
    }
  },
  
  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOrder: Order = {
        id: Date.now().toString(),
        items: orderData.items || [],
        total: orderData.total || 0,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        address: orderData.address || mockAddresses[0],
        paymentMethod: orderData.paymentMethod || 'Credit Card'
      };
      
      set(state => ({ 
        orders: [newOrder, ...state.orders],
        currentOrder: newOrder,
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create order', isLoading: false });
    }
  },
  
  cancelOrder: async (orderId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => {
        const updatedOrders = state.orders.map(order => {
          if (order.id === orderId) {
            return { ...order, status: 'cancelled' };
          }
          return order;
        });
        
        const updatedCurrentOrder = state.currentOrder?.id === orderId
          ? { ...state.currentOrder, status: 'cancelled' }
          : state.currentOrder;
        
        return { 
          orders: updatedOrders,
          currentOrder: updatedCurrentOrder,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ error: 'Failed to cancel order', isLoading: false });
    }
  },
  
  fetchAddresses: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ addresses: mockAddresses, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch addresses', isLoading: false });
    }
  },
  
  addAddress: async (addressData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAddress: Address = {
        id: Date.now().toString(),
        ...addressData
      };
      
      set(state => ({ 
        addresses: [...state.addresses, newAddress],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to add address', isLoading: false });
    }
  },
  
  updateAddress: async (updatedAddress) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => {
        const updatedAddresses = state.addresses.map(address => {
          if (address.id === updatedAddress.id) {
            return updatedAddress;
          }
          return address;
        });
        
        return { addresses: updatedAddresses, isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to update address', isLoading: false });
    }
  },
  
  removeAddress: async (addressId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        addresses: state.addresses.filter(address => address.id !== addressId),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to remove address', isLoading: false });
    }
  },
  
  setDefaultAddress: async (addressId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => {
        const updatedAddresses = state.addresses.map(address => ({
          ...address,
          isDefault: address.id === addressId
        }));
        
        return { addresses: updatedAddresses, isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to set default address', isLoading: false });
    }
  }
}));
