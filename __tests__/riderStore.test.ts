import { renderHook, act } from '@testing-library/react-hooks';
import useRiderStore from '../src/store/riderStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('Rider Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useRiderStore());
    act(() => {
      result.current.setLoading(false);
      result.current.setError(null);
    });
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useRiderStore());
    
    expect(result.current.profile).toBeNull();
    expect(result.current.isOnline).toBe(false);
    expect(result.current.availableOrders).toEqual([]);
    expect(result.current.activeOrders).toEqual([]);
    expect(result.current.orderHistory).toEqual([]);
    expect(result.current.earnings).toBeDefined();
    expect(result.current.stats).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('fetchRiderProfile updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    act(() => {
      result.current.fetchRiderProfile();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.profile).not.toBeNull();
    expect(result.current.profile?.name).toBe('Michael Johnson');
    expect(result.current.error).toBeNull();
  });

  test('updateRiderProfile updates profile correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    // First fetch profile
    act(() => {
      result.current.fetchRiderProfile();
    });
    
    await waitForNextUpdate();
    
    // Update profile
    const profileUpdate = {
      name: 'Updated Rider Name',
      phoneNumber: '9876543210',
    };
    
    let success;
    act(() => {
      success = result.current.updateRiderProfile(profileUpdate);
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    expect(result.current.profile?.name).toBe('Updated Rider Name');
    expect(result.current.profile?.phoneNumber).toBe('9876543210');
  });

  test('fetchAvailableOrders updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    act(() => {
      result.current.fetchAvailableOrders();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.availableOrders.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  test('fetchActiveOrders updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    act(() => {
      result.current.fetchActiveOrders();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.activeOrders.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  test('fetchOrderHistory updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    act(() => {
      result.current.fetchOrderHistory();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.orderHistory.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  test('fetchEarnings updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    act(() => {
      result.current.fetchEarnings();
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.earnings.total).toBeGreaterThan(0);
    expect(result.current.earnings.history.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  test('acceptOrder moves order from available to active', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    // First fetch available orders
    act(() => {
      result.current.fetchAvailableOrders();
    });
    
    await waitForNextUpdate();
    
    // Get an order ID from the available orders
    const orderId = result.current.availableOrders[0].id;
    const initialAvailableCount = result.current.availableOrders.length;
    const initialActiveCount = result.current.activeOrders.length;
    
    // Accept order
    let success;
    act(() => {
      success = result.current.acceptOrder(orderId);
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    expect(result.current.availableOrders.length).toBe(initialAvailableCount - 1);
    expect(result.current.activeOrders.length).toBe(initialActiveCount + 1);
    
    // Check that the order was moved to active orders
    const orderInActive = result.current.activeOrders.some(order => order.id === orderId);
    expect(orderInActive).toBe(true);
    
    // Check that the order is no longer in available orders
    const orderInAvailable = result.current.availableOrders.some(order => order.id === orderId);
    expect(orderInAvailable).toBe(false);
  });

  test('updateOrderStatus updates order status correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    // First fetch active orders
    act(() => {
      result.current.fetchActiveOrders();
    });
    
    await waitForNextUpdate();
    
    // Get an order ID from the active orders
    const orderId = result.current.activeOrders[0].id;
    const initialStatus = result.current.activeOrders[0].status;
    
    // Update order status to "in_progress"
    let success;
    act(() => {
      success = result.current.updateOrderStatus(orderId, 'in_progress');
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    
    // Find the updated order
    const updatedOrder = result.current.activeOrders.find(order => order.id === orderId);
    expect(updatedOrder).toBeDefined();
    expect(updatedOrder?.status).toBe('in_progress');
    expect(updatedOrder?.status).not.toBe(initialStatus);
    
    // Update order status to "delivered" (should move to history)
    const initialActiveCount = result.current.activeOrders.length;
    const initialHistoryCount = result.current.orderHistory.length;
    
    act(() => {
      success = result.current.updateOrderStatus(orderId, 'delivered');
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    expect(result.current.activeOrders.length).toBe(initialActiveCount - 1);
    expect(result.current.orderHistory.length).toBe(initialHistoryCount + 1);
    
    // Check that the order was moved to history
    const orderInHistory = result.current.orderHistory.some(order => order.id === orderId);
    expect(orderInHistory).toBe(true);
    
    // Check that the order is no longer in active orders
    const orderInActive = result.current.activeOrders.some(order => order.id === orderId);
    expect(orderInActive).toBe(false);
  });

  test('toggleOnlineStatus toggles online status', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    const initialStatus = result.current.isOnline;
    
    // Toggle online status
    let success;
    act(() => {
      success = result.current.toggleOnlineStatus();
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    expect(result.current.isOnline).toBe(!initialStatus);
    
    // Toggle again
    act(() => {
      success = result.current.toggleOnlineStatus();
    });
    
    await waitForNextUpdate();
    
    expect(success).toBe(true);
    expect(result.current.isOnline).toBe(initialStatus);
  });

  test('fetchDashboardStats updates stats correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRiderStore());
    
    act(() => {
      result.current.fetchDashboardStats();
    });
    
    await waitForNextUpdate();
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.stats).toBeDefined();
    expect(result.current.stats.totalDeliveries).toBeGreaterThan(0);
    expect(result.current.stats.totalEarnings).toBeGreaterThan(0);
    expect(result.current.stats.rating).toBeGreaterThan(0);
    expect(result.current.stats.deliveriesByDay.length).toBe(7); // 7 days
  });

  test('setLoading updates loading state', () => {
    const { result } = renderHook(() => useRiderStore());
    
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
    const { result } = renderHook(() => useRiderStore());
    
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
