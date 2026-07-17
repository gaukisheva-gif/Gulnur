import React, {useMemo, useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {TextField} from './Field';
import {ChevronRightIcon, SearchIcon} from './Icon';
import {tnvedTree, TnvedNode} from '../data/mockData';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (code: string, name: string) => void;
};

export function TnvedPickerModal({visible, onClose, onSelect}: Props) {
  const {colors} = useTheme();
  const [stack, setStack] = useState<TnvedNode[][]>([tnvedTree]);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  const currentLevel = stack[stack.length - 1];

  const flatAll = useMemo(() => {
    const flat: {code: string; name: string; hasChildren: boolean; node: TnvedNode}[] = [];
    const walk = (nodes: TnvedNode[]) => {
      nodes.forEach(n => {
        flat.push({code: n.code, name: n.name, hasChildren: !!n.children, node: n});
        if (n.children) walk(n.children);
      });
    };
    walk(tnvedTree);
    return flat;
  }, []);

  const displayed = query.trim()
    ? flatAll.filter(
        n => n.name.toLowerCase().includes(query.toLowerCase()) || n.code.includes(query),
      )
    : currentLevel.map(n => ({code: n.code, name: n.name, hasChildren: !!n.children, node: n}));

  const reset = () => {
    setStack([tnvedTree]);
    setBreadcrumb([]);
    setQuery('');
  };

  const handlePress = (item: {code: string; name: string; hasChildren: boolean; node: TnvedNode}) => {
    if (!query.trim() && item.hasChildren) {
      setStack(prev => [...prev, item.node.children!]);
      setBreadcrumb(prev => [...prev, item.code]);
    } else {
      onSelect(item.code, item.name);
      reset();
      onClose();
    }
  };

  const goBackLevel = () => {
    if (stack.length > 1) {
      setStack(prev => prev.slice(0, -1));
      setBreadcrumb(prev => prev.slice(0, -1));
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => {
        reset();
        onClose();
      }}>
      <View style={[styles.container, {backgroundColor: colors.bgScreen}]}>
        <View style={[styles.header, {backgroundColor: colors.bgHeader, borderBottomColor: colors.borderColor}]}>
          <View style={styles.headerTop}>
            <Text style={[styles.title, {color: colors.textPrimary}]}>Выбор кода ТН ВЭД</Text>
            <TouchableOpacity
              onPress={() => {
                reset();
                onClose();
              }}>
              <Text style={{color: brand.teal600, fontWeight: '600'}}>Закрыть</Text>
            </TouchableOpacity>
          </View>
          {breadcrumb.length > 0 && !query.trim() ? (
            <TouchableOpacity onPress={goBackLevel}>
              <Text style={[styles.breadcrumb, {color: colors.textMuted}]}>← {breadcrumb.join(' / ')}</Text>
            </TouchableOpacity>
          ) : null}
          <TextField
            placeholder="Поиск по коду или наименованию"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <FlatList
          data={displayed}
          keyExtractor={item => item.code}
          contentContainerStyle={{padding: 16}}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[styles.row, {backgroundColor: colors.bgCard, borderColor: colors.borderColor}]}
              onPress={() => handlePress(item)}>
              <View style={{flex: 1}}>
                <Text style={[styles.code, {color: brand.teal600}]}>{item.code}</Text>
                <Text style={[styles.name, {color: colors.textPrimary}]}>{item.name}</Text>
              </View>
              {item.hasChildren && !query.trim() ? (
                <ChevronRightIcon size={16} color={colors.textMuted} />
              ) : null}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <SearchIcon size={22} color={colors.textMuted} />
              <Text style={{color: colors.textMuted, marginTop: 8}}>Ничего не найдено</Text>
            </View>
          }
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {padding: 16, borderBottomWidth: 1, gap: 8},
  headerTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  title: {fontSize: 17, fontWeight: '700'},
  breadcrumb: {fontSize: 12},
  searchInput: {marginTop: 4},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  code: {fontSize: 14, fontWeight: '800', marginBottom: 3},
  name: {fontSize: 13, lineHeight: 18},
  empty: {alignItems: 'center', paddingTop: 60},
});
