import React, {useRef, useState} from 'react';
import {ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {TextField} from '../components/Field';
import {SearchIcon, FlashIcon, CheckShieldIcon} from '../components/Icon';
import {useToast} from '../components/Toast';
import {tnvedDetailedSearch, TnvedResult} from '../data/mockData';
import {RootScreenProps} from '../navigation/types';

const FREE_LIMIT = 5;
const MIN_LEN = 5;

export default function TnvedScreen({navigation}: RootScreenProps<'Tnved'>) {
  const {colors} = useTheme();
  const {showToast} = useToast();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TnvedResult[] | null>(null);
  const [freeLeft, setFreeLeft] = useState(FREE_LIMIT);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hint =
    query.length > 0 && query.length < MIN_LEN
      ? `Минимальная длина запроса — ${MIN_LEN} символов`
      : results
      ? `Запрос: «${query}»`
      : `Минимальная длина запроса — ${MIN_LEN} символов`;

  const runSearch = () => {
    const q = query.trim();
    if (q.length < MIN_LEN) {
      showToast('Слишком короткий запрос', `Минимальная длина — ${MIN_LEN} символов`);
      return;
    }
    if (freeLeft <= 0) {
      showToast('Лимит исчерпан', 'Бесплатные подборы на сегодня закончились. Оформите подписку для безлимита');
      return;
    }
    setFreeLeft(prev => prev - 1);
    setLoading(true);
    setResults(null);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(false);
      setResults(tnvedDetailedSearch(q));
    }, 1200);
  };

  const clearSearch = () => {
    setQuery('');
    setResults(null);
    setLoading(false);
    if (timer.current) clearTimeout(timer.current);
  };

  const applyCode = (code: string) => showToast('Код применён', code);

  const goToCalc = (code: string, kind: 'deposit' | 'tpin') => {
    navigation.navigate('Calculator', {prefillTnvedCode: code, prefillKind: kind});
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title="Автоподбор ТН ВЭД" onBack={() => navigation.goBack()} backLabel="Сервисы" />

      <ScrollView contentContainerStyle={styles.body}>
        <Card style={{gap: 10}}>
          <Text style={[styles.searchLabel, {color: colors.textPrimary}]}>Введите ключевые слова</Text>
          <View style={styles.searchRow}>
            <TextField
              placeholder="Опишите товар"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={runSearch}
              style={{flex: 1}}
            />
            <TouchableOpacity style={[styles.findBtn, {backgroundColor: brand.teal500}]} onPress={runSearch}>
              <SearchIcon size={15} color="#fff" />
              <Text style={styles.findBtnText}>Найти</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.hint, {color: colors.textMuted}]}>{hint}</Text>

          <View style={[styles.limitBanner, {backgroundColor: colors.bgScreen, borderColor: colors.borderColor}]}>
            <View style={styles.limitLeft}>
              <FlashIcon size={15} color={brand.teal600} />
              <Text style={{fontSize: 12, color: colors.textSecondary}}>
                Бесплатных подборов сегодня: <Text style={{fontWeight: '700', color: colors.textPrimary}}>{freeLeft}</Text> из{' '}
                {FREE_LIMIT}
              </Text>
            </View>
            <TouchableOpacity onPress={() => showToast('Подписка BROK.KZ', 'Безлимитный автоподбор и расчёты — в платном тарифе')}>
              <Text style={{fontSize: 11, fontWeight: '700', color: brand.teal600}}>Тарифы →</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="small" color={brand.teal500} />
            <Text style={[styles.loaderText, {color: colors.textMuted}]}>AI анализирует описание...</Text>
          </View>
        ) : null}

        {!loading && results ? (
          <View style={{gap: 8}}>
            <View style={styles.resultsHeader}>
              <Text style={[styles.resultsTitle, {color: colors.textSecondary}]}>Результаты подбора</Text>
              <TouchableOpacity onPress={clearSearch}>
                <Text style={{fontSize: 12, color: brand.teal600, fontWeight: '600'}}>Очистить ✕</Text>
              </TouchableOpacity>
            </View>
            {results.map((r, idx) => (
              <View
                key={r.code}
                style={[
                  styles.resultCard,
                  {backgroundColor: colors.bgCard, borderColor: idx === 0 ? colors.brand100 : colors.borderColor},
                ]}>
                {idx === 0 ? <Text style={styles.topBadge}>⭐ Лучший вариант</Text> : null}
                <Text style={[styles.code, {color: brand.teal600}]}>{r.code}</Text>
                <Text style={[styles.name, {color: colors.textPrimary}]}>{r.name}</Text>
                <View
                  style={[
                    styles.confBadge,
                    {backgroundColor: r.conf === 'high' ? colors.greenBg : colors.orangeBg},
                  ]}>
                  <Text style={[styles.confBadgeText, {color: r.conf === 'high' ? colors.green : colors.orange}]}>
                    {r.conf === 'high' ? `✓ Высокая ${r.pct}%` : `~ Средняя ${r.pct}%`}
                  </Text>
                </View>

                <View style={styles.statsRow}>
                  <View style={[styles.statBox, {backgroundColor: colors.bgScreen}]}>
                    <Text style={[styles.statLabel, {color: colors.textMuted}]}>ПОШЛИНА</Text>
                    <Text style={[styles.statValue, {color: colors.textPrimary}]}>{r.duty}</Text>
                  </View>
                  <View style={[styles.statBox, {backgroundColor: colors.bgScreen}]}>
                    <Text style={[styles.statLabel, {color: colors.textMuted}]}>НДС</Text>
                    <Text style={[styles.statValue, {color: colors.textPrimary}]}>{r.vat}</Text>
                  </View>
                  <View style={[styles.statBox, {backgroundColor: colors.bgScreen}]}>
                    <Text style={[styles.statLabel, {color: colors.textMuted}]}>АКЦИЗ</Text>
                    <Text style={[styles.statValue, {color: colors.textPrimary}]}>{r.excise}</Text>
                  </View>
                </View>

                <Text style={[styles.permitsTitle, {color: colors.textMuted}]}>Разрешительные документы</Text>
                {r.permits.length === 0 ? (
                  <View style={[styles.noPermits, {backgroundColor: colors.greenBg, borderColor: colors.greenBorder}]}>
                    <CheckShieldIcon size={14} color={colors.green} />
                    <Text style={{fontSize: 12, fontWeight: '600', color: colors.green}}>
                      Разрешительные документы не требуются
                    </Text>
                  </View>
                ) : (
                  <View>
                    {r.permits.map((p, pi) => (
                      <TouchableOpacity
                        key={pi}
                        disabled={!p.url}
                        onPress={() => p.url && Linking.openURL(p.url)}
                        style={[
                          styles.permitRow,
                          pi < r.permits.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
                        ]}>
                        <Text style={{fontSize: 13, marginTop: 1}}>📄</Text>
                        <View style={{flex: 1}}>
                          <Text
                            style={{
                              fontSize: 12.5,
                              fontWeight: '600',
                              color: p.url ? brand.teal600 : colors.textPrimary,
                              textDecorationLine: p.url ? 'underline' : 'none',
                            }}>
                            {p.name}
                          </Text>
                          <Text style={{fontSize: 11, color: colors.textMuted, marginTop: 1}}>{p.note}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <TouchableOpacity style={[styles.applyBtn, {backgroundColor: brand.teal600}]} onPress={() => applyCode(r.code)}>
                  <Text style={styles.applyBtnText}>Применить</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.bridgeBtn, {backgroundColor: colors.greenBg, borderColor: colors.greenBorder}]}
                  onPress={() => goToCalc(r.code, 'deposit')}>
                  <Text style={{fontSize: 12, fontWeight: '700', color: colors.green}}>Рассчитать размер обеспечения</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.bridgeBtn, {backgroundColor: colors.brand50, borderColor: colors.brand100}]}
                  onPress={() => goToCalc(r.code, 'tpin')}>
                  <Text style={{fontSize: 12, fontWeight: '700', color: brand.teal600}}>Рассчитать ТПиН</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}

        {!loading && !results ? (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIcon, {backgroundColor: colors.brand50}]}>
              <SearchIcon size={24} color={brand.teal600} />
            </View>
            <Text style={[styles.emptyTitle, {color: colors.textPrimary}]}>Начните с описания товара</Text>
            <Text style={[styles.emptyDesc, {color: colors.textMuted}]}>
              Укажите название товара выше — подберём код ТН ВЭД и покажем список нужных разрешительных документов.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 16, paddingBottom: 40, gap: 16},
  searchLabel: {fontSize: 13, fontWeight: '700', textAlign: 'center'},
  searchRow: {flexDirection: 'row', gap: 8},
  findBtn: {flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, borderRadius: 8, justifyContent: 'center'},
  findBtnText: {color: '#fff', fontSize: 14, fontWeight: '600'},
  hint: {fontSize: 11, lineHeight: 16},
  limitBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  limitLeft: {flexDirection: 'row', alignItems: 'center', gap: 7, flex: 1},
  loaderWrap: {alignItems: 'center', paddingVertical: 20, gap: 10},
  loaderText: {fontSize: 13},
  resultsHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  resultsTitle: {fontSize: 12, fontWeight: '700'},
  resultCard: {borderRadius: 12, borderWidth: 1, padding: 13, gap: 4},
  topBadge: {fontSize: 10, fontWeight: '700', color: brand.teal600, marginBottom: 2},
  code: {fontSize: 16, fontWeight: '800', letterSpacing: 0.5},
  name: {fontSize: 13, lineHeight: 18, marginBottom: 2},
  confBadge: {alignSelf: 'flex-start', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3},
  confBadgeText: {fontSize: 11, fontWeight: '700'},
  statsRow: {flexDirection: 'row', gap: 6, marginTop: 6},
  statBox: {flex: 1, borderRadius: 7, paddingVertical: 6, paddingHorizontal: 8},
  statLabel: {fontSize: 9, textTransform: 'uppercase'},
  statValue: {fontSize: 12, fontWeight: '700', marginTop: 1},
  permitsTitle: {fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 8},
  noPermits: {flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: 8, padding: 9},
  permitRow: {flexDirection: 'row', gap: 8, paddingVertical: 8},
  applyBtn: {borderRadius: 7, paddingVertical: 8, alignItems: 'center', marginTop: 8},
  applyBtnText: {color: '#fff', fontSize: 12, fontWeight: '600'},
  bridgeBtn: {borderRadius: 8, paddingVertical: 9, alignItems: 'center', justifyContent: 'center', borderWidth: 1, marginTop: 6},
  emptyState: {paddingVertical: 36, paddingHorizontal: 16, alignItems: 'center'},
  emptyIcon: {width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 14},
  emptyTitle: {fontSize: 14, fontWeight: '600', marginBottom: 4},
  emptyDesc: {fontSize: 12.5, lineHeight: 18, textAlign: 'center'},
});
