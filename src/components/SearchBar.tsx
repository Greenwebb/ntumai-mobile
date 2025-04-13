import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  placeholder?: string;
  style?: ViewStyle;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmit,
  onClear,
  placeholder = 'Search...',
  style,
  autoFocus = false,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchIconContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <Text 
          style={[
            styles.input,
            !value && styles.placeholder
          ]}
        >
          {value || placeholder}
        </Text>
      </View>
      
      {value.length > 0 && onClear && (
        <View style={styles.clearIconContainer}>
          <Text style={styles.clearIcon}>✕</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray100,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIconContainer: {
    marginRight: 8,
  },
  searchIcon: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  placeholder: {
    color: colors.text.tertiary,
  },
  clearIconContainer: {
    marginLeft: 8,
    padding: 4,
  },
  clearIcon: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
});

export default SearchBar;
