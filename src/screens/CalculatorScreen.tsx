import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {ScreenHeader} from '../components/ScreenHeader';
import {Card} from '../components/Card';
import {FieldLabel, SelectField, TextField} from '../components/Field';
import {PrimaryButton} from '../components/Buttons';
import {CalculatorIcon, PlusIcon, TrashIcon} from '../components/Icon';
import {TnvedPickerModal} from '../components/TnvedPickerModal';
import {useToast} from '../components/Toast';
import {RootScreenProps} from '../navigation/types';

type GoodsRow = {
  id: number;
  tnvedCode: string;
  tnvedName: string;
  cost: string;
  customsValue: string;
};

const countries = ['Китай (CN)', 'Германия (DE)', 'Турция (TR)', 'Россия (RU)', 'США (US)'];
const transportModes = [
  {key: 'auto', label: '🚚 Авто'},
  {key: 'rail', label: '🚆 Ж/Д'},
  {key: 'sea', label: '🚢 Море'},
  {key: 'air', label: '✈️ Авиа'},
];

function parseNumber(value: string): number {
  const cleaned = value.replace(/[^0-9.,]/g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function formatKzt(value: number): string {
  return Math.round(value).toLocaleString('ru-RU') + ' ₸';
}

const declTypes = ['Транзитная декларация', 'Декларация на товары', 'Пассажирская декларация'];
const moveSpecs = ['ФЛ', 'ЮЛ', 'МП', 'СП'];

type CalcResult = {
  duty: number;
  excise: number;
  antidump: number;
  ndsBasis: number;
  nds: number;
  total: number;
  base: number;
  goodsCount: number;
  perGood: {row: GoodsRow; share: number}[];
};

export default function CalculatorScreen({navigation, route}: RootScreenProps<'Calculator'>) {
  const {colors} = useTheme();
  const {showToast} = useToast();
  const prefill = route.params;
  const [declType, setDeclType] = useState(declTypes[0]);
  const [personType, setPersonType] = useState('');
  const [moveType, setMoveType] = useState('');
  const [moveSpec, setMoveSpec] = useState('');
  const [fromCountry, setFromCountry] = useState('');
  const [toCountry, setToCountry] = useState('Казахстан (KZ)');
  const [transport, setTransport] = useState('auto');
  const [transportCost, setTransportCost] = useState('0');
  const [rows, setRows] = useState<GoodsRow[]>([
    {id: 1, tnvedCode: prefill?.prefillTnvedCode ?? '', tnvedName: '', cost: '0', customsValue: '0'},
  ]);
  const [pickerRowId, setPickerRowId] = useState<number | null>(null);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [schemeOpen, setSchemeOpen] = useState(true);
  const [openDetailId, setOpenDetailId] = useState<number | null>(null);

  useEffect(() => {
    if (prefill?.prefillTnvedCode) {
      const label = prefill.prefillKind === 'tpin' ? 'ТПиН' : 'размера обеспечения';
      showToast(
        'Код перенесён в калькулятор',
        `${prefill.prefillTnvedCode} · расчёт ${label} · укажите стоимость и транспорт, затем «Рассчитать»`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRow = () => {
    setRows(prev => [
      ...prev,
      {id: prev.length ? Math.max(...prev.map(r => r.id)) + 1 : 1, tnvedCode: '', tnvedName: '', cost: '0', customsValue: '0'},
    ]);
  };

  const removeRow = (id: number) => {
    setRows(prev => (prev.length > 1 ? prev.filter(r => r.id !== id) : prev));
  };

  const updateRow = (id: number, patch: Partial<GoodsRow>) => {
    setRows(prev => prev.map(r => (r.id === id ? {...r, ...patch} : r)));
  };

  const runCalc = () => {
    const goodsTotal = rows.reduce((sum, r) => sum + parseNumber(r.customsValue), 0);
    const base = goodsTotal + parseNumber(transportCost);
    const duty = Math.round(base * 0.05);
    const excise = 0;
    const antidump = 0;
    const ndsBasis = base + duty;
    const nds = Math.round(ndsBasis * 0.22);
    const total = duty + excise + antidump + nds;

    const rowValues = rows.map(r => parseNumber(r.customsValue));
    const rowTotal = rowValues.reduce((a, b) => a + b, 0);
    const perGood = rows.map((row, i) => ({
      row,
      share: rowTotal > 0 ? rowValues[i] / rowTotal : 1 / rows.length,
    }));

    setResult({duty, excise, antidump, ndsBasis, nds, total, base, goodsCount: rows.length, perGood});
    setOpenDetailId(null);
    showToast('Расчёт выполнен', `Итоговая сумма обеспечения: ${formatKzt(total)}`);
  };

  const resetCalc = () => setResult(null);

  return (
    <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
      <ScreenHeader
        title="Калькулятор расчёт размера обеспечения при транзите"
        subtitle="Транзит через Республику Казахстан · расчёт в тенге по действующим ставкам и курсам валют"
        onBack={() => navigation.goBack()}
        backLabel="Сервисы"
      />

      <ScrollView contentContainerStyle={styles.body}>
        <Card style={{gap: 12}}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>Общая информация</Text>
          <SelectField label="Тип декларации" required value={declType} options={declTypes} onChange={setDeclType} />
          <SelectField label="Тип лица" required value={personType} options={['Физическое лицо', 'Юридическое лицо', 'Индивидуальный предприниматель']} onChange={setPersonType} />
          <View style={styles.row2}>
            <View style={{flex: 1}}>
              <SelectField label="Вид перемещения" required value={moveType} options={['ИМ', 'ЭК', 'ВТ', 'ТР', 'ТС']} onChange={setMoveType} />
            </View>
            <View style={{flex: 1}}>
              <SelectField label="Особенность перемещения" required value={moveSpec} options={moveSpecs} onChange={setMoveSpec} />
            </View>
          </View>
          <View style={styles.row2}>
            <View style={{flex: 1}}>
              <SelectField label="Страна отправления" required value={fromCountry} options={countries} onChange={setFromCountry} />
            </View>
            <View style={{flex: 1}}>
              <SelectField label="Страна назначения" required value={toCountry} options={['Казахстан (KZ)', 'Россия (RU)', 'Кыргызстан (KG)', 'Узбекистан (UZ)']} onChange={setToCountry} />
            </View>
          </View>
        </Card>

        <Card style={{gap: 12}}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>Товары</Text>
          {rows.map(row => (
            <View key={row.id} style={[styles.goodsRow, {borderColor: colors.borderColor}]}>
              <TouchableOpacity
                style={[styles.tnvedBtn, {borderColor: colors.inputBorder, backgroundColor: colors.inputBg}]}
                onPress={() => setPickerRowId(row.id)}>
                <Text style={{color: row.tnvedCode ? colors.inputText : colors.inputPlaceholder, fontSize: 12}} numberOfLines={1}>
                  {row.tnvedCode ? `${row.tnvedCode} · ${row.tnvedName}` : 'Код ТН ВЭД *'}
                </Text>
              </TouchableOpacity>
              <View style={styles.row2}>
                <TextField
                  label="Стоимость"
                  value={row.cost}
                  onChangeText={v => updateRow(row.id, {cost: v})}
                  keyboardType="numeric"
                  style={{textAlign: 'right'}}
                />
                <TextField
                  label="Там. стоимость"
                  value={row.customsValue}
                  onChangeText={v => updateRow(row.id, {customsValue: v})}
                  keyboardType="numeric"
                  style={{textAlign: 'right'}}
                />
              </View>
              {rows.length > 1 ? (
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeRow(row.id)}>
                  <TrashIcon size={15} color="#ef4444" />
                  <Text style={{color: '#ef4444', fontSize: 12, fontWeight: '600'}}>Удалить товар</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
          <TouchableOpacity
            style={[styles.addBtn, {borderColor: colors.inputBorder, backgroundColor: colors.bgScreen}]}
            onPress={addRow}>
            <PlusIcon size={14} color={brand.teal600} strokeWidth={2.5} />
            <Text style={{color: brand.teal600, fontSize: 12, fontWeight: '600'}}>Добавить товар</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{gap: 12}}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>Транспорт и доставка</Text>
          <FieldLabel label="Способ перевозки" required />
          <View style={styles.transportTabs}>
            {transportModes.map(mode => (
              <TouchableOpacity
                key={mode.key}
                style={[
                  styles.transportTab,
                  {
                    backgroundColor: transport === mode.key ? brand.teal600 : colors.bgScreen,
                    borderColor: colors.inputBorder,
                  },
                ]}
                onPress={() => setTransport(mode.key)}>
                <Text style={{color: transport === mode.key ? '#fff' : colors.textSecondary, fontSize: 13, fontWeight: '600'}}>
                  {mode.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextField
            label="Транспортные расходы"
            value={transportCost}
            onChangeText={setTransportCost}
            keyboardType="numeric"
            style={{textAlign: 'right'}}
          />
        </Card>

        {result ? (
          <>
            <Card style={{gap: 0}}>
              <TouchableOpacity style={styles.schemeHeader} onPress={() => setSchemeOpen(v => !v)}>
                <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>Схема расчёта</Text>
                <Text style={{color: colors.textMuted, fontSize: 16}}>{schemeOpen ? '⌃' : '⌄'}</Text>
              </TouchableOpacity>
              {schemeOpen ? (
                <View style={{marginTop: 8}}>
                  {[
                    ['Тип декларации', declType],
                    ['Вид перемещения', moveType || 'ИМ'],
                    ['Особенность перемещения', moveSpec || 'ФЛ'],
                    ['Страна отправления', fromCountry || '—'],
                    ['Страна назначения', toCountry || '—'],
                    ['Количество товаров', String(result.goodsCount)],
                  ].map(([label, value]) => (
                    <View key={label} style={[styles.schemeRow, {borderBottomColor: colors.borderColor}]}>
                      <Text style={{color: colors.textSecondary, fontSize: 12}}>{label}</Text>
                      <Text style={{color: colors.textPrimary, fontSize: 12, fontWeight: '600'}}>{value}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </Card>

            <Card style={{gap: 10, borderColor: colors.brand100}}>
              <Text style={[styles.sectionTitle, {color: brand.teal600}]}>Таможенные платежи</Text>
              <View style={styles.resultRow}>
                <Text style={{color: colors.textSecondary, fontSize: 13}}>Ввозная таможенная пошлина</Text>
                <Text style={{color: colors.textPrimary, fontSize: 13, fontWeight: '700'}}>{formatKzt(result.duty)}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={{color: colors.textSecondary, fontSize: 13}}>Акциз и антидемпинговая пошлина</Text>
                <Text style={{color: colors.textMuted, fontSize: 13, fontWeight: '700'}}>
                  {formatKzt(result.excise + result.antidump)}
                </Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={{color: colors.textSecondary, fontSize: 13}}>НДС (22%)</Text>
                <Text style={{color: colors.textPrimary, fontSize: 13, fontWeight: '700'}}>{formatKzt(result.nds)}</Text>
              </View>
              <View style={[styles.resultRow, {borderTopWidth: 1, borderTopColor: colors.borderColor, paddingTop: 10}]}>
                <Text style={{color: colors.textPrimary, fontSize: 13, fontWeight: '600'}}>Итоговая сумма обеспечения</Text>
                <Text style={{color: brand.teal600, fontSize: 17, fontWeight: '800'}}>{formatKzt(result.total)}</Text>
              </View>
              <Text style={{color: colors.textMuted, fontSize: 11, lineHeight: 16}}>
                Расчёт выполнен по курсу Нацбанка РК. Точные суммы уточняйте у таможенного брокера.
              </Text>
            </Card>

            <Card style={{gap: 2, padding: 0, overflow: 'hidden'}}>
              <Text style={[styles.sectionTitle, {color: colors.textPrimary, padding: 16, paddingBottom: 8}]}>
                Детали расчёта по товарам
              </Text>
              {result.perGood.map(({row, share}, i) => {
                const rowTotal = Math.round(result.total * share);
                const rowDuty = Math.round(result.duty * share);
                const rowNds = Math.round(result.nds * share);
                const rowNdsBasis = Math.round(result.ndsBasis * share);
                const open = openDetailId === row.id;
                return (
                  <View key={row.id} style={[styles.detailBlock, {borderTopColor: colors.borderColor}]}>
                    <TouchableOpacity
                      style={styles.detailRow}
                      onPress={() => setOpenDetailId(open ? null : row.id)}>
                      <Text style={{color: colors.textPrimary, fontSize: 12, fontWeight: '600', width: 20}}>{i + 1}</Text>
                      <Text style={{color: colors.textPrimary, fontSize: 12, fontWeight: '600', flex: 1}} numberOfLines={1}>
                        {row.tnvedCode || '–'}
                      </Text>
                      <Text style={{color: colors.textPrimary, fontSize: 12, fontWeight: '700'}}>
                        {rowTotal.toLocaleString('ru-RU')} ₸
                      </Text>
                      <Text style={{color: colors.textMuted, fontSize: 14, marginLeft: 8}}>{open ? '⌃' : '⌄'}</Text>
                    </TouchableOpacity>
                    {open ? (
                      <View style={[styles.detailBody, {backgroundColor: colors.bgScreen, borderTopColor: colors.borderColor}]}>
                        {[
                          ['Ввозная таможенная пошлина', result.base * share, '5%', rowDuty],
                          ['Акциз', 0, 'Не распр.', 0],
                          ['Антидемпинговая пошлина', 0, 'Не распр.', 0],
                          ['НДС', rowNdsBasis, '22%', rowNds],
                        ].map(([name, basis, rate, sum]) => (
                          <View key={name as string} style={styles.detailPayRow}>
                            <Text style={{color: colors.textPrimary, fontSize: 11, flex: 1}}>{name}</Text>
                            <Text style={{color: colors.textSecondary, fontSize: 11, width: 80}}>
                              {Math.round(basis as number).toLocaleString('ru-RU')}
                            </Text>
                            <Text style={{color: colors.textSecondary, fontSize: 11, width: 56}}>{rate}</Text>
                            <Text style={{color: colors.textPrimary, fontSize: 11, fontWeight: '700', width: 64, textAlign: 'right'}}>
                              {Math.round(sum as number).toLocaleString('ru-RU')}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </Card>

            <TouchableOpacity onPress={resetCalc} style={{alignSelf: 'center'}}>
              <Text style={{color: brand.teal600, fontWeight: '600', fontSize: 13}}>Новый расчёт</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </ScrollView>

      <View style={[styles.footer, {backgroundColor: colors.bgScreen, borderTopColor: colors.borderColor}]}>
        <PrimaryButton
          label="Рассчитать"
          icon={<CalculatorIcon size={18} color="#fff" />}
          onPress={runCalc}
        />
      </View>

      <TnvedPickerModal
        visible={pickerRowId !== null}
        onClose={() => setPickerRowId(null)}
        onSelect={(code, name) => {
          if (pickerRowId !== null) updateRow(pickerRowId, {tnvedCode: code, tnvedName: name});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 16, paddingBottom: 120, gap: 14},
  sectionTitle: {fontSize: 16, fontWeight: '700'},
  row2: {flexDirection: 'row', gap: 10},
  goodsRow: {borderWidth: 1, borderRadius: 10, padding: 10, gap: 10},
  tnvedBtn: {borderWidth: 1, borderRadius: 8, padding: 11},
  removeBtn: {flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-end'},
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 9,
  },
  transportTabs: {flexDirection: 'row', borderRadius: 8, overflow: 'hidden', gap: 6},
  transportTab: {flex: 1, paddingVertical: 9, borderRadius: 8, borderWidth: 1, alignItems: 'center'},
  resultRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  footer: {position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, borderTopWidth: 1},
  schemeHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  schemeRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 7, borderBottomWidth: 1},
  detailBlock: {borderTopWidth: 1},
  detailRow: {flexDirection: 'row', alignItems: 'center', padding: 12, gap: 4},
  detailBody: {padding: 10, borderTopWidth: 1, gap: 4},
  detailPayRow: {flexDirection: 'row', alignItems: 'center', paddingVertical: 3},
});
