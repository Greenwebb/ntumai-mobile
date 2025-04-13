import React from 'react';
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
