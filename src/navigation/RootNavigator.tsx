import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../store';
import { AuthNavigator } from './AuthNavigator';
import { CustomerNavigator } from './CustomerNavigator';
import { VendorNavigator } from './VendorNavigator';
import { DriverNavigator } from './DriverNavigator';
import { UserRole } from '../types';

// Define the root stack parameter list
export type RootStackParamList = {
  Auth: undefined;
  Customer: undefined;
  Vendor: undefined;
  Driver: undefined;
};

// Create the root stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  // Get authentication state from the auth store
  const { isAuthenticated, user } = useAuthStore();

  // Determine which navigator to show based on authentication state and user role
  const renderNavigator = () => {
    if (!isAuthenticated || !user) {
      return <Stack.Screen name="Auth" component={AuthNavigator} />;
    }

    switch (user.role) {
      case 'customer':
        return <Stack.Screen name="Customer" component={CustomerNavigator} />;
      case 'vendor':
        return <Stack.Screen name="Vendor" component={VendorNavigator} />;
      case 'driver':
        return <Stack.Screen name="Driver" component={DriverNavigator} />;
      default:
        return <Stack.Screen name="Auth" component={AuthNavigator} />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {renderNavigator()}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
