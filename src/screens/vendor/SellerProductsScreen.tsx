import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useVendorStore } from '../../store/vendorStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';
import { ProductCard } from '../../components/ProductCard';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const SellerProductsScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
  
  const { 
    products, 
    fetchProducts, 
    searchProducts,
    isLoading 
  } = useVendorStore();
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchProducts(query);
    } else {
      fetchProducts();
    }
  };
  
  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    // In a real app, we would filter products by status
  };
  
  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };
  
  const handleEditProduct = (productId: string) => {
    navigation.navigate('AddProduct', { productId });
  };
  
  const filteredProducts = products.filter(product => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return product.isActive;
    if (filterStatus === 'inactive') return !product.isActive;
    return true;
  });
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header 
        title="My Products" 
        showBackButton={false}
        rightComponent={
          <Button
            title="Add"
            variant="primary"
            size="sm"
            onPress={handleAddProduct}
          />
        }
      />
      
      <StyledView className="flex-1">
        <StyledView className="px-4 py-3">
          <SearchBar 
            placeholder="Search products..." 
            value={searchQuery}
            onSearch={handleSearch} 
          />
        </StyledView>
        
        {/* Filter Tabs */}
        <StyledView className="flex-row justify-between px-4 py-2 border-b border-gray-200">
          {['all', 'active', 'inactive'].map((status) => (
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
        ) : filteredProducts.length === 0 ? (
          <StyledView className="flex-1 items-center justify-center p-4">
            <StyledText className="text-lg text-gray-500 text-center mb-4">
              {searchQuery 
                ? `No products found for "${searchQuery}"` 
                : 'No products available'}
            </StyledText>
            <Button
              title="Add New Product"
              variant="primary"
              size="md"
              onPress={handleAddProduct}
            />
          </StyledView>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <StyledTouchableOpacity
                className="mb-4"
                onPress={() => handleEditProduct(item.id)}
              >
                <ProductCard
                  product={item}
                  horizontal
                  showStatus
                  onPress={() => handleEditProduct(item.id)}
                />
              </StyledTouchableOpacity>
            )}
          />
        )}
      </StyledView>
    </StyledSafeAreaView>
  );
};
