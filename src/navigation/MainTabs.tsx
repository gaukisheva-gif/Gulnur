import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {BellIcon, DocumentsIcon, GridIcon, HomeIcon, PlusIcon} from '../components/Icon';
import {MainTabParamList} from './types';
import HomeScreen from '../screens/HomeScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import ChoiceScreen from '../screens/ChoiceScreen';
import ServicesScreen from '../screens/ServicesScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: brand.teal600,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.tabBarBorder,
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {fontSize: 10, fontWeight: '600'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Главная', tabBarIcon: ({color, size}) => <HomeIcon color={color} size={size} />}}
      />
      <Tab.Screen
        name="Documents"
        component={DocumentsScreen}
        options={{tabBarLabel: 'Документы', tabBarIcon: ({color, size}) => <DocumentsIcon color={color} size={size} />}}
      />
      <Tab.Screen
        name="NewDeclaration"
        component={ChoiceScreen}
        options={{
          tabBarLabel: 'Новая ДТ',
          tabBarIcon: ({color, size}) => <PlusIcon color={color} size={size} strokeWidth={2.5} />,
        }}
      />
      <Tab.Screen
        name="ServicesTab"
        component={ServicesScreen}
        options={{tabBarLabel: 'Сервисы', tabBarIcon: ({color, size}) => <GridIcon color={color} size={size} strokeWidth={1.6} />}}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Сообщения',
          tabBarIcon: ({color, size}) => (
            <View>
              <BellIcon color={color} size={size} />
            </View>
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}
