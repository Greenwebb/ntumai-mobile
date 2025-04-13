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
