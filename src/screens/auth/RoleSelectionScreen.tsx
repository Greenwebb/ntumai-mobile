import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Role = 'customer' | 'vendor' | 'driver';

export const RoleSelectionScreen = ({ navigation }: any) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  const { setUserRole, isLoading } = useAuthStore();
  
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };
  
  const handleContinue = async () => {
    if (selectedRole) {
      try {
        await setUserRole(selectedRole);
        // Navigation will be handled by the root navigator based on user role
      } catch (error) {
        console.error('Role selection error:', error);
      }
    }
  };
  
  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      description: 'Browse products, place orders, and get them delivered to your doorstep.',
      icon: '🛒'
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'Sell your products on our platform and reach more customers.',
      icon: '💰'
    },
    {
      id: 'driver',
      title: 'Driver',
      description: 'Deliver orders to customers and earn money.',
      icon: '🚚'
    }
  ];
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Select Role" />
      
      <StyledScrollView className="flex-1 px-6 pt-6">
        <StyledText className="text-2xl font-bold mb-2">Choose Your Role</StyledText>
        <StyledText className="text-gray-500 mb-8">
          Select how you want to use the Ntumai app
        </StyledText>
        
        {roles.map((role) => (
          <StyledTouchableOpacity
            key={role.id}
            className={`border rounded-xl p-4 mb-4 flex-row items-center ${
              selectedRole === role.id ? 'border-primary bg-primary/5' : 'border-gray-200'
            }`}
            onPress={() => handleRoleSelect(role.id as Role)}
          >
            <StyledView className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-4">
              <StyledText className="text-2xl">{role.icon}</StyledText>
            </StyledView>
            
            <StyledView className="flex-1">
              <StyledText className="text-lg font-medium mb-1">{role.title}</StyledText>
              <StyledText className="text-gray-500">{role.description}</StyledText>
            </StyledView>
            
            <StyledView 
              className={`w-6 h-6 rounded-full border ${
                selectedRole === role.id 
                  ? 'border-primary bg-primary' 
                  : 'border-gray-300'
              } items-center justify-center`}
            >
              {selectedRole === role.id && (
                <StyledText className="text-white text-xs">✓</StyledText>
              )}
            </StyledView>
          </StyledTouchableOpacity>
        ))}
        
        <StyledView className="mt-6 mb-8">
          <Button
            title="Continue"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!selectedRole}
            loading={isLoading}
            onPress={handleContinue}
          />
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
