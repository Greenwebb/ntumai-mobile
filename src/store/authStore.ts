<<<<<<< HEAD
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'customer' | 'vendor' | 'driver') => Promise<void>;
  logout: () => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const user: User = {
        id: '1',
        name: 'John Doe',
        email,
        phone: '+1234567890',
        role: 'customer',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      };
      
      const token = 'mock-jwt-token';
      
      // Store in AsyncStorage
      await AsyncStorage.setItem('auth_user', JSON.stringify(user));
      await AsyncStorage.setItem('auth_token', token);
      
      set({ user, token, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to login. Please check your credentials.', isLoading: false });
    }
  },
  
  signup: async (name, email, password, role) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const user: User = {
        id: '1',
        name,
        email,
        phone: '',
        role,
      };
      
      const token = 'mock-jwt-token';
      
      // Store in AsyncStorage
      await AsyncStorage.setItem('auth_user', JSON.stringify(user));
      await AsyncStorage.setItem('auth_token', token);
      
      set({ user, token, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to sign up. Please try again.', isLoading: false });
    }
  },
  
  logout: async () => {
    set({ isLoading: true });
    try {
      // Remove from AsyncStorage
      await AsyncStorage.removeItem('auth_user');
      await AsyncStorage.removeItem('auth_token');
      
      set({ user: null, token: null, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to logout.', isLoading: false });
    }
  },
  
  verifyOtp: async (email, otp) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful verification
      set({ isLoading: false });
      return Promise.resolve();
    } catch (error) {
      set({ error: 'Invalid OTP. Please try again.', isLoading: false });
      return Promise.reject(error);
    }
  },
  
  resetPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful password reset
      set({ isLoading: false });
      return Promise.resolve();
    } catch (error) {
      set({ error: 'Failed to reset password. Please try again.', isLoading: false });
      return Promise.reject(error);
    }
  }
}));
=======
import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole, AuthState } from '../types';

// Define action types for better type safety
type AuthActions = {
  login: (phoneNumber: string, password: string) => Promise<void>;
  signup: (name: string, phoneNumber: string, password: string) => Promise<void>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<void>;
  setUserRole: (role: UserRole) => void;
  logout: () => void;
  resetError: () => void;
};

// Create the store with TypeScript typing
const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      token: null,

      // Actions
      login: async (phoneNumber: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          if (phoneNumber === '1234567890' && password === 'password') {
            const user: User = {
              id: '1',
              name: 'John Doe',
              phoneNumber,
              role: 'customer',
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            
            set({
              user,
              isAuthenticated: true,
              token: 'mock-token-12345',
              isLoading: false,
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
      
      signup: async (name: string, phoneNumber: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful signup
          const user: User = {
            id: '2',
            name,
            phoneNumber,
            role: 'customer',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set({
            user,
            isAuthenticated: true,
            token: 'mock-token-67890',
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
      
      verifyOtp: async (phoneNumber: string, otp: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful OTP verification
          if (otp === '123456') {
            const user: User = {
              id: '3',
              name: 'New User',
              phoneNumber,
              role: 'customer',
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            
            set({
              user,
              isAuthenticated: true,
              token: 'mock-token-otp-verified',
              isLoading: false,
            });
          } else {
            throw new Error('Invalid OTP');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
      
      setUserRole: (role: UserRole) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              role,
            },
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          error: null,
        });
      },
      
      resetError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => AsyncStorage,
    }
  )
);

export default useAuthStore;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
