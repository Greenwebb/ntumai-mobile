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
