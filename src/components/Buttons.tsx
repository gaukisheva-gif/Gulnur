import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({label, onPress, icon, loading, disabled, style}: PrimaryButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} disabled={disabled || loading} style={style}>
      <LinearGradient
        colors={[brand.teal400, brand.teal500, brand.teal600]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.primaryBtn, disabled ? styles.disabled : null]}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            {icon}
            <Text style={styles.primaryBtnText}>{label}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function SecondaryButton({label, onPress, style}: {label: string; onPress?: () => void; style?: ViewStyle}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.secondaryBtn, {borderColor: brand.teal600}, style]}>
      <Text style={[styles.secondaryBtnText, {color: colors.loginEcpText}]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function OutlineButton({
  label,
  onPress,
  icon,
  style,
}: {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.outlineBtn, {borderColor: colors.borderInput, backgroundColor: colors.bgScreen}, style]}>
      {icon}
      <Text style={[styles.outlineBtnText, {color: colors.brand600}]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function FilterChip({
  label,
  count,
  active,
  onPress,
}: {
  label: string;
  count?: number;
  active?: boolean;
  onPress?: () => void;
}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? colors.brand600 : colors.bgCard,
          borderColor: active ? colors.brand600 : colors.borderInput,
        },
      ]}>
      <Text style={[styles.chipText, {color: active ? '#fff' : colors.textSecondary}]}>{label}</Text>
      {count !== undefined ? (
        <View
          style={[
            styles.chipBadge,
            {backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)'},
          ]}>
          <Text style={[styles.chipBadgeText, {color: active ? '#fff' : colors.textSecondary}]}>{count}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryBtn: {
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 999,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 12,
  },
  outlineBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  chipBadge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  chipBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
