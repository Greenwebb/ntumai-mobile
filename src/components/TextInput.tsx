import React from 'react';
import { View, Text, TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(RNTextInput);

export type TextInputVariant = 'default' | 'outline' | 'filled';
export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  variant?: TextInputVariant;
  size?: TextInputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

/**
 * TextInput component with multiple variants and sizes
 * 
 * @example
 * <TextInput 
 *   label="Email"
 *   placeholder="Enter your email"
 *   variant="outline"
 *   size="md"
 *   error={errors.email}
 *   onChangeText={handleChange('email')}
 *   value={values.email}
 *   keyboardType="email-address"
 * />
 */
export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helper,
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  helperClassName = '',
  ...rest
}) => {
  // Container classes
  let containerClasses = 'mb-4';
  if (fullWidth) {
    containerClasses += ' w-full';
  }
  containerClasses += ` ${containerClassName}`;
  
  // Label classes
  let labelClasses = 'text-text mb-1 font-medium';
  switch (size) {
    case 'sm':
      labelClasses += ' text-xs';
      break;
    case 'lg':
      labelClasses += ' text-base';
      break;
    case 'md':
    default:
      labelClasses += ' text-sm';
  }
  labelClasses += ` ${labelClassName}`;
  
  // Input container classes
  let inputContainerClasses = 'flex flex-row items-center overflow-hidden';
  
  // Input classes
  let inputClasses = 'flex-1';
  
  // Size classes for input
  switch (size) {
    case 'sm':
      inputClasses += ' py-1 px-2 text-sm';
      inputContainerClasses += ' rounded-md';
      break;
    case 'lg':
      inputClasses += ' py-3 px-4 text-lg';
      inputContainerClasses += ' rounded-xl';
      break;
    case 'md':
    default:
      inputClasses += ' py-2 px-3 text-base';
      inputContainerClasses += ' rounded-lg';
  }
  
  // Variant classes
  switch (variant) {
    case 'outline':
      inputContainerClasses += ' border border-gray-300';
      if (error) {
        inputContainerClasses += ' border-error';
      } else if (rest.value) {
        inputContainerClasses += ' border-primary';
      }
      break;
    case 'filled':
      inputContainerClasses += ' bg-gray-100';
      if (error) {
        inputContainerClasses += ' border border-error';
      }
      break;
    case 'default':
    default:
      inputContainerClasses += ' border-b border-gray-300';
      if (error) {
        inputContainerClasses += ' border-error';
      } else if (rest.value) {
        inputContainerClasses += ' border-primary';
      }
  }
  
  // Error and helper classes
  let errorClasses = 'text-error text-xs mt-1';
  errorClasses += ` ${errorClassName}`;
  
  let helperClasses = 'text-gray-500 text-xs mt-1';
  helperClasses += ` ${helperClassName}`;
  
  // Add custom classes
  inputClasses += ` ${inputClassName}`;
  
  return (
    <StyledView className={containerClasses}>
      {label && <StyledText className={labelClasses}>{label}</StyledText>}
      
      <StyledView className={inputContainerClasses}>
        {leftIcon && <StyledView className="pl-3">{leftIcon}</StyledView>}
        
        <StyledTextInput
          className={inputClasses}
          placeholderTextColor="#9CA3AF"
          {...rest}
        />
        
        {rightIcon && <StyledView className="pr-3">{rightIcon}</StyledView>}
      </StyledView>
      
      {error && <StyledText className={errorClasses}>{error}</StyledText>}
      {!error && helper && <StyledText className={helperClasses}>{helper}</StyledText>}
    </StyledView>
  );
};

export default TextInput;
