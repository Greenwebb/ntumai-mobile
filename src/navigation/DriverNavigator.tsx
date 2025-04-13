import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/theme';
import { Text, View, StyleSheet } from 'react-native';

// Import driver screens
import RiderDashboardScreen from '../screens/driver/RiderDashboardScreen';
import DeliveryDetailsScreen from '../screens/driver/DeliveryDetailsScreen';
import RiderEarningsScreen from '../screens/driver/RiderEarningsScreen';
import RiderProfileScreen from '../screens/driver/RiderProfileScreen';

// Define the driver stack parameter list with proper typing
export type DriverStackParamList = {
  DriverTabs: undefined;
  DeliveryDetails: { deliveryId: string };
  EarningsDetails: { period?: string };
  EditProfile: undefined;
};

// Define the driver tab parameter list with proper typing
export type DriverTabParamList = {
  Dashboard: undefined;
  Deliveries: undefined;
  Earnings: undefined;
  Profile: undefined;
};

// Create the driver stack navigator
const Stack = createNativeStackNavigator<DriverStackParamList>();
const Tab = createBottomTabNavigator<DriverTabParamList>();

// Tab bar icon component
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => {
  // This would normally use proper icons from a library like react-native-vector-icons
  // For simplicity, we're using text placeholders
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {name === 'Dashboard' ? '📊' : 
         name === 'Deliveries' ? '🚚' : 
         name === 'Earnings' ? '💰' : '👤'}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {name}
      </Text>
    </View>
  );
};

// Driver tabs navigator
const DriverTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={RiderDashboardScreen} />
      <Tab.Screen name="Deliveries" component={DeliveriesPlaceholder} />
      <Tab.Screen name="Earnings" component={RiderEarningsScreen} />
      <Tab.Screen name="Profile" component={RiderProfileScreen} />
    </Tab.Navigator>
  );
};

// Placeholder for deliveries screen (would use the actual deliveries screen in a complete implementation)
const DeliveriesPlaceholder: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Deliveries Screen</Text>
  </View>
);

// Placeholder for edit profile screen (would use the actual edit profile screen in a complete implementation)
const EditProfilePlaceholder: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Edit Profile Screen</Text>
  </View>
);

// Main driver navigator
export const DriverNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="DriverTabs"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="DriverTabs" component={DriverTabs} />
      <Stack.Screen name="DeliveryDetails" component={DeliveryDetailsScreen} />
      <Stack.Screen name="EarningsDetails" component={EarningsDetailsPlaceholder} />
      <Stack.Screen name="EditProfile" component={EditProfilePlaceholder} />
    </Stack.Navigator>
  );
};

// Placeholder for earnings details screen (would use the actual earnings details screen in a complete implementation)
const EarningsDetailsPlaceholder: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Earnings Details Screen</Text>
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

export default DriverNavigator;
