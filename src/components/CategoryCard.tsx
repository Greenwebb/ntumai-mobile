import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <StyledTouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mr-4 mb-2"
      style={{ width: 120 }}
      onPress={() => onPress(category)}
    >
      <StyledView 
        className="h-24 bg-gray-200 items-center justify-center"
        style={{ 
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)` 
        }}
      >
        <StyledText className="text-2xl">{category.name.charAt(0)}</StyledText>
      </StyledView>
      <StyledView className="p-2">
        <StyledText className="font-medium text-center">{category.name}</StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  );
};
