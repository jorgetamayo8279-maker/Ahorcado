import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '../theme/ThemeContext';

export default function FooterAutor({ style }) {
  const styles = useThemedStyles(crearEstilos);

  return (
    <Text style={[styles.texto, style]}>
      Desarrollado por Jorge Tamayo
    </Text>
  );
}

const crearEstilos = (colors) => StyleSheet.create({
  texto: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
