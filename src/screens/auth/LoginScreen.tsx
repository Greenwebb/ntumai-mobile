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

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  
  const { login, isLoading } = useAuthStore();
  
  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await login(email, password);
        // Navigation will be handled by the root navigator based on auth state
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };
  
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Login" />
      
      <StyledScrollView className="flex-1 px-6 pt-6">
        <StyledView className="items-center mb-8">
          <StyledView className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4">
            <StyledText className="text-white text-3xl font-bold">N</StyledText>
          </StyledView>
          <StyledText className="text-2xl font-bold">Welcome Back</StyledText>
          <StyledText className="text-gray-500 text-center mt-2">
            Login to your account to continue
          </StyledText>
        </StyledView>
        
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
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        
        <StyledTouchableOpacity 
          className="self-end mb-6" 
          onPress={handleForgotPassword}
        >
          <StyledText className="text-primary">Forgot Password?</StyledText>
        </StyledTouchableOpacity>
        
        <Button
          title="Login"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          onPress={handleLogin}
        />
        
        <StyledView className="flex-row justify-center mt-6">
          <StyledText className="text-gray-500">Don't have an account? </StyledText>
          <StyledTouchableOpacity onPress={handleSignUp}>
            <StyledText className="text-primary font-medium">Sign Up</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
