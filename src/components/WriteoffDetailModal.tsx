import React from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {PrimaryButton} from './Buttons';
import {DownloadIcon} from './Icon';
import {useToast} from './Toast';
import {kbkWriteoffs} from '../data/mockData';

type KbkRow = {code: string; name: string; note: string; balance: string; written: string};

export function WriteoffDetailModal({row, onClose}: {row: KbkRow | null; onClose: () => void}) {
  const {colors} = useTheme();
  const {showToast} = useToast();
  const transactions = row ? kbkWriteoffs[row.code] ?? [] : [];

  return (
    <Modal visible={!!row} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.sheet, {backgroundColor: colors.bgCard}]}>
          <View style={styles.handle} />
          {row ? (
            <>
              <Text style={[styles.code, {color: brand.teal600}]}>{row.code}</Text>
              <Text style={[styles.title, {color: colors.textPrimary}]}>{row.name}</Text>
              <Text style={[styles.note, {color: colors.textMuted}]}>{row.note}</Text>

              <View style={styles.summaryRow}>
                <View style={[styles.summaryBox, {backgroundColor: colors.bgScreen}]}>
                  <Text style={[styles.summaryLabel, {color: colors.textMuted}]}>САЛЬДО</Text>
                  <Text style={[styles.summaryValue, {color: colors.green}]}>{row.balance} ₸</Text>
                </View>
                <View style={[styles.summaryBox, {backgroundColor: colors.bgScreen}]}>
                  <Text style={[styles.summaryLabel, {color: colors.textMuted}]}>СПИСАНО</Text>
                  <Text style={[styles.summaryValue, {color: colors.textPrimary}]}>{row.written} ₸</Text>
                </View>
              </View>

              <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>Списания по декларациям</Text>
              {transactions.length === 0 ? (
                <Text style={{color: colors.textMuted, fontSize: 13, paddingVertical: 8}}>Списаний за период нет.</Text>
              ) : (
                <View style={[styles.txList, {borderColor: colors.borderColor}]}>
                  {transactions.map((t, idx) => (
                    <View
                      key={t.declaration}
                      style={[
                        styles.txRow,
                        idx < transactions.length - 1 ? {borderBottomWidth: 1, borderBottomColor: colors.borderColor} : null,
                      ]}>
                      <View style={{flex: 1}}>
                        <Text style={[styles.txDecl, {color: colors.textPrimary}]} numberOfLines={1}>
                          {t.declaration}
                        </Text>
                        <Text style={[styles.txDate, {color: colors.textMuted}]}>{t.date}</Text>
                      </View>
                      <Text style={[styles.txAmount, {color: colors.textPrimary}]}>{t.amount} ₸</Text>
                    </View>
                  ))}
                </View>
              )}

              <PrimaryButton
                label="Скачать PDF"
                icon={<DownloadIcon size={16} color="#fff" />}
                onPress={() => showToast('Отчёт формируется', `Списания по КБК ${row.code} — PDF будет готов через несколько секунд`)}
                style={styles.pdfBtn}
              />
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={{color: colors.textSecondary, fontSize: 15, fontWeight: '500'}}>Закрыть</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end'},
  sheet: {borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 32, gap: 4, maxHeight: '82%'},
  handle: {width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(148,163,184,0.4)', alignSelf: 'center', marginBottom: 10},
  code: {fontSize: 13, fontWeight: '800', letterSpacing: 0.4},
  title: {fontSize: 17, fontWeight: '700', marginTop: 2},
  note: {fontSize: 12, marginTop: 2, marginBottom: 10},
  summaryRow: {flexDirection: 'row', gap: 8, marginBottom: 14},
  summaryBox: {flex: 1, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10},
  summaryLabel: {fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4},
  summaryValue: {fontSize: 15, fontWeight: '800', marginTop: 2},
  sectionTitle: {fontSize: 13, fontWeight: '700', marginBottom: 6},
  txList: {borderRadius: 12, borderWidth: 1, overflow: 'hidden', marginBottom: 16},
  txRow: {flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8},
  txDecl: {fontSize: 12, fontWeight: '600'},
  txDate: {fontSize: 11, marginTop: 2},
  txAmount: {fontSize: 13, fontWeight: '700'},
  pdfBtn: {marginTop: 4},
  closeBtn: {alignItems: 'center', paddingVertical: 10, marginTop: 4},
});
