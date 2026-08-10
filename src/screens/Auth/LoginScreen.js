// src/screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function LoginScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLoginPress = () => {
    // Later we will trigger the backend API to send an SMS OTP here
    // For now, navigate directly to the OTP screen and pass the phone number
    navigation.navigate('OTP', { phoneNumber });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
    >
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top Curved Image Container */}
        <View style={styles.imageContainer}>
          <View style={[styles.imagePlaceholder, { backgroundColor: '#333' }]} />
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={[styles.loginTitle, { color: theme.colors.brandDarkest }]}>
            Login
          </Text>

          {/* Phone Input Row */}
          <View style={[styles.inputWrapper, { backgroundColor: '#F8F9FA', borderColor: theme.colors.border }]}>
            <View style={styles.countryCodeBox}>
              <Text style={styles.flagText}>🇮🇳</Text>
              <Text style={styles.codeText}>+91</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleLoginPress}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Register Redirect Row */}
          <View style={styles.registerRow}>
            <Text style={{ color: theme.colors.subtext }}>New User ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.registerText, { color: theme.colors.primary }]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '45%',
    overflow: 'hidden',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    paddingRight: 10,
    marginRight: 10,
  },
  flagText: {
    fontSize: 18,
    marginRight: 5,
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
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontWeight: 'bold',
  },
});