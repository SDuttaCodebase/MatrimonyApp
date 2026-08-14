import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Using MaterialIcons for perfect icon matches

// Reusable component for each setting option
const SettingsItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <MaterialIcons name={icon} size={24} color="#4A4A4A" style={styles.icon} />
    <Text style={styles.itemText}>{title}</Text>
  </TouchableOpacity>
);

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} /> {/* Empty view for flex alignment */}
      </View>

      {/* Settings Options List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <SettingsItem 
          icon="person-outline" 
          title="Account" 
          onPress={() => navigation.navigate('AccountScreen')} 
        />
        
        <SettingsItem 
          icon="security" 
          title="Privacy" 
          onPress={() => navigation.navigate('PrivacyMenuScreen')} 
        />
        
        <SettingsItem 
          icon="g-translate" 
          title="App Language" 
          onPress={() => console.log('Navigate to App Language')} 
        />
        
        <SettingsItem 
          icon="people-outline" 
          title="Refer A Friend" 
          onPress={() => console.log('Navigate to Refer A Friend')} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Very light gray/white background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B1A32', // Deep maroon color to match your design
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30, // Space between header and first item
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  icon: {
    width: 30, // Fixed width so text aligns perfectly vertically
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
});