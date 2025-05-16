import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.0.8:3000/users')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} - {item.email}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 18, marginBottom: 5 },
});
