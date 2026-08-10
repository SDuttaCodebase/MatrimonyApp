// src/screens/Home/FullScreenImageViewer.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  Text, 
  SafeAreaView, 
  Image 
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// 3 Demo images for the uploaded photo gallery carousel
const DEMO_IMAGES = [
  { id: '1', uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop' },
  { id: '2', uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop' },
  { id: '3', uri: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop' },
];

export default function FullScreenImageViewer({ navigation }) {
  const { theme } = useThemeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollViewRef = useRef(null);

  // Auto-scroll every 3 seconds unless paused by touch
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % DEMO_IMAGES.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * windowWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  // Track manual swipe positioning
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / windowWidth);
    if (index !== currentIndex && index >= 0 && index < DEMO_IMAGES.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Navigation Back Arrow Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backArrowText}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Full Screen Horizontal Image Carousel */}
      <View style={styles.carouselWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          snapToInterval={windowWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {DEMO_IMAGES.map((img) => (
            <View key={img.id} style={[styles.imageContainer, { width: windowWidth }]}>
              <Image source={{ uri: img.uri }} style={styles.fullImage} resizeMode="contain" />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Pagination Dots */}
      <View style={styles.paginationContainer}>
        {DEMO_IMAGES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark immersive theme
  },
  headerBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrowText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  carouselWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  fullImage: {
    width: '100%',
    height: '80%',
    borderRadius: 12,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#555555',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});