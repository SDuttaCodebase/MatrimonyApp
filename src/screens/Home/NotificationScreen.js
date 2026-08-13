import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Reusable component for basic notifications
const SimpleNotification = ({ name, action, time }) => (
  <View style={styles.notificationItem}>
    <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.notificationText}>
        <Text style={styles.boldName}>{name}</Text> {action}
      </Text>
    </View>
    <Text style={styles.timeText}>{time}</Text>
  </View>
);

// Reusable component for love notifications
const LoveNotification = ({ name, action, time }) => (
  <View style={styles.notificationItem}>
    <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.notificationText}>
        <Text style={styles.boldName}>{name}</Text> {action}
      </Text>
      <MaterialCommunityIcons name="heart" size={16} color="#FF0000" style={styles.heartIcon} />
    </View>
    <Text style={styles.timeText}>{time}</Text>
  </View>
);

// Reusable component for actionable notifications
const ActionNotification = ({ name, action, primaryBtnText, secondaryBtnText, time }) => (
  <View style={styles.notificationItem}>
    <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
    
    <View style={styles.actionMainContainer}>
      <Text style={styles.notificationText}>
        <Text style={styles.boldName}>{name}</Text>{'\n'}
        <Text style={styles.subActionText}>{action}</Text>
      </Text>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>{primaryBtnText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>{secondaryBtnText}</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.actionTimeContainer}>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  </View>
);

export default function NotificationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: 24 }} /> {/* Empty view for flex alignment */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Recent Section */}
        <Text style={styles.sectionTitle}>Recent</Text>
        <SimpleNotification name="Avisekh Das" action="Just Viewed Your Profile" time="10m" />
        <SimpleNotification name="Avisekh Das" action="Viewed Your Profile" time="20m" />
        <SimpleNotification name="Avisekh Das" action="Viewed Your Profile" time="1h" />

        {/* Who Send Love Section */}
        <Text style={styles.sectionTitle}>Who Send Love</Text>
        <LoveNotification name="Avisekh Das" action="Send You Love" time="10m" />
        <LoveNotification name="Avisekh Das" action="Send You Love" time="20m" />
        <LoveNotification name="Avisekh Das" action="Send You Love" time="1h" />

        {/* Just Joined Section */}
        <Text style={styles.sectionTitle}>These Are The Just Joined Profiles</Text>
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Send Request" secondaryBtnText="Not Interested" time="30m" 
        />
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Send Request" secondaryBtnText="Not Interested" time="30m" 
        />
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Send Request" secondaryBtnText="Not Interested" time="30m" 
        />

        {/* New Requests Section */}
        <Text style={styles.sectionTitle}>New Requests</Text>
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Accept Request" secondaryBtnText="Ignore" time="30m" 
        />
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Accept Request" secondaryBtnText="Ignore" time="4h" 
        />
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Accept Request" secondaryBtnText="Ignore" time="20h" 
        />
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2, // shadow for Android
    shadowColor: '#000', // shadow for iOS
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
    color: '#8B1A32', // Deep maroon color from your design
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B1A32',
    marginTop: 25,
    marginBottom: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 15,
    alignSelf: 'flex-start', // keeps avatar at the top for multi-line items
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  notificationText: {
    fontSize: 14,
    color: '#555555',
  },
  boldName: {
    fontWeight: '700',
    color: '#333333',
  },
  heartIcon: {
    marginLeft: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 10,
  },
  
  // Styles specific to items with buttons
  actionMainContainer: {
    flex: 1,
  },
  subActionText: {
    fontSize: 13,
    color: '#777777',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#C2183D', // Button Red
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FDF1F3', // Light pink background
    borderWidth: 1,
    borderColor: '#F0D4DA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  secondaryButtonText: {
    color: '#C2183D',
    fontSize: 12,
    fontWeight: '600',
  },
  actionTimeContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'stretch', // Pushes the time to the bottom right for these specific rows
    paddingBottom: 5,
  }
});