import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {TextField} from '../components/Field';
import {SearchIcon} from '../components/Icon';
import {tnvedSearch} from '../data/mockData';
import {RootScreenProps} from '../navigation/types';

export default function TnvedScreen({navigation}: RootScreenProps<'Tnved'>) {
  const {colors} = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{code: string; name: string; confidence: number}[] | null>(null);

  const runSearch = () => setResults(tnvedSearch(query));

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title="Автоподбор ТН ВЭД" onBack={() => navigation.goBack()} backLabel="Сервисы" />

      <ScrollView contentContainerStyle={styles.body}>
        <Card style={{gap: 12}}>
          <Text style={[styles.searchLabel, {color: colors.textPrimary}]}>Опишите товар — подберём код ТН ВЭД</Text>
          <View style={styles.searchRow}>
            <TextField
              placeholder="Например: ноутбук 14 дюймов Intel Core i5"
              value={query}
              onChangeText={setQuery}
              style={{flex: 1}}
            />
            <TouchableOpacity style={[styles.findBtn, {backgroundColor: brand.teal500}]} onPress={runSearch}>
              <SearchIcon size={16} color="#fff" />
              <Text style={styles.findBtnText}>Найти</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.hint, {color: colors.textMuted}]}>
            Подбор выполняется по базе ТН ВЭД ЕАЭС и истории похожих деклараций.
          </Text>
        </Card>

        {results !== null ? (
          <View style={{gap: 8}}>
            <Text style={[styles.resultsTitle, {color: colors.textPrimary}]}>
              {results.length ? `Найдено вариантов: ${results.length}` : 'Ничего не найдено'}
            </Text>
            {results.map((r, idx) => (
              <View
                key={r.code}
                style={[
                  styles.resultCard,
                  {backgroundColor: colors.bgCard, borderColor: idx === 0 ? colors.brand100 : colors.borderColor},
                ]}>
                <Text style={[styles.code, {color: brand.teal600}]}>{r.code}</Text>
                <Text style={[styles.name, {color: colors.textPrimary}]}>{r.name}</Text>
                <View
                  style={[
                    styles.confBadge,
                    {backgroundColor: r.confidence >= 85 ? colors.greenBg : colors.orangeBg},
                  ]}>
                  <Text
                    style={[
                      styles.confBadgeText,
                      {color: r.confidence >= 85 ? colors.green : colors.orange},
                    ]}>
                    Совпадение {r.confidence}%
                  </Text>
                </View>
              </View>
            ))}
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
  resultsTitle: {fontSize: 13, fontWeight: '700'},
  resultCard: {borderRadius: 12, borderWidth: 1, padding: 13},
  code: {fontSize: 16, fontWeight: '800', letterSpacing: 0.5, marginBottom: 3},
  name: {fontSize: 13, lineHeight: 18, marginBottom: 6},
  confBadge: {alignSelf: 'flex-start', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3},
  confBadgeText: {fontSize: 11, fontWeight: '700'},
});
