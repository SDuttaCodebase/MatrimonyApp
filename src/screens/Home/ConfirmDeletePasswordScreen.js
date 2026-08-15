import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput 
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function ConfirmDeletePasswordScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [password, setPassword] = useState('');

  const handleDeleteProfile = () => {
    console.log('Password entered, proceeding to delete account...');
    navigation.replace('AccountDeletedSuccessScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalOverlay}>
        <View style={[styles.popupCard, { backgroundColor: theme.colors.surface }]}>
          
          <Text style={[styles.popupTitle, { color: theme.colors.primary }]}>
            Confirm Your Account Deletion
          </Text>
          
          <Text style={[styles.popupSubtitle, { color: theme.colors.subtext }]}>
            For Confirming Your Account Deletion{'\n'}We Need To Have Your Password First
          </Text>

          <TextInput
            style={[
              styles.passwordInput,
              {
                backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F9F9F9',
                borderColor: theme.colors.border,
                color: theme.colors.text
              }
            ]}
            placeholder="Type Your Password"
            placeholderTextColor={theme.mode === 'dark' ? '#c8c7c7' : '#999999'}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={[styles.deleteProfileButton, { backgroundColor: theme.colors.primary }]} 
            onPress={handleDeleteProfile}
          >
            <Text style={styles.deleteProfileButtonText}>Delete Profile</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  popupCard: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  popupSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
  },
  passwordInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 25,
  },
  deleteProfileButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});