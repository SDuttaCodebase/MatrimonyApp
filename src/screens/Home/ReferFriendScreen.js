import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Reusable component for the social share buttons
const ShareOption = ({ iconFamily, iconName, label, color, onPress }) => (
  <TouchableOpacity style={styles.shareOptionContainer} onPress={onPress}>
    <View style={styles.shareIconCircle}>
      {iconFamily === 'MaterialCommunityIcons' ? (
        <MaterialCommunityIcons name={iconName} size={32} color={color} />
      ) : (
        <FontAwesome name={iconName} size={32} color={color} />
      )}
    </View>
    <Text style={styles.shareLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function ReferFriendScreen({ navigation }) {
  const [isShareModalVisible, setShareModalVisible] = useState(false);

  // Function to simulate sharing action
  const handleShareToApp = (platform) => {
    console.log(`Sharing to ${platform}...`);
    setShareModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer A Friend</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        
        {/* Gift Graphic */}
        <View style={styles.giftContainer}>
          <MaterialCommunityIcons name="gift" size={140} color="#FF1493" style={styles.giftIcon} />
        </View>

        {/* Link / Text Box */}
        <View style={styles.linkBox}>
          <Text style={styles.linkText}>
            Amet://: Minim Mollit Non Deserunt ://:Ullamco{'\n'}Est Sit Aliqua Dolor Do Amet://:
          </Text>
        </View>

        {/* Share Button */}
        <TouchableOpacity 
          style={styles.shareButton} 
          onPress={() => setShareModalVisible(true)}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>

      </View>

      {/* Custom Share Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShareModalVisible}
        onRequestClose={() => setShareModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPressOut={() => setShareModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              
              {/* Top Drag Indicator */}
              <View style={styles.dragIndicator} />

              {/* Share Options Grid */}
              <View style={styles.shareGrid}>
                <ShareOption 
                  iconFamily="MaterialCommunityIcons" 
                  iconName="message-processing" 
                  label="Message" 
                  color="#00A8FF" // Bright blue
                  onPress={() => handleShareToApp('Message')}
                />
                <ShareOption 
                  iconFamily="MaterialCommunityIcons" 
                  iconName="gmail" 
                  label="Gmail" 
                  color="#EA4335" // Google red
                  onPress={() => handleShareToApp('Gmail')}
                />
                <ShareOption 
                  iconFamily="FontAwesome" 
                  iconName="whatsapp" 
                  label="Whatsapp" 
                  color="#25D366" // WhatsApp green
                  onPress={() => handleShareToApp('WhatsApp')}
                />
                <ShareOption 
                  iconFamily="FontAwesome" 
                  iconName="facebook-square" 
                  label="Facebook" 
                  color="#1877F2" // Facebook blue
                  onPress={() => handleShareToApp('Facebook')}
                />
                <ShareOption 
                  iconFamily="MaterialCommunityIcons" 
                  iconName="instagram" 
                  label="Instagram" 
                  color="#E1306C" // Instagram magenta
                  onPress={() => handleShareToApp('Instagram')}
                />
              </View>

            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
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
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B1A32',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  giftContainer: {
    marginBottom: 60,
  },
  giftIcon: {
    // Adds a slight shadow to make the gift pop
    textShadowColor: 'rgba(255, 20, 147, 0.3)',
    textShadowOffset: { width: 0, height: 10 },
    textShadowRadius: 20,
  },
  linkBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 30,
  },
  linkText: {
    color: '#0096D6', // Blue link color
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  shareButton: {
    backgroundColor: '#C2183D',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Bottom Sheet Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dimmed background
    justifyContent: 'flex-end', // Aligns modal to the bottom
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
    paddingBottom: 40, // Extra padding for bottom screen edge
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#D3D3D3',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 30,
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  shareOptionContainer: {
    width: '33.33%', // Creates a 3-column grid
    alignItems: 'center',
    marginBottom: 25,
  },
  shareIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF', // White background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // Add a soft shadow to the icons to match the design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
});