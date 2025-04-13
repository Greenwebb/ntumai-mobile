import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SellerProfile, SellerProduct, SellerOrder, SellerState } from '../types';

// Define action types for better type safety
type SellerActions = {
  fetchSellerProfile: () => Promise<void>;
  updateSellerProfile: (profile: Partial<SellerProfile>) => Promise<boolean>;
  fetchSellerProducts: () => Promise<void>;
  fetchSellerOrders: () => Promise<void>;
  addProduct: (product: Omit<SellerProduct, 'id' | 'createdAt' | 'updatedAt'>) => Promise<SellerProduct | undefined>;
  updateProduct: (productId: string, productData: Partial<SellerProduct>) => Promise<boolean>;
  deleteProduct: (productId: string) => Promise<boolean>;
  updateOrderStatus: (orderId: string, status: string) => Promise<boolean>;
  fetchDashboardStats: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

// Create the store with TypeScript typing
const useSellerStore = create<SellerState & SellerActions>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      products: [],
      orders: [],
      stats: {
        totalSales: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalProducts: 0,
        topSellingProducts: [],
        recentOrders: [],
        salesByDay: [],
      },
      isLoading: false,
      error: null,
      
      // Actions
      fetchSellerProfile: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock seller profile data
          const mockProfile: SellerProfile = {
            id: 'seller-1',
            name: 'Fresh Farms Market',
            description: 'We provide fresh produce directly from local farms',
            email: 'contact@freshfarms.com',
            phoneNumber: '+1234567890',
            logo: 'https://example.com/freshfarms-logo.jpg',
            coverImage: 'https://example.com/freshfarms-cover.jpg',
            address: {
              addressLine1: '789 Farm Road',
              city: 'Farmville',
              state: 'CA',
              postalCode: '95001',
              country: 'USA',
            },
            businessHours: {
              monday: { open: '08:00', close: '18:00' },
              tuesday: { open: '08:00', close: '18:00' },
              wednesday: { open: '08:00', close: '18:00' },
              thursday: { open: '08:00', close: '18:00' },
              friday: { open: '08:00', close: '18:00' },
              saturday: { open: '09:00', close: '16:00' },
              sunday: { open: 'closed', close: 'closed' },
            },
            rating: 4.7,
            reviewCount: 120,
            joinedDate: new Date('2024-01-15'),
            bankInfo: {
              accountName: 'Fresh Farms LLC',
              accountNumber: '****5678',
              bankName: 'Farm Credit Union',
            },
            verified: true,
          };
          
          set({
            profile: mockProfile,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch seller profile',
          });
        }
      },
      
      updateSellerProfile: async (profileData: Partial<SellerProfile>) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Update seller profile (in a real app, this would be a server request)
          set(state => ({
            profile: state.profile ? { ...state.profile, ...profileData } : null,
            isLoading: false,
          }));
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to update seller profile',
          });
          return false;
        }
      },
      
      fetchSellerProducts: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock seller products data
          const mockProducts: SellerProduct[] = [
            {
              id: 'product-1',
              name: 'Fresh Tomatoes',
              description: 'Locally grown fresh tomatoes',
              price: 2.99,
              discountPrice: 2.49,
              images: ['https://example.com/tomatoes.jpg'],
              category: {
                id: '1',
                name: 'Vegetables',
              },
              inStock: true,
              quantity: 50,
              sku: 'TOM001',
              variants: [],
              attributes: [
                { name: 'Weight', value: '1 lb' },
                { name: 'Organic', value: 'Yes' },
              ],
              createdAt: new Date('2025-01-10'),
              updatedAt: new Date('2025-03-15'),
              salesCount: 120,
            },
            {
              id: 'product-2',
              name: 'Organic Bananas',
              description: 'Organic bananas from local farms',
              price: 1.99,
              images: ['https://example.com/bananas.jpg'],
              category: {
                id: '2',
                name: 'Fruits',
              },
              inStock: true,
              quantity: 75,
              sku: 'BAN001',
              variants: [],
              attributes: [
                { name: 'Weight', value: '2 lb' },
                { name: 'Organic', value: 'Yes' },
              ],
              createdAt: new Date('2025-01-15'),
              updatedAt: new Date('2025-03-20'),
              salesCount: 85,
            },
            {
              id: 'product-3',
              name: 'Fresh Milk',
              description: 'Farm fresh milk',
              price: 3.49,
              images: ['https://example.com/milk.jpg'],
              category: {
                id: '3',
                name: 'Dairy',
              },
              inStock: true,
              quantity: 30,
              sku: 'MLK001',
              variants: [
                {
                  id: 'milk-var-1',
                  name: 'Whole Milk',
                  price: 3.49,
                  inStock: true,
                },
                {
                  id: 'milk-var-2',
                  name: 'Low Fat',
                  price: 3.29,
                  inStock: true,
                },
              ],
              attributes: [
                { name: 'Volume', value: '1 gallon' },
                { name: 'Pasteurized', value: 'Yes' },
              ],
              createdAt: new Date('2025-02-01'),
              updatedAt: new Date('2025-03-25'),
              salesCount: 200,
            },
          ];
          
          set({
            products: mockProducts,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch seller products',
          });
        }
      },
      
      fetchSellerOrders: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock seller orders data
          const mockOrders: SellerOrder[] = [
            {
              id: 'order-1',
              orderNumber: 'ORD-12345',
              date: new Date('2025-04-10T10:30:00Z'),
              status: 'completed',
              customer: {
                id: 'customer-1',
                name: 'John Doe',
                phoneNumber: '+1987654321',
              },
              items: [
                {
                  id: 'item-1',
                  productId: 'product-1',
                  name: 'Fresh Tomatoes',
                  price: 2.49,
                  quantity: 2,
                  subtotal: 4.98,
                },
              ],
              subtotal: 4.98,
              tax: 0.25,
              deliveryFee: 5.00,
              total: 10.23,
              paymentMethod: 'card',
              deliveryAddress: {
                addressLine1: '123 Main St',
                addressLine2: 'Apt 4B',
                city: 'New York',
                state: 'NY',
                postalCode: '10001',
                country: 'USA',
              },
            },
            {
              id: 'order-2',
              orderNumber: 'ORD-12346',
              date: new Date('2025-04-11T14:45:00Z'),
              status: 'processing',
              customer: {
                id: 'customer-2',
                name: 'Jane Smith',
                phoneNumber: '+1876543210',
              },
              items: [
                {
                  id: 'item-2',
                  productId: 'product-2',
                  name: 'Organic Bananas',
                  price: 1.99,
                  quantity: 3,
                  subtotal: 5.97,
                },
                {
                  id: 'item-3',
                  productId: 'product-3',
                  name: 'Fresh Milk',
                  price: 3.49,
                  quantity: 1,
                  subtotal: 3.49,
                },
              ],
              subtotal: 9.46,
              tax: 0.47,
              deliveryFee: 5.00,
              total: 14.93,
              paymentMethod: 'cash',
              deliveryAddress: {
                addressLine1: '456 Park Ave',
                city: 'New York',
                state: 'NY',
                postalCode: '10022',
                country: 'USA',
              },
            },
            {
              id: 'order-3',
              orderNumber: 'ORD-12347',
              date: new Date('2025-04-12T09:15:00Z'),
              status: 'pending',
              customer: {
                id: 'customer-3',
                name: 'Robert Johnson',
                phoneNumber: '+1765432109',
              },
              items: [
                {
                  id: 'item-4',
                  productId: 'product-3',
                  name: 'Fresh Milk',
                  price: 3.49,
                  quantity: 2,
                  subtotal: 6.98,
                },
              ],
              subtotal: 6.98,
              tax: 0.35,
              deliveryFee: 5.00,
              total: 12.33,
              paymentMethod: 'card',
              deliveryAddress: {
                addressLine1: '789 Broadway',
                city: 'New York',
                state: 'NY',
                postalCode: '10003',
                country: 'USA',
              },
            },
          ];
          
          set({
            orders: mockOrders,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch seller orders',
          });
        }
      },
      
      addProduct: async (productData) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Create new product (in a real app, this would be a server request)
          const newProduct: SellerProduct = {
            ...productData,
            id: `product-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            salesCount: 0,
          };
          
          set(state => ({
            products: [...state.products, newProduct],
            isLoading: false,
          }));
          
          return newProduct;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to add product',
          });
          return undefined;
        }
      },
      
      updateProduct: async (productId: string, productData: Partial<SellerProduct>) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Update product (in a real app, this would be a server request)
          set(state => {
            const updatedProducts = state.products.map(product => {
              if (product.id === productId) {
                return {
                  ...product,
                  ...productData,
                  updatedAt: new Date(),
                };
              }
              return product;
            });
            
            return {
              products: updatedProducts,
              isLoading: false,
            };
          });
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to update product',
          });
          return false;
        }
      },
      
      deleteProduct: async (productId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Delete product (in a real app, this would be a server request)
          set(state => ({
            products: state.products.filter(product => product.id !== productId),
            isLoading: false,
          }));
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to delete product',
          });
          return false;
        }
      },
      
      updateOrderStatus: async (orderId: string, status: string) => {
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
                  status: status as any, // Type assertion needed due to string input
                };
              }
              return order;
            });
            
            return {
              orders: updatedOrders,
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
      
      fetchDashboardStats: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Get current products and orders
          const { products, orders } = get();
          
          // Calculate stats
          const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
          const totalOrders = orders.length;
          const pendingOrders = orders.filter(order => 
            order.status === 'pending' || order.status === 'processing'
          ).length;
          const totalProducts = products.length;
          
          // Get top selling products
          const topSellingProducts = [...products]
            .sort((a, b) => b.salesCount - a.salesCount)
            .slice(0, 5);
          
          // Get recent orders
          const recentOrders = [...orders]
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 5);
          
          // Generate sales by day (last 7 days)
          const salesByDay = [];
          const today = new Date();
          
          for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            
            // Format date as YYYY-MM-DD
            const dateString = date.toISOString().split('T')[0];
            
            // Calculate sales for this day
            const dailySales = orders
              .filter(order => {
                const orderDate = order.date.toISOString().split('T')[0];
                return orderDate === dateString;
              })
              .reduce((sum, order) => sum + order.total, 0);
            
            salesByDay.push({
              date: dateString,
              sales: dailySales,
            });
          }
          
          set({
            stats: {
              totalSales,
              totalOrders,
              pendingOrders,
              totalProducts,
              topSellingProducts,
              recentOrders,
              salesByDay,
            },
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
      name: 'seller-storage',
      getStorage: () => AsyncStorage,
      partialize: (state) => ({
        // Only persist these fields
        profile: state.profile,
      }),
    }
  )
);

export default useSellerStore;
