import React, { useCallback, useRef, useState } from 'react';
import { View, Text, Switch, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  leerConfiguracion, guardarConfiguracion, borrarEstadisticas, CONFIGURACION_POR_DEFECTO,
} from '../storage/almacenamiento';
import colors from '../theme/colors';

export default function ConfiguracionScreen() {
  const [configuracion, setConfiguracion] = useState({ ...CONFIGURACION_POR_DEFECTO });
  const [cargando, setCargando] = useState(true);
  const [operacion, setOperacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const actual = useRef(configuracion);
  const sesionActual = useRef(null);
  const ocupado = useRef(false);
  const confirmacion = useRef(null);
  const pendiente = useRef(Promise.resolve());

  useFocusEffect(useCallback(() => {
    const sesion = {};
    sesionActual.current = sesion;
    setCargando(true);
    setMensaje('');
    setOperacion('');
    async function cargar() {
      let datos;
      try {
        await pendiente.current;
        if (sesionActual.current !== sesion) return;
        datos = await leerConfiguracion();
      } catch {
        datos = { ...CONFIGURACION_POR_DEFECTO };
      }
      if (sesionActual.current !== sesion) return;
      actual.current = datos;
      setConfiguracion(datos);
      setCargando(false);
    }
    cargar();
    return () => {
      if (sesionActual.current === sesion) sesionActual.current = null;
      if (confirmacion.current === sesion) confirmacion.current = null;
    };
  }, []));

  const bloqueado = cargando || operacion !== '';

  function cambiar(campo, valor) {
    const sesion = sesionActual.current;
    if (!sesion || cargando || ocupado.current || confirmacion.current) return;
    const anterior = actual.current;
    if (anterior[campo] === valor) return;
    const siguiente = { ...anterior, [campo]: valor };
    ocupado.current = true;
    actual.current = siguiente;
    setConfiguracion(siguiente);
    setOperacion('guardando');
    setMensaje('');
    pendiente.current = (async () => {
      let guardado = false;
      try {
        guardado = await guardarConfiguracion(siguiente);
      } catch {
        guardado = false;
      }
      ocupado.current = false;
      if (sesionActual.current !== sesion) return;
      if (!guardado) {
        actual.current = anterior;
        setConfiguracion(anterior);
      }
      setMensaje(guardado ? 'Configuración guardada.' : 'No se pudo guardar. Inténtalo de nuevo.');
      setOperacion('');
    })();
  }

  function solicitarBorrado() {
    const sesion = sesionActual.current;
    if (!sesion || cargando || ocupado.current || confirmacion.current) return;
    confirmacion.current = sesion;
    Alert.alert('Borrar estadísticas', 'Se eliminarán las estadísticas y el ranking. Esta acción no se puede deshacer.', [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => { if (confirmacion.current === sesion) confirmacion.current = null; },
      },
      {
        text: 'Borrar',
        style: 'destructive',
        onPress: () => {
          if (sesionActual.current !== sesion || confirmacion.current !== sesion || ocupado.current) return;
          confirmacion.current = null;
          ocupado.current = true;
          setOperacion('borrando');
          setMensaje('');
          pendiente.current = (async () => {
            let borrado = false;
            try {
              borrado = await borrarEstadisticas();
            } catch {
              borrado = false;
            }
            ocupado.current = false;
            if (sesionActual.current !== sesion) return;
            setMensaje(borrado ? 'Estadísticas y ranking eliminados.' : 'No se pudo borrar. Inténtalo de nuevo.');
            setOperacion('');
          })();
        },
      },
    ], { cancelable: false });
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.titulo} accessibilityRole="header">Configuración</Text>
        {cargando && <Text style={styles.texto} accessibilityLiveRegion="polite">Cargando configuración…</Text>}
        {[
          { campo: 'sonido', titulo: 'Sonido', estado: configuracion.sonido ? 'activado' : 'desactivado' },
          { campo: 'vibracion', titulo: 'Vibración', estado: configuracion.vibracion ? 'activada' : 'desactivada' },
        ].map(({ campo, titulo, estado }) => (
          <View key={campo} style={styles.fila}>
            <Text style={styles.nombre}>{titulo}</Text>
            <Switch
              style={styles.switch}
              value={configuracion[campo]}
              onValueChange={(valor) => cambiar(campo, valor)}
              disabled={bloqueado}
              accessibilityRole="switch"
              accessibilityLabel={`${titulo} ${estado}`}
              accessibilityState={{ checked: configuracion[campo], disabled: bloqueado }}
              trackColor={{ false: colors.gray500, true: colors.secondary }}
              thumbColor={colors.white}
            />
          </View>
        ))}
        <Text style={styles.nombre} accessibilityRole="header">Tema</Text>
        <View style={styles.temas}>
          {['claro', 'oscuro'].map((tema) => {
            const seleccionado = configuracion.tema === tema;
            return (
              <Pressable
                key={tema}
                onPress={() => cambiar('tema', tema)}
                disabled={bloqueado}
                accessibilityRole="radio"
                accessibilityLabel={`Tema ${tema}${seleccionado ? ' seleccionado' : ''}`}
                accessibilityState={{ checked: seleccionado, disabled: bloqueado }}
                style={[styles.tema, seleccionado && styles.seleccionado, bloqueado && styles.atenuado]}
              >
                <Text style={styles.nombre}>{tema === 'claro' ? 'Claro' : 'Oscuro'}</Text>
                {seleccionado && <Text style={styles.texto}>Seleccionado</Text>}
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.texto}>Tus preferencias se guardan en este dispositivo.</Text>
        <Pressable
          onPress={solicitarBorrado}
          disabled={bloqueado}
          accessibilityRole="button"
          accessibilityLabel="Borrar estadísticas"
          accessibilityState={{ disabled: bloqueado }}
          style={[styles.botonBorrar, bloqueado && styles.atenuado]}
        >
          <Text style={styles.textoBorrar}>Borrar estadísticas</Text>
        </Pressable>
        <Text style={styles.texto} accessibilityLiveRegion="polite">
          {operacion === 'guardando' ? 'Guardando…' : operacion === 'borrando' ? 'Borrando…' : mensaje}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray50 },
  contenido: { padding: 16, paddingBottom: 24, gap: 16 },
  titulo: { fontSize: 24, fontWeight: '700', color: colors.primary },
  nombre: { fontSize: 18, fontWeight: '600', color: colors.primary, flexShrink: 1 },
  texto: { fontSize: 14, color: colors.gray700 },
  fila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: 12, backgroundColor: colors.white, borderRadius: 10 },
  switch: { minWidth: 48, minHeight: 48 },
  temas: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tema: { flexGrow: 1, flexBasis: 120, minHeight: 48, minWidth: 48, padding: 12, borderWidth: 2, borderColor: colors.gray300, borderRadius: 10, backgroundColor: colors.white },
  seleccionado: { borderColor: colors.secondary },
  atenuado: { opacity: 0.6 },
  botonBorrar: { minHeight: 48, minWidth: 48, padding: 12, borderWidth: 1, borderColor: colors.danger, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  textoBorrar: { fontSize: 16, fontWeight: '600', color: colors.primary, textAlign: 'center' },
});
