import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
  phone?: string;
}

interface AddressesScreenProps {
  addresses: Address[];
  onAddAddress: () => void;
  onEditAddress: (addressId: string) => void;
  onDeleteAddress: (addressId: string) => void;
  onSetDefaultAddress: (addressId: string) => void;
  onBack: () => void;
}

const AddressesScreen: React.FC<AddressesScreenProps> = ({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  onBack,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDeletePress = (addressId: string) => {
    setShowDeleteConfirm(addressId);
  };

  const handleDeleteConfirm = (addressId: string) => {
    onDeleteAddress(addressId);
    setShowDeleteConfirm(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Add Address Button */}
        <TouchableOpacity 
          style={styles.addAddressButton}
          onPress={onAddAddress}
        >
          <Text style={styles.addAddressButtonText}>+ Add New Address</Text>
        </TouchableOpacity>

        {/* Addresses List */}
        <View style={styles.addressesList}>
          {addresses.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📍</Text>
              <Text style={styles.emptyStateTitle}>No addresses saved</Text>
              <Text style={styles.emptyStateMessage}>
                Add an address to make checkout faster
              </Text>
            </View>
          ) : (
            addresses.map(address => (
              <View key={address.id} style={styles.addressCard}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressName}>{address.name}</Text>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>Default</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.addressText}>{address.addressLine1}</Text>
                {address.addressLine2 && (
                  <Text style={styles.addressText}>{address.addressLine2}</Text>
                )}
                <Text style={styles.addressText}>
                  {`${address.city}, ${address.state} ${address.postalCode}`}
                </Text>
                {address.country && (
                  <Text style={styles.addressText}>{address.country}</Text>
                )}
                {address.phone && (
                  <Text style={styles.addressPhone}>{address.phone}</Text>
                )}
                
                <View style={styles.addressActions}>
                  {!address.isDefault && (
                    <TouchableOpacity 
                      style={styles.setDefaultButton}
                      onPress={() => onSetDefaultAddress(address.id)}
                    >
                      <Text style={styles.setDefaultButtonText}>Set as Default</Text>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => onEditAddress(address.id)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeletePress(address.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                
                {showDeleteConfirm === address.id && (
                  <View style={styles.deleteConfirmContainer}>
                    <Text style={styles.deleteConfirmText}>
                      Are you sure you want to delete this address?
                    </Text>
                    <View style={styles.deleteConfirmActions}>
                      <TouchableOpacity 
                        style={styles.deleteConfirmCancelButton}
                        onPress={handleDeleteCancel}
                      >
                        <Text style={styles.deleteConfirmCancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.deleteConfirmButton}
                        onPress={() => handleDeleteConfirm(address.id)}
                      >
                        <Text style={styles.deleteConfirmButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  addAddressButton: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.primary.light,
    borderRadius: 8,
    alignItems: 'center',
  },
  addAddressButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.primary.DEFAULT,
  },
  addressesList: {
    padding: 16,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  addressCard: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  defaultBadge: {
    backgroundColor: colors.primary.DEFAULT,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  defaultBadgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.white,
    fontWeight: '500',
  },
  addressText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: 4,
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  setDefaultButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  setDefaultButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  editButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.status.error,
  },
  deleteConfirmContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.neutral.gray100,
    borderRadius: 8,
  },
  deleteConfirmText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    marginBottom: 12,
  },
  deleteConfirmActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteConfirmCancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  deleteConfirmCancelButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  deleteConfirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.status.error,
    borderRadius: 4,
  },
  deleteConfirmButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.white,
  },
});

export default AddressesScreen;
