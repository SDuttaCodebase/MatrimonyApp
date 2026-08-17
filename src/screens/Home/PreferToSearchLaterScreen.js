import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function MarriageFixedSuccessScreen({ navigation }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SettingsScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.successText, { color: theme.colors.primary }]}>
          Congratulations ! We Will Wait{'\n'}Adding Best Matches Till you Return.
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