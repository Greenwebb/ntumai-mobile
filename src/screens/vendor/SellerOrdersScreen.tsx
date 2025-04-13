import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: number;
  customer: {
    id: string;
    name: string;
    phone?: string;
  };
  deliveryAddress: string;
}

interface SellerOrdersScreenProps {
  orders: Order[];
  onViewOrderDetails: (orderId: string) => void;
  onBack: () => void;
  onSearch: (query: string) => void;
  onFilter: (status: string) => void;
  onSort: (sortBy: 'date' | 'total') => void;
}

const SellerOrdersScreen: React.FC<SellerOrdersScreenProps> = ({
  orders,
  onViewOrderDetails,
  onBack,
  onSearch,
  onFilter,
  onSort,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'total'>('date');
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleStatusSelect = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
      onFilter('');
    } else {
      setSelectedStatus(status);
      onFilter(status);
    }
  };

  const handleSort = (sortOption: 'date' | 'total') => {
    setSortBy(sortOption);
    onSort(sortOption);
    setShowSortOptions(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search and Filter */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity 
            style={styles.searchBar}
            onPress={handleSearch}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>
              {searchQuery || 'Search orders...'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterSortContainer}>
          <TouchableOpacity 
            style={styles.filterSortButton}
            onPress={() => setShowSortOptions(!showSortOptions)}
          >
            <Text style={styles.filterSortButtonText}>↕️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sort Options Dropdown */}
      {showSortOptions && (
        <View style={styles.sortOptionsContainer}>
          <TouchableOpacity 
            style={[
              styles.sortOption,
              sortBy === 'date' && styles.selectedSortOption
            ]}
            onPress={() => handleSort('date')}
          >
            <Text 
              style={[
                styles.sortOptionText,
                sortBy === 'date' && styles.selectedSortOptionText
              ]}
            >
              Date (Newest First)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.sortOption,
              sortBy === 'total' && styles.selectedSortOption
            ]}
            onPress={() => handleSort('total')}
          >
            <Text 
              style={[
                styles.sortOptionText,
                sortBy === 'total' && styles.selectedSortOptionText
              ]}
            >
              Total (Highest First)
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Status Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statusFiltersContainer}
      >
        <TouchableOpacity 
          style={[
            styles.statusChip,
            selectedStatus === null && styles.selectedStatusChip
          ]}
          onPress={() => handleStatusSelect('')}
        >
          <Text 
            style={[
              styles.statusName,
              selectedStatus === null && styles.selectedStatusName
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.statusChip,
            selectedStatus === 'pending' && styles.selectedStatusChip
          ]}
          onPress={() => handleStatusSelect('pending')}
        >
          <Text 
            style={[
              styles.statusName,
              selectedStatus === 'pending' && styles.selectedStatusName
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.statusChip,
            selectedStatus === 'processing' && styles.selectedStatusChip
          ]}
          onPress={() => handleStatusSelect('processing')}
        >
          <Text 
            style={[
              styles.statusName,
              selectedStatus === 'processing' && styles.selectedStatusName
            ]}
          >
            Processing
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.statusChip,
            selectedStatus === 'completed' && styles.selectedStatusChip
          ]}
          onPress={() => handleStatusSelect('completed')}
        >
          <Text 
            style={[
              styles.statusName,
              selectedStatus === 'completed' && styles.selectedStatusName
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.statusChip,
            selectedStatus === 'cancelled' && styles.selectedStatusChip
          ]}
          onPress={() => handleStatusSelect('cancelled')}
        >
          <Text 
            style={[
              styles.statusName,
              selectedStatus === 'cancelled' && styles.selectedStatusName
            ]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.scrollView}>
        {/* Orders List */}
        <View style={styles.ordersContainer}>
          {orders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📦</Text>
              <Text style={styles.emptyStateTitle}>No orders found</Text>
              <Text style={styles.emptyStateMessage}>
                Orders will appear here once customers place them
              </Text>
            </View>
          ) : (
            orders.map(order => (
              <TouchableOpacity 
                key={order.id}
                style={styles.orderCard}
                onPress={() => onViewOrderDetails(order.id)}
              >
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                
                <View style={styles.orderCustomer}>
                  <Text style={styles.orderCustomerLabel}>Customer:</Text>
                  <Text style={styles.orderCustomerName}>{order.customer.name}</Text>
                </View>
                
                <View style={styles.orderDetails}>
                  <View>
                    <Text style={styles.orderItemsCount}>{order.items} items</Text>
                    <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
                  </View>
                  <View 
                    style={[
                      styles.orderStatusBadge,
                      order.status === 'completed' ? styles.completedBadge :
                      order.status === 'pending' ? styles.pendingBadge :
                      order.status === 'processing' ? styles.processingBadge :
                      styles.cancelledBadge
                    ]}
                  >
                    <Text 
                      style={[
                        styles.orderStatusText,
                        order.status === 'completed' ? styles.completedText :
                        order.status === 'pending' ? styles.pendingText :
                        order.status === 'processing' ? styles.processingText :
                        styles.cancelledText
                      ]}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.orderAddress}>
                  <Text style={styles.orderAddressLabel}>Delivery Address:</Text>
                  <Text style={styles.orderAddressText} numberOfLines={2}>
                    {order.deliveryAddress}
                  </Text>
                </View>
                
                <View style={styles.viewDetailsContainer}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </View>
              </TouchableOpacity>
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
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flex: 1,
    marginRight: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray100,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: colors.text.secondary,
  },
  searchPlaceholder: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
  },
  filterSortContainer: {
    flexDirection: 'row',
  },
  filterSortButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterSortButtonText: {
    fontSize: 16,
  },
  sortOptionsContainer: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  selectedSortOption: {
    backgroundColor: colors.primary.light,
  },
  sortOptionText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  selectedSortOptionText: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  statusFiltersContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  statusChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: colors.neutral.gray100,
    marginHorizontal: 4,
  },
  selectedStatusChip: {
    backgroundColor: colors.primary.light,
  },
  statusName: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  selectedStatusName: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  ordersContainer: {
    padding: 16,
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
    marginBottom: 12,
  },
  orderId: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  orderDate: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  orderCustomer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  orderCustomerLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginRight: 4,
  },
  orderCustomerName: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderItemsCount: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  orderStatusBadge: {
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
  orderStatusText: {
    fontSize: typography.fontSize.xs,
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
  orderAddress: {
    marginBottom: 12,
  },
  orderAddressLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  orderAddressText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  viewDetailsContainer: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  viewDetailsText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
});

export default SellerOrdersScreen;
