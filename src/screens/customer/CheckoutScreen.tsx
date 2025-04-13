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

interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet' | 'cod';
  name: string;
  details: string;
  isDefault?: boolean;
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedTime: string;
}

interface CheckoutScreenProps {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  deliveryOptions: DeliveryOption[];
  onAddAddress: () => void;
  onAddPaymentMethod: () => void;
  onSelectAddress: (addressId: string) => void;
  onSelectPaymentMethod: (paymentMethodId: string) => void;
  onSelectDeliveryOption: (deliveryOptionId: string) => void;
  onPlaceOrder: () => void;
  onBack: () => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  subtotal,
  deliveryFee,
  tax,
  total,
  addresses,
  paymentMethods,
  deliveryOptions,
  onAddAddress,
  onAddPaymentMethod,
  onSelectAddress,
  onSelectPaymentMethod,
  onSelectDeliveryOption,
  onPlaceOrder,
  onBack,
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses.find(a => a.isDefault)?.id || (addresses.length > 0 ? addresses[0].id : null)
  );
  
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(
    paymentMethods.find(p => p.isDefault)?.id || (paymentMethods.length > 0 ? paymentMethods[0].id : null)
  );
  
  const [selectedDeliveryOptionId, setSelectedDeliveryOptionId] = useState<string | null>(
    deliveryOptions.length > 0 ? deliveryOptions[0].id : null
  );

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    onSelectAddress(addressId);
  };

  const handlePaymentMethodSelect = (paymentMethodId: string) => {
    setSelectedPaymentMethodId(paymentMethodId);
    onSelectPaymentMethod(paymentMethodId);
  };

  const handleDeliveryOptionSelect = (deliveryOptionId: string) => {
    setSelectedDeliveryOptionId(deliveryOptionId);
    onSelectDeliveryOption(deliveryOptionId);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddressId || !selectedPaymentMethodId || !selectedDeliveryOptionId) {
      // Show error
      return;
    }
    
    onPlaceOrder();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={onAddAddress}>
              <Text style={styles.actionText}>+ Add New</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.addressesContainer}>
            {addresses.length === 0 ? (
              <TouchableOpacity 
                style={styles.addAddressButton}
                onPress={onAddAddress}
              >
                <Text style={styles.addAddressButtonText}>+ Add Delivery Address</Text>
              </TouchableOpacity>
            ) : (
              addresses.map(address => (
                <TouchableOpacity
                  key={address.id}
                  style={[
                    styles.addressCard,
                    selectedAddressId === address.id && styles.selectedAddressCard
                  ]}
                  onPress={() => handleAddressSelect(address.id)}
                >
                  <View style={styles.addressHeader}>
                    <Text 
                      style={[
                        styles.addressName,
                        selectedAddressId === address.id && styles.selectedAddressText
                      ]}
                    >
                      {address.name}
                    </Text>
                    {address.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>Default</Text>
                      </View>
                    )}
                  </View>
                  
                  <Text 
                    style={[
                      styles.addressText,
                      selectedAddressId === address.id && styles.selectedAddressText
                    ]}
                  >
                    {address.addressLine1}
                  </Text>
                  
                  {address.addressLine2 && (
                    <Text 
                      style={[
                        styles.addressText,
                        selectedAddressId === address.id && styles.selectedAddressText
                      ]}
                    >
                      {address.addressLine2}
                    </Text>
                  )}
                  
                  <Text 
                    style={[
                      styles.addressText,
                      selectedAddressId === address.id && styles.selectedAddressText
                    ]}
                  >
                    {`${address.city}, ${address.state} ${address.postalCode}`}
                  </Text>
                  
                  {address.phone && (
                    <Text 
                      style={[
                        styles.addressPhone,
                        selectedAddressId === address.id && styles.selectedAddressText
                      ]}
                    >
                      {address.phone}
                    </Text>
                  )}
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity onPress={onAddPaymentMethod}>
              <Text style={styles.actionText}>+ Add New</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.paymentMethodsContainer}>
            {paymentMethods.length === 0 ? (
              <TouchableOpacity 
                style={styles.addPaymentButton}
                onPress={onAddPaymentMethod}
              >
                <Text style={styles.addPaymentButtonText}>+ Add Payment Method</Text>
              </TouchableOpacity>
            ) : (
              paymentMethods.map(method => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethodCard,
                    selectedPaymentMethodId === method.id && styles.selectedPaymentMethodCard
                  ]}
                  onPress={() => handlePaymentMethodSelect(method.id)}
                >
                  <View style={styles.paymentMethodHeader}>
                    <Text style={styles.paymentMethodIcon}>
                      {method.type === 'card' ? '💳' : method.type === 'wallet' ? '👛' : '💵'}
                    </Text>
                    <View style={styles.paymentMethodInfo}>
                      <Text 
                        style={[
                          styles.paymentMethodName,
                          selectedPaymentMethodId === method.id && styles.selectedPaymentMethodText
                        ]}
                      >
                        {method.name}
                      </Text>
                      <Text 
                        style={[
                          styles.paymentMethodDetails,
                          selectedPaymentMethodId === method.id && styles.selectedPaymentMethodText
                        ]}
                      >
                        {method.details}
                      </Text>
                    </View>
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>Default</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        {/* Delivery Options Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Options</Text>
          </View>
          
          <View style={styles.deliveryOptionsContainer}>
            {deliveryOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.deliveryOptionCard,
                  selectedDeliveryOptionId === option.id && styles.selectedDeliveryOptionCard
                ]}
                onPress={() => handleDeliveryOptionSelect(option.id)}
              >
                <View style={styles.deliveryOptionInfo}>
                  <Text 
                    style={[
                      styles.deliveryOptionName,
                      selectedDeliveryOptionId === option.id && styles.selectedDeliveryOptionText
                    ]}
                  >
                    {option.name}
                  </Text>
                  <Text 
                    style={[
                      styles.deliveryOptionDescription,
                      selectedDeliveryOptionId === option.id && styles.selectedDeliveryOptionText
                    ]}
                  >
                    {option.description}
                  </Text>
                  <Text 
                    style={[
                      styles.deliveryOptionTime,
                      selectedDeliveryOptionId === option.id && styles.selectedDeliveryOptionText
                    ]}
                  >
                    Estimated delivery: {option.estimatedTime}
                  </Text>
                </View>
                <Text 
                  style={[
                    styles.deliveryOptionPrice,
                    selectedDeliveryOptionId === option.id && styles.selectedDeliveryOptionText
                  ]}
                >
                  ${option.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          disabled={!selectedAddressId || !selectedPaymentMethodId || !selectedDeliveryOptionId}
        >
          <Text style={styles.placeOrderButtonText}>
            Place Order - ${total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
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
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  actionText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  addressesContainer: {
    gap: 12,
  },
  addAddressButton: {
    borderWidth: 1,
    borderColor: colors.primary.DEFAULT,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAddressButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  addressCard: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 16,
  },
  selectedAddressCard: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.light,
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
  selectedAddressText: {
    color: colors.primary.DEFAULT,
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
  paymentMethodsContainer: {
    gap: 12,
  },
  addPaymentButton: {
    borderWidth: 1,
    borderColor: colors.primary.DEFAULT,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPaymentButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  paymentMethodCard: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 16,
  },
  selectedPaymentMethodCard: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.light,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  selectedPaymentMethodText: {
    color: colors.primary.DEFAULT,
  },
  paymentMethodDetails: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  deliveryOptionsContainer: {
    gap: 12,
  },
  deliveryOptionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 16,
  },
  selectedDeliveryOptionCard: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.light,
  },
  deliveryOptionInfo: {
    flex: 1,
  },
  deliveryOptionName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  selectedDeliveryOptionText: {
    color: colors.primary.DEFAULT,
  },
  deliveryOptionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  deliveryOptionTime: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
  },
  deliveryOptionPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginLeft: 16,
  },
  summaryContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  totalLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  placeOrderButton: {
    backgroundColor: colors.primary.DEFAULT,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
});

export default CheckoutScreen;
