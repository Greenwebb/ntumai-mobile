<<<<<<< HEAD
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'vendor' | 'driver';
  avatar?: string;
}

=======
// Basic type definitions for the Ntumai app

// User types
export type UserRole = 'customer' | 'vendor' | 'driver';

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

// Product types
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
<<<<<<< HEAD
  image: string;
  category: string;
  vendor: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: Address;
  paymentMethod: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  rating: number;
  products: Product[];
}

export interface Delivery {
  id: string;
  order: Order;
  driver: User;
  status: 'assigned' | 'picked' | 'in_transit' | 'delivered';
  estimatedDelivery: string;
}
=======
  discountPrice?: number;
  images: string[];
  category: string;
  vendorId: string;
  vendorName: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  options?: ProductOption[];
  variants?: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

// Cart types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendorId: string;
  vendorName: string;
  selectedOptions?: {
    optionId: string;
    choiceId: string;
    name: string;
    price: number;
  }[];
  selectedVariantId?: string;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

// Order types
export interface Order {
  id: string;
  customerId: string;
  vendorId: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 
  | 'cash_on_delivery'
  | 'credit_card'
  | 'paypal'
  | 'wallet';

// Address types
export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  phoneNumber: string;
  isDefault: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  OtpVerification: { phoneNumber: string };
  ForgotPassword: undefined;
  RoleSelection: undefined;
};

export type CustomerStackParamList = {
  Home: undefined;
  Marketplace: undefined;
  ProductDetails: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  DeliveryTracking: { orderId: string };
  Profile: undefined;
  EditProfile: undefined;
  Addresses: undefined;
  AddLocation: { addressId?: string };
  Orders: undefined;
  OrderDetails: { orderId: string };
};

export type VendorStackParamList = {
  Dashboard: undefined;
  Products: undefined;
  AddProduct: { productId?: string };
  Orders: undefined;
  OrderDetails: { orderId: string };
  Profile: undefined;
  EditProfile: undefined;
  Analytics: undefined;
};

export type DriverStackParamList = {
  Dashboard: undefined;
  DeliveryDetails: { orderId: string };
  Earnings: undefined;
  Profile: undefined;
  EditProfile: undefined;
};
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
