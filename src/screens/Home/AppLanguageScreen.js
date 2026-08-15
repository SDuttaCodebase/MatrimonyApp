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
import { useTranslation } from 'react-i18next';
import useThemeStore from '../../store/useThemeStore';

// 1. MOVED Data Array UP to prevent Reference/Render Errors during Fast Refresh
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

// Custom Language Row Component
const LanguageOption = ({ label, selected, onPress, theme }) => (
  <TouchableOpacity 
    style={[
      styles.languageContainer, 
      selected && [
        styles.selectedContainer, 
        { 
          backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#FDF1F3',
          borderColor: theme.colors.border 
        }
      ]
    ]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text 
      style={[
        styles.languageText, 
        { color: theme.colors.text }, 
        selected && [styles.selectedText, { color: theme.colors.primary }]
      ]}
    >
      {label}
    </Text>
    <View 
      style={[
        styles.outerCircle, 
        { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#E0E0E0' },
        selected && [
          styles.selectedOuterCircle, 
          { backgroundColor: theme.mode === 'dark' ? '#4A4A55' : '#F0D4DA' }
        ]
      ]}
    >
      {selected && <View style={[styles.innerCircle, { backgroundColor: theme.colors.primary }]} />}
    </View>
  </TouchableOpacity>
);

export default function AppLanguageScreen({ navigation }) {
  const { i18n } = useTranslation();
  const { theme } = useThemeStore();
  
  // Added optional chaining (i18n?.language) to prevent crashes if i18n is still initializing
  const [selectedLang, setSelectedLang] = useState(
    languages.find(l => l.code === i18n?.language) || languages[0]
  );

  const handleSave = () => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(selectedLang.code);
    }
    const dynamicMessage = `App language is now set to ${selectedLang.label}.`;
    navigation.navigate('PrivacySuccessScreen', { message: dynamicMessage });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>App Language</Text>
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
                theme={theme}
              />
            ))}
          </View>
        </ScrollView>

        {/* Save Button fixed at the bottom */}
        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]} 
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Language</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
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
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  selectedContainer: {
    borderWidth: 1,
  },
  languageText: {
    fontSize: 15,
    fontWeight: '500',
  },
  selectedText: {
    fontWeight: '600',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOuterCircle: {
    // Dynamic color handled in component inline styles
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  saveButton: {
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