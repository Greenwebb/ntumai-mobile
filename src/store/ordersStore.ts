import { create } from 'zustand';
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
