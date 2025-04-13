import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent
}) => {
  return (
    <StyledView className="bg-white p-4 flex-row items-center justify-between border-b border-gray-100">
      <StyledView className="flex-row items-center">
        {showBackButton && (
          <StyledTouchableOpacity 
            className="mr-2 p-2" 
            onPress={onBackPress}
          >
            <StyledText className="text-xl">←</StyledText>
          </StyledTouchableOpacity>
        )}
        <StyledText className="font-bold text-lg">{title}</StyledText>
      </StyledView>
      
      {rightComponent && (
        <StyledView>
          {rightComponent}
        </StyledView>
      )}
    </StyledView>
  );
};
