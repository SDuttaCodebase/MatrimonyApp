import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useThemeStore from '../../store/useThemeStore';

// Reusable component for the text buttons
const AccountOption = ({ title, onPress, theme }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Text style={[styles.itemText, { color: theme.colors.text }]}>{title}</Text>
  </TouchableOpacity>
);

export default function AccountScreen({ navigation }) {
  const { theme } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Account</Text>
        <View style={{ width: 24 }} /> {/* Empty view for flex alignment */}
      </View>

      {/* Account Options */}
      <View style={styles.contentContainer}>
        <AccountOption 
          title="Change Password" 
          onPress={() => navigation.navigate('ChangePasswordScreen')} 
          theme={theme}
        />
        
        <AccountOption 
          title="Delete My Account" 
          onPress={() => navigation.navigate('DeleteAccountScreen')} 
          theme={theme}
        />
        
        <AccountOption 
          title="Logout" 
          onPress={() => console.log('Trigger Logout flow')} 
          theme={theme}
        />
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
  },
});