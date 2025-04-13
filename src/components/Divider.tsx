import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

interface DividerProps {
  text?: string;
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({
  text,
  orientation = 'horizontal',
  style,
}) => {
  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.verticalDivider,
          style,
        ]}
      />
    );
  }

  if (text) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.line} />
        <Text style={styles.text}>{text}</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.horizontalDivider,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.light,
  },
  text: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginHorizontal: 16,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: 16,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: colors.border.light,
    marginHorizontal: 16,
    alignSelf: 'stretch',
  },
});

export default Divider;
