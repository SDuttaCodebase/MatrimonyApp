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
        cropping: true, // Enables the crop grid view with check/cross buttons!
        cropperCircleOverlay: true, // Optional: makes the crop frame circular for profile pics
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
        cropping: true, // Opens the grid crop interface immediately after selecting a photo
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

  const handleFinish = () => {
    // Proceed to the main application dashboard
    navigation.replace('MainApp');
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

        {/* Use Camera Trigger */}
        <TouchableOpacity style={styles.cameraTriggerRow} onPress={handleOpenCameraController}>
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={[styles.cameraText, { color: theme.colors.primary }]}>Use Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Choose From Gallery Main Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.galleryButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleOpenGalleryController}
        >
          <Text style={styles.galleryButtonText}>Choose Photo From Gallery</Text>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity style={styles.skipButton} onPress={handleFinish}>
          <Text style={[styles.skipText, { color: theme.colors.primary }]}>Skip</Text>
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
    marginTop: 70,
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
    marginBottom: 15,
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
  cameraTriggerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cameraIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  cameraText: {
    fontSize: 15,
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
    marginBottom: 250,
  },
  galleryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
  },
});