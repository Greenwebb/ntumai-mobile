import React from 'react';
import { View, Text, TextInput as RNTextInput, TextInputProps } from 'react-native';
import { styled } from 'nativewind';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const StyledTextInput = styled(RNTextInput);
const StyledView = styled(View);
const StyledText = styled(Text);

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  containerClassName = '',
  ...props
}) => {
  return (
    <StyledView className={`mb-4 ${containerClassName}`}>
      {label && (
        <StyledText className="text-gray-700 mb-1 font-medium">{label}</StyledText>
      )}
      <StyledTextInput
        className={`border rounded-lg p-3 bg-white ${
          error ? 'border-error' : 'border-border'
        }`}
        placeholderTextColor="#A0A0A0"
        {...props}
      />
      {error && (
        <StyledText className="text-error text-xs mt-1">{error}</StyledText>
      )}
    </StyledView>
  );
};
