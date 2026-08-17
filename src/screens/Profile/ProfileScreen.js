// src/screens/profile/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import useThemeStore from '../../store/useThemeStore';

const DROPDOWN_OPTIONS = {
  religion: [
    'Hindu',
    'Muslim',
    'Buddhist',
    'Christian',
    'Jain',
    'Sikh',
    'Parsi',
  ],
  community: [
    'Bengali',
    'Hindi',
    'Punjabi',
    'Marathi',
    'Gujrati',
    'Urdu',
    'Telegu',
    'English',
  ],
  subCommunity: ['Kashyap', 'Baidya', 'Brahmin', 'Kayastha'],
  caste: ['General', 'OBC', 'SC', 'ST'],
  country: ['India', 'USA', 'UK', 'Canada', 'Australia'],
};

const STATES_LIST = [
  'West Bengal',
  'Maharashtra',
  'Delhi',
  'Hyderabad',
  'Karnataka',
  'Tamil Nadu',
  'Himachal Pradesh',
  'Uttarakhand',
  'Sikkim',
  'Chhattisgarh',
];

const CITIES_LIST = [
  'Kolkata',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
];

const MARITAL_STATUS_LIST = [
  'Never Married',
  'Divorced',
  'Widowed',
  'Awaiting Divorced',
  'Anulled',
];

const DIET_LIST = [
  { label: 'Non - Veg', icon: '🍗' },
  { label: 'Veg', icon: '🥗' },
  { label: 'Eggetarian', icon: '🥚' },
  { label: 'Vegan', icon: '🌱' },
];

const HEIGHT_LIST = [
  '5ft 6in - 155cm',
  '5ft 7in - 157cm',
  '5ft 8in - 160cm',
  '5ft 9in- 165cm',
  '5ft 10in - 170cm',
];

const INCOME_LIST = [
  'INR 4lpa-5lpa',
  'INR 6lpa-7lpa',
  'INR 7lpa-9lpa',
  'INR 8lpa-9lpa',
  'INR 10lpa-12lpa',
];

const COMPLEXION_LIST = [
  { label: 'Fair', emoji: '🧑' },
  { label: 'Medium', emoji: '🧑' },
  { label: 'Dark', emoji: '🧑' },
];

const QUALIFICATION_LIST = [
  'B.E / B.Tech',
  'M.E / M.Tech',
  'M.S Engineering',
  'B.Eng (Hons)',
  'M.Eng (Hons)',
  'Engineering Diploma',
  'AE',
  'AET',
  'B.S.C',
  'M.S.C',
];

const OCCUPATION_LIST = ['Service', 'Business', 'Others'];
const SERVICE_TYPE_LIST = ['Private', 'Government'];

const SECTOR_LIST = [
  'IT (Information Technology)',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
];

const SUB_SECTOR_LIST = ['Central Government', 'State Government'];

const RAILWAY_SECTOR_LIST = [
  'Indian Railways',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
];

const COMPANY_SUGGESTIONS = [
  'Infosys',
  'Tata Consultancy Services ( TCS )',
  'PWC',
  'Cognizant',
  'Webhibe Technologies',
  'Webskitters',
  'Deloitte',
];

const DESIGNATION_SUGGESTIONS = [
  'Admin Professional',
  'UI/UX Designer',
  'Human Resource Professional',
  'App Developer',
  'Accounting Professional',
  'Advertising Professional',
  'Digital Marketer',
];

const PLACE_SUGGESTIONS = [
  'Abcd Private Hospital',
  'Abcd Private Hospital',
  'Abcd Private Hospital',
  'Abcd Private Hospital',
  'Abcd Private Hospital',
  'Abcd Private Hospital',
  'Abcd Private Hospital',
];

const CREATIVE_HOBBIES = [
  { label: 'Cooking', icon: '🍲' },
  { label: 'Dance', icon: '💃' },
  { label: 'Singing', icon: '🎤' },
  { label: 'Playing Instrument', icon: '🎸' },
  { label: 'Photography', icon: '📷' },
  { label: 'Writing', icon: '✍️' },
];

const FUN_HOBBIES = [
  { label: 'Movie', icon: '🎬' },
  { label: 'Reading', icon: '📖' },
  { label: 'Football', icon: '⚽' },
  { label: 'Travelling', icon: '🚆' },
  { label: 'Skating', icon: '⛸️' },
];

const CREATIVITY_LIST = [
  'Dance',
  'Singing',
  'Playing Instruments',
  'Writing',
  'Gardening',
  'Fashion',
  'Beauty',
  'Ballerina',
  'Makeup',
  'Music',
];

const ENJOY_DOING_LIST = [
  'Movie',
  'Skating',
  'Reading',
  'Travelling',
  'Football',
  'Cricket',
  'Swimming',
  'Hiking',
  'Riding',
  'Scuba Diving',
];

