// Application-wide constants for the Ntumai app

// App information
export const APP_INFO = {
  name: 'Ntumai',
  version: '1.0.0',
  description: 'Delivery app connecting customers, vendors, and drivers',
  supportEmail: 'support@ntumai.com',
  website: 'https://ntumai.com',
};

// API endpoints and configuration
export const API = {
  baseUrl: 'https://api.ntumai.com',
  timeout: 30000, // 30 seconds
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      verifyOtp: '/auth/verify-otp',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
    },
    user: {
      profile: '/user/profile',
      updateProfile: '/user/profile',
      addresses: '/user/addresses',
    },
    products: {
      list: '/products',
      details: '/products/:id',
      search: '/products/search',
      categories: '/categories',
    },
    cart: {
      get: '/cart',
      add: '/cart/add',
      update: '/cart/update',
      remove: '/cart/remove',
      clear: '/cart/clear',
    },
    orders: {
      create: '/orders',
      list: '/orders',
      details: '/orders/:id',
      cancel: '/orders/:id/cancel',
      track: '/orders/:id/track',
    },
    vendor: {
      dashboard: '/vendor/dashboard',
      products: '/vendor/products',
      orders: '/vendor/orders',
      analytics: '/vendor/analytics',
    },
    driver: {
      dashboard: '/driver/dashboard',
      deliveries: '/driver/deliveries',
      earnings: '/driver/earnings',
    },
  },
};

// Storage keys for AsyncStorage
export const STORAGE_KEYS = {
  authToken: '@Ntumai:authToken',
  user: '@Ntumai:user',
  cart: '@Ntumai:cart',
  onboardingCompleted: '@Ntumai:onboardingCompleted',
  recentSearches: '@Ntumai:recentSearches',
  addresses: '@Ntumai:addresses',
  settings: '@Ntumai:settings',
};

// Validation rules
export const VALIDATION = {
  phoneNumber: {
    minLength: 10,
    maxLength: 15,
    pattern: /^\+?[0-9]{10,15}$/,
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  },
  otp: {
    length: 6,
    pattern: /^[0-9]{6}$/,
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
};

// App routes
export const ROUTES = {
  // Auth routes
  SPLASH: 'Splash',
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
  OTP_VERIFICATION: 'OtpVerification',
  FORGOT_PASSWORD: 'ForgotPassword',
  ROLE_SELECTION: 'RoleSelection',
  
  // Customer routes
  CUSTOMER_HOME: 'CustomerHome',
  MARKETPLACE: 'Marketplace',
  PRODUCT_DETAILS: 'ProductDetails',
  CART: 'Cart',
  CHECKOUT: 'Checkout',
  DELIVERY_TRACKING: 'DeliveryTracking',
  PROFILE: 'Profile',
  EDIT_PROFILE: 'EditProfile',
  ADDRESSES: 'Addresses',
  ADD_LOCATION: 'AddLocation',
  ORDERS: 'Orders',
  ORDER_DETAILS: 'OrderDetails',
  
  // Vendor routes
  VENDOR_DASHBOARD: 'VendorDashboard',
  VENDOR_PRODUCTS: 'VendorProducts',
  ADD_PRODUCT: 'AddProduct',
  VENDOR_ORDERS: 'VendorOrders',
  VENDOR_ORDER_DETAILS: 'VendorOrderDetails',
  VENDOR_PROFILE: 'VendorProfile',
  VENDOR_ANALYTICS: 'VendorAnalytics',
  
  // Driver routes
  DRIVER_DASHBOARD: 'DriverDashboard',
  DELIVERY_DETAILS: 'DeliveryDetails',
  DRIVER_EARNINGS: 'DriverEarnings',
  DRIVER_PROFILE: 'DriverProfile',
};

// Default values
export const DEFAULTS = {
  deliveryFee: 2.99,
  currency: 'USD',
  currencySymbol: '$',
  language: 'en',
  pageSize: 10,
  otpExpiryMinutes: 10,
  searchDebounceMs: 500,
  locationUpdateIntervalMs: 10000, // 10 seconds
  mapZoomLevel: 15,
  orderRefreshIntervalMs: 30000, // 30 seconds
};

// Error messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your internet connection.',
  server: 'Server error. Please try again later.',
  auth: {
    invalidCredentials: 'Invalid phone number or password.',
    invalidOtp: 'Invalid OTP. Please try again.',
    expiredOtp: 'OTP has expired. Please request a new one.',
    accountExists: 'An account with this phone number already exists.',
    weakPassword: 'Password is too weak. It must contain at least 8 characters, including uppercase, lowercase, and numbers.',
  },
  validation: {
    required: 'This field is required.',
    invalidPhone: 'Please enter a valid phone number.',
    invalidEmail: 'Please enter a valid email address.',
    invalidPassword: 'Password must be at least 8 characters with uppercase, lowercase, and numbers.',
    passwordMismatch: 'Passwords do not match.',
    invalidOtp: 'OTP must be 6 digits.',
  },
  cart: {
    addFailed: 'Failed to add item to cart.',
    updateFailed: 'Failed to update cart.',
    removeFailed: 'Failed to remove item from cart.',
  },
  order: {
    createFailed: 'Failed to create order.',
    cancelFailed: 'Failed to cancel order.',
    notFound: 'Order not found.',
  },
};

export default {
  APP_INFO,
  API,
  STORAGE_KEYS,
  VALIDATION,
  ROUTES,
  DEFAULTS,
  ERROR_MESSAGES,
};
