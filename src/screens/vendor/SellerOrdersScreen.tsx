import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useVendorStore } from '../../store/vendorStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';
import { OrderCard } from '../../components/OrderCard';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const SellerOrdersScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'processing', 'completed', 'cancelled'
  
  const { 
    orders, 
    fetchOrders, 
    searchOrders,
    isLoading 
  } = useVendorStore();
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchOrders(query);
    } else {
      fetchOrders();
    }
  };
  
  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    // In a real app, we would filter orders by status
  };
  
  const handleOrderPress = (orderId: string) => {
    navigation.navigate('SellerOrderDetails', { orderId });
  };
  
  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header 
        title="Orders" 
        showBackButton={false}
      />
      
      <StyledView className="flex-1">
        <StyledView className="px-4 py-3">
          <SearchBar 
            placeholder="Search orders..." 
            value={searchQuery}
            onSearch={handleSearch} 
          />
        </StyledView>
        
        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          className="border-b border-gray-200 pb-2"
        >
          {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
            <StyledTouchableOpacity
              key={status}
              className={`py-2 px-4 mr-2 rounded-full ${
                filterStatus === status ? 'bg-primary' : 'bg-gray-100'
              }`}
              onPress={() => handleFilterChange(status)}
            >
              <StyledText
                className={`font-medium ${
                  filterStatus === status ? 'text-white' : 'text-gray-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </StyledText>
            </StyledTouchableOpacity>
          ))}
        </ScrollView>
        
        {isLoading ? (
          <StyledView className="flex-1 items-center justify-center">
            <StyledText>Loading...</StyledText>
          </StyledView>
        ) : filteredOrders.length === 0 ? (
          <StyledView className="flex-1 items-center justify-center p-4">
            <StyledText className="text-lg text-gray-500 text-center">
              {searchQuery 
                ? `No orders found for "${searchQuery}"` 
                : 'No orders available'}
            </StyledText>
          </StyledView>
        ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <OrderCard
                order={item}
                onPress={() => handleOrderPress(item.id)}
                style={{ marginBottom: 12 }}
              />
            )}
          />
        )}
      </StyledView>
    </StyledSafeAreaView>
  );
};
