import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput 
} from 'react-native';

export default function ConfirmDeletePasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');

  const handleDeleteProfile = () => {
    console.log('Password entered, proceeding to delete account...');
    // Navigate to the final deletion success screen
    navigation.replace('AccountDeletedSuccessScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Semi-transparent dark overlay background mimicking a popup modal */}
      <View style={styles.modalOverlay}>
        <View style={styles.popupCard}>
          
          <Text style={styles.popupTitle}>Confirm Your Account Deletion</Text>
          
          <Text style={styles.popupSubtitle}>
            For Confirming Your Account Deletion{'\n'}We Need To Have Your Password First
          </Text>

          <TextInput
            style={styles.passwordInput}
            placeholder="Type Your Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.deleteProfileButton} onPress={handleDeleteProfile}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimmed background look
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  popupCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
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
    color: '#C2183D', // Maroon title
    marginBottom: 20,
    textAlign: 'center',
  },
  popupSubtitle: {
    fontSize: 13,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
  },
  passwordInput: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333333',
    marginBottom: 25,
  },
  deleteProfileButton: {
    width: '100%',
    backgroundColor: '#C2183D',
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