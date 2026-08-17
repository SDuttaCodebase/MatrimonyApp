import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useThemeStore from '../../store/useThemeStore';

export default function PhotoPrivacyScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [selectedPrivacy, setSelectedPrivacy] = useState('Visible To All');

  const privacyOptions = [
    'Visible To All',
    'Only To Interets Sent / Accept'
  ];

  const handleSave = () => {
    let dynamicMessage = '';
    if (selectedPrivacy === 'Visible To All') {
      dynamicMessage = 'Photo is now visible to All Members.';
    } else {
      dynamicMessage = `Photo is now visible to ${selectedPrivacy}.`;
    }
    navigation.navigate('PrivacySuccessScreen', { message: dynamicMessage });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Photo Privacy</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.pageTitle, { color: theme.colors.subtext }]}>Who Can View My Photo ?</Text>

        <View style={styles.radioList}>
          {privacyOptions.map((option, index) => {
            const selected = selectedPrivacy === option;
            return (
              <TouchableOpacity 
                key={index} 
                style={styles.radioContainer} 
                onPress={() => setSelectedPrivacy(option)} 
                activeOpacity={0.8}
              >
                <View 
                  style={[
                    styles.outerCircle, 
                    { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#E0E0E0' },
                    selected && { backgroundColor: theme.mode === 'dark' ? '#4A4A55' : '#F0D4DA' }
                  ]}
                >
                  {selected && <View style={[styles.innerCircle, { backgroundColor: theme.colors.primary }]} />}
                </View>
                <Text style={[styles.radioLabel, { color: theme.colors.text }]}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]} 
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>save & continue</Text>
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
  backButton: { 
    padding: 4 
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
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 25,
  },
  radioList: { 
    marginTop: 10 
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 14,
  },
  saveButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});