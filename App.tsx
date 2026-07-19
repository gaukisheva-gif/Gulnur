/**
 * BROK.KZ — customs broker mobile app
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider, useTheme} from './src/theme/ThemeContext';
import {ToastProvider} from './src/components/Toast';
import RootNavigator from './src/navigation/RootNavigator';

function AppContent() {
  const {isDark, colors} = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: colors.brand600,
          background: colors.bgScreen,
          card: colors.bgCard,
          text: colors.textPrimary,
          border: colors.borderColor,
          notification: '#ef4444',
        },
        fonts: {
          regular: {fontFamily: 'System', fontWeight: '400'},
          medium: {fontFamily: 'System', fontWeight: '500'},
          bold: {fontFamily: 'System', fontWeight: '700'},
          heavy: {fontFamily: 'System', fontWeight: '800'},
        },
      }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.statusBarBg} />
      <ToastProvider>
        <RootNavigator />
      </ToastProvider>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
