import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useVendorStore } from '../../store/vendorStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const SellerDashboardScreen = ({ navigation }: any) => {
  const [period, setPeriod] = useState('today'); // 'today', 'week', 'month'
  
  const { 
    dashboardStats, 
    recentOrders,
    fetchDashboardStats,
    fetchRecentOrders,
    isLoading 
  } = useVendorStore();
  
  useEffect(() => {
    fetchDashboardStats(period);
    fetchRecentOrders();
  }, [period]);
  
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };
  
  const handleViewAllOrders = () => {
    navigation.navigate('SellerOrders');
  };
  
  const handleViewAllProducts = () => {
    navigation.navigate('SellerProducts');
  };
  
  const handleOrderPress = (orderId: string) => {
    navigation.navigate('SellerOrderDetails', { orderId });
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Dashboard" showBackButton={false} />
      
      <StyledScrollView className="flex-1">
        {/* Stats Period Selector */}
        <StyledView className="flex-row justify-between px-4 py-3">
          {['today', 'week', 'month'].map((p) => (
            <StyledTouchableOpacity
              key={p}
              className={`py-2 px-4 rounded-full ${
                period === p ? 'bg-primary' : 'bg-gray-100'
              }`}
              onPress={() => handlePeriodChange(p)}
            >
              <StyledText
                className={`font-medium ${
                  period === p ? 'text-white' : 'text-gray-700'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </StyledText>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
        
        {/* Stats Cards */}
        <StyledView className="flex-row flex-wrap px-4">
          <StyledView className="w-1/2 p-2">
            <StyledView className="bg-blue-50 p-4 rounded-xl">
              <StyledText className="text-blue-500 font-medium mb-1">Total Sales</StyledText>
              <StyledText className="text-2xl font-bold">${dashboardStats.totalSales}</StyledText>
              <StyledText className="text-blue-500 text-xs">
                {dashboardStats.salesGrowth > 0 ? '+' : ''}{dashboardStats.salesGrowth}% from last period
              </StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="w-1/2 p-2">
            <StyledView className="bg-green-50 p-4 rounded-xl">
              <StyledText className="text-green-500 font-medium mb-1">Orders</StyledText>
              <StyledText className="text-2xl font-bold">{dashboardStats.totalOrders}</StyledText>
              <StyledText className="text-green-500 text-xs">
                {dashboardStats.ordersGrowth > 0 ? '+' : ''}{dashboardStats.ordersGrowth}% from last period
              </StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="w-1/2 p-2">
            <StyledView className="bg-purple-50 p-4 rounded-xl">
              <StyledText className="text-purple-500 font-medium mb-1">Products</StyledText>
              <StyledText className="text-2xl font-bold">{dashboardStats.totalProducts}</StyledText>
              <StyledText className="text-purple-500 text-xs">
                {dashboardStats.activeProducts} active products
              </StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="w-1/2 p-2">
            <StyledView className="bg-orange-50 p-4 rounded-xl">
              <StyledText className="text-orange-500 font-medium mb-1">Customers</StyledText>
              <StyledText className="text-2xl font-bold">{dashboardStats.totalCustomers}</StyledText>
              <StyledText className="text-orange-500 text-xs">
                {dashboardStats.newCustomers} new customers
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
        
        {/* Recent Orders */}
        <StyledView className="mt-4 px-4">
          <StyledView className="flex-row justify-between items-center mb-3">
            <StyledText className="text-lg font-bold">Recent Orders</StyledText>
            <StyledTouchableOpacity onPress={handleViewAllOrders}>
              <StyledText className="text-primary">View All</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          
          {recentOrders.length === 0 ? (
            <StyledView className="bg-gray-100 rounded-lg p-4 items-center">
              <StyledText className="text-gray-500">No recent orders found.</StyledText>
            </StyledView>
          ) : (
            recentOrders.map((order) => (
              <StyledTouchableOpacity
                key={order.id}
                className="bg-gray-50 rounded-lg p-3 mb-3"
                onPress={() => handleOrderPress(order.id)}
              >
                <StyledView className="flex-row justify-between mb-1">
                  <StyledText className="font-medium">Order #{order.id}</StyledText>
                  <StyledText className="text-primary font-medium">${order.total.toFixed(2)}</StyledText>
                </StyledView>
                
                <StyledView className="flex-row justify-between mb-1">
                  <StyledText className="text-gray-500">{order.date}</StyledText>
                  <StyledView className={`px-2 py-1 rounded-full ${
                    order.status === 'completed' ? 'bg-green-100' :
                    order.status === 'pending' ? 'bg-yellow-100' :
                    order.status === 'processing' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <StyledText className={`text-xs ${
                      order.status === 'completed' ? 'text-green-700' :
                      order.status === 'pending' ? 'text-yellow-700' :
                      order.status === 'processing' ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </StyledText>
                  </StyledView>
                </StyledView>
                
                <StyledText className="text-gray-500 text-sm">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </StyledText>
              </StyledTouchableOpacity>
            ))
          )}
        </StyledView>
        
        {/* Quick Actions */}
        <StyledView className="mt-4 px-4 mb-6">
          <StyledText className="text-lg font-bold mb-3">Quick Actions</StyledText>
          
          <StyledView className="flex-row flex-wrap">
            <StyledView className="w-1/2 p-2">
              <Button
                title="Add Product"
                variant="outline"
                size="md"
                fullWidth
                onPress={() => navigation.navigate('AddProduct')}
              />
            </StyledView>
            
            <StyledView className="w-1/2 p-2">
              <Button
                title="View Products"
                variant="outline"
                size="md"
                fullWidth
                onPress={handleViewAllProducts}
              />
            </StyledView>
            
            <StyledView className="w-1/2 p-2">
              <Button
                title="View Orders"
                variant="outline"
                size="md"
                fullWidth
                onPress={handleViewAllOrders}
              />
            </StyledView>
            
            <StyledView className="w-1/2 p-2">
              <Button
                title="Store Settings"
                variant="outline"
                size="md"
                fullWidth
                onPress={() => {}}
              />
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
