import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';

export type PickedFile = {name: string; size: string; uri?: string; bytes?: number};

export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  Profile: undefined;
  Services: undefined;
  Calculator: {prefillTnvedCode?: string; prefillKind?: 'deposit' | 'tpin'} | undefined;
  Tnved: undefined;
  Accounts: undefined;
  Rates: undefined;
  LicenseDetail: {licenseId: string};
  ContractDetail: {contractId: string};
  Choice: undefined;
  AIRecognized: undefined;
  FilePreview: {files: PickedFile[]} | undefined;
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
