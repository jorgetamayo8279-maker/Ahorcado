import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, BackHandler, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { createAudioPlayer } from 'expo-audio';
import useJuego, { normalizar } from '../hooks/useJuego';
import Ahorcado from '../components/Ahorcado';
import PalabraOculta from '../components/PalabraOculta';
import Teclado from '../components/Teclado';
import Marcador from '../components/Marcador';
import ModalResultado from '../components/ModalResultado';
import { obtenerCategoriaPorId, niveles } from '../data/palabras';
import {
  registrarResultadoPartida, leerConfiguracion, CONFIGURACION_POR_DEFECTO,
} from '../storage/almacenamiento';
import colors from '../theme/colors';

const SONIDOS = {
  acierto: require('../../assets/sounds/acierto.wav'),
  error: require('../../assets/sounds/error.wav'),
  victoria: require('../../assets/sounds/victoria.wav'),
  derrota: require('../../assets/sounds/derrota.wav'),
};

function useSonidos() {
  const recursos = useRef(null);

  useEffect(() => {
    const sesion = { reproductores: {}, intento: 0 };
    recursos.current = sesion;
    Object.entries(SONIDOS).forEach(([tipo, fuente]) => {
      try {
        sesion.reproductores[tipo] = createAudioPlayer(fuente);
      } catch {
        // Un asset que no pueda cargarse no bloquea los demás efectos ni el juego.
      }
    });
    return () => {
      recursos.current = null;
      Object.values(sesion.reproductores).forEach((reproductor) => {
        try { reproductor.release(); } catch { /* Puede haberse liberado ya. */ }
      });
    };
  }, []);

  return useCallback(async (tipo) => {
    const sesion = recursos.current;
    if (!sesion) return;
    const intento = ++sesion.intento;
    try {
      const reproductor = sesion.reproductores[tipo];
      // No encola sonidos para reproducirlos tarde si la carga todavía no terminó.
      if (!reproductor?.isLoaded) return;
      Object.values(sesion.reproductores).forEach((actual) => actual.pause());
      await reproductor.seekTo(0);
      // Un evento posterior o un desmontaje cancela una reproducción pendiente.
      if (recursos.current !== sesion || sesion.intento !== intento) return;
      reproductor.play();
    } catch {
      // Los fallos de reproducción nunca interrumpen la partida.
    }
  }, []);
}

async function emitirHaptico(tipo) {
  try {
    if (tipo === 'acierto') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      await Haptics.notificationAsync(tipo);
    }
  } catch {
    // Un dispositivo sin feedback háptico no interrumpe la partida.
  }
}

export default function JuegoScreen({ navigation, route }) {
  const { jugador, categoria, nivel } = route?.params ?? {};
  const jugadorValido = typeof jugador === 'string' && jugador.trim().length > 0;
  const categoriaValida = typeof categoria === 'string'
    && (categoria === 'aleatoria' || Boolean(obtenerCategoriaPorId(categoria)));
  const nivelValido = niveles.some((opcion) => opcion.id === nivel);

  // El hook requiere una selección válida; no se monta una partida con datos incompletos.
  if (!jugadorValido || !categoriaValida || !nivelValido) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <View style={styles.error}>
          <Text style={styles.titulo} accessibilityRole="header">No se puede iniciar la partida</Text>
          <Text style={styles.texto}>Revisa el nombre del jugador, la categoría y el nivel.</Text>
          <Pressable
            style={styles.boton}
            accessibilityRole="button"
            accessibilityLabel="Volver a seleccionar categoría y nivel"
            onPress={() => navigation.popTo('Categoria', { jugador: jugadorValido ? jugador : 'Jugador' })}
          >
            <Text style={styles.textoBoton}>Volver a selección</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Partida
      key={`${categoria}:${nivel}:${jugador}`}
      navigation={navigation}
      jugador={jugador}
      categoria={categoria}
      nivel={nivel}
    />
  );
}

