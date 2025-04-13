import { create } from 'zustand';
import { User, Order, Delivery } from '../types';

interface DriverState {
  profile: User | null;
  deliveries: Delivery[];
  currentDelivery: Delivery | null;
  earnings: any[]; // Earnings data
  isOnline: boolean;
  isLoading: boolean;
  error: string | null;
  
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  fetchDeliveries: () => Promise<void>;
  fetchDeliveryDetails: (deliveryId: string) => Promise<void>;
  acceptDelivery: (deliveryId: string) => Promise<void>;
  updateDeliveryStatus: (deliveryId: string, status: Delivery['status']) => Promise<void>;
  fetchEarnings: (period?: 'day' | 'week' | 'month' | 'year') => Promise<void>;
  toggleOnlineStatus: () => Promise<void>;
}

// Mock data
const mockDriver: User = {
  id: '1',
  name: 'John Driver',
  email: 'john.driver@example.com',
  phone: '+1234567890',
  role: 'driver',
  avatar: 'https://example.com/avatar.jpg'
};

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    order: {
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
      status: 'processing',
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
    driver: mockDriver,
    status: 'assigned',
    estimatedDelivery: '2023-04-10 15:30'
  },
  {
    id: '2',
    order: {
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
      status: 'shipped',
      date: '2023-04-12',
      address: {
        id: '2',
        name: 'Work',
        address: '456 Office Blvd',
        city: 'New York, NY 10002',
        isDefault: false
      },
      paymentMethod: 'PayPal'
    },
    driver: mockDriver,
    status: 'in_transit',
    estimatedDelivery: '2023-04-12 16:45'
  }
];

const mockEarnings = [
  { date: '2023-04-01', amount: 45.20, deliveries: 5 },
  { date: '2023-04-02', amount: 38.75, deliveries: 4 },
  { date: '2023-04-03', amount: 52.30, deliveries: 6 },
  { date: '2023-04-04', amount: 30.50, deliveries: 3 },
  { date: '2023-04-05', amount: 42.80, deliveries: 5 }
];

export const useDriverStore = create<DriverState>((set) => ({
  profile: null,
  deliveries: [],
  currentDelivery: null,
  earnings: [],
  isOnline: true,
  isLoading: false,
  error: null,
  
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ profile: mockDriver, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch driver profile', isLoading: false });
    }
  },
  
  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        profile: state.profile ? { ...state.profile, ...data } : null,
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update driver profile', isLoading: false });
    }
  },
  
  fetchDeliveries: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ deliveries: mockDeliveries, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch deliveries', isLoading: false });
    }
  },
  
  fetchDeliveryDetails: async (deliveryId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const delivery = mockDeliveries.find(d => d.id === deliveryId) || null;
      set({ currentDelivery: delivery, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch delivery details', isLoading: false });
    }
  },
  
  acceptDelivery: async (deliveryId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => {
        const updatedDeliveries = state.deliveries.map(delivery => {
          if (delivery.id === deliveryId) {
            return { ...delivery, status: 'picked' as const };
          }
          return delivery;
        });
        
        const updatedCurrentDelivery = state.currentDelivery?.id === deliveryId
          ? { ...state.currentDelivery, status: 'picked' as const }
          : state.currentDelivery;
        
        return { 
          deliveries: updatedDeliveries,
          currentDelivery: updatedCurrentDelivery,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ error: 'Failed to accept delivery', isLoading: false });
    }
  },
  
  updateDeliveryStatus: async (deliveryId, status) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => {
        const updatedDeliveries = state.deliveries.map(delivery => {
          if (delivery.id === deliveryId) {
            return { ...delivery, status };
          }
          return delivery;
        });
        
        const updatedCurrentDelivery = state.currentDelivery?.id === deliveryId
          ? { ...state.currentDelivery, status }
          : state.currentDelivery;
        
        return { 
          deliveries: updatedDeliveries,
          currentDelivery: updatedCurrentDelivery,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ error: 'Failed to update delivery status', isLoading: false });
    }
  },
  
  fetchEarnings: async (period = 'week') => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ earnings: mockEarnings, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch earnings data', isLoading: false });
    }
  },
  
  toggleOnlineStatus: async () => {
    set(state => ({ isOnline: !state.isOnline }));
  }
}));
