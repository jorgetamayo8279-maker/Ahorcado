import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CategoriaScreen({ route }) {
  const jugador = route?.params?.jugador || 'Jugador';

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Categoría y nivel</Text>

      <Text style={styles.saludo}>
        Jugador: {jugador}
      </Text>

      <Text style={styles.texto}>
        Selecciona la categoría y el nivel de dificultad.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 24,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F3864',
    marginBottom: 20,
  },

  saludo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E75B6',
    marginBottom: 12,
  },

  texto: {
    fontSize: 16,
    color: '#334155',
  },
});
