import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const FILAS = ['ABCDEF', 'GHIJKL', 'MNÑOP', 'QRSTU', 'VWXYZ'];

export default function Teclado({
  letrasAcertadas = [],
  letrasFalladas = [],
  letrasUsadas = [],
  onLetra,
  deshabilitado = false,
}) {
  const acertadas = new Set(Array.isArray(letrasAcertadas) ? letrasAcertadas : []);
  const falladas = new Set(Array.isArray(letrasFalladas) ? letrasFalladas : []);
  const usadas = new Set(Array.isArray(letrasUsadas) ? letrasUsadas : []);

  return (
    <View style={styles.teclado}>
      {FILAS.map((fila) => (
        <View key={fila} style={styles.fila}>
          {[...fila].map((letra) => {
            const acertada = acertadas.has(letra);
            const fallada = !acertada && falladas.has(letra);
            const bloqueada = Boolean(deshabilitado) || usadas.has(letra)
              || acertada || fallada || typeof onLetra !== 'function';
            const estado = acertada ? 'acertada' : fallada ? 'fallada'
              : bloqueada ? 'deshabilitada' : 'disponible';
            const marca = acertada ? '✓' : fallada ? '×' : bloqueada ? '—' : '';

            return (
              <Pressable
                key={letra}
                accessible
                accessibilityRole="button"
                accessibilityLabel={`Letra ${letra}, ${estado}`}
                accessibilityState={{ disabled: bloqueada }}
                disabled={bloqueada}
                onPress={() => {
                  if (!bloqueada) onLetra(letra);
                }}
                style={({ pressed }) => [
                  styles.tecla,
                  acertada && styles.acertada,
                  fallada && styles.fallada,
                  bloqueada && !acertada && !fallada && styles.deshabilitada,
                  bloqueada && styles.atenuada,
                  pressed && !bloqueada && styles.presionada,
                ]}
              >
                <Text style={[styles.letra, (acertada || fallada) && styles.textoResultado]}>
                  {letra}
                </Text>
                <Text style={[styles.marca, (acertada || fallada) && styles.textoResultado]}>
                  {marca}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  teclado: { width: '100%', gap: 6 },
  fila: { flexDirection: 'row', justifyContent: 'center', gap: 4 },
  tecla: {
    flex: 1,
    minWidth: 0,
    maxWidth: 48,
    minHeight: 48,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.secondary,
    backgroundColor: colors.white,
  },
  letra: { fontSize: 18, lineHeight: 22, fontWeight: '700', color: colors.primary },
  marca: { fontSize: 14, lineHeight: 16, color: colors.gray700 },
  acertada: { backgroundColor: colors.success, borderColor: colors.success },
  fallada: { backgroundColor: colors.danger, borderColor: colors.danger },
  deshabilitada: { backgroundColor: colors.gray100, borderColor: colors.gray300 },
  atenuada: { opacity: 0.6 },
  presionada: { backgroundColor: colors.gray100 },
  textoResultado: { color: colors.white },
});
