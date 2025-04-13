import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'small' | 'medium' | 'large';
  rounded?: 'none' | 'small' | 'medium' | 'large' | 'full';
  className?: string;
  testID?: string;
}

/**
 * Card component with multiple variants
 * 
 * @example
 * <Card variant="elevated" padding="medium" rounded="medium" onPress={handlePress}>
 *   <Text>Card Content</Text>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'elevated',
  padding = 'medium',
  rounded = 'medium',
  className = '',
  testID,
}) => {
  // Base classes
  let cardClasses = 'bg-white';
  
  // Variant classes
  switch (variant) {
    case 'outlined':
      cardClasses += ' border border-gray-200';
      break;
    case 'flat':
      cardClasses += '';
      break;
    case 'elevated':
    default:
      cardClasses += ' shadow-md';
  }
  
  // Padding classes
  switch (padding) {
    case 'none':
      cardClasses += '';
      break;
    case 'small':
      cardClasses += ' p-2';
      break;
    case 'large':
      cardClasses += ' p-6';
      break;
    case 'medium':
    default:
      cardClasses += ' p-4';
  }
  
  // Rounded classes
  switch (rounded) {
    case 'none':
      cardClasses += '';
      break;
    case 'small':
      cardClasses += ' rounded-sm';
      break;
    case 'large':
      cardClasses += ' rounded-xl';
      break;
    case 'full':
      cardClasses += ' rounded-full';
      break;
    case 'medium':
    default:
      cardClasses += ' rounded-lg';
  }
  
  // Add custom classes
  cardClasses += ` ${className}`;
  
  // Render as touchable if onPress is provided
  if (onPress) {
    return (
      <StyledTouchableOpacity
        className={cardClasses}
        onPress={onPress}
        activeOpacity={0.7}
        testID={testID}
      >
        {children}
      </StyledTouchableOpacity>
    );
  }
  
  // Otherwise render as a view
  return (
    <StyledView className={cardClasses} testID={testID}>
      {children}
    </StyledView>
  );
};

export default Card;
