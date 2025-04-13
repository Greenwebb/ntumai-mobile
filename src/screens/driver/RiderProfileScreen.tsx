<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useDriverStore } from '../../store/driverStore';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const RiderProfileScreen = ({ navigation }: any) => {
  const { 
    profile, 
    fetchProfile,
    updateProfile,
    isLoading 
  } = useDriverStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    licensePlate: '',
    bankAccount: '',
    address: ''
  });
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        vehicle: profile.vehicle || '',
        licensePlate: profile.licensePlate || '',
        bankAccount: profile.bankAccount || '',
        address: profile.address || ''
      });
    }
  }, [profile]);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original profile
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        vehicle: profile.vehicle || '',
        licensePlate: profile.licensePlate || '',
        bankAccount: profile.bankAccount || '',
        address: profile.address || ''
      });
    }
  };
  
  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };
  
  const handleLogout = () => {
    // In a real app, we would call a logout function from authStore
    navigation.navigate('Login');
  };
  
  if (isLoading || !profile) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <Header title="Profile" showBackButton={false} />
        <StyledView className="flex-1 items-center justify-center">
          <StyledText>Loading...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }
  
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <Header 
        title="Profile" 
        showBackButton={false}
        rightComponent={
          !isEditing ? (
            <Button
              title="Edit"
              variant="outline"
              size="sm"
              onPress={handleEdit}
            />
          ) : null
        }
      />
      
      <StyledScrollView className="flex-1 p-4">
        {/* Profile Avatar */}
        <StyledView className="items-center mb-6">
          <StyledView className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center">
            <StyledText className="text-4xl">👤</StyledText>
          </StyledView>
          {isEditing && (
            <StyledTouchableOpacity className="mt-2">
              <StyledText className="text-primary">Change Photo</StyledText>
            </StyledTouchableOpacity>
          )}
        </StyledView>
        
        {/* Profile Information */}
        {isEditing ? (
          // Edit Mode
          <StyledView>
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
            
            <TextInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
            />
            
            <TextInput
              label="Vehicle"
              placeholder="Enter your vehicle model"
              value={formData.vehicle}
              onChangeText={(text) => handleInputChange('vehicle', text)}
            />
            
            <TextInput
              label="License Plate"
              placeholder="Enter your license plate"
              value={formData.licensePlate}
              onChangeText={(text) => handleInputChange('licensePlate', text)}
            />
            
            <TextInput
              label="Bank Account"
              placeholder="Enter your bank account details"
              value={formData.bankAccount}
              onChangeText={(text) => handleInputChange('bankAccount', text)}
            />
            
            <TextInput
              label="Address"
              placeholder="Enter your address"
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              multiline
              numberOfLines={3}
            />
            
            <StyledView className="flex-row mt-6">
              <Button
                title="Cancel"
                variant="outline"
                size="lg"
                onPress={handleCancel}
                style={{ flex: 1, marginRight: 8 }}
              />
              
              <Button
                title="Save"
                variant="primary"
                size="lg"
                onPress={handleSave}
                style={{ flex: 1 }}
              />
            </StyledView>
          </StyledView>
        ) : (
          // View Mode
          <StyledView>
            <StyledView className="mb-4">
              <StyledText className="text-gray-500 mb-1">Full Name</StyledText>
              <StyledText className="text-lg font-medium">{profile.name}</StyledText>
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledText className="text-gray-500 mb-1">Email</StyledText>
              <StyledText className="text-lg">{profile.email}</StyledText>
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledText className="text-gray-500 mb-1">Phone Number</StyledText>
              <StyledText className="text-lg">{profile.phone}</StyledText>
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledText className="text-gray-500 mb-1">Vehicle</StyledText>
              <StyledText className="text-lg">{profile.vehicle}</StyledText>
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledText className="text-gray-500 mb-1">License Plate</StyledText>
              <StyledText className="text-lg">{profile.licensePlate}</StyledText>
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledText className="text-gray-500 mb-1">Bank Account</StyledText>
              <StyledText className="text-lg">••••••{profile.bankAccount.slice(-4)}</StyledText>
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledText className="text-gray-500 mb-1">Address</StyledText>
              <StyledText className="text-lg">{profile.address}</StyledText>
            </StyledView>
            
            <StyledView className="mt-6">
              <Button
                title="Logout"
                variant="danger"
                size="lg"
                fullWidth
                onPress={handleLogout}
              />
            </StyledView>
          </StyledView>
        )}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../constants/theme';

interface RiderProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  rating: number;
  totalDeliveries: number;
  joinDate: string;
  vehicleType: string;
  vehicleNumber?: string;
  bankAccount?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}

interface RiderProfileScreenProps {
  profile: RiderProfile;
  onBack: () => void;
  onEditProfile: () => void;
  onEditVehicle: () => void;
  onEditBankDetails: () => void;
  onViewRatings: () => void;
  onLogout: () => void;
}

