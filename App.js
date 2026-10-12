import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useThemedStyles } from './src/theme/ThemeContext';

export default function App() {
  const [mostrarPresentacion, setMostrarPresentacion] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => setMostrarPresentacion(false), 1200);
    return () => clearTimeout(temporizador);
  }, []);

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      {mostrarPresentacion ? <PresentacionInicial /> : <AppNavigator />}
    </ThemeProvider>
  );
}

function PresentacionInicial() {
  const styles = useThemedStyles(crearEstilos);

  return (
    <View style={styles.presentacion}>
      <Image
        source={require('./assets/splash-icon.png')}
        style={styles.imagen}
        resizeMode="contain"
        fadeDuration={0}
        accessible
        accessibilityLabel="El Ahorcado Móvil. Desarrollado por Jorge Tamayo."
      />
    </View>
  );
}

const crearEstilos = (colors) => StyleSheet.create({
  presentacion: {
    flex: 1,
    backgroundColor: colors.headerBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  imagen: {
    width: '100%',
    height: '100%',
    maxWidth: 420,
    maxHeight: 420,
  },
});
