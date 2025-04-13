import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  const getButtonStyle = () => {
    let baseStyle = 'rounded-lg flex-row items-center justify-center';
    
    // Size styles
    if (size === 'sm') baseStyle += ' py-2 px-3';
    else if (size === 'md') baseStyle += ' py-3 px-4';
    else if (size === 'lg') baseStyle += ' py-4 px-6';
    
    // Width style
    if (fullWidth) baseStyle += ' w-full';
    
    // Variant styles
    if (variant === 'primary') {
      baseStyle += ' bg-primary';
      if (disabled) baseStyle += ' opacity-50';
    } else if (variant === 'secondary') {
      baseStyle += ' bg-secondary';
      if (disabled) baseStyle += ' opacity-50';
    } else if (variant === 'outline') {
      baseStyle += ' border border-primary';
      if (disabled) baseStyle += ' border-gray-300';
    }
    
    return baseStyle;
  };
  
  const getTextStyle = () => {
    let baseStyle = 'font-medium';
    
    // Size styles
    if (size === 'sm') baseStyle += ' text-sm';
    else if (size === 'md') baseStyle += ' text-base';
    else if (size === 'lg') baseStyle += ' text-lg';
    
    // Variant styles
    if (variant === 'primary' || variant === 'secondary') {
      baseStyle += ' text-white';
    } else if (variant === 'outline') {
      baseStyle += ' text-primary';
      if (disabled) baseStyle += ' text-gray-300';
    }
    
    return baseStyle;
  };
  
  return (
    <StyledTouchableOpacity
      className={getButtonStyle()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' ? '#FF6B00' : '#FFFFFF'} />
      ) : (
        <StyledText className={getTextStyle()}>{title}</StyledText>
      )}
    </StyledTouchableOpacity>
  );
};
