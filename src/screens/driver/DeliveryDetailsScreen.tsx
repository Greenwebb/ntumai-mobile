<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { useDriverStore } from '../../store/driverStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { OrderStatusBar } from '../../components/OrderStatusBar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export const DeliveryDetailsScreen = ({ navigation, route }: any) => {
  const { deliveryId } = route.params || {};
  
  const { 
    deliveries, 
    fetchDeliveryById, 
    updateDeliveryStatus,
    isLoading 
  } = useDriverStore();
  
  useEffect(() => {
    fetchDeliveryById(deliveryId);
  }, [deliveryId]);
  
  const delivery = deliveries.find(d => d.id === deliveryId);
  
  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateDeliveryStatus(deliveryId, newStatus);
      
      if (newStatus === 'delivered') {
        // Navigate back to dashboard after marking as delivered
        setTimeout(() => {
          navigation.navigate('RiderDashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('Status update error:', error);
    }
  };
  
  if (isLoading || !delivery) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <Header title="Delivery Details" onBack={() => navigation.goBack()} />
        <StyledView className="flex-1 items-center justify-center">
          <StyledText>Loading...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title={`Delivery #${delivery.id}`} onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Delivery Status */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Delivery Status</StyledText>
          
          <OrderStatusBar status={delivery.status} />
          
          <StyledView className="mt-4">
            {delivery.status === 'ready' && (
              <Button
                title="Accept & Start Delivery"
                variant="primary"
                size="lg"
                fullWidth
                onPress={() => handleStatusUpdate('on_the_way')}
              />
            )}
            
            {delivery.status === 'on_the_way' && (
              <Button
                title="Mark as Delivered"
                variant="primary"
                size="lg"
                fullWidth
                onPress={() => handleStatusUpdate('delivered')}
              />
            )}
          </StyledView>
        </StyledView>
        
        {/* Pickup Location */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Pickup Location</StyledText>
          
          <StyledView className="bg-gray-100 rounded-lg p-3">
            <StyledText className="font-medium mb-1">{delivery.restaurant.name}</StyledText>
            <StyledText className="text-gray-700">{delivery.restaurant.address}</StyledText>
            <StyledText className="text-gray-700">{delivery.restaurant.phone}</StyledText>
          </StyledView>
          
          <Button
            title="Navigate to Pickup"
            variant="outline"
            size="md"
            onPress={() => {}}
            style={{ marginTop: 12 }}
          />
        </StyledView>
        
        {/* Delivery Location */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Delivery Location</StyledText>
          
          <StyledView className="bg-gray-100 rounded-lg p-3">
            <StyledText className="font-medium mb-1">{delivery.customer.name}</StyledText>
            <StyledText className="text-gray-700">{delivery.address.street}</StyledText>
            <StyledText className="text-gray-700">
              {delivery.address.city}, {delivery.address.state} {delivery.address.zipCode}
            </StyledText>
            <StyledText className="text-gray-700 mt-1">{delivery.customer.phone}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row mt-3">
            <Button
              title="Navigate"
              variant="outline"
              size="md"
              onPress={() => {}}
              style={{ flex: 1, marginRight: 8 }}
            />
            
            <Button
              title="Call Customer"
              variant="outline"
              size="md"
              onPress={() => {}}
              style={{ flex: 1 }}
            />
          </StyledView>
        </StyledView>
        
        {/* Order Items */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Order Items</StyledText>
          
          {delivery.items.map((item, index) => (
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
                    Qty: {item.quantity}
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>
          ))}
          
          <StyledView className="bg-yellow-50 p-3 rounded-lg mt-2">
            <StyledText className="text-yellow-700">
              Special instructions: {delivery.specialInstructions || 'None'}
            </StyledText>
          </StyledView>
        </StyledView>
        
        {/* Delivery Summary */}
        <StyledView className="p-4">
          <StyledText className="text-lg font-bold mb-4">Delivery Summary</StyledText>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Order Total</StyledText>
            <StyledText>${delivery.total.toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Payment Method</StyledText>
            <StyledText>{delivery.paymentMethod}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Payment Status</StyledText>
            <StyledView className="bg-green-100 px-2 py-1 rounded-full">
              <StyledText className="text-green-700 text-xs">Paid</StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
            <StyledText className="font-bold">Your Earnings</StyledText>
            <StyledText className="font-bold text-primary">${delivery.driverEarnings.toFixed(2)}</StyledText>
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

interface DeliveryOrder {
  id: string;
  status: 'accepted' | 'picked_up' | 'in_transit' | 'delivered';
  pickupLocation: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  deliveryLocation: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  customer: {
    name: string;
    phone?: string;
  };
  vendor: {
    name: string;
    phone?: string;
  };
  items: {
    id: string;
    name: string;
    quantity: number;
  }[];
  total: number;
  distance: number;
  estimatedTime: string;
  earnings: number;
  orderTime: string;
  deliveryNotes?: string;
}

interface DeliveryDetailsScreenProps {
  order: DeliveryOrder;
  onBack: () => void;
  onUpdateStatus: (orderId: string, status: 'accepted' | 'picked_up' | 'in_transit' | 'delivered') => void;
  onNavigateToPickup: (coordinates: { latitude: number; longitude: number }) => void;
  onNavigateToDelivery: (coordinates: { latitude: number; longitude: number }) => void;
  onContactCustomer: (phone?: string) => void;
  onContactVendor: (phone?: string) => void;
  onContactSupport: () => void;
}

const DeliveryDetailsScreen: React.FC<DeliveryDetailsScreenProps> = ({
  order,
  onBack,
  onUpdateStatus,
  onNavigateToPickup,
  onNavigateToDelivery,
  onContactCustomer,
  onContactVendor,
  onContactSupport,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const getNextStatus = (): 'picked_up' | 'in_transit' | 'delivered' | null => {
    switch (order.status) {
      case 'accepted':
        return 'picked_up';
      case 'picked_up':
        return 'in_transit';
      case 'in_transit':
        return 'delivered';
      default:
        return null;
    }
  };

  const getStatusButtonText = (): string => {
    switch (order.status) {
      case 'accepted':
        return 'Confirm Pickup';
      case 'picked_up':
        return 'Start Delivery';
      case 'in_transit':
        return 'Complete Delivery';
      default:
        return '';
    }
  };

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus();
    if (nextStatus) {
      if (nextStatus === 'delivered') {
        setShowConfirmation(true);
      } else {
        onUpdateStatus(order.id, nextStatus);
      }
    }
  };

  const handleConfirmDelivery = () => {
    onUpdateStatus(order.id, 'delivered');
    setShowConfirmation(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Details</Text>
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
            <Text style={styles.orderInfoLabel}>Order Time:</Text>
            <Text style={styles.orderInfoValue}>{order.orderTime}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Status:</Text>
            <View 
              style={[
                styles.statusBadge,
                order.status === 'accepted' ? styles.acceptedBadge :
                order.status === 'picked_up' ? styles.pickedUpBadge :
                order.status === 'in_transit' ? styles.inTransitBadge :
                styles.deliveredBadge
              ]}
            >
              <Text 
                style={[
                  styles.statusText,
                  order.status === 'accepted' ? styles.acceptedText :
                  order.status === 'picked_up' ? styles.pickedUpText :
                  order.status === 'in_transit' ? styles.inTransitText :
                  styles.deliveredText
                ]}
              >
                {order.status.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Text>
            </View>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Earnings:</Text>
            <Text style={styles.earningsValue}>${order.earnings.toFixed(2)}</Text>
          </View>
        </View>

        {/* Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Locations</Text>
          
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationType}>Pickup Location</Text>
              <TouchableOpacity 
                style={styles.navigateButton}
                onPress={() => onNavigateToPickup(order.pickupLocation.coordinates)}
              >
                <Text style={styles.navigateButtonText}>Navigate</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.locationAddress}>{order.pickupLocation.address}</Text>
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorLabel}>Vendor:</Text>
              <Text style={styles.vendorName}>{order.vendor.name}</Text>
              {order.vendor.phone && (
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => onContactVendor(order.vendor.phone)}
                >
                  <Text style={styles.contactButtonText}>Call</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <View style={styles.locationDivider}>
            <View style={styles.locationDividerLine} />
            <Text style={styles.locationDividerDistance}>{order.distance.toFixed(1)} km</Text>
            <View style={styles.locationDividerLine} />
          </View>
          
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationType}>Delivery Location</Text>
              <TouchableOpacity 
                style={styles.navigateButton}
                onPress={() => onNavigateToDelivery(order.deliveryLocation.coordinates)}
              >
                <Text style={styles.navigateButtonText}>Navigate</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.locationAddress}>{order.deliveryLocation.address}</Text>
            <View style={styles.customerInfo}>
              <Text style={styles.customerLabel}>Customer:</Text>
              <Text style={styles.customerName}>{order.customer.name}</Text>
              {order.customer.phone && (
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => onContactCustomer(order.customer.phone)}
                >
                  <Text style={styles.contactButtonText}>Call</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {order.deliveryNotes && (
              <View style={styles.deliveryNotes}>
                <Text style={styles.deliveryNotesLabel}>Delivery Notes:</Text>
                <Text style={styles.deliveryNotesText}>{order.deliveryNotes}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.itemsContainer}>
            {order.items.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Support */}
        <TouchableOpacity 
          style={styles.supportButton}
          onPress={onContactSupport}
        >
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Action Button */}
      {order.status !== 'delivered' && (
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleStatusUpdate}
          >
            <Text style={styles.actionButtonText}>{getStatusButtonText()}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Delivery</Text>
            <Text style={styles.modalMessage}>
              Have you delivered all items to the customer?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowConfirmation(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalConfirmButton}
                onPress={handleConfirmDelivery}
              >
                <Text style={styles.modalConfirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    alignItems: 'center',
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
  earningsValue: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  acceptedBadge: {
    backgroundColor: colors.status.warning + '20',
  },
  pickedUpBadge: {
    backgroundColor: colors.primary.light,
  },
  inTransitBadge: {
    backgroundColor: colors.primary.DEFAULT + '20',
  },
  deliveredBadge: {
    backgroundColor: colors.status.success + '20',
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
  },
  acceptedText: {
    color: colors.status.warning,
  },
  pickedUpText: {
    color: colors.primary.DEFAULT,
  },
  inTransitText: {
    color: colors.primary.DEFAULT,
  },
  deliveredText: {
    color: colors.status.success,
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
  locationCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationType: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  navigateButton: {
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  navigateButtonText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
    color: colors.neutral.white,
  },
  locationAddress: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginRight: 4,
  },
  vendorName: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    flex: 1,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginRight: 4,
  },
  customerName: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    flex: 1,
  },
  contactButton: {
    backgroundColor: colors.primary.light,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  contactButtonText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  deliveryNotes: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  deliveryNotesLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  deliveryNotesText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  locationDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  locationDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.light,
  },
  locationDividerDistance: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    marginHorizontal: 8,
  },
  itemsContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  itemQuantity: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.primary.DEFAULT,
    marginRight: 8,
    width: 30,
  },
  itemName: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    flex: 1,
  },
  supportButton: {
    margin: 16,
    padding: 12,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  actionContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  actionButton: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    padding: 24,
  },
  modalTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  modalCancelButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  modalConfirmButton: {
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalConfirmButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.neutral.white,
  },
});

export default DeliveryDetailsScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
