// src/screens/Home/components/ShareBottomSheet.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Dimensions 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useThemeStore from '../../../store/useThemeStore';

const { height: windowHeight } = Dimensions.get('window');

// Reusable Share Option Item matching the Refer A Friend page style
const ShareOption = ({ iconFamily, iconName, label, color, onPress, theme }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <View style={[styles.iconCircle, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.text }]}>
      {iconFamily === 'MaterialCommunityIcons' ? (
        <MaterialCommunityIcons name={iconName} size={30} color={color} />
      ) : (
        <FontAwesome name={iconName} size={30} color={color} />
      )}
    </View>
    <Text style={[styles.optionLabel, { color: theme.colors.text }]}>{label}</Text>
  </TouchableOpacity>
);

export default function ShareBottomSheet({ visible, onClose, profile }) {
  const { theme } = useThemeStore();

  const handleShareOption = (platform) => {
    console.log(`Sharing to ${platform}...`);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Backdrop to dismiss modal when tapped outside */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          
          {/* Prevent touches inside the sheet from closing it */}
          <TouchableWithoutFeedback>
            <View style={[styles.sheetContainer, { backgroundColor: theme.colors.background, shadowColor: theme.colors.text }]}>
              
              {/* Top Drag Indicator Handle */}
              <View style={[styles.dragHandle, { backgroundColor: theme.colors.border }]} />

              {/* Share Options Grid */}
              <View style={styles.gridContainer}>
                
                {/* Row 1 */}
                <View style={styles.row}>
                  <ShareOption 
                    iconFamily="MaterialCommunityIcons" 
                    iconName="message-processing" 
                    label="Message" 
                    color="#00A8FF" 
                    onPress={() => handleShareOption('Message')}
                    theme={theme}
                  />
                  <ShareOption 
                    iconFamily="MaterialCommunityIcons" 
                    iconName="gmail" 
                    label="Gmail" 
                    color="#EA4335" 
                    onPress={() => handleShareOption('Gmail')}
                    theme={theme}
                  />
                  <ShareOption 
                    iconFamily="FontAwesome" 
                    iconName="whatsapp" 
                    label="Whatsapp" 
                    color="#25D366" 
                    onPress={() => handleShareOption('Whatsapp')}
                    theme={theme}
                  />
                </View>

                {/* Row 2 */}
                <View style={styles.row}>
                  <ShareOption 
                    iconFamily="FontAwesome" 
                    iconName="facebook-square" 
                    label="Facebook" 
                    color="#1877F2" 
                    onPress={() => handleShareOption('Facebook')}
                    theme={theme}
                  />
                  <ShareOption 
                    iconFamily="MaterialCommunityIcons" 
                    iconName="instagram" 
                    label="Instagram" 
                    color="#E1306C" 
                    onPress={() => handleShareOption('Instagram')}
                    theme={theme}
                  />
                </View>

              </View>

            </View>
          </TouchableWithoutFeedback>

        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 40,
    maxHeight: windowHeight * 0.45,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 25,
  },
  gridContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionItem: {
    alignItems: 'center',
    width: 80,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});