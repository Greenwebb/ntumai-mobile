import React from 'react';
<<<<<<< HEAD
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
=======
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface SplashScreenProps {}

const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Ntumai</Text>
      </View>
      <Text style={styles.tagline}>Connecting local markets to your doorstep</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.neutral.white,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.white,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default SplashScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
