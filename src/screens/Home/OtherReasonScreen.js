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
import Icon from 'react-native-vector-icons/Ionicons';
import useThemeStore from '../../store/useThemeStore';

const MAX_CHARACTERS = 500;

export default function RegisterStep4Screen({ navigation }) {
  const { theme } = useThemeStore();
  const [bio, setBio] = useState('');

  const currentLength = bio.length;

  const handleDeleteAccount = () => {
    navigation.navigate('ConfirmDeletePasswordScreen');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
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

          <View 
            style={[
              styles.textAreaWrapper, 
              { 
                borderColor: theme.colors.border,
                backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#FAFAFA'
              }
            ]}
          >
            <TextInput
              style={[styles.textArea, { color: theme.colors.text }]}
              placeholder="Write Here"
              placeholderTextColor={theme.mode === 'dark' ? '#888888' : '#999999'}
              multiline={true}
              numberOfLines={6}
              maxLength={MAX_CHARACTERS}
              value={bio}
              onChangeText={setBio}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.counterContainer}>
            <Text style={[styles.counterText, { color: theme.colors.primary }]}>
              {currentLength} <Text style={{ color: theme.colors.subtext }}>( {MAX_CHARACTERS} Max )</Text>
            </Text>
          </View>

        </ScrollView>

        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.createButtonText}>Delete Account</Text>
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
    padding: 12,
    height: 180,
  },
  textArea: {
    flex: 1,
    fontSize: 15,
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