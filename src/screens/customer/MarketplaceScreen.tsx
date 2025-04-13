import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
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

export const MarketplaceScreen = ({ navigation, route }: any) => {
  const { categoryId } = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    products, 
    categories, 
    fetchProducts, 
    fetchCategories, 
    fetchProductsByCategory,
    searchProducts,
    isLoading 
  } = useProductsStore();
  
  useEffect(() => {
    fetchCategories();
    
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    } else {
      fetchProducts();
    }
  }, [categoryId]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchProducts(query);
    } else {
      fetchProducts();
    }
  };
  
  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };
  
  const handleCategoryPress = (categoryId: string) => {
    fetchProductsByCategory(categoryId);
  };
  
  const selectedCategory = categoryId 
    ? categories.find(c => c.id === categoryId)?.name 
    : null;
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header 
        title={selectedCategory || "Marketplace"} 
        onBack={categoryId ? () => navigation.goBack() : undefined}
      />
      
      <StyledView className="flex-1">
        <StyledView className="px-4 py-3">
          <SearchBar 
            placeholder="Search products..." 
            value={searchQuery}
            onSearch={handleSearch} 
          />
        </StyledView>
        
        {!categoryId && (
          <StyledView className="mb-4">
            <StyledView className="px-4 mb-2">
              <StyledText className="text-lg font-bold">Categories</StyledText>
            </StyledView>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              className="mb-2"
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
        )}
        
        <StyledView className="px-4 mb-2">
          <StyledText className="text-lg font-bold">
            {searchQuery ? 'Search Results' : selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          </StyledText>
        </StyledView>
        
        {isLoading ? (
          <StyledView className="flex-1 items-center justify-center">
            <StyledText>Loading...</StyledText>
          </StyledView>
        ) : products.length === 0 ? (
          <StyledView className="flex-1 items-center justify-center p-4">
            <StyledText className="text-lg text-gray-500 text-center">
              {searchQuery 
                ? `No products found for "${searchQuery}"` 
                : 'No products available in this category'}
            </StyledText>
          </StyledView>
        ) : (
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 8 }}
            renderItem={({ item }) => (
              <StyledView className="w-1/2 p-2">
                <ProductCard
                  product={item}
                  onPress={() => handleProductPress(item.id)}
                />
              </StyledView>
            )}
          />
        )}
      </StyledView>
    </StyledSafeAreaView>
  );
};
