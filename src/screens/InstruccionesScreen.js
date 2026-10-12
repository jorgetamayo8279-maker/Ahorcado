import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/ThemeContext';

const secciones = [
  {
    titulo: 'Objetivo del juego',
    reglas: ['Descubre la palabra seleccionando letras antes de alcanzar el máximo de 6 errores.'],
  },
  {
    titulo: 'Categorías',
    reglas: [
      'Capitales de Colombia',
      'Animales de Colombia',
      'Frutas',
      'Comidas típicas',
      'Aleatoria: selecciona una palabra entre las categorías, según el nivel elegido.',
    ],
  },
  {
    titulo: 'Niveles',
    reglas: [
      'Fácil: palabras de 4 a 6 letras, 2 pistas, sin límite de tiempo y multiplicador x1.',
      'Medio: palabras de 7 a 9 letras, 1 pista, sin límite de tiempo y multiplicador x2.',
      'Difícil: palabras de 10 o más letras, 0 pistas, 90 segundos y multiplicador x3.',
    ],
  },
  {
    titulo: 'Vidas y errores',
    reglas: [
      'El máximo es de 6 errores. Cada letra incorrecta agrega un error y una parte al dibujo del ahorcado.',
      'Las vidas restantes son 6 menos los errores cometidos. Al alcanzar 6 errores, pierdes la partida.',
    ],
  },
  {
    titulo: 'Puntaje',
    reglas: [
      'Letra correcta: +10 puntos por cada aparición.',
      'Letra incorrecta: -5 puntos.',
      'Usar una pista: -15 puntos.',
      'Victoria: +50 puntos y, además, +10 puntos por cada vida restante.',
      'Al finalizar, el subtotal se multiplica por el multiplicador de dificultad: x1, x2 o x3.',
      'El puntaje puede ser negativo; no tiene un mínimo de 0.',
    ],
  },
  {
    titulo: 'Pistas',
    reglas: [
      'Primera pista: muestra una descripción o ayuda relacionada con la palabra.',
      'Segunda pista: disponible solo en Fácil; revela al azar una letra todavía no descubierta en todas sus apariciones, sin sumar puntos de acierto.',
      'Medio solo dispone de la primera pista. Difícil no dispone de pistas.',
    ],
  },
  {
    titulo: 'Letras especiales',
    reglas: [
      'Una vocal sin tilde revela también su equivalente acentuado: por ejemplo, O puede revelar Ó. U puede revelar Ü.',
      'Ñ se considera una letra independiente de N.',
      'Los espacios de palabras compuestas se muestran desde el inicio y no se adivinan.',
    ],
  },
  {
    titulo: 'Fin de partida',
    reglas: [
      'Ganas cuando completas la palabra.',
      'Pierdes cuando alcanzas 6 errores o se agotan los 90 segundos en Difícil.',
      'Al finalizar se muestra el resultado, la palabra completa y el puntaje obtenido.',
    ],
  },
];

export default function InstruccionesScreen() {
  const styles = useThemedStyles(crearEstilos);
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.titulo} accessibilityRole="header">Cómo jugar</Text>
        {secciones.map(({ titulo, reglas }) => (
          <View key={titulo} style={styles.tarjeta}>
            <Text style={styles.tituloSeccion} accessibilityRole="header">{titulo}</Text>
            {reglas.map((regla) => (
              <Text key={regla} style={styles.texto}>{regla}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const crearEstilos = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contenido: { padding: 16, paddingBottom: 32, gap: 16 },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
  },
  tarjeta: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 10,
  },
  tituloSeccion: { fontSize: 20, fontWeight: '700', color: colors.primary },
  texto: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondaryStrong,
  },
});
