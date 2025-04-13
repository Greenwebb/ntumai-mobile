import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, Address, UserProfileState } from '../types';

// Define action types for better type safety
type UserProfileActions = {
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (addressId: string, address: Partial<Address>) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  addFavoriteProduct: (productId: string) => void;
  removeFavoriteProduct: (productId: string) => void;
  clearProfile: () => void;
};

// Create the store with TypeScript typing
const useUserProfileStore = create<UserProfileState & UserProfileActions>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: {
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        profileImage: '',
      },
      addresses: [],
      defaultAddressId: null,
      favoriteProducts: [],
      
      // Actions
      updateProfile: (profileData: Partial<UserProfile>) => {
        set(state => ({
          profile: {
            ...state.profile,
            ...profileData,
          },
        }));
      },
      
      addAddress: (address: Address) => {
        const newAddress = {
          ...address,
          id: address.id || `address-${Date.now()}`,
        };
        
        set(state => {
          const newAddresses = [...state.addresses, newAddress];
          
          // If this is the first address, set it as default
          const defaultAddressId = state.defaultAddressId || 
            (state.addresses.length === 0 ? newAddress.id : null);
          
          return {
            addresses: newAddresses,
            defaultAddressId,
          };
        });
      },
      
      updateAddress: (addressId: string, addressData: Partial<Address>) => {
        set(state => ({
          addresses: state.addresses.map(address => 
            address.id === addressId
              ? { ...address, ...addressData }
              : address
          ),
        }));
      },
      
      removeAddress: (addressId: string) => {
        set(state => {
          const newAddresses = state.addresses.filter(
            address => address.id !== addressId
          );
          
          // If the removed address was the default, set a new default if possible
          let defaultAddressId = state.defaultAddressId;
          if (defaultAddressId === addressId) {
            defaultAddressId = newAddresses.length > 0 ? newAddresses[0].id : null;
          }
          
          return {
            addresses: newAddresses,
            defaultAddressId,
          };
        });
      },
      
      setDefaultAddress: (addressId: string) => {
        set(state => {
          // Verify the address exists
          const addressExists = state.addresses.some(
            address => address.id === addressId
          );
          
          return {
            defaultAddressId: addressExists ? addressId : state.defaultAddressId,
          };
        });
      },
      
      addFavoriteProduct: (productId: string) => {
        set(state => {
          // Check if product is already in favorites
          if (state.favoriteProducts.includes(productId)) {
            return state;
          }
          
          return {
            favoriteProducts: [...state.favoriteProducts, productId],
          };
        });
      },
      
      removeFavoriteProduct: (productId: string) => {
        set(state => ({
          favoriteProducts: state.favoriteProducts.filter(id => id !== productId),
        }));
      },
      
      clearProfile: () => {
        set({
          profile: {
            id: '',
            name: '',
            email: '',
            phoneNumber: '',
            profileImage: '',
          },
          addresses: [],
          defaultAddressId: null,
          favoriteProducts: [],
        });
      },
    }),
    {
      name: 'user-profile-storage',
      getStorage: () => AsyncStorage,
    }
  )
);

export default useUserProfileStore;
