import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Order } from '../types';

interface OrderCardProps {
  order: Order;
  onPress: (order: Order) => void;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <StyledTouchableOpacity 
      className="bg-white rounded-lg shadow-sm p-4 mb-3"
      onPress={() => onPress(order)}
    >
      <StyledView className="flex-row justify-between items-center mb-2">
        <StyledText className="font-bold">Order #{order.id.slice(-6)}</StyledText>
        <StyledView className={`px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
          <StyledText className={`text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </StyledText>
        </StyledView>
      </StyledView>
      
      <StyledText className="text-gray-500 mb-2">{order.date}</StyledText>
      
      <StyledView className="border-t border-gray-100 pt-2 mt-2">
        <StyledText className="text-gray-700">
          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
        </StyledText>
        <StyledView className="flex-row justify-between items-center mt-1">
          <StyledText className="text-gray-700">Total</StyledText>
          <StyledText className="font-bold">${order.total.toFixed(2)}</StyledText>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
};
