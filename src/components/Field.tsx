import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {ChevronRightIcon} from './Icon';

export function FieldLabel({label, required}: {label: string; required?: boolean}) {
  const {colors} = useTheme();
  return (
    <Text style={[styles.label, {color: colors.textMuted}]}>
      {label}
      {required ? <Text style={{color: '#ef4444'}}> *</Text> : null}
    </Text>
  );
}

export function TextField(props: TextInputProps & {label?: string; required?: boolean}) {
  const {colors} = useTheme();
  const {label, required, style, ...rest} = props;
  return (
    <View>
      {label ? <FieldLabel label={label} required={required} /> : null}
      <TextInput
        placeholderTextColor={colors.inputPlaceholder}
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.inputBorder,
            color: colors.inputText,
          },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}

export function SelectField({
  label,
  required,
  value,
  placeholder = 'Выберите...',
  options,
  onChange,
}: {
  label?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const {colors} = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <View>
      {label ? <FieldLabel label={label} required={required} /> : null}
      <TouchableOpacity
        style={[styles.select, {backgroundColor: colors.inputBg, borderColor: colors.inputBorder}]}
        onPress={() => setOpen(true)}>
        <Text
          style={[
            styles.selectText,
            {color: value ? colors.inputText : colors.inputPlaceholder},
          ]}
          numberOfLines={1}>
          {value || placeholder}
        </Text>
        <ChevronRightIcon size={14} color={colors.textMuted} strokeWidth={2} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <Pressable style={[styles.modalSheet, {backgroundColor: colors.bgCard}]}>
            <Text style={[styles.modalTitle, {color: colors.textPrimary}]}>{label || placeholder}</Text>
            <FlatList
              data={options}
              keyExtractor={(item, idx) => item + idx}
              style={{maxHeight: 320}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[styles.modalOption, {borderBottomColor: colors.borderColor}]}
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}>
                  <Text
                    style={[
                      styles.modalOptionText,
                      {color: item === value ? colors.brand600 : colors.textPrimary},
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 8,
    fontSize: 14,
    borderWidth: 1,
  },
  select: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 14,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 15,
  },
});
