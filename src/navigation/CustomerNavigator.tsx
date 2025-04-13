import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/theme';
import { Text, View, StyleSheet } from 'react-native';

// Import customer screens
import HomeScreen from '../screens/customer/HomeScreen';
import MarketplaceScreen from '../screens/customer/MarketplaceScreen';
import ProductDetailsScreen from '../screens/customer/ProductDetailsScreen';
import CartScreen from '../screens/customer/CartScreen';
import CheckoutScreen from '../screens/customer/CheckoutScreen';
import DeliveryTrackingScreen from '../screens/customer/DeliveryTrackingScreen';
import ProfileScreen from '../screens/customer/ProfileScreen';
import EditProfileScreen from '../screens/customer/EditProfileScreen';
import AddressesScreen from '../screens/customer/AddressesScreen';

// Define the customer stack parameter list with proper typing
export type CustomerStackParamList = {
  CustomerTabs: undefined;
  ProductDetails: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  DeliveryTracking: { orderId: string };
  EditProfile: undefined;
  Addresses: undefined;
};

// Define the customer tab parameter list with proper typing
export type CustomerTabParamList = {
  Home: undefined;
  Marketplace: undefined;
  Cart: undefined;
  Profile: undefined;
};

// Create the customer stack navigator
const Stack = createNativeStackNavigator<CustomerStackParamList>();
const Tab = createBottomTabNavigator<CustomerTabParamList>();

// Tab bar icon component
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => {
  // This would normally use proper icons from a library like react-native-vector-icons
  // For simplicity, we're using text placeholders
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {name === 'Home' ? '🏠' : 
         name === 'Marketplace' ? '🛒' : 
         name === 'Cart' ? '🛍️' : '👤'}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {name}
      </Text>
    </View>
  );
};

// Customer tabs navigator
const CustomerTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main customer navigator
export const CustomerNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="CustomerTabs"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Addresses" component={AddressesScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    height: 60,
    paddingBottom: 5,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
    color: colors.text.tertiary,
  },
  tabIconFocused: {
    color: colors.primary.DEFAULT,
  },
  tabLabel: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  tabLabelFocused: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
});

export default CustomerNavigator;
