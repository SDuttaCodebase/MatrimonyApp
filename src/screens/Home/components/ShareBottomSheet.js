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

const { height: windowHeight } = Dimensions.get('window');

export default function ShareBottomSheet({ visible, onClose, profile }) {
  const handleShareOption = (platform) => {
    // You can hook up native sharing or deep links here later
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
            <View style={styles.sheetContainer}>
              
              {/* Top Drag Indicator Handle */}
              <View style={styles.dragHandle} />

              {/* Share Options Grid */}
              <View style={styles.gridContainer}>
                
                {/* Row 1 */}
                <View style={styles.row}>
                  <TouchableOpacity style={styles.optionItem} onPress={() => handleShareOption('Message')}>
                    <View style={[styles.iconCircle, { backgroundColor: '#007AFF' }]}>
                      <Text style={styles.iconEmoji}>💬</Text>
                    </View>
                    <Text style={styles.optionLabel}>Message</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionItem} onPress={() => handleShareOption('Gmail')}>
                    <View style={[styles.iconCircle, { backgroundColor: '#EA4335' }]}>
                      <Text style={styles.iconEmoji}>✉️</Text>
                    </View>
                    <Text style={styles.optionLabel}>Gmail</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionItem} onPress={() => handleShareOption('Whatsapp')}>
                    <View style={[styles.iconCircle, { backgroundColor: '#25D366' }]}>
                      <Text style={styles.iconEmoji}>🟢</Text>
                    </View>
                    <Text style={styles.optionLabel}>Whatsapp</Text>
                  </TouchableOpacity>
                </View>

                {/* Row 2 */}
                <View style={styles.row}>
                  <TouchableOpacity style={styles.optionItem} onPress={() => handleShareOption('Facebook')}>
                    <View style={[styles.iconCircle, { backgroundColor: '#1877F2' }]}>
                      <Text style={styles.iconEmoji}>👥</Text>
                    </View>
                    <Text style={styles.optionLabel}>Facebook</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionItem} onPress={() => handleShareOption('Instagram')}>
                    <View style={[styles.iconCircle, { backgroundColor: '#E1306C' }]}>
                      <Text style={styles.iconEmoji}>📸</Text>
                    </View>
                    <Text style={styles.optionLabel}>Instagram</Text>
                  </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 40,
    maxHeight: windowHeight * 0.45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D0D0D0',
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
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconEmoji: {
    fontSize: 24,
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
});