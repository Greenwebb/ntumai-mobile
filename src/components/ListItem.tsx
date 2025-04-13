import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  divider?: boolean;
  disabled?: boolean;
  className?: string;
  testID?: string;
}

/**
 * ListItem component for displaying items in a list
 * 
 * @example
 * <ListItem 
 *   title="Item Title"
 *   subtitle="Item description"
 *   leftIcon={<Icon name="home" />}
 *   rightIcon={<Icon name="chevron-right" />}
 *   onPress={handlePress}
 *   divider={true}
 * />
 */
export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  divider = true,
  disabled = false,
  className = '',
  testID,
}) => {
  // Base classes
  let containerClasses = 'flex flex-row items-center py-3 px-4';
  
  // Divider class
  if (divider) {
    containerClasses += ' border-b border-gray-200';
  }
  
  // Disabled state
  if (disabled) {
    containerClasses += ' opacity-50';
  }
  
  // Add custom classes
  containerClasses += ` ${className}`;
  
  // Content container
  const contentContainer = (
    <>
      {leftIcon && (
        <StyledView className="mr-3">
          {leftIcon}
        </StyledView>
      )}
      
      <StyledView className="flex-1">
        <StyledText className="text-text font-medium">{title}</StyledText>
        {subtitle && (
          <StyledText className="text-gray-500 text-sm mt-0.5">{subtitle}</StyledText>
        )}
      </StyledView>
      
      {rightIcon && (
        <StyledView className="ml-2">
          {rightIcon}
        </StyledView>
      )}
    </>
  );
  
  // Render as touchable if onPress is provided
  if (onPress && !disabled) {
    return (
      <StyledTouchableOpacity
        className={containerClasses}
        onPress={onPress}
        activeOpacity={0.7}
        testID={testID}
      >
        {contentContainer}
      </StyledTouchableOpacity>
    );
  }
  
  // Otherwise render as a view
  return (
    <StyledView className={containerClasses} testID={testID}>
      {contentContainer}
    </StyledView>
  );
};

export default ListItem;
