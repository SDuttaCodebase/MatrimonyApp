// App.js
import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './src/screens/Auth/SplashScreen';
import OnboardingScreen from './src/screens/Auth/OnboardingScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import OtpScreen from './src/screens/Auth/OtpScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import RegisterStep2Screen from './src/screens/Auth/RegisterStep2Screen';
import RegisterStep3Screen from './src/screens/Auth/RegisterStep3Screen';
import RegisterStep4Screen from './src/screens/Auth/RegisterStep4Screen';
import AddProfilePicScreen from './src/screens/Auth/AddProfilePicScreen';
import VerificationPendingScreen from './src/screens/Auth/VerificationPendingScreen';     
import RegistrationSuccessScreen from './src/screens/Auth/RegistrationSuccessScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import ProfileDetailScreen from './src/screens/Home/ProfileDetailScreen';
import FullScreenImageViewer from './src/screens/Home/FullScreenImageViewer';
import ShortlistScreen from './src/screens/Home/ShortlistScreen';
import SearchScreen from './src/screens/Home/SearchScreen';
import VerifiedSoulmatesScreen from './src/screens/Home/VerifiedSoulmatesScreen';
import FilterScreen from './src/screens/Home/FilterScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import NotificationScreen from './src/screens/Home/NotificationScreen';
import SettingsScreen from './src/screens/Home/SettingsScreen';
import AccountScreen from './src/screens/Home/AccountScreen';
import ChangePasswordScreen from './src/screens/Home/ChangePasswordScreen';
import ChangePassOTPScreen from './src/screens/Home/ChangePassOTPScreen';
import NewPasswordScreen from './src/screens/Home/NewPasswordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OTP" component={OtpScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} />
          <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} />
          <Stack.Screen name="RegisterStep4" component={RegisterStep4Screen} />
          <Stack.Screen name="AddProfilePic" component={AddProfilePicScreen} />
          <Stack.Screen name="VerificationPending" component={VerificationPendingScreen} />
          <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccessScreen} />
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
          <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
          <Stack.Screen name="FullScreenImageViewer" component={FullScreenImageViewer} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="VerifiedSoulmates" component={VerifiedSoulmatesScreen} />
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Shortlist" component={ShortlistScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
          <Stack.Screen name="ChangePassOTP" component={ChangePassOTPScreen} />
          <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});