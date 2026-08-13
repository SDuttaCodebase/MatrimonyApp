import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Reusable component for the text buttons
const AccountOption = ({ title, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Text style={styles.itemText}>{title}</Text>
  </TouchableOpacity>
);

export default function AccountScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
        <View style={{ width: 24 }} /> {/* Empty view for flex alignment */}
      </View>

      {/* Account Options */}
      <View style={styles.contentContainer}>
        <AccountOption 
          title="Change Password" 
          onPress={() => navigation.navigate('ChangePasswordScreen')} 
        />
        
        <AccountOption 
          title="Delete My Account" 
          onPress={() => navigation.navigate('DeleteAccountScreen')} 
        />
        
        <AccountOption 
          title="Logout" 
          onPress={() => console.log('Trigger Logout flow')} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Matches the light gray/white background of Settings
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30, // Space between header and first item
  },
  itemContainer: {
    paddingVertical: 18,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
});