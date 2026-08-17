// src/screens/Home/VerifiedSoulmatesScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';
import TopHeader from './components/TopHeader'; 
import ShareBottomSheet from './components/ShareBottomSheet'; 

const DEMO_PROFILES = [
  {
    idCode: 'SG101',
    name: 'Sujit Goswami',
    age: 30,
    height: '5ft 11in - 155cm',
    religion: 'Hindu',
    community: 'Marathi Baidya',
    location: 'Pune, Maharashtra',
  },
  {
    idCode: 'RR102',
    name: 'Rahul Roy',
    age: 29,
    height: '5ft 7in - 152cm',
    religion: 'Hindu',
    community: 'Bengali Kashyap',
    location: 'Kolkata, West Bengal',
  },
  {
    idCode: 'BM103',
    name: 'Biswajit Mukherjee',
    age: 27,
    height: '5ft 9in - 155cm',
    religion: 'Hindu',
    community: 'Rajasthani Kashyap',
    location: 'Kolkata, West Bengal',
  },
  {
    idCode: 'RS104',
    name: 'Raj Sharma',
    age: 31,
    height: '5ft 9in - 155cm',
    religion: 'Hindu',
    community: 'Punjabi Kashyap',
    location: 'Delhi, India',
  },
  {
    idCode: 'AS105',
    name: 'Avisekh Singharoy',
    age: 33,
    height: '5ft 6in - 151cm',
    religion: 'Hindu',
    community: 'Bengali Kashyap',
    location: 'Kolkata, West Bengal',
  },
  {
    idCode: 'AS105',
    name: 'Avisekh Singharoy',
    age: 33,
    height: '5ft 6in - 151cm',
    religion: 'Hindu',
    community: 'Bengali Kashyap',
    location: 'Kolkata, West Bengal',
  },
  {
    idCode: 'AS105',
    name: 'Avisekh Singharoy',
    age: 33,
    height: '5ft 6in - 151cm',
    religion: 'Hindu',
    community: 'Bengali Kashyap',
    location: 'Kolkata, West Bengal',
  },
  {
    idCode: 'AS105',
    name: 'Avisekh Singharoy',
    age: 33,
    height: '5ft 6in - 151cm',
    religion: 'Hindu',
    community: 'Bengali Kashyap',
    location: 'Kolkata, West Bengal',
  },
  {
    idCode: 'AS105',
    name: 'Avisekh Singharoy',
    age: 33,
    height: '5ft 6in - 151cm',
    religion: 'Hindu',
    community: 'Bengali Kashyap',
    location: 'Kolkata, West Bengal',
  },
];

export default function VerifiedSoulmatesScreen({ navigation }) {
  const { theme } = useThemeStore();
  
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectedProfileForShare, setSelectedProfileForShare] = useState(null);

  const handleOpenShare = (profile, event) => {
    event.stopPropagation();
    setSelectedProfileForShare(profile);
    setShareModalVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* Main Header */}
      <TopHeader />

      {/* Sub-header with Title and Filter Button */}
      <View style={[styles.subHeaderRow, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.pageTitle, { color: theme.colors.text }]}>
          Verified Soulmates
        </Text>
        
        <TouchableOpacity 
          style={[styles.filterButton, { borderColor: theme.colors.primary, backgroundColor: theme.colors.background }]}
          onPress={() => navigation.navigate('Filter')}
        >
          <Text style={[styles.filterText, { color: theme.colors.primary }]}>
            Filters 🎛️
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable List of Profiles */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {DEMO_PROFILES.map((profile, index) => (
          
          <TouchableOpacity 
            key={index} 
            activeOpacity={0.95}
            onPress={() => navigation.navigate('ProfileDetail', { profile })}
            style={[
              styles.cardContainer, 
              { 
                borderColor: theme.colors.border, 
                backgroundColor: theme.colors.surface 
              }
            ]}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.imagePlaceholder, { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#CCC' }]} />
              
              <View style={styles.detailsColumn}>
                <View style={styles.nameRow}>
                  <Text style={[styles.nameText, { color: theme.colors.primary }]}>
                    {profile.name}
                  </Text>
                  
                  <View style={styles.iconStack}>
                    <TouchableOpacity 
                      style={styles.iconBtn}
                      onPress={(e) => handleOpenShare(profile, e)}
                    >
                      <Text style={styles.emojiIcon}>🔗</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                      <Text style={styles.emojiIcon}>🤍</Text> 
                    </TouchableOpacity>
                  </View>
                </View>
                
                <Text style={[styles.subText, { color: theme.colors.subtext }]}>
                  {profile.age}yrs <Text style={[styles.pipe, { color: theme.colors.border }]}>|</Text> {profile.height}
                </Text>
                <Text style={[styles.subText, { color: theme.colors.subtext }]}>{profile.religion}, {profile.community}</Text>
                <Text style={[styles.subText, { color: theme.colors.subtext }]}>{profile.location}</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.solidBtnText}>Send Request</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.actionBtn, 
                  styles.outlineBtn, 
                  { borderColor: theme.colors.primary }
                ]}
              >
                <Text style={[styles.outlineBtnText, { color: theme.colors.primary }]}>
                  Message
                </Text>
              </TouchableOpacity>
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>

      <ShareBottomSheet 
        visible={shareModalVisible} 
        onClose={() => setShareModalVisible(false)} 
        profile={selectedProfileForShare} 
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 90, 
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTopRow: { flexDirection: 'row', marginBottom: 12 },
  imagePlaceholder: { width: 90, height: 115, borderRadius: 8 },
  detailsColumn: { flex: 1, paddingLeft: 15 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  nameText: { fontSize: 16, fontWeight: 'bold', flex: 1, paddingRight: 10 },
  iconStack: { alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: { paddingBottom: 8, paddingLeft: 10 },
  emojiIcon: { fontSize: 18 },
  subText: { fontSize: 12, marginBottom: 4 },
  pipe: {},
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 6, alignItems: 'center', justifyContent: 'center'
  },
  solidBtnText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  outlineBtn: { backgroundColor: 'transparent', borderWidth: 1, marginLeft: 10 },
  outlineBtnText: { fontSize: 13, fontWeight: '600' },
});