<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useDriverStore } from '../../store/driverStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const RiderEarningsScreen = ({ navigation }: any) => {
  const [period, setPeriod] = useState('week'); // 'day', 'week', 'month', 'year'
  
  const { 
    earnings, 
    fetchEarnings,
    isLoading 
  } = useDriverStore();
  
  useEffect(() => {
    fetchEarnings(period);
  }, [period]);
  
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header title="Earnings" onBack={() => navigation.goBack()} />
      
      <StyledScrollView className="flex-1">
        {/* Period Selector */}
        <StyledView className="flex-row justify-between px-4 py-3">
          {['day', 'week', 'month', 'year'].map((p) => (
            <StyledTouchableOpacity
              key={p}
              className={`py-2 px-4 rounded-full ${
                period === p ? 'bg-primary' : 'bg-gray-100'
              }`}
              onPress={() => handlePeriodChange(p)}
            >
              <StyledText
                className={`font-medium ${
                  period === p ? 'text-white' : 'text-gray-700'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </StyledText>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
        
        {/* Earnings Summary */}
        <StyledView className="p-4 bg-primary">
          <StyledText className="text-white text-center mb-2">Total Earnings</StyledText>
          <StyledText className="text-white text-center text-3xl font-bold">
            ${earnings.total.toFixed(2)}
          </StyledText>
          <StyledText className="text-white text-center mt-2">
            {earnings.deliveries} deliveries • {earnings.hours} hours online
          </StyledText>
        </StyledView>
        
        {/* Earnings Breakdown */}
        <StyledView className="p-4 border-b border-gray-200">
          <StyledText className="text-lg font-bold mb-4">Earnings Breakdown</StyledText>
          
          <StyledView className="flex-row justify-between mb-3">
            <StyledText className="text-gray-500">Delivery Earnings</StyledText>
            <StyledText className="font-medium">${earnings.deliveryEarnings.toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-3">
            <StyledText className="text-gray-500">Tips</StyledText>
            <StyledText className="font-medium">${earnings.tips.toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between mb-3">
            <StyledText className="text-gray-500">Bonuses</StyledText>
            <StyledText className="font-medium">${earnings.bonuses.toFixed(2)}</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between pt-3 mt-3 border-t border-gray-200">
            <StyledText className="font-bold">Total</StyledText>
            <StyledText className="font-bold">${earnings.total.toFixed(2)}</StyledText>
          </StyledView>
        </StyledView>
        
        {/* Recent Payments */}
        <StyledView className="p-4">
          <StyledText className="text-lg font-bold mb-4">Recent Payments</StyledText>
          
          {earnings.recentPayments.length === 0 ? (
            <StyledView className="bg-gray-100 rounded-lg p-4 items-center">
              <StyledText className="text-gray-500">No recent payments found.</StyledText>
            </StyledView>
          ) : (
            earnings.recentPayments.map((payment, index) => (
              <StyledView 
                key={index} 
                className="bg-gray-50 rounded-lg p-3 mb-3"
              >
                <StyledView className="flex-row justify-between mb-1">
                  <StyledText className="font-medium">{payment.date}</StyledText>
                  <StyledText className="text-primary font-medium">${payment.amount.toFixed(2)}</StyledText>
                </StyledView>
                
                <StyledText className="text-gray-500">
                  {payment.deliveries} deliveries • {payment.hours} hours
                </StyledText>
              </StyledView>
            ))
          )}
        </StyledView>
        
        {/* Cash Out Button */}
        <StyledView className="p-4 mt-4">
          <Button
            title="Cash Out"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => {}}
          />
          <StyledText className="text-gray-500 text-center mt-2">
            Available for instant cash out: ${earnings.availableCashout.toFixed(2)}
          </StyledText>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface EarningPeriod {
  id: string;
  startDate: string;
  endDate: string;
  totalEarnings: number;
  deliveries: number;
  isPaid: boolean;
  paymentDate?: string;
}

interface DailyEarning {
  date: string;
  earnings: number;
  deliveries: number;
  hours: number;
}

interface RiderEarningsScreenProps {
  rider: {
    name: string;
    totalEarnings: number;
    pendingPayment: number;
    lastPaymentDate?: string;
    lastPaymentAmount?: number;
  };
  earningPeriods: EarningPeriod[];
  dailyEarnings: DailyEarning[];
  onBack: () => void;
  onViewPeriodDetails: (periodId: string) => void;
  onDownloadStatement: (periodId: string) => void;
}

const RiderEarningsScreen: React.FC<RiderEarningsScreenProps> = ({
  rider,
  earningPeriods,
  dailyEarnings,
  onBack,
  onViewPeriodDetails,
  onDownloadStatement,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'history'>('summary');
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(
    earningPeriods.length > 0 ? earningPeriods[0].id : null
  );

  const selectedPeriodData = earningPeriods.find(period => period.id === selectedPeriod);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Earnings Summary */}
      <View style={styles.earningsSummary}>
        <Text style={styles.totalEarningsLabel}>Total Earnings</Text>
        <Text style={styles.totalEarningsValue}>${rider.totalEarnings.toFixed(2)}</Text>
        <View style={styles.pendingPaymentContainer}>
          <Text style={styles.pendingPaymentLabel}>Pending Payment:</Text>
          <Text style={styles.pendingPaymentValue}>${rider.pendingPayment.toFixed(2)}</Text>
        </View>
        {rider.lastPaymentDate && rider.lastPaymentAmount && (
          <Text style={styles.lastPaymentText}>
            Last payment: ${rider.lastPaymentAmount.toFixed(2)} on {rider.lastPaymentDate}
          </Text>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'summary' && styles.activeTab
          ]}
          onPress={() => setActiveTab('summary')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'summary' && styles.activeTabText
            ]}
          >
            Summary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'history' && styles.activeTab
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === 'summary' ? (
          <View style={styles.summaryContent}>
            {/* Period Selector */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.periodSelectorContainer}
            >
              {earningPeriods.map(period => (
                <TouchableOpacity 
                  key={period.id}
                  style={[
                    styles.periodChip,
                    selectedPeriod === period.id && styles.selectedPeriodChip
                  ]}
                  onPress={() => setSelectedPeriod(period.id)}
                >
                  <Text 
                    style={[
                      styles.periodChipText,
                      selectedPeriod === period.id && styles.selectedPeriodChipText
                    ]}
                  >
                    {period.startDate} - {period.endDate}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Selected Period Summary */}
            {selectedPeriodData && (
              <View style={styles.periodSummary}>
                <View style={styles.periodHeader}>
                  <Text style={styles.periodTitle}>
                    {selectedPeriodData.startDate} - {selectedPeriodData.endDate}
                  </Text>
                  <View 
                    style={[
                      styles.paymentStatusBadge,
                      selectedPeriodData.isPaid ? styles.paidBadge : styles.pendingBadge
                    ]}
                  >
                    <Text 
                      style={[
                        styles.paymentStatusText,
                        selectedPeriodData.isPaid ? styles.paidText : styles.pendingText
                      ]}
                    >
                      {selectedPeriodData.isPaid ? 'Paid' : 'Pending'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.periodStats}>
                  <View style={styles.periodStatItem}>
                    <Text style={styles.periodStatValue}>
                      ${selectedPeriodData.totalEarnings.toFixed(2)}
                    </Text>
                    <Text style={styles.periodStatLabel}>Total Earnings</Text>
                  </View>
                  <View style={styles.periodStatItem}>
                    <Text style={styles.periodStatValue}>
                      {selectedPeriodData.deliveries}
                    </Text>
                    <Text style={styles.periodStatLabel}>Deliveries</Text>
                  </View>
                  <View style={styles.periodStatItem}>
                    <Text style={styles.periodStatValue}>
                      ${(selectedPeriodData.totalEarnings / selectedPeriodData.deliveries).toFixed(2)}
                    </Text>
                    <Text style={styles.periodStatLabel}>Avg. per Delivery</Text>
                  </View>
                </View>
                
                {selectedPeriodData.isPaid && selectedPeriodData.paymentDate && (
                  <Text style={styles.paymentDateText}>
                    Paid on {selectedPeriodData.paymentDate}
                  </Text>
                )}
                
                <View style={styles.periodActions}>
                  <TouchableOpacity 
                    style={styles.viewDetailsButton}
                    onPress={() => onViewPeriodDetails(selectedPeriodData.id)}
                  >
                    <Text style={styles.viewDetailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.downloadButton}
                    onPress={() => onDownloadStatement(selectedPeriodData.id)}
                  >
                    <Text style={styles.downloadButtonText}>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Daily Earnings */}
            <View style={styles.dailyEarningsSection}>
              <Text style={styles.sectionTitle}>Daily Earnings</Text>
              
              {dailyEarnings.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No earnings data available</Text>
                </View>
              ) : (
                <View style={styles.dailyEarningsContainer}>
                  {dailyEarnings.map((day, index) => (
                    <View key={index} style={styles.dailyEarningItem}>
                      <View style={styles.dailyEarningHeader}>
                        <Text style={styles.dailyEarningDate}>{day.date}</Text>
                        <Text style={styles.dailyEarningAmount}>
                          ${day.earnings.toFixed(2)}
                        </Text>
                      </View>
                      <View style={styles.dailyEarningDetails}>
                        <Text style={styles.dailyEarningDetailText}>
                          {day.deliveries} deliveries • {day.hours} hours
                        </Text>
                        <Text style={styles.dailyEarningRate}>
                          ${(day.earnings / day.hours).toFixed(2)}/hr
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.historyContent}>
            {/* Payment History */}
            <View style={styles.paymentHistorySection}>
              <Text style={styles.sectionTitle}>Payment History</Text>
              
              {earningPeriods.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No payment history available</Text>
                </View>
              ) : (
                <View style={styles.paymentHistoryContainer}>
                  {earningPeriods.map(period => (
                    <TouchableOpacity 
                      key={period.id} 
                      style={styles.paymentHistoryItem}
                      onPress={() => onViewPeriodDetails(period.id)}
                    >
                      <View style={styles.paymentHistoryHeader}>
                        <Text style={styles.paymentHistoryPeriod}>
                          {period.startDate} - {period.endDate}
                        </Text>
                        <View 
                          style={[
                            styles.paymentStatusBadge,
                            period.isPaid ? styles.paidBadge : styles.pendingBadge
                          ]}
                        >
                          <Text 
                            style={[
                              styles.paymentStatusText,
                              period.isPaid ? styles.paidText : styles.pendingText
                            ]}
                          >
                            {period.isPaid ? 'Paid' : 'Pending'}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={styles.paymentHistoryDetails}>
                        <View>
                          <Text style={styles.paymentHistoryAmount}>
                            ${period.totalEarnings.toFixed(2)}
                          </Text>
                          <Text style={styles.paymentHistoryDeliveries}>
                            {period.deliveries} deliveries
                          </Text>
                        </View>
                        
                        <TouchableOpacity 
                          style={styles.downloadIconButton}
                          onPress={() => onDownloadStatement(period.id)}
                        >
                          <Text style={styles.downloadIcon}>⬇️</Text>
                        </TouchableOpacity>
                      </View>
                      
                      {period.isPaid && period.paymentDate && (
                        <Text style={styles.paymentHistoryDate}>
                          Paid on {period.paymentDate}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
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
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  earningsSummary: {
    padding: 24,
    backgroundColor: colors.primary.DEFAULT,
    alignItems: 'center',
  },
  totalEarningsLabel: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  totalEarningsValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.neutral.white,
    marginBottom: 12,
  },
  pendingPaymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pendingPaymentLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.white,
    opacity: 0.8,
    marginRight: 4,
  },
  pendingPaymentValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.neutral.white,
  },
  lastPaymentText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.white,
    opacity: 0.8,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary.DEFAULT,
  },
  tabText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  summaryContent: {
    padding: 16,
  },
  periodSelectorContainer: {
    paddingBottom: 16,
  },
  periodChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: colors.neutral.gray100,
    marginRight: 8,
  },
  selectedPeriodChip: {
    backgroundColor: colors.primary.light,
  },
  periodChipText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  selectedPeriodChipText: {
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  periodSummary: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  periodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  paymentStatusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  paidBadge: {
    backgroundColor: colors.status.success + '20',
  },
  pendingBadge: {
    backgroundColor: colors.status.warning + '20',
  },
  paymentStatusText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
  },
  paidText: {
    color: colors.status.success,
  },
  pendingText: {
    color: colors.status.warning,
  },
  periodStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  periodStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  periodStatValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
    marginBottom: 4,
  },
  periodStatLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  paymentDateText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  periodActions: {
    flexDirection: 'row',
  },
  viewDetailsButton: {
    flex: 2,
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  viewDetailsButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.neutral.white,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  downloadButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  dailyEarningsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  emptyState: {
    padding: 24,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
  },
  dailyEarningsContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  dailyEarningItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  dailyEarningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dailyEarningDate: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  dailyEarningAmount: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
  },
  dailyEarningDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dailyEarningDetailText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  dailyEarningRate: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  historyContent: {
    padding: 16,
  },
  paymentHistorySection: {
    marginBottom: 24,
  },
  paymentHistoryContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  paymentHistoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  paymentHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentHistoryPeriod: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  paymentHistoryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentHistoryAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
    marginBottom: 4,
  },
  paymentHistoryDeliveries: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  downloadIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadIcon: {
    fontSize: 20,
  },
  paymentHistoryDate: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
  },
});

export default RiderEarningsScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
