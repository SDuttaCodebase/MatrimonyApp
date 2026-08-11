// src/screens/Home/SearchScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

// Dummy data for recent searches
const INITIAL_SEARCHES = [
  { id: '1', name: 'Rahul Roy' },
  { id: '2', name: 'Pranj Das' },
  { id: '3', name: 'Avisekh Das' },
  { id: '4', name: 'Raj Sen' },
  { id: '5', name: 'Vikram Singh' },
  { id: '6', name: 'Amit Kumar' },
  { id: '7', name: 'Sneha Paul' },
  { id: '8', name: 'Priya Saha' },
];

export default function SearchScreen({ navigation }) {
  const { theme } = useThemeStore();
  
  // States for managing edit mode and the search history list
  const [isEditing, setIsEditing] = useState(false);
  const [recentSearches, setRecentSearches] = useState(INITIAL_SEARCHES);

  // Toggle between Edit and Done
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Remove an item from the recent searches list
  const removeSearch = (id) => {
    setRecentSearches((prevSearches) => prevSearches.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      
      {/* Top Header & Search Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        {/* Search Input Container */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search By Names"
            placeholderTextColor="#999"
            autoFocus={true} // Automatically opens keyboard when screen loads
          />
          <TouchableOpacity style={styles.micButton}>
            <Text style={styles.searchIcon}>🎤</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>🎛️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Recent Searches Section */}
      {recentSearches.length > 0 && (
        <View style={styles.recentSection}>
          
          {/* Section Header */}
          <View style={styles.recentHeaderRow}>
            <Text style={[styles.recentTitle, { color: '#6A2A35' }]}> {/* Deep red color matching design */}
              Recent Searches
            </Text>
            <TouchableOpacity onPress={toggleEdit}>
              <Text style={[styles.editText, { color: theme.colors.primary }]}>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal List of Recent Profiles */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentList}>
            {recentSearches.map((item) => (
              <View key={item.id} style={styles.recentItem}>
                <View style={styles.avatarWrapper}>
                  {/* Avatar Placeholder (Faded if in edit mode) */}
                  <View 
                    style={[
                      styles.avatarPlaceholder, 
                      isEditing && styles.avatarEditing 
                    ]} 
                  />
                  
                  {/* Absolute positioned Delete Button (Only visible in edit mode) */}
                  {isEditing && (
                    <TouchableOpacity 
                      style={styles.deleteButton} 
                      onPress={() => removeSearch(item.id)}
                    >
                      <Text style={styles.deleteText}>✖</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      
      <View style={styles.divider} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    width: 30,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
    color: '#333',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  searchIcon: {
    fontSize: 16,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  micButton: {
    paddingLeft: 5,
  },
  filterButton: {
    width: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
  },
  recentSection: {
    paddingVertical: 15,
  },
  recentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  editText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentList: {
    paddingHorizontal: 15,
  },
  recentItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 65,
  },
  avatarWrapper: {
    position: 'relative',
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#B0B0B0',
  },
  avatarEditing: {
    opacity: 0.5, // Fades the avatar when in edit mode
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#333333',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recentName: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
  },
});