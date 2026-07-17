import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {ChevronLeftIcon} from './Icon';

export function BackLink({label = 'Назад', onPress}: {label?: string; onPress: () => void}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={styles.backRow} onPress={onPress} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
      <ChevronLeftIcon size={18} color={colors.brand600} strokeWidth={2} />
      <Text style={[styles.backText, {color: colors.brand600}]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  backLabel,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
}) {
  const {colors} = useTheme();
  return (
    <View style={[styles.header, {backgroundColor: colors.bgHeader, borderBottomColor: colors.borderColor}]}>
      {onBack ? <BackLink label={backLabel} onPress={onBack} /> : null}
      <Text style={[styles.title, {color: colors.textPrimary}]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, {color: colors.textMuted}]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },
});
