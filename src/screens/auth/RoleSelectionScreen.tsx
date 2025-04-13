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
