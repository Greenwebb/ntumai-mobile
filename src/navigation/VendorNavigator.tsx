import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/theme';
import { Text, View, StyleSheet } from 'react-native';

// Import vendor screens
import SellerDashboardScreen from '../screens/vendor/SellerDashboardScreen';
import SellerProductsScreen from '../screens/vendor/SellerProductsScreen';
import AddProductScreen from '../screens/vendor/AddProductScreen';
import SellerOrdersScreen from '../screens/vendor/SellerOrdersScreen';
import SellerOrderDetailsScreen from '../screens/vendor/SellerOrderDetailsScreen';

// Define the vendor stack parameter list with proper typing
export type VendorStackParamList = {
  VendorTabs: undefined;
  AddProduct: undefined;
  EditProduct: { productId: string };
  OrderDetails: { orderId: string };
};

// Define the vendor tab parameter list with proper typing
export type VendorTabParamList = {
  Dashboard: undefined;
  Products: undefined;
  Orders: undefined;
  Profile: undefined;
};

// Create the vendor stack navigator
const Stack = createNativeStackNavigator<VendorStackParamList>();
const Tab = createBottomTabNavigator<VendorTabParamList>();

// Tab bar icon component
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => {
  // This would normally use proper icons from a library like react-native-vector-icons
  // For simplicity, we're using text placeholders
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {name === 'Dashboard' ? '📊' : 
         name === 'Products' ? '📦' : 
         name === 'Orders' ? '📋' : '👤'}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {name}
      </Text>
    </View>
  );
};

// Vendor tabs navigator
const VendorTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={SellerDashboardScreen} />
      <Tab.Screen name="Products" component={SellerProductsScreen} />
      <Tab.Screen name="Orders" component={SellerOrdersScreen} />
      <Tab.Screen name="Profile" component={ProfilePlaceholder} />
    </Tab.Navigator>
  );
};

// Placeholder for profile screen (would use the actual profile screen in a complete implementation)
const ProfilePlaceholder: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Vendor Profile Screen</Text>
  </View>
);

// Main vendor navigator
export const VendorNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="VendorTabs"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="VendorTabs" component={VendorTabs} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="EditProduct" component={EditProductPlaceholder} />
      <Stack.Screen name="OrderDetails" component={SellerOrderDetailsScreen} />
    </Stack.Navigator>
  );
};

// Placeholder for edit product screen (would use the actual edit product screen in a complete implementation)
const EditProductPlaceholder: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Edit Product Screen</Text>
  </View>
);

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
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});

export default VendorNavigator;
