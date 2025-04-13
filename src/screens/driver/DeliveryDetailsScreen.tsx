import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { useDriverStore } from '../../store/driverStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { OrderStatusBar } from '../../components/OrderStatusBar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export const DeliveryDetailsScreen = ({ navigation, route }: any) => {
  const { deliveryId } = route.params || {};
  
  const { 
    deliveries, 
    fetchDeliveryById, 
    updateDeliveryStatus,
    isLoading 
  } = useDriverStore();
  
  useEffect(() => {
    fetchDeliveryById(deliveryId);
  }, [deliveryId]);
  
  const delivery = deliveries.find(d => d.id === deliveryId);
  
  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateDeliveryStatus(deliveryId, newStatus);
      
      if (newStatus === 'delivered') {
        // Navigate back to dashboard after marking as delivered
        setTimeout(() => {
          navigation.navigate('RiderDashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('Status update error:', error);
    }
  };
  
  if (isLoading || !delivery) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <Header title="Delivery Details" onBack={() => navigation.goBack()} />
        <StyledView className="flex-1 items-center justify-center">
          <StyledText>Loading...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title={`Delivery #${delivery.id}`} onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Delivery Status */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Delivery Status</StyledText>
          
          <OrderStatusBar status={delivery.status} />
          
          <StyledView className="mt-4">
            {delivery.status === 'ready' && (
              <Button
                title="Accept & Start Delivery"
                variant="primary"
                size="lg"
                fullWidth
                onPress={() => handleStatusUpdate('on_the_way')}
              />
            )}
            
            {delivery.status === 'on_the_way' && (
              <Button
                title="Mark as Delivered"
                variant="primary"
                size="lg"
                fullWidth
                onPress={() => handleStatusUpdate('delivered')}
              />
            )}
          </StyledView>
        </StyledView>
        
        {/* Pickup Location */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Pickup Location</StyledText>
          
          <StyledView className="bg-gray-100 rounded-lg p-3">
            <StyledText className="font-medium mb-1">{delivery.restaurant.name}</StyledText>
            <StyledText className="text-gray-700">{delivery.restaurant.address}</StyledText>
            <StyledText className="text-gray-700">{delivery.restaurant.phone}</StyledText>
          </StyledView>
          
          <Button
            title="Navigate to Pickup"
            variant="outline"
            size="md"
            onPress={() => {}}
            style={{ marginTop: 12 }}
          />
        </StyledView>
        
        {/* Delivery Location */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Delivery Location</StyledText>
          
          <StyledView className="bg-gray-100 rounded-lg p-3">
            <StyledText className="font-medium mb-1">{delivery.customer.name}</StyledText>
            <StyledText className="text-gray-700">{delivery.address.street}</StyledText>
            <StyledText className="text-gray-700">
              {delivery.address.city}, {delivery.address.state} {delivery.address.zipCode}
            </StyledText>
            <StyledText className="text-gray-700 mt-1">{delivery.customer.phone}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row mt-3">
            <Button
              title="Navigate"
              variant="outline"
              size="md"
              onPress={() => {}}
              style={{ flex: 1, marginRight: 8 }}
            />
            
            <Button
              title="Call Customer"
              variant="outline"
              size="md"
              onPress={() => {}}
              style={{ flex: 1 }}
            />
          </StyledView>
        </StyledView>
        
        {/* Order Items */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Order Items</StyledText>
          
          {delivery.items.map((item, index) => (
            <StyledView 
              key={index} 
              className="flex-row justify-between items-center mb-3 pb-3 border-b border-gray-100"
            >
              <StyledView className="flex-row items-center flex-1">
                <StyledView className="w-10 h-10 bg-gray-200 rounded items-center justify-center mr-3">
                  <StyledText>🥗</StyledText>
                </StyledView>
                
                <StyledView className="flex-1">
                  <StyledText className="font-medium">{item.product.name}</StyledText>
                  <StyledText className="text-gray-500">
                    Qty: {item.quantity}
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>
          ))}
          
          <StyledView className="bg-yellow-50 p-3 rounded-lg mt-2">
            <StyledText className="text-yellow-700">
              Special instructions: {delivery.specialInstructions || 'None'}
            </StyledText>
          </StyledView>
        </StyledView>
        
        {/* Delivery Summary */}
        <StyledView className="p-4">
          <StyledText className="text-lg font-bold mb-4">Delivery Summary</StyledText>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Order Total</StyledText>
            <StyledText>${delivery.total.toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Payment Method</StyledText>
            <StyledText>{delivery.paymentMethod}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Payment Status</StyledText>
            <StyledView className="bg-green-100 px-2 py-1 rounded-full">
              <StyledText className="text-green-700 text-xs">Paid</StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
            <StyledText className="font-bold">Your Earnings</StyledText>
            <StyledText className="font-bold text-primary">${delivery.driverEarnings.toFixed(2)}</StyledText>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
