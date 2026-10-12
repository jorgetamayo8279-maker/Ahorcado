# El Ahorcado Móvil

Aplicación móvil desarrollada con React Native y Expo.

## Información académica

| Dato | Información |
|---|---|
| Estudiante | JORGE ARMANDO TAMAYO LOPEZ |
| Institución | Uniciencia |
| Asignatura | Programación Móvil |
| Docente | Carlos Carrascal |

## Descripción

Aplicación del juego clásico del ahorcado, desarrollada con React Native y Expo y un banco de palabras de temática colombiana. Permite elegir categoría y nivel, y maneja puntuación, pistas, cronómetro, estadísticas, sonidos, vibración y tema claro/oscuro. La persistencia local de resultados y preferencias utiliza AsyncStorage.

El juego funciona sin conexión una vez cargada la aplicación. La descarga inicial del proyecto, la instalación de dependencias y la carga desde el servidor de desarrollo requieren conectividad.

## Tecnologías utilizadas

- JavaScript, React 19 y React Native 0.86.
- Expo SDK 57 y Expo Go.
- React Navigation con Native Stack.
- StyleSheet y Flexbox para la interfaz.
- AsyncStorage para estadísticas, ranking y preferencias.
- react-native-svg para el dibujo progresivo del ahorcado.
- expo-audio para sonidos y expo-haptics para vibración/feedback háptico.
- expo-splash-screen, expo-asset y expo-status-bar.
- react-native-safe-area-context para las zonas seguras de las pantallas que lo utilizan.
- Git y GitHub para control de versiones y alojamiento del código.
- Figma para el diseño y prototipo.

## Funcionalidades principales

- Nombre obligatorio para iniciar una partida.
- Navegación entre Inicio, Instrucciones, Categoría, Juego, Estadísticas y Configuración.
- Selección de categoría y dificultad, incluida la categoría Aleatoria.
- Banco de 60 palabras organizado en cuatro categorías.
- Teclado A-Z con Ñ; las vocales sin tilde revelan sus equivalentes acentuados y U revela Ü.
- Espacios visibles desde el inicio en palabras compuestas.
- Dibujo progresivo y derrota al alcanzar seis errores.
- Pistas según el nivel y cronómetro de 90 segundos en Difícil.
- Modal de victoria o derrota con palabra completa, puntaje y opciones «Jugar de nuevo» y «Menú».
- Sonidos de acierto, error, victoria y derrota; vibración configurable.
- Tema claro/oscuro y preferencias guardadas en el dispositivo.
- Estadísticas: partidas jugadas, ganadas y perdidas, porcentaje de victorias, racha actual y mejor racha.
- Top 10 global de puntajes almacenado localmente.
- Mejor puntaje disponible del jugador por categoría; Aleatoria muestra el mejor general del jugador.
- Borrado de estadísticas y ranking con confirmación.
- Confirmación al usar el botón físico «atrás» de Android durante una partida.
- Identidad visual propia, iconos, configuración de splash nativo y presentación inicial de 1,2 segundos visible en Expo Go.
- Ejecución funcional validada con Expo Go en dispositivo móvil.

**Alcance de los mejores puntajes:** se calculan entre los registros conservados en el Top 10 global, no sobre un historial completo. Si no hay coincidencias, se muestra «Sin registros». Se admiten puntajes negativos.

## Categorías

- Capitales de Colombia
- Animales de Colombia
- Frutas
- Comidas típicas
- Aleatoria

Aleatoria selecciona una palabra entre las categorías según la dificultad elegida.

## Niveles de dificultad

| Nivel | Letras, sin contar espacios | Pistas | Tiempo | Multiplicador |
|---|---|---|---|---|
| Fácil | 4 a 6 | 2 | Sin límite | x1 |
| Medio | 7 a 9 | 1 | Sin límite | x2 |
| Difícil | 10 o más | 0 | 90 segundos | x3 |

La primera pista muestra una descripción. La segunda, disponible en Fácil, revela una letra pendiente en todas sus apariciones, sin sumar puntos de acierto.

## Sistema de puntuación

| Acción | Puntos |
|---|---|
| Letra correcta | +10 por aparición |
| Letra incorrecta | -5 |
| Usar una pista | -15 |
| Ganar | +50 y +10 por vida restante |

