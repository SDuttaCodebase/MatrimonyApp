// src/screens/Auth/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function SplashScreen({ navigation }) {
  const { theme } = useThemeStore();
  
  // Create shared animated values for opacity and scale
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current; // Starts slightly smaller (85%)

  useEffect(() => {
    // Run both animations simultaneously for a smooth entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1, // Springs smoothly to full 100% size
        friction: 4, // Controls the bounce effect (lower = more bouncy, higher = smoother)
        useNativeDriver: true,
      }),
    ]).start();

    // Automatically navigate to Onboarding after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.brandDarkest }]}>
      {/* Decorative background circles */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      {/* Animated View applying both opacity fade and smooth scale transform */}
      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ scale: scaleAnim }] 
        }}
      >
        <Text style={styles.logoText}>Shadibaha</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circleOne: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: -50,
    left: -50,
  },
  circleTwo: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    top: 50,
    right: -100,
  },
  logoText: {
    fontFamily: 'SansitaRegular',
    fontSize: 42,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});