import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useTranslation } from 'react-i18next';
import useThemeStore from '../../store/useThemeStore';

export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>{t('Settings')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('AccountScreen')}>
          <MaterialIcons name="person-outline" size={24} color={theme.colors.text} style={styles.icon} />
          <Text style={[styles.itemText, { color: theme.colors.text }]}>{t('Account')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('PrivacyMenuScreen')}>
          <MaterialIcons name="security" size={24} color={theme.colors.text} style={styles.icon} />
          <Text style={[styles.itemText, { color: theme.colors.text }]}>{t('Privacy')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('AppLanguageScreen')}>
          <MaterialIcons name="g-translate" size={24} color={theme.colors.text} style={styles.icon} />
          <Text style={[styles.itemText, { color: theme.colors.text }]}>{t('App Language')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ReferFriendScreen')}>
          <MaterialIcons name="people-outline" size={24} color={theme.colors.text} style={styles.icon} />
          <Text style={[styles.itemText, { color: theme.colors.text }]}>{t('Refer A Friend')}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  icon: {
    width: 30,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});