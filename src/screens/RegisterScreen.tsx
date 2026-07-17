import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {BackLink} from '../components/ScreenHeader';
import {TextField} from '../components/Field';
import {PrimaryButton} from '../components/Buttons';
import {RootScreenProps} from '../navigation/types';

export default function RegisterScreen({navigation}: RootScreenProps<'Register'>) {
  const {colors} = useTheme();
  const [company, setCompany] = useState('');
  const [bin, setBin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.bgScreen}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.topBar}>
        <BackLink onPress={() => navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, {color: colors.textPrimary}]}>Регистрация</Text>
        <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
          Создайте аккаунт декларанта, чтобы оформлять ДТ и отслеживать статусы
        </Text>

        <View style={styles.form}>
          <TextField label="Название компании" placeholder="ТОО «Компания»" value={company} onChangeText={setCompany} />
          <TextField label="БИН" placeholder="180940012345" value={bin} onChangeText={setBin} keyboardType="number-pad" />
          <TextField
            label="Электронная почта"
            placeholder="you@company.kz"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextField label="Телефон" placeholder="+7 700 000 00 00" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TextField label="Пароль" placeholder="Придумайте пароль" value={password} onChangeText={setPassword} secureTextEntry />

          <PrimaryButton label="Зарегистрироваться" onPress={() => navigation.replace('Login')} style={styles.submitBtn} />

          <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.loginRow}>
            <Text style={[styles.loginText, {color: colors.textSecondary}]}>
              Уже есть аккаунт? <Text style={{color: brand.teal500, fontWeight: '700'}}>Войти</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  topBar: {paddingHorizontal: 20, paddingTop: 16},
  body: {paddingHorizontal: 24, paddingBottom: 32, paddingTop: 12},
  title: {fontSize: 24, fontWeight: '700', marginBottom: 8, letterSpacing: -0.4},
  subtitle: {fontSize: 14, lineHeight: 20, marginBottom: 28},
  form: {gap: 16},
  submitBtn: {marginTop: 8},
  loginRow: {alignItems: 'center', marginTop: 4},
  loginText: {fontSize: 15},
});
