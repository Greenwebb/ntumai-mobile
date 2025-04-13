import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

export interface TabItem {
  key: string;
  label: string;
  badge?: number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  style?: ViewStyle;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        
        return (
          <View
            key={tab.key}
            style={[
              styles.tabItem,
              isActive && styles.activeTabItem,
            ]}
          >
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
            
            {isActive && <View style={styles.activeIndicator} />}
            
            {tab.badge !== undefined && tab.badge > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {tab.badge > 99 ? '99+' : tab.badge}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeTabItem: {
    backgroundColor: colors.background.primary,
  },
  tabLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: colors.primary.DEFAULT,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: colors.primary.DEFAULT,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  badgeContainer: {
    position: 'absolute',
    top: 6,
    right: 16,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: colors.secondary.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.white,
    fontWeight: 'bold',
  },
});

export default TabBar;
