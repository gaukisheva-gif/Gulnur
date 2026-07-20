import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {PrimaryButton, SecondaryButton} from './Buttons';
import {SelectField} from './Field';
import {contracts} from '../data/mockData';

const activeContracts = contracts.filter(c => c.status === 'active');

type Props = {
  visible: boolean;
  onClose: () => void;
  onPickCamera: (contractNumber: string) => void;
  onPickFile: (contractNumber: string) => void;
};

export function AddDocumentModal({visible, onClose, onPickCamera, onPickFile}: Props) {
  const {colors} = useTheme();
  const options = activeContracts.map(c => `${c.number} · ${c.partner}`);
  const [selected, setSelected] = useState(options[0] ?? '');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.sheet, {backgroundColor: colors.bgCard}]}>
          <View style={styles.handle} />
          <Text style={[styles.title, {color: colors.textPrimary}]}>Добавить документ</Text>
          <Text style={[styles.label, {color: colors.textSecondary}]}>
            Выберите контракт, к которому прикрепить документ:
          </Text>
          <SelectField value={selected} options={options} onChange={setSelected} />

          <PrimaryButton
            label="📷  Сфотографировать документ"
            onPress={() => onPickCamera(selected)}
            style={styles.actionBtn}
          />
          <SecondaryButton
            label="📎  Выбрать файл (PDF, JPG)"
            onPress={() => onPickFile(selected)}
            style={styles.actionBtn}
          />

          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={{color: colors.textSecondary, fontSize: 16, fontWeight: '500'}}>Отмена</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end'},
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
    gap: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(148,163,184,0.4)',
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {fontSize: 20, fontWeight: '700'},
  label: {fontSize: 14, lineHeight: 20, marginBottom: 2},
  actionBtn: {marginTop: 4},
  cancelBtn: {alignItems: 'center', paddingVertical: 10, marginTop: 4},
});
