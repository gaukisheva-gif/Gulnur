import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {PrimaryButton} from '../components/Buttons';
import {RootScreenProps} from '../navigation/types';

const mockFiles = [
  {name: 'invoice_INV-2026-0612.pdf', size: '1.2 МБ'},
  {name: 'packing_list.xlsx', size: '84 КБ'},
];

export default function FilePreviewScreen({navigation}: RootScreenProps<'FilePreview'>) {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title="Файлы выбраны" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.body}>
        <Card style={{gap: 0, padding: 0, overflow: 'hidden'}}>
          {mockFiles.map((f, idx) => (
            <View
              key={f.name}
              style={[
                styles.fileRow,
                idx < mockFiles.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
              ]}>
              <Text style={[styles.fileName, {color: colors.textPrimary}]} numberOfLines={1}>
                {f.name}
              </Text>
              <Text style={{color: colors.textMuted, fontSize: 12}}>{f.size}</Text>
            </View>
          ))}
        </Card>

        <View style={[styles.totalRow, {backgroundColor: colors.bgCard}]}>
          <View>
            <Text style={{color: colors.textSecondary, fontSize: 13}}>Итого файлов: {mockFiles.length}</Text>
            <Text style={{color: colors.textMuted, fontSize: 11, marginTop: 2}}>1.3 МБ</Text>
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
  fileRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14},
  fileName: {fontSize: 14, fontWeight: '500', flex: 1, paddingRight: 8},
  totalRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 16, padding: 14},
  readyBadge: {borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4},
});
