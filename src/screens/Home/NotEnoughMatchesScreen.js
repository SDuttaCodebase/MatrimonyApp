import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NotEnoughMatchesScreen({ navigation }) {
  
  const handleEditPreferences = () => {
    navigation.navigate('PartnerPreferencesScreen');
  };

  const handleFinalDelete = () => {
    console.log('Account finally deleted!');
    // Execute API call for deletion here, then redirect to login/splash
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
        
        <Text style={styles.mainText}>
          We Still Hope That You Can Find Your Special One!
        </Text>

        {/* Edit Preferences Button */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditPreferences}>
          <Text style={styles.editButtonText}>Edit My Preferences</Text>
        </TouchableOpacity>

        {/* Secondary Text with clickable inline "Tap Here" */}
        <Text style={styles.subText}>
          If You Still Wish To Delete Your Profile Then{' '}
          <Text style={styles.tapHereText} onPress={handleFinalDelete}>
            Tap Here
          </Text>
        </Text>

        {/* Spacer pushes the bottom button down */}
        <View style={{ flex: 1 }} />

        {/* Final Delete Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleFinalDelete}>
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
    paddingTop: 50,
    paddingBottom: 40,
  },
  mainText: {
    fontSize: 15,
    color: '#444444',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  editButton: {
    backgroundColor: '#C2183D', // Bright red/maroon
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10, // Slightly indented compared to the bottom button
    marginBottom: 30,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  subText: {
    fontSize: 13,
    color: '#555555',
    textAlign: 'center',
    fontWeight: '500',
  },
  tapHereText: {
    color: '#C2183D',
    fontWeight: '700',
  },
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