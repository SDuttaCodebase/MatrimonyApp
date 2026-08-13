import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ChangePasswordScreen({ navigation }) {
  const [mobile, setMobile] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#555" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Password</Text>
          <View style={{ width: 24 }} /> {/* Empty view for flex alignment */}
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          
          {/* Text Section */}
          <Text style={styles.pageTitle}>Change Password</Text>
          <Text style={styles.instructionsText}>
            Before Changing Your Password Please Confirm That You Are Able To Receive SMS Or Call At Your Number.
          </Text>
          <Text style={styles.instructionsText}>
            We Are Sending A 4 Digit OTP On Your Phone Number
          </Text>

          {/* Input Section */}
          <Text style={styles.inputLabel}>Mobile No.</Text>
          <View style={styles.inputRow}>
            {/* Country Code Dropdown Fake Button */}
            <TouchableOpacity style={styles.countryCodePicker}>
              <Text style={styles.countryCodeText}>+ 91</Text>
              <MaterialIcons name="arrow-drop-down" size={20} color="#333" />
            </TouchableOpacity>

            {/* Phone Number Input */}
            <TextInput
              style={styles.textInput}
              placeholder="Mobile No."
              placeholderTextColor="#B0B0B0"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          {/* Spacer pushes the button to the bottom */}
          <View style={{ flex: 1 }} />

          {/* Change Button */}
          <TouchableOpacity 
            style={styles.changeButton} 
            onPress={() => navigation.navigate('ChangePassOTP')}
          >
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Standard light background
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B1A32', // Deep maroon
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40, // Space from the bottom of the screen
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#666666',
    marginBottom: 15,
  },
  instructionsText: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 20,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B1A32', // Maroon label
    marginBottom: 10,
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryCodePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '25%', // Takes up a quarter of the row
  },
  countryCodeText: {
    fontSize: 14,
    color: '#333333',
    marginRight: 4,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333333',
    width: '70%', // Takes up the remaining space
  },
  changeButton: {
    backgroundColor: '#C2183D', // Bright red/maroon for the button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});