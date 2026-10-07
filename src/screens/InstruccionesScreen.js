import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InstruccionesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Instrucciones</Text>
      <Text style={styles.texto}>
        Esta pantalla será desarrollada en el siguiente bloque.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F2F2F2',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F3864',
    marginBottom: 16,
  },
  texto: {
    fontSize: 16,
    color: '#334155',
  },
});
