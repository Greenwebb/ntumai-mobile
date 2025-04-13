import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface DeliveryStatus {
  status: 'pending' | 'confirmed' | 'preparing' | 'ready_for_pickup' | 'picked_up' | 'in_transit' | 'delivered';
  timestamp: string;
}

interface DeliveryDriver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  image?: string;
}

interface DeliveryLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface DeliveryTrackingScreenProps {
  orderId: string;
  orderDate: string;
  estimatedDeliveryTime: string;
  currentStatus: DeliveryStatus;
  statusHistory: DeliveryStatus[];
  driver?: DeliveryDriver;
  pickupLocation: DeliveryLocation;
  deliveryLocation: DeliveryLocation;
  onBack: () => void;
  onContactDriver: (driverId: string) => void;
  onContactSupport: () => void;
  onViewOrderDetails: () => void;
}

const DeliveryTrackingScreen: React.FC<DeliveryTrackingScreenProps> = ({
  orderId,
  orderDate,
  estimatedDeliveryTime,
  currentStatus,
  statusHistory,
  driver,
  pickupLocation,
  deliveryLocation,
  onBack,
  onContactDriver,
  onContactSupport,
  onViewOrderDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'tracking' | 'details'>('tracking');

  // Helper function to format status for display
  const formatStatus = (status: string): string => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Tracking</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Order Info */}
      <View style={styles.orderInfoContainer}>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Order ID:</Text>
          <Text style={styles.orderInfoValue}>{orderId}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Order Date:</Text>
          <Text style={styles.orderInfoValue}>{orderDate}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Estimated Delivery:</Text>
          <Text style={styles.orderInfoValue}>{estimatedDeliveryTime}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'tracking' && styles.activeTab
          ]}
          onPress={() => setActiveTab('tracking')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'tracking' && styles.activeTabText
            ]}
          >
            Tracking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'details' && styles.activeTab
          ]}
          onPress={() => setActiveTab('details')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'details' && styles.activeTabText
            ]}
          >
            Details
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'tracking' ? (
          <View style={styles.trackingContent}>
            {/* Status Bar */}
            <View style={styles.statusBarContainer}>
              <Text style={styles.currentStatusText}>
                {formatStatus(currentStatus.status)}
              </Text>
              
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { 
                      width: `${(statusHistory.findIndex(s => s.status === currentStatus.status) + 1) / 
                        statusHistory.length * 100}%` 
                    }
                  ]}
                />
              </View>
              
              <View style={styles.statusStepsContainer}>
                {statusHistory.map((status, index) => {
                  const isCompleted = statusHistory.findIndex(s => s.status === currentStatus.status) >= index;
                  const isCurrent = status.status === currentStatus.status;
                  
                  return (
                    <View key={status.status} style={styles.statusStep}>
                      <View 
                        style={[
                          styles.statusDot,
                          isCompleted && styles.completedStatusDot,
                          isCurrent && styles.currentStatusDot
                        ]}
                      >
                        {isCompleted && <Text style={styles.statusDotCheck}>✓</Text>}
                      </View>
                      <Text 
                        style={[
                          styles.statusStepText,
                          isCompleted && styles.completedStatusStepText,
                          isCurrent && styles.currentStatusStepText
                        ]}
                      >
                        {formatStatus(status.status)}
                      </Text>
                      <Text style={styles.statusTimestamp}>{status.timestamp}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
              <Text style={styles.mapPlaceholder}>Map View</Text>
              <Text style={styles.mapPlaceholderSubtext}>
                Delivery route from {pickupLocation.address} to {deliveryLocation.address}
              </Text>
            </View>

            {/* Driver Info */}
            {driver && (
              <View style={styles.driverContainer}>
                <Text style={styles.sectionTitle}>Delivery Driver</Text>
                <View style={styles.driverCard}>
                  <View style={styles.driverImageContainer}>
                    <Text style={styles.driverImagePlaceholder}>👤</Text>
                  </View>
                  <View style={styles.driverInfo}>
                    <Text style={styles.driverName}>{driver.name}</Text>
                    <View style={styles.driverRatingContainer}>
                      <Text style={styles.driverRatingIcon}>⭐</Text>
                      <Text style={styles.driverRating}>{driver.rating.toFixed(1)}</Text>
                    </View>
                    <Text style={styles.driverPhone}>{driver.phone}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.contactDriverButton}
                    onPress={() => onContactDriver(driver.id)}
                  >
                    <Text style={styles.contactDriverButtonText}>Contact</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Support Button */}
            <TouchableOpacity 
              style={styles.supportButton}
              onPress={onContactSupport}
            >
              <Text style={styles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.detailsContent}>
            {/* Order Details Button */}
            <TouchableOpacity 
              style={styles.viewOrderButton}
              onPress={onViewOrderDetails}
            >
              <Text style={styles.viewOrderButtonText}>View Order Details</Text>
            </TouchableOpacity>

            {/* Pickup Location */}
            <View style={styles.locationSection}>
              <Text style={styles.sectionTitle}>Pickup Location</Text>
              <View style={styles.locationCard}>
                <Text style={styles.locationIcon}>🏪</Text>
                <Text style={styles.locationAddress}>{pickupLocation.address}</Text>
              </View>
            </View>

            {/* Delivery Location */}
            <View style={styles.locationSection}>
              <Text style={styles.sectionTitle}>Delivery Location</Text>
              <View style={styles.locationCard}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.locationAddress}>{deliveryLocation.address}</Text>
              </View>
            </View>

            {/* Status History */}
            <View style={styles.historySection}>
              <Text style={styles.sectionTitle}>Status History</Text>
              {statusHistory.map((status, index) => (
                <View key={index} style={styles.historyItem}>
                  <View style={styles.historyItemDot} />
                  <View style={styles.historyItemContent}>
                    <Text style={styles.historyItemStatus}>{formatStatus(status.status)}</Text>
                    <Text style={styles.historyItemTimestamp}>{status.timestamp}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
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
  orderInfoContainer: {
    padding: 16,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderInfoLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  orderInfoValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary.DEFAULT,
  },
  tabText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  trackingContent: {
    padding: 16,
  },
  statusBarContainer: {
    marginBottom: 24,
  },
  currentStatusText: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.neutral.gray200,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 4,
  },
  statusStepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusStep: {
    alignItems: 'center',
    width: 60,
  },
  statusDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  completedStatusDot: {
    backgroundColor: colors.primary.DEFAULT,
  },
  currentStatusDot: {
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
  statusDotCheck: {
    color: colors.neutral.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusStepText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 2,
  },
  completedStatusStepText: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  currentStatusStepText: {
    color: colors.primary.DEFAULT,
    fontWeight: 'bold',
  },
  statusTimestamp: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  mapContainer: {
    height: 200,
    backgroundColor: colors.neutral.gray100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  mapPlaceholder: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  mapPlaceholderSubtext: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  driverContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
  },
  driverImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverImagePlaceholder: {
    fontSize: 24,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  driverRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  driverRatingIcon: {
    fontSize: 12,
    color: colors.status.warning,
    marginRight: 4,
  },
  driverRating: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  driverPhone: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  contactDriverButton: {
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  contactDriverButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.neutral.white,
  },
  supportButton: {
    backgroundColor: colors.background.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  detailsContent: {
    padding: 16,
  },
  viewOrderButton: {
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  viewOrderButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.neutral.white,
  },
  locationSection: {
    marginBottom: 24,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
  },
  locationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  locationAddress: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    flex: 1,
  },
  historySection: {
    marginBottom: 24,
  },
  historyItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  historyItemDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary.DEFAULT,
    marginTop: 4,
    marginRight: 12,
  },
  historyItemContent: {
    flex: 1,
  },
  historyItemStatus: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  historyItemTimestamp: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
});

export default DeliveryTrackingScreen;
