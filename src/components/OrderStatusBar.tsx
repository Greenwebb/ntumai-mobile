import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

interface OrderStatusBarProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const StyledView = styled(View);
const StyledText = styled(Text);

export const OrderStatusBar: React.FC<OrderStatusBarProps> = ({ status }) => {
  const getStatusIndex = () => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const statusIndex = getStatusIndex();
  
  if (status === 'cancelled') {
    return (
      <StyledView className="my-4">
        <StyledView className="flex-row justify-between mb-2">
          <StyledText className="text-error font-medium">Order Cancelled</StyledText>
        </StyledView>
        <StyledView className="h-2 bg-gray-200 rounded-full">
          <StyledView className="h-2 bg-error rounded-full w-full" />
        </StyledView>
      </StyledView>
    );
  }

  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <StyledView className="my-4">
      <StyledView className="flex-row justify-between mb-2">
        {steps.map((step, index) => (
          <StyledText 
            key={index}
            className={`text-xs ${index <= statusIndex ? 'text-primary font-medium' : 'text-gray-400'}`}
          >
            {step}
          </StyledText>
        ))}
      </StyledView>
      <StyledView className="h-2 bg-gray-200 rounded-full">
        <StyledView 
          className="h-2 bg-primary rounded-full" 
          style={{ width: `${(statusIndex + 1) * 25}%` }} 
        />
      </StyledView>
    </StyledView>
  );
};
