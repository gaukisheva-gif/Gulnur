import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {isErrorWithCode, errorCodes, pick, types} from '@react-native-documents/picker';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {OutlineButton, PrimaryButton} from '../components/Buttons';
import {UploadIcon, ClipIcon} from '../components/Icon';
import {PermissionRationaleModal} from '../components/PermissionRationaleModal';
import {useToast} from '../components/Toast';
import {MainTabScreenProps} from '../navigation/types';

function formatSize(bytes: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

export default function ChoiceScreen({navigation}: MainTabScreenProps<'NewDeclaration'>) {
  const {colors} = useTheme();
  const {showToast} = useToast();
  const [rationaleVisible, setRationaleVisible] = useState(false);

  const pickFiles = async () => {
    try {
      // Uses the system document/file picker (Storage Access Framework on Android,
      // UIDocumentPickerViewController on iOS) — no storage permission is required.
      const results = await pick({type: [types.pdf, types.xls, types.xlsx, types.images], allowMultiSelection: true});
      const files = results.map(r => ({name: r.name ?? 'файл', size: formatSize(r.size), uri: r.uri}));
      if (!files.length) return;
      navigation.navigate('FilePreview', {files});
    } catch (e) {
      if (isErrorWithCode(e) && e.code === errorCodes.OPERATION_CANCELED) return;
      showToast('Не удалось выбрать файл', 'Попробуйте ещё раз');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <LinearGradient colors={[brand.teal400, brand.teal500, brand.teal600]} style={styles.header}>
        <View style={styles.headerIcon}>
          <UploadIcon size={28} color="#fff" />
        </View>
        <Text style={styles.title}>Загрузите документ</Text>
        <Text style={styles.subtitle}>PDF, XLS или JPG · до 25 МБ</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.dropzone, {backgroundColor: colors.bgCard, borderColor: colors.borderInput}]}>
          <Text style={{color: colors.textMuted, fontSize: 14}}>Перетащите файлы сюда</Text>
          <PrimaryButton
            label="Добавить документ к контракту"
            onPress={() => setRationaleVisible(true)}
            style={{width: '100%', marginTop: 10}}
          />
        </View>

        <OutlineButton label="Сфотографировать инвойс" onPress={() => navigation.navigate('Camera')} />

        <View style={[styles.hintBox, {backgroundColor: colors.brand50, borderColor: colors.brand100}]}>
          <Text style={[styles.hintTitle, {color: colors.textPrimary}]}>Как это работает</Text>
          <Text style={[styles.hintText, {color: colors.textSecondary}]}>
            Загрузите инвойс, упаковочный лист или другой документ — мы распознаем данные и сохраним черновик ДТ в
            разделе «Документы».
          </Text>
        </View>
      </ScrollView>

      <PermissionRationaleModal
        visible={rationaleVisible}
        icon={<ClipIcon size={26} color={brand.teal600} />}
        title="Доступ к файлам"
        message="Чтобы прикрепить документ к контракту, откроется системный выбор файлов. Приложение получает доступ только к тому файлу, который вы сами выберете, — не ко всему хранилищу устройства."
        onConfirm={() => {
          setRationaleVisible(false);
          pickFiles();
        }}
        onCancel={() => setRationaleVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {paddingHorizontal: 20, paddingTop: 28, paddingBottom: 24, alignItems: 'center'},
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 4},
  subtitle: {color: 'rgba(255,255,255,0.82)', fontSize: 14},
  body: {padding: 20, gap: 16},
  dropzone: {borderRadius: 16, borderWidth: 1.5, borderStyle: 'dashed', padding: 24, alignItems: 'center'},
  hintBox: {borderRadius: 14, borderWidth: 1, padding: 16, gap: 4},
  hintTitle: {fontSize: 13, fontWeight: '600'},
  hintText: {fontSize: 13, lineHeight: 19},
});
