import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from './src/store/authStore';

// Auth Screens
import { SplashScreen } from './src/screens/auth/SplashScreen';
import { OnboardingScreen } from './src/screens/auth/OnboardingScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { SignUpScreen } from './src/screens/auth/SignUpScreen';
import { OtpVerificationScreen } from './src/screens/auth/OtpVerificationScreen';
import { RoleSelectionScreen } from './src/screens/auth/RoleSelectionScreen';

// Customer Screens
import { HomeScreen } from './src/screens/customer/HomeScreen';
import { MarketplaceScreen } from './src/screens/customer/MarketplaceScreen';
import { ProductDetailsScreen } from './src/screens/customer/ProductDetailsScreen';
import { CartScreen } from './src/screens/customer/CartScreen';
import { CheckoutScreen } from './src/screens/customer/CheckoutScreen';
import { DeliveryTrackingScreen } from './src/screens/customer/DeliveryTrackingScreen';
import { ProfileScreen } from './src/screens/customer/ProfileScreen';

// Vendor Screens
import { SellerDashboardScreen } from './src/screens/vendor/SellerDashboardScreen';
import { SellerProductsScreen } from './src/screens/vendor/SellerProductsScreen';
import { AddProductScreen } from './src/screens/vendor/AddProductScreen';
import { SellerOrdersScreen } from './src/screens/vendor/SellerOrdersScreen';
import { SellerOrderDetailsScreen } from './src/screens/vendor/SellerOrderDetailsScreen';

// Driver Screens
import { RiderDashboardScreen } from './src/screens/driver/RiderDashboardScreen';
import { DeliveryDetailsScreen } from './src/screens/driver/DeliveryDetailsScreen';
import { RiderEarningsScreen } from './src/screens/driver/RiderEarningsScreen';
import { RiderProfileScreen } from './src/screens/driver/RiderProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Customer Tab Navigator
function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Marketplace') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Vendor Tab Navigator
function VendorTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={SellerDashboardScreen} />
      <Tab.Screen name="Products" component={SellerProductsScreen} />
      <Tab.Screen name="Orders" component={SellerOrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Driver Tab Navigator
function DriverTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'bicycle' : 'bicycle-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={RiderDashboardScreen} />
      <Tab.Screen name="Earnings" component={RiderEarningsScreen} />
      <Tab.Screen name="Profile" component={RiderProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const { isAuthenticated, userRole, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication status when app loads
    checkAuth();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            // Auth Stack
            <>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
              <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            </>
          ) : userRole === 'customer' ? (
            // Customer Stack
            <>
              <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
              <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
              <Stack.Screen name="Checkout" component={CheckoutScreen} />
              <Stack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
            </>
          ) : userRole === 'vendor' ? (
            // Vendor Stack
            <>
              <Stack.Screen name="VendorTabs" component={VendorTabs} />
              <Stack.Screen name="AddProduct" component={AddProductScreen} />
              <Stack.Screen name="SellerOrderDetails" component={SellerOrderDetailsScreen} />
            </>
          ) : (
            // Driver Stack
            <>
              <Stack.Screen name="DriverTabs" component={DriverTabs} />
              <Stack.Screen name="DeliveryDetails" component={DeliveryDetailsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
