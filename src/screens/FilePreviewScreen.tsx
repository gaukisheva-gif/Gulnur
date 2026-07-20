import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {isErrorWithCode, errorCodes, pick, types} from '@react-native-documents/picker';
import {useTheme} from '../theme/ThemeContext';
import {Card} from '../components/Card';
import {ScreenHeader} from '../components/ScreenHeader';
import {PrimaryButton} from '../components/Buttons';
import {TrashIcon, PlusIcon} from '../components/Icon';
import {useToast} from '../components/Toast';
import {brand} from '../theme/colors';
import {PickedFile, RootScreenProps} from '../navigation/types';

const fallbackFiles: PickedFile[] = [
  {name: 'invoice_INV-2026-0612.pdf', size: '1.2 МБ', bytes: 1_258_291},
  {name: 'packing_list.xlsx', size: '84 КБ', bytes: 86_016},
];

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

export default function FilePreviewScreen({navigation, route}: RootScreenProps<'FilePreview'>) {
  const {colors} = useTheme();
  const {showToast} = useToast();
  const [files, setFiles] = useState<PickedFile[]>(route.params?.files?.length ? route.params.files : fallbackFiles);

  const totalBytes = files.reduce((sum, f) => sum + (f.bytes ?? 0), 0);
  const knownAllSizes = files.every(f => f.bytes !== undefined);

  const removeFile = (idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    if (next.length === 0) {
      navigation.goBack();
      return;
    }
    setFiles(next);
  };

  const addMoreFiles = async () => {
    try {
      const results = await pick({type: [types.pdf, types.xls, types.xlsx, types.images], allowMultiSelection: true});
      const picked: PickedFile[] = results.map(r => ({
        name: r.name ?? 'файл',
        size: r.size ? formatSize(r.size) : '—',
        uri: r.uri,
        bytes: r.size ?? undefined,
      }));
      if (picked.length) setFiles(prev => [...prev, ...picked]);
    } catch (e) {
      if (isErrorWithCode(e) && e.code === errorCodes.OPERATION_CANCELED) return;
      showToast('Не удалось выбрать файл', 'Попробуйте ещё раз');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title="Файлы выбраны" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.body}>
        <Card style={{gap: 0, padding: 0, overflow: 'hidden'}}>
          {files.map((f, idx) => (
            <View
              key={f.name + idx}
              style={[
                styles.fileRow,
                idx < files.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
              ]}>
              <Text style={[styles.fileName, {color: colors.textPrimary}]} numberOfLines={1}>
                {f.name}
              </Text>
              <Text style={{color: colors.textMuted, fontSize: 12}}>{f.size}</Text>
              <TouchableOpacity onPress={() => removeFile(idx)} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}} style={styles.removeBtn}>
                <TrashIcon size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </Card>

        <TouchableOpacity style={[styles.addMoreBtn, {borderColor: colors.borderInput, backgroundColor: colors.bgScreen}]} onPress={addMoreFiles}>
          <PlusIcon size={14} color={brand.teal600} strokeWidth={2.5} />
          <Text style={{color: brand.teal600, fontSize: 13, fontWeight: '600'}}>Добавить ещё файлы</Text>
        </TouchableOpacity>

        <View style={[styles.totalRow, {backgroundColor: colors.bgCard}]}>
          <View>
            <Text style={{color: colors.textSecondary, fontSize: 13}}>Итого файлов: {files.length}</Text>
            {knownAllSizes ? (
              <Text style={{color: colors.textMuted, fontSize: 11, marginTop: 2}}>Общий размер: {formatSize(totalBytes)}</Text>
            ) : null}
          </View>
          <View style={[styles.readyBadge, {backgroundColor: colors.greenBg}]}>
            <Text style={{color: colors.green, fontSize: 13, fontWeight: '600'}}>Готово к отправке</Text>
          </View>
        </View>

        <PrimaryButton label="Отправить на распознавание →" onPress={() => navigation.replace('AIRecognized')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 20, gap: 16, paddingBottom: 40},
  fileRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, gap: 8},
  fileName: {fontSize: 14, fontWeight: '500', flex: 1},
  removeBtn: {padding: 2},
  addMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 12,
  },
  totalRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 16, padding: 14},
  readyBadge: {borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4},
});
