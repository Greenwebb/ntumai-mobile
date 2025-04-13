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
