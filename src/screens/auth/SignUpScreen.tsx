import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography } from '../../constants/theme';
import { VALIDATION } from '../../constants/appConstants';

interface SignUpScreenProps {
  onSignUp: (name: string, phoneNumber: string, password: string) => void;
  onLogin: () => void;
  isLoading?: boolean;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUp,
  onLogin,
  isLoading = false,
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      phoneNumber?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Validate name
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < VALIDATION.name.minLength) {
      newErrors.name = `Name must be at least ${VALIDATION.name.minLength} characters`;
    }

    // Validate phone number
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!VALIDATION.phoneNumber.pattern.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < VALIDATION.password.minLength) {
      newErrors.password = `Password must be at least ${VALIDATION.password.minLength} characters`;
    } else if (!VALIDATION.password.pattern.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      onSignUp(name, phoneNumber, password);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      <View style={styles.form}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <View 
            style={[
              styles.input,
              errors.name ? styles.inputError : null
            ]}
          >
            <Text style={styles.inputText}>
              {name || 'Enter your full name'}
            </Text>
          </View>
          {errors.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View 
            style={[
              styles.input,
              errors.phoneNumber ? styles.inputError : null
            ]}
          >
            <Text style={styles.inputText}>
              {phoneNumber || 'Enter your phone number'}
            </Text>
          </View>
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View 
            style={[
              styles.input,
              errors.password ? styles.inputError : null
            ]}
          >
            <Text style={styles.inputText}>
              {'•'.repeat(password.length) || 'Enter your password'}
            </Text>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View 
            style={[
              styles.input,
              errors.confirmPassword ? styles.inputError : null
            ]}
          >
            <Text style={styles.inputText}>
              {'•'.repeat(confirmPassword.length) || 'Confirm your password'}
            </Text>
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[
            styles.signUpButton,
            isLoading ? styles.signUpButtonDisabled : null
          ]}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text style={styles.signUpButtonText}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={onLogin}>
          <Text style={styles.loginText}>Sign In</Text>
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
    padding: 24,
    flexGrow: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
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
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primary.DEFAULT,
  },
  signUpButton: {
    backgroundColor: colors.primary.DEFAULT,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginRight: 4,
  },
  loginText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
});

export default SignUpScreen;
