import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Custom Radio Button Component
const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
      {selected && <View style={styles.innerCircle} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function DeleteAccountScreen({ navigation }) {
  const [selectedReason, setSelectedReason] = useState('Marriage Fixed');

  const reasons = [
    'Marriage Fixed',
    'Not Getting Enough Matches',
    'Prefer To Search Later',
    'Other Reason'
  ];

  const handleDelete = () => {
    if (selectedReason === 'Marriage Fixed') {
      navigation.navigate('MarriageFixedSuccessScreen');
    } else if (selectedReason === 'Not Getting Enough Matches') {
      // Add this new else-if block!
      navigation.navigate('NotEnoughMatchesScreen');
    } else {
      console.log('Other reason selected:', selectedReason);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delete Account</Text>
        <View style={{ width: 24 }} /> {/* Empty view for flex alignment */}
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        
        <Text style={styles.topText}>
          We Hope You Found Your Life Partner On Shadibiha.Com .
        </Text>

        <Text style={styles.warningText}>
          Note : Profile Once Deleted Cannot Be Restart Again
        </Text>

        <Text style={styles.instructionText}>
          Please Choose A Reason For Profile Deletion: -
        </Text>

        {/* Radio Button List */}
        <View style={styles.radioListContainer}>
          {reasons.map((reason, index) => (
            <RadioButton 
              key={index}
              label={reason}
              selected={selectedReason === reason}
              onPress={() => setSelectedReason(reason)}
            />
          ))}
        </View>

        {/* Spacer pushes the button to the bottom */}
        <View style={{ flex: 1 }} />

        {/* Delete Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete My Account</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B1A32', // Maroon header
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  topText: {
    fontSize: 15,
    color: '#444444',
    fontWeight: '500',
    marginBottom: 20,
    lineHeight: 22,
  },
  warningText: {
    fontSize: 13,
    color: '#D32F2F', // Red note
    fontWeight: '600',
    marginBottom: 25,
  },
  instructionText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500',
    marginBottom: 20,
  },
  
  // Custom Radio Button Styles
  radioListContainer: {
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  outerCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E0E0E0', // Solid grey when unselected
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedOuterCircle: {
    backgroundColor: '#F0D4DA', // Light pink background when selected
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B1A32', // Deep maroon dot
  },
  radioLabel: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  
  // Button Styles
  deleteButton: {
    backgroundColor: '#C2183D',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});