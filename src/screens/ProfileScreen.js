// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const nomeUsuario = route.params?.nome || 'Casal';

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [lockPhone, setLockPhone] = useState(false);
  const [elapsedTime, setElapsedTime] = useState('0 min');

  useEffect(() => {
    const loginTime = new Date();

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - loginTime) / 1000);
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      setElapsedTime(`${hours}h ${minutes}min`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Fundo decorativo */}
      <View style={styles.headerBackground} />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://placekitten.com/200/200' }}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{nomeUsuario}</Text>
        <Text style={styles.status}>Juntos há 2 anos</Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        <View style={styles.card}>
          <Text style={styles.item}>
            ⏳ Tempo juntos hoje: <Text style={styles.bold}>{elapsedTime}</Text>
          </Text>
          <Text style={styles.item}>
            📍 Última localização: <Text style={styles.bold}>em tempo real</Text>
          </Text>
        </View>
      </View>

      {/* Configurações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <Ionicons name="notifications" size={20} color="#0D4225" style={styles.icon} />
            <Text style={styles.item}>Notificações</Text>
            <Switch value={notificationsEnabled} onValueChange={() => setNotificationsEnabled(!notificationsEnabled)} />
          </View>
          <View style={styles.toggleRow}>
            <Ionicons name="bluetooth" size={20} color="#0D4225" style={styles.icon} />
            <Text style={styles.item}>Proximidade via Bluetooth</Text>
            <Switch value={bluetoothEnabled} onValueChange={() => setBluetoothEnabled(!bluetoothEnabled)} />
          </View>
          <View style={styles.toggleRow}>
            <Ionicons name="lock-closed" size={20} color="#0D4225" style={styles.icon} />
            <Text style={styles.item}>Bloqueio do celular</Text>
            <Switch value={lockPhone} onValueChange={() => setLockPhone(!lockPhone)} />
          </View>
        </View>
      </View>

      {/* Desafio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Desafio do Dia</Text>
        <View style={styles.card}>
          <Text style={styles.item}>📵 Quem ficar mais tempo desconectado do celular ganha!</Text>
          <TouchableOpacity
            style={styles.challengeButton}
            onPress={() => navigation.navigate('DesafioRoleta')}
          >
            <Ionicons name="trophy" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.challengeText}>Iniciar Desafio</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Ionicons name="log-out-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.logoutText}>Sair do perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  headerBackground: {
    position: 'absolute',
    height: 180,
    width: '100%',
    backgroundColor: '#0D4225',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40
  },
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 20 },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff'
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0D4225',
    padding: 6,
    borderRadius: 20
  },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 12, color: '#0D4225' },
  status: { fontSize: 14, color: '#888', marginTop: 4 },
  section: { paddingHorizontal: 20, marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#0D4225' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  item: { fontSize: 16, flex: 1, color: '#333' },
  bold: { fontWeight: 'bold' },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },
  icon: {
    marginRight: 10
  },
  challengeButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  challengeText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  logoutButton: {
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: '#ff3b30',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 12
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
