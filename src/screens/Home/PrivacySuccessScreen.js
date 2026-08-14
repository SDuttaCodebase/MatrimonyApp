import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PrivacySuccessScreen({ navigation, route }) {
  // Extract the dynamic message passed from the previous screens, with a fallback
  const { message } = route.params || { message: 'Privacy settings updated.' };

  useEffect(() => {
    // 3-second timer before redirecting to the Settings page
    const timer = setTimeout(() => {
      navigation.navigate('SettingsScreen');
    }, 3000);

    // Cleanup timer if the component unmounts early
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Icon name="checkmark-circle" size={90} color="#C2183D" />
        </View>

        {/* Dynamic Success Text */}
        <Text style={styles.successText}>
          {message}
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean white background for success states
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
    shadowColor: '#C2183D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  successText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B1A32',
    textAlign: 'center',
    lineHeight: 30,
  },
});