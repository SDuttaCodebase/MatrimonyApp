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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeStore from '../../store/useThemeStore';

export default function NewPasswordScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = () => {
    console.log('Password successfully changed!');
    navigation.navigate('SettingsScreen');
  };

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

          <View 
            style={[
              styles.inputContainer, 
              { 
                backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F5F5',
                borderColor: theme.colors.border 
              }
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: theme.colors.text }]}
              placeholder="New Password"
              placeholderTextColor={theme.mode === 'dark' ? '#888888' : '#B0B0B0'}
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <MaterialCommunityIcons 
                name={showNewPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color={theme.colors.subtext} 
              />
            </TouchableOpacity>
          </View>

          <View 
            style={[
              styles.inputContainer, 
              { 
                backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F5F5',
                borderColor: theme.colors.border 
              }
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: theme.colors.text }]}
              placeholder="Confirm Password"
              placeholderTextColor={theme.mode === 'dark' ? '#888888' : '#B0B0B0'}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <MaterialCommunityIcons 
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color={theme.colors.subtext} 
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity 
            style={[styles.changeButton, { backgroundColor: theme.colors.primary }]} 
            onPress={handlePasswordChange}
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
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 14,
  },
  eyeIcon: {
    padding: 10,
  },
  changeButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});