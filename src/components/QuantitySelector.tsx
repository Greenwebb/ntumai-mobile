import React from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99
}) => {
  return (
    <StyledView className="flex-row items-center">
      <StyledTouchableOpacity 
        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
        onPress={onDecrement}
        disabled={quantity <= min}
      >
        <StyledText className={`text-lg font-bold ${quantity <= min ? 'text-gray-400' : 'text-gray-800'}`}>-</StyledText>
      </StyledTouchableOpacity>
      
      <StyledText className="mx-3 font-medium">{quantity}</StyledText>
      
      <StyledTouchableOpacity 
        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
        onPress={onIncrement}
        disabled={quantity >= max}
      >
        <StyledText className={`text-lg font-bold ${quantity >= max ? 'text-gray-400' : 'text-gray-800'}`}>+</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};
=======
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
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
