import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

interface TagProps {
  label: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  onPress?: () => void;
}

const Tag: React.FC<TagProps> = ({
  label,
  color = 'default',
  size = 'medium',
  style,
  onPress,
}) => {
  // Get background color based on color prop
  const getBackgroundColor = (): string => {
    switch (color) {
      case 'primary':
        return colors.primary.light;
      case 'secondary':
        return colors.secondary.light;
      case 'success':
        return colors.status.success + '20'; // 20% opacity
      case 'warning':
        return colors.status.warning + '20';
      case 'error':
        return colors.status.error + '20';
      case 'info':
        return colors.status.info + '20';
      case 'default':
      default:
        return colors.neutral.gray100;
    }
  };

  // Get text color based on color prop
  const getTextColor = (): string => {
    switch (color) {
      case 'primary':
        return colors.primary.DEFAULT;
      case 'secondary':
        return colors.secondary.DEFAULT;
      case 'success':
        return colors.status.success;
      case 'warning':
        return colors.status.warning;
      case 'error':
        return colors.status.error;
      case 'info':
        return colors.status.info;
      case 'default':
      default:
        return colors.text.secondary;
    }
  };

  // Get font size based on size prop
  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return typography.fontSize.xs;
      case 'large':
        return typography.fontSize.base;
      case 'medium':
      default:
        return typography.fontSize.sm;
    }
  };

  // Get padding based on size prop
  const getPadding = (): { horizontal: number; vertical: number } => {
    switch (size) {
      case 'small':
        return { horizontal: 6, vertical: 2 };
      case 'large':
        return { horizontal: 12, vertical: 6 };
      case 'medium':
      default:
        return { horizontal: 8, vertical: 4 };
    }
  };

  const padding = getPadding();
  const backgroundColor = getBackgroundColor();
  const textColor = getTextColor();
  const fontSize = getFontSize();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingHorizontal: padding.horizontal,
          paddingVertical: padding.vertical,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: textColor,
            fontSize,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: '500',
  },
});

export default Tag;
