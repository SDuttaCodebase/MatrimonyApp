import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function AccountDeletedSuccessScreen({ navigation }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // 3-second timer before redirecting to Login
    const timer = setTimeout(() => {
      // Resets stack and goes straight to Login screen so user cannot go back
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.successText, { color: theme.colors.primary }]}>
          Your Account Has Been{'\n'}Successfully Deleted.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  successText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
  },
});