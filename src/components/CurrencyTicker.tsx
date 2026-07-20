import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {brand} from '../theme/colors';
import {fetchNbkRates, sortRates, Rate} from '../data/nbkRates';

// Constant scroll speed in pixels/second — duration scales with content width
// so the perceived speed stays the same no matter how many rates are shown.
const SPEED_PX_PER_SEC = 40;

function TickerContent({shown, onLayout}: {shown: Rate[]; onLayout?: (e: LayoutChangeEvent) => void}) {
  return (
    <View style={styles.row} onLayout={onLayout}>
      {shown.map((r, idx) => (
        <React.Fragment key={r.code + idx}>
          <Text style={styles.item}>
            <Text style={styles.pair}>{r.code}/KZT </Text>
            {r.rate.toFixed(2)}
          </Text>
          <Text style={styles.divider}>·</Text>
        </React.Fragment>
      ))}
    </View>
  );
}

export function CurrencyTicker({onPress}: {onPress: () => void}) {
  const [rates, setRates] = useState<Rate[]>([]);
  const pairs = ['USD', 'EUR', 'CNY', 'RUB', 'GBP', 'TRY'];
  const [contentWidth, setContentWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    if (contentWidth === 0) return;
    translateX.setValue(0);
    const duration = (contentWidth / SPEED_PX_PER_SEC) * 1000;
    const loop = Animated.loop(
      Animated.timing(translateX, {
        toValue: -contentWidth,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [contentWidth, translateX]);

  const onMeasure = (e: LayoutChangeEvent) => {
    const w = Math.ceil(e.nativeEvent.layout.width);
    if (w !== contentWidth) setContentWidth(w);
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[styles.wrap, {backgroundColor: brand.teal600}]}>
      <View style={styles.viewport}>
        {shown.length === 0 ? (
          <Text style={styles.item}>Загрузка курсов...</Text>
        ) : (
          <Animated.View style={[styles.track, {transform: [{translateX}]}]}>
            <TickerContent shown={shown} onLayout={onMeasure} />
            {contentWidth > 0 ? <TickerContent shown={shown} /> : null}
          </Animated.View>
        )}
      </View>
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
  viewport: {
    overflow: 'hidden',
  },
  track: {
    flexDirection: 'row',
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
