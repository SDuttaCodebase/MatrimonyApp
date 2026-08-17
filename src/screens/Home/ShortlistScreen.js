// src/screens/Home/ShortlistScreen.js
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
import ShareBottomSheet from './components/ShareBottomSheet';

const DEMO_SHORTLIST = Array(12).fill(null).map((_, index) => ({
  idCode: `AVS99${index}`, 
  name: 'Avisekh Singharoy',
  age: 33,
  height: '5ft 6in - 151cm',
  religion: 'Hindu',
  community: 'Bengali Kashyap',
  location: 'Kolkata, West Bengal',
}));

export default function ShortlistScreen({ navigation }) {
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
      
      {/* Top Header */}
      <View style={[styles.headerBar, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
          Shortlist
        </Text>
        <View style={styles.spacer} /> 
      </View>

      {/* Scrollable List of Profiles */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {DEMO_SHORTLIST.map((profile, index) => (
          <TouchableOpacity
            key={index} 
            activeOpacity={0.95}
            onPress={() => navigation.navigate('ProfileDetail', { profile })}
            style={[
              styles.cardContainer, 
              { 
                backgroundColor: theme.colors.surface, 
                borderColor: theme.colors.border 
              }
            ]}
          >
            
            {/* Top Row: Image & Details */}
            <View style={styles.cardTopRow}>
              {/* Profile Image Placeholder */}
              <View style={[styles.imagePlaceholder, { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#CCC' }]} />
              
              {/* Text Details Column */}
              <View style={styles.detailsColumn}>
                <View style={styles.nameRow}>
                  <Text style={[styles.nameText, { color: theme.colors.primary }]}>
                    {profile.name}
                  </Text>
                  
                  {/* Share Icon */}
                  <TouchableOpacity 
                    style={styles.shareIconBtn}
                    onPress={(e) => handleOpenShare(profile, e)}
                  >
                    <Text style={styles.shareEmoji}>🔗</Text> 
                  </TouchableOpacity>
                </View>
                
                <Text style={[styles.subText, { color: theme.colors.subtext }]}>
                  {profile.age}yrs <Text style={[styles.pipe, { color: theme.colors.border }]}>|</Text> {profile.height}
                </Text>
                <Text style={[styles.subText, { color: theme.colors.subtext }]}>{profile.religion}, {profile.community}</Text>
                <Text style={[styles.subText, { color: theme.colors.subtext }]}>{profile.location}</Text>
              </View>
            </View>

            {/* Bottom Row: Action Buttons */}
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

      {/* ShareBottomSheet Component */}
      <ShareBottomSheet 
        visible={shareModalVisible} 
        onClose={() => setShareModalVisible(false)} 
        profile={selectedProfileForShare} 
      />

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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  spacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 40,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  cardTopRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: 90,
    height: 110,
    borderRadius: 8,
  },
  detailsColumn: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  shareIconBtn: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  shareEmoji: {
    fontSize: 18,
  },
  subText: {
    fontSize: 12,
    marginBottom: 4,
  },
  pipe: {
    // handled dynamically
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solidBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginLeft: 10,
  },
  outlineBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
});