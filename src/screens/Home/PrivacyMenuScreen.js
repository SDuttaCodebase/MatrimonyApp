import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useThemeStore from '../../store/useThemeStore';

const PrivacyOption = ({ title, onPress, theme }) => (
  <TouchableOpacity style={[styles.itemContainer, { borderBottomColor: theme.colors.border }]} onPress={onPress}>
    <Text style={[styles.itemText, { color: theme.colors.text }]}>{title}</Text>
  </TouchableOpacity>
);

export default function PrivacyMenuScreen({ navigation }) {
  const { theme } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Privacy</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.contentContainer}>
        <PrivacyOption 
          title="Contact Privacy" 
          onPress={() => navigation.navigate('ContactPrivacyScreen')} 
          theme={theme}
        />
        
        <PrivacyOption 
          title="Photo Privacy" 
          onPress={() => navigation.navigate('PhotoPrivacyScreen')} 
          theme={theme}
        />
      </View>
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  itemContainer: {
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});