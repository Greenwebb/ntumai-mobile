import React from 'react';
<<<<<<< HEAD
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useCartStore } from '../../store/cartStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { CartItemCard } from '../../components/CartItemCard';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const CartScreen = ({ navigation }: any) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    subtotal,
    tax,
    deliveryFee,
    total
  } = useCartStore();
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };
  
  const handleContinueShopping = () => {
    navigation.navigate('HomeTab');
  };
  
  if (cartItems.length === 0) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <Header title="Cart" showBackButton={false} />
        
        <StyledView className="flex-1 items-center justify-center p-6">
          <StyledView className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-4">
            <StyledText className="text-4xl">🛒</StyledText>
          </StyledView>
          
          <StyledText className="text-xl font-bold mb-2">Your Cart is Empty</StyledText>
          <StyledText className="text-gray-500 text-center mb-8">
            Looks like you haven't added any products to your cart yet.
          </StyledText>
          
          <Button
            title="Continue Shopping"
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleContinueShopping}
          />
        </StyledView>
      </StyledSafeAreaView>
    );
  }
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header 
        title="Cart" 
        showBackButton={false}
        rightComponent={
          <StyledTouchableOpacity onPress={clearCart}>
            <StyledText className="text-primary">Clear All</StyledText>
          </StyledTouchableOpacity>
        }
      />
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onQuantityChange={(quantity) => handleQuantityChange(item.product.id, quantity)}
            onRemove={() => handleRemoveItem(item.product.id)}
            style={{ marginBottom: 12 }}
          />
        )}
      />
      
      {/* Order Summary */}
      <StyledView className="p-4 border-t border-gray-200">
        <StyledText className="text-lg font-bold mb-3">Order Summary</StyledText>
        
        <StyledView className="flex-row justify-between mb-2">
          <StyledText className="text-gray-500">Subtotal</StyledText>
          <StyledText>${subtotal.toFixed(2)}</StyledText>
        </StyledView>
        
        <StyledView className="flex-row justify-between mb-2">
          <StyledText className="text-gray-500">Tax</StyledText>
          <StyledText>${tax.toFixed(2)}</StyledText>
        </StyledView>
        
        <StyledView className="flex-row justify-between mb-3">
          <StyledText className="text-gray-500">Delivery Fee</StyledText>
          <StyledText>${deliveryFee.toFixed(2)}</StyledText>
        </StyledView>
        
        <StyledView className="flex-row justify-between mb-4">
          <StyledText className="font-bold">Total</StyledText>
          <StyledText className="font-bold text-primary">${total.toFixed(2)}</StyledText>
        </StyledView>
        
        <Button
          title="Proceed to Checkout"
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleCheckout}
        />
      </StyledView>
    </StyledSafeAreaView>
  );
};
=======
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  options?: {
    name: string;
    value: string;
    price: number;
  }[];
  vendorId: string;
  vendorName: string;
}

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
  onProductPress: (productId: string) => void;
}

const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
  onProductPress,
}) => {
  // Group items by vendor
  const itemsByVendor: Record<string, CartItem[]> = {};
  cartItems.forEach(item => {
    if (!itemsByVendor[item.vendorId]) {
      itemsByVendor[item.vendorId] = [];
    }
    itemsByVendor[item.vendorId].push(item);
  });

  // Calculate subtotal
  const calculateSubtotal = (): number => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const optionsTotal = item.options ? 
        item.options.reduce((sum, option) => sum + option.price, 0) * item.quantity : 0;
      return total + itemTotal + optionsTotal;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartIcon}>🛒</Text>
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartMessage}>
            Looks like you haven't added any items to your cart yet.
          </Text>
          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={onContinueShopping}
          >
            <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            {Object.entries(itemsByVendor).map(([vendorId, items]) => (
              <View key={vendorId} style={styles.vendorSection}>
                <Text style={styles.vendorName}>{items[0].vendorName}</Text>
                
                {items.map(item => (
                  <View key={item.id} style={styles.cartItem}>
                    <TouchableOpacity 
                      style={styles.itemImageContainer}
                      onPress={() => onProductPress(item.productId)}
                    >
                      <Text style={styles.itemImagePlaceholder}>🖼️</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.itemDetails}>
                      <TouchableOpacity onPress={() => onProductPress(item.productId)}>
                        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                      </TouchableOpacity>
                      
                      {item.options && item.options.length > 0 && (
                        <View style={styles.itemOptions}>
                          {item.options.map((option, index) => (
                            <Text key={index} style={styles.itemOption}>
                              {option.name}: {option.value}
                              {option.price > 0 && ` (+$${option.price.toFixed(2)})`}
                            </Text>
                          ))}
                        </View>
                      )}
                      
                      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                      
                      <View style={styles.itemActions}>
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity 
                            style={styles.quantityButton}
                            onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Text style={styles.quantityButtonText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>{item.quantity}</Text>
                          <TouchableOpacity 
                            style={styles.quantityButton}
                            onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Text style={styles.quantityButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity 
                          style={styles.removeButton}
                          onPress={() => onRemoveItem(item.id)}
                        >
                          <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={onCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  itemCount: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyCartIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyCartTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptyCartMessage: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  continueShoppingButton: {
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  continueShoppingButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
  scrollView: {
    flex: 1,
  },
  vendorSection: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  vendorName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    padding: 16,
    paddingBottom: 8,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemImagePlaceholder: {
    fontSize: 32,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  itemOptions: {
    marginBottom: 4,
  },
  itemOption: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
    marginBottom: 8,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  quantityText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  removeButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.status.error,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.secondary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  checkoutButton: {
    backgroundColor: colors.primary.DEFAULT,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
});

export default CartScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
