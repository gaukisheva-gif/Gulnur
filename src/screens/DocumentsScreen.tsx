import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {FilterChip} from '../components/Buttons';
import {StatusBadge} from '../components/StatusBadge';
import {SearchIcon} from '../components/Icon';
import {TextField} from '../components/Field';
import {contracts, declarations, licenses} from '../data/mockData';
import {MainTabScreenProps} from '../navigation/types';

type Tab = 'decl' | 'contr' | 'lic';

export default function DocumentsScreen({navigation}: MainTabScreenProps<'Documents'>) {
  const {colors} = useTheme();
  const [tab, setTab] = useState<Tab>('decl');

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <View style={[styles.header, {backgroundColor: colors.bgHeader}]}>
        <Text style={[styles.company, {color: colors.textMuted}]}>ТОО «Аруна Импорт»</Text>
        <Text style={[styles.title, {color: colors.textPrimary}]}>Мои документы</Text>
      </View>

      <View style={[styles.segmentWrap, {backgroundColor: colors.bgScreen, borderBottomColor: colors.borderColor}]}>
        <SegButton label="Декларации" count={declarations.length} active={tab === 'decl'} onPress={() => setTab('decl')} />
        <SegButton label="Контракты" count={contracts.length} active={tab === 'contr'} onPress={() => setTab('contr')} />
        <SegButton label="Лицензии" count={licenses.length} active={tab === 'lic'} onPress={() => setTab('lic')} />
      </View>

      {tab === 'decl' ? <DeclPanel navigation={navigation} /> : null}
      {tab === 'contr' ? <ContractsPanel navigation={navigation} /> : null}
      {tab === 'lic' ? <LicensesPanel navigation={navigation} /> : null}
    </View>
  );
}

