// src/screens/Home/components/MatchesList.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import useThemeStore from '../../../store/useThemeStore';
import { useNavigation } from '@react-navigation/native';
import MatchCard from './MatchCard';

export default function MatchesList({ title, subtitle, data = [1, 2, 3, 4] }) {
  const navigation = useNavigation();
  const { theme } = useThemeStore();

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>
              {subtitle}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('VerifiedSoulmates')}>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrolling List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* We map over dummy data for now to generate 4 cards */}
        {data.map((item, index) => (
          <MatchCard key={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  viewAll: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingLeft: 15, // Matches the global margin
    paddingRight: 5, // Extra space at the end of the scroll
  },
});
