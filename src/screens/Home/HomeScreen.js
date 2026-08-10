// src/screens/Home/HomeScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import useThemeStore from '../../store/useThemeStore';
import TopHeader from './components/TopHeader';
import ProfileCompletion from './components/ProfileCompletion';
import FeaturedProfileCard from './components/FeaturedProfileCard';
import MatchesList from './components/MatchesList';
import HundredPercentMatchesBanner from './components/HundredPercentMatchesBanner';

export default function HomeScreen() {
  const { theme, isDarkMode } = useThemeStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background} 
      />
      
      <TopHeader />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <ProfileCompletion percentage={40} />
        
        <FeaturedProfileCard />
        
        {/* 2. Add the New Matches Section */}
        <MatchesList 
          title="12 New Matches" 
          subtitle="Your New Recent Matches" 
        />

        <HundredPercentMatchesBanner />

        {/* 3. Add the Recently Viewed Section */}
        <MatchesList 
          title="Recently Viewed Profile" 
          subtitle="New Members Who Recently Viewed Your Profile" 
        />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40, // Added a bit more padding so the last list isn't cut off
  },
});