// src/screens/Home/components/FeaturedProfileCard.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import useThemeStore from '../../../store/useThemeStore';

const { width: windowWidth } = Dimensions.get('window');
// Let's make the card take up a clean width, e.g., screen width minus side margins (30 total)
const CARD_WIDTH = windowWidth - 30;

const DEMO_PROFILES = [
  {
    idCode: "MAW1230",
    name: "Rahul Roy",
    age: 28,
    height: "5ft 9in - 157cm",
    religion: "Hindu",
    community: "Bengali Kashyap",
    location: "Kolkata, West Bengal, India",
  },
  {
    idCode: "MAW1231",
    name: "Ananya Sharma",
    age: 26,
    height: "5ft 4in - 162cm",
    religion: "Hindu",
    community: "Punjabi Brahmin",
    location: "Delhi, India",
  },
  {
    idCode: "MAW1232",
    name: "Vikram Chatterjee",
    age: 30,
    height: "6ft 0in - 183cm",
    religion: "Hindu",
    community: "Bengali Rarh",
    location: "Mumbai, Maharashtra, India",
  },
];

export default function FeaturedProfileCard() {
  const { theme } = useThemeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollViewRef = useRef(null);

  // Auto-scroll effect every 3 seconds unless paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % DEMO_PROFILES.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * windowWidth, // Snap using exact full windowWidth offset
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  // Handle Manual Left Arrow Press
  const handlePrev = () => {
    setIsPaused(true);
    const prevIndex = currentIndex === 0 ? DEMO_PROFILES.length - 1 : currentIndex - 1;
    scrollViewRef.current?.scrollTo({
      x: prevIndex * windowWidth,
      animated: true,
    });
    setCurrentIndex(prevIndex);
  };

  // Handle Manual Right Arrow Press
  const handleNext = () => {
    setIsPaused(true);
    const nextIndex = (currentIndex + 1) % DEMO_PROFILES.length;
    scrollViewRef.current?.scrollTo({
      x: nextIndex * windowWidth,
      animated: true,
    });
    setCurrentIndex(nextIndex);
  };

  // Track scroll position manually
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / windowWidth);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        snapToInterval={windowWidth} // Forces crisp card-by-card snapping alignment
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // Pause auto-scroll when user touches down
        onTouchStart={() => setIsPaused(true)}
        // Resume auto-scroll when user lifts their finger
        onTouchEnd={() => setIsPaused(false)}
      >
        {DEMO_PROFILES.map((profile) => (
          <View key={profile.idCode} style={[styles.cardContainer, { width: CARD_WIDTH }]}>
            <View style={[styles.imagePlaceholder, { backgroundColor: '#B0B0B0' }]}>
              
              {/* Top Left: ID Code Badge */}
              <View style={styles.idBadge}>
                <Text style={styles.idText}>ID Code - {profile.idCode}</Text>
              </View>

              {/* Right Side: Action Icons */}
              <View style={styles.actionColumn}>
                <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>⋮</Text></TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>🔗</Text></TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>🤍</Text></TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>🖼</Text></TouchableOpacity>
              </View>

              {/* Bottom Details Overlay */}
              <View style={styles.bottomOverlay}>
                <Text style={styles.nameRow}>
                  <Text style={styles.nameText}>{profile.name}</Text> | {profile.age}yrs | {profile.height}
                </Text>
                <Text style={styles.detailText}>{profile.religion}, {profile.community}</Text>
                <Text style={styles.detailText}>📍 {profile.location}</Text>
                
                {/* Action Buttons Row with Left & Right Arrow Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.arrowBtn} onPress={handlePrev}>
                    <Text style={styles.arrowText}>←</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.btnText, { color: theme.colors.primary }]}>Send Request</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.btnText, { color: theme.colors.primary }]}>Message</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.arrowBtn} onPress={handleNext}>
                    <Text style={styles.arrowText}>→</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 20,
  },
  cardContainer: {
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  imagePlaceholder: {
    width: '100%',
    height: 400,
    justifyContent: 'space-between',
  },
  idBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  idText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionColumn: {
    position: 'absolute',
    top: 15,
    right: 10,
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 15,
  },
  nameRow: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    color: '#E0E0E0',
    fontSize: 12,
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  arrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});