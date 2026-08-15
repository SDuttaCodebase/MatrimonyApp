// src/components/HamburgerMenu.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeStore from '../store/useThemeStore';

const { width } = Dimensions.get('window');

export default function HamburgerMenu({ navigation }) {
  // 1. ALL HOOKS MUST BE DECLARED AT THE VERY TOP, UNCONDITIONALLY
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme.mode === 'dark';
  const [activeItem, setActiveItem] = useState('Notification');

  // Menu data array
  const menuItems = [
    { id: 'NotificationScreen', title: 'Notification', icon: 'bell-outline', library: 'MaterialCommunityIcons' },
    { id: 'Shortlist', title: 'Shortlist', icon: 'heart-outline', library: 'MaterialCommunityIcons' },
    { id: 'SettingsScreen', title: 'Settings', icon: 'cog-outline', library: 'MaterialCommunityIcons' },
    { id: 'BlockedAccountsScreen', title: 'Block Accounts', icon: 'account-cancel-outline', library: 'MaterialCommunityIcons' },
    { id: 'AboutScreen', title: 'About', icon: 'information-outline', library: 'MaterialCommunityIcons' },
    { id: 'HelpSupportScreen', title: 'Help & Support', icon: 'headset', library: 'MaterialCommunityIcons' },
    { id: 'PrivacyPolicyScreen', title: 'Privacy & Policy', icon: 'shield-check-outline', library: 'MaterialCommunityIcons' },
  ];

  const handleMenuPress = (item) => {
    setActiveItem(item.title);
    if (item.id) {
      navigation.navigate(item.id);
    }
  };

  const renderIcon = (item, isSelected) => {
    const color = isSelected ? theme.colors.primary : theme.colors.subtext;
    if (item.library === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={isSelected && item.title === 'Notification' ? 'bell' : item.icon} size={24} color={color} />;
    }
    return <Icon name={item.icon} size={24} color={color} />;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      
      {/* Profile Header Section */}
      <View style={[styles.profileSection, { borderBottomColor: theme.colors.border }]}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?img=1' }} 
          style={styles.profileImage} 
        />
        <View style={styles.profileTextContainer}>
          <Text style={[styles.profileName, { color: theme.colors.text }]}>Sandipan Dutta</Text>
          <Text style={[styles.profileRole, { color: theme.colors.subtext }]}>Computer Science Student</Text>
        </View>
      </View>

      {/* Menu Items List */}
      <ScrollView contentContainerStyle={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => {
          const isSelected = activeItem === item.title;
          return (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}
            >
              <View style={styles.iconContainer}>
                {renderIcon(item, isSelected)}
              </View>
              <Text style={[
                styles.menuItemText, 
                { color: theme.colors.text },
                isSelected && { color: theme.colors.primary, fontWeight: '600' }
              ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* --- DARK MODE TOGGLE ROW --- */}
        <View style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons 
              name={isDarkMode ? "weather-night" : "white-balance-sunny"} 
              size={24} 
              color={theme.colors.primary} 
            />
          </View>
          <Text style={[styles.menuItemText, { color: theme.colors.text, flex: 1 }]}>
            Dark Mode
          </Text>
          <Switch
            trackColor={{ false: '#D3D3D3', true: theme.colors.brandLight }}
            thumbColor={isDarkMode ? theme.colors.primary : '#f4f3f4'}
            ios_backgroundColor="#D3D3D3"
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>

      </ScrollView>

      {/* Footer Section */}
      <View style={[styles.footerContainer, { borderTopColor: theme.colors.border }]}>
        <Text style={[styles.footerText, { color: theme.colors.subtext }]}>Shadibiha.Com</Text>
        <Text style={[styles.footerSubText, { color: theme.colors.subtext }]}>Version 0.1</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.75,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 25,
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  profileTextContainer: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
  },
  profileRole: {
    fontSize: 12,
    marginTop: 2,
  },
  menuContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {
    width: 30,
    alignItems: 'flex-start',
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
  footerSubText: {
    fontSize: 10,
    marginTop: 2,
  },
});