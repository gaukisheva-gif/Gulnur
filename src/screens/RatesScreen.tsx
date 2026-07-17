import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {ScreenHeader} from '../components/ScreenHeader';
import {TextField, SelectField} from '../components/Field';
import {SwapIcon} from '../components/Icon';
import {fetchNbkRates, pseudoTrend, Rate, sortRates} from '../data/nbkRates';
import {flagMap} from '../data/mockData';
import {RootScreenProps} from '../navigation/types';

export default function RatesScreen({navigation}: RootScreenProps<'Rates'>) {
  const {colors} = useTheme();
  const [rates, setRates] = useState<Rate[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState('100');
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('KZT');

  useEffect(() => {
    let mounted = true;
    const load = () =>
      fetchNbkRates().then(({rates: r, isLive: live}) => {
        if (mounted) {
          setRates(sortRates(r));
          setIsLive(live);
        }
      });
    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const heroCodes = ['USD', 'EUR', 'CNY', 'RUB'];
  const heroRates = heroCodes.map(code => rates.find(r => r.code === code)).filter(Boolean) as Rate[];

  const filtered = query.trim()
    ? rates.filter(r => r.code.toLowerCase().includes(query.toLowerCase()) || r.name.toLowerCase().includes(query.toLowerCase()))
    : rates;

  const convertedResult = useMemo(() => {
    const amt = parseFloat(amount.replace(',', '.'));
    const fromRate = fromCode === 'KZT' ? 1 : rates.find(r => r.code === fromCode)?.rate ?? null;
    const toRate = toCode === 'KZT' ? 1 : rates.find(r => r.code === toCode)?.rate ?? null;
    if (isNaN(amt) || !fromRate || !toRate) return null;
    return ((amt * fromRate) / toRate).toLocaleString('ru-RU', {maximumFractionDigits: 2});
  }, [amount, fromCode, toCode, rates]);

  const codeOptions = ['KZT', ...rates.map(r => r.code)];

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title="Курсы валют" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.infoBanner, {backgroundColor: colors.bgCard, borderColor: colors.borderColor}]}>
          <Text style={{color: colors.textSecondary, fontSize: 12, lineHeight: 17}}>
            Официальный курс продажи Национального банка РК. Используется для расчёта таможенных платежей и налогов.
            Обновляется ежедневно.
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.heroRow}>
          {heroRates.map(r => {
            const trend = pseudoTrend(r.code);
            const up = trend >= 0;
            return (
              <LinearGradient key={r.code} colors={[brand.teal400, brand.teal500, brand.teal600]} style={styles.heroCard}>
                <Text style={styles.heroFlag}>{flagMap[r.code] ?? '💱'}</Text>
                <Text style={styles.heroCode}>{r.code}/KZT</Text>
                <Text style={styles.heroRate}>{r.rate.toFixed(2)}</Text>
                <View style={styles.heroTrend}>
                  <Text style={styles.heroTrendText}>
                    {up ? '↑' : '↓'} {Math.abs(trend).toFixed(2)}% · 24ч
                  </Text>
                </View>
              </LinearGradient>
            );
          })}
        </ScrollView>

        <View style={[styles.convCard, {backgroundColor: colors.bgCard, borderColor: colors.borderColor}]}>
          <Text style={[styles.convTitle, {color: colors.textPrimary}]}>⇄ Конвертер валют</Text>
          <View style={styles.convRow}>
            <TextField value={amount} onChangeText={setAmount} keyboardType="numeric" style={{flex: 1}} />
            <View style={{width: 100}}>
              <SelectField value={fromCode} options={codeOptions} onChange={setFromCode} />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.swapBtn, {backgroundColor: colors.brand50}]}
            onPress={() => {
              const tmp = fromCode;
              setFromCode(toCode);
              setToCode(tmp);
            }}>
            <SwapIcon size={17} color={brand.teal600} />
          </TouchableOpacity>
          <View style={styles.convRow}>
            <View style={[styles.convResult, {backgroundColor: colors.brand50}]}>
              <Text style={{color: brand.teal600, fontWeight: '700', fontSize: 15}}>{convertedResult ?? '—'}</Text>
            </View>
            <View style={{width: 100}}>
              <SelectField value={toCode} options={codeOptions} onChange={setToCode} />
            </View>
          </View>
        </View>

        <TextField placeholder="Найти валюту по коду или названию" value={query} onChangeText={setQuery} />

        <View style={[styles.tableWrap, {backgroundColor: colors.bgCard, borderColor: colors.borderColor}]}>
          <View style={[styles.tableHead, {backgroundColor: colors.bgScreen, borderBottomColor: colors.borderColor}]}>
            <Text style={[styles.th, {color: colors.textMuted, flex: 1.3}]}>Валюта</Text>
            <Text style={[styles.th, {color: colors.textMuted, flex: 0.8, textAlign: 'right'}]}>за сутки</Text>
            <Text style={[styles.th, {color: colors.textMuted, flex: 1, textAlign: 'right'}]}>Курс продажи</Text>
          </View>
          {filtered.length === 0 ? (
            <Text style={{padding: 24, textAlign: 'center', color: colors.textMuted, fontSize: 13}}>
              {rates.length === 0 ? 'Загрузка...' : 'Ничего не найдено'}
            </Text>
          ) : (
            filtered.map((r, idx) => {
              const trend = pseudoTrend(r.code);
              const up = trend >= 0;
              return (
                <View
                  key={r.code}
                  style={[
                    styles.tableRow,
                    idx < filtered.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
                  ]}>
                  <View style={{flex: 1.3}}>
                    <Text style={[styles.rowCurrency, {color: colors.textPrimary}]}>
                      {flagMap[r.code] ?? ''} {r.code}
                    </Text>
                    <Text style={[styles.rowName, {color: colors.textMuted}]}>{r.name}</Text>
                  </View>
                  <Text style={{flex: 0.8, textAlign: 'right', fontSize: 10.5, fontWeight: '700', color: up ? colors.green : colors.red}}>
                    {up ? '↑' : '↓'} {Math.abs(trend).toFixed(2)}%
                  </Text>
                  <Text style={{flex: 1, textAlign: 'right', fontSize: 15, fontWeight: '600', color: colors.textPrimary}}>
                    {r.rate.toFixed(2)} ₸
                  </Text>
                </View>
              );
            })
          )}
        </View>
        <Text style={[styles.updated, {color: colors.textMuted}]}>
          {isLive ? 'nationalbank.kz' : 'Резервные данные · сайт НБ РК недоступен'}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 16, paddingBottom: 40, gap: 16},
  infoBanner: {borderRadius: 12, borderWidth: 1, padding: 12},
  heroRow: {gap: 10},
  heroCard: {width: 132, borderRadius: 16, padding: 14},
  heroFlag: {fontSize: 20},
  heroCode: {color: '#fff', fontSize: 12, fontWeight: '700', marginTop: 6, opacity: 0.85},
  heroRate: {color: '#fff', fontSize: 19, fontWeight: '800', marginTop: 2},
  heroTrend: {marginTop: 5, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2},
  heroTrendText: {color: '#fff', fontSize: 11, fontWeight: '700'},
  convCard: {borderRadius: 16, borderWidth: 1, padding: 16, gap: 4},
  convTitle: {fontSize: 13, fontWeight: '700', marginBottom: 8},
  convRow: {flexDirection: 'row', gap: 8, alignItems: 'flex-start'},
  swapBtn: {alignSelf: 'center', width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginVertical: 6},
  convResult: {flex: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, justifyContent: 'center'},
  tableWrap: {borderRadius: 14, borderWidth: 1, overflow: 'hidden'},
  tableHead: {flexDirection: 'row', padding: 10, borderBottomWidth: 1},
  th: {fontSize: 11, fontWeight: '700', textTransform: 'uppercase'},
  tableRow: {flexDirection: 'row', padding: 14, alignItems: 'center'},
  rowCurrency: {fontSize: 14, fontWeight: '700'},
  rowName: {fontSize: 11, marginTop: 2},
  updated: {fontSize: 11, textAlign: 'center'},
});
