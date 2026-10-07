import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JuegoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Juego</Text>
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
  },
});
