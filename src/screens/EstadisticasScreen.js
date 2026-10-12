import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { leerEstadisticas, leerRanking, ESTADISTICAS_POR_DEFECTO } from '../storage/almacenamiento';
import { useThemedStyles } from '../theme/ThemeContext';
import FooterAutor from '../components/FooterAutor';

function textoSeguro(valor) {
  return typeof valor === 'string' && valor.trim() ? valor : 'No disponible';
}

function mostrarFecha(valor) {
  try {
    if (typeof valor !== 'string' && typeof valor !== 'number') return 'Fecha no disponible';
    const fecha = new Date(valor);
    if (!Number.isFinite(fecha.getTime())) return 'Fecha no disponible';
    return fecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return 'Fecha no disponible';
  }
}

function crearTopDiez(ranking) {
  const repeticiones = new Map();
  // Las claves usan los datos del registro; el contador distingue duplicados exactos.
  return ranking.map((registro) => {
    const identidad = JSON.stringify([
      registro.nombre, registro.puntaje, registro.categoria, registro.nivel, registro.fecha,
    ]);
    const repeticion = repeticiones.get(identidad) ?? 0;
    repeticiones.set(identidad, repeticion + 1);
    return { ...registro, clave: `${identidad}:${repeticion}` };
  }).sort((a, b) => b.puntaje - a.puntaje).slice(0, 10);
}

export default function EstadisticasScreen() {
  const styles = useThemedStyles(crearEstilos);
  const [estadisticas, setEstadisticas] = useState({ ...ESTADISTICAS_POR_DEFECTO });
  const [ranking, setRanking] = useState([]);
  const [cargando, setCargando] = useState(true);

  useFocusEffect(useCallback(() => {
    let activo = true;
    setCargando(true);
    async function cargar() {
      const [stats, puntajes] = await Promise.allSettled([leerEstadisticas(), leerRanking()]);
      // Ignora lecturas pendientes si la pantalla pierde foco o se desmonta.
      if (!activo) return;
      setEstadisticas(stats.status === 'fulfilled' ? stats.value : { ...ESTADISTICAS_POR_DEFECTO });
      setRanking(puntajes.status === 'fulfilled' ? crearTopDiez(puntajes.value) : []);
      setCargando(false);
    }
    cargar();
    return () => { activo = false; };
  }, []));

  const porcentaje = estadisticas.jugadas === 0
    ? 0 : Math.round(estadisticas.ganadas / estadisticas.jugadas * 100);
  const indicadores = [
    { titulo: 'Partidas jugadas', valor: estadisticas.jugadas },
    { titulo: 'Partidas ganadas', valor: estadisticas.ganadas },
    { titulo: 'Partidas perdidas', valor: estadisticas.perdidas },
    { titulo: 'Porcentaje de victorias', valor: `${porcentaje}%`, lectura: `${porcentaje} por ciento` },
    { titulo: 'Racha actual', valor: estadisticas.rachaActual },
    { titulo: 'Mejor racha', valor: estadisticas.mejorRacha },
  ];

  function mostrarRegistro({ item, index }) {
    const nombre = textoSeguro(item.nombre);
    const categoria = textoSeguro(item.categoria);
    const nivel = textoSeguro(item.nivel);
    const fecha = mostrarFecha(item.fecha);
    return (
      <View
        style={styles.registro}
        accessible
        accessibilityLabel={`Posición ${index + 1}. ${nombre}. Puntaje: ${item.puntaje}. Categoría: ${categoria}. Nivel: ${nivel}. ${fecha}.`}
      >
        <Text style={styles.nombre}>{index + 1}. {nombre}</Text>
        <Text style={styles.puntaje}>Puntaje: {item.puntaje}</Text>
        <Text style={styles.texto}>Categoría: {categoria}</Text>
        <Text style={styles.texto}>Nivel: {nivel}</Text>
        <Text style={styles.texto}>Fecha: {fecha}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={cargando ? [] : ranking}
        keyExtractor={(item) => item.clave}
        renderItem={mostrarRegistro}
        contentContainerStyle={styles.contenido}
        ListHeaderComponent={(
          <View style={styles.encabezado}>
            <Text style={styles.titulo} accessibilityRole="header">Estadísticas</Text>
            {cargando ? (
              <Text style={styles.texto} accessibilityLiveRegion="polite">Cargando estadísticas…</Text>
            ) : (
              <View style={styles.indicadores}>
                {indicadores.map(({ titulo, valor, lectura }) => (
                  <View key={titulo} style={styles.tarjeta} accessible accessibilityLabel={`${titulo}: ${lectura ?? valor}`}>
                    <Text style={styles.texto}>{titulo}</Text>
                    <Text style={styles.valor}>{valor}</Text>
                  </View>
                ))}
              </View>
            )}
            <Text style={styles.titulo} accessibilityRole="header">Top 10 de puntajes</Text>
          </View>
        )}
        ListEmptyComponent={cargando ? null : <Text style={styles.texto}>Aún no hay puntajes registrados.</Text>}
        ListFooterComponent={FooterAutor}
      />
    </SafeAreaView>
  );
}

const crearEstilos = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  contenido: { padding: 12, paddingBottom: 24 },
  encabezado: { gap: 12, marginBottom: 12 },
  titulo: { fontSize: 22, fontWeight: '700', color: colors.primary },
  indicadores: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tarjeta: { flexGrow: 1, flexBasis: 130, padding: 12, backgroundColor: colors.surface, borderRadius: 10 },
  valor: { fontSize: 24, fontWeight: '700', color: colors.primary, marginTop: 4 },
  texto: { fontSize: 14, color: colors.textSecondaryStrong },
  registro: { padding: 12, marginBottom: 8, gap: 4, backgroundColor: colors.surface, borderRadius: 10 },
  nombre: { fontSize: 18, fontWeight: '700', color: colors.primary },
  puntaje: { fontSize: 16, fontWeight: '600', color: colors.primary },
});
