import { renderHook, act } from '@testing-library/react-hooks';
import useCartStore from '../src/store/cartStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('Cart Store', () => {
  beforeEach(() => {
    // Clear the store before each test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useCartStore());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.tax).toBe(0);
    expect(result.current.deliveryFee).toBe(0);
    expect(result.current.discount).toBe(0);
    expect(result.current.total).toBe(0);
    expect(result.current.promoCode).toBeNull();
  });

  test('addToCart adds new item correctly', () => {
    const { result } = renderHook(() => useCartStore());
    
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 10.99,
      description: 'Test description',
      images: ['test.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    act(() => {
      result.current.addToCart(mockProduct, 2);
    });
    
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].product).toEqual(mockProduct);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.items[0].subtotal).toBe(21.98);
    expect(result.current.subtotal).toBe(21.98);
    expect(result.current.tax).toBe(21.98 * 0.05);
    expect(result.current.deliveryFee).toBe(5);
    expect(result.current.total).toBe(21.98 + (21.98 * 0.05) + 5);
  });

  test('addToCart updates existing item quantity', () => {
    const { result } = renderHook(() => useCartStore());
    
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 10.99,
      description: 'Test description',
      images: ['test.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add item first time
    act(() => {
      result.current.addToCart(mockProduct, 2);
    });
    
    // Add same item second time
    act(() => {
      result.current.addToCart(mockProduct, 3);
    });
    
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.items[0].subtotal).toBe(54.95);
    expect(result.current.subtotal).toBe(54.95);
  });

  test('removeFromCart removes item correctly', () => {
    const { result } = renderHook(() => useCartStore());
    
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 10.99,
      description: 'Test description',
      images: ['test.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add item
    act(() => {
      result.current.addToCart(mockProduct, 2);
    });
    
    const itemId = result.current.items[0].id;
    
    // Remove item
    act(() => {
      result.current.removeFromCart(itemId);
    });
    
    expect(result.current.items.length).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.tax).toBe(0);
    expect(result.current.deliveryFee).toBe(0);
    expect(result.current.total).toBe(0);
  });

  test('updateQuantity updates item quantity correctly', () => {
    const { result } = renderHook(() => useCartStore());
    
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 10.99,
      description: 'Test description',
      images: ['test.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add item
    act(() => {
      result.current.addToCart(mockProduct, 2);
    });
    
    const itemId = result.current.items[0].id;
    
    // Update quantity
    act(() => {
      result.current.updateQuantity(itemId, 4);
    });
    
    expect(result.current.items[0].quantity).toBe(4);
    expect(result.current.items[0].subtotal).toBe(43.96);
    expect(result.current.subtotal).toBe(43.96);
  });

  test('updateQuantity removes item when quantity is 0', () => {
    const { result } = renderHook(() => useCartStore());
    
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 10.99,
      description: 'Test description',
      images: ['test.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add item
    act(() => {
      result.current.addToCart(mockProduct, 2);
    });
    
    const itemId = result.current.items[0].id;
    
    // Update quantity to 0
    act(() => {
      result.current.updateQuantity(itemId, 0);
    });
    
    expect(result.current.items.length).toBe(0);
  });

  test('clearCart removes all items', () => {
    const { result } = renderHook(() => useCartStore());
    
    const mockProduct1 = {
      id: '1',
      name: 'Test Product 1',
      price: 10.99,
      description: 'Test description',
      images: ['test1.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const mockProduct2 = {
      id: '2',
      name: 'Test Product 2',
      price: 15.99,
      description: 'Test description 2',
      images: ['test2.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.0,
      reviewCount: 8,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add items
    act(() => {
      result.current.addToCart(mockProduct1, 2);
      result.current.addToCart(mockProduct2, 1);
    });
    
    expect(result.current.items.length).toBe(2);
    
    // Clear cart
    act(() => {
      result.current.clearCart();
    });
    
    expect(result.current.items.length).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.tax).toBe(0);
    expect(result.current.deliveryFee).toBe(0);
    expect(result.current.discount).toBe(0);
    expect(result.current.total).toBe(0);
    expect(result.current.promoCode).toBeNull();
  });

  test('applyPromoCode applies valid promo code correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCartStore());
    
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 10.99,
      description: 'Test description',
      images: ['test.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add item
    act(() => {
      result.current.addToCart(mockProduct, 2);
    });
    
    const initialTotal = result.current.total;
    
    // Apply promo code
    let success;
    await act(async () => {
      success = await result.current.applyPromoCode('WELCOME10');
    });
    
    expect(success).toBe(true);
    expect(result.current.promoCode).toBe('WELCOME10');
    expect(result.current.discount).toBe(10);
    expect(result.current.total).toBe(initialTotal - 10);
  });

  test('applyPromoCode rejects invalid promo code', async () => {
    const { result } = renderHook(() => useCartStore());
    
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 10.99,
      description: 'Test description',
      images: ['test.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add item
    act(() => {
      result.current.addToCart(mockProduct, 2);
    });
    
    const initialTotal = result.current.total;
    
    // Apply invalid promo code
    let success;
    await act(async () => {
      success = await result.current.applyPromoCode('INVALID');
    });
    
    expect(success).toBe(false);
    expect(result.current.promoCode).toBeNull();
    expect(result.current.discount).toBe(0);
    expect(result.current.total).toBe(initialTotal);
  });

  test('removePromoCode removes applied promo code', async () => {
    const { result } = renderHook(() => useCartStore());
    
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 10.99,
      description: 'Test description',
      images: ['test.jpg'],
      category: { id: '1', name: 'Test Category' },
      rating: 4.5,
      reviewCount: 10,
      inStock: true,
      vendorId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add item
    act(() => {
      result.current.addToCart(mockProduct, 2);
    });
    
    // Apply promo code
    await act(async () => {
      await result.current.applyPromoCode('WELCOME10');
    });
    
    const discountedTotal = result.current.total;
    
    // Remove promo code
    act(() => {
      result.current.removePromoCode();
    });
    
    expect(result.current.promoCode).toBeNull();
    expect(result.current.discount).toBe(0);
    expect(result.current.total).toBeGreaterThan(discountedTotal);
  });
});
