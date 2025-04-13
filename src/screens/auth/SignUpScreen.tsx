import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/Button';
import { TextInput as CustomTextInput } from '../../components/TextInput';
import { Header } from '../../components/Header';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const SignUpScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { signUp, isLoading } = useAuthStore();
  
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        await signUp({ name, email, phone, password });
        navigation.navigate('OtpVerification', { email });
      } catch (error) {
        console.error('Sign up error:', error);
      }
    }
  };
  
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Sign Up" onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1 px-6 pt-4">
        <StyledText className="text-2xl font-bold mb-6">Create Account</StyledText>
        
        <CustomTextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        
        <CustomTextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
        
        <CustomTextInput
          label="Phone Number"
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          error={errors.phone}
        />
        
        <CustomTextInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        
        <CustomTextInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />
        
        <StyledView className="mt-6 mb-8">
          <Button
            title="Sign Up"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleSignUp}
          />
        </StyledView>
        
        <StyledView className="flex-row justify-center mb-6">
          <StyledText className="text-gray-500">Already have an account? </StyledText>
          <StyledTouchableOpacity onPress={handleLogin}>
            <StyledText className="text-primary font-medium">Login</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
