import React from 'react';
<<<<<<< HEAD
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
=======
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

// Define button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Define button props with TypeScript interface
export interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  testID?: string;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

/**
 * Button component with multiple variants and sizes
 * 
 * @example
 * <Button 
 *   title="Submit" 
 *   variant="primary" 
 *   size="md" 
 *   onPress={handleSubmit} 
 *   loading={isSubmitting} 
 * />
 */
export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  testID,
}) => {
  // Base classes for all buttons
  let buttonClasses = 'flex flex-row items-center justify-center rounded-full';
  let textClasses = 'font-medium text-center';
  
  // Size classes
  switch (size) {
    case 'sm':
      buttonClasses += ' py-2 px-3';
      textClasses += ' text-sm';
      break;
    case 'lg':
      buttonClasses += ' py-4 px-6';
      textClasses += ' text-lg';
      break;
    case 'md':
    default:
      buttonClasses += ' py-3 px-5';
      textClasses += ' text-base';
  }
  
  // Variant classes
  switch (variant) {
    case 'secondary':
      buttonClasses += ' bg-secondary';
      textClasses += ' text-white';
      break;
    case 'outline':
      buttonClasses += ' bg-transparent border border-primary';
      textClasses += ' text-primary';
      break;
    case 'ghost':
      buttonClasses += ' bg-transparent';
      textClasses += ' text-primary';
      break;
    case 'primary':
    default:
      buttonClasses += ' bg-primary';
      textClasses += ' text-white';
  }
  
  // Disabled state
  if (disabled) {
    buttonClasses += ' opacity-50';
  }
  
  // Full width
  if (fullWidth) {
    buttonClasses += ' w-full';
  }
  
  // Add custom classes
  buttonClasses += ` ${className}`;
  
  return (
    <StyledTouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? 'white' : '#00A896'} />
      ) : (
        <>
          {leftIcon && <StyledView className="mr-2">{leftIcon}</StyledView>}
          <StyledText className={textClasses}>{title}</StyledText>
          {rightIcon && <StyledView className="ml-2">{rightIcon}</StyledView>}
        </>
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
      )}
    </StyledTouchableOpacity>
  );
};
<<<<<<< HEAD
=======

export default Button;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
