import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '../types';

// Define the auth state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  userRole: UserRole | null;
}

// Define action types for better type safety
interface AuthActions {
  login: (phoneNumber: string, password: string) => Promise<void>;
  signup: (name: string, phoneNumber: string, password: string) => Promise<void>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<void>;
  setUserRole: (role: UserRole) => void;
  logout: () => void;
  resetError: () => void;
  checkAuth: () => Promise<void>;
}

// Create the store with TypeScript typing
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      token: null,
      userRole: null,

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
              userRole: user.role,
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
            userRole: user.role,
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
              userRole: user.role,
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
            userRole: role
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          userRole: null,
          error: null,
        });
      },
      
      resetError: () => {
        set({ error: null });
      },

      // Add the missing checkAuth function
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          // Simulate checking stored credentials
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes, we'll randomly decide if user is authenticated
          const isAuthenticated = Math.random() > 0.5;
          
          if (isAuthenticated) {
            // Mock a stored user
            const user: User = {
              id: '1',
              name: 'John Doe',
              phoneNumber: '1234567890',
              role: Math.random() > 0.6 ? 'customer' : Math.random() > 0.5 ? 'vendor' : 'driver',
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            
            set({
              user,
              isAuthenticated: true,
              token: 'mock-stored-token',
              userRole: user.role,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              token: null,
              userRole: null,
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
            isAuthenticated: false,
            user: null,
            token: null,
            userRole: null,
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => AsyncStorage,
    }
  )
);
