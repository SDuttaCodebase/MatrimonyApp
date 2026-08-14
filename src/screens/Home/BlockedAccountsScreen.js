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

export default function BlockedAccountsScreen({ navigation }) {
  // Mock data - Notice "Sandy" is added here to test the dynamic popup
  const [blockedUsers, setBlockedUsers] = useState([
    { id: '1', name: 'Rahul Roy', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: '2', name: 'Sandy', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '3', name: 'Amit Sharma', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: '4', name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: '5', name: 'Rahul Roy', avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: '6', name: 'Rahul Roy', avatar: 'https://i.pravatar.cc/150?img=16' },
  ]);

  // State to handle the modal visibility and track which user is selected
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Triggered when "Unblock" is pressed on a list item
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Triggered when "Unblock" is pressed inside the modal
  const handleConfirmUnblock = () => {
    if (selectedUser) {
      // Remove the unblocked user from the list
      const updatedList = blockedUsers.filter(user => user.id !== selectedUser.id);
      setBlockedUsers(updatedList);
    }
    // Close modal and reset selection
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  // Triggered when "Cancel" is pressed inside the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  // Renders each row in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
      <TouchableOpacity 
        style={styles.unblockButtonList} 
        onPress={() => handleOpenModal(item)}
      >
        <Text style={styles.unblockButtonListText}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blocked Account</Text>
        <View style={{ width: 24 }} /> {/* Empty view for flex alignment */}
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
          <View style={styles.modalCard}>
            
            {/* Dynamic Title */}
            <Text style={styles.modalTitle}>
              Unblock {selectedUser?.name} ?
            </Text>
            
            {/* Dynamic Body Text */}
            <Text style={styles.modalSubtitle}>
              {selectedUser?.name} Will Now Be Able To Send You Request Again And Message You On Shadibiha.Com. They Won't Be Notified That You Unblocked Them.
            </Text>

            {/* Action Buttons */}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalUnblockButton} onPress={handleConfirmUnblock}>
                <Text style={styles.modalUnblockButtonText}>Unblock</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancel}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
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
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
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
    color: '#8B1A32',
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
    color: '#333333',
  },
  unblockButtonList: {
    backgroundColor: '#CFCFCF', // Light grey matching design
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  unblockButtonListText: {
    color: '#444444',
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
    backgroundColor: '#FFFFFF',
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
    color: '#8B1A32',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#666666',
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
    backgroundColor: '#CFCFCF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginRight: 15,
    flex: 1,
    alignItems: 'center',
  },
  modalUnblockButtonText: {
    color: '#444444',
    fontSize: 15,
    fontWeight: '600',
  },
  modalCancelButton: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});