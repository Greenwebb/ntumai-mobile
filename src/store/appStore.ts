import { create } from 'zustand';

interface AppState {
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  error: null,
  searchQuery: '',
  
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query })
}));
