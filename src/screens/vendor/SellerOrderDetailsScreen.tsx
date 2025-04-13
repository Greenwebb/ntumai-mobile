import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useVendorStore } from '../../store/vendorStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { OrderStatusBar } from '../../components/OrderStatusBar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const SellerOrderDetailsScreen = ({ navigation, route }: any) => {
  const { orderId } = route.params || {};
  
  const { 
    orders, 
    fetchOrderById, 
    updateOrderStatus,
    isLoading 
  } = useVendorStore();
  
  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId]);
  
  const order = orders.find(o => o.id === orderId);
  
  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error('Status update error:', error);
    }
  };
  
  if (isLoading || !order) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <Header title="Order Details" onBack={() => navigation.goBack()} />
        <StyledView className="flex-1 items-center justify-center">
          <StyledText>Loading...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title={`Order #${order.id}`} onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Order Status */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Order Status</StyledText>
          
          <OrderStatusBar status={order.status} />
          
          <StyledView className="flex-row flex-wrap mt-4">
            {order.status !== 'processing' && (
              <Button
                title="Mark as Processing"
                variant="outline"
                size="sm"
                onPress={() => handleStatusUpdate('processing')}
                style={{ marginRight: 8, marginBottom: 8 }}
              />
            )}
            
            {order.status !== 'completed' && (
              <Button
                title="Mark as Completed"
                variant="outline"
                size="sm"
                onPress={() => handleStatusUpdate('completed')}
                style={{ marginRight: 8, marginBottom: 8 }}
              />
            )}
            
            {order.status !== 'cancelled' && (
              <Button
                title="Cancel Order"
                variant="danger"
                size="sm"
                onPress={() => handleStatusUpdate('cancelled')}
                style={{ marginBottom: 8 }}
              />
            )}
          </StyledView>
        </StyledView>
        
        {/* Customer Info */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Customer Information</StyledText>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Name</StyledText>
            <StyledText className="font-medium">John Doe</StyledText>
          </StyledView>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Phone</StyledText>
            <StyledText className="font-medium">+1 234 567 8901</StyledText>
          </StyledView>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Email</StyledText>
            <StyledText className="font-medium">john.doe@example.com</StyledText>
          </StyledView>
        </StyledView>
        
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
        
        {/* Order Items */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Order Items</StyledText>
          
          {order.items.map((item, index) => (
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
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </StyledText>
                </StyledView>
              </StyledView>
              
              <StyledText className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </StyledText>
            </StyledView>
          ))}
        </StyledView>
        
        {/* Payment Info */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Payment Information</StyledText>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Payment Method</StyledText>
            <StyledText className="font-medium">{order.paymentMethod}</StyledText>
          </StyledView>
          
          <StyledView className="mb-3">
            <StyledText className="text-gray-500">Payment Status</StyledText>
            <StyledView className="bg-green-100 self-start px-2 py-1 rounded-full">
              <StyledText className="text-green-700 text-xs">Paid</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
        
        {/* Order Summary */}
        <StyledView className="p-4">
          <StyledText className="text-lg font-bold mb-4">Order Summary</StyledText>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Subtotal</StyledText>
            <StyledText>${(order.total * 0.9).toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Tax</StyledText>
            <StyledText>${(order.total * 0.05).toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-500">Delivery Fee</StyledText>
            <StyledText>${(order.total * 0.05).toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
            <StyledText className="font-bold">Total</StyledText>
            <StyledText className="font-bold text-primary">${order.total.toFixed(2)}</StyledText>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
