import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface MarketplaceScreenProps {
  onCategoryPress: (categoryId: string) => void;
  onProductPress: (productId: string) => void;
  onSearch: () => void;
  onFilter: () => void;
  onSort: () => void;
}

// Mock data for demonstration
const mockCategories = [
  { id: '1', name: 'All', icon: '🛒', isSelected: true },
  { id: '2', name: 'Groceries', icon: '🥑' },
  { id: '3', name: 'Electronics', icon: '📱' },
  { id: '4', name: 'Fashion', icon: '👕' },
  { id: '5', name: 'Home', icon: '🏠' },
  { id: '6', name: 'Beauty', icon: '💄' },
];

const mockProducts = [
  { 
    id: '1', 
    name: 'Fresh Avocado', 
    price: 2.99, 
    image: null, 
    store: 'Organic Market',
    rating: 4.5,
    reviewCount: 120
  },
  { 
    id: '2', 
    name: 'Wireless Earbuds', 
    price: 59.99, 
    image: null, 
    store: 'Tech World',
    rating: 4.2,
    reviewCount: 85
  },
  { 
    id: '3', 
    name: 'Cotton T-Shirt', 
    price: 19.99, 
    image: null, 
    store: 'Fashion Hub',
    rating: 4.0,
    reviewCount: 64
  },
  { 
    id: '4', 
    name: 'Ceramic Mug', 
    price: 12.99, 
    image: null, 
    store: 'Home Essentials',
    rating: 4.7,
    reviewCount: 42
  },
  { 
    id: '5', 
    name: 'Smartphone Charger', 
    price: 15.99, 
    image: null, 
    store: 'Tech World',
    rating: 4.3,
    reviewCount: 156
  },
  { 
    id: '6', 
    name: 'Organic Bananas', 
    price: 1.99, 
    image: null, 
    store: 'Organic Market',
    rating: 4.6,
    reviewCount: 78
  },
];

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  onCategoryPress,
  onProductPress,
  onSearch,
  onFilter,
  onSort,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Marketplace</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar} onPress={onSearch}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search products, stores...</Text>
        </TouchableOpacity>
        
        <View style={styles.filterSortContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onFilter}>
            <Text style={styles.iconButtonText}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onSort}>
            <Text style={styles.iconButtonText}>↕️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {mockCategories.map((category) => (
          <TouchableOpacity 
            key={category.id}
            style={[
              styles.categoryChip,
              category.isSelected && styles.selectedCategoryChip
            ]}
            onPress={() => onCategoryPress(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text 
              style={[
                styles.categoryName,
                category.isSelected && styles.selectedCategoryName
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <ScrollView style={styles.productsContainer}>
        <View style={styles.productsGrid}>
          {mockProducts.map((product) => (
            <TouchableOpacity 
              key={product.id}
              style={styles.productCard}
              onPress={() => onProductPress(product.id)}
            >
              <View style={styles.productImageContainer}>
                <Text style={styles.productImagePlaceholder}>🖼️</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.productStore} numberOfLines={1}>{product.store}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingIcon}>⭐</Text>
                  <Text style={styles.ratingText}>{product.rating}</Text>
                  <Text style={styles.reviewCount}>({product.reviewCount})</Text>
                </View>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray100,
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconButtonText: {
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    marginHorizontal: 8,
  },
  selectedCategoryChip: {
    backgroundColor: colors.primary.light,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryName: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  selectedCategoryName: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  productsContainer: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  productCard: {
    width: '46%',
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    marginHorizontal: '2%',
    marginBottom: 16,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  productImageContainer: {
    height: 120,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImagePlaceholder: {
    fontSize: 32,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  productStore: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
    color: colors.text.primary,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
  },
  productPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
});

export default MarketplaceScreen;
