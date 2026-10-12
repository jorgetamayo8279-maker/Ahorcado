import AsyncStorage from '@react-native-async-storage/async-storage';

export const CLAVES = Object.freeze({
  estadisticas: '@ahorcado_stats',
  ranking: '@ahorcado_ranking',
  configuracion: '@ahorcado_config',
});

export const ESTADISTICAS_POR_DEFECTO = Object.freeze({
  jugadas: 0,
  ganadas: 0,
  perdidas: 0,
  rachaActual: 0,
  mejorRacha: 0,
});

export const CONFIGURACION_POR_DEFECTO = Object.freeze({
  sonido: true,
  vibracion: true,
  tema: 'claro',
});

// Serializa cambios de estadísticas/ranking, incluido el borrado desde configuración.
let operacionesResultados = Promise.resolve(true);

function encolarResultado(operacion) {
  operacionesResultados = operacionesResultados.then(operacion).catch(() => false);
  return operacionesResultados;
}

function esObjeto(datos) {
  return datos !== null && typeof datos === 'object' && !Array.isArray(datos);
}

function textoValido(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}

function estadisticasValidas(datos) {
  return esObjeto(datos) && Object.keys(ESTADISTICAS_POR_DEFECTO).every(
    (campo) => Number.isSafeInteger(datos[campo]) && datos[campo] >= 0
  );
}

function rankingValido(datos) {
  return Array.isArray(datos) && Array.from(datos).every((registro) => (
    esObjeto(registro)
    && textoValido(registro.nombre)
    && Number.isFinite(registro.puntaje)
    && textoValido(registro.categoria)
    && textoValido(registro.nivel)
    // Admite fecha en texto o timestamp, sin transformar el registro.
    && ((textoValido(registro.fecha) && Number.isFinite(Date.parse(registro.fecha)))
      || (Number.isFinite(registro.fecha) && registro.fecha >= 0))
  ));
}

function configuracionValida(datos) {
  return esObjeto(datos)
    && typeof datos.sonido === 'boolean'
    && typeof datos.vibracion === 'boolean'
    && (datos.tema === 'claro' || datos.tema === 'oscuro');
}

// Las escrituras indican éxito; los errores normales no llegan a la interfaz.
export async function guardarDatos(clave, datos) {
  try {
    if (!textoValido(clave) || datos == null) return false;
    const serializados = JSON.stringify(datos);
    if (typeof serializados !== 'string') return false;
    await AsyncStorage.setItem(clave, serializados);
    return true;
  } catch {
    return false;
  }
}

export async function leerDatos(clave, valorPorDefecto = null) {
  try {
    if (!textoValido(clave)) return valorPorDefecto;
    return await leerDatosParaResultado(clave, valorPorDefecto);
  } catch {
    return valorPorDefecto;
  }
}

async function leerDatosParaResultado(clave, valorPorDefecto) {
  // Un fallo de lectura debe abortar el registro, no sobrescribir datos con ceros.
  const guardados = await AsyncStorage.getItem(clave);
  if (typeof guardados !== 'string') return valorPorDefecto;
  try {
    return JSON.parse(guardados) ?? valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

async function guardarValidado(clave, datos, validar) {
  try {
    // No reemplaza datos guardados si la entrada tiene una estructura inválida.
    return validar(datos) ? await guardarDatos(clave, datos) : false;
  } catch {
    return false;
  }
}

export async function leerEstadisticas() {
  await operacionesResultados;
  const porDefecto = { ...ESTADISTICAS_POR_DEFECTO };
  const datos = await leerDatos(CLAVES.estadisticas, porDefecto);
  return estadisticasValidas(datos) ? datos : porDefecto;
}

export function guardarEstadisticas(estadisticas) {
  return encolarResultado(() => guardarValidado(CLAVES.estadisticas, estadisticas, estadisticasValidas));
}

export async function leerRanking() {
  await operacionesResultados;
  const datos = await leerDatos(CLAVES.ranking, []);
  return rankingValido(datos) ? datos : [];
}

export function guardarRanking(ranking) {
  return encolarResultado(() => guardarValidado(CLAVES.ranking, ranking, rankingValido));
}

export async function registrarResultadoPartida(resultado) {
  try {
    if (!esObjeto(resultado)) return false;
    const { nombre, puntaje, categoria, nivel, estado, fecha } = resultado;
    const registro = { nombre, puntaje, categoria, nivel, fecha };
    if ((estado !== 'ganado' && estado !== 'perdido') || !rankingValido([registro])
      || typeof fecha !== 'string' || new Date(fecha).toISOString() !== fecha) return false;
    registro.nombre = nombre.trim();
    registro.categoria = categoria.trim();
    registro.nivel = nivel.trim();

    return await encolarResultado(async () => {
      const [datos, registros] = await Promise.all([
        leerDatosParaResultado(CLAVES.estadisticas, { ...ESTADISTICAS_POR_DEFECTO }),
        leerDatosParaResultado(CLAVES.ranking, []),
      ]);
      const actuales = estadisticasValidas(datos) ? datos : ESTADISTICAS_POR_DEFECTO;
      const ranking = rankingValido(registros) ? registros : [];
      const ganado = estado === 'ganado';
      const rachaActual = ganado ? actuales.rachaActual + 1 : 0;
      const estadisticas = {
        jugadas: actuales.jugadas + 1,
        ganadas: actuales.ganadas + (ganado ? 1 : 0),
        perdidas: actuales.perdidas + (ganado ? 0 : 1),
        rachaActual,
        mejorRacha: Math.max(actuales.mejorRacha, rachaActual),
      };
      if (!estadisticasValidas(estadisticas)) return false;
      const topDiez = [...ranking, registro].sort((a, b) => b.puntaje - a.puntaje).slice(0, 10);
      // Una sola operación conjunta; no recalcula ni limita el puntaje final.
      await AsyncStorage.multiSet([
        [CLAVES.estadisticas, JSON.stringify(estadisticas)],
        [CLAVES.ranking, JSON.stringify(topDiez)],
      ]);
      return true;
    });
  } catch {
    return false;
  }
}

export async function leerConfiguracion() {
  const porDefecto = { ...CONFIGURACION_POR_DEFECTO };
  const datos = await leerDatos(CLAVES.configuracion, porDefecto);
  return configuracionValida(datos) ? datos : porDefecto;
}

export function guardarConfiguracion(configuracion) {
  return guardarValidado(CLAVES.configuracion, configuracion, configuracionValida);
}

export function borrarEstadisticas() {
  return encolarResultado(async () => {
    await AsyncStorage.multiRemove([CLAVES.estadisticas, CLAVES.ranking]);
    return true;
  });
}
