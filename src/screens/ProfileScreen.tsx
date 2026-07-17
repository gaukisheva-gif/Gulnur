import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {ScreenHeader} from '../components/ScreenHeader';
import {ChevronRightIcon} from '../components/Icon';
import {RootScreenProps} from '../navigation/types';

export default function ProfileScreen({navigation}: RootScreenProps<'Profile'>) {
  const {colors, isDark, toggleTheme} = useTheme();
  const [pushEnabled, setPushEnabled] = useState(true);

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader title="Профиль" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.profileCard, {backgroundColor: colors.bgCard}]}>
          <LinearGradient colors={['#5fd3e8', brand.teal600]} style={styles.avatar}>
            <Text style={styles.avatarText}>АК</Text>
          </LinearGradient>
          <View style={{flex: 1}}>
            <Text style={[styles.name, {color: colors.textPrimary}]}>Алия Кожабекова</Text>
            <Text style={[styles.sub, {color: colors.textSecondary}]}>
              Декларант: ТОО «Аруна Импорт»{'\n'}БИН: 180940012345
            </Text>
          </View>
        </View>

        <View style={[styles.settingsList, {backgroundColor: colors.bgCard}]}>
          <TouchableOpacity
            style={[styles.settingsItem, {borderBottomColor: colors.borderColor}]}
            onPress={() => navigation.navigate('Main')}>
            <Text style={[styles.settingsLabel, {color: colors.textPrimary}]}>Сообщения</Text>
            <View style={styles.settingsValueRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
              <ChevronRightIcon size={16} color={colors.textMuted} />
            </View>
          </TouchableOpacity>

          <View style={[styles.settingsItem, {borderBottomColor: colors.borderColor}]}>
            <Text style={[styles.settingsLabel, {color: colors.textPrimary}]}>Тариф</Text>
            <Text style={[styles.settingsValueGray, {color: colors.textMuted}]}>Пакет 30 · осталось 18 ДТ</Text>
          </View>

          <TouchableOpacity style={[styles.settingsItem, {borderBottomColor: colors.borderColor}]} onPress={toggleTheme}>
            <Text style={[styles.settingsLabel, {color: colors.textPrimary}]}>Тема оформления</Text>
            <View style={styles.settingsValueRow}>
              <Text style={{color: colors.textSecondary, fontSize: 14}}>{isDark ? 'Тёмная' : 'Светлая'}</Text>
              <View style={[styles.toggleTrack, {backgroundColor: isDark ? brand.teal600 : '#e2e8f0'}]}>
                <View style={[styles.toggleThumb, isDark ? {transform: [{translateX: 20}]} : null]} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItemLast} onPress={() => setPushEnabled(prev => !prev)}>
            <Text style={[styles.settingsLabel, {color: colors.textPrimary}]}>Уведомления на телефон</Text>
            <Text style={{color: pushEnabled ? colors.green : colors.textMuted, fontSize: 14, fontWeight: '600'}}>
              {pushEnabled ? '✓ Включены' : 'Выключены'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.logoutBtn, {backgroundColor: colors.bgCard, borderColor: colors.logoutBorder}]}
          onPress={() => navigation.reset({index: 0, routes: [{name: 'Landing'}]})}>
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 20, paddingBottom: 40, gap: 16},
  profileCard: {borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16},
  avatar: {width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center'},
  avatarText: {color: '#fff', fontSize: 20, fontWeight: '700'},
  name: {fontSize: 16, fontWeight: '700', marginBottom: 4},
  sub: {fontSize: 13, lineHeight: 19},
  settingsList: {borderRadius: 16, overflow: 'hidden'},
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingsItemLast: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16},
  settingsLabel: {fontSize: 15, fontWeight: '500'},
  settingsValueRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
  settingsValueGray: {fontSize: 14, fontWeight: '600'},
  badge: {backgroundColor: '#ef4444', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2, minWidth: 20, alignItems: 'center'},
  badgeText: {color: '#fff', fontSize: 12, fontWeight: '700'},
  toggleTrack: {width: 44, height: 24, borderRadius: 12, padding: 2, justifyContent: 'center'},
  toggleThumb: {width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff'},
  logoutBtn: {borderRadius: 999, borderWidth: 1, padding: 16, alignItems: 'center'},
  logoutText: {color: '#dc2626', fontSize: 16, fontWeight: '600'},
});
