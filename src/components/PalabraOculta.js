import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { normalizar } from '../hooks/useJuego';
import colors from '../theme/colors';

export default function PalabraOculta({
  palabra = '',
  letrasAcertadas = [],
  revelarCompleta = false,
}) {
  const caracteres = typeof palabra === 'string' ? [...palabra.normalize('NFC')] : [];
  const acertadas = new Set(
    Array.isArray(letrasAcertadas) ? letrasAcertadas.map(normalizar) : []
  );
  const visibles = caracteres.map((letra) => {
    if (/\s/.test(letra)) return '\u2003';
    return revelarCompleta || acertadas.has(normalizar(letra)) ? letra : '_';
  });
  // Describe solo lo visible: el lector de pantalla no revela letras pendientes.
  const descripcion = visibles.length === 0
    ? 'Sin palabra'
    : `Palabra: ${visibles.map((letra) => {
      if (letra === '\u2003') return 'espacio entre palabras';
      return letra === '_' ? 'letra oculta' : letra;
    }).join(', ')}`;

  return (
    <Text
      style={styles.palabra}
      accessible
      accessibilityLabel={descripcion}
    >
      {visibles.join(' ')}
    </Text>
  );
}

const styles = StyleSheet.create({
  palabra: {
    width: '100%',
    flexShrink: 1,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 38,
    fontWeight: '700',
    color: colors.primary,
    paddingVertical: 8,
  },
});
