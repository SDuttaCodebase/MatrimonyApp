// src/screens/Auth/RegisterScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView 
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function RegisterScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleNextPress = () => {
    navigation.navigate('RegisterStep2');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      
      {/* Top Back Navigation Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.colors.text }]}>←</Text>
        </TouchableOpacity>
      </View>

      {/* KeyboardAvoidingView keeps the layout adaptive when the keyboard opens */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Instruction Text */}
          <Text style={[styles.instructionText, { color: theme.colors.brandDarkest }]}>
            An Active Email Id & Phone No. Are Required To Secure Your Profile .
          </Text>

          {/* Mobile Number Section */}
          <Text style={[styles.label, { color: theme.colors.brandDarkest }]}>Mobile No.</Text>
          <View style={[styles.mobileInputRow, { borderColor: theme.colors.border }]}>
            <View style={styles.countryCodeBox}>
              <Text style={styles.codeText}>+ 91</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Mobile No."
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          {/* Email ID Section */}
          <Text style={[styles.label, { color: theme.colors.brandDarkest }]}>Email ID</Text>
          <TextInput
            style={[styles.emailInput, { borderColor: theme.colors.border }]}
            placeholder="Riya123@gmail.Com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </ScrollView>

        {/* Next Button pinned above the keyboard */}
        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={[styles.nextButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleNextPress}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 20,
  },
  instructionText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  mobileInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    marginBottom: 25,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
  },
  countryCodeBox: {
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    paddingRight: 12,
    marginRight: 10,
  },
  codeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  emailInput: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
    color: '#333',
    marginBottom: 20,
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  nextButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});