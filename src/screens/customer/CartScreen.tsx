import React from 'react';
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
