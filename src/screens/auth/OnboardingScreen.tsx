import React, { useState } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '../components/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Welcome to Ntumai',
    description: 'Your one-stop marketplace for all your needs. Shop from local vendors and get products delivered to your doorstep.',
    image: '🛒'
  },
  {
    title: 'Fast Delivery',
    description: 'Get your orders delivered quickly by our reliable delivery partners right to your doorstep.',
    image: '🚚'
  },
  {
    title: 'Sell Your Products',
    description: 'Are you a vendor? Sell your products on our platform and reach more customers.',
    image: '💰'
  }
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledView className="flex-1">
        <StyledView className="flex-row justify-end p-4">
          <StyledText 
            className="text-primary font-medium"
            onPress={handleSkip}
          >
            Skip
          </StyledText>
        </StyledView>
        
        <StyledScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          {onboardingData.map((item, index) => (
            <StyledView 
              key={index} 
              style={{ width }}
              className="items-center px-6"
            >
              <StyledView className="w-40 h-40 bg-primary/10 rounded-full items-center justify-center mb-8">
                <StyledText className="text-6xl">{item.image}</StyledText>
              </StyledView>
              
              <StyledText className="text-2xl font-bold text-center mb-4">
                {item.title}
              </StyledText>
              
              <StyledText className="text-base text-gray-600 text-center mb-8">
                {item.description}
              </StyledText>
            </StyledView>
          ))}
        </StyledScrollView>
        
        <StyledView className="flex-row justify-center mb-8">
          {onboardingData.map((_, index) => (
            <StyledView 
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === activeIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </StyledView>
        
        <StyledView className="px-6 mb-8">
          <Button 
            title={activeIndex === onboardingData.length - 1 ? "Get Started" : "Next"} 
            variant="primary" 
            size="lg" 
            fullWidth 
            onPress={handleNext}
          />
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};
