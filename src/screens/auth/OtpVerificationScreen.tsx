import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const OtpVerificationScreen = ({ navigation, route }: any) => {
  const { email } = route.params || { email: '' };
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  
  const { verifyOtp, isLoading } = useAuthStore();
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendActive(true);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);
  
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Auto focus to next input
    if (text && index < 3) {
      // This would normally focus the next input using refs
    }
  };
  
  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      try {
        await verifyOtp(email, otpString);
        navigation.navigate('RoleSelection');
      } catch (error) {
        console.error('OTP verification error:', error);
      }
    }
  };
  
  const handleResendOtp = () => {
    if (isResendActive) {
      // Resend OTP logic
      setTimer(60);
      setIsResendActive(false);
    }
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="OTP Verification" onBack={() => navigation.goBack()} />
      
      <StyledView className="flex-1 px-6 pt-6">
        <StyledText className="text-2xl font-bold mb-2">Verify Your Email</StyledText>
        <StyledText className="text-gray-500 mb-8">
          We have sent a 4-digit code to {email}
        </StyledText>
        
        <StyledView className="flex-row justify-between mb-8">
          {otp.map((digit, index) => (
            <StyledView 
              key={index} 
              className="w-16 h-16 border border-gray-300 rounded-lg items-center justify-center"
            >
              <TextInput
                className="text-2xl font-bold text-center w-full h-full"
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
              />
            </StyledView>
          ))}
        </StyledView>
        
        <Button
          title="Verify"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          onPress={handleVerify}
        />
        
        <StyledView className="flex-row justify-center mt-8">
          <StyledText className="text-gray-500">Didn't receive code? </StyledText>
          <StyledTouchableOpacity 
            onPress={handleResendOtp}
            disabled={!isResendActive}
          >
            <StyledText 
              className={`font-medium ${isResendActive ? 'text-primary' : 'text-gray-400'}`}
            >
              {isResendActive ? 'Resend' : `Resend in ${timer}s`}
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};
=======
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';
import { VALIDATION } from '../../constants/appConstants';

interface OtpVerificationScreenProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onResendOtp: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  phoneNumber,
  onVerify,
  onResendOtp,
  onBack,
  isLoading = false,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Handle countdown for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Handle OTP input
  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste of full OTP
      const otpArray = value.slice(0, 6).split('');
      const newOtp = [...otp];
      
      otpArray.forEach((digit, i) => {
        if (i < 6) {
          newOtp[i] = digit;
        }
      });
      
      setOtp(newOtp);
      setActiveIndex(Math.min(otpArray.length, 5));
    } else {
      // Handle single digit input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move to next input if current one is filled
      if (value && index < 5) {
        setActiveIndex(index + 1);
      }
    }
    
    setError(null);
  };

  // Handle OTP verification
  const handleVerify = () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    if (!VALIDATION.otp.pattern.test(otpString)) {
      setError('OTP must contain only numbers');
      return;
    }
    
    onVerify(otpString);
  };

  // Handle OTP resend
  const handleResend = () => {
    if (canResend) {
      onResendOtp();
      setCountdown(60);
      setCanResend(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Verify Phone Number</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          We've sent a verification code to{' '}
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View 
              key={index} 
              style={[
                styles.otpInput,
                activeIndex === index && styles.otpInputActive,
                error && !digit && styles.otpInputError
              ]}
            >
              <Text style={styles.otpDigit}>{digit}</Text>
            </View>
          ))}
        </View>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TouchableOpacity 
          style={[
            styles.verifyButton,
            isLoading && styles.verifyButtonDisabled
          ]}
          onPress={handleVerify}
          disabled={isLoading}
        >
          <Text style={styles.verifyButtonText}>
            {isLoading ? 'Verifying...' : 'Verify'}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
          </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendButton}>Resend</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.countdownText}>
              Resend in {countdown}s
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
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
    alignItems: 'center',
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  phoneNumber: {
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInputActive: {
    borderColor: colors.primary.DEFAULT,
    borderWidth: 2,
  },
  otpInputError: {
    borderColor: colors.status.error,
  },
  otpDigit: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.status.error,
    marginBottom: 16,
  },
  verifyButton: {
    backgroundColor: colors.primary.DEFAULT,
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyButtonDisabled: {
    opacity: 0.7,
  },
  verifyButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  resendButton: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  countdownText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
});

export default OtpVerificationScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
