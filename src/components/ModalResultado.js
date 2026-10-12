import React from 'react';
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useThemedStyles } from '../theme/ThemeContext';

export default function ModalResultado({
  visible = false,
  estado,
  palabra,
  puntaje,
  onJugarDeNuevo,
  onMenu,
}) {
  const styles = useThemedStyles(crearEstilos);
  if (!visible || (estado !== 'ganado' && estado !== 'perdido')) return null;

  const ganado = estado === 'ganado';
  const titulo = ganado ? '¡Ganaste!' : 'Perdiste';
  const palabraCompleta = typeof palabra === 'string' && palabra.trim()
    ? palabra : 'Palabra no disponible';
  const puntos = Number.isFinite(puntaje) ? puntaje : 0;
  const puedeReiniciar = typeof onJugarDeNuevo === 'function';
  const puedeIrAlMenu = typeof onMenu === 'function';

  function jugarDeNuevo() {
    if (puedeReiniciar) onJugarDeNuevo();
  }

  function irAlMenu() {
    if (puedeIrAlMenu) onMenu();
  }

  return (
    <Modal visible transparent animationType="fade" onRequestClose={irAlMenu}>
      <View style={styles.fondo}>
        <View
          style={[styles.tarjeta, ganado ? styles.victoria : styles.derrota]}
          accessibilityViewIsModal
        >
          <ScrollView contentContainerStyle={styles.contenido}>
            <Text style={styles.titulo} accessibilityRole="header">
              {titulo}
            </Text>
            <Text style={styles.etiqueta}>La palabra era</Text>
            <Text style={styles.palabra} accessibilityLabel={`Palabra: ${palabraCompleta}`}>
              {palabraCompleta}
            </Text>
            <Text style={styles.puntaje} accessibilityLabel={`Puntaje final: ${puntos}`}>
              Puntaje final: {puntos}
            </Text>
            <Pressable
              onPress={jugarDeNuevo}
              disabled={!puedeReiniciar}
              accessibilityRole="button"
              accessibilityLabel="Jugar de nuevo"
              accessibilityState={{ disabled: !puedeReiniciar }}
              style={({ pressed }) => [
                styles.boton, styles.botonPrincipal,
                pressed && styles.presionado, !puedeReiniciar && styles.deshabilitado,
              ]}
            >
              <Text style={styles.textoPrincipal}>Jugar de nuevo</Text>
            </Pressable>
            <Pressable
              onPress={irAlMenu}
              disabled={!puedeIrAlMenu}
              accessibilityRole="button"
              accessibilityLabel="Volver al menú"
              accessibilityState={{ disabled: !puedeIrAlMenu }}
              style={({ pressed }) => [
                styles.boton, styles.botonMenu,
                pressed && styles.presionado, !puedeIrAlMenu && styles.deshabilitado,
              ]}
            >
              <Text style={styles.textoMenu}>Menú</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const crearEstilos = (colors) => StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  tarjeta: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderTopWidth: 6,
    overflow: 'hidden',
  },
  victoria: { borderTopColor: colors.success },
  derrota: { borderTopColor: colors.danger },
  contenido: { padding: 20, gap: 16 },
  titulo: { fontSize: 28, fontWeight: '700', color: colors.primary, textAlign: 'center' },
  etiqueta: { fontSize: 16, color: colors.textSecondaryStrong, textAlign: 'center' },
  palabra: { fontSize: 24, fontWeight: '700', color: colors.primary, textAlign: 'center' },
  puntaje: { fontSize: 18, color: colors.textSecondaryStrong, textAlign: 'center' },
  boton: {
    minHeight: 48,
    minWidth: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonPrincipal: { backgroundColor: colors.secondary },
  botonMenu: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
  textoPrincipal: { fontSize: 16, fontWeight: '600', color: colors.onButton, textAlign: 'center' },
  textoMenu: { fontSize: 16, fontWeight: '600', color: colors.primary, textAlign: 'center' },
  presionado: { opacity: 0.8 },
  deshabilitado: { opacity: 0.5 },
});
