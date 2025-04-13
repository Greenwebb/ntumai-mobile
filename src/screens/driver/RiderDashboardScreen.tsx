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
