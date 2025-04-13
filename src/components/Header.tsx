import React from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent
}) => {
  return (
    <StyledView className="bg-white p-4 flex-row items-center justify-between border-b border-gray-100">
      <StyledView className="flex-row items-center">
        {showBackButton && (
          <StyledTouchableOpacity 
            className="mr-2 p-2" 
            onPress={onBackPress}
          >
            <StyledText className="text-xl">←</StyledText>
          </StyledTouchableOpacity>
        )}
        <StyledText className="font-bold text-lg">{title}</StyledText>
      </StyledView>
      
      {rightComponent && (
        <StyledView>
          {rightComponent}
        </StyledView>
      )}
    </StyledView>
  );
};
=======
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../constants/theme';

interface HeaderProps {
  leftComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  leftComponent,
  centerComponent,
  rightComponent,
  backgroundColor = colors.background.primary,
  style,
}) => {
  return (
    <View 
      style={[styles.container, { backgroundColor }, style]}
      className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200"
    >
      <View style={styles.leftContainer} className="flex-1 items-start">
        {leftComponent}
      </View>
      
      <View style={styles.centerContainer} className="flex-2 items-center">
        {centerComponent}
      </View>
      
      <View style={styles.rightContainer} className="flex-1 items-end">
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default Header;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
