import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

export function Card({children, style}: {children: React.ReactNode; style?: ViewStyle}) {
  const {colors} = useTheme();
  return (
    <View style={[styles.card, {backgroundColor: colors.bgCard, borderColor: colors.borderColor}, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 3},
    elevation: 2,
  },
});