function Partida({ navigation, jugador, categoria, nivel }) {
  const {
    palabra, letrasAcertadas, letrasFalladas, letrasUsadas, errores,
    vidasRestantes, puntaje, tiempoRestante, estado, pista, pistaVisible,
    pistasDisponibles, procesarLetra, usarPista, categoria: categoriaPartida,
  } = useJuego(categoria, nivel);
  const jugando = estado === 'jugando';
  const terminado = estado === 'ganado' || estado === 'perdido';
  const pistaBloqueada = !jugando || pistasDisponibles <= 0;
  const nombreCategoria = obtenerCategoriaPorId(categoriaPartida)?.nombre;
  const nombreNivel = niveles.find((opcion) => opcion.id === nivel)?.nombre;
  const resultadoIntentado = useRef(null);
  const [configuracion, setConfiguracion] = useState(null);
  const letrasPendientes = useRef(new Set());
  const feedbackFinalIntentado = useRef(false);
  const emitirSonido = useSonidos();

  useEffect(() => {
    let activo = true;
    async function cargarConfiguracion() {
      let datos = { ...CONFIGURACION_POR_DEFECTO };
      try {
        datos = await leerConfiguracion();
      } catch {
        // Conserva los valores por defecto si falla la lectura.
      }
      if (activo) setConfiguracion(datos);
    }
    void cargarConfiguracion();
    return () => { activo = false; };
  }, []);

  function seleccionarLetra(letra) {
    const normalizada = normalizar(letra);
    if (jugando && !letrasUsadas.includes(normalizada)) {
      letrasPendientes.current.add(normalizada);
    }
    procesarLetra(letra);
  }

  useEffect(() => {
    const resueltas = [...letrasPendientes.current].filter((letra) => letrasUsadas.includes(letra));
    resueltas.forEach((letra) => letrasPendientes.current.delete(letra));

    if (terminado) {
      letrasPendientes.current.clear();
      if (configuracion === null || feedbackFinalIntentado.current) return;
      feedbackFinalIntentado.current = true;
      // Si la pulsación termina la partida, solo emite el feedback final.
      if (configuracion.sonido === true) {
        void emitirSonido(estado === 'ganado' ? 'victoria' : 'derrota');
      }
      if (configuracion.vibracion === true) {
        void emitirHaptico(estado === 'ganado'
          ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
      }
      return;
    }

    // No emite efectos mientras carga la preferencia ni repite pulsaciones anteriores.
    if (configuracion === null) return;
    resueltas.forEach((letra) => {
      if (letrasAcertadas.includes(letra)) {
        if (configuracion.sonido === true) void emitirSonido('acierto');
        if (configuracion.vibracion === true) void emitirHaptico('acierto');
      } else if (letrasFalladas.includes(letra)) {
        if (configuracion.sonido === true) void emitirSonido('error');
        if (configuracion.vibracion === true) void emitirHaptico(Haptics.NotificationFeedbackType.Warning);
      }
    });
  }, [configuracion, terminado, estado, letrasUsadas, letrasAcertadas, letrasFalladas, emitirSonido]);

  useEffect(() => {
    if (!terminado || resultadoIntentado.current !== null) return;
    // Esta instancia de Partida vive una sola partida; volver a selección la desmonta.
    // Marca el intento antes de iniciar la escritura, incluso si esta falla.
    resultadoIntentado.current = {
      nombre: jugador,
      puntaje,
      categoria: nombreCategoria,
      nivel: nombreNivel,
      estado,
      fecha: new Date().toISOString(),
    };
    void registrarResultadoPartida(resultadoIntentado.current);
  }, [terminado, jugador, puntaje, nombreCategoria, nombreNivel, estado]);

  useFocusEffect(useCallback(() => {
    if (Platform.OS !== 'android' || !jugando) return undefined;
    let confirmacionVisible = false;
    let enfocado = true;
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (confirmacionVisible) return true;
      confirmacionVisible = true;
      Alert.alert('¿Abandonar partida?', 'Perderás el progreso de esta partida.', [
        { text: 'Cancelar', style: 'cancel', onPress: () => { confirmacionVisible = false; } },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: () => {
            confirmacionVisible = false;
            if (!enfocado) return;
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.popTo('Categoria', { jugador });
          },
        },
      ], { cancelable: false });
      return true;
    });
    return () => {
      enfocado = false;
      listener.remove();
    };
  }, [navigation, jugando, jugador]));

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.encabezado}>
          <Text style={styles.titulo} accessibilityRole="header">Jugador: {jugador}</Text>
          <Text style={styles.texto}>Categoría: {nombreCategoria}</Text>
          {categoria === 'aleatoria' && <Text style={styles.texto}>Selección aleatoria</Text>}
          <Text style={styles.texto}>Nivel: {nombreNivel}</Text>
        </View>
        <Marcador vidasRestantes={vidasRestantes} puntaje={puntaje} tiempoRestante={tiempoRestante} />
        <View style={styles.dibujo}><Ahorcado errores={errores} /></View>
        <PalabraOculta palabra={palabra} letrasAcertadas={letrasAcertadas} revelarCompleta={terminado} />
        {pistaVisible && <Text style={styles.pista}>Pista: {pista}</Text>}
        {nivel !== 'dificil' ? (
          <Pressable
            onPress={usarPista}
            disabled={pistaBloqueada}
            accessibilityRole="button"
            accessibilityLabel={`Usar pista. Pistas disponibles: ${pistasDisponibles}`}
            accessibilityState={{ disabled: pistaBloqueada }}
            style={({ pressed }) => [
              styles.boton, pistaBloqueada && styles.botonDeshabilitado,
              pressed && !pistaBloqueada && styles.presionado,
            ]}
          >
            <Text style={styles.textoBoton}>Usar pista ({pistasDisponibles} disponibles)</Text>
          </Pressable>
        ) : <Text style={styles.texto}>Sin pistas en nivel difícil.</Text>}
        <Teclado
          letrasAcertadas={letrasAcertadas}
          letrasFalladas={letrasFalladas}
          letrasUsadas={letrasUsadas}
          onLetra={seleccionarLetra}
          deshabilitado={!jugando}
        />
      </ScrollView>
      <ModalResultado
        visible={terminado}
        estado={estado}
        palabra={palabra}
        puntaje={puntaje}
        onJugarDeNuevo={() => navigation.popTo('Categoria', { jugador })}
        onMenu={() => navigation.popTo('Inicio')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray50 },
  contenido: { padding: 12, paddingBottom: 20, gap: 10 },
  encabezado: { gap: 4 },
  titulo: { fontSize: 20, fontWeight: '700', color: colors.primary },
  texto: { fontSize: 14, color: colors.gray700 },
  dibujo: { width: '100%', maxWidth: 140, alignSelf: 'center' },
  pista: { fontSize: 16, color: colors.primary, backgroundColor: colors.white, padding: 12, borderRadius: 8 },
  boton: {
    minHeight: 48,
    minWidth: 48,
    padding: 12,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonDeshabilitado: { backgroundColor: colors.gray700 },
  textoBoton: { fontSize: 16, fontWeight: '600', color: colors.white, textAlign: 'center' },
  presionado: { opacity: 0.8 },
  error: { flex: 1, justifyContent: 'center', padding: 20, gap: 16 },
});
