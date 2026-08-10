// src/screens/Home/ProfileDetailScreen.js
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

const INTERESTS = [
  'Travelling', 'Dance', 
  'Skating', 'Movie', 
  'Singing', 'Reading', 
  'Football', 'Swimming'
];

const TABS = ['Personal Details', 'Family Details', 'Career & Occup', 'Horoscope'];

export default function ProfileDetailScreen({ route, navigation }) {
  const { theme } = useThemeStore();
  const profile = route?.params?.profile || {
    idCode: "ABW1230",
    name: "Rahul Roy",
    age: 28,
    height: "5ft 9in - 157cm",
    religion: "Hindu",
    community: "Bengali Kashyap",
    location: "Kolkata, West Bengal, India",
  };

  const [activeTab, setActiveTab] = useState('Personal Details');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      
      {/* Top Navigation Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.colors.brandDarkest }]}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Top Profile Image Card Preview (Without confusing bottom dots) */}
        <View style={styles.heroCard}>
          <View style={[styles.imagePlaceholder, { backgroundColor: '#888' }]}>
            
            {/* Top Left: ID Code */}
            <View style={styles.idBadge}>
              <Text style={styles.idText}>ID Code - #{profile.idCode}</Text>
            </View>

            {/* Right Side Action Icons */}
            <View style={styles.actionColumn}>
              <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>⋮</Text></TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>🔗</Text></TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>🤍</Text></TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>🖼</Text></TouchableOpacity>
            </View>

            {/* Bottom Overlay Info */}
            <View style={styles.heroBottomOverlay}>
              <Text style={styles.heroNameText}>
                {profile.name} <Text style={{ fontWeight: 'normal' }}>| {profile.age}yrs | {profile.height}</Text>
              </Text>
              <Text style={styles.heroSubText}>{profile.religion}, {profile.community}</Text>
              <Text style={styles.heroSubText}>📍 {profile.location}</Text>

              {/* Send Request & Message Buttons */}
              <View style={styles.heroButtonRow}>
                <TouchableOpacity style={[styles.heroActionBtn, { backgroundColor: theme.colors.surface }]}>
                  <Text style={[styles.heroBtnText, { color: theme.colors.primary }]}>Send Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.heroActionBtn, { backgroundColor: theme.colors.surface }]}>
                  <Text style={[styles.heroBtnText, { color: theme.colors.primary }]}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>

        {/* 2. Perfectly Aligned Masked Contact & Email Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.infoLabel}>Contact Number :</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.infoMask}>📞 ****** 🔒</Text>
            </View>
            <TouchableOpacity style={[styles.unlockSmallBtn, { backgroundColor: '#FFD1DC' }]}>
              <Text style={[styles.unlockSmallText, { color: theme.colors.primary }]}>Unlock</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.infoLabel}>Email Id :</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.infoMask}>✉️ ****** 🔒</Text>
            </View>
          </View>
        </View>

        {/* 3. Tab Pills Scrollable Header */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScrollRow}>
          {TABS.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabPill,
                  { borderColor: isSelected ? theme.colors.primary : '#E0E0E0' },
                  isSelected && { backgroundColor: theme.colors.primary }
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, { color: isSelected ? '#FFF' : '#666' }]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 4. About Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.brandDarkest }]}>About</Text>
          <Text style={styles.aboutText}>
            Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint. Velit Officia Consequ
          </Text>

          <View style={styles.religionRow}>
            <Text style={styles.detailLabel}>Religion :</Text>
            <Text style={styles.detailValue}> 🕉️ {profile.religion}</Text>
          </View>
        </View>

        {/* 5. Unlock Banner Callout */}
        <View style={[styles.unlockBanner, { borderColor: theme.colors.primary }]}>
          <Text style={styles.unlockBannerText}>To Unlock Profile</Text>
          <TouchableOpacity style={[styles.buyNowBtn, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.buyNowText}>Go Buy Now</Text>
          </TouchableOpacity>
        </View>

        {/* 6. Detailed Attributes Grid */}
        <View style={styles.attributesContainer}>
          <View style={styles.attrRow}>
            <Text style={styles.detailLabel}>Sub - Community :</Text>
            <Text style={styles.detailValue}> 🌸 {profile.community.split(' ')[1] || 'Kashyap'}</Text>
          </View>
          <View style={styles.attrRow}>
            <Text style={styles.detailLabel}>Caste :</Text>
            <Text style={styles.detailValue}> 📜 General</Text>
          </View>
          <View style={styles.attrRow}>
            <Text style={styles.detailLabel}>Marital Status :</Text>
            <Text style={styles.detailValue}> 👤 Single & Never Married</Text>
          </View>
          <View style={styles.attrRow}>
            <Text style={styles.detailLabel}>Diet :</Text>
            <Text style={styles.detailValue}> 🥗 Non- Veg</Text>
          </View>
          <View style={styles.attrRow}>
            <Text style={styles.detailLabel}>Complexion :</Text>
            <Text style={styles.detailValue}> 👤 Light Skin Tone</Text>
          </View>
        </View>

        {/* 7. Interests In Box */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.brandDarkest, marginBottom: 15 }]}>
            Interests In :
          </Text>
          
          <View style={styles.interestsBox}>
            <View style={styles.interestsGrid}>
              {INTERESTS.map((interest, index) => (
                <View key={index} style={[styles.interestChip, { borderColor: theme.colors.primary }]}>
                  <Text style={[styles.interestText, { color: theme.colors.brandDarkest }]}>
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  heroCard: {
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#CCC',
    elevation: 3,
  },
  imagePlaceholder: {
    width: '100%',
    height: 400,
    justifyContent: 'space-between',
  },
  idBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  idText: {
    color: '#FFF',
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFF',
    fontSize: 18,
  },
  heroBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
  },
  heroNameText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubText: {
    color: '#E0E0E0',
    fontSize: 12,
    marginBottom: 2,
  },
  heroButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  heroActionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  heroBtnText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  labelContainer: {
    width: 130, // Fixed width ensures the masked values and icons align perfectly in a vertical column
  },
  valueContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  infoMask: {
    fontSize: 13,
    color: '#666',
  },
  unlockSmallBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  unlockSmallText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },
  tabScrollRow: {
    marginVertical: 15,
  },
  tabPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 10,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  religionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
  },
  unlockBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  unlockBannerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  buyNowBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buyNowText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  attributesContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  attrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  interestsBox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestChip: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  interestText: {
    fontSize: 13,
    fontWeight: '600',
  },
});