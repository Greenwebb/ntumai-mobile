import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RiderProfile, DeliveryOrder, RiderEarning, RiderState } from '../types';

// Define action types for better type safety
type RiderActions = {
  fetchRiderProfile: () => Promise<void>;
  updateRiderProfile: (profile: Partial<RiderProfile>) => Promise<boolean>;
  fetchAvailableOrders: () => Promise<void>;
  fetchActiveOrders: () => Promise<void>;
  fetchOrderHistory: () => Promise<void>;
  fetchEarnings: () => Promise<void>;
  acceptOrder: (orderId: string) => Promise<boolean>;
  updateOrderStatus: (orderId: string, status: string) => Promise<boolean>;
  toggleOnlineStatus: () => Promise<boolean>;
  fetchDashboardStats: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

// Create the store with TypeScript typing
const useRiderStore = create<RiderState & RiderActions>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      isOnline: false,
      availableOrders: [],
      activeOrders: [],
      orderHistory: [],
      earnings: {
        total: 0,
        today: 0,
        weekly: 0,
        monthly: 0,
        pending: 0,
        history: [],
      },
      stats: {
        totalDeliveries: 0,
        totalEarnings: 0,
        rating: 0,
        completionRate: 0,
        averageDeliveryTime: 0,
        deliveriesByDay: [],
      },
      isLoading: false,
      error: null,
      
      // Actions
      fetchRiderProfile: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock rider profile data
          const mockProfile: RiderProfile = {
            id: 'rider-1',
            name: 'Michael Johnson',
            email: 'michael@example.com',
            phoneNumber: '+1234567890',
            profileImage: 'https://example.com/profile.jpg',
            rating: 4.8,
            totalDeliveries: 156,
            joinDate: new Date('2024-02-10'),
            vehicleType: 'Motorcycle',
            vehicleNumber: 'MC-12345',
            bankAccount: {
              accountName: 'Michael Johnson',
              accountNumber: '****7890',
              bankName: 'City Bank',
            },
            documents: {
              idCard: {
                verified: true,
                expiryDate: new Date('2028-05-15'),
              },
              drivingLicense: {
                verified: true,
                expiryDate: new Date('2027-03-20'),
              },
              vehicleRegistration: {
                verified: true,
                expiryDate: new Date('2026-08-10'),
              },
            },
          };
          
          set({
            profile: mockProfile,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch rider profile',
          });
        }
      },
      
      updateRiderProfile: async (profileData: Partial<RiderProfile>) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Update rider profile (in a real app, this would be a server request)
          set(state => ({
            profile: state.profile ? { ...state.profile, ...profileData } : null,
            isLoading: false,
          }));
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to update rider profile',
          });
          return false;
        }
      },
      
      fetchAvailableOrders: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock available orders data
          const mockAvailableOrders: DeliveryOrder[] = [
            {
              id: 'delivery-1',
              status: 'pending',
              pickupLocation: {
                address: '123 Market St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7749,
                  longitude: -122.4194,
                },
              },
              deliveryLocation: {
                address: '456 Mission St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7875,
                  longitude: -122.4008,
                },
              },
              customer: {
                name: 'John Doe',
                phone: '+1987654321',
              },
              vendor: {
                name: 'Fresh Farms Market',
                phone: '+1234567890',
              },
              items: 3,
              total: 24.99,
              distance: 2.5,
              estimatedTime: '15-20 min',
              earnings: 8.50,
            },
            {
              id: 'delivery-2',
              status: 'pending',
              pickupLocation: {
                address: '789 Valencia St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7596,
                  longitude: -122.4214,
                },
              },
              deliveryLocation: {
                address: '101 California St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7932,
                  longitude: -122.3971,
                },
              },
              customer: {
                name: 'Jane Smith',
                phone: '+1876543210',
              },
              vendor: {
                name: 'Organic Grocers',
                phone: '+1345678901',
              },
              items: 5,
              total: 42.75,
              distance: 3.8,
              estimatedTime: '25-30 min',
              earnings: 12.25,
            },
          ];
          
          set({
            availableOrders: mockAvailableOrders,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch available orders',
          });
        }
      },
      
      fetchActiveOrders: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock active orders data
          const mockActiveOrders: DeliveryOrder[] = [
            {
              id: 'delivery-3',
              status: 'accepted',
              pickupLocation: {
                address: '555 Howard St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7873,
                  longitude: -122.3964,
                },
              },
              deliveryLocation: {
                address: '888 Brannan St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7751,
                  longitude: -122.4044,
                },
              },
              customer: {
                name: 'Robert Johnson',
                phone: '+1765432109',
              },
              vendor: {
                name: 'City Supermarket',
                phone: '+1456789012',
              },
              items: 2,
              total: 18.50,
              distance: 1.8,
              estimatedTime: '10-15 min',
              earnings: 7.25,
            },
          ];
          
          set({
            activeOrders: mockActiveOrders,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch active orders',
          });
        }
      },
      
      fetchOrderHistory: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock order history data
          const mockOrderHistory: DeliveryOrder[] = [
            {
              id: 'delivery-4',
              status: 'delivered',
              pickupLocation: {
                address: '123 Market St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7749,
                  longitude: -122.4194,
                },
              },
              deliveryLocation: {
                address: '456 Mission St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7875,
                  longitude: -122.4008,
                },
              },
              customer: {
                name: 'Alice Brown',
                phone: '+1654321098',
              },
              vendor: {
                name: 'Fresh Farms Market',
                phone: '+1234567890',
              },
              items: 4,
              total: 32.75,
              distance: 2.5,
              estimatedTime: '15-20 min',
              earnings: 9.50,
            },
            {
              id: 'delivery-5',
              status: 'delivered',
              pickupLocation: {
                address: '789 Valencia St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7596,
                  longitude: -122.4214,
                },
              },
              deliveryLocation: {
                address: '101 California St, San Francisco, CA',
                coordinates: {
                  latitude: 37.7932,
                  longitude: -122.3971,
                },
              },
              customer: {
                name: 'David Wilson',
                phone: '+1543210987',
              },
              vendor: {
                name: 'Organic Grocers',
                phone: '+1345678901',
              },
              items: 2,
              total: 21.50,
              distance: 3.8,
              estimatedTime: '25-30 min',
              earnings: 11.75,
            },
          ];
          
          set({
            orderHistory: mockOrderHistory,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch order history',
          });
        }
      },
      
      fetchEarnings: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock earnings data
          const mockEarningHistory: RiderEarning[] = [
            {
              id: 'earning-1',
              period: 'Apr 1 - Apr 7, 2025',
              amount: 325.75,
              deliveries: 28,
              isPaid: true,
              paymentDate: new Date('2025-04-10'),
            },
            {
              id: 'earning-2',
              period: 'Apr 8 - Apr 14, 2025',
              amount: 412.50,
              deliveries: 35,
              isPaid: false,
            },
          ];
          
          const mockEarnings = {
            total: 738.25,
            today: 85.50,
            weekly: 412.50,
            monthly: 738.25,
            pending: 412.50,
            history: mockEarningHistory,
          };
          
          set({
            earnings: mockEarnings,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch earnings',
          });
        }
      },
      
      acceptOrder: async (orderId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Find the order to accept
          const { availableOrders } = get();
          const orderToAccept = availableOrders.find(order => order.id === orderId);
          
          if (!orderToAccept) {
            throw new Error('Order not found');
          }
          
          // Update order status to accepted
          const acceptedOrder = {
            ...orderToAccept,
            status: 'accepted',
          };
          
          // Move order from available to active
          set(state => ({
            availableOrders: state.availableOrders.filter(order => order.id !== orderId),
            activeOrders: [...state.activeOrders, acceptedOrder],
            isLoading: false,
          }));
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to accept order',
          });
          return false;
        }
      },
      
      updateOrderStatus: async (orderId: string, status: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Find the active order
          const { activeOrders, orderHistory } = get();
          const orderToUpdate = activeOrders.find(order => order.id === orderId);
          
          if (!orderToUpdate) {
            throw new Error('Order not found');
          }
          
          // Update order status
          const updatedOrder = {
            ...orderToUpdate,
            status: status as any, // Type assertion needed due to string input
          };
          
          // If order is delivered or cancelled, move to history
          if (status === 'delivered' || status === 'cancelled') {
            set(state => ({
              activeOrders: state.activeOrders.filter(order => order.id !== orderId),
              orderHistory: [updatedOrder, ...state.orderHistory],
              isLoading: false,
            }));
          } else {
            // Otherwise, update in active orders
            set(state => ({
              activeOrders: state.activeOrders.map(order => 
                order.id === orderId ? updatedOrder : order
              ),
              isLoading: false,
            }));
          }
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to update order status',
          });
          return false;
        }
      },
      
      toggleOnlineStatus: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Toggle online status
          set(state => ({
            isOnline: !state.isOnline,
            isLoading: false,
          }));
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to toggle online status',
          });
          return false;
        }
      },
      
      fetchDashboardStats: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock dashboard stats
          const mockStats = {
            totalDeliveries: 156,
            totalEarnings: 1875.50,
            rating: 4.8,
            completionRate: 98.5,
            averageDeliveryTime: 22, // minutes
            deliveriesByDay: [
              { day: 'Mon', count: 5 },
              { day: 'Tue', count: 7 },
              { day: 'Wed', count: 4 },
              { day: 'Thu', count: 6 },
              { day: 'Fri', count: 8 },
              { day: 'Sat', count: 9 },
              { day: 'Sun', count: 3 },
            ],
          };
          
          set({
            stats: mockStats,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch dashboard stats',
          });
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
      name: 'rider-storage',
      getStorage: () => AsyncStorage,
      partialize: (state) => ({
        // Only persist these fields
        profile: state.profile,
        isOnline: state.isOnline,
      }),
    }
  )
);

export default useRiderStore;
