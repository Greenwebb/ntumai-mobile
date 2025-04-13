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
