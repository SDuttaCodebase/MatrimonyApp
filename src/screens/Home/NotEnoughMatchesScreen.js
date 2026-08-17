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
import useThemeStore from '../../store/useThemeStore';

export default function NotEnoughMatchesScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [feedback, setFeedback] = useState('');

  const handleDeleteAccount = () => {
    // This takes the user to the password confirmation popup we built earlier
    navigation.navigate('ConfirmDeletePasswordScreen');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Delete Account</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.pageTitle, { color: theme.colors.text }]}>Not Getting Enough Matches</Text>
          
          <Text style={[styles.instructionsText, { color: theme.colors.subtext }]}>
            We are sorry to hear that you aren't finding the right matches. Please let us know how we can improve before you leave.
          </Text>

          <TextInput
            style={[
              styles.textInput, 
              { 
                backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F5F5', 
                borderColor: theme.colors.border, 
                color: theme.colors.text 
              }
            ]}
            placeholder="Share your feedback (optional)..."
            placeholderTextColor={theme.mode === 'dark' ? '#888888' : '#B0B0B0'}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            value={feedback}
            onChangeText={setFeedback}
          />

          <View style={{ flex: 1 }} />

          <TouchableOpacity 
            style={[styles.deleteButton, { backgroundColor: theme.colors.primary }]} 
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteButtonText}>Delete My Account</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
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
    shadowRadius: 2 
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  contentContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 30, paddingBottom: 40 },
  pageTitle: { fontSize: 18, fontWeight: '700', marginBottom: 15 },
  instructionsText: { fontSize: 14, lineHeight: 22, marginBottom: 25 },
  textInput: { 
    borderWidth: 1, 
    borderRadius: 8, 
    padding: 15, 
    fontSize: 14, 
    minHeight: 120 
  },
  deleteButton: { 
    paddingVertical: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  deleteButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});