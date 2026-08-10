// src/screens/Auth/VerificationPendingScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function VerificationPendingScreen({ navigation }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Simulate verification processing delay (e.g., 3 seconds)
    const timer = setTimeout(() => {
      navigation.replace('RegistrationSuccess');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.titleText, { color: theme.colors.brandDarkest }]}>
          Profile Picture Verification
        </Text>
        <Text style={[styles.titleText, { color: theme.colors.brandDarkest, marginBottom: 40 }]}>
          Under Process
        </Text>

        {/* Loading Spinner */}
        <ActivityIndicator size="large" color={theme.colors.primary} />
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
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
  },
});