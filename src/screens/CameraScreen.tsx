import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {BackLink} from '../components/ScreenHeader';
import {FlashIcon, QrIcon} from '../components/Icon';
import {RootScreenProps} from '../navigation/types';

export default function CameraScreen({navigation}: RootScreenProps<'Camera'>) {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <View style={styles.header}>
        <BackLink onPress={() => navigation.goBack()} />
        <Text style={[styles.title, {color: colors.textPrimary}]}>Снимите инвойс</Text>
        <View style={{width: 60}} />
      </View>

      <View style={styles.viewfinder}>
        <View style={[styles.corner, styles.tl]} />
        <View style={[styles.corner, styles.tr]} />
        <View style={[styles.corner, styles.bl]} />
        <View style={[styles.corner, styles.br]} />
        <View style={styles.docMock}>
          <View style={[styles.docLine, {width: '50%'}]} />
          <View style={[styles.docLine, {width: '85%'}]} />
          <View style={[styles.docLine, {width: '68%'}]} />
        </View>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Документ найден · света достаточно</Text>
        </View>
      </View>

      <Text style={[styles.hint, {color: colors.textSecondary}]}>Удерживайте телефон ровно и нажмите кнопку</Text>

      <View style={styles.controls}>
        <View style={[styles.smallBtn, {backgroundColor: colors.bgCard, borderColor: colors.borderInput}]}>
          <QrIcon size={20} color={colors.textSecondary} />
        </View>
        <TouchableOpacity style={styles.shutter} onPress={() => navigation.replace('AIRecognized')}>
          <View style={styles.shutterInner} />
        </TouchableOpacity>
        <View style={[styles.smallBtn, {backgroundColor: colors.bgCard, borderColor: colors.borderInput}]}>
          <FlashIcon size={20} color={colors.textSecondary} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16},
  title: {fontSize: 16, fontWeight: '600'},
  viewfinder: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#EBF4FA',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  corner: {position: 'absolute', width: 22, height: 22, borderColor: '#39B5CC'},
  tl: {top: 12, left: 12, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 4},
  tr: {top: 12, right: 12, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 4},
  bl: {bottom: 48, left: 12, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 4},
  br: {bottom: 48, right: 12, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 4},
  docMock: {position: 'absolute', top: 40, left: 28, right: 28, gap: 10},
  docLine: {height: 8, borderRadius: 5, backgroundColor: '#39B5CC'},
  statusRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingBottom: 14},
  statusDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e'},
  statusText: {fontSize: 13, color: '#1e3a5f', fontWeight: '600'},
  hint: {textAlign: 'center', fontSize: 13, marginBottom: 16},
  controls: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 36, paddingBottom: 40},
  smallBtn: {width: 48, height: 48, borderRadius: 24, borderWidth: 1, alignItems: 'center', justifyContent: 'center'},
  shutter: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff'},
});
