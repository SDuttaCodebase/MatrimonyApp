// src/screens/Home/components/ProfileCompletion.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useThemeStore from '../../../store/useThemeStore';

export default function ProfileCompletion({ percentage }) {
  const { theme } = useThemeStore();

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.colors.surface }]}>
      
      {/* Left Side: Avatar Placeholder & Text */}
      <View style={styles.leftContent}>
        {/* We will replace this View with an actual Image component later */}
        <View style={styles.avatarPlaceholder} />
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {percentage}% Profile Completed
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>
            Tap On This Bar To Complete Your Profile
          </Text>
        </View>
      </View>

      {/* Right Side: Action Text */}
      <TouchableOpacity>
        <Text style={[styles.actionText, { color: theme.colors.primary }]}>
          Tap Here
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3, 
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
  },
  actionText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});