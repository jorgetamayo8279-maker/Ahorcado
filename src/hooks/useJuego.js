import { useCallback, useEffect, useRef, useState } from 'react';
import { PALABRAS, obtenerCategoriaPorId } from '../data/palabras';

const MAX_ERRORES = 6;
const DIFICULTADES = {
  facil: { minimo: 4, maximo: 6, pistas: 2, tiempo: null, multiplicador: 1 },
  medio: { minimo: 7, maximo: 9, pistas: 1, tiempo: null, multiplicador: 2 },
  dificil: { minimo: 10, maximo: Infinity, pistas: 0, tiempo: 90, multiplicador: 3 },
};

// NFC recompone también la Ñ escrita como N seguida de una tilde combinante.
export function normalizar(texto) {
  if (typeof texto !== 'string') return '';
  return texto.normalize('NFC').toUpperCase().replace(/[ÁÉÍÓÚÜ]/g, (letra) => (
    { Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', Ü: 'U' }[letra]
  ));
}

function elegirPalabra(categoria, nivel, palabraAnterior) {
  const dificultad = DIFICULTADES[nivel];
  if (!dificultad || (categoria !== 'aleatoria' && !obtenerCategoriaPorId(categoria))) {
    throw new Error('Categoría o nivel de dificultad no válido.');
  }
  const compatibles = PALABRAS.filter((registro) => {
    const longitud = [...registro.palabra.replace(/\s/g, '')].length;
    return (categoria === 'aleatoria' || registro.categoria === categoria)
      && registro.nivel === nivel
      && longitud >= dificultad.minimo && longitud <= dificultad.maximo;
  });
  // Evita repetir la palabra al reiniciar cuando hay otras compatibles.
  const otras = compatibles.filter((registro) => registro.palabra !== palabraAnterior);
  const candidatas = otras.length > 0 ? otras : compatibles;
  if (candidatas.length === 0) throw new Error('No hay palabras para esta selección.');
  return candidatas[Math.floor(Math.random() * candidatas.length)];
}

function crearPartida(categoria, nivel, palabraAnterior) {
  const registro = elegirPalabra(categoria, nivel, palabraAnterior);
  const dificultad = DIFICULTADES[nivel];
  return {
    id: Symbol('partida'),
    categoria: registro.categoria,
    nivel,
    palabra: registro.palabra,
    pista: registro.pista,
    pistaVisible: false,
    letrasAcertadas: [],
    letrasFalladas: [],
    letrasUsadas: [],
    errores: 0,
    pistasDisponibles: dificultad.pistas,
    puntaje: 0,
    tiempoRestante: dificultad.tiempo,
    estado: 'jugando',
  };
}

function finalizar(partida, estado) {
  if (partida.estado !== 'jugando') return partida;
  const bono = estado === 'ganado' ? 50 + (MAX_ERRORES - partida.errores) * 10 : 0;
  // El multiplicador se aplica una sola vez. El parcial permite subtotales negativos.
  return {
    ...partida,
    estado,
    puntaje: (partida.puntaje + bono) * DIFICULTADES[partida.nivel].multiplicador,
  };
}

function revelarLetra(partida, letra) {
  const apariciones = [...normalizar(partida.palabra)].filter((valor) => valor === letra).length;
  const siguiente = {
    ...partida,
    letrasUsadas: [...partida.letrasUsadas, letra],
    letrasAcertadas: apariciones > 0 ? [...partida.letrasAcertadas, letra] : partida.letrasAcertadas,
    letrasFalladas: apariciones === 0 ? [...partida.letrasFalladas, letra] : partida.letrasFalladas,
    errores: partida.errores + (apariciones === 0 ? 1 : 0),
    puntaje: partida.puntaje + (apariciones > 0 ? apariciones * 10 : -5),
  };
  if (siguiente.errores >= MAX_ERRORES) return finalizar(siguiente, 'perdido');
  const descubierta = [...normalizar(siguiente.palabra)].every(
    (valor) => /\s/.test(valor) || siguiente.letrasAcertadas.includes(valor)
  );
  return descubierta ? finalizar(siguiente, 'ganado') : siguiente;
}

export default function useJuego(categoria, nivel) {
  const [partida, setPartida] = useState(() => crearPartida(categoria, nivel));
  const seleccionAnterior = useRef({ categoria, nivel });

  useEffect(() => {
    const anterior = seleccionAnterior.current;
    if (anterior.categoria !== categoria || anterior.nivel !== nivel) {
      seleccionAnterior.current = { categoria, nivel };
      setPartida(crearPartida(categoria, nivel));
    }
  }, [categoria, nivel]);

  useEffect(() => {
    if (partida.nivel !== 'dificil' || partida.estado !== 'jugando') return undefined;
    const idPartida = partida.id;
    const intervalo = setInterval(() => {
      setPartida((actual) => {
        // Un callback pendiente del intervalo anterior no puede afectar un reinicio.
        if (actual.id !== idPartida || actual.estado !== 'jugando') return actual;
        const siguiente = { ...actual, tiempoRestante: Math.max(0, actual.tiempoRestante - 1) };
        return siguiente.tiempoRestante === 0 ? finalizar(siguiente, 'perdido') : siguiente;
      });
    }, 1000);
    return () => clearInterval(intervalo);
  }, [partida.id, partida.nivel, partida.estado]);

  const procesarLetra = useCallback((entrada) => {
    const letra = normalizar(entrada);
    if (!/^[A-ZÑ]$/.test(letra)) return;
    setPartida((actual) => {
      if (actual.estado !== 'jugando' || actual.letrasUsadas.includes(letra)) return actual;
      return revelarLetra(actual, letra);
    });
  }, []);

  const usarPista = useCallback(() => {
    // La aleatoriedad queda fuera del actualizador, que React puede repetir.
    const azar = Math.random();
    setPartida((actual) => {
      if (actual.estado !== 'jugando' || actual.pistasDisponibles === 0) return actual;
      const siguiente = {
        ...actual,
        pistasDisponibles: actual.pistasDisponibles - 1,
        puntaje: actual.puntaje - 15,
        pistaVisible: true,
      };
      if (!actual.pistaVisible) return siguiente;
      const pendientes = [...new Set([...normalizar(actual.palabra)].filter(
        (letra) => !/\s/.test(letra) && !actual.letrasAcertadas.includes(letra)
      ))];
      if (pendientes.length === 0) return actual;
      const letra = pendientes[Math.floor(azar * pendientes.length)];
      // La pista revela todas las apariciones sin otorgar puntos de acierto.
      const revelada = {
        ...siguiente,
        letrasAcertadas: [...actual.letrasAcertadas, letra],
        letrasUsadas: [...actual.letrasUsadas, letra],
      };
      const descubierta = [...normalizar(revelada.palabra)].every(
        (valor) => /\s/.test(valor) || revelada.letrasAcertadas.includes(valor)
      );
      return descubierta ? finalizar(revelada, 'ganado') : revelada;
    });
  }, []);

  const reiniciarJuego = useCallback(() => {
    setPartida(crearPartida(categoria, nivel, partida.palabra));
  }, [categoria, nivel, partida.palabra]);

  const valores = { ...partida };
  delete valores.id;
  return {
    ...valores,
    vidasRestantes: MAX_ERRORES - partida.errores,
    procesarLetra,
    usarPista,
    reiniciarJuego,
  };
}
