import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const onboardingData: OnboardingItem[] = [
    {
      id: '1',
      title: 'Welcome to Ntumai',
      description: 'Your one-stop marketplace for local products delivered to your doorstep.',
      image: 'onboarding1',
    },
    {
      id: '2',
      title: 'Shop Local Markets',
      description: 'Browse and shop from a variety of local vendors and markets in your area.',
      image: 'onboarding2',
    },
    {
      id: '3',
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly by our trusted delivery partners.',
      image: 'onboarding3',
    },
  ];

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          {/* Placeholder for image */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Image: {item.image}</Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
    }
  };

  const handleSkip = () => {
<<<<<<< HEAD
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
=======
    onComplete();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        initialScrollIndex={currentIndex}
      />
      
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
        <Text style={styles.skipButton} onPress={handleSkip}>
          Skip
        </Text>
        <View style={styles.nextButtonContainer}>
          <Text style={styles.nextButton} onPress={handleNext}>
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: 375, // Assuming standard mobile width
    alignItems: 'center',
    padding: 24,
  },
  imageContainer: {
    marginBottom: 32,
  },
  imagePlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: colors.neutral.gray100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: colors.text.secondary,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral.gray300,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: colors.primary.DEFAULT,
    width: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  skipButton: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    padding: 8,
  },
  nextButtonContainer: {
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  nextButton: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
});

export default OnboardingScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
