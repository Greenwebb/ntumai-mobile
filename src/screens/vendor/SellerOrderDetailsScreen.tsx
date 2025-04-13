<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useVendorStore } from '../../store/vendorStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { OrderStatusBar } from '../../components/OrderStatusBar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const SellerOrderDetailsScreen = ({ navigation, route }: any) => {
  const { orderId } = route.params || {};
  
  const { 
    orders, 
    fetchOrderById, 
    updateOrderStatus,
    isLoading 
  } = useVendorStore();
  
  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId]);
  
  const order = orders.find(o => o.id === orderId);
  
  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error('Status update error:', error);
    }
  };
  
  if (isLoading || !order) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <Header title="Order Details" onBack={() => navigation.goBack()} />
        <StyledView className="flex-1 items-center justify-center">
          <StyledText>Loading...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title={`Order #${order.id}`} onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Order Status */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Order Status</StyledText>
          
          <OrderStatusBar status={order.status} />
          
          <StyledView className="flex-row flex-wrap mt-4">
            {order.status !== 'processing' && (
              <Button
                title="Mark as Processing"
                variant="outline"
                size="sm"
                onPress={() => handleStatusUpdate('processing')}
                style={{ marginRight: 8, marginBottom: 8 }}
              />
            )}
            
            {order.status !== 'completed' && (
              <Button
                title="Mark as Completed"
                variant="outline"
                size="sm"
                onPress={() => handleStatusUpdate('completed')}
                style={{ marginRight: 8, marginBottom: 8 }}
              />
            )}
            
            {order.status !== 'cancelled' && (
              <Button
                title="Cancel Order"
                variant="danger"
                size="sm"
                onPress={() => handleStatusUpdate('cancelled')}
                style={{ marginBottom: 8 }}
              />
            )}
          </StyledView>
        </StyledView>
        
        {/* Customer Info */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Customer Information</StyledText>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Name</StyledText>
            <StyledText className="font-medium">John Doe</StyledText>
          </StyledView>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Phone</StyledText>
            <StyledText className="font-medium">+1 234 567 8901</StyledText>
          </StyledView>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Email</StyledText>
            <StyledText className="font-medium">john.doe@example.com</StyledText>
          </StyledView>
        </StyledView>
        
        {/* Delivery Address */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Delivery Address</StyledText>
          
          <StyledView className="bg-gray-100 rounded-lg p-3">
            <StyledText className="font-medium mb-1">{order.address.name}</StyledText>
            <StyledText className="text-gray-700">{order.address.street}</StyledText>
            <StyledText className="text-gray-700">
              {order.address.city}, {order.address.state} {order.address.zipCode}
            </StyledText>
          </StyledView>
        </StyledView>
        
        {/* Order Items */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Order Items</StyledText>
          
          {order.items.map((item, index) => (
            <StyledView 
              key={index} 
              className="flex-row justify-between items-center mb-3 pb-3 border-b border-gray-100"
            >
              <StyledView className="flex-row items-center flex-1">
                <StyledView className="w-10 h-10 bg-gray-200 rounded items-center justify-center mr-3">
                  <StyledText>🥗</StyledText>
                </StyledView>
                
                <StyledView className="flex-1">
                  <StyledText className="font-medium">{item.product.name}</StyledText>
                  <StyledText className="text-gray-500">
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </StyledText>
                </StyledView>
              </StyledView>
              
              <StyledText className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </StyledText>
            </StyledView>
          ))}
        </StyledView>
        
        {/* Payment Info */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Payment Information</StyledText>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Payment Method</StyledText>
            <StyledText className="font-medium">{order.paymentMethod}</StyledText>
          </StyledView>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Payment Status</StyledText>
            <StyledView className="bg-green-100 self-start px-2 py-1 rounded-full">
              <StyledText className="text-green-700 text-xs">Paid</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
        
        {/* Order Summary */}
        <StyledView className="p-4">
          <StyledText className="text-lg font-bold mb-4">Order Summary</StyledText>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Subtotal</StyledText>
            <StyledText>${(order.total * 0.9).toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Tax</StyledText>
            <StyledText>${(order.total * 0.05).toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Delivery Fee</StyledText>
            <StyledText>${(order.total * 0.05).toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
            <StyledText className="font-bold">Total</StyledText>
            <StyledText className="font-bold text-primary">${order.total.toFixed(2)}</StyledText>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  options?: {
    name: string;
    value: string;
  }[];
  subtotal: number;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  customer: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
  };
  deliveryAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
  };
  deliveryNotes?: string;
  paymentMethod: string;
  deliveryFee: number;
  tax: number;
}

interface SellerOrderDetailsScreenProps {
  order: Order;
  onBack: () => void;
  onUpdateStatus: (orderId: string, status: 'pending' | 'processing' | 'completed' | 'cancelled') => void;
  onContactCustomer: (customerId: string) => void;
}

const SellerOrderDetailsScreen: React.FC<SellerOrderDetailsScreenProps> = ({
  order,
  onBack,
  onUpdateStatus,
  onContactCustomer,
}) => {
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const handleStatusChange = (status: 'pending' | 'processing' | 'completed' | 'cancelled') => {
    onUpdateStatus(order.id, status);
    setShowStatusOptions(false);
  };

  const formatAddress = (address: Order['deliveryAddress']): string => {
    let formattedAddress = address.addressLine1;
    if (address.addressLine2) {
      formattedAddress += `, ${address.addressLine2}`;
    }
    formattedAddress += `, ${address.city}, ${address.state} ${address.postalCode}`;
    if (address.country) {
      formattedAddress += `, ${address.country}`;
    }
    return formattedAddress;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Order Info */}
        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Order ID:</Text>
            <Text style={styles.orderInfoValue}>#{order.id}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Date:</Text>
            <Text style={styles.orderInfoValue}>{order.date}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Status:</Text>
            <View style={styles.statusContainer}>
              <TouchableOpacity 
                style={[
                  styles.statusBadge,
                  order.status === 'completed' ? styles.completedBadge :
                  order.status === 'pending' ? styles.pendingBadge :
                  order.status === 'processing' ? styles.processingBadge :
                  styles.cancelledBadge
                ]}
                onPress={() => setShowStatusOptions(!showStatusOptions)}
              >
                <Text 
                  style={[
                    styles.statusText,
                    order.status === 'completed' ? styles.completedText :
                    order.status === 'pending' ? styles.pendingText :
                    order.status === 'processing' ? styles.processingText :
                    styles.cancelledText
                  ]}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Text>
                <Text style={styles.statusDropdownIcon}>▼</Text>
              </TouchableOpacity>
              
              {showStatusOptions && (
                <View style={styles.statusOptionsContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.statusOption,
                      order.status === 'pending' && styles.selectedStatusOption
                    ]}
                    onPress={() => handleStatusChange('pending')}
                  >
                    <Text 
                      style={[
                        styles.statusOptionText,
                        order.status === 'pending' && styles.selectedStatusOptionText
                      ]}
                    >
                      Pending
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.statusOption,
                      order.status === 'processing' && styles.selectedStatusOption
                    ]}
                    onPress={() => handleStatusChange('processing')}
                  >
                    <Text 
                      style={[
                        styles.statusOptionText,
                        order.status === 'processing' && styles.selectedStatusOptionText
                      ]}
                    >
                      Processing
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.statusOption,
                      order.status === 'completed' && styles.selectedStatusOption
                    ]}
                    onPress={() => handleStatusChange('completed')}
                  >
                    <Text 
                      style={[
                        styles.statusOptionText,
                        order.status === 'completed' && styles.selectedStatusOptionText
                      ]}
                    >
                      Completed
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.statusOption,
                      order.status === 'cancelled' && styles.selectedStatusOption
                    ]}
                    onPress={() => handleStatusChange('cancelled')}
                  >
                    <Text 
                      style={[
                        styles.statusOptionText,
                        order.status === 'cancelled' && styles.selectedStatusOptionText
                      ]}
                    >
                      Cancelled
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.customerCard}>
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{order.customer.name}</Text>
              {order.customer.phone && (
                <Text style={styles.customerContact}>{order.customer.phone}</Text>
              )}
              {order.customer.email && (
                <Text style={styles.customerContact}>{order.customer.email}</Text>
              )}
            </View>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => onContactCustomer(order.customer.id)}
            >
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <View style={styles.deliveryCard}>
            <Text style={styles.deliveryAddressLabel}>Delivery Address:</Text>
            <Text style={styles.deliveryAddress}>{formatAddress(order.deliveryAddress)}</Text>
            
            {order.deliveryNotes && (
              <>
                <Text style={styles.deliveryNotesLabel}>Delivery Notes:</Text>
                <Text style={styles.deliveryNotes}>{order.deliveryNotes}</Text>
              </>
            )}
            
            <Text style={styles.paymentMethodLabel}>Payment Method:</Text>
            <Text style={styles.paymentMethod}>{order.paymentMethod}</Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.orderItemsContainer}>
            {order.items.map(item => (
              <View key={item.id} style={styles.orderItem}>
                <View style={styles.orderItemInfo}>
                  <Text style={styles.orderItemName}>{item.name}</Text>
                  <Text style={styles.orderItemPrice}>${item.price.toFixed(2)} x {item.quantity}</Text>
                  
                  {item.options && item.options.length > 0 && (
                    <View style={styles.orderItemOptions}>
                      {item.options.map((option, index) => (
                        <Text key={index} style={styles.orderItemOption}>
                          {option.name}: {option.value}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
                <Text style={styles.orderItemSubtotal}>${item.subtotal.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                ${(order.total - order.deliveryFee - order.tax).toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>${order.deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${order.tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
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
  orderInfoContainer: {
    padding: 16,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderInfoLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  orderInfoValue: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  statusContainer: {
    position: 'relative',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  completedBadge: {
    backgroundColor: colors.status.success + '20',
  },
  pendingBadge: {
    backgroundColor: colors.status.warning + '20',
  },
  processingBadge: {
    backgroundColor: colors.primary.light,
  },
  cancelledBadge: {
    backgroundColor: colors.status.error + '20',
  },
  statusText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
  },
  completedText: {
    color: colors.status.success,
  },
  pendingText: {
    color: colors.status.warning,
  },
  processingText: {
    color: colors.primary.DEFAULT,
  },
  cancelledText: {
    color: colors.status.error,
  },
  statusDropdownIcon: {
    fontSize: 10,
    marginLeft: 4,
  },
  statusOptionsContainer: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 4,
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  statusOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  selectedStatusOption: {
    backgroundColor: colors.primary.light,
  },
  statusOptionText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  selectedStatusOptionText: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  customerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  customerContact: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  contactButton: {
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  contactButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.neutral.white,
  },
  deliveryCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
  },
  deliveryAddressLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  deliveryAddress: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  deliveryNotesLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  deliveryNotes: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  paymentMethodLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  orderItemsContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  orderItemInfo: {
    flex: 1,
    marginRight: 16,
  },
  orderItemName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  orderItemPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  orderItemOptions: {
    marginTop: 4,
  },
  orderItemOption: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    marginBottom: 2,
  },
  orderItemSubtotal: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.text.primary,
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
});

export default SellerOrderDetailsScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
