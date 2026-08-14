import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Reusable Custom Radio Button
const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
      {selected && <View style={styles.innerCircle} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function ContactPrivacyScreen({ navigation }) {
  const [selectedPrivacy, setSelectedPrivacy] = useState('All Paid Members');

  const privacyOptions = [
    'All Paid Members',
    'Visible To All',
    'Only To Interest Sent / Accept',
    'Don\'t Show To Anyone'
  ];

  const handleSave = () => {
    let dynamicMessage = '';

    // Format the text based on the selection
    if (selectedPrivacy === 'Visible To All') {
      dynamicMessage = 'Contact is now visible to All Members.';
    } else if (selectedPrivacy === 'Don\'t Show To Anyone') {
      dynamicMessage = 'Contact is now hidden from everyone.';
    } else {
      dynamicMessage = `Contact is now visible to ${selectedPrivacy}.`;
    }

    // Navigate to the success screen and pass the message
    navigation.navigate('PrivacySuccessScreen', { message: dynamicMessage });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Privacy</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.pageTitle}>Show Contact Number Only To</Text>

        <View style={styles.radioList}>
          {privacyOptions.map((option, index) => (
            <RadioButton 
              key={index}
              label={option}
              selected={selectedPrivacy === option}
              onPress={() => setSelectedPrivacy(option)}
            />
          ))}
        </View>

        {/* Spacer pushes the button to the bottom */}
        <View style={{ flex: 1 }} />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>save & continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B1A32',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#555555',
    marginBottom: 25,
  },
  
  // Custom Radio Button Styles
  radioList: { marginTop: 10 },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedOuterCircle: { backgroundColor: '#F0D4DA' },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B1A32',
  },
  radioLabel: {
    fontSize: 14,
    color: '#444444',
  },
  
  // Button Styles
  saveButton: {
    backgroundColor: '#C2183D',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});