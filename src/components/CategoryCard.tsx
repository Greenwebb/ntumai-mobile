import React from 'react';
<<<<<<< HEAD
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
=======
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

// Define the category interface
interface Category {
  id: string;
  name: string;
  image?: string;
  icon?: string | React.ReactNode;
}

interface CategoryCardProps {
  category: Category;
  onPress?: (category: Category) => void;
  style?: ViewStyle;
  isSelected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
  style,
  isSelected = false,
}) => {
  const {
    name,
    icon,
  } = category;

  // If icon is a string, render emoji or text representation
  // In a real app, you would use a proper icon library
  const renderIcon = () => {
    if (icon && typeof icon === 'string') {
      return (
        <Text 
          style={{ 
            fontSize: 24, 
            color: isSelected ? colors.neutral.white : colors.text.secondary 
          }}
        >
          {icon}
        </Text>
      );
    }
    return icon;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container, 
        isSelected && styles.selectedContainer,
        style
      ]}
      onPress={() => onPress && onPress(category)}
      activeOpacity={0.8}
      className={`items-center p-3 m-1 rounded-xl ${isSelected ? 'bg-teal-100' : 'bg-gray-100'}`}
    >
      <View 
        style={[
          styles.iconContainer,
          isSelected && styles.selectedIconContainer
        ]}
        className={`justify-center items-center rounded-full mb-2 ${isSelected ? 'bg-primary' : 'bg-white'}`}
      >
        {renderIcon()}
      </View>
      
      <Text 
        style={[
          styles.name,
          isSelected && styles.selectedName
        ]}
        numberOfLines={1}
        className={`text-center ${isSelected ? 'text-primary font-bold' : 'text-gray-600'}`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 12,
    margin: 4,
    borderRadius: 12,
    backgroundColor: colors.background.tertiary,
    minWidth: 80,
  },
  selectedContainer: {
    backgroundColor: colors.primary.light,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background.primary,
    marginBottom: 8,
  },
  selectedIconContainer: {
    backgroundColor: colors.primary.DEFAULT,
  },
  name: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  selectedName: {
    color: colors.primary.DEFAULT,
    fontWeight: 'bold',
  },
});

export default CategoryCard;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
