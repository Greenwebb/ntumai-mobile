import { renderHook, act } from '@testing-library/react-hooks';
import useProductsStore from '../src/store/productsStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('Products Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useProductsStore());
    act(() => {
      result.current.setLoading(false);
      result.current.setError(null);
    });
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useProductsStore());
    
    expect(result.current.products).toEqual([]);
    expect(result.current.categories).toEqual([]);
    expect(result.current.featuredProducts).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('fetchProducts updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProductsStore());
    
    act(() => {
      result.current.fetchProducts();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.products.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  test('fetchCategories updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProductsStore());
    
    act(() => {
      result.current.fetchCategories();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.categories.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  test('fetchProductsByCategory filters products correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProductsStore());
    
    // First fetch all products
    act(() => {
      result.current.fetchProducts();
    });
    
    await waitForNextUpdate();
    
    // Then fetch by category
    act(() => {
      result.current.fetchProductsByCategory('1');
    });
    
    await waitForNextUpdate();
    
    // Check that products are filtered
    expect(result.current.products.length).toBeGreaterThan(0);
    result.current.products.forEach(product => {
      expect(product.category.id).toBe('1');
    });
  });

  test('searchProducts filters products correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProductsStore());
    
    // First fetch all products
    act(() => {
      result.current.fetchProducts();
    });
    
    await waitForNextUpdate();
    
    // Then search for products
    act(() => {
      result.current.searchProducts('tomato');
    });
    
    await waitForNextUpdate();
    
    // Check that products are filtered
    expect(result.current.products.length).toBeGreaterThan(0);
    result.current.products.forEach(product => {
      const matchesName = product.name.toLowerCase().includes('tomato');
      const matchesDescription = product.description.toLowerCase().includes('tomato');
      expect(matchesName || matchesDescription).toBe(true);
    });
  });

  test('getProductById returns correct product', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProductsStore());
    
    // First fetch all products
    act(() => {
      result.current.fetchProducts();
    });
    
    await waitForNextUpdate();
    
    // Get a product ID from the fetched products
    const productId = result.current.products[0].id;
    
    // Get product by ID
    const product = result.current.getProductById(productId);
    
    expect(product).toBeDefined();
    expect(product?.id).toBe(productId);
  });

  test('setFeaturedProducts updates featured products', () => {
    const { result } = renderHook(() => useProductsStore());
    
    const featuredProducts = [
      {
        id: '1',
        name: 'Featured Product 1',
        price: 10.99,
        description: 'Featured description 1',
        images: ['featured1.jpg'],
        category: { id: '1', name: 'Test Category' },
        rating: 4.8,
        reviewCount: 150,
        inStock: true,
        vendorId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Featured Product 2',
        price: 15.99,
        description: 'Featured description 2',
        images: ['featured2.jpg'],
        category: { id: '2', name: 'Test Category 2' },
        rating: 4.5,
        reviewCount: 120,
        inStock: true,
        vendorId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    act(() => {
      result.current.setFeaturedProducts(featuredProducts);
    });
    
    expect(result.current.featuredProducts).toEqual(featuredProducts);
  });

  test('setLoading updates loading state', () => {
    const { result } = renderHook(() => useProductsStore());
    
    act(() => {
      result.current.setLoading(true);
    });
    
    expect(result.current.isLoading).toBe(true);
    
    act(() => {
      result.current.setLoading(false);
    });
    
    expect(result.current.isLoading).toBe(false);
  });

  test('setError updates error state', () => {
    const { result } = renderHook(() => useProductsStore());
    
    act(() => {
      result.current.setError('Test error message');
    });
    
    expect(result.current.error).toBe('Test error message');
    
    act(() => {
      result.current.setError(null);
    });
    
    expect(result.current.error).toBeNull();
  });
});
