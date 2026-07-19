import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {StatusBadge} from '../components/StatusBadge';
import {useToast} from '../components/Toast';
import {contracts, contractStats} from '../data/mockData';
import {RootScreenProps} from '../navigation/types';

const JOURNAL_TABS = ['Все', 'ПИ', 'ТД', 'ДТ'] as const;

export default function ContractDetailScreen({navigation, route}: RootScreenProps<'ContractDetail'>) {
  const {colors} = useTheme();
  const {showToast} = useToast();
  const contract = contracts.find(c => c.id === route.params.contractId) ?? contracts[0];
  const stats = contractStats[contract.id];
  const [activeTab, setActiveTab] = useState<(typeof JOURNAL_TABS)[number]>('Все');

  const journal = stats ? (activeTab === 'Все' ? stats.journal : stats.journal.filter(j => j.type === activeTab)) : [];

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title={contract.number} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={[styles.meta, {color: colors.textSecondary}]}>
          Контрагент: <Text style={{color: colors.textPrimary, fontWeight: '700'}}>{contract.partner}</Text> · от {contract.date}
        </Text>
        <Text style={[styles.amount, {color: colors.textPrimary}]}>{contract.amount}</Text>

        {stats ? (
          <>
            <View style={styles.kpiRow}>
              <Card style={styles.kpiCard}>
                <Text style={[styles.kpiLabel, {color: colors.textMuted}]}>Всего создано</Text>
                <Text style={[styles.kpiValue, {color: colors.textPrimary}]}>{stats.totalCreated}</Text>
                <Text style={[styles.kpiDesc, {color: colors.textMuted}]}>ПИ + ТД + ДТ</Text>
              </Card>
              <Card style={styles.kpiCard}>
                <Text style={[styles.kpiLabel, {color: colors.textMuted}]}>Выпущено</Text>
                <Text style={[styles.kpiValue, {color: colors.green}]}>{stats.released}</Text>
                <Text style={[styles.kpiDesc, {color: colors.textMuted}]}>КЕДЕН</Text>
              </Card>
              <Card style={styles.kpiCard}>
                <Text style={[styles.kpiLabel, {color: colors.textMuted}]}>В работе</Text>
                <Text style={[styles.kpiValue, {color: colors.orange}]}>{stats.inProgress}</Text>
                <Text style={[styles.kpiDesc, {color: colors.textMuted}]}>контроль / черновики</Text>
              </Card>
            </View>

            <View style={styles.kpiRow2}>
              <Card style={{flex: 1}}>
                <Text style={[styles.kpiLabel, {color: colors.textMuted}]}>Сумма ТПиН</Text>
                <Text style={[styles.kpiValueSm, {color: colors.textPrimary}]}>{stats.totalPayments}</Text>
                <Text style={[styles.kpiDesc, {color: colors.textMuted}]}>по выпущенным</Text>
              </Card>
              <Card style={styles.docsCard}>
                <View style={{flex: 1}}>
                  <Text style={[styles.kpiLabel, {color: colors.textMuted}]}>Документы</Text>
                  <Text style={[styles.kpiValue, {color: colors.textPrimary}]}>{stats.docsCount}</Text>
                  <Text style={[styles.kpiDesc, {color: colors.textMuted}]}>переиспользуются</Text>
                </View>
                <TouchableOpacity
                  style={[styles.smallBtn, {backgroundColor: colors.bgScreen, borderColor: colors.borderColor}]}
                  onPress={() => showToast('Документы', 'Открытие пакета документов')}>
                  <Text style={{fontSize: 11, fontWeight: '600', color: colors.textPrimary}}>Открыть</Text>
                </TouchableOpacity>
              </Card>
            </View>

            <View style={[styles.unkBanner, {backgroundColor: colors.greenBg, borderColor: colors.greenBorder}]}>
              <Text style={[styles.unkText, {color: colors.green}]}>
                ✓ Контракт поставлен на учёт · УНК {stats.unk} — подставляется в гр. 44 каждой ДТ.
              </Text>
              <TouchableOpacity
                style={[styles.bankBtn, {backgroundColor: colors.bgCard, borderColor: colors.greenBorder}]}
                onPress={() => showToast('Пакет для банка', 'Формирование документов...')}>
                <Text style={{fontSize: 11, fontWeight: '600', color: colors.green}}>Пакет для банка</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>
                Журнал деклараций <Text style={{color: colors.textMuted, fontWeight: '500'}}>({stats.journal.length})</Text>
              </Text>
              <View style={styles.tabsRow}>
                {JOURNAL_TABS.map(tab => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.tabBtn,
                      {
                        backgroundColor: activeTab === tab ? brand.teal600 : colors.bgCard,
                        borderColor: activeTab === tab ? brand.teal600 : colors.borderColor,
                      },
                    ]}
                    onPress={() => setActiveTab(tab)}>
                    <Text style={{fontSize: 11, fontWeight: '600', color: activeTab === tab ? '#fff' : colors.textSecondary}}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Card style={{paddingVertical: 4}}>
              {journal.length === 0 ? (
                <Text style={{color: colors.textMuted, fontSize: 13, padding: 12, textAlign: 'center'}}>Нет записей</Text>
              ) : (
                journal.map((j, idx) => (
                  <View
                    key={j.id}
                    style={[
                      styles.journalRow,
                      idx < journal.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
                    ]}>
                    <View style={[styles.typeBadge, {backgroundColor: colors.brand50, borderColor: colors.brand100}]}>
                      <Text style={{fontSize: 9, fontWeight: '700', color: brand.teal600}}>{j.type}</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={[styles.journalReg, {color: colors.textMuted}]}>{j.regNumber}</Text>
                      <Text style={[styles.journalProduct, {color: colors.textPrimary}]}>{j.product}</Text>
                      <Text style={[styles.journalMeta, {color: colors.textMuted}]}>
                        {j.tnved} · {j.date} · {j.corridor}
                      </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', gap: 4}}>
                      <StatusBadge label={j.status} color={j.statusColor} />
                      <Text style={[styles.journalPay, {color: colors.textPrimary}]}>{j.payment}</Text>
                      <StatusBadge label={j.finance} color={j.financeColor} />
                    </View>
                  </View>
                ))
              )}
            </Card>
          </>
        ) : (
          <Card>
            <Text style={{color: colors.textSecondary, fontSize: 13, lineHeight: 19}}>
              Количество ДТ по контракту: {contract.dtCount ?? '—'}. Подробная статистика и журнал деклараций доступны
              после первой отправленной ДТ по этому контракту.
            </Text>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 20, paddingBottom: 40, gap: 14},
  meta: {fontSize: 12, lineHeight: 18},
  amount: {fontSize: 18, fontWeight: '700', marginBottom: 4},
  kpiRow: {flexDirection: 'row', gap: 8},
  kpiRow2: {flexDirection: 'row', gap: 8},
  kpiCard: {flex: 1, padding: 12},
  docsCard: {flex: 1, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  kpiLabel: {fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4},
  kpiValue: {fontSize: 22, fontWeight: '800'},
  kpiValueSm: {fontSize: 16, fontWeight: '800', letterSpacing: -0.3},
  kpiDesc: {fontSize: 10, marginTop: 2},
  smallBtn: {paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1},
  unkBanner: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  unkText: {fontSize: 11, lineHeight: 17, flex: 1},
  bankBtn: {paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, flexShrink: 0},
  sectionHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap'},
  sectionTitle: {fontSize: 14, fontWeight: '700'},
  tabsRow: {flexDirection: 'row', gap: 4},
  tabBtn: {paddingVertical: 4, paddingHorizontal: 9, borderRadius: 6, borderWidth: 1},
  journalRow: {flexDirection: 'row', padding: 12, gap: 8, alignItems: 'flex-start'},
  typeBadge: {borderRadius: 4, borderWidth: 1, paddingHorizontal: 4, paddingVertical: 2, marginTop: 1},
  journalReg: {fontSize: 10},
  journalProduct: {fontSize: 13, fontWeight: '600', marginTop: 2},
  journalMeta: {fontSize: 10, marginTop: 2},
  journalPay: {fontSize: 12, fontWeight: '700'},
});
