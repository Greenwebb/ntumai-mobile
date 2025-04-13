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
  description?: string;
  variants?: {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
  }[];
}

interface SellerProductsScreenProps {
  products: Product[];
  categories: {
    id: string;
    name: string;
  }[];
  onAddProduct: () => void;
  onEditProduct: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
  onBack: () => void;
  onSearch: (query: string) => void;
  onFilter: (categoryId: string) => void;
  onSort: (sortBy: 'name' | 'price' | 'soldCount' | 'newest') => void;
}

const SellerProductsScreen: React.FC<SellerProductsScreenProps> = ({
  products,
  categories,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onBack,
  onSearch,
  onFilter,
  onSort,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'soldCount' | 'newest'>('newest');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      onFilter('');
    } else {
      setSelectedCategory(categoryId);
      onFilter(categoryId);
    }
  };

  const handleSort = (sortOption: 'name' | 'price' | 'soldCount' | 'newest') => {
    setSortBy(sortOption);
    onSort(sortOption);
    setShowSortOptions(false);
  };

  const handleDeletePress = (productId: string) => {
    setShowDeleteConfirm(productId);
  };

  const handleDeleteConfirm = (productId: string) => {
    onDeleteProduct(productId);
    setShowDeleteConfirm(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Products</Text>
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
              {searchQuery || 'Search products...'}
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
              sortBy === 'name' && styles.selectedSortOption
            ]}
            onPress={() => handleSort('name')}
          >
            <Text 
              style={[
                styles.sortOptionText,
                sortBy === 'name' && styles.selectedSortOptionText
              ]}
            >
              Name (A-Z)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.sortOption,
              sortBy === 'price' && styles.selectedSortOption
            ]}
            onPress={() => handleSort('price')}
          >
            <Text 
              style={[
                styles.sortOptionText,
                sortBy === 'price' && styles.selectedSortOptionText
              ]}
            >
              Price (Low to High)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.sortOption,
              sortBy === 'soldCount' && styles.selectedSortOption
            ]}
            onPress={() => handleSort('soldCount')}
          >
            <Text 
              style={[
                styles.sortOptionText,
                sortBy === 'soldCount' && styles.selectedSortOptionText
              ]}
            >
              Best Selling
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.sortOption,
              sortBy === 'newest' && styles.selectedSortOption
            ]}
            onPress={() => handleSort('newest')}
          >
            <Text 
              style={[
                styles.sortOptionText,
                sortBy === 'newest' && styles.selectedSortOptionText
              ]}
            >
              Newest First
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        <TouchableOpacity 
          style={[
            styles.categoryChip,
            selectedCategory === null && styles.selectedCategoryChip
          ]}
          onPress={() => handleCategorySelect('')}
        >
          <Text 
            style={[
              styles.categoryName,
              selectedCategory === null && styles.selectedCategoryName
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        
        {categories.map(category => (
          <TouchableOpacity 
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.selectedCategoryChip
            ]}
            onPress={() => handleCategorySelect(category.id)}
          >
            <Text 
              style={[
                styles.categoryName,
                selectedCategory === category.id && styles.selectedCategoryName
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollView}>
        {/* Add Product Button */}
        <TouchableOpacity 
          style={styles.addProductButton}
          onPress={onAddProduct}
        >
          <Text style={styles.addProductButtonText}>+ Add New Product</Text>
        </TouchableOpacity>

        {/* Products List */}
        <View style={styles.productsContainer}>
          {products.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🛍️</Text>
              <Text style={styles.emptyStateTitle}>No products found</Text>
              <Text style={styles.emptyStateMessage}>
                Add your first product to start selling
              </Text>
            </View>
          ) : (
            products.map(product => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Text style={styles.productImagePlaceholder}>🖼️</Text>
                </View>
                
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                  
                  <View style={styles.productPriceContainer}>
                    {product.discountPrice ? (
                      <>
                        <Text style={styles.productDiscountPrice}>
                          ${product.discountPrice.toFixed(2)}
                        </Text>
                        <Text style={styles.productOriginalPrice}>
                          ${product.price.toFixed(2)}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.productPrice}>
                        ${product.price.toFixed(2)}
                      </Text>
                    )}
                  </View>
                  
                  <View style={styles.productStats}>
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
                    <Text style={styles.productSold}>Sold: {product.soldCount}</Text>
                  </View>
                  
                  <View style={styles.productActions}>
                    <TouchableOpacity 
                      style={styles.editButton}
                      onPress={() => onEditProduct(product.id)}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDeletePress(product.id)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {showDeleteConfirm === product.id && (
                    <View style={styles.deleteConfirmContainer}>
                      <Text style={styles.deleteConfirmText}>
                        Are you sure you want to delete this product?
                      </Text>
                      <View style={styles.deleteConfirmActions}>
                        <TouchableOpacity 
                          style={styles.deleteConfirmCancelButton}
                          onPress={handleDeleteCancel}
                        >
                          <Text style={styles.deleteConfirmCancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.deleteConfirmButton}
                          onPress={() => handleDeleteConfirm(product.id)}
                        >
                          <Text style={styles.deleteConfirmButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
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
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: colors.neutral.gray100,
    marginHorizontal: 4,
  },
  selectedCategoryChip: {
    backgroundColor: colors.primary.light,
  },
  categoryName: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  selectedCategoryName: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  addProductButton: {
    margin: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: colors.primary.light,
    borderRadius: 8,
    alignItems: 'center',
  },
  addProductButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.primary.DEFAULT,
  },
  productsContainer: {
    padding: 16,
    paddingTop: 0,
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
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    overflow: 'hidden',
  },
  productImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImagePlaceholder: {
    fontSize: 32,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  productPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  productDiscountPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
    marginRight: 8,
  },
  productOriginalPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productStatusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
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
  productSold: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
  },
  productActions: {
    flexDirection: 'row',
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.primary.light,
    borderRadius: 4,
    marginRight: 8,
  },
  editButtonText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
    color: colors.primary.DEFAULT,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.status.error + '10',
    borderRadius: 4,
  },
  deleteButtonText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
    color: colors.status.error,
  },
  deleteConfirmContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.neutral.gray100,
    borderRadius: 8,
  },
  deleteConfirmText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    marginBottom: 12,
  },
  deleteConfirmActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteConfirmCancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  deleteConfirmCancelButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  deleteConfirmButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.status.error,
    borderRadius: 4,
  },
  deleteConfirmButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.white,
  },
});

export default SellerProductsScreen;
