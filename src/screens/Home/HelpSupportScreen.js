import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FAQItem = ({ question, answer }) => (
  <View style={styles.faqContainer}>
    <Text style={styles.faqQuestion}>{question}</Text>
    <Text style={styles.faqAnswer}>{answer}</Text>
  </View>
);

export default function HelpSupportScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactCard}>
            <MaterialIcons name="email" size={28} color="#C2183D" />
            <Text style={styles.contactText}>Email Us</Text>
            <Text style={styles.contactSubText}>support@shadibiha.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactCard}>
            <MaterialIcons name="phone" size={28} color="#C2183D" />
            <Text style={styles.contactText}>Call Us</Text>
            <Text style={styles.contactSubText}>+91 98765 43210</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <FAQItem 
          question="How do I edit my profile?" 
          answer="You can edit your profile by navigating to the Profile tab and clicking on the Edit icon." 
        />
        <FAQItem 
          question="Is my data safe?" 
          answer="Yes, we use industry-standard encryption to ensure your data and chats are completely secure." 
        />
        <FAQItem 
          question="How do I report a fake profile?" 
          answer="Go to the user's profile, click on the three dots in the top right corner, and select 'Report User'." 
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFFFFF', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#8B1A32' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15, marginTop: 10 },
  contactRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  contactCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, alignItems: 'center', marginHorizontal: 5, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  contactText: { fontSize: 15, fontWeight: '600', color: '#333', marginTop: 10 },
  contactSubText: { fontSize: 12, color: '#777', marginTop: 4, textAlign: 'center' },
  faqContainer: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#F0F0F0' },
  faqQuestion: { fontSize: 15, fontWeight: '700', color: '#8B1A32', marginBottom: 8 },
  faqAnswer: { fontSize: 14, color: '#555', lineHeight: 20 },
});