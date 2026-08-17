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
  
  const [isEditing, setIsEditing] = useState(false);
  const [recentSearches, setRecentSearches] = useState(INITIAL_SEARCHES);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const removeSearch = (id) => {
    setRecentSearches((prevSearches) => prevSearches.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* Top Header & Search Bar */}
      <View style={[styles.headerBar, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.colors.text }]}>←</Text>
        </TouchableOpacity>

        {/* Search Input Container */}
        <View style={[styles.searchContainer, { backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#F5F6F8', borderColor: theme.colors.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search By Names"
            placeholderTextColor={theme.mode === 'dark' ? '#888888' : '#999'}
            autoFocus={true}
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

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      {/* Recent Searches Section */}
      {recentSearches.length > 0 && (
        <View style={styles.recentSection}>
          
          {/* Section Header */}
          <View style={styles.recentHeaderRow}>
            <Text style={[styles.recentTitle, { color: theme.colors.primary }]}>
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
                  {/* Avatar Placeholder */}
                  <View 
                    style={[
                      styles.avatarPlaceholder, 
                      { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#B0B0B0' },
                      isEditing && styles.avatarEditing 
                    ]} 
                  />
                  
                  {/* Absolute positioned Delete Button */}
                  {isEditing && (
                    <TouchableOpacity 
                      style={[styles.deleteButton, { borderColor: theme.colors.surface }]} 
                      onPress={() => removeSearch(item.id)}
                    >
                      <Text style={styles.deleteText}>✖</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={[styles.recentName, { color: theme.colors.subtext }]} numberOfLines={1}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      
      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    width: 30,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 16,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
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
  },
  avatarEditing: {
    opacity: 0.5,
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
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recentName: {
    fontSize: 11,
    textAlign: 'center',
  },
});