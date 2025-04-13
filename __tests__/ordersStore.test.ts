import { renderHook, act } from '@testing-library/react-hooks';
import useOrdersStore from '../src/store/ordersStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('Orders Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useOrdersStore());
    act(() => {
      result.current.setLoading(false);
      result.current.setError(null);
    });
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useOrdersStore());
    
    expect(result.current.orders).toEqual([]);
    expect(result.current.currentOrder).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('fetchOrders updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOrdersStore());
    
    act(() => {
      result.current.fetchOrders();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.orders.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  test('fetchOrderById retrieves correct order', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOrdersStore());
    
    // First fetch all orders
    act(() => {
      result.current.fetchOrders();
    });
    
    await waitForNextUpdate();
    
    // Get an order ID from the fetched orders
    const orderId = result.current.orders[0].id;
    
    // Fetch order by ID
    let fetchedOrder;
    act(() => {
      fetchedOrder = result.current.fetchOrderById(orderId);
    });
    
    await waitForNextUpdate();
    
    expect(result.current.currentOrder).toBeDefined();
    expect(result.current.currentOrder?.id).toBe(orderId);
    expect(fetchedOrder).toBeDefined();
    expect(fetchedOrder?.id).toBe(orderId);
  });

  test('createOrder adds new order correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOrdersStore());
    
    const newOrderData = {
      userId: '1',
      items: [
        {
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 10.99,
          quantity: 2,
          subtotal: 21.98,
        }
      ],
      status: 'pending' as const,
      subtotal: 21.98,
      tax: 1.10,
      deliveryFee: 5.00,
      discount: 0,
      total: 28.08,
      paymentMethod: 'card' as const,
      deliveryAddress: {
        id: '1',
        addressLine1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        postalCode: '12345',
        country: 'Test Country',
        label: 'Home',
        isDefault: true,
      }
    };
    
    let createdOrder;
    act(() => {
      createdOrder = result.current.createOrder(newOrderData);
    });
    
    await waitForNextUpdate();
    
    expect(result.current.isLoading).toBe(false);
    expect(createdOrder).toBeDefined();
    expect(createdOrder?.userId).toBe('1');
    expect(createdOrder?.items.length).toBe(1);
    expect(createdOrder?.status).toBe('pending');
    expect(result.current.currentOrder).toEqual(createdOrder);
    
    // Check that the order was added to the orders array
    const orderExists = result.current.orders.some(order => order.id === createdOrder?.id);
    expect(orderExists).toBe(true);
  });

  test('updateOrderStatus updates order status correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOrdersStore());
    
    // First fetch all orders
    act(() => {
      result.current.fetchOrders();
    });
    
    await waitForNextUpdate();
    
    // Get an order ID from the fetched orders
    const orderId = result.current.orders[0].id;
    const initialStatus = result.current.orders[0].status;
    
    // Update order status
    let success;
    act(() => {
      success = result.current.updateOrderStatus(orderId, 'processing');
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    
    // Find the updated order
    const updatedOrder = result.current.orders.find(order => order.id === orderId);
    expect(updatedOrder).toBeDefined();
    expect(updatedOrder?.status).toBe('processing');
    expect(updatedOrder?.status).not.toBe(initialStatus);
  });

  test('cancelOrder cancels an order correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOrdersStore());
    
    // First create a new pending order
    const newOrderData = {
      userId: '1',
      items: [
        {
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 10.99,
          quantity: 2,
          subtotal: 21.98,
        }
      ],
      status: 'pending' as const,
      subtotal: 21.98,
      tax: 1.10,
      deliveryFee: 5.00,
      discount: 0,
      total: 28.08,
      paymentMethod: 'card' as const,
      deliveryAddress: {
        id: '1',
        addressLine1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        postalCode: '12345',
        country: 'Test Country',
        label: 'Home',
        isDefault: true,
      }
    };
    
    let createdOrder;
    act(() => {
      createdOrder = result.current.createOrder(newOrderData);
    });
    
    await waitForNextUpdate();
    
    const orderId = createdOrder?.id;
    
    // Cancel the order
    let success;
    act(() => {
      success = result.current.cancelOrder(orderId!);
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    
    // Find the cancelled order
    const cancelledOrder = result.current.orders.find(order => order.id === orderId);
    expect(cancelledOrder).toBeDefined();
    expect(cancelledOrder?.status).toBe('cancelled');
  });

  test('setLoading updates loading state', () => {
    const { result } = renderHook(() => useOrdersStore());
    
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
    const { result } = renderHook(() => useOrdersStore());
    
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
