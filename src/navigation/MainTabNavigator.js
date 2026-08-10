// src/navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import useThemeStore from '../store/useThemeStore';

// Import our screens
import HomeScreen from '../screens/Home/HomeScreen';
import NetworkScreen from '../screens/Network/NetworkScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { theme } = useThemeStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // We already built a custom TopHeader in HomeScreen!
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
        tabBarShowLabel: false, // Hides the text under the icons to match your design
        
        // This function dynamically renders the correct icon for each tab
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'Home') icon = '🏠';
          else if (route.name === 'Network') icon = '👥';
          else if (route.name === 'Chat') icon = '💬';
          else if (route.name === 'Profile') icon = '👤';

          return <Text style={{ fontSize: 24, color: color }}>{icon}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Network" component={NetworkScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}