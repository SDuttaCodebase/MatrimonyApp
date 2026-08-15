// src/screens/Home/components/HundredPercentMatchesBanner.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 1. Imported useNavigation
import useThemeStore from '../../../store/useThemeStore';

const { width: windowWidth } = Dimensions.get('window');
const BANNER_WIDTH = windowWidth - 30; // Matches side margins

const MATCH_BANNERS = [
  {
    id: '1',
    title: '100% Matches',
    subtitle: 'Amet Minim Mollit Non Deserunt Ullamco',
  },
  {
    id: '2',
    title: 'Verified Soulmates',
    subtitle: 'Handpicked Compatibility Just For You',
  },
  {
    id: '3',
    title: 'Exclusive Connections',
    subtitle: 'Discover Profiles Tailored To Your Preferences',
  },
];

export default function HundredPercentMatchesBanner() {
  const { theme } = useThemeStore();
  const navigation = useNavigation(); // 2. Initialized navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Continuous auto-scroll effect every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % MATCH_BANNERS.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * windowWidth, // Aligns with full window width scrolling offset
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Track manual swipe positioning
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / windowWidth);
    if (index !== currentIndex && index >= 0 && index < MATCH_BANNERS.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {/* Horizontal Continuous Auto-Scrolling Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        snapToInterval={windowWidth} // Forces crisp full-card replacement snapping
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {MATCH_BANNERS.map((banner) => (
          <TouchableOpacity 
            key={banner.id} 
            activeOpacity={0.9}
            onPress={() => navigation.navigate('VerifiedSoulmates')}
            style={[styles.cardContainer, { width: BANNER_WIDTH }]}
          >
            <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.brandDarkest }]}>
              <View style={styles.overlay}>
                <Text style={styles.bannerTitle}>{banner.title}</Text>
                <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
              </View>
            </View>
          </TouchableOpacity>

        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {MATCH_BANNERS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#CCCCCC' },
              currentIndex === index && [
                styles.activeDot,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  cardContainer: {
    marginHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: '100%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: '#E0E0E0',
    fontSize: 12,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
  },
});