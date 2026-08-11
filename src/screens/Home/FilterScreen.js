// src/screens/Home/FilterScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  PanResponder,
  Dimensions,
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

const FILTER_DATA = {
  'Religion': ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jains', 'Other Religions'],
  'Community': ['Bengali', 'Punjabi', 'Marathi', 'Gujrati', 'Rajasthani', 'Lorem Ipsum'],
  'Sub - Community': ['Kashyap', 'Baidya', 'Brahmin', 'Buddho', 'Lorem Ipsum'],
  'Caste': ['General', 'Obc', 'S.C', 'S.T'],
  'Country Living In': [
    'India', 'U.S.A', 'U.K', 'Austrailia', 'Japan', 'China', 
    'Africa', 'South Africa', 'North America', 'Lorem Ipsum', 'Lorem Ipsim'
  ],
  'State Living In': [
    'West Bengal', 'Orissa', 'Sikkim', 'Maharastra', 'Karnataka', 
    'Gujrat', 'Rajasthan', 'Himachal Pradesh', 'Kashmir', 'Lorem Ipsum'
  ],
  'City Living In': [
    'Kolkata', 'Barrackpore', 'Jadavpore', 'Maniktala', 'Shyambazar', 
    'Lorem Ipsum 1', 'Lorem Ipsum 2', 'Lorem Ipsum 3', 'Lorem Ipsum 4'
  ],
  'Marital Status': [
    'Single & Never Married', 'Divorced', 'Awaiting Divorced', 'Widowed', 'Anulled'
  ],
  'Diet': ['Non - Veg', 'Veg', 'Eggetarian', 'Vegan'],
  'Age': [], 
  'Height': [], 
  'Complexion': ['Fair', 'Medium', 'Dark'],
  'Family Type': ['Joint Family', 'Nuclear Family'],
  'Annual Income': [
    '50 - 2 LPA', 
    '03 - 5 LPA', 
    '06 - 8 LPA', 
    '09 - 11 LPA', 
    '10 - 12 LPA', 
    '13 - 14 LPA', 
    '15 - 16 LPA', 
    '17 - 18 LPA', 
    '19 - 20 LPA'
  ],
};

const CATEGORIES = Object.keys(FILTER_DATA);

const COMPLEXION_EMOJIS = {
  'Fair': '👨🏻',
  'Medium': '👨🏽',
  'Dark': '👨🏿',
};

