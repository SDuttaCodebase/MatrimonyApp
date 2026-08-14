import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

export default function HamburgerMenu({ navigation }) {
  // Set default active state
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
    
    // Check if the route exists before navigating to prevent crashes
    if (item.id) {
      navigation.navigate(item.id);
    }
  };

  const renderIcon = (item, isSelected) => {
    const color = isSelected ? '#D32F2F' : '#333333'; // Red if active, Dark Gray if inactive
    if (item.library === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={isSelected && item.title === 'Notification' ? 'bell' : item.icon} size={24} color={color} />;
    }
    return <Icon name={item.icon} size={24} color={color} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header Section */}
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?img=1' }} // Replace with actual user image
          style={styles.profileImage} 
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>Lorem Ipsum</Text>
          <Text style={styles.profileRole}>UI/UX Designer</Text>
        </View>
      </View>

      {/* Menu Items List */}
      <View style={styles.menuContainer}>
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
              <Text style={[styles.menuItemText, isSelected && styles.activeMenuItemText]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>About Application</Text>
        <Text style={styles.footerSubText}>Version 0.1</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: width * 0.75, // Takes up 75% of screen width like a standard drawer
  },
  // Profile Header Styles
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
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
    color: '#000000',
  },
  profileRole: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  
  // Menu Item Styles
  menuContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  iconContainer: {
    width: 30,
    alignItems: 'flex-start',
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
    marginLeft: 12,
  },
  activeMenuItemText: {
    color: '#D32F2F', // The red color for active state
    fontWeight: '600',
  },

  // Footer Styles
  footerContainer: {
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  footerSubText: {
    fontSize: 10,
    color: '#999999',
    marginTop: 4,
  },
});