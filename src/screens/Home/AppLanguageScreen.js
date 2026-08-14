import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next'; // The translation hook

// Custom Language Row Component matching your design
const LanguageOption = ({ label, selected, onPress }) => (
  <TouchableOpacity 
    style={[styles.languageContainer, selected && styles.selectedContainer]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.languageText, selected && styles.selectedText]}>
      {label}
    </Text>
    <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
      {selected && <View style={styles.innerCircle} />}
    </View>
  </TouchableOpacity>
);

export default function AppLanguageScreen({ navigation }) {
  const { i18n } = useTranslation();
  
  // Set the initial state to whatever the current language is, defaulting to English
  const [selectedLang, setSelectedLang] = useState(
    languages.find(l => l.code === i18n.language) || languages[0]
  );

  const handleSave = () => {
    // 1. Change the global app language using i18next
    i18n.changeLanguage(selectedLang.code);

    // 2. Navigate to your dynamic success screen
    const dynamicMessage = `App language is now set to ${selectedLang.label}.`;
    navigation.navigate('PrivacySuccessScreen', { message: dynamicMessage });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Language</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listWrapper}>
            {languages.map((lang) => (
              <LanguageOption 
                key={lang.code}
                label={lang.label}
                selected={selectedLang.code === lang.code}
                onPress={() => setSelectedLang(lang)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Save Button fixed at the bottom */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Language</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Data Array for the languages
const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'mr', label: 'Marathi' },
  { code: 'gu', label: 'Gujrati' },
  { code: 'ta', label: 'Tamil' },
  { code: 'kn', label: 'Kannad' },
  { code: 'pa', label: 'Pahadi' },
  { code: 'pa-in', label: 'Punjabi' },
  { code: 'ur', label: 'Urdu' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B1A32',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  listWrapper: {
    paddingBottom: 20,
  },
  
  // Custom List Item Styles
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: 'transparent', // Unselected state
  },
  selectedContainer: {
    backgroundColor: '#FDF1F3', // Light pink background
    borderWidth: 1,
    borderColor: '#F0D4DA',
  },
  languageText: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '500',
  },
  selectedText: {
    color: '#8B1A32', // Maroon text when selected
    fontWeight: '600',
  },
  
  // Radio Button Styles
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOuterCircle: {
    backgroundColor: '#F0D4DA',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B1A32',
  },

  // Save Button
  saveButton: {
    backgroundColor: '#C2183D',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});