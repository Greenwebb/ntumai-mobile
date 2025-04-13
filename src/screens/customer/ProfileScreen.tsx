import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface ProfileScreenProps {
  user: {
    id: string;
    name: string;
    email?: string;
    phone: string;
    profileImage?: string;
  };
  onEditProfile: () => void;
  onViewAddresses: () => void;
  onViewOrders: () => void;
  onViewPaymentMethods: () => void;
  onViewSettings: () => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onEditProfile,
  onViewAddresses,
  onViewOrders,
  onViewPaymentMethods,
  onViewSettings,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            {user.profileImage ? (
              <Text style={styles.profileImagePlaceholder}>🖼️</Text>
            ) : (
              <Text style={styles.profileImagePlaceholder}>👤</Text>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileContact}>{user.phone}</Text>
            {user.email && <Text style={styles.profileContact}>{user.email}</Text>}
          </View>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={onEditProfile}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={onViewOrders}
          >
            <Text style={styles.menuIcon}>📦</Text>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>My Orders</Text>
              <Text style={styles.menuItemDescription}>View your order history</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={onViewAddresses}
          >
            <Text style={styles.menuIcon}>📍</Text>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>Saved Addresses</Text>
              <Text style={styles.menuItemDescription}>Manage your delivery addresses</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={onViewPaymentMethods}
          >
            <Text style={styles.menuIcon}>💳</Text>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>Payment Methods</Text>
              <Text style={styles.menuItemDescription}>Manage your payment options</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={onViewSettings}
          >
            <Text style={styles.menuIcon}>⚙️</Text>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>Settings</Text>
              <Text style={styles.menuItemDescription}>App preferences and notifications</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={onLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileImagePlaceholder: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  profileContact: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary.light,
    borderRadius: 100,
  },
  editButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.primary.DEFAULT,
  },
  menuSection: {
    marginVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  menuItemArrow: {
    fontSize: 24,
    color: colors.text.tertiary,
  },
  logoutButton: {
    margin: 24,
    padding: 16,
    backgroundColor: colors.status.error + '10',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.status.error,
  },
  versionText: {
    textAlign: 'center',
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    marginBottom: 24,
  },
});

export default ProfileScreen;
