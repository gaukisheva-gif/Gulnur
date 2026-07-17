import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {brand} from '../theme/colors';
import {BackLink} from '../components/ScreenHeader';
import {TextField} from '../components/Field';
import {PrimaryButton, SecondaryButton} from '../components/Buttons';
import {RootScreenProps} from '../navigation/types';

export default function LoginScreen({navigation}: RootScreenProps<'Login'>) {
  const {colors} = useTheme();
  const [email, setEmail] = useState('aliya@aruna-import.kz');
  const [password, setPassword] = useState('password123');

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.bgScreen}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.topBar}>
        <BackLink onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.body}>
        <View style={styles.logoRow}>
          <View style={[styles.logoBadge, {borderColor: brand.teal600}]}>
            <Text style={[styles.logoLetter, {color: brand.teal600}]}>B</Text>
          </View>
          <Text style={[styles.logoTitle, {color: colors.textPrimary}]}>BROK.KZ</Text>
        </View>

        <View style={styles.form}>
          <TextField
            label="Электронная почта"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextField label="Пароль" value={password} onChangeText={setPassword} secureTextEntry />

          <PrimaryButton label="Войти" onPress={() => navigation.replace('Main')} style={styles.loginBtn} />

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerRow}>
            <Text style={[styles.registerText, {color: colors.textSecondary}]}>
              Нет аккаунта? <Text style={{color: brand.teal500, fontWeight: '700'}}>Зарегистрироваться</Text>
            </Text>
          </TouchableOpacity>

          <SecondaryButton label="Войти через ЭЦП" onPress={() => navigation.replace('Main')} style={styles.ecpBtn} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  topBar: {paddingHorizontal: 20, paddingTop: 16},
  body: {flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 24},
  logoRow: {flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 32},
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {fontSize: 20, fontWeight: '800'},
  logoTitle: {fontSize: 22, fontWeight: '700', letterSpacing: -0.3},
  form: {gap: 16},
  loginBtn: {marginTop: 8},
  registerRow: {alignItems: 'center', marginTop: 4},
  registerText: {fontSize: 15},
  ecpBtn: {marginTop: 12},
});
