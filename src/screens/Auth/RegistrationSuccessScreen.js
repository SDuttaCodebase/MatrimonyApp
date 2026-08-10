// src/screens/Auth/RegistrationSuccessScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function RegistrationSuccessScreen({ navigation }) {
  const { theme } = useThemeStore();

  const handleGetStarted = () => {
    // Drop the user directly into the Main App Dashboard
    navigation.replace('MainApp');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.contentContainer}>
        <Text style={styles.emojiIcon}>🎉</Text>
        
        <Text style={[styles.congratsText, { color: theme.colors.brandDarkest }]}>
          Congratulations . Now
        </Text>
        <Text style={[styles.congratsText, { color: theme.colors.brandDarkest, marginBottom: 40 }]}>
          You’re Ready To Go
        </Text>

        {/* Action Button to Enter Dashboard */}
        <TouchableOpacity 
          style={[styles.startButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleGetStarted}
        >
          <Text style={styles.startButtonText}>Go To Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    width: '100%',
  },
  emojiIcon: {
    fontSize: 50,
    marginBottom: 20,
  },
  congratsText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
  },
  startButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});