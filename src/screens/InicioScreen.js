import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import colors from '../theme/colors';

export default function InicioScreen({ navigation }) {
  const [nombre, setNombre] = useState('');

  const iniciarJuego = () => {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      Alert.alert(
        'Nombre requerido',
        'Escribe tu nombre antes de comenzar la partida.'
      );
      return;
    }

    navigation.navigate('Categoria', {
      jugador: nombreLimpio,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.icono}>🎯</Text>
        <Text style={styles.titulo}>EL AHORCADO</Text>
        <Text style={styles.subtitulo}>MÓVIL</Text>
        <Text style={styles.descripcion}>
          Descubre la palabra antes de agotar tus oportunidades
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.label}>Nombre del jugador</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          placeholderTextColor={colors.gray500}
          value={nombre}
          onChangeText={setNombre}
          maxLength={30}
          autoCapitalize="words"
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.botonPrincipal}
          onPress={iniciarJuego}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotonPrincipal}>JUGAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonSecundario}
          onPress={() => navigation.navigate('Instrucciones')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotonSecundario}>INSTRUCCIONES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonSecundario}
          onPress={() => navigation.navigate('Estadisticas')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotonSecundario}>ESTADÍSTICAS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonSecundario}
          onPress={() => navigation.navigate('Configuracion')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotonSecundario}>CONFIGURACIÓN</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        Programación Móvil
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  icono: {
    fontSize: 60,
    marginBottom: 8,
  },

  titulo: {
    color: colors.white,
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  subtitulo: {
    color: '#A8D4FF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 5,
    marginTop: 2,
  },

  descripcion: {
    color: '#DCEBFA',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 12,
    lineHeight: 21,
    paddingHorizontal: 20,
  },

  tarjeta: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 22,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,

    elevation: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray700,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1.5,
    borderColor: colors.gray300,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    color: colors.gray900,
    marginBottom: 18,
    backgroundColor: '#FAFAFA',
  },

  botonPrincipal: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 11,
  },

  textoBotonPrincipal: {
    color: colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  botonSecundario: {
    borderWidth: 1.5,
    borderColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 9,
  },

  textoBotonSecundario: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  footer: {
    color: '#B9CCE2',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
  },
});
