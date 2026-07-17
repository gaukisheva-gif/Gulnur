import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {BuildingIcon, CalculatorIcon, ChevronRightIcon, CurrencyIcon, SearchIcon} from '../components/Icon';
import {MainTabScreenProps} from '../navigation/types';

type ServiceRow = {icon: React.ReactNode; title: string; sub: string; onPress?: () => void; soon?: boolean};

export default function ServicesScreen({navigation}: MainTabScreenProps<'ServicesTab'>) {
  const {colors} = useTheme();

  const groups: {title: string; rows: ServiceRow[]}[] = [
    {
      title: 'Таможня',
      rows: [
        {
          icon: <CalculatorIcon size={20} color={colors.brand600} />,
          title: 'Калькулятор расчёт размера обеспечения',
          sub: 'Обеспечение при таможенном транзите',
          onPress: () => navigation.navigate('Calculator'),
        },
        {
          icon: <SearchIcon size={20} color={colors.brand600} />,
          title: 'Автоподбор ТН ВЭД',
          sub: 'Подбор кода по наименованию товара',
          onPress: () => navigation.navigate('Tnved'),
        },
      ],
    },
    {
      title: 'Финансы',
      rows: [
        {
          icon: <BuildingIcon size={20} color={colors.brand600} />,
          title: 'Лицевые счета',
          sub: 'Сальдо лицевого счёта в КГД',
          onPress: () => navigation.navigate('Accounts'),
        },
        {
          icon: <CurrencyIcon size={20} color={colors.brand600} />,
          title: 'Курсы валют',
          sub: 'Официальный курс продажи Национального банка РК',
          onPress: () => navigation.navigate('Rates'),
        },
      ],
    },
    {
      title: 'Скоро',
      rows: [
        {
          icon: <CalculatorIcon size={20} color={colors.brand600} />,
          title: 'Калькулятор ТПиН',
          sub: 'Расчёт таможенных платежей и налогов',
          soon: true,
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <View style={[styles.header, {backgroundColor: colors.bgHeader}]}>
        <Text style={[styles.company, {color: colors.textMuted}]}>Инструменты и расчёты</Text>
        <Text style={[styles.title, {color: colors.textPrimary}]}>Сервисы</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {groups.map(group => (
          <View key={group.title}>
            <Text style={[styles.groupTitle, {color: colors.textMuted}]}>{group.title}</Text>
            <View
              style={[
                styles.groupCard,
                {backgroundColor: colors.bgCard, borderColor: colors.borderColor, opacity: group.title === 'Скоро' ? 0.6 : 1},
              ]}>
              {group.rows.map((row, idx) => (
                <TouchableOpacity
                  key={row.title}
                  disabled={row.soon}
                  onPress={row.onPress}
                  style={[
                    styles.row,
                    idx < group.rows.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
                  ]}>
                  <View style={[styles.rowIcon, {backgroundColor: colors.brand50}]}>{row.icon}</View>
                  <View style={{flex: 1}}>
                    <Text style={[styles.rowTitle, {color: colors.textPrimary}]}>{row.title}</Text>
                    <Text style={[styles.rowSub, {color: colors.textMuted}]}>{row.sub}</Text>
                  </View>
                  {row.soon ? (
                    <View style={styles.soonBadge}>
                      <Text style={styles.soonBadgeText}>Скоро</Text>
                    </View>
                  ) : (
                    <ChevronRightIcon size={16} color={colors.textMuted} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {paddingBottom: 14, paddingTop: 12, paddingHorizontal: 20},
  company: {fontSize: 13, marginBottom: 4},
  title: {fontSize: 22, fontWeight: '700'},
  body: {padding: 16, gap: 16, paddingBottom: 100},
  groupTitle: {fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8, marginLeft: 4},
  groupCard: {borderRadius: 14, borderWidth: 1, overflow: 'hidden'},
  row: {flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16},
  rowIcon: {width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center'},
  rowTitle: {fontSize: 15, fontWeight: '600'},
  rowSub: {fontSize: 12, marginTop: 2},
  soonBadge: {backgroundColor: '#eef1f6', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3},
  soonBadgeText: {fontSize: 10, fontWeight: '700', color: '#4b5468'},
});
