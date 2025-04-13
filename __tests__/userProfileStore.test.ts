import { renderHook, act } from '@testing-library/react-hooks';
import useUserProfileStore from '../src/store/userProfileStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('User Profile Store', () => {
  beforeEach(() => {
    // Clear the store before each test
    const { result } = renderHook(() => useUserProfileStore());
    act(() => {
      result.current.clearProfile();
    });
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    expect(result.current.profile).toEqual({
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
      profileImage: '',
    });
    expect(result.current.addresses).toEqual([]);
    expect(result.current.defaultAddressId).toBeNull();
    expect(result.current.favoriteProducts).toEqual([]);
  });

  test('updateProfile updates profile correctly', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    const profileData = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      profileImage: 'profile.jpg',
    };
    
    act(() => {
      result.current.updateProfile(profileData);
    });
    
    expect(result.current.profile).toEqual(profileData);
  });

  test('updateProfile merges with existing profile data', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    // First update
    act(() => {
      result.current.updateProfile({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
    
    // Second update (partial)
    act(() => {
      result.current.updateProfile({
        phoneNumber: '1234567890',
        profileImage: 'profile.jpg',
      });
    });
    
    expect(result.current.profile).toEqual({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      profileImage: 'profile.jpg',
    });
  });

  test('addAddress adds address correctly', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    const address = {
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      label: 'Home',
    };
    
    act(() => {
      result.current.addAddress(address);
    });
    
    expect(result.current.addresses.length).toBe(1);
    expect(result.current.addresses[0].addressLine1).toBe('123 Main St');
    expect(result.current.addresses[0].id).toBeDefined();
    
    // First address should be set as default
    expect(result.current.defaultAddressId).toBe(result.current.addresses[0].id);
  });

  test('updateAddress updates address correctly', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    // Add address
    act(() => {
      result.current.addAddress({
        addressLine1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        label: 'Home',
      });
    });
    
    const addressId = result.current.addresses[0].id;
    
    // Update address
    act(() => {
      result.current.updateAddress(addressId, {
        addressLine1: '456 Park Ave',
        label: 'Work',
      });
    });
    
    expect(result.current.addresses[0].addressLine1).toBe('456 Park Ave');
    expect(result.current.addresses[0].label).toBe('Work');
    expect(result.current.addresses[0].city).toBe('New York'); // Unchanged field
  });

  test('removeAddress removes address correctly', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    // Add addresses
    act(() => {
      result.current.addAddress({
        addressLine1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        label: 'Home',
      });
      
      result.current.addAddress({
        addressLine1: '456 Park Ave',
        city: 'New York',
        state: 'NY',
        postalCode: '10022',
        country: 'USA',
        label: 'Work',
      });
    });
    
    expect(result.current.addresses.length).toBe(2);
    
    const addressId = result.current.addresses[0].id;
    const remainingAddressId = result.current.addresses[1].id;
    
    // Remove address
    act(() => {
      result.current.removeAddress(addressId);
    });
    
    expect(result.current.addresses.length).toBe(1);
    expect(result.current.addresses[0].label).toBe('Work');
    
    // Default address should be updated to the remaining address
    expect(result.current.defaultAddressId).toBe(remainingAddressId);
  });

  test('setDefaultAddress sets default address correctly', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    // Add addresses
    act(() => {
      result.current.addAddress({
        addressLine1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        label: 'Home',
      });
      
      result.current.addAddress({
        addressLine1: '456 Park Ave',
        city: 'New York',
        state: 'NY',
        postalCode: '10022',
        country: 'USA',
        label: 'Work',
      });
    });
    
    const address1Id = result.current.addresses[0].id;
    const address2Id = result.current.addresses[1].id;
    
    // First address should be default initially
    expect(result.current.defaultAddressId).toBe(address1Id);
    
    // Set second address as default
    act(() => {
      result.current.setDefaultAddress(address2Id);
    });
    
    expect(result.current.defaultAddressId).toBe(address2Id);
  });

  test('addFavoriteProduct adds product to favorites', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    act(() => {
      result.current.addFavoriteProduct('product-1');
    });
    
    expect(result.current.favoriteProducts).toContain('product-1');
    
    // Adding same product again should not duplicate
    act(() => {
      result.current.addFavoriteProduct('product-1');
    });
    
    expect(result.current.favoriteProducts.length).toBe(1);
  });

  test('removeFavoriteProduct removes product from favorites', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    // Add favorite products
    act(() => {
      result.current.addFavoriteProduct('product-1');
      result.current.addFavoriteProduct('product-2');
    });
    
    expect(result.current.favoriteProducts.length).toBe(2);
    
    // Remove product
    act(() => {
      result.current.removeFavoriteProduct('product-1');
    });
    
    expect(result.current.favoriteProducts.length).toBe(1);
    expect(result.current.favoriteProducts).not.toContain('product-1');
    expect(result.current.favoriteProducts).toContain('product-2');
  });

  test('clearProfile resets all state', () => {
    const { result } = renderHook(() => useUserProfileStore());
    
    // Set up profile data
    act(() => {
      result.current.updateProfile({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      });
      
      result.current.addAddress({
        addressLine1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        label: 'Home',
      });
      
      result.current.addFavoriteProduct('product-1');
    });
    
    // Clear profile
    act(() => {
      result.current.clearProfile();
    });
    
    // Check state is reset
    expect(result.current.profile).toEqual({
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
      profileImage: '',
    });
    expect(result.current.addresses).toEqual([]);
    expect(result.current.defaultAddressId).toBeNull();
    expect(result.current.favoriteProducts).toEqual([]);
  });
});
