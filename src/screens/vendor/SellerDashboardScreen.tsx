import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image?: string;
  category: string;
  inStock: boolean;
  soldCount: number;
}

interface SellerDashboardScreenProps {
  seller: {
    id: string;
    name: string;
    rating: number;
    totalSales: number;
    totalOrders: number;
    pendingOrders: number;
  };
  recentProducts: Product[];
  recentOrders: {
    id: string;
    date: string;
    status: string;
    total: number;
    items: number;
  }[];
  onViewAllProducts: () => void;
  onViewAllOrders: () => void;
  onAddProduct: () => void;
  onViewProduct: (productId: string) => void;
  onViewOrder: (orderId: string) => void;
  onViewReports: () => void;
  onViewProfile: () => void;
}

const SellerDashboardScreen: React.FC<SellerDashboardScreenProps> = ({
  seller,
  recentProducts,
  recentOrders,
  onViewAllProducts,
  onViewAllOrders,
  onAddProduct,
  onViewProduct,
  onViewOrder,
  onViewReports,
  onViewProfile,
}) => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {seller.name}</Text>
          <Text style={styles.subGreeting}>Welcome to your dashboard</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={onViewProfile}
        >
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.timeRangeSelector}>
            <TouchableOpacity 
              style={[
                styles.timeRangeButton,
                timeRange === 'today' && styles.activeTimeRangeButton
              ]}
              onPress={() => setTimeRange('today')}
            >
              <Text 
                style={[
                  styles.timeRangeButtonText,
                  timeRange === 'today' && styles.activeTimeRangeButtonText
                ]}
              >
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.timeRangeButton,
                timeRange === 'week' && styles.activeTimeRangeButton
              ]}
              onPress={() => setTimeRange('week')}
            >
              <Text 
                style={[
                  styles.timeRangeButtonText,
                  timeRange === 'week' && styles.activeTimeRangeButtonText
                ]}
              >
                This Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.timeRangeButton,
                timeRange === 'month' && styles.activeTimeRangeButton
              ]}
              onPress={() => setTimeRange('month')}
            >
              <Text 
                style={[
                  styles.timeRangeButtonText,
                  timeRange === 'month' && styles.activeTimeRangeButtonText
                ]}
              >
                This Month
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>${seller.totalSales.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Total Sales</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{seller.totalOrders}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{seller.pendingOrders}</Text>
              <Text style={styles.statLabel}>Pending Orders</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{seller.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.reportsButton}
            onPress={onViewReports}
          >
            <Text style={styles.reportsButtonText}>View Detailed Reports</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Products</Text>
            <TouchableOpacity onPress={onViewAllProducts}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          >
            <TouchableOpacity 
              style={styles.addProductCard}
              onPress={onAddProduct}
            >
              <Text style={styles.addProductIcon}>+</Text>
              <Text style={styles.addProductText}>Add New Product</Text>
            </TouchableOpacity>
            
            {recentProducts.map(product => (
              <TouchableOpacity 
                key={product.id}
                style={styles.productCard}
                onPress={() => onViewProduct(product.id)}
              >
                <View style={styles.productImageContainer}>
                  <Text style={styles.productImagePlaceholder}>🖼️</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                  <View style={styles.productStats}>
                    <Text style={styles.productPrice}>
                      ${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}
                    </Text>
                    <Text style={styles.productSold}>Sold: {product.soldCount}</Text>
                  </View>
                  <View 
                    style={[
                      styles.productStatusBadge,
                      product.inStock ? styles.inStockBadge : styles.outOfStockBadge
                    ]}
                  >
                    <Text 
                      style={[
                        styles.productStatusText,
                        product.inStock ? styles.inStockText : styles.outOfStockText
                      ]}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={onViewAllOrders}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.ordersContainer}>
            {recentOrders.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No recent orders</Text>
              </View>
            ) : (
              recentOrders.map(order => (
                <TouchableOpacity 
                  key={order.id}
                  style={styles.orderCard}
                  onPress={() => onViewOrder(order.id)}
                >
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
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
                </TouchableOpacity>
              ))
            )}
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
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    padding: 16,
    backgroundColor: colors.background.secondary,
    marginBottom: 16,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.neutral.gray100,
    borderRadius: 8,
    padding: 4,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTimeRangeButton: {
    backgroundColor: colors.background.primary,
  },
  timeRangeButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  activeTimeRangeButtonText: {
    color: colors.text.primary,
    fontWeight: '500',
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
  reportsButton: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  reportsButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.neutral.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  viewAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
  },
  productsContainer: {
    paddingHorizontal: 12,
  },
  addProductCard: {
    width: 150,
    height: 220,
    borderWidth: 1,
    borderColor: colors.primary.DEFAULT,
    borderStyle: 'dashed',
    borderRadius: 8,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addProductIcon: {
    fontSize: 32,
    color: colors.primary.DEFAULT,
    marginBottom: 8,
  },
  addProductText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  productCard: {
    width: 150,
    height: 220,
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    marginHorizontal: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  productImageContainer: {
    height: 100,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImagePlaceholder: {
    fontSize: 32,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  productSold: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
  },
  productStatusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  inStockBadge: {
    backgroundColor: colors.status.success + '20',
  },
  outOfStockBadge: {
    backgroundColor: colors.status.error + '20',
  },
  productStatusText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
  },
  inStockText: {
    color: colors.status.success,
  },
  outOfStockText: {
    color: colors.status.error,
  },
  ordersContainer: {
    paddingHorizontal: 16,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
  },
  orderCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderId: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
  },
  orderDate: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemsCount: {
    fontSize: typography.fontSize.xs,
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
});

export default SellerDashboardScreen;
