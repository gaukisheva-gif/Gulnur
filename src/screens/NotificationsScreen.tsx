import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {FilterChip} from '../components/Buttons';
import {notifications, NotifCategory} from '../data/mockData';
import {MainTabScreenProps} from '../navigation/types';

type Filter = 'all' | NotifCategory;

export default function NotificationsScreen({}: MainTabScreenProps<'Notifications'>) {
  const {colors} = useTheme();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.category === filter);
  const groups = Array.from(new Set(filtered.map(n => n.group)));

  const counts = {
    all: notifications.length,
    dt: notifications.filter(n => n.category === 'dt').length,
    contracts: notifications.filter(n => n.category === 'contracts').length,
    licenses: notifications.filter(n => n.category === 'licenses').length,
  };

  const dotColor = (dot: string) => {
    switch (dot) {
      case 'green':
        return colors.green;
      case 'orange':
        return colors.orange;
      case 'red':
        return colors.red;
      case 'blue':
        return colors.blue;
      default:
        return colors.textMuted;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <View style={[styles.header, {backgroundColor: colors.bgHeader}]}>
        <Text style={[styles.title, {color: colors.textPrimary}]}>Сообщения</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          <FilterChip label="Все" count={counts.all} active={filter === 'all'} onPress={() => setFilter('all')} />
          <FilterChip label="ДТ" count={counts.dt} active={filter === 'dt'} onPress={() => setFilter('dt')} />
          <FilterChip label="Контракты" count={counts.contracts} active={filter === 'contracts'} onPress={() => setFilter('contracts')} />
          <FilterChip label="Лицензии" count={counts.licenses} active={filter === 'licenses'} onPress={() => setFilter('licenses')} />
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {groups.map(group => (
          <View key={group}>
            <Text style={[styles.groupTitle, {color: colors.textMuted}]}>{group}</Text>
            {filtered
              .filter(n => n.group === group)
              .map(n => (
                <View key={n.id} style={[styles.item, {backgroundColor: colors.bgCard}]}>
                  <View style={[styles.dot, {backgroundColor: dotColor(n.dot)}]} />
                  <View style={{flex: 1}}>
                    <View style={styles.titleRow}>
                      <Text style={[styles.itemTitle, {color: colors.textPrimary}]}>{n.title}</Text>
                      <Text style={[styles.time, {color: colors.textMuted}]}>{n.time}</Text>
                    </View>
                    <Text style={[styles.desc, {color: colors.textSecondary}]}>{n.desc}</Text>
                  </View>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {paddingTop: 12, paddingBottom: 8, paddingHorizontal: 20},
  title: {fontSize: 28, fontWeight: '600', letterSpacing: -0.6, marginBottom: 16},
  filterRow: {gap: 6, paddingBottom: 4},
  list: {padding: 20, paddingBottom: 100},
  groupTitle: {fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, paddingVertical: 10},
  item: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  dot: {width: 8, height: 8, borderRadius: 4, marginTop: 6},
  titleRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 8},
  itemTitle: {fontSize: 14, fontWeight: '700', flex: 1, lineHeight: 19},
  time: {fontSize: 12},
  desc: {fontSize: 13, lineHeight: 18},
});
