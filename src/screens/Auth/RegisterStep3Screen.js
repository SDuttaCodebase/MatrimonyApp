// src/screens/Auth/RegisterStep3Screen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function RegisterStep3Screen({ navigation }) {
  const { theme } = useThemeStore();
  
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('Female');

  const handleNext = () => {
    navigation.navigate('RegisterStep4');
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
          
          {/* Name Section */}
          <Text style={[styles.sectionTitle, { color: theme.colors.brandDarkest }]}>Name</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.border }]}
            placeholder="First Name"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
          />
          <View style={styles.optionalInputWrapper}>
            <TextInput
              style={[styles.input, styles.optionalInput, { borderColor: theme.colors.border }]}
              placeholder="Middle Name"
              placeholderTextColor="#999"
              value={middleName}
              onChangeText={setMiddleName}
            />
            <Text style={styles.optionalBadge}>Optional</Text>
          </View>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.border }]}
            placeholder="Last Name"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />

          {/* Date Of Birth Section */}
          <Text style={[styles.sectionTitle, { color: theme.colors.brandDarkest, marginTop: 10 }]}>Date Of Birth</Text>
          <View style={styles.dobRow}>
            <View style={styles.dobColumn}>
              <Text style={styles.dobLabel}>Day</Text>
              <TextInput
                style={[styles.dobInput, { borderColor: theme.colors.border }]}
                placeholder="DD"
                placeholderTextColor="#AAA"
                keyboardType="number-pad"
                maxLength={2}
                value={day}
                onChangeText={setDay}
              />
            </View>
            <View style={styles.dobColumn}>
              <Text style={styles.dobLabel}>Month</Text>
              <TextInput
                style={[styles.dobInput, { borderColor: theme.colors.border }]}
                placeholder="MM"
                placeholderTextColor="#AAA"
                keyboardType="number-pad"
                maxLength={2}
                value={month}
                onChangeText={setMonth}
              />
            </View>
            <View style={styles.dobColumn}>
              <Text style={styles.dobLabel}>Year</Text>
              <TextInput
                style={[styles.dobInput, { borderColor: theme.colors.border }]}
                placeholder="YYYY"
                placeholderTextColor="#AAA"
                keyboardType="number-pad"
                maxLength={4}
                value={year}
                onChangeText={setYear}
              />
            </View>
          </View>

          {/* Gender Section */}
          <Text style={[styles.sectionTitle, { color: theme.colors.brandDarkest, marginTop: 10 }]}>Gender</Text>
          <View style={styles.genderRow}>
            {['Female', 'Male', 'Others'].map((item) => {
              const isSelected = gender === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.genderCard,
                    { borderColor: isSelected ? theme.colors.primary : theme.colors.border },
                    isSelected && { backgroundColor: '#FFF5F7' }
                  ]}
                  onPress={() => setGender(item)}
                >
                  <Text style={styles.genderIcon}>
                    {item === 'Female' ? '♀' : item === 'Male' ? '♂' : '⚥'}
                  </Text>
                  <Text style={[styles.genderText, { color: isSelected ? theme.colors.primary : '#555' }]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

        </ScrollView>

        {/* Next Button */}
        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={[styles.nextButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
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
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
    color: '#333',
    marginBottom: 15,
  },
  optionalInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  optionalInput: {
    marginBottom: 15,
  },
  optionalBadge: {
    position: 'absolute',
    right: 15,
    top: 15,
    fontSize: 12,
    color: '#999',
  },
  dobRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dobColumn: {
    flex: 1,
    marginRight: 10,
  },
  dobLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  dobInput: {
    borderWidth: 1,
    borderRadius: 8,
    height: 45,
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: '#FAFAFA',
    color: '#333',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genderCard: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#FAFAFA',
  },
  genderIcon: {
    fontSize: 22,
    marginBottom: 5,
    color: '#555',
  },
  genderText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  nextButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});