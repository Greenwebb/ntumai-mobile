import { create } from 'zustand';
import { Product, Category } from '../types';

interface ProductsState {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductsByCategory: (categoryId: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
}

// Mock data
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
  {
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
  {
    id: '4',
    name: 'Free Range Eggs',
    description: 'Farm fresh free range eggs',
    price: 4.99,
    image: 'https://example.com/eggs.jpg',
    category: 'Dairy',
    vendor: 'Happy Hens Farm',
    rating: 4.7,
    reviews: 65,
    inStock: true
  },
  {
    id: '5',
    name: 'Chicken Breast',
    description: 'Boneless skinless chicken breast',
    price: 7.99,
    image: 'https://example.com/chicken.jpg',
    category: 'Meat',
    vendor: 'Premium Meats',
    rating: 4.4,
    reviews: 42,
    inStock: true
  }
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Vegetables',
    image: 'https://example.com/vegetables.jpg'
  },
  {
    id: '2',
    name: 'Fruits',
    image: 'https://example.com/fruits.jpg'
  },
  {
    id: '3',
    name: 'Bakery',
    image: 'https://example.com/bakery.jpg'
  },
  {
    id: '4',
    name: 'Dairy',
    image: 'https://example.com/dairy.jpg'
  },
  {
    id: '5',
    name: 'Meat',
    image: 'https://example.com/meat.jpg'
  }
];

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  categories: [],
  isLoading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ products: mockProducts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', isLoading: false });
    }
  },
  
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ categories: mockCategories, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch categories', isLoading: false });
    }
  },
  
  fetchProductsByCategory: async (categoryId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const categoryName = mockCategories.find(c => c.id === categoryId)?.name || '';
      const filteredProducts = mockProducts.filter(p => p.category === categoryName);
      
      set({ products: filteredProducts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products by category', isLoading: false });
    }
  },
  
  searchProducts: async (query) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const searchResults = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      
      set({ products: searchResults, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to search products', isLoading: false });
    }
  }
}));
