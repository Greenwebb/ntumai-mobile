import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';

// Import Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import OtpVerificationScreen from '../screens/auth/OtpVerificationScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';

// Import Customer Screens
import HomeScreen from '../screens/customer/HomeScreen';
import MarketplaceScreen from '../screens/customer/MarketplaceScreen';
import ProductDetailsScreen from '../screens/customer/ProductDetailsScreen';
import CartScreen from '../screens/customer/CartScreen';
import CheckoutScreen from '../screens/customer/CheckoutScreen';
import DeliveryTrackingScreen from '../screens/customer/DeliveryTrackingScreen';

// Import Vendor Screens
import SellerDashboardScreen from '../screens/vendor/SellerDashboardScreen';
import SellerProductsScreen from '../screens/vendor/SellerProductsScreen';
import AddProductScreen from '../screens/vendor/AddProductScreen';
import SellerOrdersScreen from '../screens/vendor/SellerOrdersScreen';
import SellerOrderDetailsScreen from '../screens/vendor/SellerOrderDetailsScreen';

// Import Driver Screens
import RiderDashboardScreen from '../screens/driver/RiderDashboardScreen';
import DeliveryDetailsScreen from '../screens/driver/DeliveryDetailsScreen';
import RiderEarningsScreen from '../screens/driver/RiderEarningsScreen';
import RiderProfileScreen from '../screens/driver/RiderProfileScreen';

// Define navigation types
export type RootStackParamList = {
  Auth: undefined;
  Customer: undefined;
  Vendor: undefined;
  Driver: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  OtpVerification: { email: string };
  ForgotPassword: undefined;
  RoleSelection: undefined;
};

export type CustomerTabParamList = {
  HomeTab: undefined;
  MarketplaceTab: undefined;
  CartTab: undefined;
  ProfileTab: undefined;
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
  AddLocation: undefined;
  Orders: undefined;
  OrderDetails: { orderId: string };
};

export type VendorTabParamList = {
  DashboardTab: undefined;
  ProductsTab: undefined;
  OrdersTab: undefined;
  ProfileTab: undefined;
};

export type VendorStackParamList = {
  Dashboard: undefined;
  Products: undefined;
  AddProduct: undefined;
  EditProduct: { productId: string };
  Orders: undefined;
  OrderDetails: { orderId: string };
  Profile: undefined;
  EditProfile: undefined;
};

export type DriverTabParamList = {
  DashboardTab: undefined;
  DeliveriesTab: undefined;
  EarningsTab: undefined;
  ProfileTab: undefined;
};

export type DriverStackParamList = {
  Dashboard: undefined;
  Deliveries: undefined;
  DeliveryDetails: { deliveryId: string };
  Earnings: undefined;
  Profile: undefined;
  EditProfile: undefined;
};

// Create navigators
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const CustomerTab = createBottomTabNavigator<CustomerTabParamList>();
const CustomerStack = createNativeStackNavigator<CustomerStackParamList>();
const VendorTab = createBottomTabNavigator<VendorTabParamList>();
const VendorStack = createNativeStackNavigator<VendorStackParamList>();
const DriverTab = createBottomTabNavigator<DriverTabParamList>();
const DriverStack = createNativeStackNavigator<DriverStackParamList>();

// Placeholder component for screens that haven't been implemented yet
const PlaceholderScreen = ({ route }: any) => {
  const StyledView = styled(View);
  const StyledText = styled(Text);
  
  return (
    <StyledView className="flex-1 items-center justify-center bg-background">
      <StyledText className="text-lg">
        {route?.name || 'Screen'} (Coming Soon)
      </StyledText>
    </StyledView>
  );
};

// Auth Navigator
export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <AuthStack.Screen name="ForgotPassword" component={PlaceholderScreen} />
      <AuthStack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    </AuthStack.Navigator>
  );
};

// Customer Tab Navigator
export const CustomerTabNavigator = () => {
  return (
    <CustomerTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#999999',
      }}
    >
      <CustomerTab.Screen 
        name="HomeTab" 
        component={CustomerHomeNavigator}
        options={{ 
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>🏠</StyledText>
          )
        }} 
      />
      <CustomerTab.Screen 
        name="MarketplaceTab" 
        component={CustomerMarketplaceNavigator}
        options={{ 
          tabBarLabel: 'Marketplace',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>🛒</StyledText>
          )
        }} 
      />
      <CustomerTab.Screen 
        name="CartTab" 
        component={CustomerCartNavigator}
        options={{ 
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>🛍️</StyledText>
          )
        }} 
      />
      <CustomerTab.Screen 
        name="ProfileTab" 
        component={CustomerProfileNavigator}
        options={{ 
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>👤</StyledText>
          )
        }} 
      />
    </CustomerTab.Navigator>
  );
};

// Customer Stack Navigators for each tab
export const CustomerHomeNavigator = () => {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name="Home" component={HomeScreen} />
      <CustomerStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </CustomerStack.Navigator>
  );
};

export const CustomerMarketplaceNavigator = () => {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name="Marketplace" component={MarketplaceScreen} />
      <CustomerStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </CustomerStack.Navigator>
  );
};

export const CustomerCartNavigator = () => {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name="Cart" component={CartScreen} />
      <CustomerStack.Screen name="Checkout" component={CheckoutScreen} />
      <CustomerStack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
    </CustomerStack.Navigator>
  );
};

export const CustomerProfileNavigator = () => {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name="Profile" component={PlaceholderScreen} />
      <CustomerStack.Screen name="EditProfile" component={PlaceholderScreen} />
      <CustomerStack.Screen name="Addresses" component={PlaceholderScreen} />
      <CustomerStack.Screen name="AddLocation" component={PlaceholderScreen} />
      <CustomerStack.Screen name="Orders" component={PlaceholderScreen} />
      <CustomerStack.Screen name="OrderDetails" component={PlaceholderScreen} />
    </CustomerStack.Navigator>
  );
};

