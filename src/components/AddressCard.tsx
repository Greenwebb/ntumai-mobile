import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

// Define the address interface
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

interface AddressCardProps {
  address: Address;
  onPress?: (address: Address) => void;
  onEdit?: (address: Address) => void;
  onDelete?: (address: Address) => void;
  isSelected?: boolean;
  style?: ViewStyle;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onPress,
  onEdit,
  onDelete,
  isSelected = false,
  style,
}) => {
  const {
    name,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
    phone,
  } = address;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        style,
      ]}
      onPress={() => onPress && onPress(address)}
      activeOpacity={0.8}
      className={`p-4 rounded-xl mb-3 border ${isSelected ? 'border-primary bg-teal-50' : 'border-gray-200 bg-white'}`}
    >
      <View style={styles.header} className="flex-row justify-between items-center mb-2">
        <View style={styles.nameContainer} className="flex-row items-center">
          <Text 
            style={styles.icon}
          >
            📍
          </Text>
          <Text 
            style={[styles.name, isSelected && styles.selectedText]} 
            className={`font-bold ${isSelected ? 'text-primary' : 'text-gray-800'}`}
          >
            {name}
          </Text>
          {isDefault && (
            <View style={styles.defaultBadge} className="bg-primary rounded-full px-2 py-0.5 ml-2">
              <Text style={styles.defaultText} className="text-white text-xs">Default</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionsContainer} className="flex-row">
          {onEdit && (
            <TouchableOpacity 
              onPress={() => onEdit(address)} 
              style={styles.actionButton}
              className="p-1 mr-2"
            >
              <Text>✏️</Text>
            </TouchableOpacity>
          )}
          
          {onDelete && (
            <TouchableOpacity 
              onPress={() => onDelete(address)} 
              style={styles.actionButton}
              className="p-1"
            >
              <Text>🗑️</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.addressContainer} className="ml-6">
        <Text 
          style={[styles.addressText, isSelected && styles.selectedText]}
          className={isSelected ? 'text-primary' : 'text-gray-800'}
        >
          {addressLine1}
        </Text>
        
        {addressLine2 && (
          <Text 
            style={[styles.addressText, isSelected && styles.selectedText]}
            className={isSelected ? 'text-primary' : 'text-gray-800'}
          >
            {addressLine2}
          </Text>
        )}
        
        <Text 
          style={[styles.addressText, isSelected && styles.selectedText]}
          className={isSelected ? 'text-primary' : 'text-gray-800'}
        >
          {`${city}, ${state} ${postalCode}`}
        </Text>
        
        {country && (
          <Text 
            style={[styles.addressText, isSelected && styles.selectedText]}
            className={isSelected ? 'text-primary' : 'text-gray-800'}
          >
            {country}
          </Text>
        )}
        
        {phone && (
          <Text 
            style={[styles.phoneText, isSelected && styles.selectedText]}
            className={`mt-1 ${isSelected ? 'text-primary' : 'text-gray-500'}`}
          >
            {phone}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  selectedContainer: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  name: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  defaultBadge: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.white,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
  },
  addressContainer: {
    marginLeft: 16,
  },
  addressText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  phoneText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: 4,
  },
  selectedText: {
    color: colors.primary.DEFAULT,
  },
});

export default AddressCard;
