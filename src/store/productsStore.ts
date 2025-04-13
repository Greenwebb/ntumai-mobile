import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, Category, ProductsState } from '../types';

// Define action types for better type safety
type ProductsActions = {
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductsByCategory: (categoryId: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  getProductById: (productId: string) => Product | undefined;
  setFeaturedProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

// Create the store with TypeScript typing
const useProductsStore = create<ProductsState & ProductsActions>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      categories: [],
      featuredProducts: [],
      isLoading: false,
      error: null,
      
      // Actions
      fetchProducts: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock products data
          const mockProducts: Product[] = [
            {
              id: '1',
              name: 'Fresh Tomatoes',
              description: 'Locally grown fresh tomatoes',
              price: 2.99,
              discountPrice: 2.49,
              images: ['https://example.com/tomatoes.jpg'],
              category: {
                id: '1',
                name: 'Vegetables',
              },
              rating: 4.5,
              reviewCount: 120,
              inStock: true,
              vendorId: '1',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: '2',
              name: 'Organic Bananas',
              description: 'Organic bananas from local farms',
              price: 1.99,
              images: ['https://example.com/bananas.jpg'],
              category: {
                id: '2',
                name: 'Fruits',
              },
              rating: 4.2,
              reviewCount: 85,
              inStock: true,
              vendorId: '1',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: '3',
              name: 'Fresh Milk',
              description: 'Farm fresh milk',
              price: 3.49,
              images: ['https://example.com/milk.jpg'],
              category: {
                id: '3',
                name: 'Dairy',
              },
              rating: 4.8,
              reviewCount: 200,
              inStock: true,
              vendorId: '2',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: '4',
              name: 'Whole Wheat Bread',
              description: 'Freshly baked whole wheat bread',
              price: 2.99,
              images: ['https://example.com/bread.jpg'],
              category: {
                id: '4',
                name: 'Bakery',
              },
              rating: 4.0,
              reviewCount: 150,
              inStock: true,
              vendorId: '3',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: '5',
              name: 'Chicken Breast',
              description: 'Fresh boneless chicken breast',
              price: 5.99,
              images: ['https://example.com/chicken.jpg'],
              category: {
                id: '5',
                name: 'Meat',
              },
              rating: 4.3,
              reviewCount: 110,
              inStock: true,
              vendorId: '2',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];
          
          set({
            products: mockProducts,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch products',
          });
        }
      },
      
      fetchCategories: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock categories data
          const mockCategories: Category[] = [
            { id: '1', name: 'Vegetables', image: 'https://example.com/vegetables.jpg' },
            { id: '2', name: 'Fruits', image: 'https://example.com/fruits.jpg' },
            { id: '3', name: 'Dairy', image: 'https://example.com/dairy.jpg' },
            { id: '4', name: 'Bakery', image: 'https://example.com/bakery.jpg' },
            { id: '5', name: 'Meat', image: 'https://example.com/meat.jpg' },
            { id: '6', name: 'Seafood', image: 'https://example.com/seafood.jpg' },
            { id: '7', name: 'Beverages', image: 'https://example.com/beverages.jpg' },
            { id: '8', name: 'Snacks', image: 'https://example.com/snacks.jpg' },
          ];
          
          set({
            categories: mockCategories,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch categories',
          });
        }
      },
      
      fetchProductsByCategory: async (categoryId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Filter products by category (in a real app, this would be a server request)
          const { products } = get();
          const filteredProducts = products.filter(
            product => product.category.id === categoryId
          );
          
          set({
            products: filteredProducts,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch products by category',
          });
        }
      },
      
      searchProducts: async (query: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Search products (in a real app, this would be a server request)
          const { products } = get();
          const searchResults = products.filter(
            product => 
              product.name.toLowerCase().includes(query.toLowerCase()) ||
              product.description.toLowerCase().includes(query.toLowerCase())
          );
          
          set({
            products: searchResults,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to search products',
          });
        }
      },
      
      getProductById: (productId: string) => {
        const { products } = get();
        return products.find(product => product.id === productId);
      },
      
      setFeaturedProducts: (products: Product[]) => {
        set({ featuredProducts: products });
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      
      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'products-storage',
      getStorage: () => AsyncStorage,
      partialize: (state) => ({
        // Only persist these fields
        categories: state.categories,
        featuredProducts: state.featuredProducts,
      }),
    }
  )
);

export default useProductsStore;
