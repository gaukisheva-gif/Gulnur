import React, {createContext, useCallback, useContext, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BellIcon, XIcon} from './Icon';

type ToastData = {id: number; title: string; body?: string};

type ToastContextValue = {
  showToast: (title: string, body?: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const AUTO_DISMISS_MS = 4000;

export function ToastProvider({children}: {children: React.ReactNode}) {
  const [toast, setToast] = useState<ToastData | null>(null);
  const anim = useRef(new Animated.Value(0)).current;
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(0);

  const hide = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
    Animated.timing(anim, {toValue: 0, duration: 250, useNativeDriver: true}).start(() => {
      setToast(null);
    });
  }, [anim]);

  const showToast = useCallback(
    (title: string, body?: string) => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      nextId.current += 1;
      setToast({id: nextId.current, title, body});
      anim.setValue(0);
      Animated.spring(anim, {toValue: 1, useNativeDriver: true, friction: 8, tension: 80}).start();
      dismissTimer.current = setTimeout(hide, AUTO_DISMISS_MS);
    },
    [anim, hide],
  );

  const value = useMemo<ToastContextValue>(() => ({showToast}), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.wrap,
            {
              opacity: anim,
              transform: [
                {
                  translateY: anim.interpolate({inputRange: [0, 1], outputRange: [24, 0]}),
                },
              ],
            },
          ]}>
          <View style={styles.card}>
            <View style={styles.iconBadge}>
              <BellIcon size={18} color="#fff" />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.title} numberOfLines={2}>
                {toast.title}
              </Text>
              {toast.body ? (
                <Text style={styles.body} numberOfLines={3}>
                  {toast.body}
                </Text>
              ) : null}
            </View>
            <TouchableOpacity onPress={hide} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <XIcon size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 100,
    zIndex: 9999,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1e293b',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 8},
    elevation: 12,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#0D8298',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textWrap: {flex: 1, minWidth: 0},
  title: {fontSize: 14, fontWeight: '700', color: '#f1f5f9', marginBottom: 3},
  body: {fontSize: 13, color: '#94a3b8', lineHeight: 18},
});
