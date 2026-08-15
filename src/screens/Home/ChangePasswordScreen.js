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
import useThemeStore from '../../store/useThemeStore';

export default function ChangePasswordScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [mobile, setMobile] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Change Password</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.contentContainer}>
          
          <Text style={[styles.pageTitle, { color: theme.colors.text }]}>Change Password</Text>
          
          <Text style={[styles.instructionsText, { color: theme.colors.subtext }]}>
            Before Changing Your Password Please Confirm That You Are Able To Receive SMS Or Call At Your Number.
          </Text>
          
          <Text style={[styles.instructionsText, { color: theme.colors.subtext }]}>
            We Are Sending A 4 Digit OTP On Your Phone Number
          </Text>

          <Text style={[styles.inputLabel, { color: theme.colors.primary }]}>Mobile No.</Text>
          
          <View style={styles.inputRow}>
            <TouchableOpacity 
              style={[
                styles.countryCodePicker, 
                { 
                  backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F5F5',
                  borderColor: theme.colors.border 
                }
              ]}
            >
              <Text style={[styles.countryCodeText, { color: theme.colors.text }]}>+ 91</Text>
              <MaterialIcons name="arrow-drop-down" size={20} color={theme.colors.text} />
            </TouchableOpacity>

            <TextInput
              style={[
                styles.textInput, 
                { 
                  backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F5F5',
                  borderColor: theme.colors.border,
                  color: theme.colors.text
                }
              ]}
              placeholder="Mobile No."
              placeholderTextColor={theme.mode === 'dark' ? '#888888' : '#B0B0B0'}
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity 
            style={[styles.changeButton, { backgroundColor: theme.colors.primary }]} 
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
    elevation: 2,
    shadowColor: '#000',
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
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  instructionsText: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
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
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '25%',
  },
  countryCodeText: {
    fontSize: 14,
    marginRight: 4,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    width: '70%',
  },
  changeButton: {
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