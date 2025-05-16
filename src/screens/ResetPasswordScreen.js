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
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email || !token || !newPassword) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return Alert.alert('Erro', 'Informe um e-mail válido.');
    }

    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!strongPassword.test(newPassword)) {
      return Alert.alert(
        'Erro',
        'A senha deve ter no mínimo 6 caracteres, com letras e números.'
      );
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.0.8:3000/reset-password', {
        email,
        token,
        newPassword
      });

      Alert.alert('Sucesso', response.data.message || 'Senha redefinida com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao redefinir a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Redefinir Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail cadastrado"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Campo de e-mail"
      />

      <TextInput
        style={styles.input}
        placeholder="Token recebido por e-mail"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
        accessibilityLabel="Campo de token"
      />

      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        accessibilityLabel="Campo de nova senha"
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
