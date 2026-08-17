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
import useThemeStore from '../../store/useThemeStore';

const ShareOption = ({ iconFamily, iconName, label, color, theme, onPress }) => (
  <TouchableOpacity style={styles.shareOptionContainer} onPress={onPress}>
    <View style={[styles.shareIconCircle, { backgroundColor: theme.colors.background, shadowColor: theme.mode === 'dark' ? '#000' : '#000' }]}>
      {iconFamily === 'MaterialCommunityIcons' ? (
        <MaterialCommunityIcons name={iconName} size={32} color={color} />
      ) : (
        <FontAwesome name={iconName} size={32} color={color} />
      )}
    </View>
    <Text style={[styles.shareLabel, { color: theme.colors.subtext }]}>{label}</Text>
  </TouchableOpacity>
);

export default function ReferFriendScreen({ navigation }) {
  const { theme } = useThemeStore();
  const [isShareModalVisible, setShareModalVisible] = useState(false);

  const handleShareToApp = (platform) => {
    console.log(`Sharing to ${platform}...`);
    setShareModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Refer A Friend</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.contentContainer}>
        
        <View style={styles.giftContainer}>
          <MaterialCommunityIcons name="gift" size={140} color="#FF1493" style={styles.giftIcon} />
        </View>

        <View style={[styles.linkBox, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.linkText, { color: theme.colors.primary }]}>
            Amet://: Minim Mollit Non Deserunt ://:Ullamco{'\n'}Est Sit Aliqua Dolor Do Amet://:
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.shareButton, { backgroundColor: theme.colors.primary }]} 
          onPress={() => setShareModalVisible(true)}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>

      </View>

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
            <View style={[styles.bottomSheet, { backgroundColor: theme.colors.surface }]}>
              
              <View style={[styles.dragIndicator, { backgroundColor: theme.colors.border }]} />

              <View style={styles.shareGrid}>
                <ShareOption 
                  iconFamily="MaterialCommunityIcons" 
                  iconName="message-processing" 
                  label="Message" 
                  color="#00A8FF" 
                  theme={theme}
                  onPress={() => handleShareToApp('Message')}
                />
                <ShareOption 
                  iconFamily="MaterialCommunityIcons" 
                  iconName="gmail" 
                  label="Gmail" 
                  color="#EA4335" 
                  theme={theme}
                  onPress={() => handleShareToApp('Gmail')}
                />
                <ShareOption 
                  iconFamily="FontAwesome" 
                  iconName="whatsapp" 
                  label="Whatsapp" 
                  color="#25D366" 
                  theme={theme}
                  onPress={() => handleShareToApp('WhatsApp')}
                />
                <ShareOption 
                  iconFamily="FontAwesome" 
                  iconName="facebook-square" 
                  label="Facebook" 
                  color="#1877F2" 
                  theme={theme}
                  onPress={() => handleShareToApp('Facebook')}
                />
                <ShareOption 
                  iconFamily="MaterialCommunityIcons" 
                  iconName="instagram" 
                  label="Instagram" 
                  color="#E1306C" 
                  theme={theme}
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
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
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
    textShadowColor: 'rgba(255, 20, 147, 0.3)',
    textShadowOffset: { width: 0, height: 10 },
    textShadowRadius: 20,
  },
  linkBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  shareButton: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
    paddingBottom: 40,
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
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 25,
  },
  shareIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});