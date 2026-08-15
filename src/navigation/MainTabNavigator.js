// src/navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useThemeStore from '../store/useThemeStore';

import HamburgerMenu from '../components/HamburgerMenu';
import HomeScreen from '../screens/Home/HomeScreen';
import NetworkScreen from '../screens/Network/NetworkScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabIconRenderer = ({ route, color, networkBadgeCount, chatBadgeCount }) => {
  let iconName;
  let badgeCount = 0;
  let isFontAwesome = false;

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Network') {
    iconName = 'users';
    isFontAwesome = true;
    badgeCount = networkBadgeCount;
  } else if (route.name === 'Chat') {
    iconName = 'comment-dots';
    isFontAwesome = true;
    badgeCount = chatBadgeCount;
  } else if (route.name === 'Profile') {
    iconName = 'user-circle';
    isFontAwesome = true;
  }

  return (
    <View style={styles.iconWrapper}>
      {isFontAwesome ? (
        <FontAwesome5 name={iconName} size={22} color={color} />
      ) : (
        <MaterialCommunityIcons name={iconName} size={26} color={color} />
      )}

      {badgeCount > 0 && (
        <View style={styles.badgeContainer}>
          <MaterialCommunityIcons name="heart" size={20} color="#FF1493" style={styles.heartIcon} />
          <Text style={styles.badgeText}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
};

function BottomTabs() {
  const { theme } = useThemeStore();
  const networkBadgeCount = 5; 
  const chatBadgeCount = 4;    

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.subtext,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => (
          <TabIconRenderer 
            route={route} 
            color={color} 
            networkBadgeCount={networkBadgeCount} 
            chatBadgeCount={chatBadgeCount} 
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Network" component={NetworkScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainTabNavigator() {
  const { theme } = useThemeStore();

  return (
    <Drawer.Navigator
      drawerContent={props => <HamburgerMenu {...props} />}
      screenOptions={{ 
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.surface, // Fixes the white side border edge!
          width: '75%',
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -6,
    right: -16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 22,
    height: 22,
  },
  heartIcon: {
    position: 'absolute',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    zIndex: 1,
  },
});