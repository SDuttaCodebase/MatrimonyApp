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
import useThemeStore from '../../store/useThemeStore';

const RadioButton = ({ label, selected, onPress, theme }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress} activeOpacity={0.8}>
    <View 
      style={[
        styles.outerCircle, 
        { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#E0E0E0' },
        selected && { backgroundColor: theme.mode === 'dark' ? '#4A4A55' : '#F0D4DA' }
      ]}
    >
      {selected && <View style={[styles.innerCircle, { backgroundColor: theme.colors.primary }]} />}
    </View>
    <Text style={[styles.radioLabel, { color: theme.colors.text }]}>{label}</Text>
  </TouchableOpacity>
);

const CustomDropdown = ({ label, value, options, onSelect, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={[styles.inputLabel, { color: theme.colors.text }]}>{label}</Text>
      <TouchableOpacity 
        style={[
          styles.dropdownHeader, 
          { 
            backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F9F9F9', 
            borderColor: theme.colors.border 
          }
        ]} 
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}
      >
        <Text style={[styles.dropdownHeaderText, { color: theme.colors.text }]}>{value}</Text>
        <MaterialIcons name={isOpen ? "arrow-drop-up" : "arrow-drop-down"} size={24} color={theme.colors.text} />
      </TouchableOpacity>
      
      {isOpen && (
        <View style={[styles.dropdownList, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          {options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.dropdownListItem, { borderBottomColor: theme.colors.border }]}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={[styles.dropdownListText, { color: theme.colors.text }]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default function PartnerPreferencesScreen({ navigation }) {
  const { theme } = useThemeStore();
  
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(6.0);

  const trackWidthRef = useRef(200);

  const [maritalStatus, setMaritalStatus] = useState('Never Married');
  const maritalOptions = ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorced', 'Annulled'];

  const [religion, setReligion] = useState('Hindu');
  const [community, setCommunity] = useState('Bengali');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('West Bengal');
  const [city, setCity] = useState('Kolkata');

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

  const agePanResponder = createSliderResponder(18, 60, age, setAge, 1);
  const heightPanResponder = createSliderResponder(4.0, 7.0, height, setHeight, 0.1);

  const handleSave = () => {
    console.log('Preferences Saved:', { age, height, maritalStatus, religion, community, country, state, city });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Partner Preferences</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionHeaderTitle, { color: theme.colors.primary }]}>Set Your Basic Preferences</Text>
          <TouchableOpacity style={styles.editIconRow}>
            <Text style={[styles.editText, { color: theme.colors.subtext }]}>Edit</Text>
            <MaterialIcons name="edit" size={16} color={theme.colors.subtext} />
          </TouchableOpacity>
        </View>

        <View style={styles.sliderSection}>
          <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Age</Text>
          <View style={styles.sliderLabelsRow}>
            <Text style={[styles.sliderBoundText, { color: theme.colors.subtext }]}>From 18 Years</Text>
            <Text style={[styles.sliderBoundText, { color: theme.colors.subtext }]}>To 60 Years</Text>
          </View>
          
          <View 
            style={[styles.sliderTrackContainer, { backgroundColor: theme.colors.border }]}
            onLayout={(event) => {
              trackWidthRef.current = event.nativeEvent.layout.width;
            }}
          >
            <View style={[styles.sliderFill, { width: `${((age - 18) / (60 - 18)) * 100}%`, backgroundColor: theme.colors.primary }]} />
            <View 
              style={[styles.sliderThumb, { left: `${((age - 18) / (60 - 18)) * 100}%`, backgroundColor: theme.colors.primary }]} 
              {...agePanResponder.panHandlers}
            />
          </View>
          <Text style={[styles.sliderValueText, { color: theme.colors.text }]}>{age} years</Text>
        </View>

        <View style={styles.sliderSection}>
          <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Height</Text>
          <View style={styles.sliderLabelsRow}>
            <Text style={[styles.sliderBoundText, { color: theme.colors.subtext }]}>From 4ft</Text>
            <Text style={[styles.sliderBoundText, { color: theme.colors.subtext }]}>To 7ft</Text>
          </View>

          <View 
            style={[styles.sliderTrackContainer, { backgroundColor: theme.colors.border }]}
            onLayout={(event) => {
              trackWidthRef.current = event.nativeEvent.layout.width;
            }}
          >
            <View style={[styles.sliderFill, { width: `${((height - 4) / (7 - 4)) * 100}%`, backgroundColor: theme.colors.primary }]} />
            <View 
              style={[styles.sliderThumb, { left: `${((height - 4) / (7 - 4)) * 100}%`, backgroundColor: theme.colors.primary }]} 
              {...heightPanResponder.panHandlers}
            />
          </View>
          <Text style={[styles.sliderValueText, { color: theme.colors.text }]}>{height}ft</Text>
        </View>

        <Text style={[styles.inputLabel, { marginBottom: 15, color: theme.colors.text }]}>Marital Status</Text>
        {maritalOptions.map((option, index) => (
          <RadioButton 
            key={index}
            label={option}
            selected={maritalStatus === option}
            onPress={() => setMaritalStatus(option)}
            theme={theme}
          />
        ))}

        <CustomDropdown 
          label="Religion" 
          value={religion} 
          options={['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other']} 
          onSelect={setReligion} 
          theme={theme}
        />
        <CustomDropdown 
          label="Community" 
          value={community} 
          options={['Bengali', 'Punjabi', 'Gujarati', 'Marathi', 'Other']} 
          onSelect={setCommunity} 
          theme={theme}
        />
        <CustomDropdown 
          label="Country Living In" 
          value={country} 
          options={['India', 'USA', 'UK', 'Canada', 'Australia']} 
          onSelect={setCountry} 
          theme={theme}
        />
        <CustomDropdown 
          label="State Living In" 
          value={state} 
          options={['West Bengal', 'Maharashtra', 'Delhi', 'Karnataka']} 
          onSelect={setState} 
          theme={theme}
        />
        <CustomDropdown 
          label="City Living In" 
          value={city} 
          options={['Kolkata', 'Mumbai', 'New Delhi', 'Bangalore']} 
          onSelect={setCity} 
          theme={theme}
        />

        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]} 
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  sectionHeaderTitle: { fontSize: 16, fontWeight: '700' },
  editIconRow: { flexDirection: 'row', alignItems: 'center' },
  editText: { fontSize: 14, marginRight: 4, fontWeight: '500' },
  inputLabel: { fontSize: 14, fontWeight: '700', marginBottom: 10 },
  
  sliderSection: { marginBottom: 25 },
  sliderLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  sliderBoundText: { fontSize: 12 },
  sliderTrackContainer: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
    marginVertical: 10,
  },
  sliderFill: {
    height: 4,
    borderRadius: 2,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    top: -10,
    marginLeft: -12, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  sliderValueText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
  },

  radioContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  outerCircle: {
    width: 20, height: 20, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  innerCircle: { width: 10, height: 10, borderRadius: 5 },
  radioLabel: { fontSize: 14 },

  dropdownWrapper: { marginBottom: 20 },
  dropdownHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 15, paddingVertical: 12,
  },
  dropdownHeaderText: { fontSize: 14 },
  dropdownList: {
    borderWidth: 1, borderRadius: 8,
    marginTop: 5, elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, zIndex: 1000,
  },
  dropdownListItem: { paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1 },
  dropdownListText: { fontSize: 14 },

  saveButton: {
    paddingVertical: 15, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center', marginTop: 20,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});