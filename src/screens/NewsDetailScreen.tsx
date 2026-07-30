import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {PrimaryButton} from '../components/Buttons';
import {fetchNewsItem} from '../data/news/api';
import {INewsItem, sourceLabels} from '../data/news/types';
import {RootScreenProps} from '../navigation/types';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date);
}

export default function NewsDetailScreen({navigation, route}: RootScreenProps<'NewsDetail'>) {
  const {colors} = useTheme();
  const {slug} = route.params;
  const [item, setItem] = useState<INewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetchNewsItem(slug, controller.signal)
      .then(({data}) => {
        if (!data) {
          setError(true);
          return;
        }
        setItem(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [slug]);

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title="Новость" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.body}>
        {loading ? (
          <View style={styles.centerBox}>
            <ActivityIndicator color={colors.brand600} />
          </View>
        ) : error || !item ? (
          <Card style={styles.centerCard}>
            <Text style={{color: colors.textSecondary, textAlign: 'center'}}>Не удалось загрузить новость</Text>
          </Card>
        ) : (
          <>
            <View style={styles.metaRow}>
              <View style={[styles.sourcePill, {backgroundColor: colors.brand50}]}>
                <Text style={[styles.sourcePillText, {color: colors.brand600}]}>{sourceLabels[item.source]}</Text>
              </View>
              <Text style={[styles.date, {color: colors.textMuted}]}>{formatDate(item.publishedAt)}</Text>
            </View>
            <Text style={[styles.title, {color: colors.textPrimary}]}>{item.title}</Text>
            <Text style={[styles.excerpt, {color: colors.textSecondary}]}>{item.excerpt}</Text>
            <PrimaryButton label="Читать в источнике →" onPress={() => Linking.openURL(item.sourceUrl)} />
            <Text style={[styles.disclaimer, {color: colors.textMuted}]}>
              Материал подготовлен на основе новости {sourceLabels[item.source]}. Полный текст — по ссылке выше.
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 16, paddingBottom: 40, gap: 14},
  centerBox: {paddingVertical: 60, alignItems: 'center'},
  centerCard: {alignItems: 'center', paddingVertical: 28},
  metaRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  sourcePill: {paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, alignSelf: 'flex-start'},
  sourcePillText: {fontSize: 11, fontWeight: '700'},
  date: {fontSize: 12},
  title: {fontSize: 21, fontWeight: '700', lineHeight: 27},
  excerpt: {fontSize: 15, lineHeight: 22},
  disclaimer: {fontSize: 11, lineHeight: 15, textAlign: 'center'},
});
