import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

interface PriceDisplayProps {
  price: number;
  discountedPrice?: number;
  currency?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  discountedPrice,
  currency = '$',
  size = 'medium',
  style,
}) => {
  // Get font sizes based on size prop
  const getFontSizes = (): { primary: number; secondary: number } => {
    switch (size) {
      case 'small':
        return { primary: typography.fontSize.sm, secondary: typography.fontSize.xs };
      case 'large':
        return { primary: typography.fontSize.xl, secondary: typography.fontSize.base };
      case 'medium':
      default:
        return { primary: typography.fontSize.lg, secondary: typography.fontSize.sm };
    }
  };

  const fontSizes = getFontSizes();

  return (
    <View style={[styles.container, style]}>
      {discountedPrice !== undefined && discountedPrice < price ? (
        <View style={styles.discountContainer}>
          <Text
            style={[
              styles.discountedPrice,
              { fontSize: fontSizes.primary },
            ]}
          >
            {`${currency}${discountedPrice.toFixed(2)}`}
          </Text>
          <Text
            style={[
              styles.originalPrice,
              { fontSize: fontSizes.secondary },
            ]}
          >
            {`${currency}${price.toFixed(2)}`}
          </Text>
        </View>
      ) : (
        <Text
          style={[
            styles.price,
            { fontSize: fontSizes.primary },
          ]}
        >
          {`${currency}${price.toFixed(2)}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  discountedPrice: {
    color: colors.primary.DEFAULT,
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
});

export default PriceDisplay;
