import { create } from 'zustand';
import { User, Vendor, Product } from '../types';

interface VendorState {
  profile: Vendor | null;
  products: Product[];
  sales: any[]; // Sales data
  isLoading: boolean;
  error: string | null;
  
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Vendor>) => Promise<void>;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  fetchSales: (period?: 'day' | 'week' | 'month' | 'year') => Promise<void>;
}

// Mock data
const mockVendor: Vendor = {
  id: '1',
  name: 'Local Farm',
  description: 'We grow fresh, organic produce locally.',
  logo: 'https://example.com/local-farm-logo.jpg',
  rating: 4.7,
  products: []
};

const mockProducts: Product[] = [
  {
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
  {
    id: '2',
    name: 'Organic Spinach',
    description: 'Organic spinach leaves',
    price: 3.49,
    image: 'https://example.com/spinach.jpg',
    category: 'Vegetables',
    vendor: 'Local Farm',
    rating: 4.3,
    reviews: 85,
    inStock: true
  },
  {
    id: '3',
    name: 'Fresh Carrots',
    description: 'Locally grown carrots',
    price: 1.99,
    image: 'https://example.com/carrots.jpg',
    category: 'Vegetables',
    vendor: 'Local Farm',
    rating: 4.6,
    reviews: 92,
    inStock: true
  }
];

const mockSales = [
  { date: '2023-04-01', amount: 120.45, orders: 5 },
  { date: '2023-04-02', amount: 95.20, orders: 4 },
  { date: '2023-04-03', amount: 150.75, orders: 6 },
  { date: '2023-04-04', amount: 85.30, orders: 3 },
  { date: '2023-04-05', amount: 110.60, orders: 5 }
];

export const useVendorStore = create<VendorState>((set) => ({
  profile: null,
  products: [],
  sales: [],
  isLoading: false,
  error: null,
  
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ profile: mockVendor, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch vendor profile', isLoading: false });
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
      set({ error: 'Failed to update vendor profile', isLoading: false });
    }
  },
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ products: mockProducts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch vendor products', isLoading: false });
    }
  },
  
  addProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProduct: Product = {
        id: Date.now().toString(),
        ...productData,
        rating: 0,
        reviews: 0
      };
      
      set(state => ({ 
        products: [...state.products, newProduct],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to add product', isLoading: false });
    }
  },
  
  updateProduct: async (updatedProduct) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => {
        const updatedProducts = state.products.map(product => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        });
        
        return { products: updatedProducts, isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to update product', isLoading: false });
    }
  },
  
  removeProduct: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        products: state.products.filter(product => product.id !== productId),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to remove product', isLoading: false });
    }
  },
  
  fetchSales: async (period = 'week') => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ sales: mockSales, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch sales data', isLoading: false });
    }
  }
}));
