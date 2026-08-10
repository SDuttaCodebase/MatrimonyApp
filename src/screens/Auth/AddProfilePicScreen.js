// src/screens/Auth/AddProfilePicScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Image, 
  Alert 
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import useThemeStore from '../../store/useThemeStore';

export default function AddProfilePicScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [imageUri, setImageUri] = useState(null);

  // Function to open Phone Camera with built-in Cropper
  const handleOpenCameraController = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
      });
      setImageUri(image.path);
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to capture image from camera.');
      }
    }
  };

  // Function to open Photo Gallery with built-in Cropper
  const handleOpenGalleryController = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
      });
      setImageUri(image.path);
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to select image from gallery.');
      }
    }
  };

  // Official registration submission trigger
  const handleRegister = () => {
    navigation.replace('VerificationPending');
  };

  // Skip trigger
  const handleSkip = () => {
    navigation.replace('VerificationPending');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      
      {/* Title */}
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: theme.colors.brandDarkest }]}>
          Add Your Profile Picture
        </Text>
      </View>

      {/* Avatar Preview Section */}
      <View style={styles.avatarSection}>
        <View style={[styles.avatarContainer, { borderColor: theme.colors.primary }]}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.selectedImage} />
          ) : (
            <View style={styles.placeholderIconView}>
              <Text style={styles.placeholderIconEmoji}>👤</Text>
            </View>
          )}
        </View>

        {/* Clean Styled Camera Button Box */}
        <TouchableOpacity 
          style={[styles.cameraButtonBox, { borderColor: theme.colors.primary }]} 
          onPress={handleOpenCameraController}
        >
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={[styles.cameraText, { color: theme.colors.primary }]}>Use Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Gallery Button, Skip Option, and Final Register Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.galleryButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleOpenGalleryController}
        >
          <Text style={styles.galleryButtonText}>Choose Photo From Gallery</Text>
        </TouchableOpacity>

        {/* Skip Option moved right below gallery button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: theme.colors.subtext }]}>Skip For Now</Text>
        </TouchableOpacity>

        {/* Final Registration Submit Button at the bottom */}
        <TouchableOpacity 
          style={[styles.registerButton, { backgroundColor: theme.colors.brandDarkest }]}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  avatarSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    marginBottom: 20,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  placeholderIconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIconEmoji: {
    fontSize: 70,
    color: '#888',
  },
  cameraButtonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
  },
  cameraIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  cameraText: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 30,
  },
  galleryButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  galleryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
    marginBottom: 25,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '500',
  },
  registerButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});