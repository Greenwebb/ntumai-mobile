<<<<<<< HEAD
import React, { useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import { styled } from 'nativewind';
import { useProductsStore } from '../../store/productsStore';
import { Header } from '../../components/Header';
import { ProductCard } from '../../components/ProductCard';
import { CategoryCard } from '../../components/CategoryCard';
import { SearchBar } from '../../components/SearchBar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

export const HomeScreen = ({ navigation }: any) => {
  const { products, categories, fetchProducts, fetchCategories, isLoading } = useProductsStore();
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  
  const handleSearch = (query: string) => {
    // Handle search
  };
  
  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };
  
  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('Marketplace', { categoryId });
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Ntumai" showBackButton={false} />
      
      <StyledScrollView className="flex-1">
        <StyledView className="px-4 py-3">
          <SearchBar 
            placeholder="Search products..." 
            onSearch={handleSearch} 
          />
        </StyledView>
        
        {/* Banner */}
        <StyledView className="px-4 mb-6">
          <StyledView className="bg-primary/10 rounded-xl p-4 flex-row items-center">
            <StyledView className="flex-1">
              <StyledText className="text-lg font-bold mb-1">Fresh Deals</StyledText>
              <StyledText className="text-gray-600 mb-2">Get up to 30% off on fresh produce</StyledText>
              <StyledView className="bg-primary py-1 px-3 rounded-full self-start">
                <StyledText className="text-white font-medium">Shop Now</StyledText>
              </StyledView>
            </StyledView>
            <StyledText className="text-5xl">🥗</StyledText>
          </StyledView>
        </StyledView>
        
        {/* Categories */}
        <StyledView className="mb-6">
          <StyledView className="flex-row justify-between items-center px-4 mb-3">
            <StyledText className="text-lg font-bold">Categories</StyledText>
            <StyledText 
              className="text-primary"
              onPress={() => navigation.navigate('Marketplace')}
            >
              See All
            </StyledText>
          </StyledView>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id)}
                style={{ marginRight: 12 }}
              />
            ))}
          </ScrollView>
        </StyledView>
        
        {/* Featured Products */}
        <StyledView className="mb-6">
          <StyledView className="flex-row justify-between items-center px-4 mb-3">
            <StyledText className="text-lg font-bold">Featured Products</StyledText>
            <StyledText 
              className="text-primary"
              onPress={() => navigation.navigate('Marketplace')}
            >
              See All
            </StyledText>
          </StyledView>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {products.slice(0, 5).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product.id)}
                style={{ marginRight: 12, width: 160 }}
              />
            ))}
          </ScrollView>
        </StyledView>
        
        {/* Popular Products */}
        <StyledView className="mb-6">
          <StyledView className="flex-row justify-between items-center px-4 mb-3">
            <StyledText className="text-lg font-bold">Popular Products</StyledText>
            <StyledText 
              className="text-primary"
              onPress={() => navigation.navigate('Marketplace')}
            >
              See All
            </StyledText>
          </StyledView>
          
          <StyledView className="px-4">
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product.id)}
                horizontal
                style={{ marginBottom: 12 }}
              />
            ))}
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
=======
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface HomeScreenProps {
  onCategoryPress: (categoryId: string) => void;
  onProductPress: (productId: string) => void;
  onViewAllCategories: () => void;
  onViewAllProducts: () => void;
  onSearch: () => void;
}

// Mock data for demonstration
const mockCategories = [
  { id: '1', name: 'Groceries', icon: '🥑' },
  { id: '2', name: 'Electronics', icon: '📱' },
  { id: '3', name: 'Fashion', icon: '👕' },
  { id: '4', name: 'Home', icon: '🏠' },
  { id: '5', name: 'Beauty', icon: '💄' },
];

const mockProducts = [
  { id: '1', name: 'Fresh Avocado', price: 2.99, image: null, store: 'Organic Market' },
  { id: '2', name: 'Wireless Earbuds', price: 59.99, image: null, store: 'Tech World' },
  { id: '3', name: 'Cotton T-Shirt', price: 19.99, image: null, store: 'Fashion Hub' },
  { id: '4', name: 'Ceramic Mug', price: 12.99, image: null, store: 'Home Essentials' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({
  onCategoryPress,
  onProductPress,
  onViewAllCategories,
  onViewAllProducts,
  onSearch,
}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, User!</Text>
          <Text style={styles.subGreeting}>What would you like to order today?</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar} onPress={onSearch}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Search products, stores...</Text>
      </TouchableOpacity>

      {/* Categories Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={onViewAllCategories}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {mockCategories.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={styles.categoryCard}
              onPress={() => onCategoryPress(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Products Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={onViewAllProducts}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

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
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Nearby Stores Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Stores</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storesContainer}
        >
          {[1, 2, 3].map((store) => (
            <TouchableOpacity key={store} style={styles.storeCard}>
              <View style={styles.storeImageContainer}>
                <Text style={styles.storeImagePlaceholder}>🏪</Text>
              </View>
              <Text style={styles.storeName}>Store {store}</Text>
              <Text style={styles.storeDistance}>1.{store} km away</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray100,
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 12,
    borderRadius: 8,
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  viewAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  categoryIcon: {
    fontSize: 24,
    backgroundColor: colors.neutral.gray100,
    width: 56,
    height: 56,
    borderRadius: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    textAlign: 'center',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
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
    marginBottom: 8,
  },
  productPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  storesContainer: {
    paddingHorizontal: 16,
  },
  storeCard: {
    width: 160,
    marginHorizontal: 8,
  },
  storeImageContainer: {
    height: 100,
    backgroundColor: colors.neutral.gray100,
    borderRadius: 12,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeImagePlaceholder: {
    fontSize: 32,
  },
  storeName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  storeDistance: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
});

export default HomeScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
