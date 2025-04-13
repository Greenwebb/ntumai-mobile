import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const OtpVerificationScreen = ({ navigation, route }: any) => {
  const { email } = route.params || { email: '' };
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  
  const { verifyOtp, isLoading } = useAuthStore();
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendActive(true);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);
  
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Auto focus to next input
    if (text && index < 3) {
      // This would normally focus the next input using refs
    }
  };
  
  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      try {
        await verifyOtp(email, otpString);
        navigation.navigate('RoleSelection');
      } catch (error) {
        console.error('OTP verification error:', error);
      }
    }
  };
  
  const handleResendOtp = () => {
    if (isResendActive) {
      // Resend OTP logic
      setTimer(60);
      setIsResendActive(false);
    }
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="OTP Verification" onBack={() => navigation.goBack()} />
      
      <StyledView className="flex-1 px-6 pt-6">
        <StyledText className="text-2xl font-bold mb-2">Verify Your Email</StyledText>
        <StyledText className="text-gray-500 mb-8">
          We have sent a 4-digit code to {email}
        </StyledText>
        
        <StyledView className="flex-row justify-between mb-8">
          {otp.map((digit, index) => (
            <StyledView 
              key={index} 
              className="w-16 h-16 border border-gray-300 rounded-lg items-center justify-center"
            >
              <TextInput
                className="text-2xl font-bold text-center w-full h-full"
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
              />
            </StyledView>
          ))}
        </StyledView>
        
        <Button
          title="Verify"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          onPress={handleVerify}
        />
        
        <StyledView className="flex-row justify-center mt-8">
          <StyledText className="text-gray-500">Didn't receive code? </StyledText>
          <StyledTouchableOpacity 
            onPress={handleResendOtp}
            disabled={!isResendActive}
          >
            <StyledText 
              className={`font-medium ${isResendActive ? 'text-primary' : 'text-gray-400'}`}
            >
              {isResendActive ? 'Resend' : `Resend in ${timer}s`}
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};
