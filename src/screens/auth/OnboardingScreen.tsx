import React, { useState } from 'react';
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
    }
  };

  const handleSkip = () => {
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
