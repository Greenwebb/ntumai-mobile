export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'vendor' | 'driver';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
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
