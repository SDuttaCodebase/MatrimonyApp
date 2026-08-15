import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useThemeStore from '../../store/useThemeStore';

const RadioButton = ({ label, selected, onPress, theme }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress} activeOpacity={0.8}>
    <View 
      style={[
        styles.outerCircle, 
        { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#E0E0E0' },
        selected && [
          styles.selectedOuterCircle, 
          { backgroundColor: theme.mode === 'dark' ? '#4A4A55' : '#F0D4DA' }
        ]
      ]}
    >
      {selected && <View style={[styles.innerCircle, { backgroundColor: theme.colors.primary }]} />}
    </View>
    <Text style={[styles.radioLabel, { color: theme.colors.text }]}>{label}</Text>
  </TouchableOpacity>
);

export default function DeleteAccountScreen({ navigation }) {
  const { theme } = useThemeStore();
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
      navigation.navigate('NotEnoughMatchesScreen');
    } else if (selectedReason === 'Prefer To Search Later') {
      navigation.navigate('PreferToSearchLaterScreen');
    } else if (selectedReason === 'Other Reason') {
      navigation.navigate('OtherReasonScreen');
    } else {
      console.log('Other reason selected:', selectedReason);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Delete Account</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        
        <Text style={[styles.topText, { color: theme.colors.text }]}>
          We Hope You Found Your Life Partner On Shadibiha.Com .
        </Text>

        <Text style={[styles.warningText, { color: theme.mode === 'dark' ? '#FF6B6B' : '#D32F2F' }]}>
          Note : Profile Once Deleted Cannot Be Restart Again
        </Text>

        <Text style={[styles.instructionText, { color: theme.colors.subtext }]}>
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
              theme={theme}
            />
          ))}
        </View>

        <View style={{ flex: 1 }} />

        {/* Delete Button */}
        <TouchableOpacity 
          style={[styles.deleteButton, { backgroundColor: theme.colors.primary }]} 
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete My Account</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  topText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 20,
    lineHeight: 22,
  },
  warningText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 25,
  },
  instructionText: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 20,
  },
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedOuterCircle: {},
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
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