import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from '../screens/InicioScreen';
import InstruccionesScreen from '../screens/InstruccionesScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import JuegoScreen from '../screens/JuegoScreen';
import EstadisticasScreen from '../screens/EstadisticasScreen';
import ConfiguracionScreen from '../screens/ConfiguracionScreen';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { tema, paleta } = useTheme();
  const temaNavegacion = useMemo(() => {
    const base = tema === 'oscuro' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: paleta.primary,
        background: paleta.background,
        card: paleta.headerBackground,
        text: paleta.onHeader,
        border: paleta.border,
        notification: paleta.danger,
      },
    };
  }, [tema, paleta]);

  return (
    <NavigationContainer theme={temaNavegacion}>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: paleta.headerBackground,
          },
          headerTintColor: paleta.onHeader,
          contentStyle: { backgroundColor: paleta.background },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{
            title: 'El Ahorcado',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Instrucciones"
          component={InstruccionesScreen}
          options={{ title: 'Instrucciones' }}
        />

        <Stack.Screen
          name="Categoria"
          component={CategoriaScreen}
          options={{ title: 'Categoría y nivel' }}
        />

        <Stack.Screen
          name="Juego"
          component={JuegoScreen}
          options={{ title: 'Partida' }}
        />

        <Stack.Screen
          name="Estadisticas"
          component={EstadisticasScreen}
          options={{ title: 'Estadísticas' }}
        />

        <Stack.Screen
          name="Configuracion"
          component={ConfiguracionScreen}
          options={{ title: 'Configuración' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
