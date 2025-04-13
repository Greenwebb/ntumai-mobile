import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

interface BadgeProps {
  count: number;
  maxCount?: number;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const Badge: React.FC<BadgeProps> = ({
  count,
  maxCount = 99,
  color = 'primary',
  size = 'medium',
  style,
}) => {
  // Get background color based on color prop
  const getBackgroundColor = (): string => {
    switch (color) {
      case 'primary':
        return colors.primary.DEFAULT;
      case 'secondary':
        return colors.secondary.DEFAULT;
      case 'error':
        return colors.status.error;
      case 'warning':
        return colors.status.warning;
      case 'success':
        return colors.status.success;
      default:
        return colors.primary.DEFAULT;
    }
  };

  // Get size based on size prop
  const getBadgeSize = (): number => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 28;
      case 'medium':
      default:
        return 22;
    }
  };

  // Get font size based on size prop
  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return typography.fontSize.xs;
      case 'large':
        return typography.fontSize.sm;
      case 'medium':
      default:
        return typography.fontSize.xs;
    }
  };

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  const badgeSize = getBadgeSize();
  const fontSize = getFontSize();
  const backgroundColor = getBackgroundColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          minWidth: badgeSize,
          height: badgeSize,
          borderRadius: badgeSize / 2,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize,
          },
        ]}
      >
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.neutral.white,
    fontWeight: 'bold',
  },
});

export default Badge;
