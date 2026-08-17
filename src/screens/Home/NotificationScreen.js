import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeStore from '../../store/useThemeStore';

const SimpleNotification = ({ name, action, time, theme }) => (
  <View style={styles.notificationItem}>
    <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={[styles.notificationText, { color: theme.colors.subtext }]}>
        <Text style={[styles.boldName, { color: theme.colors.text }]}>{name}</Text> {action}
      </Text>
    </View>
    <Text style={[styles.timeText, { color: theme.colors.subtext }]}>{time}</Text>
  </View>
);

const LoveNotification = ({ name, action, time, theme }) => (
  <View style={styles.notificationItem}>
    <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={[styles.notificationText, { color: theme.colors.subtext }]}>
        <Text style={[styles.boldName, { color: theme.colors.text }]}>{name}</Text> {action}
      </Text>
      <MaterialCommunityIcons name="heart" size={16} color="#FF0000" style={styles.heartIcon} />
    </View>
    <Text style={[styles.timeText, { color: theme.colors.subtext }]}>{time}</Text>
  </View>
);

const ActionNotification = ({ name, action, primaryBtnText, secondaryBtnText, time, theme }) => (
  <View style={styles.notificationItem}>
    <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
    
    <View style={styles.actionMainContainer}>
      <Text style={[styles.notificationText, { color: theme.colors.subtext }]}>
        <Text style={[styles.boldName, { color: theme.colors.text }]}>{name}</Text>{'\n'}
        <Text style={[styles.subActionText, { color: theme.colors.subtext }]}>{action}</Text>
      </Text>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.primaryButtonText}>{primaryBtnText}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.secondaryButton, 
            { 
              backgroundColor: theme.mode === 'dark' ? '#2A2A35' : '#FDF1F3',
              borderColor: theme.mode === 'dark' ? theme.colors.border : '#F0D4DA'
            }
          ]}
        >
          <Text style={[styles.secondaryButtonText, { color: theme.colors.primary }]}>{secondaryBtnText}</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.actionTimeContainer}>
      <Text style={[styles.timeText, { color: theme.colors.subtext }]}>{time}</Text>
    </View>
  </View>
);

export default function NotificationScreen({ navigation }) {
  const { theme } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Notification</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Recent</Text>
        <SimpleNotification name="Avisekh Das" action="Just Viewed Your Profile" time="10m" theme={theme} />
        <SimpleNotification name="Avisekh Das" action="Viewed Your Profile" time="20m" theme={theme} />
        <SimpleNotification name="Avisekh Das" action="Viewed Your Profile" time="1h" theme={theme} />

        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Who Send Love</Text>
        <LoveNotification name="Avisekh Das" action="Send You Love" time="10m" theme={theme} />
        <LoveNotification name="Avisekh Das" action="Send You Love" time="20m" theme={theme} />
        <LoveNotification name="Avisekh Das" action="Send You Love" time="1h" theme={theme} />

        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>These Are The Just Joined Profiles</Text>
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Send Request" secondaryBtnText="Not Interested" time="30m" 
          theme={theme}
        />
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Send Request" secondaryBtnText="Not Interested" time="30m" 
          theme={theme}
        />
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Send Request" secondaryBtnText="Not Interested" time="30m" 
          theme={theme}
        />

        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>New Requests</Text>
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Accept Request" secondaryBtnText="Ignore" time="30m" 
          theme={theme}
        />
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Accept Request" secondaryBtnText="Ignore" time="4h" 
          theme={theme}
        />
        <ActionNotification 
          name="Avisekh Das" action="Is Requested To Accept Him" 
          primaryBtnText="Accept Request" secondaryBtnText="Ignore" time="20h" 
          theme={theme}
        />
        
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
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
    alignSelf: 'flex-start',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  notificationText: {
    fontSize: 14,
  },
  boldName: {
    fontWeight: '700',
  },
  heartIcon: {
    marginLeft: 6,
  },
  timeText: {
    fontSize: 12,
    marginLeft: 10,
  },
  actionMainContainer: {
    flex: 1,
  },
  subActionText: {
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  primaryButton: {
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
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionTimeContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    paddingBottom: 5,
  }
});