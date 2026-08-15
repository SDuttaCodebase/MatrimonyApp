import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function OtpScreen({ navigation, route }) {
  const { theme } = useThemeStore();
  const [otp, setOtp] = useState(['', '', '', '']);
  
  // Refs to control focus between the 4 separate input boxes
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input if user typed a digit
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = () => {
    // Later we will verify this token with our MongoDB backend API
    // For now, sending the user straight into the main application tabs
    navigation.replace('MainApp');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      
      {/* Top Back Navigation Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.colors.text }]}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.colors.brandDarkest }]}>
          Verification Code
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>
          We Have Send You A One Time OTP On Your Phone Number
        </Text>

        <Text style={[styles.sentText, { color: theme.colors.primary }]}>
          4 Digit Code Sended To
        </Text>
        <Text style={styles.phoneMaskText}>+91*****18202</Text>

        {/* 4 Digit Underline Input Slots */}
        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={[styles.otpInputBox, { borderBottomColor: theme.colors.brandDarkest }]}
              keyboardType="number-pad"
              maxLength={1}
              value={otp[index]}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>

        {/* Send / Verify Button */}
        <TouchableOpacity 
          style={[styles.verifyButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('NewPasswordScreen')}
        >
          <Text style={styles.verifyButtonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>

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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  sentText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  phoneMaskText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  otpInputBox: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  verifyButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});