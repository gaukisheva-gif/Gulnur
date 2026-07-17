import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {PrimaryButton} from '../components/Buttons';
import {RootScreenProps} from '../navigation/types';

const fields: {label: string; value: string; status: 'green' | 'orange' | 'gray'}[] = [
  {label: 'Отправитель', value: 'Shenzhen Huaqiang Electronics Co., Ltd', status: 'green'},
  {label: 'Получатель', value: 'ТОО «Аруна Импорт», БИН 180940012345', status: 'green'},
  {label: 'Инвойс № / дата', value: 'INV-2026-0612 · 02.06.2026', status: 'green'},
  {label: 'Стоимость по инвойсу', value: '48 750.00 USD', status: 'orange'},
  {label: 'Вес брутто', value: '18 420 кг', status: 'gray'},
  {label: 'Страна происхождения', value: 'Китай (CN)', status: 'green'},
  {label: 'Описание товара', value: 'Ноутбуки 14", Intel Core i5, 16 ГБ ОЗУ — 650 шт.', status: 'orange'},
  {label: 'Условия поставки', value: 'CIF Алматы (Инкотермс 2020)', status: 'green'},
];

const statusLabels = {green: 'Распознано', orange: 'Проверьте', gray: 'Исправлено вручную'};

export default function AIRecognizedScreen({navigation}: RootScreenProps<'AIRecognized'>) {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader
        title="Черновик ДТ"
        subtitle="INV-2026-0612 · 8 полей из 8 · проверьте отмеченные"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <Card style={{gap: 0, padding: 0, overflow: 'hidden'}}>
          {fields.map((f, idx) => (
            <View
              key={f.label}
              style={[
                styles.row,
                idx < fields.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
              ]}>
              <View style={{flex: 1, paddingRight: 12}}>
                <Text style={[styles.label, {color: colors.textMuted}]}>{f.label}</Text>
                <Text style={[styles.value, {color: colors.textPrimary}]}>{f.value}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      f.status === 'green' ? colors.greenBg : f.status === 'orange' ? colors.orangeBg : colors.grayBg,
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: f.status === 'green' ? colors.green : f.status === 'orange' ? colors.orange : colors.textMuted,
                  }}>
                  {statusLabels[f.status]}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        <Card style={{gap: 0, padding: 16}}>
          <Text style={[styles.draftTitle, {color: brand.teal600}]}>Черновик ДТ</Text>
          {[
            ['Процедура', 'ИМ40'],
            ['Товар', 'Ноутбуки 14" · 650 шт'],
            ['ТН ВЭД', '8471 30 000 1 · 94%'],
            ['ТПиН', '2 822 539 ₸'],
          ].map(([label, value], idx, arr) => (
            <View
              key={label}
              style={[
                styles.draftRow,
                idx < arr.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
              ]}>
              <Text style={{color: colors.textSecondary, fontSize: 14}}>{label}</Text>
              <Text style={{color: colors.textPrimary, fontSize: 14, fontWeight: '600'}}>{value}</Text>
            </View>
          ))}
        </Card>

        <PrimaryButton
          label="Сохранить черновик ДТ"
          onPress={() => {
            Alert.alert('Черновик сохранён', 'Черновик ДТ добавлен в раздел «Документы».', [
              {text: 'ОК', onPress: () => navigation.navigate('Main')},
            ]);
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 20, gap: 16, paddingBottom: 40},
  row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 14},
  label: {fontSize: 12, marginBottom: 2},
  value: {fontSize: 15, fontWeight: '500', lineHeight: 20},
  statusBadge: {borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3, marginTop: 2},
  draftTitle: {fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10},
  draftRow: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10},
});
