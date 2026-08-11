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

const DIET_LIST = [
  { label: 'Non - Veg', icon: '🍗' },
  { label: 'Veg', icon: '🥗' },
  { label: 'Eggetarian', icon: '🥚' },
  { label: 'Vegan', icon: '🌱' },
];

const HEIGHT_LIST = [
  '5ft 6in - 155cm',
  '5ft 7in - 157cm',
  '5ft 8in - 160cm',
  '5ft 9in- 165cm',
  '5ft 10in - 170cm',
];

const COMPLEXION_LIST = [
  { label: 'Fair', emoji: '🧑' },
  { label: 'Medium', emoji: '🧑' },
  { label: 'Dark', emoji: '🧑' },
];

export default function ProfileScreen({ navigation }) {
  const { theme } = useThemeStore();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

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
    diet: 'Non - Veg',
    height: '5ft 8in - 160cm',
    complexion: 'Fair',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCameraPick = () => {
    setIsPhotoModalVisible(false);
    ImagePicker.openCamera({ width: 400, height: 400, cropping: true, freeStyleCropEnabled: true })
      .then((image) => setProfilePic(image.path))
      .catch((error) => { if (error.code !== 'E_PICKER_CANCELLED') console.log(error); });
  };

  const handleGalleryPick = () => {
    setIsPhotoModalVisible(false);
    ImagePicker.openPicker({ width: 400, height: 400, cropping: true, freeStyleCropEnabled: true })
      .then((image) => setProfilePic(image.path))
      .catch((error) => { if (error.code !== 'E_PICKER_CANCELLED') console.log(error); });
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
                  onPress={() => { handleInputChange(fieldKey, option); setActiveDropdown(null); }}
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
    <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      
      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handlePrev} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
          {currentStep === 1 ? 'Personal Details' :
           currentStep === 2 ? 'Background Preferences' :
           currentStep === 3 ? 'Select Your State' :
           currentStep === 4 ? 'Select Your City' :
           currentStep === 5 ? 'Select Your Marital Status' :
           currentStep === 6 ? 'Select Your Diet' :
           currentStep === 7 ? 'Select Your Height' : 'Select Your Complexion'}
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

        {/* Step 1 */}
        {currentStep === 1 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Personal Details</Text>
            {['fullName', 'dob', 'email', 'phone', 'occupation'].map((field) => (
              <View key={field} style={styles.standardInputGroup}>
                <Text style={styles.standardLabel}>{field.toUpperCase()}</Text>
                <TextInput style={styles.textInput} value={formData[field]} onChangeText={(text) => handleInputChange(field, text)} />
              </View>
            ))}
          </View>
        )}

        {/* Step 2 */}
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

        {/* Step 3 */}
        {currentStep === 3 && (
          <View style={styles.cardsContainer}>
            {STATES_LIST.map((state) => {
              const isSelected = formData.state === state;
              return (
                <TouchableOpacity key={state} activeOpacity={0.9} onPress={() => handleInputChange('state', state)} style={[styles.selectionCard, isSelected ? { backgroundColor: '#FDF2F2', borderColor: theme.colors.primary } : { backgroundColor: '#FFF', borderColor: '#EFEFEF' }]}>
                  <View style={styles.cardLeftRow}>
                    <View style={styles.stateIconCircle}><Text>🌄</Text></View>
                    <Text style={[styles.cardText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>{state}</Text>
                  </View>
                  <View style={[styles.radioButton, isSelected && { borderColor: theme.colors.primary }]}>{isSelected && <View style={[styles.radioDot, { backgroundColor: theme.colors.primary }]} />}</View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <View style={styles.cardsContainer}>
            {CITIES_LIST.map((city, index) => {
              const cityName = index === 0 ? 'Kolkata' : `${city} ${index}`;
              const isSelected = formData.city === cityName;
              return (
                <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => handleInputChange('city', cityName)} style={[styles.selectionCard, isSelected ? { backgroundColor: '#FDF2F2', borderColor: theme.colors.primary } : { backgroundColor: '#FFF', borderColor: '#EFEFEF' }]}>
                  <Text style={[styles.cardText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>{cityName}</Text>
                  <View style={[styles.radioButton, isSelected && { borderColor: theme.colors.primary }]}>{isSelected && <View style={[styles.radioDot, { backgroundColor: theme.colors.primary }]} />}</View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 5: Marital Status (Exact Scaled-Up Grid Matching Reference Image) */}
        {currentStep === 5 && (
          <View style={styles.largeGridContainer}>
            {MARITAL_STATUS_LIST.map((status) => {
              const isSelected = formData.maritalStatus === status;
              return (
                <TouchableOpacity
                  key={status}
                  activeOpacity={0.85}
                  onPress={() => handleInputChange('maritalStatus', status)}
                  style={[
                    styles.largeGridCard,
                    isSelected ? styles.selectedLargeCard : styles.unselectedLargeCard
                  ]}
                >
                  <Text style={[styles.largeGridCardText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 6: Diet (Proper Sized Cards Matching Screenshot) */}
        {currentStep === 6 && (
          <View style={styles.cardsContainer}>
            {DIET_LIST.map((item) => {
              const isSelected = formData.diet === item.label;
              return (
                <TouchableOpacity 
                  key={item.label} 
                  activeOpacity={0.9} 
                  onPress={() => handleInputChange('diet', item.label)} 
                  style={[styles.dietCard, isSelected ? styles.selectedDietCard : styles.unselectedDietCard]}
                >
                  <View style={styles.cardLeftRow}>
                    <View style={styles.dietIconCircle}><Text style={{fontSize: 20}}>{item.icon}</Text></View>
                    <Text style={[styles.dietCardText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>
                      {item.label}
                    </Text>
                  </View>
                  <View style={[styles.radioButton, isSelected && { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary }]}>
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 7: Height Scroll Picker (Properly Spaced & Sized) */}
        {currentStep === 7 && (
          <View style={styles.heightPickerContainer}>
            {HEIGHT_LIST.map((h, index) => {
              const isFocused = formData.height === h;
              return (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => handleInputChange('height', h)}
                  style={[styles.heightRow, isFocused && styles.heightRowFocused]}
                >
                  {isFocused && <Text style={styles.heightPointerLeft}>▶</Text>}
                  <Text style={[styles.heightText, isFocused ? { color: '#333', fontSize: 22, fontWeight: 'bold' } : { color: '#B0B0B0', fontSize: 18 }]}>
                    {h}
                  </Text>
                  {isFocused && <Text style={styles.heightPointerRight}>◀</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 8: Complexion (Properly Sized Vertical Cards) */}
        {currentStep === 8 && (
          <View style={styles.complexionContainer}>
            {COMPLEXION_LIST.map((comp) => {
              const isSelected = formData.complexion === comp.label;
              return (
                <TouchableOpacity
                  key={comp.label}
                  activeOpacity={0.85}
                  onPress={() => handleInputChange('complexion', comp.label)}
                  style={[
                    styles.complexionCard,
                    isSelected ? styles.selectedComplexionCard : styles.unselectedComplexionCard
                  ]}
                >
                  <View style={styles.avatarBox}><Text style={{fontSize: 32}}>👤</Text></View>
                  <Text style={[styles.complexionCardText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>
                    {comp.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

      </ScrollView>

      {/* Bottom Sticky Navigation */}
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

      {/* Camera / Gallery Modal */}
      <Modal visible={isPhotoModalVisible} transparent={true} animationType="fade" onRequestClose={() => setIsPhotoModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Profile Picture</Text>
            <TouchableOpacity style={styles.modalOption} onPress={handleCameraPick}><Text style={styles.modalOptionText}>📷 Open Camera</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleGalleryPick}><Text style={styles.modalOptionText}>🖼️ Choose from Gallery</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.modalOption, styles.cancelOption]} onPress={() => setIsPhotoModalVisible(false)}><Text style={[styles.modalOptionText, { color: '#FF3B30' }]}>Cancel</Text></TouchableOpacity>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 25, paddingBottom: 110 },
  
  pfpContainer: { alignItems: 'center', marginBottom: 25 },
  pfpWrapper: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, padding: 3, marginBottom: 10 },
  pfpImagePlaceholder: { width: '100%', height: '100%', borderRadius: 45, justifyContent: 'center', alignItems: 'center' },
  actualPfpImage: { width: '100%', height: '100%', borderRadius: 45 },
  pfpEmoji: { fontSize: 35 },
  changePhotoBtn: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20 },
  changePhotoText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  sectionContainer: { backgroundColor: '#FFF', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  sectionHeading: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: 'bold', marginBottom: 6 },
  dropdownHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: '#FAFAFA' },
  dropdownSelectedText: { fontSize: 14, color: '#333' },
  dropdownArrow: { fontSize: 12, color: '#666' },
  dropdownListContainer: { marginTop: 5, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, backgroundColor: '#FFF', paddingVertical: 5 },
  dropdownOptionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0' },
  
  radioButton: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  innerRadioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF' },
  dropdownOptionText: { fontSize: 14, color: '#444' },

  standardInputGroup: { marginBottom: 15 },
  standardLabel: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 5 },
  textInput: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#333', backgroundColor: '#FAFAFA' },

  cardsContainer: { width: '100%' },
  selectionCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 12, borderWidth: 1.5, marginBottom: 12 },
  cardLeftRow: { flexDirection: 'row', alignItems: 'center' },
  stateIconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardText: { fontSize: 15, color: '#333' },

  // Step 5: Large Grid Layout Matching Screenshot 45 exactly
  largeGridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 5 },
  largeGridCard: {
    width: '47%',
    height: 135,
    borderRadius: 16,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  selectedLargeCard: { backgroundColor: '#FDF2F2', borderColor: '#80001E' },
  unselectedLargeCard: { backgroundColor: '#EFEFEF', borderColor: 'transparent' },
  largeGridCardText: { fontSize: 16, color: '#555', textAlign: 'center', fontWeight: '500' },

  // Step 6: Diet Cards Matching Screenshot 46 exactly
  dietCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  selectedDietCard: { backgroundColor: '#FDF2F2', borderColor: '#80001E' },
  unselectedDietCard: { backgroundColor: '#EFEFEF', borderColor: 'transparent' },
  dietIconCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginRight: 15, shadowColor: '#000', shadowOffset: {width:0, height:1}, shadowOpacity: 0.1, elevation: 2 },
  dietCardText: { fontSize: 17, color: '#333', fontWeight: '500' },

  // Step 7: Height Picker Matching Screenshot 47 exactly
  heightPickerContainer: { width: '100%', alignItems: 'center', paddingVertical: 40 },
  heightRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, width: '100%' },
  heightRowFocused: { backgroundColor: '#FAFAFA', borderRadius: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#E0E0E0' },
  heightText: { textAlign: 'center', marginHorizontal: 20 },
  heightPointerLeft: { color: '#80001E', fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  heightPointerRight: { color: '#80001E', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },

  // Step 8: Complexion Cards Matching Screenshot 48 exactly
  complexionContainer: { width: '100%', alignItems: 'center', paddingTop: 10 },
  complexionCard: {
    width: '65%',
    height: 150,
    borderRadius: 16,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  selectedComplexionCard: { backgroundColor: '#FDF2F2', borderColor: '#80001E' },
  unselectedComplexionCard: { backgroundColor: '#EFEFEF', borderColor: 'transparent' },
  avatarBox: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: {width:0, height:1}, shadowOpacity: 0.1, elevation: 2 },
  complexionCardText: { fontSize: 16, color: '#444', fontWeight: '500' },

  bottomButtonRow: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 15, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EFEFEF' },
  skipButton: { paddingVertical: 10 },
  skipButtonText: { color: '#FF3B30', fontSize: 15, fontWeight: 'bold' },
  nextButtonFixed: { width: 130, height: 45, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  nextButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#FFF', borderRadius: 12, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  modalOption: { width: '100%', paddingVertical: 12, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  cancelOption: { borderBottomWidth: 0, marginTop: 5 },
  modalOptionText: { fontSize: 15, color: '#333', fontWeight: '500' },
});