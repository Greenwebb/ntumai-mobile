import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useProductsStore } from '../../store/productsStore';
import { useCartStore } from '../../store/cartStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { QuantitySelector } from '../../components/QuantitySelector';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const ProductDetailsScreen = ({ navigation, route }: any) => {
  const { productId } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  
  const { products, fetchProducts, isLoading } = useProductsStore();
  const { addToCart } = useCartStore();
  
  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, []);
  
  const product = products.find(p => p.id === productId);
  
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigation.navigate('CartTab');
    }
  };
  
  if (isLoading || !product) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <Header title="Product Details" onBack={() => navigation.goBack()} />
        <StyledView className="flex-1 items-center justify-center">
          <StyledText>Loading...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Product Details" onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Product Image */}
        <StyledView className="w-full aspect-square bg-gray-100">
          <StyledText className="text-9xl text-center mt-16">🥗</StyledText>
        </StyledView>
        
        {/* Product Info */}
        <StyledView className="p-4">
          <StyledView className="flex-row justify-between items-start mb-2">
            <StyledText className="text-2xl font-bold flex-1">{product.name}</StyledText>
            <StyledView className="bg-primary/10 px-2 py-1 rounded">
              <StyledText className="text-primary font-medium">${product.price.toFixed(2)}</StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="flex-row items-center mb-4">
            <StyledView className="flex-row items-center mr-4">
              <StyledText className="text-yellow-500 mr-1">★</StyledText>
              <StyledText className="text-gray-700">{product.rating}</StyledText>
            </StyledView>
            <StyledText className="text-gray-500">{product.reviews} reviews</StyledText>
          </StyledView>
          
          <StyledView className="mb-4">
            <StyledText className="text-lg font-medium mb-2">Description</StyledText>
            <StyledText className="text-gray-600 leading-5">{product.description}</StyledText>
          </StyledView>
          
          <StyledView className="mb-4">
            <StyledText className="text-lg font-medium mb-2">Vendor</StyledText>
            <StyledView className="flex-row items-center">
              <StyledView className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
                <StyledText>🏪</StyledText>
              </StyledView>
              <StyledText className="text-gray-700">{product.vendor}</StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="mb-6">
            <StyledText className="text-lg font-medium mb-2">Quantity</StyledText>
            <QuantitySelector
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={10}
            />
          </StyledView>
          
          <StyledView className="flex-row items-center mb-4">
            <StyledText className="text-lg font-medium mr-2">Total:</StyledText>
            <StyledText className="text-xl font-bold text-primary">
              ${(product.price * quantity).toFixed(2)}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledScrollView>
      
      {/* Bottom Action Bar */}
      <StyledView className="p-4 border-t border-gray-200">
        <Button
          title="Add to Cart"
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleAddToCart}
        />
      </StyledView>
    </StyledSafeAreaView>
  );
};
