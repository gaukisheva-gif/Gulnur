import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import MainTabs from './MainTabs';
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import TnvedScreen from '../screens/TnvedScreen';
import AccountsScreen from '../screens/AccountsScreen';
import RatesScreen from '../screens/RatesScreen';
import LicenseDetailScreen from '../screens/LicenseDetailScreen';
import ContractDetailScreen from '../screens/ContractDetailScreen';
import CameraScreen from '../screens/CameraScreen';
import AIRecognizedScreen from '../screens/AIRecognizedScreen';
import FilePreviewScreen from '../screens/FilePreviewScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsScreen from '../screens/TermsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
      <Stack.Screen name="Tnved" component={TnvedScreen} />
      <Stack.Screen name="Accounts" component={AccountsScreen} />
      <Stack.Screen name="Rates" component={RatesScreen} />
      <Stack.Screen name="LicenseDetail" component={LicenseDetailScreen} />
      <Stack.Screen name="ContractDetail" component={ContractDetailScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{presentation: 'fullScreenModal'}} />
      <Stack.Screen name="AIRecognized" component={AIRecognizedScreen} />
      <Stack.Screen name="FilePreview" component={FilePreviewScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
    </Stack.Navigator>
  );
}
