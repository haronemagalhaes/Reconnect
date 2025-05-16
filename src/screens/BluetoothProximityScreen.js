// src/screens/BluetoothProximityScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default function BluetoothProximityScreen() {
  const fakeDevices = [
    { id: '1', name: 'Dispositivo A' },
    { id: '2', name: 'Dispositivo B' },
    { id: '3', name: 'Dispositivo C' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulação de Dispositivos por Perto</Text>

      <TouchableOpacity style={styles.scanButton}>
        <Text style={styles.buttonText}>Simular Busca</Text>
      </TouchableOpacity>

      <FlatList
        data={fakeDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text style={styles.deviceId}>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  scanButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  deviceItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  deviceName: { fontSize: 16, fontWeight: 'bold' },
  deviceId: { fontSize: 12, color: '#666' }
});
