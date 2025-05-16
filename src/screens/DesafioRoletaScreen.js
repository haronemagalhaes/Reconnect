// src/screens/DesafioRoletaScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const desafios = [
    'Ficar 30 minutos sem olhar o celular',
    'Fazer um elogio para o parceiro',
    'Desconectar e caminhar juntos por 10 minutos',
    'Assistir a um vídeo romântico juntos sem celular',
    'Enviar uma mensagem de carinho',
    'Contar algo que admira um no outro'
];

export default function DesafioRoletaScreen({ navigation }) {
    const [desafio, setDesafio] = useState(null);

    const sortearDesafio = () => {
        const index = Math.floor(Math.random() * desafios.length);
        setDesafio(desafios[index]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Roleta do Desafio</Text>

            <TouchableOpacity style={styles.button} onPress={sortearDesafio}>
                <Ionicons name="sync" size={24} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>Sortear Desafio</Text>
            </TouchableOpacity>

            {desafio && (
                <View style={styles.card}>
                    <Text style={styles.desafioText}>{desafio}</Text>
                </View>
            )}

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={18} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D4225',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 5,
        maxWidth: '90%',
        alignItems: 'center'
    },
    desafioText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D4225',
        textAlign: 'center'
    },
    backButton: {
        flexDirection: 'row',
        backgroundColor: '#555',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    backText: {
        color: '#fff',
        fontWeight: 'bold'
    }
});