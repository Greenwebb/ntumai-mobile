import { create } from 'zustand';
<<<<<<< HEAD
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
=======
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order, OrderStatus, OrdersState } from '../types';

// Define action types for better type safety
type OrdersActions = {
  fetchOrders: () => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<Order | undefined>;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order | undefined>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<boolean>;
  cancelOrder: (orderId: string) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

// Create the store with TypeScript typing
const useOrdersStore = create<OrdersState & OrdersActions>()(
  persist(
    (set, get) => ({
      // Initial state
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,
      
      // Actions
      fetchOrders: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock orders data
          const mockOrders: Order[] = [
            {
              id: '1',
              userId: '1',
              items: [
                {
                  id: '1',
                  productId: '1',
                  name: 'Fresh Tomatoes',
                  price: 2.49,
                  quantity: 2,
                  subtotal: 4.98,
                },
                {
                  id: '2',
                  productId: '3',
                  name: 'Fresh Milk',
                  price: 3.49,
                  quantity: 1,
                  subtotal: 3.49,
                },
              ],
              status: 'delivered',
              subtotal: 8.47,
              tax: 0.42,
              deliveryFee: 5.00,
              discount: 0,
              total: 13.89,
              paymentMethod: 'card',
              deliveryAddress: {
                id: '1',
                addressLine1: '123 Main St',
                addressLine2: 'Apt 4B',
                city: 'New York',
                state: 'NY',
                postalCode: '10001',
                country: 'USA',
                label: 'Home',
                isDefault: true,
              },
              deliveryNotes: 'Please leave at the door',
              createdAt: new Date('2025-04-10T10:30:00Z'),
              updatedAt: new Date('2025-04-10T14:45:00Z'),
            },
            {
              id: '2',
              userId: '1',
              items: [
                {
                  id: '3',
                  productId: '4',
                  name: 'Whole Wheat Bread',
                  price: 2.99,
                  quantity: 1,
                  subtotal: 2.99,
                },
                {
                  id: '4',
                  productId: '5',
                  name: 'Chicken Breast',
                  price: 5.99,
                  quantity: 2,
                  subtotal: 11.98,
                },
              ],
              status: 'in_transit',
              subtotal: 14.97,
              tax: 0.75,
              deliveryFee: 5.00,
              discount: 5.00, // Applied promo code
              total: 15.72,
              paymentMethod: 'cash',
              deliveryAddress: {
                id: '2',
                addressLine1: '456 Park Ave',
                city: 'New York',
                state: 'NY',
                postalCode: '10022',
                country: 'USA',
                label: 'Work',
                isDefault: false,
              },
              createdAt: new Date('2025-04-12T09:15:00Z'),
              updatedAt: new Date('2025-04-12T09:20:00Z'),
            },
          ];
          
          set({
            orders: mockOrders,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch orders',
          });
        }
      },
      
      fetchOrderById: async (orderId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Find order by ID (in a real app, this would be a server request)
          const { orders } = get();
          const order = orders.find(order => order.id === orderId);
          
          if (order) {
            set({
              currentOrder: order,
              isLoading: false,
            });
            return order;
          } else {
            throw new Error('Order not found');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch order',
          });
          return undefined;
        }
      },
      
      createOrder: async (orderData) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Create new order (in a real app, this would be a server request)
          const newOrder: Order = {
            ...orderData,
            id: `order-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set(state => ({
            orders: [...state.orders, newOrder],
            currentOrder: newOrder,
            isLoading: false,
          }));
          
          return newOrder;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to create order',
          });
          return undefined;
        }
      },
      
      updateOrderStatus: async (orderId: string, status: OrderStatus) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Update order status (in a real app, this would be a server request)
          set(state => {
            const updatedOrders = state.orders.map(order => {
              if (order.id === orderId) {
                return {
                  ...order,
                  status,
                  updatedAt: new Date(),
                };
              }
              return order;
            });
            
            // Update current order if it's the one being modified
            const currentOrder = state.currentOrder && state.currentOrder.id === orderId
              ? { ...state.currentOrder, status, updatedAt: new Date() }
              : state.currentOrder;
            
            return {
              orders: updatedOrders,
              currentOrder,
              isLoading: false,
            };
          });
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to update order status',
          });
          return false;
        }
      },
      
      cancelOrder: async (orderId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Cancel order (in a real app, this would be a server request)
          // Only allow cancellation if order is pending or processing
          set(state => {
            const orderToCancel = state.orders.find(order => order.id === orderId);
            
            if (!orderToCancel) {
              throw new Error('Order not found');
            }
            
            if (orderToCancel.status !== 'pending' && orderToCancel.status !== 'processing') {
              throw new Error('Order cannot be cancelled at this stage');
            }
            
            const updatedOrders = state.orders.map(order => {
              if (order.id === orderId) {
                return {
                  ...order,
                  status: 'cancelled',
                  updatedAt: new Date(),
                };
              }
              return order;
            });
            
            // Update current order if it's the one being cancelled
            const currentOrder = state.currentOrder && state.currentOrder.id === orderId
              ? { ...state.currentOrder, status: 'cancelled', updatedAt: new Date() }
              : state.currentOrder;
            
            return {
              orders: updatedOrders,
              currentOrder,
              isLoading: false,
            };
          });
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to cancel order',
          });
          return false;
        }
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      
      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'orders-storage',
      getStorage: () => AsyncStorage,
      partialize: (state) => ({
        // Only persist these fields
        orders: state.orders,
      }),
    }
  )
);

export default useOrdersStore;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
