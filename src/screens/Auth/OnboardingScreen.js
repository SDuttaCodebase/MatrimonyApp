// src/screens/Auth/OnboardingScreen.js
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

const { width } = Dimensions.get('window');

// Data for our 3 onboarding pages based on your designs
const slides = [
  {
    id: '1',
    title: 'Find !',
    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia',
  },
  {
    id: '2',
    title: 'Engage !',
    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia',
  },
  {
    id: '3',
    title: 'Forever !',
    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia',
  },
];

export default function OnboardingScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Track scroll position to update active pagination dot
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  // Handle "Next" button press to scroll forward or finish
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      // On the final slide, move to Login screen
      navigation.replace('Login');
    }
  };

  // Handle "Skip" button press
  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      
      {/* Horizontal Paging ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.slider}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slidePage}>
            
            {/* Top Curved Image Container */}
            <View style={styles.imageContainer}>
              <View style={[styles.imagePlaceholder, { backgroundColor: '#888' }]} />
            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
              <Text style={[styles.heading, { color: theme.colors.brandDarkest }]}>
                {slide.title}
              </Text>
              <Text style={[styles.description, { color: theme.colors.subtext }]}>
                {slide.description}
              </Text>
            </View>

          </View>
        ))}
      </ScrollView>

      {/* Fixed Bottom Footer (Dots & Controls) */}
      <View style={styles.footerContainer}>
        {/* Dynamic Pagination Dots */}
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: theme.colors.border },
                currentIndex === index && [
                  styles.activeDot, 
                  { backgroundColor: theme.colors.primary }
                ],
              ]}
            />
          ))}
        </View>

        {/* Bottom Actions Row */}
        <View style={styles.footerRow}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[styles.skipText, { color: theme.colors.primary }]}>
              {currentIndex === slides.length - 1 ? '' : 'Skip'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
            <Text style={[styles.nextText, { color: theme.colors.primary }]}>
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    flex: 1,
  },
  slidePage: {
    width: width,
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '55%',
    overflow: 'hidden',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
  },
  nextText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});