export default function FilterScreen({ navigation }) {
  const { theme } = useThemeStore();

  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [selectedFilters, setSelectedFilters] = useState({});
  
  // Slider states
  const [ageValue, setAgeValue] = useState(28);
  const [heightValue, setHeightValue] = useState(5.8);

  // Track the layout width of the slider track dynamically for accurate dragging
  const trackWidthRef = useRef(200);

  // PanResponder for Interactive Dragging
  const createSliderResponder = (min, max, currentValue, setValue, step) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Calculate raw position based on touch movement relative to track width
        const activeTrackWidth = trackWidthRef.current || 200;
        let newX = gestureState.dx; 
        
        // Let's approximate based on absolute touch location if available, 
        // or shift relative to start. Here we map dx to percentage change:
        const currentPercentage = (currentValue - min) / (max - min);
        const deltaPercentage = gestureState.dx / activeTrackWidth;
        let targetPercentage = currentPercentage + deltaPercentage;

        // Clamp percentage between 0 and 1
        targetPercentage = Math.max(0, Math.min(1, targetPercentage));

        // Calculate new value matching step constraints
        let rawValue = min + targetPercentage * (max - min);
        let steppedValue = Math.round(rawValue / step) * step;
        
        // Fix floating point precision issues for height
        if (step < 1) {
          steppedValue = parseFloat(steppedValue.toFixed(1));
        }

        setValue(steppedValue);
      },
    });
  };

  const agePanResponder = createSliderResponder(18, 60, ageValue, setAgeValue, 1);
  const heightPanResponder = createSliderResponder(4.0, 7.0, heightValue, setHeightValue, 0.1);

  const toggleOption = (category, option) => {
    setSelectedFilters((prev) => {
      const categorySelections = prev[category] || [];
      if (categorySelections.includes(option)) {
        return {
          ...prev,
          [category]: categorySelections.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          [category]: [...categorySelections, option],
        };
      }
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({});
    setAgeValue(18);
    setHeightValue(4.0);
  };

  // Render Fully Interactive Slider Component
  const renderInteractiveSlider = (title, min, max, unit, currentValue, panResponder) => {
    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderTitle}>{title}</Text>
        <View style={styles.sliderBounds}>
          <Text style={styles.boundText}>From {min} {unit}</Text>
          <Text style={styles.boundText}>To {max} {unit}</Text>
        </View>
        
        {/* Interactive Track Area */}
        <View 
          style={styles.trackContainer}
          onLayout={(event) => {
            trackWidthRef.current = event.nativeEvent.layout.width;
          }}
          {...panResponder.panHandlers}
        >
          <View style={styles.trackBackground} />
          <View style={[styles.trackActive, { width: `${percentage}%`, backgroundColor: theme.colors.primary }]} />
          <View style={[styles.sliderThumb, { left: `${percentage}%`, backgroundColor: theme.colors.primary }]} />
        </View>
        
        <View style={{ width: '100%', alignItems: 'flex-start', marginTop: 10 }}>
          <Text 
            style={[
              styles.sliderValueText, 
              { left: `${Math.max(0, Math.min(85, percentage - 5))}%`, color: theme.colors.primary }
            ]}
          >
            {currentValue} {unit}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      
      {/* Header Section */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
        </View>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={[styles.clearText, { color: theme.colors.primary }]}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Split-Screen Content */}
      <View style={styles.contentBody}>
        
        {/* Left Sidebar (Categories) */}
        <View style={styles.leftSidebar}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.leftScrollContent}
            bounces={true}
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  style={[
                    styles.categoryTab,
                    isActive ? styles.activeTab : styles.inactiveTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      { color: isActive ? theme.colors.primary : '#555555' },
                      isActive && { fontWeight: 'bold' },
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Right Panel (Options) */}
        <View style={styles.rightPanel}>
          <Text style={[styles.rightPanelTitle, { color: theme.colors.primary }]}>
            Choose Your Preferences
          </Text>
          
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.rightScrollContent}
            bounces={true}
          >
            {activeCategory === 'Age' ? (
              renderInteractiveSlider('Age', 18, 60, 'Years', ageValue, agePanResponder)
            ) : activeCategory === 'Height' ? (
              renderInteractiveSlider('Height', 4.0, 7.0, 'Ft', heightValue, heightPanResponder)
            ) : activeCategory === 'Complexion' ? (
              <View style={styles.complexionContainer}>
                {FILTER_DATA['Complexion'].map((option) => {
                  const isSelected = (selectedFilters[activeCategory] || []).includes(option);
                  return (
                    <TouchableOpacity
                      key={option}
                      activeOpacity={0.8}
                      onPress={() => toggleOption(activeCategory, option)}
                      style={[
                        styles.complexionCard,
                        isSelected ? { backgroundColor: '#F9EAEA', borderColor: theme.colors.primary } : { backgroundColor: '#F0F0F0', borderColor: 'transparent' }
                      ]}
                    >
                      <Text style={styles.complexionEmoji}>{COMPLEXION_EMOJIS[option]}</Text>
                      <Text style={[styles.complexionText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              FILTER_DATA[activeCategory].map((option) => {
                const isSelected = (selectedFilters[activeCategory] || []).includes(option);
                return (
                  <TouchableOpacity
                    key={option}
                    style={styles.optionRow}
                    activeOpacity={0.7}
                    onPress={() => toggleOption(activeCategory, option)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && { borderColor: '#4CAF50', backgroundColor: '#4CAF50' }, 
                      ]}
                    >
                      {isSelected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                );
              })
            )}

          </ScrollView>
        </View>
      </View>

      {/* Footer Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerBtnLeft} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        
        <View style={styles.footerDivider} />
        
        <TouchableOpacity 
          style={styles.footerBtnRight}
          onPress={() => {
            console.log("Applying filters: ", { ...selectedFilters, Age: ageValue, Height: heightValue });
            navigation.goBack(); 
          }}
        >
          <Text style={[styles.applyText, { color: theme.colors.primary }]}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backButton: { paddingRight: 15 },
  backText: { fontSize: 22, color: '#333' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  clearText: { fontSize: 14, fontWeight: 'bold' },
  contentBody: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden', 
  },
  leftSidebar: { width: '40%', height: '100%', backgroundColor: '#F5F6F8' },
  leftScrollContent: { paddingBottom: 40 },
  categoryTab: { paddingVertical: 18, paddingHorizontal: 15 },
  activeTab: { backgroundColor: '#FFFFFF' },
  inactiveTab: { backgroundColor: 'transparent' },
  categoryText: { fontSize: 13 },
  rightPanel: { width: '60%', height: '100%', backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 15 },
  rightScrollContent: { paddingBottom: 40 },
  rightPanelTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 20 },
  
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  checkbox: {
    width: 20, height: 20, borderWidth: 1.5, borderColor: '#CCCCCC',
    borderRadius: 3, marginRight: 12, justifyContent: 'center', alignItems: 'center',
  },
  checkmark: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  optionText: { fontSize: 14, color: '#333333' },
  
  sliderWrapper: { marginTop: 10, width: '100%', paddingRight: 15 },
  sliderTitle: { fontSize: 14, color: '#333', marginBottom: 15 },
  sliderBounds: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  boundText: { fontSize: 10, color: '#666', fontWeight: 'bold' },
  trackContainer: { height: 30, justifyContent: 'center', position: 'relative' },
  trackBackground: { width: '100%', height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, position: 'absolute' },
  trackActive: { height: 4, borderRadius: 2, position: 'absolute', zIndex: 1 },
  sliderThumb: { width: 22, height: 22, borderRadius: 11, position: 'absolute', zIndex: 2, top: 4, transform: [{ translateX: -11 }], shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 3 },
  sliderValueText: { fontSize: 12, fontWeight: 'bold', position: 'absolute' },

  complexionContainer: { width: '100%', alignItems: 'center' },
  complexionCard: {
    width: '85%',
    aspectRatio: 1.3,
    borderWidth: 1.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  complexionEmoji: { fontSize: 32, marginBottom: 8 },
  complexionText: { fontSize: 14, color: '#555' },

  footer: { flexDirection: 'row', height: 60, borderTopWidth: 1, borderTopColor: '#F0F0F0', backgroundColor: '#FFFFFF' },
  footerBtnLeft: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footerBtnRight: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footerDivider: { width: 1, height: '60%', backgroundColor: '#E0E0E0', alignSelf: 'center' },
  closeText: { fontSize: 16, color: '#666666', fontWeight: '600' },
  applyText: { fontSize: 16, fontWeight: 'bold' },
});