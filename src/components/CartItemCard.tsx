import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartItemCardProps {
  item: CartItem;
  onIncrement: (item: CartItem) => void;
  onDecrement: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const CartItemCard: React.FC<CartItemCardProps> = ({ 
  item, 
  onIncrement, 
  onDecrement, 
  onRemove 
}) => {
  return (
    <StyledView className="bg-white rounded-lg shadow-sm p-4 mb-3 flex-row">
      <StyledView className="w-16 h-16 bg-gray-200 rounded-md mr-3">
        {item.product.image && (
          <StyledView 
            className="w-full h-full items-center justify-center"
            style={{ backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)` }}
          >
            <StyledText className="text-lg font-bold">{item.product.name.charAt(0)}</StyledText>
          </StyledView>
        )}
      </StyledView>
      
      <StyledView className="flex-1">
        <StyledText className="font-medium text-base">{item.product.name}</StyledText>
        <StyledText className="text-primary font-bold mt-1">${item.product.price.toFixed(2)}</StyledText>
        
        <StyledView className="flex-row items-center justify-between mt-2">
          <StyledView className="flex-row items-center">
            <StyledTouchableOpacity 
              className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
              onPress={() => onDecrement(item)}
            >
              <StyledText className="text-lg font-bold">-</StyledText>
            </StyledTouchableOpacity>
            
            <StyledText className="mx-3 font-medium">{item.quantity}</StyledText>
            
            <StyledTouchableOpacity 
              className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
              onPress={() => onIncrement(item)}
            >
              <StyledText className="text-lg font-bold">+</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          
          <StyledTouchableOpacity onPress={() => onRemove(item)}>
            <StyledText className="text-error">Remove</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};
