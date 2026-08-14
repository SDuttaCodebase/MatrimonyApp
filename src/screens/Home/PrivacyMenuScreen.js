import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PrivacyOption = ({ title, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Text style={styles.itemText}>{title}</Text>
  </TouchableOpacity>
);

export default function PrivacyMenuScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy</Text>
        <View style={{ width: 24 }} /> {/* Empty view for flex alignment */}
      </View>

      {/* Menu Options */}
      <View style={styles.contentContainer}>
        <PrivacyOption 
          title="Contact Privacy" 
          onPress={() => navigation.navigate('ContactPrivacyScreen')} 
        />
        
        <PrivacyOption 
          title="Photo Privacy" 
          onPress={() => navigation.navigate('PhotoPrivacyScreen')} 
        />
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
    color: '#8B1A32', 
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30, 
  },
  itemContainer: {
    paddingVertical: 18,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
});