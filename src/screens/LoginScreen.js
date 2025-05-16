import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      setSecureEntry(true);
    }, [])
  );

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.0.8:3000/login', {
        email,
        password
      });

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Profile', { nome: response.data.user.name });
    } catch (err) {
      console.error('Erro de login:', err);
      const message = err.response?.data?.error || 'Erro ao tentar fazer login.';
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Reconnect</Text>
        <Text style={styles.subtitle}>Entre com sua conta</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail ou usuário"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            <Text style={styles.toggle}>{secureEntry ? '👁' : '🙈'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D4225',
    justifyContent: 'center',
    padding: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 12
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D4225'
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9'
  },
  passwordWrapper: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12
  },
  toggle: {
    fontSize: 18,
    marginLeft: 8
  },
  button: {
    width: '100%',
    backgroundColor: '#0D4225',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  link: {
    marginTop: 14,
    color: '#0D4225',
    fontSize: 14,
    textAlign: 'center'
  }
});
