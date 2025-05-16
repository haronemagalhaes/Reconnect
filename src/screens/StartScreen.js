import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D4225" />

      <View style={styles.logoBox}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Reconnect</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D4225',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 16
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D4225',
    textTransform: 'uppercase'
  }
});