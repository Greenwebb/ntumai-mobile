import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

interface StepIndicatorProps {
  steps: number;
  currentStep: number;
  labels?: string[];
  style?: ViewStyle;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  labels,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.stepsContainer}>
        {Array.from({ length: steps }).map((_, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              {/* Line connector (not for first step) */}
              {index > 0 && (
                <View 
                  style={[
                    styles.line,
                    index <= currentStep ? styles.activeLine : styles.inactiveLine
                  ]}
                />
              )}
              
              {/* Step indicator */}
              <View 
                style={[
                  styles.step,
                  isCompleted ? styles.completedStep : styles.incompleteStep,
                  isCurrent ? styles.currentStep : null
                ]}
              >
                {isCompleted ? (
                  <Text style={styles.stepText}>✓</Text>
                ) : (
                  <Text style={styles.stepText}>{index + 1}</Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      
      {labels && (
        <View style={styles.labelsContainer}>
          {labels.map((label, index) => (
            <Text 
              key={index}
              style={[
                styles.label,
                index === currentStep ? styles.activeLabel : styles.inactiveLabel
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedStep: {
    backgroundColor: colors.primary.DEFAULT,
  },
  incompleteStep: {
    backgroundColor: colors.neutral.gray200,
  },
  currentStep: {
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
  stepText: {
    color: colors.neutral.white,
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
  },
  line: {
    flex: 1,
    height: 2,
  },
  activeLine: {
    backgroundColor: colors.primary.DEFAULT,
  },
  inactiveLine: {
    backgroundColor: colors.neutral.gray200,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  label: {
    fontSize: typography.fontSize.xs,
    textAlign: 'center',
    width: 80,
  },
  activeLabel: {
    color: colors.primary.DEFAULT,
    fontWeight: 'bold',
  },
  inactiveLabel: {
    color: colors.text.secondary,
  },
});

export default StepIndicator;