Al finalizar, el subtotal, incluido el bono de victoria cuando corresponde, se multiplica por el nivel. El puntaje puede ser negativo.

## Arquitectura del proyecto

Estructura principal verificada en el repositorio; se omiten dependencias y archivos locales generados.

```text
Ahorcado/
├── App.js                         → Punto de entrada y presentación inicial
├── index.js                       → Registro de la aplicación Expo
├── app.json                       → Nombre, iconos, splash y configuración
├── package.json                   → Dependencias y scripts
├── package-lock.json              → Versiones bloqueadas
├── AGENTS.md                      → Documentación técnica del proyecto
├── PARCIAL_PROGRAMACION_MOVIL_AHORCADO_REACT_NATIVE.md
│                                  → Referencia de requisitos
├── LICENSE
├── .gitignore
├── assets/
│   ├── icon.png
│   ├── splash-icon.png
│   ├── favicon.png
│   ├── android-icon-background.png
│   ├── android-icon-foreground.png
│   ├── android-icon-monochrome.png
│   └── sounds/
│       ├── acierto.wav
│       ├── error.wav
│       ├── victoria.wav
│       └── derrota.wav
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js        → Navegación principal
│   ├── screens/
│   │   ├── InicioScreen.js
│   │   ├── InstruccionesScreen.js
│   │   ├── CategoriaScreen.js
│   │   ├── JuegoScreen.js
│   │   ├── EstadisticasScreen.js
│   │   └── ConfiguracionScreen.js
│   ├── components/
│   │   ├── Ahorcado.js            → Dibujo progresivo con react-native-svg
│   │   ├── PalabraOculta.js
│   │   ├── Teclado.js
│   │   ├── Marcador.js            → Vidas, puntaje y cronómetro
│   │   ├── ModalResultado.js
│   │   └── FooterAutor.js         → Identificación del autor
│   ├── hooks/
│   │   └── useJuego.js            → Estado y lógica principal del juego
│   ├── data/
│   │   └── palabras.js            → Banco de palabras
│   ├── storage/
│   │   └── almacenamiento.js      → Persistencia con AsyncStorage
│   └── theme/
│       ├── colors.js              → Paletas clara y oscura
│       └── ThemeContext.js        → Gestión global del tema
└── README.md
```

## Requisitos para ejecutar

- Git.
- Node.js compatible con Expo SDK 57 (mínimo 22.13.x) y npm.
- Expo Go compatible con SDK 57 en un celular.
- Computador y celular conectados a una red que permita acceder al servidor de desarrollo.

## Instalación y ejecución

```bash
git clone https://github.com/jorgetamayo8279-maker/Ahorcado.git
cd Ahorcado
npm install
npx expo start
```

Con el servidor iniciado, abre Expo Go en el celular y escanea el QR mostrado en la terminal; en iOS puedes abrirlo desde la cámara. El dispositivo y el computador deben estar en condiciones que permitan la conexión local al servidor. La aplicación muestra su presentación visual y después entra al menú principal. Mantén disponible el servidor durante la carga y el desarrollo.

La presentación visual de App.js complementa la experiencia de Expo Go y no reemplaza la configuración nativa de expo-splash-screen. Expo Go no reproduce completamente el splash de una aplicación compilada.

## Pruebas realizadas

Resultados reportados durante la validación del proyecto:

- **`npx expo-doctor`:** 21/21 checks passed.
- **`npx expo export --platform android`:** exportación Android completada correctamente.
- **Ejecución con Expo Go:** validada correctamente en dispositivo móvil, incluida la presentación visual inicial.

Estos resultados no equivalen a una prueba de instalación ni del splash nativo en una aplicación compilada.

## Diseño en Figma

Diseño y prototipo en Figma:
https://www.figma.com/design/J0ONsWmfkJj7fEoy2RxSQv

## Capturas de pantalla

Las capturas finales de la aplicación serán incorporadas con la documentación de entrega.

## Enlaces del proyecto

| Recurso | Enlace |
|---|---|
| Diseño Figma | https://www.figma.com/design/J0ONsWmfkJj7fEoy2RxSQv |
| Repositorio GitHub | https://github.com/jorgetamayo8279-maker/Ahorcado |

Desarrollado por JORGE ARMANDO TAMAYO LOPEZ
