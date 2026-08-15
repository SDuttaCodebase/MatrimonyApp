import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeStore from '../../store/useThemeStore';

export default function AboutScreen({ navigation }) {
  const { theme } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>About Us</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          {/* Placeholder for your actual app logo */}
          <View style={[styles.logoPlaceholder, { backgroundColor: theme.colors.primary, shadowColor: theme.colors.primary }]}>
            <MaterialCommunityIcons name="ring" size={60} color="#FFFFFF" />
          </View>
          <Text style={[styles.appName, { color: theme.colors.text }]}>Shadibiha.Com</Text>
          <Text style={[styles.appVersion, { color: theme.colors.subtext }]}>Version 0.1</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>Our Mission</Text>
          <Text style={[styles.cardText, { color: theme.colors.text }]}>
            Finding a life partner is one of the most important decisions of your life. At Shadibiha.Com, our mission is to provide a trusted, secure, and intuitive platform to help you connect with your true soulmate. We believe in bringing families and hearts together.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>Connect With Us</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F5F5' }]}>
              <MaterialCommunityIcons name="facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F5F5' }]}>
              <MaterialCommunityIcons name="instagram" size={24} color="#C13584" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F5F5' }]}>
              <MaterialCommunityIcons name="twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  headerTitle: { fontSize: 20, fontWeight: '700' },
  content: { padding: 20 },
  logoContainer: { alignItems: 'center', marginVertical: 30 },
  logoPlaceholder: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15, 
    elevation: 5, 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 5 
  },
  appName: { fontSize: 24, fontWeight: 'bold' },
  appVersion: { fontSize: 14, marginTop: 5 },
  card: { 
    borderRadius: 12, 
    padding: 20, 
    marginBottom: 20, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 3 
  },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  cardText: { fontSize: 14, lineHeight: 22 },
  socialRow: { flexDirection: 'row', marginTop: 10 },
  socialIcon: { marginRight: 20, padding: 10, borderRadius: 20 },
});