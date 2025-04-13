import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99
}) => {
  return (
    <StyledView className="flex-row items-center">
      <StyledTouchableOpacity 
        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
        onPress={onDecrement}
        disabled={quantity <= min}
      >
        <StyledText className={`text-lg font-bold ${quantity <= min ? 'text-gray-400' : 'text-gray-800'}`}>-</StyledText>
      </StyledTouchableOpacity>
      
      <StyledText className="mx-3 font-medium">{quantity}</StyledText>
      
      <StyledTouchableOpacity 
        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
        onPress={onIncrement}
        disabled={quantity >= max}
      >
        <StyledText className={`text-lg font-bold ${quantity >= max ? 'text-gray-400' : 'text-gray-800'}`}>+</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};
