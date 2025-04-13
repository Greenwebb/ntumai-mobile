<<<<<<< HEAD
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
=======
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography } from '../../constants/theme';
import { UserRole } from '../../types';

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  icon: string;
}

interface RoleSelectionScreenProps {
  onSelectRole: (role: UserRole) => void;
  onBack: () => void;
}

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onSelectRole,
  onBack,
}) => {
  const roleOptions: RoleOption[] = [
    {
      role: 'customer',
      title: 'Customer',
      description: 'Browse products, place orders, and get them delivered to your doorstep.',
      icon: '🛒',
    },
    {
      role: 'vendor',
      title: 'Vendor',
      description: 'Sell your products, manage inventory, and grow your business.',
      icon: '🏪',
    },
    {
      role: 'driver',
      title: 'Driver',
      description: 'Deliver orders, earn money, and work on your own schedule.',
      icon: '🚚',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Choose Your Role</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Select how you want to use Ntumai. You can change this later in your profile settings.
        </Text>

        <View style={styles.roleOptionsContainer}>
          {roleOptions.map((option) => (
            <TouchableOpacity
              key={option.role}
              style={styles.roleOption}
              onPress={() => onSelectRole(option.role)}
            >
              <View style={styles.roleIconContainer}>
                <Text style={styles.roleIcon}>{option.icon}</Text>
              </View>
              <Text style={styles.roleTitle}>{option.title}</Text>
              <Text style={styles.roleDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  content: {
    padding: 24,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  roleOptionsContainer: {
    gap: 16,
  },
  roleOption: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  roleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleIcon: {
    fontSize: 24,
  },
  roleTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

export default RoleSelectionScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
