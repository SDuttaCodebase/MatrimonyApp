import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useThemeStore from '../../store/useThemeStore';

export default function PrivacySuccessScreen({ navigation, route }) {
  const { theme } = useThemeStore();
  const { message } = route.params || { message: 'Privacy settings updated.' };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SettingsScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer}>
        
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.primary }]}>
          <Icon name="checkmark-circle" size={90} color={theme.colors.primary} />
        </View>

        <Text style={[styles.successText, { color: theme.colors.primary }]}>
          {message}
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
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 30,
    elevation: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderRadius: 50,
  },
  successText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
  },
});