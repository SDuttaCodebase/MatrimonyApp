// src/screens/Home/components/FeaturedProfileCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useThemeStore from '../../../store/useThemeStore';

export default function FeaturedProfileCard({ 
  idCode = "MAW1230",
  name = "Sandipan Dutta", 
  age = 20, 
  height = "5ft 10in - 177cm",
  religion = "Hindu",
  community = "Bengali",
  location = "Kolkata, West Bengal, India"
}) {
  const { theme } = useThemeStore();

  return (
    <View style={styles.container}>
      {/* 
        Phase 1: Placeholder Background 
        Later, we will change this <View> to an <ImageBackground> or <FastImage>
      */}
      <View style={[styles.imagePlaceholder, { backgroundColor: '#B0B0B0' }]}>
        
        {/* Top Left: ID Code Badge */}
        <View style={styles.idBadge}>
          <Text style={styles.idText}>ID Code - {idCode}</Text>
        </View>

        {/* Right Side: Action Icons */}
        <View style={styles.actionColumn}>
          <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>⋮</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>🔗</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>🤍</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>🖼</Text></TouchableOpacity>
        </View>

        {/* Bottom Details Overlay */}
        <View style={styles.bottomOverlay}>
          <Text style={styles.nameRow}>
            <Text style={styles.nameText}>{name}</Text> | {age}yrs | {height}
          </Text>
          <Text style={styles.detailText}>{religion}, {community}</Text>
          <Text style={styles.detailText}>📍 {location}</Text>
          
          {/* Action Buttons Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.btnText, { color: theme.colors.primary }]}>Send Request</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.btnText, { color: theme.colors.primary }]}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 15,
    // Ensure child elements (like the image) don't bleed outside the rounded corners
    overflow: 'hidden', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  imagePlaceholder: {
    width: '100%',
    height: 400, // Large height for the main profile
    justifyContent: 'space-between',
  },
  idBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  idText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionColumn: {
    position: 'absolute',
    top: 15,
    right: 10,
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // A dark gradient background would go here eventually, using rgba for now
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    padding: 15,
  },
  nameRow: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    color: '#E0E0E0',
    fontSize: 12,
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});