import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G, Line } from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';

export default function Ahorcado({ errores = 0 }) {
  const { paleta: colors } = useTheme();
  // Los valores inválidos no dibujan partes; las fracciones usan etapas completas.
  const etapas = typeof errores === 'number' && Number.isFinite(errores)
    ? Math.min(6, Math.max(0, Math.floor(errores)))
    : 0;

  return (
    <View
      style={styles.contenedor}
      accessible
      accessibilityRole="image"
      accessibilityLabel={`Ahorcado: ${etapas} de 6 errores`}
    >
      <Svg width="100%" height="100%" viewBox="0 0 240 280" preserveAspectRatio="xMidYMid meet">
        {/* El patíbulo permanece visible en todas las etapas. */}
        <G stroke={colors.primary} strokeWidth={6} strokeLinecap="round" fill="none">
          <Line x1={25} y1={260} x2={125} y2={260} />
          <Line x1={60} y1={260} x2={60} y2={25} />
          <Line x1={60} y1={25} x2={165} y2={25} />
          <Line x1={60} y1={65} x2={100} y2={25} />
          <Line x1={165} y1={25} x2={165} y2={55} />
        </G>
        <G stroke={colors.danger} strokeWidth={5} strokeLinecap="round" fill="none">
          {etapas >= 1 && <Circle cx={165} cy={77} r={22} />}
          {etapas >= 2 && <Line x1={165} y1={99} x2={165} y2={175} />}
          {etapas >= 3 && <Line x1={165} y1={115} x2={125} y2={150} />}
          {etapas >= 4 && <Line x1={165} y1={115} x2={205} y2={150} />}
          {etapas >= 5 && <Line x1={165} y1={175} x2={130} y2={225} />}
          {etapas >= 6 && <Line x1={165} y1={175} x2={200} y2={225} />}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    aspectRatio: 240 / 280,
  },
});
