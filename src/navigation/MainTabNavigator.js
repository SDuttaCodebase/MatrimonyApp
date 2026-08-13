// src/navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native';
import useThemeStore from '../store/useThemeStore';

// Import our screens and components
import HamburgerMenu from '../components/HamburgerMenu';
import HomeScreen from '../screens/Home/HomeScreen';
import NetworkScreen from '../screens/Network/NetworkScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 1. We move your existing Tab Navigator into its own functional component
function BottomTabs() {
  const { theme } = useThemeStore();

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

// 2. We export the Drawer as the main navigator, injecting your custom HamburgerMenu,
// and setting the BottomTabs as the primary screen inside the drawer.
export default function MainTabNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <HamburgerMenu {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
}
