import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { leerConfiguracion } from '../storage/almacenamiento';
import { paletas } from './colors';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState('claro');
  const revision = useRef(0);

  const cambiarTema = useCallback((valor) => {
    revision.current += 1;
    setTema(valor === 'oscuro' ? 'oscuro' : 'claro');
  }, []);

  useEffect(() => {
    let activo = true;
    const revisionInicial = revision.current;
    async function cargarTema() {
      let guardado = 'claro';
      try {
        const configuracion = await leerConfiguracion();
        if (configuracion.tema === 'oscuro') guardado = 'oscuro';
      } catch {
        // Una lectura fallida conserva el tema claro.
      }
      // Una lectura inicial tardía no sobrescribe una selección más reciente.
      if (activo && revision.current === revisionInicial) setTema(guardado);
    }
    void cargarTema();
    return () => { activo = false; };
  }, []);

  const valor = useMemo(() => ({
    tema,
    paleta: paletas[tema],
    cambiarTema,
  }), [tema, cambiarTema]);

  return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const contexto = useContext(ThemeContext);
  if (!contexto) throw new Error('useTheme requiere ThemeProvider.');
  return contexto;
}

export function useThemedStyles(crearEstilos) {
  const { paleta } = useTheme();
  return useMemo(() => crearEstilos(paleta), [crearEstilos, paleta]);
}
