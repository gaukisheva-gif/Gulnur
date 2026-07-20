import React from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {PrimaryButton} from './Buttons';

type Props = {
  visible: boolean;
  icon: React.ReactNode;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function PermissionRationaleModal({
  visible,
  icon,
  title,
  message,
  confirmLabel = 'Разрешить',
  onConfirm,
  onCancel,
}: Props) {
  const {colors} = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={[styles.sheet, {backgroundColor: colors.bgCard}]}>
          <View style={[styles.iconBadge, {backgroundColor: colors.brand50}]}>{icon}</View>
          <Text style={[styles.title, {color: colors.textPrimary}]}>{title}</Text>
          <Text style={[styles.message, {color: colors.textSecondary}]}>{message}</Text>
          <PrimaryButton label={confirmLabel} onPress={onConfirm} style={{width: '100%', marginTop: 4}} />
          <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
            <Text style={{color: colors.textMuted, fontSize: 14, fontWeight: '600'}}>Не сейчас</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 24},
  sheet: {borderRadius: 20, padding: 24, alignItems: 'center', gap: 8},
  iconBadge: {width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8},
  title: {fontSize: 17, fontWeight: '700', textAlign: 'center'},
  message: {fontSize: 13.5, lineHeight: 20, textAlign: 'center', marginBottom: 4},
  cancelBtn: {padding: 10, marginTop: 2},
});
