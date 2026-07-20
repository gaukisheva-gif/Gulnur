import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {SelectField} from '../components/Field';
import {DownloadIcon, RefreshIcon} from '../components/Icon';
import {WriteoffDetailModal} from '../components/WriteoffDetailModal';
import {useToast} from '../components/Toast';
import {kbkRows} from '../data/mockData';
import {RootScreenProps} from '../navigation/types';

const periodOptions = [
  'Сегодня',
  'Последние 7 дней',
  'Этот месяц (01.06.2026 – 25.06.2026)',
  'Прошлый месяц',
  'Весь период',
];

export default function AccountsScreen({navigation}: RootScreenProps<'Accounts'>) {
  const {colors} = useTheme();
  const {showToast} = useToast();
  const [period, setPeriod] = useState(periodOptions[2]);
  const [kbk, setKbk] = useState('Все КБК');
  const [refreshing, setRefreshing] = useState(false);
  const [activeRow, setActiveRow] = useState<(typeof kbkRows)[number] | null>(null);

  const kbkOptions = ['Все КБК', ...kbkRows.map(r => `${r.code} — ${r.name}`)];

  const requestUpdate = () => {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('Сальдо обновлено', 'Данные подтянуты из АРМ налогоплательщика КГД');
    }, 1500);
  };

  const downloadReport = () => {
    showToast('Отчёт формируется', `Период: ${period} · КБК: ${kbk}`);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader
        title="Сальдо лицевого счёта в КГД"
        subtitle="Авансовые остатки по кодам бюджетной классификации (КБК). Используются при списании ТПиН и пошлин."
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.demoBanner, {backgroundColor: colors.warningBg, borderColor: colors.warningBorder}]}>
          <Text style={{color: colors.warningText, fontSize: 11, lineHeight: 16}}>
            Демо-данные. В реальной интеграции значения подтягиваются из АРМ налогоплательщика КГД.
          </Text>
        </View>

        <Card>
          <Text style={[styles.kpiLabel, {color: colors.textMuted}]}>Общее сальдо</Text>
          <Text style={[styles.kpiValue, {color: colors.green}]}>₸1 102 600</Text>
          <Text style={[styles.kpiSub, {color: colors.textMuted}]}>Остаток на 25.06.2026</Text>
        </Card>

        <Card style={{gap: 10}}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>Выписка по списаниям</Text>
          <Text style={{color: colors.textSecondary, fontSize: 12, lineHeight: 17}}>
            Укажите период и КБК — сформируем PDF со списаниями по декларациям (ДТ), с суммой по каждой.
          </Text>
          <SelectField label="Период" value={period} options={periodOptions} onChange={setPeriod} />
          <SelectField label="КБК" value={kbk} options={kbkOptions} onChange={setKbk} />
          <TouchableOpacity style={[styles.pdfBtn, {backgroundColor: brand.teal600}]} onPress={downloadReport}>
            <DownloadIcon size={14} color="#fff" />
            <Text style={styles.pdfBtnText}>Скачать PDF</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>Разбивка по КБК</Text>
          <TouchableOpacity style={styles.refreshBtn} onPress={requestUpdate} disabled={refreshing}>
            {refreshing ? (
              <ActivityIndicator size="small" color={brand.teal600} />
            ) : (
              <RefreshIcon size={14} color={brand.teal600} />
            )}
            <Text style={{color: brand.teal600, fontSize: 12, fontWeight: '700'}}>Запросить актуальное</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.tableWrap, {backgroundColor: colors.bgCard, borderColor: colors.borderColor}]}>
          {kbkRows.map((row, idx) => (
            <TouchableOpacity
              key={row.code}
              style={[
                styles.kbkRow,
                idx < kbkRows.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
              ]}
              onPress={() => setActiveRow(row)}>
              <Text style={[styles.kbkCode, {color: brand.teal600}]}>{row.code}</Text>
              <View style={{flex: 1}}>
                <Text style={[styles.kbkName, {color: colors.textPrimary}]}>{row.name}</Text>
                <Text style={[styles.kbkNote, {color: colors.textMuted}]}>{row.note}</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={[
                    styles.kbkAmount,
                    {color: row.balance === '0' ? colors.textMuted : colors.green},
                  ]}>
                  {row.balance}
                </Text>
                <Text style={[styles.kbkAmountSub, {color: colors.textMuted}]}>{row.written}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <WriteoffDetailModal row={activeRow} onClose={() => setActiveRow(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 16, paddingBottom: 40, gap: 14},
  demoBanner: {borderRadius: 8, borderWidth: 1, padding: 10},
  kpiLabel: {fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6},
  kpiValue: {fontSize: 26, fontWeight: '700', letterSpacing: -0.5},
  kpiSub: {fontSize: 11, marginTop: 4},
  sectionTitle: {fontSize: 15, fontWeight: '700'},
  sectionHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6},
  refreshBtn: {flexDirection: 'row', alignItems: 'center', gap: 5},
  pdfBtn: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 8, paddingVertical: 12},
  pdfBtnText: {color: '#fff', fontSize: 13, fontWeight: '700'},
  tableWrap: {borderRadius: 14, borderWidth: 1, overflow: 'hidden'},
  kbkRow: {flexDirection: 'row', gap: 10, padding: 12, alignItems: 'flex-start'},
  kbkCode: {fontSize: 12, fontWeight: '700', width: 56},
  kbkName: {fontSize: 12, lineHeight: 16},
  kbkNote: {fontSize: 10, marginTop: 2},
  kbkAmount: {fontSize: 12, fontWeight: '700'},
  kbkAmountSub: {fontSize: 11, marginTop: 3},
});
