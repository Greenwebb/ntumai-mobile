<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useDriverStore } from '../../store/driverStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';
import { OrderCard } from '../../components/OrderCard';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const RiderDashboardScreen = ({ navigation }: any) => {
  const [isOnline, setIsOnline] = useState(true);
  const [filterStatus, setFilterStatus] = useState('available'); // 'available', 'ongoing', 'completed'
  
  const { 
    deliveries, 
    fetchDeliveries, 
    toggleOnlineStatus,
    stats,
    fetchStats,
    isLoading 
  } = useDriverStore();
  
  useEffect(() => {
    fetchDeliveries();
    fetchStats();
  }, []);
  
  const handleToggleStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    toggleOnlineStatus(newStatus);
  };
  
  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };
  
  const handleDeliveryPress = (deliveryId: string) => {
    navigation.navigate('DeliveryDetails', { deliveryId });
  };
  
  const filteredDeliveries = deliveries.filter(delivery => {
    if (filterStatus === 'available') return delivery.status === 'ready';
    if (filterStatus === 'ongoing') return delivery.status === 'on_the_way';
    if (filterStatus === 'completed') return delivery.status === 'delivered';
    return true;
  });
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header 
        title="Driver Dashboard" 
        showBackButton={false}
        rightComponent={
          <Button
            title={isOnline ? "Go Offline" : "Go Online"}
            variant={isOnline ? "danger" : "primary"}
            size="sm"
            onPress={handleToggleStatus}
          />
        }
      />
      
      <StyledView className="flex-1">
        {/* Status Indicator */}
        <StyledView className={`py-2 px-4 ${isOnline ? 'bg-green-100' : 'bg-gray-100'}`}>
          <StyledText className={`text-center ${isOnline ? 'text-green-700' : 'text-gray-700'}`}>
            {isOnline ? 'You are online and receiving delivery requests' : 'You are offline'}
          </StyledText>
        </StyledView>
        
        {/* Stats Cards */}
        <StyledView className="flex-row flex-wrap px-4 py-3">
          <StyledView className="w-1/2 p-2">
            <StyledView className="bg-blue-50 p-4 rounded-xl">
              <StyledText className="text-blue-500 font-medium mb-1">Today's Earnings</StyledText>
              <StyledText className="text-2xl font-bold">${stats.todayEarnings}</StyledText>
              <StyledText className="text-blue-500 text-xs">
                {stats.deliveriesToday} deliveries today
              </StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="w-1/2 p-2">
            <StyledView className="bg-green-50 p-4 rounded-xl">
              <StyledText className="text-green-500 font-medium mb-1">This Week</StyledText>
              <StyledText className="text-2xl font-bold">${stats.weekEarnings}</StyledText>
              <StyledText className="text-green-500 text-xs">
                {stats.deliveriesWeek} deliveries this week
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
        
        {/* Filter Tabs */}
        <StyledView className="flex-row justify-between px-4 py-2 border-b border-gray-200">
          {['available', 'ongoing', 'completed'].map((status) => (
            <StyledTouchableOpacity
              key={status}
              className={`py-2 px-4 ${
                filterStatus === status ? 'border-b-2 border-primary' : ''
              }`}
              onPress={() => handleFilterChange(status)}
            >
              <StyledText
                className={`font-medium ${
                  filterStatus === status ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </StyledText>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
        
        {isLoading ? (
          <StyledView className="flex-1 items-center justify-center">
            <StyledText>Loading...</StyledText>
          </StyledView>
        ) : filteredDeliveries.length === 0 ? (
          <StyledView className="flex-1 items-center justify-center p-4">
            <StyledText className="text-lg text-gray-500 text-center">
              {filterStatus === 'available' 
                ? 'No available deliveries at the moment' 
                : filterStatus === 'ongoing'
                ? 'No ongoing deliveries'
                : 'No completed deliveries'}
            </StyledText>
          </StyledView>
        ) : (
          <FlatList
            data={filteredDeliveries}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <OrderCard
                order={item}
                onPress={() => handleDeliveryPress(item.id)}
                style={{ marginBottom: 12 }}
                showDeliveryInfo
              />
            )}
          />
        )}
      </StyledView>
    </StyledSafeAreaView>
  );
};
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface DeliveryOrder {
  id: string;
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
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
  items: number;
  total: number;
  distance: number;
  estimatedTime: string;
  earnings: number;
}

interface RiderDashboardScreenProps {
  rider: {
    name: string;
    rating: number;
    totalEarnings: number;
    todayEarnings: number;
    completedDeliveries: number;
    isOnline: boolean;
  };
  availableOrders: DeliveryOrder[];
  activeOrders: DeliveryOrder[];
  onToggleOnlineStatus: () => void;
  onAcceptOrder: (orderId: string) => void;
  onViewOrderDetails: (orderId: string) => void;
  onViewEarnings: () => void;
  onViewProfile: () => void;
}

const RiderDashboardScreen: React.FC<RiderDashboardScreenProps> = ({
  rider,
  availableOrders,
  activeOrders,
  onToggleOnlineStatus,
  onAcceptOrder,
  onViewOrderDetails,
  onViewEarnings,
  onViewProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'active'>('available');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {rider.name}</Text>
          <Text style={styles.subGreeting}>Ready for deliveries?</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={onViewProfile}
        >
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Status Toggle */}
      <View style={styles.statusToggleContainer}>
        <View style={styles.statusInfo}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text 
            style={[
              styles.statusValue,
              rider.isOnline ? styles.onlineStatus : styles.offlineStatus
            ]}
          >
            {rider.isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.statusToggle,
            rider.isOnline ? styles.onlineToggle : styles.offlineToggle
          ]}
          onPress={onToggleOnlineStatus}
        >
          <View 
            style={[
              styles.statusToggleHandle,
              rider.isOnline ? styles.onlineToggleHandle : styles.offlineToggleHandle
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${rider.todayEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Today's Earnings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${rider.totalEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{rider.completedDeliveries}</Text>
            <Text style={styles.statLabel}>Completed Deliveries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{rider.rating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.earningsButton}
          onPress={onViewEarnings}
        >
          <Text style={styles.earningsButtonText}>View Detailed Earnings</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'available' && styles.activeTab
          ]}
          onPress={() => setActiveTab('available')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'available' && styles.activeTabText
            ]}
          >
            Available Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'active' && styles.activeTab
          ]}
          onPress={() => setActiveTab('active')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText
            ]}
          >
            Active Orders
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === 'available' ? (
          <View style={styles.ordersContainer}>
            {!rider.isOnline ? (
              <View style={styles.offlineMessage}>
                <Text style={styles.offlineMessageIcon}>📴</Text>
                <Text style={styles.offlineMessageTitle}>You're Offline</Text>
                <Text style={styles.offlineMessageText}>
                  Go online to see available orders
                </Text>
              </View>
            ) : availableOrders.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>🔍</Text>
                <Text style={styles.emptyStateTitle}>No Available Orders</Text>
                <Text style={styles.emptyStateMessage}>
                  New delivery requests will appear here
                </Text>
              </View>
            ) : (
              availableOrders.map(order => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={styles.orderEarnings}>${order.earnings.toFixed(2)}</Text>
                  </View>
                  
                  <View style={styles.orderLocations}>
                    <View style={styles.locationItem}>
                      <Text style={styles.locationIcon}>🏪</Text>
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationType}>Pickup</Text>
                        <Text style={styles.locationAddress} numberOfLines={1}>
                          {order.pickupLocation.address}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.locationDivider} />
                    
                    <View style={styles.locationItem}>
                      <Text style={styles.locationIcon}>📍</Text>
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationType}>Delivery</Text>
                        <Text style={styles.locationAddress} numberOfLines={1}>
                          {order.deliveryLocation.address}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.orderDetails}>
                    <View style={styles.orderDetailItem}>
                      <Text style={styles.orderDetailIcon}>📦</Text>
                      <Text style={styles.orderDetailText}>{order.items} items</Text>
                    </View>
                    <View style={styles.orderDetailItem}>
                      <Text style={styles.orderDetailIcon}>🛣️</Text>
                      <Text style={styles.orderDetailText}>{order.distance.toFixed(1)} km</Text>
                    </View>
                    <View style={styles.orderDetailItem}>
                      <Text style={styles.orderDetailIcon}>⏱️</Text>
                      <Text style={styles.orderDetailText}>{order.estimatedTime}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.acceptButton}
                    onPress={() => onAcceptOrder(order.id)}
                  >
                    <Text style={styles.acceptButtonText}>Accept Order</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        ) : (
          <View style={styles.ordersContainer}>
            {activeOrders.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>🛵</Text>
                <Text style={styles.emptyStateTitle}>No Active Orders</Text>
                <Text style={styles.emptyStateMessage}>
                  Your current deliveries will appear here
                </Text>
              </View>
            ) : (
              activeOrders.map(order => (
                <TouchableOpacity 
                  key={order.id} 
                  style={styles.orderCard}
                  onPress={() => onViewOrderDetails(order.id)}
                >
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <View 
                      style={[
                        styles.orderStatusBadge,
                        order.status === 'accepted' ? styles.acceptedBadge :
                        order.status === 'picked_up' ? styles.pickedUpBadge :
                        order.status === 'in_transit' ? styles.inTransitBadge :
                        styles.deliveredBadge
                      ]}
                    >
                      <Text 
                        style={[
                          styles.orderStatusText,
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
                  
                  <View style={styles.orderLocations}>
                    <View style={styles.locationItem}>
                      <Text style={styles.locationIcon}>🏪</Text>
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationType}>Pickup</Text>
                        <Text style={styles.locationAddress} numberOfLines={1}>
                          {order.pickupLocation.address}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.locationDivider} />
                    
                    <View style={styles.locationItem}>
                      <Text style={styles.locationIcon}>📍</Text>
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationType}>Delivery</Text>
                        <Text style={styles.locationAddress} numberOfLines={1}>
                          {order.deliveryLocation.address}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.orderDetails}>
                    <View style={styles.orderDetailItem}>
                      <Text style={styles.orderDetailIcon}>📦</Text>
                      <Text style={styles.orderDetailText}>{order.items} items</Text>
                    </View>
                    <View style={styles.orderDetailItem}>
                      <Text style={styles.orderDetailIcon}>🛣️</Text>
                      <Text style={styles.orderDetailText}>{order.distance.toFixed(1)} km</Text>
                    </View>
                    <View style={styles.orderDetailItem}>
                      <Text style={styles.orderDetailIcon}>⏱️</Text>
                      <Text style={styles.orderDetailText}>{order.estimatedTime}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.viewDetailsContainer}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 20,
  },
  statusToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    marginRight: 8,
  },
  statusValue: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
  },
  onlineStatus: {
    color: colors.status.success,
  },
  offlineStatus: {
    color: colors.status.error,
  },
  statusToggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  onlineToggle: {
    backgroundColor: colors.status.success,
  },
  offlineToggle: {
    backgroundColor: colors.neutral.gray300,
  },
  statusToggleHandle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.neutral.white,
  },
  onlineToggleHandle: {
    marginLeft: 'auto',
  },
  offlineToggleHandle: {
    marginLeft: 0,
  },
  statsContainer: {
    padding: 16,
    backgroundColor: colors.background.secondary,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  earningsButton: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  earningsButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.neutral.white,
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
  scrollView: {
    flex: 1,
  },
  ordersContainer: {
    padding: 16,
  },
  offlineMessage: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
  },
  offlineMessageIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  offlineMessageTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  offlineMessageText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
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
  orderCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  orderEarnings: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  orderStatusBadge: {
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
  orderStatusText: {
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
  orderLocations: {
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationInfo: {
    flex: 1,
  },
  locationType: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  locationDivider: {
    height: 16,
    width: 1,
    backgroundColor: colors.border.medium,
    marginLeft: 8,
    marginBottom: 8,
  },
  orderDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  orderDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  orderDetailIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  orderDetailText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  acceptButton: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.neutral.white,
  },
  viewDetailsContainer: {
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
});

export default RiderDashboardScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
