import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

export const SplashScreen = ({ navigation }: any) => {
  const { login } = useAuthStore();

  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledView className="flex-1 items-center justify-center p-6">
        <StyledView className="w-32 h-32 bg-primary rounded-full items-center justify-center mb-8">
          <StyledText className="text-white text-4xl font-bold">N</StyledText>
        </StyledView>
        
        <StyledText className="text-3xl font-bold text-center mb-2">Ntumai</StyledText>
        <StyledText className="text-lg text-gray-600 text-center mb-12">
          Your one-stop marketplace for all your needs
        </StyledText>
        
        <Button 
          title="Get Started" 
          variant="primary" 
          size="lg" 
          fullWidth 
          onPress={handleGetStarted}
        />
      </StyledView>
    </StyledSafeAreaView>
  );
};
