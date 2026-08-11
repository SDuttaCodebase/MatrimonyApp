// src/screens/profile/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import useThemeStore from '../../store/useThemeStore';

// Dropdown options matching your design
const DROPDOWN_OPTIONS = {
  religion: ['Hindu', 'Muslim', 'Buddhist', 'Christian', 'Jain', 'Sikh', 'Parsi'],
  community: ['Bengali', 'Hindi', 'Punjabi', 'Marathi', 'Gujrati', 'Urdu', 'Telegu', 'English'],
  subCommunity: ['Kashyap', 'Baidya', 'Brahmin', 'Kayastha'],
  caste: ['General', 'OBC', 'SC', 'ST'],
  country: ['India', 'USA', 'UK', 'Canada', 'Australia'],
};

const STATES_LIST = [
  'West Bengal', 'Maharashtra', 'Delhi', 'Hyderabad', 
  'Karnataka', 'Tamil Nadu', 'Himachal Pradesh', 'Uttarakhand', 'Sikkim', 'Chhattisgarh'
];

const CITIES_LIST = [
  'Kolkata', 'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum', 
  'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'
];

const MARITAL_STATUS_LIST = [
  'Never Married', 'Divorced', 'Widowed', 'Awaiting Divorced', 'Anulled'
];

export default function ProfileScreen({ navigation }) {
  const { theme } = useThemeStore();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [profilePic, setProfilePic] = useState(null);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const [formData, setFormData] = useState({
    fullName: 'Sandipan Dutta',
    dob: '15/08/2003',
    email: 'sandipan.dev@gmail.com',
    phone: '+91 9876543210',
    location: 'Kolkata, West Bengal',
    occupation: 'Software Engineer',
    religion: 'Hindu',
    community: 'Bengali',
    subCommunity: 'Kashyap',
    caste: 'General',
    country: 'India',
    state: 'West Bengal',
    city: 'Kolkata',
    maritalStatus: 'Never Married',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCameraPick = () => {
    setIsPhotoModalVisible(false);
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then((image) => setProfilePic(image.path))
      .catch((error) => {
        if (error.code !== 'E_PICKER_CANCELLED') console.log('Camera Error: ', error);
      });
  };

  const handleGalleryPick = () => {
    setIsPhotoModalVisible(false);
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then((image) => setProfilePic(image.path))
      .catch((error) => {
        if (error.code !== 'E_PICKER_CANCELLED') console.log('Picker Error: ', error);
      });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setActiveDropdown(null);
    } else {
      Alert.alert('Profile Complete', 'All your profile details have been successfully saved!');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setActiveDropdown(null);
    } else {
      navigation.goBack();
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const renderDropdownField = (label, fieldKey, optionsList) => {
    const isOpen = activeDropdown === fieldKey;
    const selectedValue = formData[fieldKey];

    return (
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: theme.colors.primary }]}>{label}</Text>
        
        <TouchableOpacity 
          style={[styles.dropdownHeader, isOpen && { borderColor: theme.colors.primary }]}
          activeOpacity={0.8}
          onPress={() => setActiveDropdown(isOpen ? null : fieldKey)}
        >
          <Text style={styles.dropdownSelectedText}>{selectedValue}</Text>
          <Text style={styles.dropdownArrow}>{isOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownListContainer}>
            {optionsList.map((option) => {
              const isSelected = selectedValue === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownOptionRow}
                  onPress={() => {
                    handleInputChange(fieldKey, option);
                    setActiveDropdown(null);
                  }}
                >
                  <View style={[styles.radioButton, isSelected && { borderColor: theme.colors.primary }]}>
                    {isSelected && <View style={[styles.radioDot, { backgroundColor: theme.colors.primary }]} />}
                  </View>
                  <Text style={[styles.dropdownOptionText, isSelected && { fontWeight: 'bold', color: theme.colors.primary }]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      
      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handlePrev} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
          {currentStep === 1 ? 'Personal Details' :
           currentStep === 2 ? 'Background Preferences' :
           currentStep === 3 ? 'Select Your State' :
           currentStep === 4 ? 'Select Your City' : 'Select Your Marital Status'}
        </Text>
        <View style={styles.spacer} />
      </View>

      {/* Scrollable Form Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Picture Section (Visible only on Step 1) */}
        {currentStep === 1 && (
          <View style={styles.pfpContainer}>
            <View style={[styles.pfpWrapper, { borderColor: theme.colors.primary }]}>
              {profilePic ? (
                <Image source={{ uri: profilePic }} style={styles.actualPfpImage} />
              ) : (
                <View style={[styles.pfpImagePlaceholder, { backgroundColor: '#DDD' }]}>
                  <Text style={styles.pfpEmoji}>📷</Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity 
              style={[styles.changePhotoBtn, { backgroundColor: theme.colors.primary }]}
              onPress={() => setIsPhotoModalVisible(true)}
            >
              <Text style={styles.changePhotoText}>Change Profile Picture</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 1: Personal Details Inputs */}
        {currentStep === 1 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Personal Details</Text>
            
            <View style={styles.standardInputGroup}>
              <Text style={styles.standardLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={formData.fullName}
                onChangeText={(text) => handleInputChange('fullName', text)}
              />
            </View>

            <View style={styles.standardInputGroup}>
              <Text style={styles.standardLabel}>Date of Birth</Text>
              <TextInput
                style={styles.textInput}
                value={formData.dob}
                onChangeText={(text) => handleInputChange('dob', text)}
              />
            </View>

            <View style={styles.standardInputGroup}>
              <Text style={styles.standardLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                value={formData.email}
                keyboardType="email-address"
                onChangeText={(text) => handleInputChange('email', text)}
              />
            </View>

            <View style={styles.standardInputGroup}>
              <Text style={styles.standardLabel}>Contact Number</Text>
              <TextInput
                style={styles.textInput}
                value={formData.phone}
                keyboardType="phone-pad"
                onChangeText={(text) => handleInputChange('phone', text)}
              />
            </View>

            <View style={styles.standardInputGroup}>
              <Text style={styles.standardLabel}>Occupation</Text>
              <TextInput
                style={styles.textInput}
                value={formData.occupation}
                onChangeText={(text) => handleInputChange('occupation', text)}
              />
            </View>
          </View>
        )}

        {/* Step 2: Dropdown Selection Fields */}
        {currentStep === 2 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Background Preferences</Text>
            {renderDropdownField('Religion', 'religion', DROPDOWN_OPTIONS.religion)}
            {renderDropdownField('Community', 'community', DROPDOWN_OPTIONS.community)}
            {renderDropdownField('Sub-Community', 'subCommunity', DROPDOWN_OPTIONS.subCommunity)}
            {renderDropdownField('Caste', 'caste', DROPDOWN_OPTIONS.caste)}
            {renderDropdownField('Country Living In', 'country', DROPDOWN_OPTIONS.country)}
          </View>
        )}

        {/* Step 3: Select Your State */}
        {currentStep === 3 && (
          <View style={styles.cardsContainer}>
            {STATES_LIST.map((state) => {
              const isSelected = formData.state === state;
              return (
                <TouchableOpacity
                  key={state}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('state', state)}
                  style={[
                    styles.selectionCard,
                    isSelected ? { backgroundColor: '#FDF2F2', borderColor: theme.colors.primary } : { backgroundColor: '#FFF', borderColor: '#EFEFEF' }
                  ]}
                >
                  <View style={styles.cardLeftRow}>
                    <View style={styles.stateIconCircle}><Text>🌄</Text></View>
                    <Text style={[styles.cardText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>
                      {state}
                    </Text>
                  </View>
                  <View style={[styles.radioButton, isSelected && { borderColor: theme.colors.primary }]}>
                    {isSelected && <View style={[styles.radioDot, { backgroundColor: theme.colors.primary }]} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 4: Select Your City */}
        {currentStep === 4 && (
          <View style={styles.cardsContainer}>
            {CITIES_LIST.map((city, index) => {
              const cityName = index === 0 ? 'Kolkata' : `${city} ${index}`;
              const isSelected = formData.city === cityName;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('city', cityName)}
                  style={[
                    styles.selectionCard,
                    isSelected ? { backgroundColor: '#FDF2F2', borderColor: theme.colors.primary } : { backgroundColor: '#FFF', borderColor: '#EFEFEF' }
                  ]}
                >
                  <Text style={[styles.cardText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>
                    {cityName}
                  </Text>
                  <View style={[styles.radioButton, isSelected && { borderColor: theme.colors.primary }]}>
                    {isSelected && <View style={[styles.radioDot, { backgroundColor: theme.colors.primary }]} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 5: Select Marital Status (Exact Grid Layout matching design) */}
        {currentStep === 5 && (
          <View style={styles.gridContainer}>
            {MARITAL_STATUS_LIST.map((status) => {
              const isSelected = formData.maritalStatus === status;
              return (
                <TouchableOpacity
                  key={status}
                  activeOpacity={0.85}
                  onPress={() => handleInputChange('maritalStatus', status)}
                  style={[
                    styles.gridCard,
                    isSelected ? { backgroundColor: '#FDF2F2', borderColor: theme.colors.primary } : { backgroundColor: '#EFEFEF', borderColor: 'transparent' }
                  ]}
                >
                  <Text style={[styles.gridCardText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

      </ScrollView>

      {/* Bottom Sticky Navigation: Skip & Fixed-Size Next Buttons */}
      <View style={[styles.bottomButtonRow, { borderTopColor: '#EFEFEF' }]}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.nextButtonFixed, { backgroundColor: theme.colors.primary }]} 
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Finish' : 'Next ➔'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Camera / Gallery Picker Modal */}
      <Modal
        visible={isPhotoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPhotoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Profile Picture</Text>
            
            <TouchableOpacity style={styles.modalOption} onPress={handleCameraPick}>
              <Text style={styles.modalOptionText}>📷 Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={handleGalleryPick}>
              <Text style={styles.modalOptionText}>🖼️ Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modalOption, styles.cancelOption]} 
              onPress={() => setIsPhotoModalVisible(false)}
            >
              <Text style={[styles.modalOptionText, { color: '#FF3B30' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  backText: { fontSize: 24, color: '#333' },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },
  spacer: { width: 40 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  
  pfpContainer: { alignItems: 'center', marginBottom: 25 },
  pfpWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    padding: 3,
    marginBottom: 10,
  },
  pfpImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actualPfpImage: { width: '100%', height: '100%', borderRadius: 45 },
  pfpEmoji: { fontSize: 35 },
  changePhotoBtn: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20 },
  changePhotoText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  sectionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeading: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: 'bold', marginBottom: 6 },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  dropdownSelectedText: { fontSize: 14, color: '#333' },
  dropdownArrow: { fontSize: 12, color: '#666' },
  
  dropdownListContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingVertical: 5,
  },
  dropdownOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  dropdownOptionText: { fontSize: 14, color: '#444' },

  standardInputGroup: { marginBottom: 15 },
  standardLabel: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 5 },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },

  cardsContainer: { width: '100%' },
  selectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  cardLeftRow: { flexDirection: 'row', alignItems: 'center' },
  stateIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardText: { fontSize: 15, color: '#333' },

  // Grid Selection Styles (Step 5: Marital Status - Perfectly Sized Square Cards)
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: {
    width: '46%',
    aspectRatio: 1.1,
    borderRadius: 14,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  gridCardText: { fontSize: 15, color: '#444', textAlign: 'center' },

  // Bottom Navigation Bar with Fixed-Width Next Button
  bottomButtonRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  skipButton: { paddingVertical: 10 },
  skipButtonText: { color: '#FF3B30', fontSize: 15, fontWeight: 'bold' },
  nextButtonFixed: {
    width: 130,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  modalOption: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cancelOption: { borderBottomWidth: 0, marginTop: 5 },
  modalOptionText: { fontSize: 15, color: '#333', fontWeight: '500' },
});