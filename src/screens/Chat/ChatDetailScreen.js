// src/screens/chat/ChatDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useThemeStore from '../../store/useThemeStore';

// Dummy conversation data
const INITIAL_MESSAGES = [
  {
    id: '1',
    type: 'text',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
    isSender: false,
    time: 'seen at 5:45 pm',
  },
  {
    id: '2',
    type: 'text',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    isSender: true,
    time: 'seen at 8:00 am',
  },
  {
    id: '3',
    type: 'voice',
    duration: '0:12',
    isSender: true,
    time: 'seen at 8:00 am',
  },
  {
    id: '4',
    type: 'divider',
    text: 'Today',
  },
  {
    id: '5',
    type: 'text',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    isSender: true,
    time: 'seen at 8:00 am',
  },
  {
    id: '6',
    type: 'text',
    text: 'standard dummy',
    isSender: false,
    time: '',
  },
];

// Helper to generate waveform bars
const Waveform = ({ count, color, styles }) => (
  <View style={styles.waveformContainer}>
    {Array.from({ length: count }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.waveBar,
          {
            backgroundColor: color,
            height: Math.max(4, Math.random() * 24),
          },
        ]}
      />
    ))}
  </View>
);

export default function ChatDetailScreen({ navigation }) {
  const themeStore = useThemeStore();
  const theme = themeStore?.theme || { dark: true, colors: { primary: '#80001E' } };
  const styles = getStyles(theme);

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  
  // Voice Recording Simulation States
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState('0:00');

  // Real-time recording timer simulation
  useEffect(() => {
    let interval;
    if (isRecording) {
      let seconds = 0;
      interval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        setRecordTimer(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      }, 1000);
    } else {
      setRecordTimer('0:00');
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSendText = () => {
    if (inputText.trim().length === 0) return;
    
    const newMessage = {
      id: Date.now().toString(),
      type: 'text',
      text: inputText,
      isSender: true,
      time: 'Just now',
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setRecordTimer('0:00');
  };

  const sendVoiceMessage = () => {
    setIsRecording(false);
    
    const newVoiceMsg = {
      id: Date.now().toString(),
      type: 'voice',
      duration: recordTimer,
      isSender: true,
      time: 'Just now',
    };
    
    setMessages([...messages, newVoiceMsg]);
    setRecordTimer('0:00');
  };

  const renderMessage = ({ item }) => {
    if (item.type === 'divider') {
      return (
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{item.text}</Text>
          <View style={styles.dividerLine} />
        </View>
      );
    }

    const isSender = item.isSender;
    const bubbleStyle = isSender ? styles.senderBubble : styles.receiverBubble;
    const textStyle = isSender ? styles.senderText : styles.receiverText;

    return (
      <View style={[styles.messageWrapper, isSender ? styles.alignRight : styles.alignLeft]}>
        <View style={[styles.bubbleContainer, bubbleStyle]}>
          {item.type === 'text' ? (
            <Text style={textStyle}>{item.text}</Text>
          ) : (
            <View style={styles.voiceMessageContainer}>
              <TouchableOpacity>
                <Ionicons name="play-circle-outline" size={32} color={isSender ? '#333' : '#333'} />
              </TouchableOpacity>
              <Waveform count={18} color={isSender ? '#333' : '#333'} styles={styles} />
              <Text style={styles.voiceDuration}>{item.duration}</Text>
            </View>
          )}
        </View>
        {item.time ? <Text style={styles.timestamp}>{item.time}</Text> : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={styles.headerText.color} />
        </TouchableOpacity>
        
        <View style={styles.headerProfileInfo}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.headerAvatar} 
          />
          <View>
            <Text style={styles.headerName}>Rahul Roy</Text>
            <Text style={styles.headerStatus}>Active 1 Hour Ago</Text>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Dynamic Bottom Input Area */}
        <View style={styles.inputAreaContainer}>
          {isRecording ? (
            // Active Voice Recording Tray
            <View style={styles.recordingBar}>
              <TouchableOpacity onPress={cancelRecording}>
                <Ionicons name="trash-outline" size={24} color="#FFF" />
              </TouchableOpacity>
              
              <Waveform count={20} color="#FFF" styles={styles} />
              
              <TouchableOpacity onPress={sendVoiceMessage} style={styles.sendVoiceBtn}>
                <Ionicons name="arrow-up" size={20} color="#FF4081" />
              </TouchableOpacity>
            </View>
          ) : (
            // Default Typing Input Bar
            <View style={styles.defaultInputRow}>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type..."
                  placeholderTextColor={styles.placeholderColor.color}
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                />
              </View>

              {inputText.trim().length > 0 ? (
                <TouchableOpacity style={styles.sendTextBtn} onPress={handleSendText}>
                  <Ionicons name="send" size={18} color="#FFF" />
                </TouchableOpacity>
              ) : (
                <View style={styles.actionIconsRow}>
                  <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="heart-outline" size={26} color="#FF4081" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn} onPress={startRecording}>
                    <Ionicons name="mic-outline" size={26} color={styles.headerText.color} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (theme) => {
  const isDark = theme?.dark || theme?.mode === 'dark';

  const colors = {
    background: isDark ? '#121212' : '#FFFFFF',
    headerBg: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#222222',
    textSecondary: isDark ? '#AAAAAA' : '#888888',
    border: isDark ? '#333333' : '#EEEEEE',
    receiverBubble: isDark ? '#4A1423' : '#FCE4EC',
    senderBubble: isDark ? '#2A2A2A' : '#F5F6F8',
    receiverText: isDark ? '#FFFFFF' : '#1F2937',
    senderText: isDark ? '#FFFFFF' : '#1F2937',
    inputBg: isDark ? '#1E1E1E' : '#FFFFFF',
    primaryPink: '#FF4081',
  };

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    headerText: { color: colors.text },
    placeholderColor: { color: colors.textSecondary },

    header: {
      flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15,
      paddingVertical: 12, backgroundColor: colors.headerBg,
      borderBottomWidth: 1, borderBottomColor: colors.border,
    },
    backButton: { marginRight: 15 },
    headerProfileInfo: { flexDirection: 'row', alignItems: 'center' },
    headerAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
    headerName: { fontSize: 16, fontWeight: '600', color: colors.text },
    headerStatus: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },

    chatListContent: { padding: 20, paddingBottom: 40 },
    messageWrapper: { marginBottom: 15, maxWidth: '85%' },
    alignLeft: { alignSelf: 'flex-start' },
    alignRight: { alignSelf: 'flex-end' },
    bubbleContainer: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
    receiverBubble: { backgroundColor: colors.receiverBubble, borderTopLeftRadius: 4 },
    senderBubble: {
      backgroundColor: colors.senderBubble, borderTopRightRadius: 4,
      borderWidth: 1, borderColor: colors.border,
    },
    receiverText: { fontSize: 15, color: colors.receiverText, lineHeight: 22 },
    senderText: { fontSize: 15, color: colors.senderText, lineHeight: 22 },
    timestamp: { fontSize: 11, color: colors.textSecondary, marginTop: 6, alignSelf: 'flex-end' },

    voiceMessageContainer: { flexDirection: 'row', alignItems: 'center', width: 200 },
    waveformContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, marginHorizontal: 10, justifyContent: 'space-between' },
    waveBar: { width: 2, borderRadius: 1 },
    voiceDuration: { fontSize: 13, color: '#333', fontWeight: '500' },

    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
    dividerText: { marginHorizontal: 15, fontSize: 12, color: colors.textSecondary },

    inputAreaContainer: { paddingHorizontal: 15, paddingVertical: 10, backgroundColor: isDark ? '#121212' : '#F5F6F8' },
    defaultInputRow: { flexDirection: 'row', alignItems: 'flex-end' },
    textInputContainer: {
      flex: 1, backgroundColor: colors.inputBg, borderRadius: 20,
      borderWidth: 1, borderColor: colors.border, minHeight: 46, maxHeight: 120,
      justifyContent: 'center', paddingHorizontal: 15, marginRight: 10,
    },
    textInput: { fontSize: 15, color: colors.text, paddingTop: 12, paddingBottom: 12 },
    actionIconsRow: { flexDirection: 'row', alignItems: 'center', height: 46 },
    iconBtn: { paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center' },
    sendTextBtn: {
      width: 46, height: 46, borderRadius: 23, backgroundColor: colors.primaryPink,
      justifyContent: 'center', alignItems: 'center',
    },
    recordingBar: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryPink,
      borderRadius: 25, paddingHorizontal: 20, paddingVertical: 10, height: 54,
    },
    sendVoiceBtn: {
      width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFF',
      justifyContent: 'center', alignItems: 'center', marginLeft: 10,
    },
  });
};