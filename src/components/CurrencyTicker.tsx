import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {brand} from '../theme/colors';
import {fetchNbkRates, sortRates, Rate} from '../data/nbkRates';

export function CurrencyTicker({onPress}: {onPress: () => void}) {
  const [rates, setRates] = useState<Rate[]>([]);
  const pairs = ['USD', 'EUR', 'CNY', 'RUB', 'GBP', 'TRY'];

  useEffect(() => {
    let mounted = true;
    fetchNbkRates().then(({rates: r}) => {
      if (mounted) setRates(sortRates(r));
    });
    return () => {
      mounted = false;
    };
  }, []);

  const shown = pairs.map(code => rates.find(r => r.code === code)).filter(Boolean) as Rate[];

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[styles.wrap, {backgroundColor: brand.teal600}]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {shown.length === 0 ? (
          <Text style={styles.item}>Загрузка курсов...</Text>
        ) : (
          shown.map((r, idx) => (
            <React.Fragment key={r.code}>
              <Text style={styles.item}>
                <Text style={styles.pair}>{r.code}/KZT </Text>
                {r.rate.toFixed(2)}
              </Text>
              {idx < shown.length - 1 ? <Text style={styles.divider}>·</Text> : null}
            </React.Fragment>
          ))
        )}
      </ScrollView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 9,
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  item: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  pair: {
    opacity: 0.75,
    fontWeight: '500',
  },
  divider: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    marginHorizontal: 10,
  },
});
