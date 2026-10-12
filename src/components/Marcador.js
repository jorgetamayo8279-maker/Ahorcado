import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function Marcador({ vidasRestantes, puntaje, tiempoRestante }) {
  const vidas = Number.isFinite(vidasRestantes)
    ? Math.min(6, Math.max(0, Math.floor(vidasRestantes))) : 0;
  const puntos = Number.isFinite(puntaje) ? puntaje : 0;
  const segundos = Number.isFinite(tiempoRestante)
    ? Math.max(0, Math.floor(tiempoRestante)) : null;
  const avisoVidas = vidas === 0 ? 'Sin vidas' : vidas <= 2 ? '¡Pocas vidas!' : '';
  const datos = [
    {
      clave: 'vidas', titulo: 'Vidas', valor: String(vidas), aviso: avisoVidas,
      etiqueta: `${vidas} ${vidas === 1 ? 'vida restante' : 'vidas restantes'}`,
    },
    { clave: 'puntaje', titulo: 'Puntaje', valor: String(puntos), aviso: '', etiqueta: `Puntaje ${puntos}` },
  ];

  if (segundos !== null) {
    const minutos = String(Math.floor(segundos / 60)).padStart(2, '0');
    const resto = String(segundos % 60).padStart(2, '0');
    datos.push({
      clave: 'tiempo', titulo: 'Tiempo', valor: `${minutos}:${resto}`,
      aviso: segundos === 0 ? 'Tiempo agotado' : segundos <= 10 ? '¡Poco tiempo!' : '',
      etiqueta: `Tiempo restante ${segundos} ${segundos === 1 ? 'segundo' : 'segundos'}`,
    });
  }

  return (
    <View style={styles.marcador}>
      {datos.map((dato) => (
        <View
          key={dato.clave}
          style={[styles.dato, Boolean(dato.aviso) && styles.critico]}
          accessible
          accessibilityLabel={`${dato.etiqueta}${dato.aviso ? `. ${dato.aviso}` : ''}`}
        >
          <Text style={styles.titulo}>{dato.titulo}</Text>
          <Text style={[styles.valor, Boolean(dato.aviso) && styles.textoCritico]}>
            {dato.valor}
          </Text>
          {Boolean(dato.aviso) && <Text style={styles.aviso}>{dato.aviso}</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  marcador: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  dato: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 80,
    minWidth: 0,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  titulo: { fontSize: 14, color: colors.gray700, textAlign: 'center' },
  valor: { fontSize: 22, fontWeight: '700', color: colors.primary, textAlign: 'center' },
  critico: { borderColor: colors.danger },
  textoCritico: { color: colors.danger },
  aviso: { fontSize: 14, fontWeight: '600', color: colors.danger, textAlign: 'center' },
});
