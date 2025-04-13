import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = 99,
  size = 'medium',
  style,
}) => {
  // Determine button size
  const getButtonSize = (): number => {
    switch (size) {
      case 'small':
        return 28;
      case 'large':
        return 44;
      case 'medium':
      default:
        return 36;
    }
  };

  const buttonSize = getButtonSize();

  return (
    <View 
      style={[styles.container, style]}
      className="flex-row items-center"
    >
      <TouchableOpacity
        style={[
          styles.button,
          { width: buttonSize, height: buttonSize },
          quantity <= minQuantity && styles.disabledButton
        ]}
        onPress={onDecrease}
        disabled={quantity <= minQuantity}
        className={`bg-secondary rounded-full justify-center items-center ${quantity <= minQuantity ? 'opacity-50' : ''}`}
      >
        <Text style={styles.buttonText} className="text-white font-bold">-</Text>
      </TouchableOpacity>
      
      <View 
        style={[styles.quantityContainer, { minWidth: buttonSize }]}
        className="px-3"
      >
        <Text style={styles.quantityText} className="text-gray-800 font-bold text-center">
          {quantity}
        </Text>
      </View>
      
      <TouchableOpacity
        style={[
          styles.button,
          { width: buttonSize, height: buttonSize },
          quantity >= maxQuantity && styles.disabledButton
        ]}
        onPress={onIncrease}
        disabled={quantity >= maxQuantity}
        className={`bg-secondary rounded-full justify-center items-center ${quantity >= maxQuantity ? 'opacity-50' : ''}`}
      >
        <Text style={styles.buttonText} className="text-white font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.secondary.DEFAULT,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.neutral.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  quantityContainer: {
    paddingHorizontal: 12,
  },
  quantityText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuantitySelector;
