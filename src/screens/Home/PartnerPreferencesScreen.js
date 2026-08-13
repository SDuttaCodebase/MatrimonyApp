import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  PanResponder
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Reusable Custom Radio Button
const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
      {selected && <View style={styles.innerCircle} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

// Reusable Custom Dropdown Component
const CustomDropdown = ({ label, value, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity 
        style={styles.dropdownHeader} 
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownHeaderText}>{value}</Text>
        <MaterialIcons name={isOpen ? "arrow-drop-up" : "arrow-drop-down"} size={24} color="#333" />
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.dropdownList}>
          {options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.dropdownListItem}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={styles.dropdownListText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default function PartnerPreferencesScreen({ navigation }) {
  // Slider States
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(6.0);

  // Track width reference for the gesture calculations
  const trackWidthRef = useRef(200);

  // Radio Button State
  const [maritalStatus, setMaritalStatus] = useState('Never Married');
  const maritalOptions = ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorced', 'Annulled'];

  // Dropdown States
  const [religion, setReligion] = useState('Hindu');
  const [community, setCommunity] = useState('Bengali');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('West Bengal');
  const [city, setCity] = useState('Kolkata');

  // Reusable PanResponder factory for interactive sliders
  const createSliderResponder = (min, max, currentValue, setValue, step) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const activeTrackWidth = trackWidthRef.current || 200;
        const currentPercentage = (currentValue - min) / (max - min);
        const deltaPercentage = gestureState.dx / activeTrackWidth;
        let targetPercentage = currentPercentage + deltaPercentage;

        // Clamp percentage between 0 and 1
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

  const agePanResponder = createSliderResponder(18, 60, age, setAge, 1);
  const heightPanResponder = createSliderResponder(4.0, 7.0, height, setHeight, 0.1);

  const handleSave = () => {
    console.log('Preferences Saved:', { age, height, maritalStatus, religion, community, country, state, city });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partner Preferences</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>Set Your Basic Preferences</Text>
          <TouchableOpacity style={styles.editIconRow}>
            <Text style={styles.editText}>Edit</Text>
            <MaterialIcons name="edit" size={16} color="#777" />
          </TouchableOpacity>
        </View>

        {/* Age Slider */}
        <View style={styles.sliderSection}>
          <Text style={styles.inputLabel}>Age</Text>
          <View style={styles.sliderLabelsRow}>
            <Text style={styles.sliderBoundText}>From 18 Years</Text>
            <Text style={styles.sliderBoundText}>To 60 Years</Text>
          </View>
          
          <View 
            style={styles.sliderTrackContainer}
            onLayout={(event) => {
              trackWidthRef.current = event.nativeEvent.layout.width;
            }}
          >
            <View style={[styles.sliderFill, { width: `${((age - 18) / (60 - 18)) * 100}%` }]} />
            <View 
              style={[styles.sliderThumb, { left: `${((age - 18) / (60 - 18)) * 100}%` }]} 
              {...agePanResponder.panHandlers}
            />
          </View>
          <Text style={styles.sliderValueText}>{age} years</Text>
        </View>

        {/* Height Slider */}
        <View style={styles.sliderSection}>
          <Text style={styles.inputLabel}>Height</Text>
          <View style={styles.sliderLabelsRow}>
            <Text style={styles.sliderBoundText}>From 4ft</Text>
            <Text style={styles.sliderBoundText}>To 7ft</Text>
          </View>

          <View 
            style={styles.sliderTrackContainer}
            onLayout={(event) => {
              trackWidthRef.current = event.nativeEvent.layout.width;
            }}
          >
            <View style={[styles.sliderFill, { width: `${((height - 4) / (7 - 4)) * 100}%` }]} />
            <View 
              style={[styles.sliderThumb, { left: `${((height - 4) / (7 - 4)) * 100}%` }]} 
              {...heightPanResponder.panHandlers}
            />
          </View>
          <Text style={styles.sliderValueText}>{height}ft</Text>
        </View>

        {/* Marital Status Radio Buttons */}
        <Text style={[styles.inputLabel, { marginBottom: 15 }]}>Marital Status</Text>
        {maritalOptions.map((option, index) => (
          <RadioButton 
            key={index}
            label={option}
            selected={maritalStatus === option}
            onPress={() => setMaritalStatus(option)}
          />
        ))}

        {/* Dropdowns */}
        <CustomDropdown 
          label="Religion" 
          value={religion} 
          options={['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other']} 
          onSelect={setReligion} 
        />
        <CustomDropdown 
          label="Community" 
          value={community} 
          options={['Bengali', 'Punjabi', 'Gujarati', 'Marathi', 'Other']} 
          onSelect={setCommunity} 
        />
        <CustomDropdown 
          label="Country Living In" 
          value={country} 
          options={['India', 'USA', 'UK', 'Canada', 'Australia']} 
          onSelect={setCountry} 
        />
        <CustomDropdown 
          label="State Living In" 
          value={state} 
          options={['West Bengal', 'Maharashtra', 'Delhi', 'Karnataka']} 
          onSelect={setState} 
        />
        <CustomDropdown 
          label="City Living In" 
          value={city} 
          options={['Kolkata', 'Mumbai', 'New Delhi', 'Bangalore']} 
          onSelect={setCity} 
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#8B1A32' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  sectionHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#C2183D' },
  editIconRow: { flexDirection: 'row', alignItems: 'center' },
  editText: { fontSize: 14, color: '#777', marginRight: 4, fontWeight: '500' },
  inputLabel: { fontSize: 14, fontWeight: '700', color: '#555', marginBottom: 10 },
  
  // Slider Styles
  sliderSection: { marginBottom: 25 },
  sliderLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  sliderBoundText: { fontSize: 12, color: '#777' },
  sliderTrackContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    position: 'relative',
    marginVertical: 10,
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#C2183D',
    borderRadius: 2,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C2183D',
    position: 'absolute',
    top: -10,
    marginLeft: -12, // centers the thumb over the line position
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  sliderValueText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },

  // Radio Button Styles
  radioContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  outerCircle: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  selectedOuterCircle: { backgroundColor: '#F0D4DA' },
  innerCircle: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#8B1A32' },
  radioLabel: { fontSize: 14, color: '#444' },

  // Dropdown Styles
  dropdownWrapper: { marginBottom: 20 },
  dropdownHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8,
    paddingHorizontal: 15, paddingVertical: 12,
  },
  dropdownHeaderText: { fontSize: 14, color: '#333' },
  dropdownList: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8,
    marginTop: 5, elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, zIndex: 1000,
  },
  dropdownListItem: { paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  dropdownListText: { fontSize: 14, color: '#444' },

  // Button Styles
  saveButton: {
    backgroundColor: '#C2183D', paddingVertical: 15, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center', marginTop: 20,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});