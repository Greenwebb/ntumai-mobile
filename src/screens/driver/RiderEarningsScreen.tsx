import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useDriverStore } from '../../store/driverStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const RiderEarningsScreen = ({ navigation }: any) => {
  const [period, setPeriod] = useState('week'); // 'day', 'week', 'month', 'year'
  
  const { 
    earnings, 
    fetchEarnings,
    isLoading 
  } = useDriverStore();
  
  useEffect(() => {
    fetchEarnings(period);
  }, [period]);
  
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Earnings" onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Period Selector */}
        <StyledView className="flex-row justify-between px-4 py-3">
          {['day', 'week', 'month', 'year'].map((p) => (
            <StyledTouchableOpacity
              key={p}
              className={`py-2 px-4 rounded-full ${
                period === p ? 'bg-primary' : 'bg-gray-100'
              }`}
              onPress={() => handlePeriodChange(p)}
            >
              <StyledText
                className={`font-medium ${
                  period === p ? 'text-white' : 'text-gray-700'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </StyledText>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
        
        {/* Earnings Summary */}
        <StyledView className="p-4 bg-primary">
          <StyledText className="text-white text-center mb-2">Total Earnings</StyledText>
          <StyledText className="text-white text-center text-3xl font-bold">
            ${earnings.total.toFixed(2)}
          </StyledText>
          <StyledText className="text-white text-center mt-2">
            {earnings.deliveries} deliveries • {earnings.hours} hours online
          </StyledText>
        </StyledView>
        
        {/* Earnings Breakdown */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Earnings Breakdown</StyledText>
          
          <StyledView className="flex-row justify-between mb-3">
            <StyledText className="text-gray-500">Delivery Earnings</StyledText>
            <StyledText className="font-medium">${earnings.deliveryEarnings.toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-3">
            <StyledText className="text-gray-500">Tips</StyledText>
            <StyledText className="font-medium">${earnings.tips.toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-3">
            <StyledText className="text-gray-500">Bonuses</StyledText>
            <StyledText className="font-medium">${earnings.bonuses.toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between pt-3 mt-3 border-t border-gray-200">
            <StyledText className="font-bold">Total</StyledText>
            <StyledText className="font-bold">${earnings.total.toFixed(2)}</StyledText>
          </StyledView>
        </StyledView>
        
        {/* Recent Payments */}
        <StyledView className="p-4">
          <StyledText className="text-lg font-bold mb-4">Recent Payments</StyledText>
          
          {earnings.recentPayments.length === 0 ? (
            <StyledView className="bg-gray-100 rounded-lg p-4 items-center">
              <StyledText className="text-gray-500">No recent payments found.</StyledText>
            </StyledView>
          ) : (
            earnings.recentPayments.map((payment, index) => (
              <StyledView 
                key={index} 
                className="bg-gray-50 rounded-lg p-3 mb-3"
              >
                <StyledView className="flex-row justify-between mb-1">
                  <StyledText className="font-medium">{payment.date}</StyledText>
                  <StyledText className="text-primary font-medium">${payment.amount.toFixed(2)}</StyledText>
                </StyledView>
                
                <StyledText className="text-gray-500">
                  {payment.deliveries} deliveries • {payment.hours} hours
                </StyledText>
              </StyledView>
            ))
          )}
        </StyledView>
        
        {/* Cash Out Button */}
        <StyledView className="p-4 mt-4">
          <Button
            title="Cash Out"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => {}}
          />
          <StyledText className="text-gray-500 text-center mt-2">
            Available for instant cash out: ${earnings.availableCashout.toFixed(2)}
          </StyledText>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
