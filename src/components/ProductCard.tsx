import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <StyledTouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 w-full"
      onPress={() => onPress(product)}
    >
      <StyledImage 
        source={{ uri: product.image }} 
        className="w-full h-40" 
        resizeMode="cover"
      />
      <StyledView className="p-3">
        <StyledText className="text-gray-500 text-xs mb-1">{product.category}</StyledText>
        <StyledText className="font-semibold text-base mb-1">{product.name}</StyledText>
        <StyledView className="flex-row justify-between items-center mt-2">
          <StyledText className="text-primary font-bold text-lg">${product.price.toFixed(2)}</StyledText>
          <StyledView className="flex-row items-center">
            <StyledText className="text-yellow-500 mr-1">★</StyledText>
            <StyledText className="text-gray-700">{product.rating.toFixed(1)}</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
};
