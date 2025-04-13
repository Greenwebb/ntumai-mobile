import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circle' | 'rounded' | 'square';

export interface AvatarProps {
  source: string | { uri: string };
  size?: AvatarSize;
  variant?: AvatarVariant;
  fallbackText?: string;
  className?: string;
  testID?: string;
}

/**
 * Avatar component for displaying user profile images
 * 
 * @example
 * <Avatar 
 *   source={{ uri: 'https://example.com/avatar.jpg' }} 
 *   size="md" 
 *   variant="circle" 
 *   fallbackText="JD" 
 * />
 */
export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'md',
  variant = 'circle',
  fallbackText,
  className = '',
  testID,
}) => {
  // State to track image loading errors
  const [hasError, setHasError] = React.useState(false);
  
  // Size classes
  let containerClasses = 'overflow-hidden bg-gray-200 justify-center items-center';
  let imageClasses = 'w-full h-full';
  let textClasses = 'font-semibold text-gray-600';
  
  // Size dimensions
  let dimensions: number;
  switch (size) {
    case 'xs':
      dimensions = 24;
      textClasses += ' text-xs';
      break;
    case 'sm':
      dimensions = 32;
      textClasses += ' text-sm';
      break;
    case 'lg':
      dimensions = 56;
      textClasses += ' text-lg';
      break;
    case 'xl':
      dimensions = 72;
      textClasses += ' text-xl';
      break;
    case 'md':
    default:
      dimensions = 40;
      textClasses += ' text-base';
  }
  
  // Variant classes
  switch (variant) {
    case 'rounded':
      containerClasses += ' rounded-md';
      break;
    case 'square':
      containerClasses += '';
      break;
    case 'circle':
    default:
      containerClasses += ' rounded-full';
  }
  
  // Add custom classes
  containerClasses += ` ${className}`;
  
  // Get initials from fallback text
  const getInitials = (text?: string): string => {
    if (!text) return '';
    return text
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <StyledView 
      className={containerClasses} 
      style={{ width: dimensions, height: dimensions }}
      testID={testID}
    >
      {!hasError && (
        <StyledImage
          source={typeof source === 'string' ? { uri: source } : source}
          className={imageClasses}
          onError={() => setHasError(true)}
        />
      )}
      
      {hasError && fallbackText && (
        <StyledText className={textClasses}>
          {getInitials(fallbackText)}
        </StyledText>
      )}
    </StyledView>
  );
};

export default Avatar;
