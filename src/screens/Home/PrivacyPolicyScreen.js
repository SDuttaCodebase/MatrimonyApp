import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useThemeStore from '../../store/useThemeStore';

export default function PrivacyPolicyScreen({ navigation }) {
  const { theme } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Privacy & Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <Text style={[styles.lastUpdated, { color: theme.colors.subtext }]}>Last Updated: August 2026</Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>1. Introduction</Text>
        <Text style={[styles.paragraph, { color: theme.colors.subtext }]}>
          Welcome to Shadibiha.Com. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our application and tell you about your privacy rights.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>2. Data We Collect</Text>
        <Text style={[styles.paragraph, { color: theme.colors.subtext }]}>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data (name, username, marital status, title, date of birth and gender), Contact Data, and Profile Data (your preferences, feedback and survey responses).
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>3. How We Use Your Data</Text>
        <Text style={[styles.paragraph, { color: theme.colors.subtext }]}>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to register you as a new customer, manage our relationship with you, and recommend potential matches based on your preferences.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>4. Data Security</Text>
        <Text style={[styles.paragraph, { color: theme.colors.subtext }]}>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
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
    shadowRadius: 2 
  },
  backButton: { 
    padding: 4 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700' 
  },
  content: { 
    padding: 20, 
    paddingBottom: 40 
  },
  lastUpdated: { 
    fontSize: 13, 
    marginBottom: 20, 
    fontStyle: 'italic' 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    marginBottom: 10, 
    marginTop: 15 
  },
  paragraph: { 
    fontSize: 14, 
    lineHeight: 22, 
    textAlign: 'justify' 
  },
});