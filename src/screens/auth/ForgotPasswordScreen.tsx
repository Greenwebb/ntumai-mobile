import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography } from '../../constants/theme';
import { VALIDATION } from '../../constants/appConstants';

interface ForgotPasswordScreenProps {
  onSubmit: (phoneNumber: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!phoneNumber) {
      setError('Phone number is required');
      return false;
    }
    
    if (!VALIDATION.phoneNumber.pattern.test(phoneNumber)) {
      setError('Please enter a valid phone number');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(phoneNumber);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Forgot Password</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Enter your phone number and we'll send you a verification code to reset your password.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View 
            style={[
              styles.input,
              error ? styles.inputError : null
            ]}
          >
            <Text style={styles.inputText}>
              {phoneNumber || 'Enter your phone number'}
            </Text>
          </View>
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  content: {
    padding: 24,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  inputError: {
    borderColor: colors.status.error,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.status.error,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: colors.primary.DEFAULT,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
});

export default ForgotPasswordScreen;
