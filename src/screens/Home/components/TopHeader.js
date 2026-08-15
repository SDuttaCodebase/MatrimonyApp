// src/screens/Home/components/TopHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useThemeStore from '../../../store/useThemeStore';

export default function TopHeader() {
  const { theme } = useThemeStore();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* Left Icon: Hamburger Menu (Color dynamically changes now) */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={28} color={theme.colors.text} /> 
      </TouchableOpacity>

      {/* Center Title: App Brand Name using custom font */}
      <Text style={[styles.brandText, { color: theme.colors.primary }]}>
        Shadibaha
      </Text>

      {/* Right Icon: Search Vector Icon replacing the emoji */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('Search')}
      >
        <Icon name="search" size={26} color={theme.colors.text} />
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
  brandText: {
    fontFamily: 'SansitaRegular',
    fontSize: 26,
    fontWeight: 'bold',
  },
});