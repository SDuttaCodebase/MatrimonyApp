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
import ImagePicker from 'react-native-image-crop-picker'; // Using crop-picker package
import useThemeStore from '../../store/useThemeStore';

export default function ProfileScreen({ navigation }) {
  const { theme } = useThemeStore();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const [profilePic, setProfilePic] = useState(null);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: 'Sandipan Dutta',
    dob: '15/08/2003',
    email: 'sandipan.dev@gmail.com',
    phone: '+91 9876543210',
    gender: 'Male',
    religion: 'Hindu',
    community: 'Bengali',
    motherTongue: 'Bengali',
    location: 'Kolkata, West Bengal',
    occupation: 'Software Engineer',
    income: '15 LPA',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Camera with built-in cropping enabled
  const handleCameraPick = () => {
    setIsPhotoModalVisible(false);
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true, // Triggers native crop UI
      freeStyleCropEnabled: true,
    })
      .then((image) => {
        setProfilePic(image.path);
      })
      .catch((error) => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Camera Error: ', error);
        }
      });
  };

  // Gallery with built-in cropping enabled
  const handleGalleryPick = () => {
    setIsPhotoModalVisible(false);
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true, // Triggers native crop UI
      freeStyleCropEnabled: true,
    })
      .then((image) => {
        setProfilePic(image.path);
      })
      .catch((error) => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Picker Error: ', error);
        }
      });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      Alert.alert('Profile Updated', 'All your changes have been successfully saved!');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      
      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
          My Profile (Step {currentStep} of {totalSteps})
        </Text>
        <View style={styles.spacer} />
      </View>

      {/* Scrollable Form Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Picture Section */}
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

        {/* Dynamic Step Forms */}
        {currentStep === 1 ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Personal Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={formData.fullName}
                onChangeText={(text) => handleInputChange('fullName', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.textInput}
                value={formData.dob}
                onChangeText={(text) => handleInputChange('dob', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                value={formData.email}
                keyboardType="email-address"
                onChangeText={(text) => handleInputChange('email', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Number</Text>
              <TextInput
                style={styles.textInput}
                value={formData.phone}
                keyboardType="phone-pad"
                onChangeText={(text) => handleInputChange('phone', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location / City</Text>
              <TextInput
                style={styles.textInput}
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
              />
            </View>
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Background & Professional</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Religion</Text>
              <TextInput
                style={styles.textInput}
                value={formData.religion}
                onChangeText={(text) => handleInputChange('religion', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Community</Text>
              <TextInput
                style={styles.textInput}
                value={formData.community}
                onChangeText={(text) => handleInputChange('community', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mother Tongue</Text>
              <TextInput
                style={styles.textInput}
                value={formData.motherTongue}
                onChangeText={(text) => handleInputChange('motherTongue', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Occupation</Text>
              <TextInput
                style={styles.textInput}
                value={formData.occupation}
                onChangeText={(text) => handleInputChange('occupation', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Annual Income</Text>
              <TextInput
                style={styles.textInput}
                value={formData.income}
                onChangeText={(text) => handleInputChange('income', text)}
              />
            </View>
          </View>
        )}

      </ScrollView>

      {/* Bottom Sticky Navigation: Prev & Next Buttons */}
      <View style={[styles.bottomButtonRow, { borderTopColor: '#EFEFEF' }]}>
        <TouchableOpacity 
          style={[styles.navButton, styles.prevButton]} 
          onPress={handlePrev}
        >
          <Text style={styles.prevButtonText}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, { backgroundColor: theme.colors.primary }]} 
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Save Profile' : 'Next'}
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
  
  pfpContainer: { alignItems: 'center', marginBottom: 30 },
  pfpWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    padding: 3,
    marginBottom: 12,
  },
  pfpImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actualPfpImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  pfpEmoji: { fontSize: 40 },
  changePhotoBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
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
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 5 },
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

  bottomButtonRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  prevButton: {
    backgroundColor: '#E4E6EB',
  },
  prevButtonText: { color: '#333', fontSize: 14, fontWeight: 'bold' },
  nextButtonText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },

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