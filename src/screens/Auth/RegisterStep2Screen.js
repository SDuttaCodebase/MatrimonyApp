// src/screens/Auth/RegisterStep2Screen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

const profileOptions = [
  'Myself',
  'My Son',
  'My Daughter',
  'My Brother',
  'My Sister',
  'My Relative',
  'My Friend'
];

export default function RegisterStep2Screen({ navigation }) {
  const { theme } = useThemeStore();
  const [selectedOption, setSelectedOption] = useState('Myself');

  const handleSubmit = () => {
    // Proceed to Name, DOB, and Gender screen
    navigation.navigate('RegisterStep3');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      
      {/* Top Back Navigation Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.colors.text }]}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Illustration & Title */}
        <View style={styles.titleContainer}>
          <View style={[styles.avatarPlaceholder, { backgroundColor: '#F0F0F0' }]} />
          <Text style={[styles.title, { color: theme.colors.brandDarkest }]}>
            This Profile Is For
          </Text>
        </View>

        {/* Radio Options List */}
        <View style={styles.listContainer}>
          {profileOptions.map((option, index) => {
            const isSelected = selectedOption === option;
            return (
              <TouchableOpacity 
                key={index} 
                style={styles.radioRow}
                onPress={() => setSelectedOption(option)}
              >
                <View style={[styles.radioOuter, { borderColor: isSelected ? theme.colors.primary : '#CCCCCC' }]}>
                  {isSelected && <View style={[styles.radioInner, { backgroundColor: theme.colors.primary }]} />}
                </View>
                <Text style={[styles.radioText, { color: isSelected ? theme.colors.brandDarkest : '#333' }]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

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
    paddingBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  listContainer: {
    marginBottom: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});