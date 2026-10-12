import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useThemedStyles } from '../theme/ThemeContext';
import { categorias, niveles } from '../data/palabras';

export default function CategoriaScreen({ navigation, route }) {
  const styles = useThemedStyles(crearEstilos);
  const jugador = route?.params?.jugador || 'Jugador';

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState(null);

  const [nivelSeleccionado, setNivelSeleccionado] =
    useState(null);

  const puedeComenzar =
    categoriaSeleccionada !== null &&
    nivelSeleccionado !== null;

  const comenzarPartida = () => {
    if (!puedeComenzar) {
      return;
    }

    navigation.navigate('Juego', {
      jugador,
      categoria: categoriaSeleccionada,
      nivel: nivelSeleccionado,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contenido}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.encabezado}>
        <Text style={styles.saludo}>
          Hola, {jugador}
        </Text>

        <Text style={styles.descripcion}>
          Configura tu partida antes de comenzar.
        </Text>
      </View>

      <Text style={styles.tituloSeccion}>
        Selecciona una categoría
      </Text>

      <View style={styles.gridCategorias}>
        {categorias.map((categoria) => {
          const seleccionada =
            categoriaSeleccionada === categoria.id;

          return (
            <TouchableOpacity
              key={categoria.id}
              style={[
                styles.tarjetaCategoria,
                seleccionada &&
                  styles.tarjetaCategoriaSeleccionada,
              ]}
              onPress={() =>
                setCategoriaSeleccionada(categoria.id)
              }
              activeOpacity={0.8}
            >
              <Text style={styles.iconoCategoria}>
                {categoria.icono}
              </Text>

              <Text
                style={[
                  styles.nombreCategoria,
                  seleccionada &&
                    styles.textoSeleccionado,
                ]}
              >
                {categoria.nombre}
              </Text>

              {seleccionada && (
                <Text style={styles.marcaSeleccion}>
                  ✓ Seleccionada
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.tituloSeccion}>
        Selecciona la dificultad
      </Text>

      <View style={styles.listaNiveles}>
        {niveles.map((nivel) => {
          const seleccionado =
            nivelSeleccionado === nivel.id;

          return (
            <TouchableOpacity
              key={nivel.id}
              style={[
                styles.tarjetaNivel,
                seleccionado &&
                  styles.tarjetaNivelSeleccionada,
              ]}
              onPress={() =>
                setNivelSeleccionado(nivel.id)
              }
              activeOpacity={0.8}
            >
              <View>
                <Text
                  style={[
                    styles.nombreNivel,
                    seleccionado &&
                      styles.textoSeleccionado,
                  ]}
                >
                  {nivel.nombre}
                </Text>

                <Text
                  style={[
                    styles.descripcionNivel,
                    seleccionado &&
                      styles.descripcionSeleccionada,
                  ]}
                >
                  {nivel.descripcion}
                </Text>
              </View>

              <View
                style={[
                  styles.radio,
                  seleccionado &&
                    styles.radioSeleccionado,
                ]}
              >
                {seleccionado && (
                  <View style={styles.radioInterior} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[
          styles.botonComenzar,
          !puedeComenzar &&
            styles.botonDeshabilitado,
        ]}
        onPress={comenzarPartida}
        disabled={!puedeComenzar}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.textoBoton,
            !puedeComenzar &&
              styles.textoBotonDeshabilitado,
          ]}
        >
          COMENZAR PARTIDA
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const crearEstilos = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contenido: {
    padding: 20,
    paddingBottom: 40,
  },

  encabezado: {
    marginBottom: 26,
  },

  saludo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
  },

  descripcion: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 6,
  },

  tituloSeccion: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 14,
  },

  gridCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  tarjetaCategoria: {
    width: '48%',
    minHeight: 130,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.borderSubtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,

    elevation: 2,
  },

  tarjetaCategoriaSeleccionada: {
    backgroundColor: colors.headerBackground,
    borderColor: colors.secondary,
  },

  iconoCategoria: {
    fontSize: 35,
    marginBottom: 8,
  },

  nombreCategoria: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },

  textoSeleccionado: {
    color: colors.onButton,
  },

  marcaSeleccion: {
    color: colors.selectionMark,
    fontSize: 11,
    marginTop: 7,
    fontWeight: '600',
  },

  listaNiveles: {
    marginBottom: 28,
  },

  tarjetaNivel: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.borderSubtle,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tarjetaNivelSeleccionada: {
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
  },

  nombreNivel: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  descripcionNivel: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 3,
  },

  descripcionSeleccionada: {
    color: colors.onSelectedSecondary,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSeleccionado: {
    borderColor: colors.onButton,
  },

  radioInterior: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.onButton,
  },

  botonComenzar: {
    backgroundColor: colors.secondary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },

  botonDeshabilitado: {
    backgroundColor: colors.disabledBackground,
  },

  textoBoton: {
    color: colors.onButton,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  textoBotonDeshabilitado: {
    color: colors.textSecondary,
  },
});
