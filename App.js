// App.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainTabNavigator from './src/navigation/MainTabNavigator';

export default function App() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});