// src/screens/Home/components/TopHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useThemeStore from '../../../store/useThemeStore';

export default function TopHeader() {
  const { theme } = useThemeStore();
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.colors.background }]}>
      {/* Left Icon: Hamburger Menu */}
      <TouchableOpacity style={styles.iconButton}>
        <Text style={[styles.iconText, { color: theme.colors.text }]}>☰</Text>
      </TouchableOpacity>

      {/* Center Title: App Brand Name using custom font */}
      <Text style={[styles.brandText, { color: theme.colors.primary }]}>
        Shadibaha
      </Text>

      {/* Right Icon: Search */}
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
        <Text style={[styles.iconText, { color: theme.colors.text }]}>🔍</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  iconButton: {
    padding: 5,
  },
  iconText: {
    fontSize: 22,
  },
  brandText: {
    fontFamily: 'SansitaRegular',
    fontSize: 26,
    fontWeight: 'bold',
  },
});