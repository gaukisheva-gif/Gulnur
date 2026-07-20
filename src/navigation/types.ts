import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Profile: undefined;
  Services: undefined;
  Calculator: {prefillTnvedCode?: string; prefillKind?: 'deposit' | 'tpin'} | undefined;
  Tnved: undefined;
  Accounts: undefined;
  Rates: undefined;
  LicenseDetail: {licenseId: string};
  ContractDetail: {contractId: string};
  Choice: undefined;
  Camera: undefined;
  AIRecognized: undefined;
  FilePreview: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Documents: undefined;
  NewDeclaration: undefined;
  ServicesTab: undefined;
  Notifications: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