// Vendor Tab Navigator
export const VendorNavigator = () => {
  return (
    <VendorTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#999999',
      }}
    >
      <VendorTab.Screen 
        name="DashboardTab" 
        component={VendorDashboardNavigator}
        options={{ 
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>📊</StyledText>
          )
        }} 
      />
      <VendorTab.Screen 
        name="ProductsTab" 
        component={VendorProductsNavigator}
        options={{ 
          tabBarLabel: 'Products',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>📦</StyledText>
          )
        }} 
      />
      <VendorTab.Screen 
        name="OrdersTab" 
        component={VendorOrdersNavigator}
        options={{ 
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>📋</StyledText>
          )
        }} 
      />
      <VendorTab.Screen 
        name="ProfileTab" 
        component={VendorProfileNavigator}
        options={{ 
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>👤</StyledText>
          )
        }} 
      />
    </VendorTab.Navigator>
  );
};

// Vendor Stack Navigators for each tab
export const VendorDashboardNavigator = () => {
  return (
    <VendorStack.Navigator screenOptions={{ headerShown: false }}>
      <VendorStack.Screen name="Dashboard" component={SellerDashboardScreen} />
    </VendorStack.Navigator>
  );
};

export const VendorProductsNavigator = () => {
  return (
    <VendorStack.Navigator screenOptions={{ headerShown: false }}>
      <VendorStack.Screen name="Products" component={SellerProductsScreen} />
      <VendorStack.Screen name="AddProduct" component={AddProductScreen} />
      <VendorStack.Screen name="EditProduct" component={PlaceholderScreen} />
    </VendorStack.Navigator>
  );
};

export const VendorOrdersNavigator = () => {
  return (
    <VendorStack.Navigator screenOptions={{ headerShown: false }}>
      <VendorStack.Screen name="Orders" component={SellerOrdersScreen} />
      <VendorStack.Screen name="OrderDetails" component={SellerOrderDetailsScreen} />
    </VendorStack.Navigator>
  );
};

export const VendorProfileNavigator = () => {
  return (
    <VendorStack.Navigator screenOptions={{ headerShown: false }}>
      <VendorStack.Screen name="Profile" component={RiderProfileScreen} />
      <VendorStack.Screen name="EditProfile" component={PlaceholderScreen} />
    </VendorStack.Navigator>
  );
};

// Driver Tab Navigator
export const DriverNavigator = () => {
  return (
    <DriverTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#999999',
      }}
    >
      <DriverTab.Screen 
        name="DashboardTab" 
        component={DriverDashboardNavigator}
        options={{ 
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>📊</StyledText>
          )
        }} 
      />
      <DriverTab.Screen 
        name="DeliveriesTab" 
        component={DriverDeliveriesNavigator}
        options={{ 
          tabBarLabel: 'Deliveries',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>🚚</StyledText>
          )
        }} 
      />
      <DriverTab.Screen 
        name="EarningsTab" 
        component={DriverEarningsNavigator}
        options={{ 
          tabBarLabel: 'Earnings',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>💰</StyledText>
          )
        }} 
      />
      <DriverTab.Screen 
        name="ProfileTab" 
        component={DriverProfileNavigator}
        options={{ 
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <StyledText className="text-xl" style={{ color }}>👤</StyledText>
          )
        }} 
      />
    </DriverTab.Navigator>
  );
};

// Driver Stack Navigators for each tab
export const DriverDashboardNavigator = () => {
  return (
    <DriverStack.Navigator screenOptions={{ headerShown: false }}>
      <DriverStack.Screen name="Dashboard" component={RiderDashboardScreen} />
    </DriverStack.Navigator>
  );
};

export const DriverDeliveriesNavigator = () => {
  return (
    <DriverStack.Navigator screenOptions={{ headerShown: false }}>
      <DriverStack.Screen name="Deliveries" component={PlaceholderScreen} />
      <DriverStack.Screen name="DeliveryDetails" component={DeliveryDetailsScreen} />
    </DriverStack.Navigator>
  );
};

export const DriverEarningsNavigator = () => {
  return (
    <DriverStack.Navigator screenOptions={{ headerShown: false }}>
      <DriverStack.Screen name="Earnings" component={RiderEarningsScreen} />
    </DriverStack.Navigator>
  );
};

export const DriverProfileNavigator = () => {
  return (
    <DriverStack.Navigator screenOptions={{ headerShown: false }}>
      <DriverStack.Screen name="Profile" component={RiderProfileScreen} />
      <DriverStack.Screen name="EditProfile" component={PlaceholderScreen} />
    </DriverStack.Navigator>
  );
};

// Root Navigator
export const RootNavigator = () => {
  // For demo purposes, we'll use a state to determine which navigator to show
  const [userRole, setUserRole] = React.useState<'auth' | 'customer' | 'vendor' | 'driver'>('auth');
  
  // This would normally be determined by checking authentication state
  React.useEffect(() => {
    // Simulate login after 2 seconds for demo purposes
    const timer = setTimeout(() => {
      setUserRole('customer');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {userRole === 'auth' ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : userRole === 'customer' ? (
          <RootStack.Screen name="Customer" component={CustomerTabNavigator} />
        ) : userRole === 'vendor' ? (
          <RootStack.Screen name="Vendor" component={VendorNavigator} />
        ) : (
          <RootStack.Screen name="Driver" component={DriverNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const StyledText = styled(Text);
