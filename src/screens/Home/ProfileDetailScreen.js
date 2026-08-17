// src/screens/Home/ProfileDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeStore from '../../store/useThemeStore';
import ShareBottomSheet from './components/ShareBottomSheet';

const INTERESTS = [
  'Travelling',
  'Dance',
  'Skating',
  'Movie',
  'Singing',
  'Reading',
  'Football',
  'Swimming',
];

const TABS = [
  'Personal Details',
  'Family Details',
  'Career & Occup',
  'Horoscope',
];

export default function ProfileDetailScreen({ route, navigation }) {
  const { theme } = useThemeStore();
  const unlockButtonBg = theme.mode === 'dark' ? '#3A2A30' : '#FFD1DC';
  
  const profile = route?.params?.profile || {
    idCode: 'ABW1230',
    name: 'Rahul Roy',
    age: 28,
    height: '5ft 9in - 157cm',
    religion: 'Hindu',
    community: 'Bengali Kashyap',
    location: 'Kolkata, West Bengal, India',
  };

  const [activeTab, setActiveTab] = useState('Personal Details');
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Family Details':
        return (
          <View style={[styles.attributesContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Nuclear Family
            </Text>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Father's Name :</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>Brijesh Roy</Text>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Father's Occupation :</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>Service</Text>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Mother's Occupation :</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>House Wife</Text>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Sister's Name :</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>Priya Roy</Text>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Sister's Marital Status :</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>Married</Text>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Brother's Name :</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>Anik Roy</Text>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Brother's Marital Status :</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>Married</Text>
            </View>
          </View>
        );

      case 'Career & Occup':
        return (
          <View style={[styles.attributesContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Highest Qualification :</Text>
              <View style={styles.valueWithIcon}>
                <MaterialIcons name="school" size={16} color={theme.colors.primary} />
                <Text style={[styles.detailValue, styles.boldValue, { color: theme.colors.primary, marginLeft: 6 }]}>
                  M.S Engineering
                </Text>
              </View>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Occupation :</Text>
              <View style={styles.valueWithIcon}>
                <MaterialIcons name="work" size={16} color={theme.colors.primary} />
                <Text style={[styles.detailValue, styles.boldValue, { color: theme.colors.primary, marginLeft: 6 }]}>
                  Service
                </Text>
              </View>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Sector :</Text>
              <View style={styles.valueWithIcon}>
                <MaterialIcons name="business" size={16} color={theme.colors.primary} />
                <Text style={[styles.detailValue, styles.boldValue, { color: theme.colors.primary, marginLeft: 6 }]}>
                  IT Sector
                </Text>
              </View>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Designation :</Text>
              <View style={styles.valueWithIcon}>
                <MaterialIcons name="laptop-mac" size={16} color={theme.colors.primary} />
                <Text style={[styles.detailValue, styles.boldValue, { color: theme.colors.primary, marginLeft: 6 }]}>
                  UI/UX Designer
                </Text>
              </View>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Annual Income :</Text>
              <View style={styles.valueWithIcon}>
                <MaterialIcons name="attach-money" size={16} color={theme.colors.primary} />
                <Text style={[styles.detailValue, styles.boldValue, { color: theme.colors.primary, marginLeft: 6 }]}>
                  9lpa - 11lpa
                </Text>
              </View>
            </View>
          </View>
        );

      case 'Horoscope':
        return (
          <View style={[styles.attributesContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Zodiac :</Text>
              <View style={styles.valueWithIcon}>
                <MaterialCommunityIcons name="zodiac-aries" size={16} color={theme.colors.primary} />
                <Text style={[styles.detailValue, styles.boldValue, { color: theme.colors.primary, marginLeft: 6 }]}>
                  Aries
                </Text>
              </View>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Date Of Birth :</Text>
              <View style={styles.valueWithIcon}>
                <MaterialIcons name="cake" size={16} color={theme.colors.primary} />
                <Text style={[styles.detailValue, styles.boldValue, { color: theme.colors.primary, marginLeft: 6 }]}>
                  18 - 05 - 1991
                </Text>
              </View>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Time Of Birth :</Text>
              <View style={styles.valueWithIcon}>
                <MaterialIcons name="access-time" size={16} color={theme.colors.primary} />
                <Text style={[styles.detailValue, styles.boldValue, { color: theme.colors.primary, marginLeft: 6 }]}>
                  09:05am
                </Text>
              </View>
            </View>
            <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Manglika Dosha :</Text>
              <View style={styles.valueWithIcon}>
                <MaterialIcons name="description" size={16} color={theme.colors.text} />
                <Text style={[styles.detailValue, { color: theme.colors.text, marginLeft: 6 }]}>
                  ****** 🔒
                </Text>
              </View>
            </View>
          </View>
        );

      case 'Personal Details':
      default:
        return (
          <>
            <View style={[styles.sectionContainer, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                About
              </Text>
              <Text style={[styles.aboutText, { color: theme.colors.subtext }]}>
                Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do
                Amet Sint. Velit Officia Consequ
              </Text>

              <View style={styles.religionRow}>
                <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Religion :</Text>
                <View style={[styles.valueWithIcon, { marginLeft: 8 }]}>
                  <MaterialCommunityIcons name="om" size={16} color={theme.colors.text} />
                  <Text style={[styles.detailValue, { color: theme.colors.text, marginLeft: 4 }]}>
                    {profile.religion}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.attributesContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Sub - Community :</Text>
                <View style={styles.valueWithIcon}>
                  <MaterialCommunityIcons name="flower" size={16} color={theme.colors.text} />
                  <Text style={[styles.detailValue, { color: theme.colors.text, marginLeft: 6 }]}>
                    {profile.community.split(' ')[1] || 'Kashyap'}
                  </Text>
                </View>
              </View>
              <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Caste :</Text>
                <View style={styles.valueWithIcon}>
                  <MaterialCommunityIcons name="script-text-outline" size={16} color={theme.colors.text} />
                  <Text style={[styles.detailValue, { color: theme.colors.text, marginLeft: 6 }]}>General</Text>
                </View>
              </View>
              <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Marital Status :</Text>
                <View style={styles.valueWithIcon}>
                  <MaterialIcons name="person" size={16} color={theme.colors.text} />
                  <Text style={[styles.detailValue, { color: theme.colors.text, marginLeft: 6 }]}>Single & Never Married</Text>
                </View>
              </View>
              <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Diet :</Text>
                <View style={styles.valueWithIcon}>
                  <MaterialCommunityIcons name="food-apple" size={16} color={theme.colors.text} />
                  <Text style={[styles.detailValue, { color: theme.colors.text, marginLeft: 6 }]}>Non-Veg</Text>
                </View>
              </View>
              <View style={[styles.attrRow, { borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>Complexion :</Text>
                <View style={styles.valueWithIcon}>
                  <MaterialIcons name="person-outline" size={16} color={theme.colors.text} />
                  <Text style={[styles.detailValue, { color: theme.colors.text, marginLeft: 6 }]}>Light Skin Tone</Text>
                </View>
              </View>
            </View>

            <View style={[styles.sectionContainer, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Interests In :
              </Text>

              <View style={[styles.interestsBox, { borderColor: theme.colors.border }]}>
                <View style={styles.interestsGrid}>
                  {INTERESTS.map((interest, index) => (
                    <View
                      key={index}
                      style={[
                        styles.interestChip,
                        { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface },
                      ]}
                    >
                      <Text style={[styles.interestText, { color: theme.colors.text }]}>
                        {interest}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </>
        );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.headerBar, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroCard, { backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#CCC' }]}>
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => navigation.navigate('FullScreenImageViewer')}
          >
            <View style={[styles.imagePlaceholder, { backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#888' }]}>
              
              <View style={styles.idBadge}>
                <Text style={styles.idText}>ID Code - #{profile.idCode}</Text>
              </View>

              <View style={styles.actionColumn}>
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons name="more-vert" size={20} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => setShareModalVisible(true)}
                >
                  <MaterialIcons name="share" size={18} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons name="favorite-border" size={18} color="#FFF" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons name="photo-library" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.heroBottomOverlay}>
                <Text style={styles.heroNameText}>
                  {profile.name}{' '}
                  <Text style={styles.normalText}>
                    | {profile.age}yrs | {profile.height}
                  </Text>
                </Text>
                <Text style={styles.heroSubText}>
                  {profile.religion}, {profile.community}
                </Text>
                
                <View style={styles.locationRow}>
                  <MaterialIcons name="location-on" size={14} color="#E0E0E0" />
                  <Text style={[styles.heroSubText, { marginLeft: 4 }]}>{profile.location}</Text>
                </View>

                <View style={styles.heroButtonRow}>
                  <TouchableOpacity
                    style={[styles.heroActionBtn, { backgroundColor: theme.colors.surface }]}
                  >
                    <Text style={[styles.heroBtnText, { color: theme.colors.primary }]}>
                      Send Request
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.heroActionBtn, { backgroundColor: theme.colors.surface }]}
                  >
                    <Text style={[styles.heroBtnText, { color: theme.colors.primary }]}>
                      Message
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.infoRow}>
            <View style={styles.labelContainer}>
              <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Contact Number :</Text>
            </View>
            <View style={styles.valueWithIcon}>
              <MaterialIcons name="phone" size={16} color={theme.colors.subtext} />
              <Text style={[styles.infoMask, { color: theme.colors.subtext, marginLeft: 6 }]}>****** 🔒</Text>
            </View>
            <TouchableOpacity
              style={[styles.unlockSmallBtn, { backgroundColor: unlockButtonBg }]}
            >
              <Text style={[styles.unlockSmallText, { color: theme.colors.primary }]}>
                Unlock
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <View style={styles.infoRow}>
            <View style={styles.labelContainer}>
              <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Email Id :</Text>
            </View>
            <View style={[styles.valueWithIcon, { flex: 1 }]}>
              <MaterialIcons name="email" size={16} color={theme.colors.subtext} />
              <Text style={[styles.infoMask, { color: theme.colors.subtext, marginLeft: 6 }]}>****** 🔒</Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScrollRow}
        >
          {TABS.map(tab => {
            const isSelected = activeTab === tab;
            const tabTextColor = isSelected ? '#FFF' : theme.colors.subtext;

            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabPill,
                  {
                    borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    backgroundColor: theme.colors.surface,
                  },
                  isSelected && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, { color: tabTextColor }]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View
          style={[styles.unlockBanner, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
        >
          <Text style={[styles.unlockBannerText, { color: theme.colors.text }]}>To Unlock Profile</Text>
          <TouchableOpacity
            style={[styles.buyNowBtn, { backgroundColor: theme.colors.primary }]}
          >
            <Text style={styles.buyNowText}>Go Buy Now</Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}
      </ScrollView>

      <ShareBottomSheet 
        visible={shareModalVisible} 
        onClose={() => setShareModalVisible(false)} 
        profile={profile} 
      />
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
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  heroCard: {
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
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
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
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
    width: 130,
  },
  valueWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  infoMask: {
    fontSize: 13,
  },
  unlockSmallBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 15,
  },
  unlockSmallText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
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
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 13,
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
  },
  detailValue: {
    fontSize: 13,
  },
  unlockBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  unlockBannerText: {
    fontSize: 14,
    fontWeight: 'bold',
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
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  attrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  interestsBox: {
    borderWidth: 1,
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
  },
  interestText: {
    fontSize: 13,
    fontWeight: '600',
  },
  normalText: {
    fontWeight: 'normal',
  },
  boldValue: {
    fontWeight: 'bold',
  },
});