import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {OutlineButton} from '../components/Buttons';
import {NewspaperIcon} from '../components/Icon';
import {fetchNewsList} from '../data/news/api';
import {INewsItem, sourceLabels} from '../data/news/types';
import {RootScreenProps} from '../navigation/types';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date);
}

export default function NewsScreen({navigation}: RootScreenProps<'News'>) {
  const {colors} = useTheme();
  const [items, setItems] = useState<INewsItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetchNewsList(0, controller.signal)
      .then(({data, isLive: live}) => {
        setItems(data.content);
        setTotalPages(data.totalPages);
        setPage(0);
        setIsLive(live);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setLoadingMore(true);
    fetchNewsList(nextPage)
      .then(({data, isLive: live}) => {
        setItems(prev => [...prev, ...data.content]);
        setPage(nextPage);
        setTotalPages(data.totalPages);
        setIsLive(live);
      })
      .finally(() => setLoadingMore(false));
  }, [page]);

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title="Новости" subtitle="Таможня, ВЭД и ЕАЭС" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.body}>
        {!isLive ? (
          <View style={[styles.liveBanner, {backgroundColor: colors.warningBg, borderColor: colors.warningBorder}]}>
            <Text style={{color: colors.warningText, fontSize: 12, lineHeight: 17}}>
              Демо-данные: бэкенд агрегатора новостей ещё не подключён (см. server/news-aggregator).
            </Text>
          </View>
        ) : null}

        {loading ? (
          [0, 1, 2].map(i => (
            <Card key={i} style={styles.skeletonCard}>
              <View style={[styles.skeletonLine, {backgroundColor: colors.borderColor, width: '40%'}]} />
              <View style={[styles.skeletonLine, {backgroundColor: colors.borderColor, width: '90%', marginTop: 10}]} />
              <View style={[styles.skeletonLine, {backgroundColor: colors.borderColor, width: '70%', marginTop: 6}]} />
            </Card>
          ))
        ) : error ? (
          <Card style={styles.centerCard}>
            <Text style={{color: colors.textSecondary, textAlign: 'center'}}>Не удалось загрузить новости</Text>
            <OutlineButton
              label="Повторить"
              style={{marginTop: 12}}
              onPress={() => {
                setLoading(true);
                setError(false);
                fetchNewsList(0)
                  .then(({data, isLive: live}) => {
                    setItems(data.content);
                    setTotalPages(data.totalPages);
                    setPage(0);
                    setIsLive(live);
                  })
                  .catch(() => setError(true))
                  .finally(() => setLoading(false));
              }}
            />
          </Card>
        ) : items.length === 0 ? (
          <Card style={styles.centerCard}>
            <NewspaperIcon size={28} color={colors.textMuted} />
            <Text style={{color: colors.textSecondary, textAlign: 'center', marginTop: 8}}>Новостей пока нет</Text>
          </Card>
        ) : (
          items.map(item => (
            <TouchableOpacity key={item.id} activeOpacity={0.8} onPress={() => navigation.navigate('NewsDetail', {slug: item.slug})}>
              <Card style={styles.newsCard}>
                <View style={styles.newsMeta}>
                  <View style={[styles.sourcePill, {backgroundColor: colors.brand50}]}>
                    <Text style={[styles.sourcePillText, {color: colors.brand600}]}>{sourceLabels[item.source]}</Text>
                  </View>
                  <Text style={[styles.newsDate, {color: colors.textMuted}]}>{formatDate(item.publishedAt)}</Text>
                </View>
                <Text style={[styles.newsTitle, {color: colors.textPrimary}]} numberOfLines={3}>
                  {item.title}
                </Text>
                <Text style={[styles.newsExcerpt, {color: colors.textSecondary}]} numberOfLines={2}>
                  {item.excerpt}
                </Text>
              </Card>
            </TouchableOpacity>
          ))
        )}

        {!loading && !error && page + 1 < totalPages ? (
          <OutlineButton
            label={loadingMore ? '' : 'Показать ещё'}
            icon={loadingMore ? <ActivityIndicator size="small" color={colors.brand600} /> : undefined}
            onPress={loadMore}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 16, paddingBottom: 40, gap: 12},
  liveBanner: {borderRadius: 12, borderWidth: 1, padding: 12},
  skeletonCard: {gap: 0},
  skeletonLine: {height: 10, borderRadius: 5},
  centerCard: {alignItems: 'center', paddingVertical: 28},
  newsCard: {gap: 8},
  newsMeta: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  sourcePill: {paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, alignSelf: 'flex-start'},
  sourcePillText: {fontSize: 11, fontWeight: '700'},
  newsDate: {fontSize: 11},
  newsTitle: {fontSize: 15.5, fontWeight: '700', lineHeight: 21},
  newsExcerpt: {fontSize: 13, lineHeight: 18},
});
