import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {StatusBadge} from '../components/StatusBadge';
import {contracts, contractStats} from '../data/mockData';
import {RootScreenProps} from '../navigation/types';

export default function ContractDetailScreen({navigation, route}: RootScreenProps<'ContractDetail'>) {
  const {colors} = useTheme();
  const contract = contracts.find(c => c.id === route.params.contractId) ?? contracts[0];
  const stats = contractStats[contract.id];

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
              </Card>
              <Card style={styles.kpiCard}>
                <Text style={[styles.kpiLabel, {color: colors.textMuted}]}>Выпущено</Text>
                <Text style={[styles.kpiValue, {color: colors.green}]}>{stats.released}</Text>
              </Card>
              <Card style={styles.kpiCard}>
                <Text style={[styles.kpiLabel, {color: colors.textMuted}]}>В работе</Text>
                <Text style={[styles.kpiValue, {color: colors.orange}]}>{stats.inProgress}</Text>
              </Card>
            </View>

            <View style={[styles.unkBanner, {backgroundColor: colors.greenBg, borderColor: colors.greenBorder}]}>
              <Text style={[styles.unkText, {color: colors.green}]}>
                ✓ Контракт поставлен на учёт · УНК {stats.unk} — подставляется в гр. 44 каждой ДТ.
              </Text>
            </View>

            <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>
              Журнал деклараций ({stats.journal.length})
            </Text>
            <Card style={{paddingVertical: 4}}>
              {stats.journal.map((j, idx) => (
                <View
                  key={j.id}
                  style={[
                    styles.journalRow,
                    idx < stats.journal.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
                  ]}>
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
                  </View>
                </View>
              ))}
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
  kpiCard: {flex: 1, padding: 12},
  kpiLabel: {fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4},
  kpiValue: {fontSize: 22, fontWeight: '800'},
  unkBanner: {borderRadius: 12, borderWidth: 1, padding: 12},
  unkText: {fontSize: 12, lineHeight: 17},
  sectionTitle: {fontSize: 14, fontWeight: '700'},
  journalRow: {flexDirection: 'row', padding: 12, gap: 8, alignItems: 'flex-start'},
  journalReg: {fontSize: 10},
  journalProduct: {fontSize: 13, fontWeight: '600', marginTop: 2},
  journalMeta: {fontSize: 10, marginTop: 2},
  journalPay: {fontSize: 12, fontWeight: '700'},
});
