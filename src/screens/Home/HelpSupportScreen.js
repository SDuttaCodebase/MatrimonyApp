import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useThemeStore from '../../store/useThemeStore';

const FAQItem = ({ question, answer, theme }) => (
  <View style={[styles.faqContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
    <Text style={[styles.faqQuestion, { color: theme.colors.primary }]}>{question}</Text>
    <Text style={[styles.faqAnswer, { color: theme.colors.subtext }]}>{answer}</Text>
  </View>
);

export default function HelpSupportScreen({ navigation }) {
  const { theme } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contact Us</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity style={[styles.contactCard, { backgroundColor: theme.colors.surface }]}>
            <MaterialIcons name="email" size={28} color={theme.colors.primary} />
            <Text style={[styles.contactText, { color: theme.colors.text }]}>Email Us</Text>
            <Text style={[styles.contactSubText, { color: theme.colors.subtext }]}>support@shadibiha.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.contactCard, { backgroundColor: theme.colors.surface }]}>
            <MaterialIcons name="phone" size={28} color={theme.colors.primary} />
            <Text style={[styles.contactText, { color: theme.colors.text }]}>Call Us</Text>
            <Text style={[styles.contactSubText, { color: theme.colors.subtext }]}>+91 98765 43210</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Frequently Asked Questions</Text>
        <FAQItem 
          question="How do I edit my profile?" 
          answer="You can edit your profile by navigating to the Profile tab and clicking on the Edit icon." 
          theme={theme}
        />
        <FAQItem 
          question="Is my data safe?" 
          answer="Yes, we use industry-standard encryption to ensure your data and chats are completely secure." 
          theme={theme}
        />
        <FAQItem 
          question="How do I report a fake profile?" 
          answer="Go to the user's profile, click on the three dots in the top right corner, and select 'Report User'." 
          theme={theme}
        />

      </ScrollView>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    marginTop: 10,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  contactCard: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  contactText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
  },
  contactSubText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  faqContainer: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
});