const RiderProfileScreen: React.FC<RiderProfileScreenProps> = ({
  profile,
  onBack,
  onEditProfile,
  onEditVehicle,
  onEditBankDetails,
  onViewRatings,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'account'>('profile');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          {profile.profileImage ? (
            <Text style={styles.profileImagePlaceholder}>🧑</Text>
          ) : (
            <Text style={styles.profileImagePlaceholder}>
              {profile.name.charAt(0).toUpperCase()}
            </Text>
          )}
        </View>
        <Text style={styles.profileName}>{profile.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingValue}>{profile.rating.toFixed(1)}</Text>
          <Text style={styles.ratingIcon}>★</Text>
          <TouchableOpacity onPress={onViewRatings}>
            <Text style={styles.viewRatingsText}>View Ratings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'profile' && styles.activeTab
          ]}
          onPress={() => setActiveTab('profile')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'profile' && styles.activeTabText
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'account' && styles.activeTab
          ]}
          onPress={() => setActiveTab('account')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'account' && styles.activeTabText
            ]}
          >
            Account
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === 'profile' ? (
          <View style={styles.profileContent}>
            {/* Personal Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={onEditProfile}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{profile.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{profile.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Joined</Text>
                  <Text style={styles.infoValue}>{profile.joinDate}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Deliveries</Text>
                  <Text style={styles.infoValue}>{profile.totalDeliveries}</Text>
                </View>
              </View>
            </View>

            {/* Vehicle Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Vehicle Information</Text>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={onEditVehicle}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Vehicle Type</Text>
                  <Text style={styles.infoValue}>{profile.vehicleType}</Text>
                </View>
                {profile.vehicleNumber && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Vehicle Number</Text>
                    <Text style={styles.infoValue}>{profile.vehicleNumber}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Bank Account */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Bank Account</Text>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={onEditBankDetails}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.infoCard}>
                {profile.bankAccount ? (
                  <>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Account Name</Text>
                      <Text style={styles.infoValue}>{profile.bankAccount.accountName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Account Number</Text>
                      <Text style={styles.infoValue}>{profile.bankAccount.accountNumber}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Bank Name</Text>
                      <Text style={styles.infoValue}>{profile.bankAccount.bankName}</Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.emptyBankInfo}>
                    <Text style={styles.emptyBankInfoText}>
                      No bank account details added yet
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.accountContent}>
            {/* Account Settings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Settings</Text>
              
              <View style={styles.settingsCard}>
                <TouchableOpacity style={styles.settingsItem}>
                  <Text style={styles.settingsItemText}>Notifications</Text>
                  <Text style={styles.settingsItemIcon}>→</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingsItem}>
                  <Text style={styles.settingsItemText}>Privacy Settings</Text>
                  <Text style={styles.settingsItemIcon}>→</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingsItem}>
                  <Text style={styles.settingsItemText}>Language</Text>
                  <Text style={styles.settingsItemValue}>English</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingsItem}>
                  <Text style={styles.settingsItemText}>App Version</Text>
                  <Text style={styles.settingsItemValue}>1.0.0</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Support */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              
              <View style={styles.settingsCard}>
                <TouchableOpacity style={styles.settingsItem}>
                  <Text style={styles.settingsItemText}>Help Center</Text>
                  <Text style={styles.settingsItemIcon}>→</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingsItem}>
                  <Text style={styles.settingsItemText}>Contact Support</Text>
                  <Text style={styles.settingsItemIcon}>→</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingsItem}>
                  <Text style={styles.settingsItemText}>Terms of Service</Text>
                  <Text style={styles.settingsItemIcon}>→</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingsItem}>
                  <Text style={styles.settingsItemText}>Privacy Policy</Text>
                  <Text style={styles.settingsItemIcon}>→</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Logout */}
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={onLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImagePlaceholder: {
    fontSize: 32,
    color: colors.primary.DEFAULT,
  },
  profileName: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
    marginRight: 4,
  },
  ratingIcon: {
    fontSize: typography.fontSize.base,
    color: colors.status.warning,
    marginRight: 8,
  },
  viewRatingsText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
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
  profileContent: {
    padding: 16,
  },
  accountContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: colors.primary.light,
  },
  editButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.DEFAULT,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  },
  emptyBankInfo: {
    padding: 16,
    alignItems: 'center',
  },
  emptyBankInfoText: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
  },
  settingsCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingsItemText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  settingsItemIcon: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
  },
  settingsItemValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
  },
  logoutButton: {
    backgroundColor: colors.status.error + '20',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.status.error,
  },
});

export default RiderProfileScreen;
>>>>>>> fc1783eefe8c27c415edc5b525b2829ed5e2f5eb
