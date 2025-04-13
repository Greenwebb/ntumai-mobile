import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useCartStore } from '../../store/cartStore';
import { useOrdersStore } from '../../store/ordersStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { AddressCard } from '../../components/AddressCard';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const CheckoutScreen = ({ navigation }: any) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>('card');
  
  const { 
    cartItems, 
    subtotal,
    tax,
    deliveryFee,
    total,
    clearCart
  } = useCartStore();
  
  const {
    addresses,
    fetchAddresses,
    createOrder,
    isLoading
  } = useOrdersStore();
  
  React.useEffect(() => {
    fetchAddresses();
  }, []);
  
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
  };
  
  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };
  
  const handleAddAddress = () => {
    navigation.navigate('AddLocation');
  };
  
  const handlePlaceOrder = async () => {
    if (!selectedAddressId || !selectedPaymentMethod) return;
    
    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    if (!selectedAddress) return;
    
    try {
      await createOrder({
        items: cartItems,
        total,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        address: selectedAddress,
        paymentMethod: selectedPaymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'
      });
      
      clearCart();
      navigation.navigate('DeliveryTracking', { orderId: '1' }); // Using a placeholder orderId
    } catch (error) {
      console.error('Place order error:', error);
    }
  };
  
  const paymentMethods = [
    { id: 'card', title: 'Credit/Debit Card', icon: '💳' },
    { id: 'cod', title: 'Cash on Delivery', icon: '💵' }
  ];
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Checkout" onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Delivery Address */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-lg font-bold">Delivery Address</StyledText>
            <StyledTouchableOpacity onPress={handleAddAddress}>
              <StyledText className="text-primary">Add New</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          
          {addresses.length === 0 ? (
            <StyledView className="bg-gray-100 rounded-lg p-4 items-center">
              <StyledText className="text-gray-500">No addresses found. Add a new address.</StyledText>
            </StyledView>
          ) : (
            addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                selected={selectedAddressId === address.id}
                onSelect={() => handleAddressSelect(address.id)}
                style={{ marginBottom: 8 }}
              />
            ))
          )}
        </StyledView>
        
        {/* Order Summary */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Order Summary</StyledText>
          
          {cartItems.map((item) => (
            <StyledView key={item.product.id} className="flex-row justify-between mb-3">
              <StyledText className="text-gray-700">
                {item.product.name} x {item.quantity}
              </StyledText>
              <StyledText>${(item.product.price * item.quantity).toFixed(2)}</StyledText>
            </StyledView>
          ))}
          
          <StyledView className="border-t border-gray-200 mt-2 pt-3">
            <StyledView className="flex-row justify-between mb-2">
              <StyledText className="text-gray-500">Subtotal</StyledText>
              <StyledText>${subtotal.toFixed(2)}</StyledText>
            </StyledView>
            
            <StyledView className="flex-row justify-between mb-2">
              <StyledText className="text-gray-500">Tax</StyledText>
              <StyledText>${tax.toFixed(2)}</StyledText>
            </StyledView>
            
            <StyledView className="flex-row justify-between mb-2">
              <StyledText className="text-gray-500">Delivery Fee</StyledText>
              <StyledText>${deliveryFee.toFixed(2)}</StyledText>
            </StyledView>
            
            <StyledView className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
              <StyledText className="font-bold">Total</StyledText>
              <StyledText className="font-bold text-primary">${total.toFixed(2)}</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
        
        {/* Payment Method */}
        <StyledView className="p-4">
          <StyledText className="text-lg font-bold mb-4">Payment Method</StyledText>
          
          {paymentMethods.map((method) => (
            <StyledTouchableOpacity
              key={method.id}
              className={`border rounded-lg p-4 mb-3 flex-row items-center ${
                selectedPaymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
              onPress={() => handlePaymentMethodSelect(method.id)}
            >
              <StyledView className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                <StyledText className="text-xl">{method.icon}</StyledText>
              </StyledView>
              
              <StyledText className="flex-1 font-medium">{method.title}</StyledText>
              
              <StyledView 
                className={`w-6 h-6 rounded-full border ${
                  selectedPaymentMethod === method.id 
                    ? 'border-primary bg-primary' 
                    : 'border-gray-300'
                } items-center justify-center`}
              >
                {selectedPaymentMethod === method.id && (
                  <StyledText className="text-white text-xs">✓</StyledText>
                )}
              </StyledView>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      </StyledScrollView>
      
      {/* Bottom Action Bar */}
      <StyledView className="p-4 border-t border-gray-200">
        <Button
          title="Place Order"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!selectedAddressId || !selectedPaymentMethod}
          onPress={handlePlaceOrder}
        />
      </StyledView>
    </StyledSafeAreaView>
  );
};
