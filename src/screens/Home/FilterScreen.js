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
import Icon from 'react-native-vector-icons/Ionicons';
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
  
  const [ageValue, setAgeValue] = useState(28);
  const [heightValue, setHeightValue] = useState(5.8);

  const trackWidthRef = useRef(200);

  const createSliderResponder = (min, max, currentValue, setValue, step) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const activeTrackWidth = trackWidthRef.current || 200;
        
        const currentPercentage = (currentValue - min) / (max - min);
        const deltaPercentage = gestureState.dx / activeTrackWidth;
        let targetPercentage = currentPercentage + deltaPercentage;

        targetPercentage = Math.max(0, Math.min(1, targetPercentage));

        let rawValue = min + targetPercentage * (max - min);
        let steppedValue = Math.round(rawValue / step) * step;
        
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

  const renderInteractiveSlider = (title, min, max, unit, currentValue, panResponder) => {
    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
      <View style={styles.sliderWrapper}>
        <Text style={[styles.sliderTitle, { color: theme.colors.text }]}>{title}</Text>
        <View style={styles.sliderBounds}>
          <Text style={[styles.boundText, { color: theme.colors.subtext }]}>From {min} {unit}</Text>
          <Text style={[styles.boundText, { color: theme.colors.subtext }]}>To {max} {unit}</Text>
        </View>
        
        <View 
          style={styles.trackContainer}
          onLayout={(event) => {
            trackWidthRef.current = event.nativeEvent.layout.width;
          }}
          {...panResponder.panHandlers}
        >
          <View style={[styles.trackBackground, { backgroundColor: theme.colors.border }]} />
          <View style={[styles.trackActive, { width: `${percentage}%`, backgroundColor: theme.colors.primary }]} />
          <View style={[styles.sliderThumb, { left: `${percentage}%`, backgroundColor: theme.colors.primary }]} />
        </View>
        
        <View style={styles.sliderValueWrapper}>
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      <View style={[styles.headerBar, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Filters</Text>
        </View>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={[styles.clearText, { color: theme.colors.primary }]}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentBody}>
        
        <View style={[styles.leftSidebar, { backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F6F8' }]}>
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
                    isActive ? { backgroundColor: theme.colors.background } : styles.inactiveTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      { color: isActive ? theme.colors.primary : theme.colors.subtext },
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

        <View style={[styles.rightPanel, { backgroundColor: theme.colors.background }]}>
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
                        isSelected 
                          ? { backgroundColor: theme.mode === 'dark' ? '#3A2A30' : '#F9EAEA', borderColor: theme.colors.primary } 
                          : { backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F0F0F0', borderColor: 'transparent' }
                      ]}
                    >
                      <Text style={styles.complexionEmoji}>{COMPLEXION_EMOJIS[option]}</Text>
                      <Text style={[styles.complexionText, { color: theme.colors.text }, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>
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
                        { borderColor: isSelected ? '#4CAF50' : theme.colors.border },
                        isSelected && { backgroundColor: '#4CAF50' }, 
                      ]}
                    >
                      {isSelected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={[styles.optionText, { color: theme.colors.text }]}>{option}</Text>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>

      <View style={[styles.footer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
        <TouchableOpacity 
          style={styles.footerBtnLeft} 
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.closeText, { color: theme.colors.text }]}>Close</Text>
        </TouchableOpacity>
        
        <View style={[styles.footerDivider, { backgroundColor: theme.colors.border }]} />
        
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
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backButton: { paddingRight: 15 },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },
  clearText: { fontSize: 14, fontWeight: 'bold' },
  contentBody: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden', 
  },
  leftSidebar: { width: '40%', height: '100%' },
  leftScrollContent: { paddingBottom: 40 },
  categoryTab: { paddingVertical: 18, paddingHorizontal: 15 },
  inactiveTab: { backgroundColor: 'transparent' },
  categoryText: { fontSize: 13 },
  rightPanel: { width: '60%', height: '100%', paddingHorizontal: 20, paddingTop: 15 },
  rightScrollContent: { paddingBottom: 40 },
  rightPanelTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 20 },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  checkbox: {
    width: 20, height: 20, borderWidth: 1.5,
    borderRadius: 3, marginRight: 12, justifyContent: 'center', alignItems: 'center',
  },
  checkmark: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  optionText: { fontSize: 14 },
  sliderWrapper: { marginTop: 10, width: '100%', paddingRight: 15 },
  sliderTitle: { fontSize: 14, marginBottom: 15 },
  sliderBounds: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  boundText: { fontSize: 10, fontWeight: 'bold' },
  trackContainer: { height: 30, justifyContent: 'center', position: 'relative' },
  trackBackground: { width: '100%', height: 4, borderRadius: 2, position: 'absolute' },
  trackActive: { height: 4, borderRadius: 2, position: 'absolute', zIndex: 1 },
  sliderThumb: { width: 22, height: 22, borderRadius: 11, position: 'absolute', zIndex: 2, top: 4, transform: [{ translateX: -11 }], shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 3 },
  sliderValueWrapper: { width: '100%', alignItems: 'flex-start', marginTop: 10 },
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
  complexionText: { fontSize: 14 },
  footer: { flexDirection: 'row', height: 60, borderTopWidth: 1 },
  footerBtnLeft: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footerBtnRight: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footerDivider: { width: 1, height: '60%', alignSelf: 'center' },
  closeText: { fontSize: 16, fontWeight: '600' },
  applyText: { fontSize: 16, fontWeight: 'bold' },
});