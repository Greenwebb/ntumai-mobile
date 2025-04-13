import React from 'react';
<<<<<<< HEAD
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

interface OrderStatusBarProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const StyledView = styled(View);
const StyledText = styled(Text);

export const OrderStatusBar: React.FC<OrderStatusBarProps> = ({ status }) => {
  const getStatusIndex = () => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const statusIndex = getStatusIndex();
  
  if (status === 'cancelled') {
    return (
      <StyledView className="my-4">
        <StyledView className="flex-row justify-between mb-2">
          <StyledText className="text-error font-medium">Order Cancelled</StyledText>
        </StyledView>
        <StyledView className="h-2 bg-gray-200 rounded-full">
          <StyledView className="h-2 bg-error rounded-full w-full" />
        </StyledView>
      </StyledView>
    );
  }

  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <StyledView className="my-4">
      <StyledView className="flex-row justify-between mb-2">
        {steps.map((step, index) => (
          <StyledText 
            key={index}
            className={`text-xs ${index <= statusIndex ? 'text-primary font-medium' : 'text-gray-400'}`}
          >
            {step}
          </StyledText>
        ))}
      </StyledView>
      <StyledView className="h-2 bg-gray-200 rounded-full">
        <StyledView 
          className="h-2 bg-primary rounded-full" 
          style={{ width: `${(statusIndex + 1) * 25}%` }} 
        />
      </StyledView>
    </StyledView>
  );
};
=======
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

// Define the order status type
export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

interface OrderStatusBarProps {
  currentStatus: OrderStatus;
  statuses?: OrderStatus[];
  style?: ViewStyle;
}

const OrderStatusBar: React.FC<OrderStatusBarProps> = ({
  currentStatus,
  statuses = ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'picked_up', 'in_transit', 'delivered'],
  style,
}) => {
  // Find the index of the current status
  const currentIndex = statuses.findIndex(status => status === currentStatus);
  
  // Calculate progress percentage
  const progress = currentIndex >= 0 
    ? (currentIndex / (statuses.length - 1)) * 100 
    : 0;

  return (
    <View style={[styles.container, style]} className="p-4">
      <View style={styles.statusTextContainer} className="flex-row justify-between mb-2">
        <Text style={styles.statusText} className="text-primary font-bold">
          {currentStatus ? currentStatus.replace(/_/g, ' ').toUpperCase() : 'PENDING'}
        </Text>
        <Text style={styles.progressText} className="text-gray-500">
          {Math.round(progress)}%
        </Text>
      </View>
      
      <View style={styles.barContainer} className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <View 
          style={[styles.progressBar, { width: `${progress}%` }]}
          className="h-full bg-primary rounded-full"
        />
      </View>
      
      <View style={styles.stepsContainer} className="flex-row justify-between mt-4">
        {statuses.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <View 
              key={status}
              style={[
                styles.stepIndicator,
                isCompleted && styles.completedStep,
                isCurrent && styles.currentStep
              ]}
              className={`w-6 h-6 rounded-full justify-center items-center ${
                isCompleted ? 'bg-primary' : 'bg-gray-100'
              } ${isCurrent ? 'border-2 border-primary' : ''}`}
            >
              {isCompleted && (
                <Text style={{ color: colors.neutral.white, fontSize: 12 }}>✓</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  statusTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  barContainer: {
    height: 8,
    backgroundColor: colors.neutral.gray100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 4,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray100,
  },
  completedStep: {
    backgroundColor: colors.primary.DEFAULT,
  },
  currentStep: {
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
});

export default OrderStatusBar;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
