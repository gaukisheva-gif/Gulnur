import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {CurrencyTicker} from '../components/CurrencyTicker';
import {StatusBadge} from '../components/StatusBadge';
import {WarningIcon, DocumentsIcon, CalculatorIcon, SearchIcon, BuildingIcon, ChevronRightIcon} from '../components/Icon';
import {declarations} from '../data/mockData';
import {MainTabScreenProps} from '../navigation/types';

export default function HomeScreen({navigation}: MainTabScreenProps<'Home'>) {
  const {colors} = useTheme();

  const quickActions = [
    {label: 'Документы и ДТ', icon: DocumentsIcon, badge: true, onPress: () => navigation.navigate('Documents')},
    {label: 'Калькулятор', icon: CalculatorIcon, onPress: () => navigation.navigate('Calculator')},
    {label: 'Автоподбор ТНВЭД', icon: SearchIcon, onPress: () => navigation.navigate('Tnved')},
    {label: 'Лицевые счета', icon: BuildingIcon, onPress: () => navigation.navigate('Accounts')},
    {label: 'Калькулятор ТПиН', icon: CalculatorIcon, onPress: () => navigation.navigate('Calculator', {prefillKind: 'tpin'})},
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.companyName, {color: colors.textPrimary}]}>ТОО «Аруна Импорт»</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <LinearGradient colors={['#5fd3e8', brand.teal600]} style={styles.avatar}>
              <Text style={styles.avatarText}>АК</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <CurrencyTicker onPress={() => navigation.navigate('Rates')} />

        <View style={styles.quickList}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.label}
              style={[styles.quickRow, {backgroundColor: colors.bgCard}]}
              onPress={action.onPress}>
              <View style={[styles.quickIcon, {backgroundColor: colors.brand50}]}>
                <action.icon size={22} color={brand.teal600} />
                {action.badge ? (
                  <View style={styles.quickBadge}>
                    <Text style={styles.quickBadgeText}>!</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[styles.quickLabel, {color: colors.textPrimary}]}>{action.label}</Text>
              <ChevronRightIcon size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.warningBanner, {backgroundColor: colors.warningBg, borderColor: colors.warningBorder}]}
          onPress={() => navigation.navigate('LicenseDetail', {licenseId: 'KZ-MZ-2026-0492'})}>
          <View style={styles.warningIconBadge}>
            <WarningIcon size={20} color={colors.warningIcon} />
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.warningText, {color: colors.warningText}]}>
              Лицензия <Text style={{fontWeight: '700'}}>KZ-MZ-2026-0492</Text> · Импорт лекарственных средств — истекает
              скоро
            </Text>
            <Text style={[styles.warningLink, {color: colors.warningLink}]}>Подробнее →</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>Текущие декларации</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Documents')}>
            <Text style={[styles.sectionLink, {color: brand.teal600}]}>Все →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.declList}>
          {declarations.slice(0, 3).map(decl => (
            <TouchableOpacity
              key={decl.id}
              style={[styles.declCard, {backgroundColor: colors.bgCard, borderLeftColor: colors[declBorderKey(decl.statusColor)]}]}
              onPress={() => navigation.navigate('Documents')}>
              <View style={styles.declHeader}>
                <Text style={[styles.declNumber, {color: colors.textSecondary}]}>{decl.regNumber}</Text>
                <StatusBadge label={decl.status} color={decl.statusColor} />
              </View>
              <Text style={[styles.corridorLabel, {color: colors.textSecondary}]}>Коридор: {decl.corridor}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function declBorderKey(color: string) {
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 14,
  },
  companyName: {fontSize: 20, fontWeight: '700', letterSpacing: -0.2, marginTop: 6, flex: 1, paddingRight: 12},
  avatar: {width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center'},
  avatarText: {color: '#fff', fontSize: 14, fontWeight: '700'},
  quickList: {gap: 12, paddingHorizontal: 20, paddingBottom: 22},
  quickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
  },
  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  quickBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickBadgeText: {color: '#fff', fontSize: 11, fontWeight: '700', lineHeight: 13},
  quickLabel: {fontSize: 16, fontWeight: '500', flex: 1},
  warningBanner: {
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  warningIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(217,119,6,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {fontSize: 14, lineHeight: 19},
  warningLink: {fontSize: 13, fontWeight: '600', marginTop: 6},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  sectionTitle: {fontSize: 18, fontWeight: '700', letterSpacing: -0.3},
  sectionLink: {fontSize: 14, fontWeight: '600'},
  declList: {paddingHorizontal: 20, paddingBottom: 24, gap: 12},
  declCard: {
    borderRadius: 18,
    padding: 18,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  declHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8},
  declNumber: {fontSize: 13, fontWeight: '600'},
  corridorLabel: {fontSize: 13, fontWeight: '500'},
});
