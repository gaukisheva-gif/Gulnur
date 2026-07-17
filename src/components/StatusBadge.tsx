import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

export type StatusColor = 'green' | 'orange' | 'red' | 'gray' | 'blue';

const map = {
  green: {bg: 'greenBg', fg: 'green', border: 'greenBorder'},
  orange: {bg: 'orangeBg', fg: 'orange', border: 'orangeBorder'},
  red: {bg: 'redBg', fg: 'red', border: 'redBorder'},
  gray: {bg: 'grayBg', fg: 'textMuted', border: 'borderColor'},
  blue: {bg: 'brand50', fg: 'blue', border: 'brand100'},
} as const;

export function StatusBadge({label, color}: {label: string; color: StatusColor}) {
  const {colors} = useTheme();
  const tone = map[color];
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors[tone.bg as keyof typeof colors],
          borderColor: colors[tone.border as keyof typeof colors],
        },
      ]}>
      <View style={[styles.dot, {backgroundColor: colors[tone.fg as keyof typeof colors]}]} />
      <Text style={[styles.text, {color: colors[tone.fg as keyof typeof colors]}]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
