import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function MarriageFixedSuccessScreen({ navigation }) {
  
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
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        
        {/* Success Text */}
        <Text style={styles.successText}>
          Congratulations ! We Will Wait{'\n'}Adding Best Matches Till you Return.
        </Text>

        {/* Cloud Image Placeholder */}
        {/* Replace the URI with your local image require('./path/to/cloud.png') when you have the asset */}
        <Image 
          source={{ uri: 'https://img.icons8.com/color/200/000000/cloud.png' }} // Generic cloud placeholder
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
    backgroundColor: '#FFFFFF', // Clean white background
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Centers everything vertically
    alignItems: 'center',     // Centers everything horizontally
    paddingHorizontal: 30,
  },
  successText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B1A32', // Maroon color from your design
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 60, // Pushes the cloud image down slightly
  },
  cloudImage: {
    width: 250,
    height: 150,
    opacity: 0.8, // Slightly faded to match the soft look of your design
  }
});