function SegButton({label, count, active, onPress}: {label: string; count: number; active: boolean; onPress: () => void}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.segBtn, {backgroundColor: active ? brand.teal600 : 'transparent'}]}
      onPress={onPress}>
      <Text style={[styles.segBtnText, {color: active ? '#fff' : colors.textSecondary}]}>{label}</Text>
      <View style={[styles.segBadge, {backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.1)'}]}>
        <Text style={[styles.segBadgeText, {color: active ? '#fff' : colors.textSecondary}]}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

function DeclPanel({navigation}: {navigation: MainTabScreenProps<'Documents'>['navigation']}) {
  const {colors} = useTheme();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const statuses = ['Выпущена', 'Под контролем', 'Зарегистрирована', 'Отказана'];
  const filtered = useMemo(
    () =>
      declarations.filter(d => {
        const matchesFilter = filter === 'all' || d.status === filter;
        const matchesQuery = !query || d.regNumber.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [filter, query],
  );

  return (
    <ScrollView contentContainerStyle={styles.panelContent}>
      <View style={styles.searchWrap}>
        <SearchIcon size={16} color={colors.textMuted} />
        <TextField
          placeholder="Поиск по рег. номеру, товару..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        <FilterChip label="Все" count={declarations.length} active={filter === 'all'} onPress={() => setFilter('all')} />
        {statuses.map(s => (
          <FilterChip
            key={s}
            label={s}
            count={declarations.filter(d => d.status === s).length}
            active={filter === s}
            onPress={() => setFilter(s)}
          />
        ))}
      </ScrollView>

      <View style={{gap: 10}}>
        {filtered.map(decl => (
          <TouchableOpacity
            key={decl.id}
            style={[styles.declCard, {backgroundColor: colors.bgCard, borderLeftColor: colors[borderKey(decl.statusColor)]}]}
            onPress={() => navigation.navigate('Documents')}>
            <View style={styles.declHeader}>
              <Text style={[styles.declNumber, {color: colors.textPrimary}]}>{decl.regNumber}</Text>
              <StatusBadge label={decl.status} color={decl.statusColor} />
            </View>
            <View style={styles.declFooter}>
              <Text style={[styles.declMeta, {color: colors.textMuted}]}>
                Коридор: {decl.corridor} · {decl.place} · {decl.date}
              </Text>
              <Text style={[styles.declAmount, {color: colors.textPrimary}]}>{decl.amount}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function ContractsPanel({navigation}: {navigation: MainTabScreenProps<'Documents'>['navigation']}) {
  const {colors} = useTheme();
  const [filter, setFilter] = useState('all');
  const filtered = contracts.filter(c => filter === 'all' || c.status === filter);
  const statusLabel: Record<string, {label: string; color: string; bg: string}> = {
    active: {label: 'Активен', color: colors.green, bg: colors.greenBg},
    draft: {label: 'Черновик', color: colors.textSecondary, bg: colors.grayBg},
    archive: {label: 'Архив', color: colors.textMuted, bg: colors.bgScreen},
  };

  return (
    <ScrollView contentContainerStyle={styles.panelContent}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        <FilterChip label="Все" count={contracts.length} active={filter === 'all'} onPress={() => setFilter('all')} />
        <FilterChip
          label="Активен"
          count={contracts.filter(c => c.status === 'active').length}
          active={filter === 'active'}
          onPress={() => setFilter('active')}
        />
        <FilterChip
          label="Черновик"
          count={contracts.filter(c => c.status === 'draft').length}
          active={filter === 'draft'}
          onPress={() => setFilter('draft')}
        />
        <FilterChip
          label="Архив"
          count={contracts.filter(c => c.status === 'archive').length}
          active={filter === 'archive'}
          onPress={() => setFilter('archive')}
        />
      </ScrollView>

      <View style={[styles.tableWrap, {backgroundColor: colors.bgCard, borderColor: colors.borderColor}]}>
        {filtered.map((c, idx) => (
          <TouchableOpacity
            key={c.id}
            onPress={() => navigation.navigate('ContractDetail', {contractId: c.id})}
            style={[
              styles.contractRow,
              idx < filtered.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
            ]}>
            <View style={{flex: 1}}>
              <Text style={[styles.contractNumber, {color: colors.textPrimary}]}>{c.number}</Text>
              <Text style={[styles.contractPartner, {color: colors.textSecondary}]}>{c.partner}</Text>
              <Text style={[styles.contractMeta, {color: colors.textMuted}]}>
                {c.amount} · {c.date}
              </Text>
            </View>
            <Text style={[styles.contractDt, {color: colors.textPrimary}]}>{c.dtCount ?? '–'}</Text>
            <View style={[styles.statusPill, {backgroundColor: statusLabel[c.status].bg}]}>
              <Text style={[styles.statusPillText, {color: statusLabel[c.status].color}]}>
                {statusLabel[c.status].label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function LicensesPanel({navigation}: {navigation: MainTabScreenProps<'Documents'>['navigation']}) {
  const {colors} = useTheme();
  const [filter, setFilter] = useState('all');
  const filtered = licenses.filter(l => filter === 'all' || l.status === filter);

  return (
    <ScrollView contentContainerStyle={styles.panelContent}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        <FilterChip label="Все" count={licenses.length} active={filter === 'all'} onPress={() => setFilter('all')} />
        <FilterChip
          label="Действует"
          count={licenses.filter(l => l.status === 'active').length}
          active={filter === 'active'}
          onPress={() => setFilter('active')}
        />
        <FilterChip
          label="Истекает скоро"
          count={licenses.filter(l => l.status === 'expiring').length}
          active={filter === 'expiring'}
          onPress={() => setFilter('expiring')}
        />
      </ScrollView>

      <View style={[styles.tableWrap, {backgroundColor: colors.bgCard, borderColor: colors.borderColor}]}>
        {filtered.map((lic, idx) => (
          <TouchableOpacity
            key={lic.id}
            onPress={() => navigation.navigate('LicenseDetail', {licenseId: lic.id})}
            style={[
              styles.licRow,
              idx < filtered.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
            ]}>
            <View style={{flex: 1}}>
              <Text style={[styles.contractNumber, {color: colors.textPrimary}]}>{lic.number}</Text>
              <Text style={[styles.licType, {color: brand.teal600}]}>{lic.type}</Text>
              <Text style={[styles.contractMeta, {color: colors.textMuted}]}>{lic.desc}</Text>
              <Text style={[styles.licNote, {color: colors.textSecondary}]}>{lic.note}</Text>
            </View>
            <View style={{alignItems: 'flex-end', gap: 4}}>
              <Text style={[styles.licTnved, {color: colors.textSecondary}]}>{lic.tnved}</Text>
              <Text style={[styles.licDates, {color: colors.textMuted}]}>
                {lic.validFrom}—{lic.validTo}
              </Text>
              <View
                style={[
                  styles.statusPill,
                  {backgroundColor: lic.status === 'active' ? colors.greenBg : colors.orangeBg},
                ]}>
                <Text
                  style={[
                    styles.statusPillText,
                    {color: lic.status === 'active' ? colors.green : colors.orange},
                  ]}>
                  {lic.status === 'active' ? 'Действует' : 'Истекает скоро'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function borderKey(color: string) {
  switch (color) {
    case 'green':
      return 'green' as const;
    case 'orange':
      return 'orange' as const;
    case 'red':
      return 'red' as const;
    default:
      return 'textMuted' as const;
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {paddingTop: 10, paddingBottom: 12, paddingHorizontal: 20},
  company: {fontSize: 13, marginBottom: 4},
  title: {fontSize: 28, fontWeight: '600', letterSpacing: -0.6},
  segmentWrap: {flexDirection: 'row', gap: 4, padding: 5, borderBottomWidth: 1},
  segBtn: {flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 9},
  segBtnText: {fontSize: 13, fontWeight: '600'},
  segBadge: {borderRadius: 6, paddingHorizontal: 5, paddingVertical: 1},
  segBadgeText: {fontSize: 11, fontWeight: '700'},
  panelContent: {padding: 16, paddingBottom: 100, gap: 4},
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchInput: {flex: 1, paddingLeft: 12, marginLeft: -28},
  filterRow: {gap: 8, paddingVertical: 8, paddingBottom: 12},
  declCard: {borderRadius: 16, padding: 14, borderLeftWidth: 4},
  declHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6},
  declNumber: {fontSize: 13, fontWeight: '700'},
  declFooter: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6},
  declMeta: {fontSize: 12, flex: 1},
  declAmount: {fontSize: 15, fontWeight: '700'},
  tableWrap: {borderRadius: 14, borderWidth: 1, overflow: 'hidden'},
  contractRow: {flexDirection: 'row', padding: 12, gap: 8, alignItems: 'flex-start'},
  contractNumber: {fontSize: 13, fontWeight: '700'},
  contractPartner: {fontSize: 11, marginTop: 2},
  contractMeta: {fontSize: 11, marginTop: 1},
  contractDt: {fontSize: 13, fontWeight: '700', width: 30, textAlign: 'center'},
  statusPill: {borderRadius: 8, paddingHorizontal: 6, paddingVertical: 3, alignSelf: 'flex-start'},
  statusPillText: {fontSize: 10, fontWeight: '600'},
  licRow: {flexDirection: 'row', padding: 12, gap: 8},
  licType: {fontSize: 11, fontWeight: '500', marginTop: 1},
  licNote: {fontSize: 10, marginTop: 2},
  licTnved: {fontSize: 11, fontWeight: '600'},
  licDates: {fontSize: 10},
});
