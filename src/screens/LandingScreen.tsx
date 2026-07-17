import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {PrimaryButton} from '../components/Buttons';
import {
  BuildingIcon,
  CalculatorIcon,
  ChevronRightIcon,
  CurrencyIcon,
  DocumentsIcon,
  SearchIcon,
} from '../components/Icon';
import {RootScreenProps} from '../navigation/types';

type Row = {icon: React.ReactNode; title: string; sub?: string};

export default function LandingScreen({navigation}: RootScreenProps<'Landing'>) {
  const {colors} = useTheme();
  const goLogin = () => navigation.navigate('Login');

  const groups: {title: string; rows: Row[]}[] = [
    {
      title: 'Таможня',
      rows: [
        {
          icon: <CalculatorIcon size={20} color={brand.teal600} />,
          title: 'Калькулятор расчёт размера обеспечения',
          sub: 'Обеспечение при таможенном транзите',
        },
        {
          icon: <SearchIcon size={20} color={brand.teal600} />,
          title: 'Автоподбор ТН ВЭД',
          sub: 'Подбор кода по наименованию товара',
        },
      ],
    },
    {
      title: 'Финансы',
      rows: [
        {icon: <BuildingIcon size={20} color={brand.teal600} />, title: 'Лицевые счета', sub: 'Сальдо лицевого счёта в КГД'},
        {
          icon: <CurrencyIcon size={20} color={brand.teal600} />,
          title: 'Курсы валют',
          sub: 'Официальный курс продажи Национального банка РК',
        },
      ],
    },
    {
      title: 'Документы',
      rows: [{icon: <DocumentsIcon size={20} color={brand.teal600} />, title: 'Документы и ДТ'}],
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[brand.teal400, brand.teal500, brand.teal600]}
          style={styles.hero}>
          <View style={styles.heroLogoRow}>
            <View style={styles.heroLogoBadge}>
              <Text style={styles.heroLogoLetter}>B</Text>
            </View>
            <Text style={styles.heroLogoTitle}>BROK.KZ</Text>
          </View>
          <Text style={styles.heroTitle}>Продукт для самостоятельного оформления груза</Text>
        </LinearGradient>

        <View style={styles.body}>
          {groups.map(group => (
            <View key={group.title} style={styles.group}>
              <Text style={[styles.groupTitle, {color: colors.textMuted}]}>{group.title}</Text>
              <View style={[styles.groupCard, {backgroundColor: colors.bgCard, borderColor: colors.borderColor}]}>
                {group.rows.map((row, idx) => (
                  <TouchableOpacity
                    key={row.title}
                    onPress={goLogin}
                    style={[
                      styles.row,
                      idx < group.rows.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
                    ]}>
                    <View style={[styles.rowIcon, {backgroundColor: colors.brand50}]}>{row.icon}</View>
                    <View style={styles.rowBody}>
                      <Text style={[styles.rowTitle, {color: colors.textPrimary}]}>{row.title}</Text>
                      {row.sub ? <Text style={[styles.rowSub, {color: colors.textMuted}]}>{row.sub}</Text> : null}
                    </View>
                    <ChevronRightIcon size={16} color={colors.textMuted} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.ctaBar, {backgroundColor: colors.bgCard, borderTopColor: colors.borderColor}]}>
        <PrimaryButton label="Войти" onPress={goLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerRow}>
          <Text style={[styles.registerText, {color: colors.textSecondary}]}>
            Нет аккаунта? <Text style={{color: brand.teal500, fontWeight: '700'}}>Зарегистрироваться</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollContent: {paddingBottom: 24},
  hero: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 28,
  },
  heroLogoRow: {flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18},
  heroLogoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLogoLetter: {color: '#fff', fontWeight: '800', fontSize: 18},
  heroLogoTitle: {color: '#fff', fontSize: 20, fontWeight: '700'},
  heroTitle: {color: '#fff', fontSize: 22, fontWeight: '700', lineHeight: 30},
  body: {paddingHorizontal: 20, paddingTop: 22},
  group: {marginBottom: 16},
  groupTitle: {fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8},
  groupCard: {borderRadius: 16, borderWidth: 1, overflow: 'hidden'},
  row: {flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14},
  rowIcon: {width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center'},
  rowBody: {flex: 1},
  rowTitle: {fontSize: 15, fontWeight: '600'},
  rowSub: {fontSize: 12, marginTop: 2},
  ctaBar: {padding: 20, borderTopWidth: 1},
  registerRow: {marginTop: 12, alignItems: 'center'},
  registerText: {fontSize: 14},
});