const ZODIAC_LIST = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export default function ProfileScreen({ navigation }) {
  const themeStore = useThemeStore();
  const theme = themeStore?.theme || { dark: true, colors: { primary: '#80001E' } };
  const styles = getStyles(theme);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 22;

  const [profilePic, setProfilePic] = useState(null);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Time Picker states
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [tempHour, setTempHour] = useState('08');
  const [tempMinute, setTempMinute] = useState('00');
  const [tempAmPm, setTempAmPm] = useState('am');

  const [formData, setFormData] = useState({
    fullName: 'Sandipan Dutta',
    dob: '15/08/2003',
    email: 'sandipan.dev@gmail.com',
    phone: '+91 9876543210',
    location: 'Kolkata, West Bengal',
    occupationText: 'Software Engineer',
    religion: 'Hindu',
    community: 'Bengali',
    subCommunity: 'Kashyap',
    caste: 'General',
    country: 'India',
    state: 'West Bengal',
    city: 'Kolkata',
    maritalStatus: 'Never Married',
    diet: 'Non - Veg',
    height: '5ft 8in - 160cm',
    complexion: 'Fair',

    isJointFamily: 'No',
    fathersName: '',
    fathersOccupation: '',
    mothersName: '',
    mothersOccupation: '',
    sistersName: '',
    sistersMaritalStatus: 'Never Married',
    brothersName: '',
    brothersMaritalStatus: 'Never Married',

    highestQualification: 'B.E / B.Tech',
    occupationType: 'Service',
    serviceType: 'Private',
    sectorType: 'IT (Information Technology)',
    subSectorType: 'Central Government',
    railwaySectorType: 'Indian Railways',
    companyName: 'Infosys',
    designation: 'UI/UX Designer',
    annualIncome: 'INR 7lpa-9lpa',

    hobbies: ['Cooking', 'Movie'],
    selectedCreativity: 'Dance',
    enjoyDoing: 'Movie',

    zodiacSign: 'Aries',
    timeOfBirth: '8:00am',
    placeOfBirth: 'Abcd Private Hospital',
    manglikaDosha: 'No',
  });

  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [showDesignationSuggestions, setShowDesignationSuggestions] = useState(false);
  const [showPlaceSuggestions, setShowPlaceSuggestions] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleHobby = hobbyLabel => {
    setFormData(prev => {
      const exists = prev.hobbies.includes(hobbyLabel);
      if (exists) {
        return { ...prev, hobbies: prev.hobbies.filter(h => h !== hobbyLabel) };
      } else {
        return { ...prev, hobbies: [...prev.hobbies, hobbyLabel] };
      }
    });
  };

  const handleCameraPick = () => {
    setIsPhotoModalVisible(false);
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then(image => setProfilePic(image.path))
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') console.log(error);
      });
  };

  const handleGalleryPick = () => {
    setIsPhotoModalVisible(false);
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then(image => setProfilePic(image.path))
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') console.log(error);
      });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(currentStep + 1);
        setActiveDropdown(null);
        setShowCompanySuggestions(false);
        setShowDesignationSuggestions(false);
        setShowPlaceSuggestions(false);
      }, 600);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          'Profile Complete',
          'All your profile details have been successfully saved!',
        );
      }, 800);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setActiveDropdown(null);
      setShowCompanySuggestions(false);
      setShowDesignationSuggestions(false);
      setShowPlaceSuggestions(false);
    } else {
      navigation.goBack();
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const getClockRotation = (hour) => {
    const numHour = parseInt(hour) || 12;
    const normalizedHour = numHour === 12 ? 0 : numHour;
    return `${(normalizedHour * 30) - 90 + 180}deg`;
  };

  const renderClockNumbers = () => {
    const radius = 68;
    const numbers = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

    return numbers.map((num, index) => {
      const angle = index * 30 * (Math.PI / 180);
      const x = Math.round(95 + radius * Math.sin(angle) - 15);
      const y = Math.round(95 - radius * Math.cos(angle) - 15);

      const formattedNum = num.padStart(2, '0');
      const isSelected = tempHour === formattedNum;

      if (isSelected) {
        return (
          <TouchableOpacity
            key={num}
            style={[styles.clockNodeBubble, { left: x, top: y }]}
            onPress={() => setTempHour(formattedNum)}
          >
            <Text style={styles.clockNodeBubbleText}>{num}</Text>
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity
          key={num}
          style={[styles.clockNodeTextContainer, { left: x, top: y }]}
          onPress={() => setTempHour(formattedNum)}
        >
          <Text style={styles.clockNum}>{num}</Text>
        </TouchableOpacity>
      );
    });
  };

  const renderDropdownField = (label, fieldKey, optionsList) => {
    const isOpen = activeDropdown === fieldKey;
    const selectedValue = formData[fieldKey];

    return (
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: theme.colors.primary }]}>
          {label}
        </Text>
        <TouchableOpacity
          style={[
            styles.dropdownHeader,
            isOpen && { borderColor: theme.colors.primary },
          ]}
          activeOpacity={0.8}
          onPress={() => setActiveDropdown(isOpen ? null : fieldKey)}
        >
          <Text style={styles.dropdownSelectedText}>{selectedValue}</Text>
          <Text style={styles.dropdownArrow}>{isOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownListContainer}>
            {optionsList.map(option => {
              const isSelected = selectedValue === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownOptionRow}
                  onPress={() => {
                    handleInputChange(fieldKey, option);
                    setActiveDropdown(null);
                  }}
                >
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && { borderColor: theme.colors.primary },
                    ]}
                  >
                    {isSelected && (
                      <View
                        style={[
                          styles.radioDot,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      isSelected && {
                        fontWeight: 'bold',
                        color: theme.colors.primary,
                      },
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Loading Overlay Screen */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.primary }]}>Saving & Processing...</Text>
          </View>
        </View>
      )}

      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handlePrev} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
            {currentStep === 1
              ? 'Personal Details'
              : currentStep === 2
              ? 'Background Preferences'
              : currentStep === 3
              ? 'Select Your State'
              : currentStep === 4
              ? 'Select Your City'
              : currentStep === 5
              ? 'Select Your Marital Status'
              : currentStep === 6
              ? 'Select Your Diet'
              : currentStep === 7
              ? 'Select Your Height'
              : currentStep === 8
              ? 'Select Your Complexion'
              : currentStep === 9
              ? 'Mention Your Family Member'
              : currentStep === 10
              ? 'Select Your Highest Qualification'
              : currentStep === 11
              ? 'Select Your Occupation'
              : currentStep === 12
              ? 'Select Your Service Type'
              : currentStep === 13
              ? 'Select Your Sector Type'
              : currentStep === 14
              ? 'Select Your Sub - Sector Type'
              : currentStep === 15
              ? 'Select Your Sector Type'
              : currentStep === 16
              ? 'Type Your Company & Designation'
              : currentStep === 17
              ? 'Select Your Annual Income'
              : currentStep === 18
              ? 'Now Lets Add Your Hobbies & Interests'
              : currentStep === 19
              ? 'Select Your Creativity'
              : currentStep === 20
              ? 'Mention Things Which You Enjoy Doing'
              : currentStep === 21
              ? 'Select Your Zodiac Sign'
              : 'Type Your Horoscope Details'}
          </Text>
          {currentStep === 18 && (
            <Text style={styles.headerSubtitle}>
              This Will Help You Find Better Matches
            </Text>
          )}
        </View>
        <View style={styles.spacer} />
      </View>

      {/* Scrollable Form Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture Section (Visible only on Step 1) */}
        {currentStep === 1 && (
          <View style={styles.pfpContainer}>
            <View
              style={[styles.pfpWrapper, { borderColor: theme.colors.primary }]}
            >
              {profilePic ? (
                <Image
                  source={{ uri: profilePic }}
                  style={styles.actualPfpImage}
                />
              ) : (
                <View
                  style={[
                    styles.pfpImagePlaceholder,
                    { backgroundColor: theme.dark ? '#333' : '#DDD' },
                  ]}
                >
                  <Text style={styles.pfpEmoji}>📷</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.changePhotoBtn,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setIsPhotoModalVisible(true)}
            >
              <Text style={styles.changePhotoText}>Change Profile Picture</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 1 */}
        {currentStep === 1 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Personal Details</Text>
            {['fullName', 'dob', 'email', 'phone', 'occupationText'].map(
              field => (
                <View key={field} style={styles.standardInputGroup}>
                  <Text style={styles.standardLabel}>
                    {field.toUpperCase()}
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData[field]}
                    onChangeText={text => handleInputChange(field, text)}
                  />
                </View>
              ),
            )}
          </View>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Background Preferences</Text>
            {renderDropdownField(
              'Religion',
              'religion',
              DROPDOWN_OPTIONS.religion,
            )}
            {renderDropdownField(
              'Community',
              'community',
              DROPDOWN_OPTIONS.community,
            )}
            {renderDropdownField(
              'Sub-Community',
              'subCommunity',
              DROPDOWN_OPTIONS.subCommunity,
            )}
            {renderDropdownField('Caste', 'caste', DROPDOWN_OPTIONS.caste)}
            {renderDropdownField(
              'Country Living In',
              'country',
              DROPDOWN_OPTIONS.country,
            )}
          </View>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <View style={styles.cardsContainer}>
            {STATES_LIST.map(state => {
              const isSelected = formData.state === state;
              return (
                <TouchableOpacity
                  key={state}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('state', state)}
                  style={[
                    styles.selectionCard,
                    isSelected && {
                      backgroundColor: theme.dark ? '#2A1115' : '#FDF2F2',
                      borderColor: theme.colors.primary,
                    }
                  ]}
                >
                  <View style={styles.cardLeftRow}>
                    <View style={styles.stateIconCircle}>
                      <Text>🌄</Text>
                    </View>
                    <Text
                      style={[
                        styles.cardText,
                        isSelected && {
                          color: theme.colors.primary,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      {state}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && { borderColor: theme.colors.primary },
                    ]}
                  >
                    {isSelected && (
                      <View
                        style={[
                          styles.radioDot,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <View style={styles.cardsContainer}>
            {CITIES_LIST.map((city, index) => {
              const cityName = index === 0 ? 'Kolkata' : `${city} ${index}`;
              const isSelected = formData.city === cityName;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('city', cityName)}
                  style={[
                    styles.selectionCard,
                    isSelected && {
                      backgroundColor: theme.dark ? '#2A1115' : '#FDF2F2',
                      borderColor: theme.colors.primary,
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.cardText,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {cityName}
                  </Text>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && { borderColor: theme.colors.primary },
                    ]}
                  >
                    {isSelected && (
                      <View
                        style={[
                          styles.radioDot,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 5 */}
        {currentStep === 5 && (
          <View style={styles.largeGridContainer}>
            {MARITAL_STATUS_LIST.map(status => {
              const isSelected = formData.maritalStatus === status;
              return (
                <TouchableOpacity
                  key={status}
                  activeOpacity={0.85}
                  onPress={() => handleInputChange('maritalStatus', status)}
                  style={[
                    styles.largeGridCard,
                    isSelected
                      ? styles.selectedLargeCard
                      : styles.unselectedLargeCard,
                  ]}
                >
                  <Text
                    style={[
                      styles.largeGridCardText,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 6 */}
        {currentStep === 6 && (
          <View style={styles.cardsContainer}>
            {DIET_LIST.map(item => {
              const isSelected = formData.diet === item.label;
              return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('diet', item.label)}
                  style={[
                    styles.dietCard,
                    isSelected
                      ? styles.selectedDietCard
                      : styles.unselectedDietCard,
                  ]}
                >
                  <View style={styles.cardLeftRow}>
                    <View style={styles.dietIconCircle}>
                      <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                    </View>
                    <Text
                      style={[
                        styles.dietCardText,
                        isSelected && {
                          color: theme.colors.primary,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 7 */}
        {currentStep === 7 && (
          <View style={styles.heightPickerContainer}>
            {HEIGHT_LIST.map((h, index) => {
              const isFocused = formData.height === h;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleInputChange('height', h)}
                  style={[
                    styles.heightRow,
                    isFocused && styles.heightRowFocused,
                  ]}
                >
                  {isFocused && <Text style={styles.heightPointerLeft}>▶</Text>}
                  <Text
                    style={[
                      styles.heightText,
                      isFocused
                        ? { color: theme.dark ? '#FFF' : '#333', fontSize: 22, fontWeight: 'bold' }
                        : { color: theme.dark ? '#AAA' : '#888', fontSize: 18 },
                    ]}
                  >
                    {h}
                  </Text>
                  {isFocused && (
                    <Text style={styles.heightPointerRight}>◀</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 8 */}
        {currentStep === 8 && (
          <View style={styles.complexionContainer}>
            {COMPLEXION_LIST.map(comp => {
              const isSelected = formData.complexion === comp.label;
              return (
                <TouchableOpacity
                  key={comp.label}
                  activeOpacity={0.85}
                  onPress={() => handleInputChange('complexion', comp.label)}
                  style={[
                    styles.complexionCard,
                    isSelected
                      ? styles.selectedComplexionCard
                      : styles.unselectedComplexionCard,
                  ]}
                >
                  <View style={styles.avatarBox}>
                    <Text style={{ fontSize: 32 }}>👤</Text>
                  </View>
                  <Text
                    style={[
                      styles.complexionCardText,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {comp.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 9 */}
        {currentStep === 9 && (
          <View style={styles.familyContainer}>
            <Text style={styles.familySectionTitle}>Joint Family</Text>

            <View style={styles.radioGroupRow}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => handleInputChange('isJointFamily', 'Yes')}
              >
                <View
                  style={[
                    styles.radioButton,
                    formData.isJointFamily === 'Yes' && {
                      borderColor: theme.colors.primary,
                    },
                  ]}
                >
                  {formData.isJointFamily === 'Yes' && (
                    <View
                      style={[
                        styles.radioDot,
                        { backgroundColor: theme.colors.primary },
                      ]}
                    />
                  )}
                </View>
                <Text style={styles.radioLabelText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.radioOption, { marginLeft: 30 }]}
                onPress={() => handleInputChange('isJointFamily', 'No')}
              >
                <View
                  style={[
                    styles.radioButton,
                    formData.isJointFamily === 'No' && {
                      borderColor: theme.colors.primary,
                    },
                  ]}
                >
                  {formData.isJointFamily === 'No' && (
                    <View
                      style={[
                        styles.radioDot,
                        { backgroundColor: theme.colors.primary },
                      ]}
                    />
                  )}
                </View>
                <Text style={styles.radioLabelText}>No</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Text style={styles.familySectionTitle}>
              Type Your Family Details
            </Text>

            <TextInput
              style={styles.familyInput}
              placeholder="Father’s Name"
              placeholderTextColor="#999"
              value={formData.fathersName}
              onChangeText={text => handleInputChange('fathersName', text)}
            />

            <TextInput
              style={styles.familyInput}
              placeholder="Father’s Occupation"
              placeholderTextColor="#999"
              value={formData.fathersOccupation}
              onChangeText={text =>
                handleInputChange('fathersOccupation', text)
              }
            />

            <TextInput
              style={styles.familyInput}
              placeholder="Mother’s Name"
              placeholderTextColor="#999"
              value={formData.mothersName}
              onChangeText={text => handleInputChange('mothersName', text)}
            />

            <TextInput
              style={styles.familyInput}
              placeholder="Mother’s Occupation"
              placeholderTextColor="#999"
              value={formData.mothersOccupation}
              onChangeText={text =>
                handleInputChange('mothersOccupation', text)
              }
            />

            <TextInput
              style={styles.familyInput}
              placeholder="Sister’s Name"
              placeholderTextColor="#999"
              value={formData.sistersName}
              onChangeText={text => handleInputChange('sistersName', text)}
            />

            {renderDropdownField(
              'Sister’s Marital Status',
              'sistersMaritalStatus',
              MARITAL_STATUS_LIST,
            )}

            <TextInput
              style={styles.familyInput}
              placeholder="Brother’s Name"
              placeholderTextColor="#999"
              value={formData.brothersName}
              onChangeText={text => handleInputChange('brothersName', text)}
            />

            {renderDropdownField(
              'Brother’s Marital Status',
              'brothersMaritalStatus',
              MARITAL_STATUS_LIST,
            )}
          </View>
        )}

        {/* Step 10 */}
        {currentStep === 10 && (
          <View style={styles.cardsContainer}>
            {QUALIFICATION_LIST.map(qualification => {
              const isSelected =
                formData.highestQualification === qualification;
              return (
                <TouchableOpacity
                  key={qualification}
                  activeOpacity={0.9}
                  onPress={() =>
                    handleInputChange('highestQualification', qualification)
                  }
                  style={[
                    styles.qualificationCard,
                    isSelected
                      ? styles.selectedQualificationCard
                      : styles.unselectedQualificationCard,
                  ]}
                >
                  <Text
                    style={[
                      styles.qualificationCardText,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {qualification}
                  </Text>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 11 */}
        {currentStep === 11 && (
          <View style={styles.cardsContainer}>
            {OCCUPATION_LIST.map(occupation => {
              const isSelected = formData.occupationType === occupation;
              return (
                <TouchableOpacity
                  key={occupation}
                  activeOpacity={0.9}
                  onPress={() =>
                    handleInputChange('occupationType', occupation)
                  }
                  style={[
                    styles.qualificationCard,
                    isSelected
                      ? styles.selectedQualificationCard
                      : styles.unselectedQualificationCard,
                  ]}
                >
                  <Text
                    style={[
                      styles.qualificationCardText,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {occupation}
                  </Text>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 12 */}
        {currentStep === 12 && (
          <View style={styles.cardsContainer}>
            {SERVICE_TYPE_LIST.map(serviceType => {
              const isSelected = formData.serviceType === serviceType;
              return (
                <TouchableOpacity
                  key={serviceType}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('serviceType', serviceType)}
                  style={[
                    styles.qualificationCard,
                    isSelected
                      ? styles.selectedQualificationCard
                      : styles.unselectedQualificationCard,
                  ]}
                >
                  <Text
                    style={[
                      styles.qualificationCardText,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {serviceType}
                  </Text>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 13 */}
        {currentStep === 13 && (
          <View style={styles.cardsContainer}>
            {SECTOR_LIST.map((sector, index) => {
              const sectorName =
                index === 0 ? 'IT (Information Technology)' : `Lorem Ipsum`;
              const isSelected =
                formData.sectorType === sectorName &&
                (index === 0 || formData.sectorIndex === index);
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => {
                    handleInputChange('sectorType', sectorName);
                    handleInputChange('sectorIndex', index);
                  }}
                  style={[
                    styles.qualificationCard,
                    isSelected
                      ? styles.selectedQualificationCard
                      : styles.unselectedQualificationCard,
                  ]}
                >
                  <Text
                    style={[
                      styles.qualificationCardText,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {sectorName}
                  </Text>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 14 */}
        {currentStep === 14 && (
          <View style={styles.cardsContainer}>
            {SUB_SECTOR_LIST.map(subSector => {
              const isSelected = formData.subSectorType === subSector;
              return (
                <TouchableOpacity
                  key={subSector}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('subSectorType', subSector)}
                  style={[
                    styles.qualificationCard,
                    isSelected
                      ? styles.selectedQualificationCard
                      : styles.unselectedQualificationCard,
                  ]}
                >
                  <Text
                    style={[
                      styles.qualificationCardText,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {subSector}
                  </Text>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 15 */}
        {currentStep === 15 && (
          <View style={styles.cardsContainer}>
            {RAILWAY_SECTOR_LIST.map((item, index) => {
              const itemName = index === 0 ? 'Indian Railways' : `Lorem Ipsum`;
              const isSelected =
                formData.railwaySectorType === itemName &&
                (index === 0 || formData.railwaySectorIndex === index);
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => {
                    handleInputChange('railwaySectorType', itemName);
                    handleInputChange('railwaySectorIndex', index);
                  }}
                  style={[
                    styles.qualificationCard,
                    isSelected
                      ? styles.selectedQualificationCard
                      : styles.unselectedQualificationCard,
                  ]}
                >
                  <Text
                    style={[
                      styles.qualificationCardText,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {itemName}
                  </Text>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 16 */}
        {currentStep === 16 && (
          <View style={styles.familyContainer}>
            <View style={[styles.autocompleteWrapper, { zIndex: 20 }]}>
              <TextInput
                style={styles.companyInput}
                placeholder="Type Your Company Name"
                placeholderTextColor="#999"
                value={formData.companyName}
                onChangeText={text => {
                  handleInputChange('companyName', text);
                  setShowCompanySuggestions(true);
                  setShowDesignationSuggestions(false);
                }}
                onFocus={() => {
                  setShowCompanySuggestions(true);
                  setShowDesignationSuggestions(false);
                }}
              />
              {showCompanySuggestions && (
                <View style={styles.suggestionsBox}>
                  {COMPANY_SUGGESTIONS.map((comp, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.suggestionRow}
                      onPress={() => {
                        handleInputChange('companyName', comp);
                        setShowCompanySuggestions(false);
                      }}
                    >
                      <Text style={styles.suggestionText}>{comp}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View
              style={[
                styles.autocompleteWrapper,
                { marginTop: 15, zIndex: 10 },
              ]}
            >
              <TextInput
                style={styles.companyInput}
                placeholder="Type Your Designation"
                placeholderTextColor="#999"
                value={formData.designation}
                onChangeText={text => {
                  handleInputChange('designation', text);
                  setShowDesignationSuggestions(true);
                  setShowCompanySuggestions(false);
                }}
                onFocus={() => {
                  setShowDesignationSuggestions(true);
                  setShowCompanySuggestions(false);
                }}
              />
              {showDesignationSuggestions && (
                <View style={styles.suggestionsBox}>
                  {DESIGNATION_SUGGESTIONS.map((desig, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.suggestionRow}
                      onPress={() => {
                        handleInputChange('designation', desig);
                        setShowDesignationSuggestions(false);
                      }}
                    >
                      <Text style={styles.suggestionText}>{desig}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Step 17 */}
        {currentStep === 17 && (
          <View style={styles.heightPickerContainer}>
            {INCOME_LIST.map((inc, index) => {
              const isFocused = formData.annualIncome === inc;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleInputChange('annualIncome', inc)}
                  style={[
                    styles.heightRow,
                    isFocused && styles.heightRowFocused,
                  ]}
                >
                  {isFocused && <Text style={styles.heightPointerLeft}>▶</Text>}
                  <Text
                    style={[
                      styles.heightText,
                      isFocused
                        ? { color: theme.dark ? '#FFF' : '#333', fontSize: 22, fontWeight: 'bold' }
                        : { color: theme.dark ? '#AAA' : '#888', fontSize: 18 },
                    ]}
                  >
                    {inc}
                  </Text>
                  {isFocused && (
                    <Text style={styles.heightPointerRight}>◀</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 18 */}
        {currentStep === 18 && (
          <View style={styles.hobbiesContainer}>
            <View style={styles.hobbyCategoryBox}>
              <Text style={styles.hobbyCategoryTitle}>Creative</Text>
              <View style={styles.tagsFlexRow}>
                {CREATIVE_HOBBIES.map(hobby => {
                  const isSelected = formData.hobbies.includes(hobby.label);
                  return (
                    <TouchableOpacity
                      key={hobby.label}
                      style={[
                        styles.hobbyTag,
                        isSelected
                          ? styles.selectedHobbyTag
                          : styles.unselectedHobbyTag,
                      ]}
                      onPress={() => toggleHobby(hobby.label)}
                    >
                      <Text style={styles.hobbyTagIcon}>{hobby.icon}</Text>
                      <Text
                        style={[
                          styles.hobbyTagText,
                          isSelected && {
                            color: theme.colors.primary,
                            fontWeight: 'bold',
                          },
                        ]}
                      >
                        {hobby.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() =>
                  Alert.alert('View All', 'Showing all creative hobbies')
                }
              >
                <Text
                  style={[styles.viewAllText, { color: theme.colors.primary }]}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.hobbyCategoryBox, { marginTop: 20 }]}>
              <Text style={styles.hobbyCategoryTitle}>Fun</Text>
              <View style={styles.tagsFlexRow}>
                {FUN_HOBBIES.map(hobby => {
                  const isSelected = formData.hobbies.includes(hobby.label);
                  return (
                    <TouchableOpacity
                      key={hobby.label}
                      style={[
                        styles.hobbyTag,
                        isSelected
                          ? styles.selectedHobbyTag
                          : styles.unselectedHobbyTag,
                      ]}
                      onPress={() => toggleHobby(hobby.label)}
                    >
                      <Text style={styles.hobbyTagIcon}>{hobby.icon}</Text>
                      <Text
                        style={[
                          styles.hobbyTagText,
                          isSelected && {
                            color: theme.colors.primary,
                            fontWeight: 'bold',
                          },
                        ]}
                      >
                        {hobby.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() =>
                  Alert.alert('View All', 'Showing all fun hobbies')
                }
              >
                <Text
                  style={[styles.viewAllText, { color: theme.colors.primary }]}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 19 */}
        {currentStep === 19 && (
          <View style={styles.cardsContainer}>
            {CREATIVITY_LIST.map(item => {
              const isSelected = formData.selectedCreativity === item;
              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('selectedCreativity', item)}
                  style={[
                    styles.imageSelectionCard,
                    isSelected
                      ? styles.selectedQualificationCard
                      : styles.unselectedQualificationCard,
                  ]}
                >
                  <View style={styles.cardLeftRow}>
                    <View style={styles.avatarCirclePlaceholder}>
                      <Text style={{ fontSize: 16 }}>🎨</Text>
                    </View>
                    <Text
                      style={[
                        styles.qualificationCardText,
                        isSelected && {
                          color: theme.colors.primary,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 20 */}
        {currentStep === 20 && (
          <View style={styles.cardsContainer}>
            {ENJOY_DOING_LIST.map(item => {
              const isSelected = formData.enjoyDoing === item;
              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('enjoyDoing', item)}
                  style={[
                    styles.imageSelectionCard,
                    isSelected
                      ? styles.selectedQualificationCard
                      : styles.unselectedQualificationCard,
                  ]}
                >
                  <View style={styles.cardLeftRow}>
                    <View style={styles.avatarCirclePlaceholder}>
                      <Text style={{ fontSize: 16 }}>⭐</Text>
                    </View>
                    <Text
                      style={[
                        styles.qualificationCardText,
                        isSelected && {
                          color: theme.colors.primary,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 21: Select Your Zodiac Sign */}
        {currentStep === 21 && (
          <View style={styles.cardsContainer}>
            {ZODIAC_LIST.map(zodiac => {
              const isSelected = formData.zodiacSign === zodiac;
              return (
                <TouchableOpacity
                  key={zodiac}
                  activeOpacity={0.9}
                  onPress={() => handleInputChange('zodiacSign', zodiac)}
                  style={[
                    styles.imageSelectionCard,
                    isSelected
                      ? styles.selectedQualificationCard
                      : styles.unselectedQualificationCard,
                  ]}
                >
                  <View style={styles.cardLeftRow}>
                    <View style={styles.avatarCirclePlaceholder}>
                      <Text style={{ fontSize: 16 }}>♈</Text>
                    </View>
                    <Text
                      style={[
                        styles.qualificationCardText,
                        isSelected && {
                          color: theme.colors.primary,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      {zodiac}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.innerRadioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step 22: Type Your Horoscope Details */}
        {currentStep === 22 && (
          <View style={styles.familyContainer}>
            <Text
              style={[
                styles.label,
                { color: theme.colors.primary, marginBottom: 8 },
              ]}
            >
              Time Of Birth
            </Text>

            <TouchableOpacity
              style={styles.dropdownHeader}
              activeOpacity={0.8}
              onPress={() => setIsTimePickerVisible(true)}
            >
              <Text style={styles.dropdownSelectedText}>
                {formData.timeOfBirth}
              </Text>
              <Text style={styles.dropdownArrow}>▲</Text>
            </TouchableOpacity>

            <Modal
              visible={isTimePickerVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setIsTimePickerVisible(false)}
            >
              <View style={styles.timeModalOverlay}>
                <View style={styles.timeModalContent}>
                  <Text style={styles.timeModalTitle}>Select Time</Text>

                  <View style={styles.digitalTimeRow}>
                    <TouchableOpacity
                      style={[
                        styles.timeBox,
                        tempAmPm === 'am' && tempHour
                          ? {
                              backgroundColor: theme.dark ? '#2A1115' : '#FDF2F2',
                              borderColor: theme.colors.primary,
                            }
                          : {},
                      ]}
                      onPress={() => {}}
                    >
                      <Text style={[styles.timeBoxText, { color: theme.colors.primary }]}>
                        {tempHour}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.timeColon}>:</Text>
                    <TouchableOpacity style={styles.timeBox}>
                      <Text style={styles.timeBoxText}>{tempMinute}</Text>
                    </TouchableOpacity>

                    <View style={styles.amPmContainer}>
                      <TouchableOpacity
                        style={[
                          styles.amPmBtn,
                          tempAmPm === 'am' && { backgroundColor: theme.dark ? '#2A1115' : '#FFC0CB' },
                        ]}
                        onPress={() => setTempAmPm('am')}
                      >
                        <Text
                          style={[
                            styles.amPmText,
                            tempAmPm === 'am' && {
                              color: theme.colors.primary,
                              fontWeight: 'bold',
                            },
                          ]}
                        >
                          Am
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.amPmBtn,
                          tempAmPm === 'pm' && { backgroundColor: theme.dark ? '#2A1115' : '#FFC0CB' },
                        ]}
                        onPress={() => setTempAmPm('pm')}
                      >
                        <Text
                          style={[
                            styles.amPmText,
                            tempAmPm === 'pm' && {
                              color: theme.colors.primary,
                              fontWeight: 'bold',
                            },
                          ]}
                        >
                          Pm
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.clockFaceCircle}>
                    <View style={styles.clockCenterDot} />
                    <View 
                      style={[
                        styles.clockHandLine, 
                        { 
                          transform: [
                            { translateX: 29 },
                            { rotate: getClockRotation(tempHour) },
                            { translateX: -29 }
                          ] 
                        }
                      ]} 
                    />
                    {renderClockNumbers()}
                  </View>

                  <View style={styles.timeModalButtonsRow}>
                    <TouchableOpacity style={styles.keyboardIconBtn}>
                      <Text style={{ fontSize: 18 }}>⌨️</Text>
                    </TouchableOpacity>
                    <View style={styles.modalRightActions}>
                      <TouchableOpacity
                        onPress={() => setIsTimePickerVisible(false)}
                      >
                        <Text style={styles.modalCancelText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalOkBtn}
                        onPress={() => {
                          handleInputChange(
                            'timeOfBirth',
                            `${parseInt(tempHour)}:${tempMinute}${tempAmPm}`,
                          );
                          setIsTimePickerVisible(false);
                        }}
                      >
                        <Text style={styles.modalOkText}>Ok</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            <Text
              style={[
                styles.label,
                { color: theme.colors.primary, marginTop: 20, marginBottom: 8 },
              ]}
            >
              Place Of Birth
            </Text>

            <View style={[styles.autocompleteWrapper, { zIndex: 10 }]}>
              <TextInput
                style={styles.companyInput}
                placeholder="Abcd Private Hospital"
                placeholderTextColor="#999"
                value={formData.placeOfBirth}
                onChangeText={text => {
                  handleInputChange('placeOfBirth', text);
                  setShowPlaceSuggestions(true);
                }}
                onFocus={() => setShowPlaceSuggestions(true)}
              />
              {showPlaceSuggestions && (
                <View style={styles.suggestionsBox}>
                  {PLACE_SUGGESTIONS.map((place, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.suggestionRow}
                      onPress={() => {
                        handleInputChange('placeOfBirth', place);
                        setShowPlaceSuggestions(false);
                      }}
                    >
                      <Text style={styles.suggestionText}>{place}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <Text
              style={[
                styles.label,
                {
                  color: theme.colors.primary,
                  marginTop: 25,
                  marginBottom: 12,
                },
              ]}
            >
              Manglika Dosha
            </Text>
            <View style={styles.radioGroupRow}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => handleInputChange('manglikaDosha', 'Yes')}
              >
                <View
                  style={[
                    styles.radioButton,
                    formData.manglikaDosha === 'Yes' && {
                      borderColor: theme.colors.primary,
                    },
                  ]}
                >
                  {formData.manglikaDosha === 'Yes' && (
                    <View
                      style={[
                        styles.radioDot,
                        { backgroundColor: theme.colors.primary },
                      ]}
                    />
                  )}
                </View>
                <Text style={styles.radioLabelText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.radioOption, { marginLeft: 40 }]}
                onPress={() => handleInputChange('manglikaDosha', 'No')}
              >
                <View
                  style={[
                    styles.radioButton,
                    formData.manglikaDosha === 'No' && {
                      borderColor: theme.colors.primary,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                >
                  {formData.manglikaDosha === 'No' && (
                    <View style={styles.innerRadioDot} />
                  )}
                </View>
                <Text style={styles.radioLabelText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Sticky Navigation */}
      <View style={styles.bottomButtonRow}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButtonFixed,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Finish' : 'Next ➔'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Camera / Gallery Modal */}
      <Modal
        visible={isPhotoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPhotoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Profile Picture</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleCameraPick}
            >
              <Text style={styles.modalOptionText}>📷 Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleGalleryPick}
            >
              <Text style={styles.modalOptionText}>🖼️ Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOption, styles.cancelOption]}
              onPress={() => setIsPhotoModalVisible(false)}
            >
              <Text style={[styles.modalOptionText, { color: '#FF3B30' }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ==========================================
// STYLESHEET (Fixed Light & Dark Themes)
// ==========================================
const getStyles = (theme) => {
  const isDark = theme?.dark || theme?.mode === 'dark';

  const colors = {
    background: isDark ? '#121212' : '#FFFFFF',
    card: isDark ? '#1E1E1E' : '#FFFFFF',
    inputBg: isDark ? '#2A2A2A' : '#EFEFEF',
    text: isDark ? '#FFFFFF' : '#333333',
    textSecondary: isDark ? '#AAAAAA' : '#666666',
    border: isDark ? '#444444' : '#E0E0E0',
    primary: theme?.colors?.primary || '#80001E', 
    highlight: isDark ? '#2A1115' : '#FDF2F2', 
  };

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    loadingOverlay: {
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999,
      justifyContent: 'center', alignItems: 'center',
    },
    loadingBox: {
      backgroundColor: colors.card,
      paddingVertical: 24, paddingHorizontal: 32, borderRadius: 16,
      alignItems: 'center', shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 8,
    },
    loadingText: { marginTop: 12, fontSize: 15, fontWeight: 'bold', color: colors.primary },
    headerBar: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 20, paddingVertical: 15,
      backgroundColor: colors.card,
      borderBottomWidth: 1, borderBottomColor: isDark ? '#333' : '#F0F0F0',
    },
    backButton: { width: 40, height: 40, justifyContent: 'center' },
    backText: { fontSize: 24, color: colors.text },
    headerTitleContainer: { flex: 1, alignItems: 'center' },
    headerTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: colors.primary },
    headerSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2, textAlign: 'center' },
    spacer: { width: 40 },
    scrollContent: { paddingHorizontal: 20, paddingTop: 25, paddingBottom: 140 },

    pfpContainer: { alignItems: 'center', marginBottom: 25 },
    pfpWrapper: {
      width: 100, height: 100, borderRadius: 50,
      borderWidth: 2, borderColor: colors.primary, padding: 3, marginBottom: 10,
    },
    pfpImagePlaceholder: {
      width: '100%', height: '100%', borderRadius: 45,
      justifyContent: 'center', alignItems: 'center',
    },
    actualPfpImage: { width: '100%', height: '100%', borderRadius: 45 },
    pfpEmoji: { fontSize: 35 },
    changePhotoBtn: {
      paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20,
      backgroundColor: colors.primary,
    },
    changePhotoText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

    sectionContainer: {
      backgroundColor: colors.card,
      borderRadius: 12, padding: 20,
      shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.3 : 0.05, shadowRadius: 3, elevation: 2,
    },
    sectionHeading: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 15 },

    inputGroup: { marginBottom: 18 },
    label: { fontSize: 13, fontWeight: 'bold', marginBottom: 6, color: colors.primary },
    dropdownHeader: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      borderWidth: 1, borderColor: colors.border, borderRadius: 8,
      paddingHorizontal: 16, paddingVertical: 14,
      backgroundColor: colors.inputBg,
    },
    dropdownSelectedText: { fontSize: 15, color: colors.text },
    dropdownArrow: { fontSize: 12, color: colors.textSecondary },
    dropdownListContainer: {
      marginTop: 5, borderWidth: 1, borderColor: colors.border, borderRadius: 8,
      backgroundColor: colors.card, paddingVertical: 5,
    },
    dropdownOptionRow: {
      flexDirection: 'row', alignItems: 'center',
      paddingVertical: 12, paddingHorizontal: 16,
      borderBottomWidth: 0.5, borderBottomColor: isDark ? '#333' : '#F0F0F0',
    },

    radioButton: {
      width: 20, height: 20, borderRadius: 10,
      borderWidth: 1.5, borderColor: isDark ? '#666' : '#CCC',
      justifyContent: 'center', alignItems: 'center',
    },
    radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
    innerRadioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.card },
    dropdownOptionText: { fontSize: 14, color: colors.text, marginLeft: 12 },

    standardInputGroup: { marginBottom: 15 },
    standardLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, marginBottom: 5 },
    textInput: {
      borderWidth: 1, borderColor: colors.border, borderRadius: 8,
      paddingHorizontal: 12, paddingVertical: 10, fontSize: 14,
      color: colors.text, backgroundColor: isDark ? '#2A2A2A' : '#FAFAFA',
    },

    cardsContainer: { width: '100%' },
    selectionCard: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      padding: 14, borderRadius: 12, borderWidth: 1.5, marginBottom: 12,
      backgroundColor: colors.card, borderColor: isDark ? '#333' : '#EFEFEF',
    },
    cardLeftRow: { flexDirection: 'row', alignItems: 'center' },
    stateIconCircle: {
      width: 36, height: 36, borderRadius: 18,
      backgroundColor: isDark ? '#333' : '#F0F0F0', justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    cardText: { fontSize: 15, color: colors.text },

    largeGridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 5 },
    largeGridCard: {
      width: '47%', height: 135, borderRadius: 16, borderWidth: 1.5,
      justifyContent: 'center', alignItems: 'center', marginBottom: 20, paddingHorizontal: 12,
      backgroundColor: colors.inputBg, borderColor: 'transparent',
    },
    selectedLargeCard: { backgroundColor: colors.highlight, borderColor: colors.primary },
    unselectedLargeCard: { backgroundColor: colors.inputBg, borderColor: 'transparent' },
    largeGridCardText: { fontSize: 16, color: colors.text, textAlign: 'center', fontWeight: '500' },

    dietCard: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingVertical: 18, paddingHorizontal: 18, borderRadius: 16, borderWidth: 1.5, marginBottom: 16,
      backgroundColor: colors.inputBg, borderColor: 'transparent'
    },
    selectedDietCard: { backgroundColor: colors.highlight, borderColor: colors.primary },
    unselectedDietCard: { backgroundColor: colors.inputBg, borderColor: 'transparent' },
    dietIconCircle: {
      width: 42, height: 42, borderRadius: 21,
      backgroundColor: colors.card, justifyContent: 'center', alignItems: 'center',
      marginRight: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.3 : 0.1, elevation: 2,
    },
    dietCardText: { fontSize: 17, color: colors.text, fontWeight: '500' },

    heightPickerContainer: { width: '100%', alignItems: 'center', paddingVertical: 40 },
    heightRow: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      paddingVertical: 18, width: '100%',
    },
    heightRowFocused: {
      backgroundColor: colors.card, borderRadius: 12,
      borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border,
    },
    heightText: { textAlign: 'center', marginHorizontal: 20, color: colors.text },
    heightPointerLeft: { color: colors.primary, fontSize: 16, fontWeight: 'bold', marginRight: 10 },
    heightPointerRight: { color: colors.primary, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },

    complexionContainer: { width: '100%', alignItems: 'center', paddingTop: 10 },
    complexionCard: {
      width: '65%', height: 150, borderRadius: 16, borderWidth: 1.5,
      justifyContent: 'center', alignItems: 'center', marginBottom: 25,
      backgroundColor: colors.inputBg, borderColor: 'transparent'
    },
    selectedComplexionCard: { backgroundColor: colors.highlight, borderColor: colors.primary },
    unselectedComplexionCard: { backgroundColor: colors.inputBg, borderColor: 'transparent' },
    avatarBox: {
      width: 60, height: 60, borderRadius: 30, backgroundColor: colors.card,
      justifyContent: 'center', alignItems: 'center', marginBottom: 12,
      shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.3 : 0.1, elevation: 2,
    },
    complexionCardText: { fontSize: 16, color: colors.text, fontWeight: '500' },

    familyContainer: { width: '100%' },
    familySectionTitle: { fontSize: 15, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
    radioGroupRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    radioOption: { flexDirection: 'row', alignItems: 'center' },
    radioLabelText: { fontSize: 15, color: colors.text, marginLeft: 8 },
    dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
    dividerText: { marginHorizontal: 15, color: colors.textSecondary, fontSize: 14 },
    familyInput: {
      backgroundColor: colors.inputBg, borderRadius: 10,
      paddingHorizontal: 16, paddingVertical: 14, fontSize: 15,
      color: colors.text, marginBottom: 18,
    },
    companyInput: {
      backgroundColor: colors.inputBg, borderRadius: 12,
      paddingHorizontal: 18, paddingVertical: 18, fontSize: 16, color: colors.text,
    },

    timeModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
    timeModalContent: {
      width: '90%', maxHeight: '90%', backgroundColor: colors.card,
      borderRadius: 16, paddingVertical: 16, paddingHorizontal: 16, alignItems: 'center',
      shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 6,
    },
    timeModalTitle: { fontSize: 15, color: colors.textSecondary, alignSelf: 'flex-start', marginBottom: 15 },
    digitalTimeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    timeBox: {
      borderWidth: 1.5, borderColor: colors.border, borderRadius: 8,
      paddingVertical: 8, paddingHorizontal: 14, backgroundColor: isDark ? '#121212' : '#FAFAFA',
    },
    timeBoxText: { fontSize: 24, fontWeight: 'bold', color: colors.text },
    timeColon: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 8, color: colors.text },
    amPmContainer: { marginLeft: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 6, overflow: 'hidden' },
    amPmBtn: { paddingVertical: 4, paddingHorizontal: 8, backgroundColor: isDark ? '#121212' : '#FAFAFA', alignItems: 'center' },
    amPmText: { fontSize: 12, color: colors.textSecondary },

    clockFaceCircle: { 
      width: 170, height: 170, borderRadius: 85, backgroundColor: isDark ? '#121212' : '#F0F0F0', 
      position: 'relative', justifyContent: 'center', alignItems: 'center', marginVertical: 8 
    },
    clockCenterDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, left: 83, top: 81, zIndex: 5 },
    clockHandLine: { position: 'absolute', width: 58, height: 2, backgroundColor: colors.primary, left: 28, top: 84 },
    clockNodeTextContainer: { position: 'absolute', width: 10, height: 14, justifyContent: 'center', alignItems: 'center' },
    clockNum: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
    clockNodeBubble: {
      position: 'absolute', width: 10, height: 14, borderRadius: 17,
      backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center',
    },
    clockNodeBubbleText: { color: '#FFF', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },

    timeModalButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 20 },
    keyboardIconBtn: { padding: 6 },
    modalRightActions: { flexDirection: 'row', alignItems: 'center' },
    modalCancelText: { fontSize: 15, color: colors.textSecondary, marginRight: 20, fontWeight: '600' },
    modalOkBtn: { backgroundColor: colors.highlight, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8 },
    modalOkText: { fontSize: 15, color: colors.primary, fontWeight: 'bold' },

    autocompleteWrapper: { position: 'relative' },
    suggestionsBox: {
      position: 'absolute', top: 65, left: 0, right: 0,
      backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
      shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: isDark ? 0.3 : 0.1, shadowRadius: 4, elevation: 4, maxHeight: 220,
    },
    suggestionRow: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 0.5, borderBottomColor: isDark ? '#333' : '#F0F0F0' },
    suggestionText: { fontSize: 15, color: colors.text },

    hobbiesContainer: { width: '100%' },
    hobbyCategoryBox: {
      backgroundColor: colors.card, borderRadius: 14, borderWidth: 1, borderColor: colors.border,
      padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.3 : 0.04, shadowRadius: 2, elevation: 1,
    },
    hobbyCategoryTitle: { fontSize: 15, fontWeight: 'bold', color: colors.primary, marginBottom: 14 },
    tagsFlexRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    hobbyTag: {
      flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14,
      borderRadius: 22, borderWidth: 1.5, marginBottom: 8,
    },
    selectedHobbyTag: { backgroundColor: colors.highlight, borderColor: colors.primary },
    unselectedHobbyTag: { backgroundColor: isDark ? '#121212' : '#FAFAFA', borderColor: colors.border },
    hobbyTagIcon: { fontSize: 14, marginRight: 6 },
    hobbyTagText: { fontSize: 14, color: colors.text },
    viewAllButton: { alignSelf: 'center', marginTop: 8, paddingVertical: 4 },
    viewAllText: { fontSize: 14, fontWeight: 'bold', color: colors.primary },

    qualificationCard: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingVertical: 16, paddingHorizontal: 20, borderRadius: 14, borderWidth: 1.5, marginBottom: 14,
      backgroundColor: colors.card, borderColor: colors.border,
    },
    imageSelectionCard: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingVertical: 10, paddingHorizontal: 16, borderRadius: 35, borderWidth: 1.5, marginBottom: 12,
      backgroundColor: colors.card, borderColor: colors.border,
    },
    avatarCirclePlaceholder: {
      width: 44, height: 44, borderRadius: 22, backgroundColor: isDark ? '#333' : '#E0E0E0',
      justifyContent: 'center', alignItems: 'center', marginRight: 14,
    },
    selectedQualificationCard: { backgroundColor: colors.highlight, borderColor: colors.primary },
    unselectedQualificationCard: { backgroundColor: isDark ? '#1E1E1E' : '#FAFAFA', borderColor: isDark ? '#333' : '#EFEFEF' },
    qualificationCardText: { fontSize: 16, color: colors.text, fontWeight: '500' },

    bottomButtonRow: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 25, paddingVertical: 15,
      backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: isDark ? '#333' : '#EFEFEF',
    },
    skipButton: { paddingVertical: 10 },
    skipButtonText: { color: '#FF3B30', fontSize: 15, fontWeight: 'bold' },
    nextButtonFixed: { width: 130, height: 45, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    nextButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
    modalContent: {
      width: '80%', backgroundColor: colors.card, borderRadius: 12, padding: 20, alignItems: 'center',
    },
    modalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, color: colors.text },
    modalOption: {
      width: '100%', paddingVertical: 12, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: isDark ? '#333' : '#F0F0F0',
    },
    cancelOption: { borderBottomWidth: 0, marginTop: 5 },
    modalOptionText: { fontSize: 15, color: colors.text, fontWeight: '500' },
  });
};