// src/screens/Chat/ChatScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';

// Dummy Data matching the provided image
const DUMMY_CHATS = [
  {
    id: '1',
    name: 'Rahul Roy',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true,
    unreadCount: 2,
    time: '12h',
    messagePreview: '2 New Messages . 12h',
    activeStatus: 'Active',
  },
  {
    id: '2',
    name: 'Jatin Singh',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    isOnline: false,
    unreadCount: 1,
    time: '19h',
    messagePreview: '1 New Messages . 19h',
    activeStatus: 'Active 4h Ago',
  },
  {
    id: '3',
    name: 'Subhojit Seth',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    isOnline: true,
    unreadCount: 0,
    time: '',
    messagePreview: 'Seen Last Week',
    activeStatus: 'Active',
  },
  {
    id: '4',
    name: 'Raushan Sharma',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    isOnline: true,
    unreadCount: 0,
    time: '',
    messagePreview: 'Ok.',
    activeStatus: 'Active',
  },
  {
    id: '5',
    name: 'Mayukh Ghosh',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    isOnline: false,
    unreadCount: 2,
    time: '24h',
    messagePreview: '2 New Messages . 24h',
    activeStatus: 'Active 7h Ago',
  },
  {
    id: '6',
    name: 'Sirshya Laskar',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    isOnline: false,
    unreadCount: 8,
    time: '1d',
    messagePreview: '8 New Messages . 1d',
    activeStatus: 'Active 5h Ago',
  },
  {
    id: '7',
    name: 'Aniket Shaw',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    isOnline: false,
    unreadCount: 0,
    time: '',
    messagePreview: 'Yes. Me Too',
    activeStatus: 'Active 1h Ago',
  },
  {
    id: '8',
    name: 'Sayak Dutta',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    isOnline: false,
    unreadCount: 0,
    time: '',
    messagePreview: 'No',
    activeStatus: 'Active 24min',
  },
];

export default function ChatScreen({ navigation }) {
  // Safe theme extraction ensuring dark mode fallback
  const themeStore = useThemeStore();
  const theme = themeStore?.theme || { dark: true, colors: { primary: '#80001E' } };
  const styles = getStyles(theme);

  const [activeTab, setActiveTab] = useState('Chat');
  const [searchQuery, setSearchQuery] = useState('');

  const renderChatItem = ({ item }) => {
    const hasUnread = item.unreadCount > 0;

    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.chatRow}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        </View>
        
        <View style={styles.chatDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{item.name}</Text>
            {item.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          <Text 
            style={[
              styles.messagePreview, 
              hasUnread && { color: theme.colors.primary, fontWeight: 'bold' }
            ]}
            numberOfLines={1}
          >
            {item.messagePreview}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.activeStatusText}>{item.activeStatus}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shadibihar</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Chat', 'Sent Request', 'Receive Request'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity 
              key={tab} 
              style={[
                styles.tabButton, 
                isActive && { borderBottomColor: theme.colors.primary }
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text 
                style={[
                  styles.tabText, 
                  isActive ? { color: theme.colors.primary, fontWeight: 'bold' } : styles.tabTextInactive
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search By Name"
            placeholderTextColor={styles.placeholderColor.color}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={DUMMY_CHATS.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ==========================================
// DYNAMIC STYLESHEET
// ==========================================
const getStyles = (theme) => {
  const isDark = theme?.dark || theme?.mode === 'dark';

  const colors = {
    background: isDark ? '#121212' : '#FFFFFF',
    card: isDark ? '#1E1E1E' : '#FFFFFF',
    inputBg: isDark ? '#2A2A2A' : '#FAFAFA',
    text: isDark ? '#FFFFFF' : '#222222',
    textSecondary: isDark ? '#AAAAAA' : '#888888',
    border: isDark ? '#333333' : '#EEEEEE',
    primary: theme?.colors?.primary || '#80001E', 
    onlineDot: '#25D366', 
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: colors.card,
    },
    menuButton: {
      padding: 5,
    },
    menuIcon: {
      fontSize: 24,
      color: colors.text,
      fontWeight: 'bold',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      fontStyle: 'italic', // Mimicking the script font from the screenshot
    },
    headerRightSpacer: {
      width: 30, // Balances the flex layout against the menu icon
    },
    
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 15,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    tabText: {
      fontSize: 14,
    },
    tabTextInactive: {
      color: colors.textSecondary,
      fontWeight: '500',
    },

    searchContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: colors.background,
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBg,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 15,
      height: 46,
    },
    searchIcon: {
      fontSize: 16,
      marginRight: 10,
      color: colors.textSecondary,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
    },
    placeholderColor: {
      color: colors.textSecondary,
    },

    listContent: {
      paddingBottom: 20,
    },
    chatRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    avatarContainer: {
      marginRight: 15,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.border,
    },
    chatDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    nameText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    onlineIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.onlineDot,
      marginLeft: 6,
    },
    messagePreview: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    statusContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginLeft: 10,
    },
    activeStatusText: {
      fontSize: 11,
      color: colors.textSecondary,
    },
  });
};