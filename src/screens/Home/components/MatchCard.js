// src/screens/Home/components/MatchCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useThemeStore from '../../../store/useThemeStore';

export default function MatchCard({ name = "Lorem Ipsum", details = "Hindu, Bengali" }) {
  const { theme } = useThemeStore();

  return (
    <TouchableOpacity style={[styles.cardContainer, { backgroundColor: theme.colors.surface }]}>
      {/* Small Image Placeholder */}
      <View style={[styles.imagePlaceholder, { backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#C0C0C0' }]} />
      
      {/* Details underneath the image */}
      <View style={styles.infoContainer}>
        <Text style={[styles.nameText, { color: theme.colors.text }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.detailText, { color: theme.colors.subtext }]} numberOfLines={1}>
          {details}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 120, // Fixed width for horizontal scrolling
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imagePlaceholder: {
    width: '100%',
    height: 140, // Taller image aspect ratio
  },
  infoContainer: {
    padding: 8,
  },
  nameText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 11,
  },
});