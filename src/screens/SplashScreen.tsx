import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {RootScreenProps} from '../navigation/types';

export default function SplashScreen({navigation}: RootScreenProps<'Splash'>) {
  const {colors} = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Landing'), 1200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <View style={[styles.logoCircle, {backgroundColor: brand.teal600}]}>
        <Text style={styles.logoLetter}>B</Text>
      </View>
      <Text style={[styles.title, {color: colors.textPrimary}]}>BROK.KZ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoLetter: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});
