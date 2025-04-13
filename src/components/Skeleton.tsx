import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

interface SkeletonProps {
  type?: 'rectangle' | 'circle' | 'text' | 'card';
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
  animated?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  type = 'rectangle',
  width,
  height,
  style,
  animated = true,
}) => {
  // Get dimensions based on type
  const getDimensions = (): { width: number | string; height: number | string } => {
    switch (type) {
      case 'circle':
        return { width: width || 48, height: height || 48 };
      case 'text':
        return { width: width || '100%', height: height || 16 };
      case 'card':
        return { width: width || '100%', height: height || 120 };
      case 'rectangle':
      default:
        return { width: width || '100%', height: height || 48 };
    }
  };

  // Get border radius based on type
  const getBorderRadius = (): number => {
    switch (type) {
      case 'circle':
        return 100;
      case 'card':
        return 12;
      case 'text':
        return 4;
      case 'rectangle':
      default:
        return 8;
    }
  };

  const dimensions = getDimensions();
  const borderRadius = getBorderRadius();

  return (
    <View
      style={[
        styles.skeleton,
        {
          width: dimensions.width,
          height: dimensions.height,
          borderRadius,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.neutral.gray200,
    overflow: 'hidden',
  },
});

export default Skeleton;
