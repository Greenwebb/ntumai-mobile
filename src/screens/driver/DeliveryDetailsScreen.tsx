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
