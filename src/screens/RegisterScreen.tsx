import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {FieldLabel, TextField} from '../components/Field';
import {PrimaryButton} from '../components/Buttons';
import {useToast} from '../components/Toast';
import {RootScreenProps} from '../navigation/types';

function PasswordField({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
}) {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <FieldLabel label={label} />
      <View style={styles.passwordWrap}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.inputPlaceholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          style={[
            styles.input,
            {backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText},
          ]}
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setVisible(v => !v)} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Text style={{color: colors.textMuted, fontSize: 12, fontWeight: '600'}}>{visible ? 'Скрыть' : 'Показать'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Checkbox({checked, onToggle, label}: {checked: boolean; onToggle: () => void; label: string}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={styles.checkboxRow} onPress={onToggle} activeOpacity={0.7}>
      <View
        style={[
          styles.checkboxBox,
          {
            borderColor: checked ? brand.teal600 : colors.inputBorder,
            backgroundColor: checked ? brand.teal600 : 'transparent',
          },
        ]}>
        {checked ? <Text style={styles.checkboxTick}>✓</Text> : null}
      </View>
      <Text style={[styles.checkboxLabel, {color: colors.textSecondary}]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function RegisterScreen({navigation}: RootScreenProps<'Register'>) {
  const {colors} = useTheme();
  const {showToast} = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const doRegister = () => {
    if (!agree1 || !agree2) {
      showToast('Необходимо согласие', 'Пожалуйста, подтвердите оба пункта');
      return;
    }
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.bgScreen}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.topBar, {backgroundColor: colors.bgHeader, borderBottomColor: colors.borderColor}]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backText}>‹ Назад</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, {color: colors.textPrimary}]}>Регистрация</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
            Уже есть аккаунт? <Text style={{color: brand.teal500, fontWeight: '700'}}>Войти</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.form}>
          <TextField
            label="Почта"
            placeholder="example@mail.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <PasswordField label="Пароль" placeholder="6+ символов" value={password} onChangeText={setPassword} />
          <PasswordField
            label="Подтверждение пароля"
            placeholder="Повторите пароль"
            value={password2}
            onChangeText={setPassword2}
          />

          <View style={[styles.ecpNote, {backgroundColor: colors.bgScreen, borderColor: colors.borderColor}]}>
            <Text style={[styles.ecpNoteText, {color: colors.textSecondary}]}>
              Фамилия, имя и ИИН будут получены из ЭЦП.
            </Text>
          </View>

          <View style={styles.checkboxGroup}>
            <Checkbox checked={agree1} onToggle={() => setAgree1(v => !v)} label="Я ознакомился с пользовательским соглашением" />
            <Checkbox
              checked={agree2}
              onToggle={() => setAgree2(v => !v)}
              label="Я согласен(а) на сбор и обработку персональных данных"
            />
          </View>

          <PrimaryButton label="Подписать и зарегистрироваться" onPress={doRegister} style={styles.submitBtn} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  passwordWrap: {position: 'relative', justifyContent: 'center'},
  input: {
    width: '100%',
    paddingHorizontal: 14,
    paddingRight: 76,
    paddingVertical: 11,
    borderRadius: 8,
    fontSize: 14,
    borderWidth: 1,
  },
  eyeBtn: {position: 'absolute', right: 14},
  topBar: {paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1},
  backBtn: {flexDirection: 'row', alignItems: 'center'},
  backText: {color: brand.teal600, fontSize: 15, fontWeight: '600'},
  body: {paddingHorizontal: 24, paddingBottom: 32, paddingTop: 16},
  title: {fontSize: 22, fontWeight: '700', marginBottom: 4, letterSpacing: -0.5},
  subtitle: {fontSize: 15, marginBottom: 20},
  form: {gap: 10},
  ecpNote: {borderRadius: 10, borderWidth: 1, padding: 10},
  ecpNoteText: {fontSize: 12, lineHeight: 17},
  checkboxGroup: {gap: 8, marginTop: 2},
  checkboxRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 10},
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTick: {color: '#fff', fontSize: 12, fontWeight: '700', lineHeight: 14},
  checkboxLabel: {fontSize: 14, lineHeight: 20, flex: 1},
  submitBtn: {marginTop: 16},
});
