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

const MAX_CHARACTERS = 500;

export default function RegisterStep4Screen({ navigation }) {
  const { theme } = useThemeStore();
  const [bio, setBio] = useState('');

  // Calculate remaining or current length based on design preference
  const currentLength = bio.length;

  const handleCreateBio = () => {
    navigation.replace('MarriageFixedSuccessScreen');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      
      {/* Top Back Navigation Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.colors.text }]}>←</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={[styles.title, { color: theme.colors.brandDarkest }]}>
            What Was The Reason For Your Account Deletion ?
          </Text>

          {/* Multi-line Bio Input Box */}
          <View style={[styles.textAreaWrapper, { borderColor: theme.colors.border }]}>
            <TextInput
              style={styles.textArea}
              placeholder="Write Here"
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={6}
              maxLength={MAX_CHARACTERS}
              value={bio}
              onChangeText={setBio}
              textAlignVertical="top"
            />
          </View>

          {/* Character Counter Indicator */}
          <View style={styles.counterContainer}>
            <Text style={[styles.counterText, { color: theme.colors.primary }]}>
              {currentLength} <Text style={{ color: theme.colors.subtext }}>( {MAX_CHARACTERS} Max )</Text>
            </Text>
          </View>

        </ScrollView>

        {/* Create Bio Button */}
        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleCreateBio}
          >
            <Text style={styles.createButtonText}>Delete Account </Text>
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
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textAreaWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    padding: 12,
    height: 180,
  },
  textArea: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  counterContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  counterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  createButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});