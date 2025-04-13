import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import { styled } from 'nativewind';
import { useOrdersStore } from '../../store/ordersStore';
import { Header } from '../../components/Header';
import { OrderStatusBar } from '../../components/OrderStatusBar';
import { Button } from '../../components/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

export const DeliveryTrackingScreen = ({ navigation, route }: any) => {
  const { orderId } = route.params || { orderId: '1' }; // Using a placeholder if not provided
  const [currentStatus, setCurrentStatus] = useState('preparing');
  
  const { orders, fetchOrderById, isLoading } = useOrdersStore();
  
  useEffect(() => {
    fetchOrderById(orderId);
    
    // Simulate order status progression for demo purposes
    const statusSequence = ['preparing', 'ready', 'on_the_way', 'delivered'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < statusSequence.length - 1) {
        currentIndex++;
        setCurrentStatus(statusSequence[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 10000); // Change status every 10 seconds for demo
    
    return () => clearInterval(interval);
  }, [orderId]);
  
  const order = orders.find(o => o.id === orderId) || {
    id: '1',
    items: [],
    total: 0,
    status: 'preparing',
    date: new Date().toISOString().split('T')[0],
    address: {
      id: '1',
      name: 'Home',
      street: '123 Main St',
      city: 'Anytown',
      state: 'State',
      zipCode: '12345',
      isDefault: true
    },
    paymentMethod: 'Credit Card'
  };
  
  const getEstimatedTime = () => {
    switch (currentStatus) {
      case 'preparing':
        return '30-45 minutes';
      case 'ready':
        return '20-30 minutes';
      case 'on_the_way':
        return '10-15 minutes';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };
  
  const getDriverInfo = () => {
    if (currentStatus === 'on_the_way' || currentStatus === 'delivered') {
      return {
        name: 'John Doe',
        phone: '+1 234 567 8901',
        vehicle: 'Toyota Corolla',
        licensePlate: 'ABC 123'
      };
    }
    return null;
  };
  
  const driverInfo = getDriverInfo();
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Delivery Tracking" onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Order Status */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Order Status</StyledText>
          
          <OrderStatusBar status={currentStatus} />
          
          <StyledView className="mt-4 items-center">
            <StyledText className="text-gray-500">Estimated Delivery Time</StyledText>
            <StyledText className="text-xl font-bold text-primary">{getEstimatedTime()}</StyledText>
          </StyledView>
        </StyledView>
        
        {/* Driver Info */}
        {driverInfo && (
          <StyledView className="p-4 border-b border-gray-200">
            <StyledText className="text-lg font-bold mb-4">Driver Information</StyledText>
            
            <StyledView className="flex-row items-center mb-4">
              <StyledView className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-3">
                <StyledText className="text-xl">👤</StyledText>
              </StyledView>
              
              <StyledView className="flex-1">
                <StyledText className="font-medium">{driverInfo.name}</StyledText>
                <StyledText className="text-gray-500">{driverInfo.phone}</StyledText>
              </StyledView>
              
              <Button
                title="Call"
                variant="outline"
                size="sm"
                onPress={() => {}}
              />
            </StyledView>
            
            <StyledView className="bg-gray-100 rounded-lg p-3">
              <StyledText className="text-gray-700">
                Vehicle: {driverInfo.vehicle}
              </StyledText>
              <StyledText className="text-gray-700">
                License Plate: {driverInfo.licensePlate}
              </StyledText>
            </StyledView>
          </StyledView>
        )}
        
        {/* Delivery Address */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Delivery Address</StyledText>
          
          <StyledView className="bg-gray-100 rounded-lg p-3">
            <StyledText className="font-medium mb-1">{order.address.name}</StyledText>
            <StyledText className="text-gray-700">{order.address.street}</StyledText>
            <StyledText className="text-gray-700">
              {order.address.city}, {order.address.state} {order.address.zipCode}
            </StyledText>
          </StyledView>
        </StyledView>
        
        {/* Order Summary */}
        <StyledView className="p-4">
          <StyledText className="text-lg font-bold mb-4">Order Summary</StyledText>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Order ID</StyledText>
            <StyledText className="font-medium">#{order.id}</StyledText>
          </StyledView>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Date</StyledText>
            <StyledText className="font-medium">{order.date}</StyledText>
          </StyledView>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Payment Method</StyledText>
            <StyledText className="font-medium">{order.paymentMethod}</StyledText>
          </StyledView>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Total</StyledText>
            <StyledText className="font-medium text-primary">${order.total.toFixed(2)}</StyledText>
          </StyledView>
        </StyledView>
      </StyledScrollView>
      
      {/* Bottom Action Bar */}
      {currentStatus === 'delivered' && (
        <StyledView className="p-4 border-t border-gray-200">
          <Button
            title="Rate Order"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => navigation.navigate('HomeTab')}
          />
        </StyledView>
      )}
    </StyledSafeAreaView>
  );
};
