import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email || !email.includes('@')) {
      return Alert.alert('Erro', 'Informe um e-mail válido.');
    }

    try {
      setLoading(true);
      await axios.post('http://192.168.0.8:3000/forgot-password', { email });

      Alert.alert(
        'Solicitação enviada',
        'Se o e-mail estiver cadastrado, você receberá um código para redefinir sua senha.'
      );

      navigation.navigate('ResetPassword');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.response?.data?.error || 'Não foi possível enviar o e-mail.');
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
        <Text style={styles.title}>Esqueci minha senha</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          accessibilityLabel="Campo de e-mail"
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enviar solicitação</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.link}>Já tem o código? Redefinir senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Voltar para o login</Text>
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
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 12
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D4225',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15
  },
  button: {
    width: '100%',
    backgroundColor: '#0D4225',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  link: {
    marginTop: 14,
    color: '#0D4225',
    textAlign: 'center'
  }
});
