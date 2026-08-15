import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList, 
  Image,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useThemeStore from '../../store/useThemeStore';

export default function BlockedAccountsScreen({ navigation }) {
  const { theme } = useThemeStore();

  // Mock data
  const [blockedUsers, setBlockedUsers] = useState([
    { id: '1', name: 'Rahul Roy', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: '2', name: 'Sandy', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '3', name: 'Amit Sharma', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: '4', name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: '5', name: 'Rahul Roy', avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: '6', name: 'Rahul Roy', avatar: 'https://i.pravatar.cc/150?img=16' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleConfirmUnblock = () => {
    if (selectedUser) {
      const updatedList = blockedUsers.filter(user => user.id !== selectedUser.id);
      setBlockedUsers(updatedList);
    }
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={[styles.userName, { color: theme.colors.text }]}>{item.name}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.unblockButtonList, { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#CFCFCF' }]} 
        onPress={() => handleOpenModal(item)}
      >
        <Text style={[styles.unblockButtonListText, { color: theme.mode === 'dark' ? '#E0E0E0' : '#444444' }]}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Blocked Account</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Blocked Users List */}
      <FlatList
        data={blockedUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Dynamic Unblock Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.colors.surface }]}>
            
            {/* Dynamic Title - Added safe fallback to prevent crashes */}
            <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>
              Unblock {selectedUser?.name || ''} ?
            </Text>
            
            {/* Dynamic Body Text - Added safe fallback to prevent crashes */}
            <Text style={[styles.modalSubtitle, { color: theme.colors.subtext }]}>
              {selectedUser?.name || ''} Will Now Be Able To Send You Request Again And Message You On Shadibiha.Com. They Won't Be Notified That You Unblocked Them.
            </Text>

            {/* Action Buttons */}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={[styles.modalUnblockButton, { backgroundColor: theme.mode === 'dark' ? '#3A3A45' : '#CFCFCF' }]} 
                onPress={handleConfirmUnblock}
              >
                <Text style={[styles.modalUnblockButtonText, { color: theme.mode === 'dark' ? '#E0E0E0' : '#444444' }]}>Unblock</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalCancelButton, { backgroundColor: theme.colors.text }]} 
                onPress={handleCancel}
              >
                <Text style={[styles.modalCancelButtonText, { color: theme.colors.surface }]}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

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
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 15,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
  },
  unblockButtonList: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  unblockButtonListText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modalCard: {
    borderRadius: 8,
    paddingVertical: 35,
    paddingHorizontal: 25,
    alignItems: 'center',
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  modalUnblockButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginRight: 15,
    flex: 1,
    alignItems: 'center',
  },
  modalUnblockButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  modalCancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});