import { renderHook, act } from '@testing-library/react-hooks';
import useAuthStore from '../src/store/authStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('Auth Store', () => {
  beforeEach(() => {
    // Clear the store before each test
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useAuthStore());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.token).toBeNull();
  });

  test('login updates state correctly on success', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.login('1234567890', 'password');
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after successful login
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.phoneNumber).toBe('1234567890');
    expect(result.current.token).not.toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('login updates state correctly on failure', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.login('wrong', 'credentials');
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after failed login
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.error).not.toBeNull();
  });

  test('signup updates state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.signup('John Doe', '9876543210', 'password');
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after signup
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.name).toBe('John Doe');
    expect(result.current.user?.phoneNumber).toBe('9876543210');
    expect(result.current.token).not.toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('verifyOtp updates state correctly on success', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.verifyOtp('1234567890', '123456');
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after successful OTP verification
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.phoneNumber).toBe('1234567890');
    expect(result.current.token).not.toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('verifyOtp updates state correctly on failure', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.verifyOtp('1234567890', 'wrong');
    });
    
    // Check loading state
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // Check final state after failed OTP verification
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.error).not.toBeNull();
  });

  test('setUserRole updates user role correctly', () => {
    const { result } = renderHook(() => useAuthStore());
    
    // First login to set a user
    act(() => {
      result.current.login('1234567890', 'password');
    });
    
    // Then set the user role
    act(() => {
      result.current.setUserRole('vendor');
    });
    
    expect(result.current.user?.role).toBe('vendor');
  });

  test('logout clears state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthStore());
    
    // First login
    act(() => {
      result.current.login('1234567890', 'password');
    });
    
    await waitForNextUpdate();
    
    // Then logout
    act(() => {
      result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.token).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('resetError clears error state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthStore());
    
    // First trigger an error
    act(() => {
      result.current.login('wrong', 'credentials');
    });
    
    await waitForNextUpdate();
    
    // Verify error exists
    expect(result.current.error).not.toBeNull();
    
    // Reset error
    act(() => {
      result.current.resetError();
    });
    
    expect(result.current.error).toBeNull();
  });
});
