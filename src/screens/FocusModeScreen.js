// src/screens/FocusModeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FocusModeScreen() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  const navigation = useNavigation();
  const progress = new Animated.Value(1); // 100%

  useEffect(() => {
    const total = 15 * 60;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          Alert.alert('Modo Foco', 'Parabéns! Você concluiu o tempo de foco.');
          navigation.goBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    Animated.timing(progress, {
      toValue: 0,
      duration: total * 1000,
      useNativeDriver: false
    }).start();

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleExit = () => {
    Alert.alert(
      'Sair do Modo Foco',
      'Tem certeza que deseja sair antes do tempo acabar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim, sair', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modo Foco Ativado</Text>

      <Animated.View style={[styles.progressBar, {
        transform: [{
          scaleX: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }]
      }]} />

      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <Text style={styles.message}>Aproveite esse momento com quem você ama ❤️</Text>

      <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
        <Text style={styles.exitText}>Sair do modo foco</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#00ffcc',
    marginBottom: 30,
    borderRadius: 4
  },
  timer: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#00ffcc',
    marginBottom: 20
  },
  message: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20
  },
  exitButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 2
  },
  exitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
