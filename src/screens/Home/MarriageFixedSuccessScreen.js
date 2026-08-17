import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function MarriageFixedSuccessScreen({ navigation }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Start a 3-second (3000 milliseconds) timer as soon as the screen loads
    const timer = setTimeout(() => {
      // Navigate back to the Settings page as requested
      navigation.navigate('SettingsScreen');
    }, 3000);

    // Cleanup the timer if the user manually leaves the screen early
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer}>
        
        <Text style={[styles.successText, { color: theme.colors.primary }]}>
          Congratulations ! We Are Happy{'\n'}That You Found Your Life Partner.
        </Text>

        <Image 
          source={{ uri: 'https://img.icons8.com/color/200/000000/cloud.png' }} 
          style={styles.cloudImage}
          resizeMode="contain"
        />

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
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 60,
  },
  cloudImage: {
    width: 250,
    height: 150,
    opacity: 0.8,
  }
});