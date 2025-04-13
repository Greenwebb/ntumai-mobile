import { renderHook, act } from '@testing-library/react-hooks';
import useSellerStore from '../src/store/sellerStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('Seller Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useSellerStore());
    act(() => {
      result.current.setLoading(false);
      result.current.setError(null);
    });
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useSellerStore());
    
    expect(result.current.profile).toBeNull();
    expect(result.current.products).toEqual([]);
    expect(result.current.orders).toEqual([]);
    expect(result.current.stats).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('fetchSellerProfile updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSellerStore());
    
    act(() => {
      result.current.fetchSellerProfile();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.profile).not.toBeNull();
    expect(result.current.profile?.name).toBe('Fresh Farms Market');
    expect(result.current.error).toBeNull();
  });

  test('updateSellerProfile updates profile correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSellerStore());
    
    // First fetch profile
    act(() => {
      result.current.fetchSellerProfile();
    });
    
    await waitForNextUpdate();
    
    // Update profile
    const profileUpdate = {
      name: 'Updated Farm Market',
      description: 'Updated description',
    };
    
    let success;
    act(() => {
      success = result.current.updateSellerProfile(profileUpdate);
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    expect(result.current.profile?.name).toBe('Updated Farm Market');
    expect(result.current.profile?.description).toBe('Updated description');
  });

  test('fetchSellerProducts updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSellerStore());
    
    act(() => {
      result.current.fetchSellerProducts();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.products.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  test('fetchSellerOrders updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSellerStore());
    
    act(() => {
      result.current.fetchSellerOrders();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.orders.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  test('addProduct adds new product correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSellerStore());
    
    const newProductData = {
      name: 'New Test Product',
      description: 'Test product description',
      price: 12.99,
      images: ['test-product.jpg'],
      category: {
        id: '1',
        name: 'Test Category',
      },
      inStock: true,
      quantity: 50,
      sku: 'TEST001',
      variants: [],
      attributes: [
        { name: 'Weight', value: '1 kg' },
      ],
    };
    
    let createdProduct;
    act(() => {
      createdProduct = result.current.addProduct(newProductData);
    });
    
    await waitForNextUpdate();
    
    expect(result.current.isLoading).toBe(false);
    expect(createdProduct).toBeDefined();
    expect(createdProduct?.name).toBe('New Test Product');
    expect(createdProduct?.price).toBe(12.99);
    
    // Check that the product was added to the products array
    const productExists = result.current.products.some(product => product.id === createdProduct?.id);
    expect(productExists).toBe(true);
  });

  test('updateProduct updates product correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSellerStore());
    
    // First fetch products
    act(() => {
      result.current.fetchSellerProducts();
    });
    
    await waitForNextUpdate();
    
    // Get a product ID from the fetched products
    const productId = result.current.products[0].id;
    
    // Update product
    const productUpdate = {
      name: 'Updated Product Name',
      price: 14.99,
    };
    
    let success;
    act(() => {
      success = result.current.updateProduct(productId, productUpdate);
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    
    // Find the updated product
    const updatedProduct = result.current.products.find(product => product.id === productId);
    expect(updatedProduct).toBeDefined();
    expect(updatedProduct?.name).toBe('Updated Product Name');
    expect(updatedProduct?.price).toBe(14.99);
  });

  test('deleteProduct removes product correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSellerStore());
    
    // First fetch products
    act(() => {
      result.current.fetchSellerProducts();
    });
    
    await waitForNextUpdate();
    
    // Get a product ID from the fetched products
    const productId = result.current.products[0].id;
    const initialProductCount = result.current.products.length;
    
    // Delete product
    let success;
    act(() => {
      success = result.current.deleteProduct(productId);
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    expect(result.current.products.length).toBe(initialProductCount - 1);
    
    // Check that the product was removed
    const productExists = result.current.products.some(product => product.id === productId);
    expect(productExists).toBe(false);
  });

  test('updateOrderStatus updates order status correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSellerStore());
    
    // First fetch orders
    act(() => {
      result.current.fetchSellerOrders();
    });
    
    await waitForNextUpdate();
    
    // Get an order ID from the fetched orders
    const orderId = result.current.orders[0].id;
    const initialStatus = result.current.orders[0].status;
    
    // Update order status
    let success;
    act(() => {
      success = result.current.updateOrderStatus(orderId, 'completed');
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    
    // Find the updated order
    const updatedOrder = result.current.orders.find(order => order.id === orderId);
    expect(updatedOrder).toBeDefined();
    expect(updatedOrder?.status).toBe('completed');
    expect(updatedOrder?.status).not.toBe(initialStatus);
  });

  test('fetchDashboardStats updates stats correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSellerStore());
    
    // First fetch products and orders to have data for stats
    act(() => {
      result.current.fetchSellerProducts();
    });
    
    await waitForNextUpdate();
    
    act(() => {
      result.current.fetchSellerOrders();
    });
    
    await waitForNextUpdate();
    
    // Fetch dashboard stats
    act(() => {
      result.current.fetchDashboardStats();
    });
    
    await waitForNextUpdate();
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.stats).toBeDefined();
    expect(result.current.stats.totalSales).toBeGreaterThan(0);
    expect(result.current.stats.totalOrders).toBeGreaterThan(0);
    expect(result.current.stats.totalProducts).toBeGreaterThan(0);
    expect(result.current.stats.topSellingProducts.length).toBeGreaterThan(0);
    expect(result.current.stats.salesByDay.length).toBe(7); // 7 days
  });

  test('setLoading updates loading state', () => {
    const { result } = renderHook(() => useSellerStore());
    
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
    const { result } = renderHook(() => useSellerStore());
    
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
