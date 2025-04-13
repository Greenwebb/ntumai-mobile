import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export interface RatingProps {
  value: number;
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  testID?: string;
}

/**
 * Rating component for displaying star ratings
 * 
 * @example
 * <Rating 
 *   value={3.5} 
 *   maxValue={5} 
 *   size="md" 
 *   showValue={true} 
 * />
 */
export const Rating: React.FC<RatingProps> = ({
  value,
  maxValue = 5,
  size = 'md',
  showValue = false,
  activeColor = '#FFD166', // Yellow color from theme
  inactiveColor = '#E5E7EB', // Light gray
  className = '',
  testID,
}) => {
  // Ensure value is within bounds
  const normalizedValue = Math.max(0, Math.min(value, maxValue));
  
  // Size classes
  let containerClasses = 'flex flex-row items-center';
  let starSize: number;
  let textClasses = 'ml-1 text-gray-700';
  
  switch (size) {
    case 'sm':
      starSize = 12;
      textClasses += ' text-xs';
      break;
    case 'lg':
      starSize = 24;
      textClasses += ' text-base';
      break;
    case 'md':
    default:
      starSize = 16;
      textClasses += ' text-sm';
  }
  
  // Add custom classes
  containerClasses += ` ${className}`;
  
  // Generate stars
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(normalizedValue);
    const hasHalfStar = normalizedValue - fullStars >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StyledView key={`star-full-${i}`} style={{ width: starSize, height: starSize }}>
          <StyledView 
            style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: activeColor,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }} 
          />
        </StyledView>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <StyledView key="star-half" style={{ width: starSize, height: starSize }}>
          <StyledView 
            style={{ 
              width: '50%', 
              height: '100%', 
              backgroundColor: activeColor,
              position: 'absolute',
              left: 0,
              clipPath: 'polygon(50% 0%, 50% 100%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }} 
          />
          <StyledView 
            style={{ 
              width: '50%', 
              height: '100%', 
              backgroundColor: inactiveColor,
              position: 'absolute',
              right: 0,
              clipPath: 'polygon(50% 0%, 50% 100%, 79% 91%, 68% 57%, 98% 35%, 61% 35%)'
            }} 
          />
        </StyledView>
      );
    }
    
    // Empty stars
    const emptyStars = maxValue - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StyledView key={`star-empty-${i}`} style={{ width: starSize, height: starSize }}>
          <StyledView 
            style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: inactiveColor,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }} 
          />
        </StyledView>
      );
    }
    
    return stars;
  };
  
  return (
    <StyledView className={containerClasses} testID={testID}>
      {renderStars()}
      
      {showValue && (
        <StyledText className={textClasses}>
          {normalizedValue.toFixed(1)}
        </StyledText>
      )}
    </StyledView>
  );
};

export default Rating;
