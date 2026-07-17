import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {Card} from '../components/Card';
import {ScreenHeader} from '../components/ScreenHeader';
import {OutlineButton} from '../components/Buttons';
import {DownloadIcon, WarningIcon} from '../components/Icon';
import {licenses} from '../data/mockData';
import {RootScreenProps} from '../navigation/types';

export default function LicenseDetailScreen({navigation, route}: RootScreenProps<'LicenseDetail'>) {
  const {colors} = useTheme();
  const license = licenses.find(l => l.id === route.params.licenseId) ?? licenses[0];

  const rows: [string, string, string?][] = [
    ['Тип лицензии', license.type],
    ['Выдана', license.issuer],
    ['Дата выдачи', license.issueDate],
    ['Действует до', license.validTo, 'red'],
    ...(license.daysLeft ? ([['Осталось', license.daysLeft, 'orange']] as [string, string, string][]) : []),
    ['Статус', license.status === 'active' ? 'Действующая' : 'Истекает скоро'],
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title={license.type} subtitle={`Регистрационный номер: ${license.number}`} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.body}>
        <Card>
          {rows.map(([label, value, tone], idx) => (
            <View
              key={label}
              style={[
                styles.row,
                idx < rows.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
              ]}>
              <Text style={[styles.label, {color: colors.textMuted}]}>{label}</Text>
              <Text
                style={[
                  styles.value,
                  {color: tone === 'red' ? colors.red : tone === 'orange' ? colors.orange : colors.textPrimary},
                ]}>
                {value}
              </Text>
            </View>
          ))}
        </Card>

        <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>Товары по лицензии</Text>
        <Card style={{paddingVertical: 4}}>
          {(license.goods ?? []).map((g, idx) => (
            <View
              key={g.name}
              style={[
                styles.goodsRow,
                idx < (license.goods?.length ?? 1) - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
              ]}>
              <Text style={[styles.goodsName, {color: colors.textPrimary}]}>{g.name}</Text>
              <Text style={[styles.goodsQty, {color: colors.textMuted}]}>{g.qty}</Text>
            </View>
          ))}
        </Card>

        {license.alert ? (
          <View style={[styles.alertBox, {backgroundColor: colors.warningBg, borderColor: colors.warningBorder}]}>
            <WarningIcon size={18} color={colors.warningIcon} />
            <Text style={[styles.alertText, {color: colors.warningText}]}>{license.alert}</Text>
          </View>
        ) : null}

        <OutlineButton label="Скачать PDF" icon={<DownloadIcon size={16} color={colors.brand600} />} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 20, paddingBottom: 40, gap: 16},
  row: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 11},
  label: {fontSize: 13},
  value: {fontSize: 13, fontWeight: '600'},
  sectionTitle: {fontSize: 13, fontWeight: '700', marginBottom: -4},
  goodsRow: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 8},
  goodsName: {fontSize: 13, flex: 1, paddingRight: 8},
  goodsQty: {fontSize: 12},
  alertBox: {flexDirection: 'row', gap: 10, padding: 14, borderRadius: 12, borderWidth: 1},
  alertText: {fontSize: 13, lineHeight: 18, flex: 1},
});
